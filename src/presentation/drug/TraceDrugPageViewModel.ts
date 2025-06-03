import { useApiRequest } from "@/core/hooks/useApiRequest"
import { DrugApiDataSource } from "@/data/datasource/api/DrugApiDataSource"
import { DrugRepositoryDataSource } from "@/data/repository/DrugRepositoryDataSource"
import { GetHistoryDrug } from "@/domain/usecase/history/GetHistoryDrug"
import { HistoryDrug } from "@/domain/model/history/HistoryDrug"
import { useCallback, useMemo, useState, useEffect } from "react"
import { toast } from "sonner"
import { errorListResponse } from "@/lib/ResponseHelper"

export default function TraceDrugPageViewModel() {
  const [drugId, setDrugId] = useState("")
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [currentError, setCurrentError] = useState<string | null | undefined>(null)
  const [currentHistory, setCurrentHistory] = useState<HistoryDrug[] | undefined>(undefined)

  const drugDataSource = useMemo(() => new DrugApiDataSource(), [])
  const drugRepository = useMemo(() => new DrugRepositoryDataSource(drugDataSource), [drugDataSource])
  const getHistoryDrugUseCase = useMemo(() => new GetHistoryDrug(drugRepository), [drugRepository])

  const fetchDrugHistoryApi = useCallback(async (id: string) => {
    if (!id) {
      return errorListResponse(500, "Drug ID cannot be empty.")
    }
    return await getHistoryDrugUseCase.execute(id)
  }, [getHistoryDrugUseCase])

  const {
    list: drugHistoryFromApi,
    isLoading,
    error: apiError,
    execute: triggerFetchDrugHistory,
    success: fetchSuccess,
  } = useApiRequest<HistoryDrug, [string]>(fetchDrugHistoryApi)

  const handleSearch = useCallback(async () => {
    if (!drugId) {
      toast.error("Validation Error", { description: "Please enter a Drug ID to trace." })
      return
    }
    setCurrentError(null)
    setCurrentHistory(undefined)
    setSearchPerformed(false)
    await triggerFetchDrugHistory(drugId)
  }, [drugId, triggerFetchDrugHistory])

  useEffect(() => {
    if (isLoading) return

    if (fetchSuccess === true && drugHistoryFromApi !== undefined) {
      setCurrentHistory(drugHistoryFromApi)
      setCurrentError(null)
      setSearchPerformed(true)
      if (drugHistoryFromApi.length === 0) {
        toast.info("No History Found", { description: `No trace history found for Drug ID: ${drugId}` })
      }
    } else if (fetchSuccess === false && apiError) {
      setCurrentHistory(undefined)
      setCurrentError(apiError.message)
      setSearchPerformed(true)
      toast.error("Search Failed", { description: apiError.message || "Failed to fetch drug history." })
    }
  }, [fetchSuccess, drugHistoryFromApi, apiError, drugId, isLoading])

  const clearSearch = useCallback(() => {
    setDrugId("")
    setSearchPerformed(false)
    setCurrentError(null)
    setCurrentHistory(undefined)
  }, [])

  return {
    drugId,
    setDrugId,
    drugHistory: currentHistory,
    isLoading,
    error: currentError,
    handleSearch,
    searchPerformed,
    clearSearch,
  }
}
