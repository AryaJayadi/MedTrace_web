import { DrugApiDataSource } from "@/data/datasource/api/DrugApiDataSource";
import { DrugRepositoryDataSource } from "@/data/repository/DrugRepositoryDataSource";
import { GetMyAvailDrugs } from "@/domain/usecase/drug/GetMyAvailDrugs";
import { useCallback, useEffect, useMemo } from "react";
import { Drug } from "@/domain/model/drug/Drug";
import { useApiRequest } from "@/core/hooks/useApiRequest";
import { DrugViewModel } from "./DrugViewModel";
import { BatchApiDataSource } from "@/data/datasource/api/BatchApiDataSource";
import { BatchRepositoryDataSource } from "@/data/repository/BatchRepositoryDataSource";
import { GetAllBatches } from "@/domain/usecase/batch/GetAllBatches";
import { BaseListResponse } from "@/domain/model/response/BaseListResponse";
import { ErrorInfo } from "@/domain/model/response/ErrorInfo";

export default function DrugPageViewModel() {
  const batchDataSource = useMemo(() => new BatchApiDataSource(), []);
  const batchRepository = useMemo(() => new BatchRepositoryDataSource(batchDataSource), [batchDataSource]);
  const getAllBatchesUseCase = useMemo(() => new GetAllBatches(batchRepository), [batchRepository]);

  const drugDataSource = useMemo(() => new DrugApiDataSource(), []);
  const drugRepository = useMemo(() => new DrugRepositoryDataSource(drugDataSource), [drugDataSource]);
  const getMyAvailDrugsUseCase = useMemo(() => new GetMyAvailDrugs(drugRepository), [drugRepository]);

  const getDrugViewModel = useCallback(async () => {
    const res: BaseListResponse<DrugViewModel> = {
      success: false,
      list: undefined,
      error: {
        code: 500,
        message: "An error occurred while fetching drug view models."
      } as ErrorInfo
    }
    const drugViewModels: DrugViewModel[] = []
    const drugsMap: Map<string, Drug[]> = new Map();

    const batches = await getAllBatchesUseCase.execute();
    if (!batches.success || batches.list === undefined) return res

    const resp = await getMyAvailDrugsUseCase.execute();
    if (resp.success && resp.list) {
      resp.list.forEach(drug => {
        const curr = drugsMap.get(drug.BatchID) || [];
        curr.push(drug);
        drugsMap.set(drug.BatchID, curr);
      })
    }

    drugsMap.forEach((drugs, batchID) => {
      const currentBatch = batches.list!.find(batch => batch.ID === batchID);
      drugViewModels.push({
        BatchID: currentBatch?.ID || "",
        DrugName: currentBatch?.DrugName || "",
        Quantity: drugs.length,
        ProductionDate: currentBatch?.ProductionDate || "",
        ExpiryDate: currentBatch?.ExpiryDate || ""
      } as DrugViewModel);
    })

    res.success = true;
    res.list = drugViewModels;
    res.error = undefined;
    return res;
  }, [getMyAvailDrugsUseCase]);
  const {
    list: drugViewModels,
    isLoading: drugViewModelsIsLoading,
    error: drugViewModelsError,
    execute: fetchDrugViewModels
  } = useApiRequest<DrugViewModel, []>(getDrugViewModel)

  useEffect(() => {
    fetchDrugViewModels()
  }, [])

  return {
    drugViewModels,
    drugViewModelsIsLoading,
    drugViewModelsError,
  }
}
