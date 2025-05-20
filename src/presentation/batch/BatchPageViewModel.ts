import { useApiRequest } from "@/core/hooks/useApiRequest"
import { BatchApiDataSource } from "@/data/datasource/api/BatchApiDataSource"
import { BatchRepositoryDataSource } from "@/data/repository/BatchRepositoryDataSource"
import { Batch } from "@/domain/model/batch/Batch"
import { GetAllBatches } from "@/domain/usecase/batch/GetAllBatches"
import { useMemo, useCallback } from "react"

export default function BatchPageViewModel() {

  const batchDataSource = useMemo(() => new BatchApiDataSource(), [])
  const batchRepository = useMemo(() => new BatchRepositoryDataSource(batchDataSource), [batchDataSource])

  const getAllBatchesUseCase = useMemo(() => new GetAllBatches(batchRepository), [batchRepository])
  const getAllBatches = useCallback(async () => {
    return getAllBatchesUseCase.execute()
  }, [getAllBatchesUseCase])

  const {
    list: batches,
    isLoading: batchesIsLoading,
    error: batchesError,
    execute: fetchBatches
  } = useApiRequest<Batch, []>(getAllBatches)

  return {
    batches,
    batchesIsLoading,
    batchesError,
    fetchBatches
  }
}
