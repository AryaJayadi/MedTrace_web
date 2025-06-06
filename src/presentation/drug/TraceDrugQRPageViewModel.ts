import { useApiRequest } from "@/core/hooks/useApiRequest"
import { DrugApiDataSource } from "@/data/datasource/api/DrugApiDataSource"
import { DrugRepositoryDataSource } from "@/data/repository/DrugRepositoryDataSource"
import { HistoryDrug } from "@/domain/model/history/HistoryDrug"
import { GetHistoryDrug } from "@/domain/usecase/history/GetHistoryDrug"
import { useCallback, useEffect, useMemo } from "react"

export default function TraceDrugQRPageViewModel(drugID: string) {
  const drugDataSource = useMemo(() => new DrugApiDataSource(), [])
  const drugRepository = useMemo(() => new DrugRepositoryDataSource(drugDataSource), [drugDataSource])
  const getHistoryDrugUseCase = useMemo(() => new GetHistoryDrug(drugRepository), [drugRepository])
  const fetchDrugHistory = useCallback(async () => {
    return await getHistoryDrugUseCase.execute(drugID)
  }, [getHistoryDrugUseCase])

  const {
    list: drugHistoryFromApi,
    isLoading,
    error: apiError,
    execute: triggerFetchDrugHistory,
    success: fetchSuccess,
  } = useApiRequest<HistoryDrug, []>(fetchDrugHistory)

  useEffect(() => {
    triggerFetchDrugHistory()
  }, [])

  return {
    drugHistoryFromApi,
    isLoading,
    apiError,
    fetchSuccess
  }
}
