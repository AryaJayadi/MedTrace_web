import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Organization } from "@/domain/model/organization/Organization";
import { TransferApiDataSource } from "@/data/datasource/api/TransferApiDataSource";
import { TransferRepositoryDataSource } from "@/data/repository/TransferRepositoryDataSource";
import { GetTransfer } from "@/domain/usecase/transfer/GetTransfer";
import { Transfer } from "@/domain/model/transfer/Transfer";
import { GetDrugsByTransfer } from "@/domain/usecase/drug/GetDrugsByTransfer";
import { DrugApiDataSource } from "@/data/datasource/api/DrugApiDataSource";
import { DrugRepositoryDataSource } from "@/data/repository/DrugRepositoryDataSource";
import { BatchApiDataSource } from "@/data/datasource/api/BatchApiDataSource";
import { BatchRepositoryDataSource } from "@/data/repository/BatchRepositoryDataSource";
import { GetAllBatches } from "@/domain/usecase/batch/GetAllBatches";
import { useApiRequest } from "@/core/hooks/useApiRequest";
import { Drug } from "@/domain/model/drug/Drug";
import { BaseListResponse } from "@/domain/model/response/BaseListResponse";
import { DrugViewModel } from "../drug/DrugViewModel";
import { ErrorInfo } from "@/domain/model/response/ErrorInfo";

export default function TransferDetailPageViewModel(transferID: string) {
  const {
    user,
    otherOrgs,
  } = useAuth();
  const [transfer, setTransfer] = useState<Transfer | null>(null);
  const [receiver, setReceiver] = useState<Organization | null>(null);
  const [batchSearchQuery, setBatchSearchQuery] = useState("");

  const batchDataSource = useMemo(() => new BatchApiDataSource(), []);
  const batchRepository = useMemo(() => new BatchRepositoryDataSource(batchDataSource), [batchDataSource]);
  const getAllBatchesUseCase = useMemo(() => new GetAllBatches(batchRepository), [batchRepository]);

  const transferDataSource = useMemo(() => new TransferApiDataSource(), []);
  const transferRepository = useMemo(() => new TransferRepositoryDataSource(transferDataSource), [transferDataSource]);
  const getTransferUseCase = useMemo(() => new GetTransfer(transferRepository), [transferRepository]);
  const getTranfser = useCallback(async () => {
    return await getTransferUseCase.execute(transferID);
  }, [getTransferUseCase, transferID]);

  const drugDataSource = useMemo(() => new DrugApiDataSource(), []);
  const drugRepository = useMemo(() => new DrugRepositoryDataSource(drugDataSource), [drugDataSource]);
  const getDrugsByTransferUseCase = useMemo(() => new GetDrugsByTransfer(drugRepository), [drugRepository]);

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

    const resp = await getDrugsByTransferUseCase.execute(transferID);
    if (resp.success && resp.list) {
      resp.list.forEach(drug => {
        const curr = drugsMap.get(drug.BatchID) || [];
        curr.push(drug);
        drugsMap.set(drug.BatchID, curr);
      })
    } else if (resp.error) {
      res.error = resp.error;
      return res;
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
  }, [getDrugsByTransferUseCase, getAllBatchesUseCase, transferID]);
  
  const {
    list: drugViewModels,
    isLoading: drugViewModelsIsLoading,
    error: drugViewModelsError,
    execute: fetchDrugViewModels
  } = useApiRequest<DrugViewModel, []>(getDrugViewModel)

  const filteredDrugViewModels = useMemo(() => {
    if (!drugViewModels) {
      return [];
    }
    const query = batchSearchQuery.toLowerCase();
    if (!query) {
      return drugViewModels;
    }
    return drugViewModels.filter(
      (vm) =>
        vm.BatchID.toLowerCase().includes(query) ||
        vm.DrugName.toLowerCase().includes(query)
    );
  }, [drugViewModels, batchSearchQuery]);

  useEffect(() => {
    fetchDrugViewModels()
  }, [fetchDrugViewModels]);

  useEffect(() => {
    getTranfser().then(result => {
      if (result.success && result.value) {
        setTransfer(result.value);
      }
    })
  }, [getTranfser]);

  useEffect(() => {
    if (transfer && otherOrgs.length > 0) {
      const foundReceiver = otherOrgs.find(org => org.ID === transfer.ReceiverID);
      setReceiver(foundReceiver || null);
    }
  }, [transfer, otherOrgs])

  return {
    transfer,
    sender: user,
    receiver,
    drugViewModels: filteredDrugViewModels,
    drugViewModelsIsLoading,
    drugViewModelsError,
    batchSearchQuery,
    setBatchSearchQuery,
  }
}
