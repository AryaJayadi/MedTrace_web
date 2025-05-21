import { Batch } from "@/domain/model/batch/Batch";
import { GetDrugsByBatch } from "@/domain/usecase/drug/GetDrugsByBatch";
import { DrugApiDataSource } from "@/data/datasource/api/DrugApiDataSource";
import { DrugRepositoryDataSource } from "@/data/repository/DrugRepositoryDataSource";
import { useState, useEffect, useMemo } from "react";

export default function BatchesTableViewModel(initialBatches: Batch[]) {
  const drugDataSource = useMemo(() => new DrugApiDataSource(), []);
  const drugRepository = useMemo(() => new DrugRepositoryDataSource(drugDataSource), [drugDataSource]);
  const getDrugsByBatchUseCase = useMemo(() => new GetDrugsByBatch(drugRepository), [drugRepository]);

  const [batchQuantities, setBatchQuantities] = useState<{ [key: string]: number }>({});
  const [batchQuantitiesLoading, setBatchQuantitiesLoading] = useState<{ [key: string]: boolean }>({});
  const [batchQuantitiesError, setBatchQuantitiesError] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialBatches.length > 0) {
      initialBatches.forEach(batch => {
        if (batchQuantities[batch.ID] === undefined && !batchQuantitiesLoading[batch.ID] && batchQuantitiesError[batch.ID] === undefined) {
          setBatchQuantitiesLoading(prev => ({ ...prev, [batch.ID]: true }));
          setBatchQuantitiesError(prev => {
            const newState = { ...prev };
            delete newState[batch.ID];
            return newState;
          });

          getDrugsByBatchUseCase.execute(batch.ID)
            .then(response => {
              if (response.success && response.list) {
                setBatchQuantities(prev => ({ ...prev, [batch.ID]: response.list!.length }));
              } else {
                const errorMessage = response.error?.message || "Failed to fetch quantity";
                setBatchQuantitiesError(prev => ({ ...prev, [batch.ID]: errorMessage }));
                setBatchQuantities(prev => {
                  const newState = { ...prev };
                  delete newState[batch.ID];
                  return newState;
                });
              }
            })
            .catch(error => {
              const errorMessage = error.message || "An error occurred while fetching quantity";
              setBatchQuantitiesError(prev => ({ ...prev, [batch.ID]: errorMessage }));
              setBatchQuantities(prev => {
                const newState = { ...prev };
                delete newState[batch.ID];
                return newState;
              });
            })
            .finally(() => {
              setBatchQuantitiesLoading(prev => ({ ...prev, [batch.ID]: false }));
            });
        }
      });
    } else {
      // If initialBatches is empty or undefined, clear previous states
      setBatchQuantities({});
      setBatchQuantitiesLoading({});
      setBatchQuantitiesError({});
    }
  }, [initialBatches, getDrugsByBatchUseCase, batchQuantities, batchQuantitiesLoading, batchQuantitiesError]);

  return {
    batchQuantities,
    batchQuantitiesLoading,
    batchQuantitiesError,
  };
}
