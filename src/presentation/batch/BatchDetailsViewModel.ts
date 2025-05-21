import { useApiRequest } from "@/core/hooks/useApiRequest";
import { DrugApiDataSource } from "@/data/datasource/api/DrugApiDataSource";
import { DrugRepositoryDataSource } from "@/data/repository/DrugRepositoryDataSource";
import { Drug } from "@/domain/model/drug/Drug";
import { GetDrugsByBatch } from "@/domain/usecase/drug/GetDrugsByBatch";
import { useMemo, useCallback, useEffect } from "react";

export default function BatchDetailsViewModel(batchID: string) {
  const drugDataSource = useMemo(() => new DrugApiDataSource(), []);
  const drugRepository = useMemo(() => new DrugRepositoryDataSource(drugDataSource), [drugDataSource]);

  const getDrugsByBatchUseCase = useMemo(() => new GetDrugsByBatch(drugRepository), [drugRepository]);

  const fetchDrugsForBatch = useCallback(async () => {
    if (!batchID) return { data: [], success: true }; // Or handle error appropriately
    return getDrugsByBatchUseCase.execute(batchID);
  }, [getDrugsByBatchUseCase, batchID]);

  const {
    list: drugs,
    isLoading: drugsIsLoading,
    error: drugsError,
    execute: loadDrugsForBatch
  } = useApiRequest<Drug, []>(fetchDrugsForBatch);

  // Expose a function to manually trigger fetching if needed, or fetch on batchID change
  useEffect(() => {
    if (batchID) {
      loadDrugsForBatch();
    }
  }, [batchID, loadDrugsForBatch]);

  return {
    drugs,
    drugsIsLoading,
    drugsError,
    loadDrugsForBatch // allow re-fetching
  };
} 