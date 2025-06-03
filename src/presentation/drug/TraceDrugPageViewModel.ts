import { useApiRequest } from "@/core/hooks/useApiRequest"
import { DrugApiDataSource } from "@/data/datasource/api/DrugApiDataSource"
import { DrugRepositoryDataSource } from "@/data/repository/DrugRepositoryDataSource"
import { GetHistoryDrug } from "@/domain/usecase/history/GetHistoryDrug"
import { useCallback, useMemo } from "react"

export default function TraceDrugPageViewModel() {

  const drugDataSource = useMemo(() => new DrugApiDataSource(), [])
  const drugRepository = useMemo(() => new DrugRepositoryDataSource(drugDataSource), [drugDataSource])
  const getHistoryDrugUseCase = useMemo(() => new GetHistoryDrug(drugRepository), [drugRepository])
  const getHistoryDrug = useCallback(async (drugID: string) => {
    return await getHistoryDrugUseCase.execute(drugID)
  }, [getHistoryDrugUseCase])
  const {

  } = useApiRequest(getHistoryDrug)

  return {

  }
}
