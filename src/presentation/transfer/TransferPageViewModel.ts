import { useApiRequest } from "@/core/hooks/useApiRequest";
import { TransferApiDataSource } from "@/data/datasource/api/TransferApiDataSource";
import { TransferRepositoryDataSource } from "@/data/repository/TransferRepositoryDataSource";
import { Transfer } from "@/domain/model/transfer/Transfer";
import { GetMyTransfers } from "@/domain/usecase/transfer/GetMyTransfers";
import { useMemo, useCallback, useEffect, useState } from "react";

export default function TransferPageViewModel() {
  const transferDataSource = useMemo(() => new TransferApiDataSource(), []);
  const transferRepository = useMemo(() => new TransferRepositoryDataSource(transferDataSource), [transferDataSource]);
  const getMyTransfersUseCase = useMemo(() => new GetMyTransfers(transferRepository), [transferRepository]);

  const fetchMyTransfers = useCallback(async () => {
    return getMyTransfersUseCase.execute();
  }, [getMyTransfersUseCase]);

  const {
    list: allTransfers, // Renamed from 'transfers' to 'allTransfers' to avoid conflict later if needed
    isLoading: transfersIsLoading,
    error: transfersError,
    execute: loadMyTransfers
  } = useApiRequest<Transfer, []>(fetchMyTransfers);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadMyTransfers();
  }, [loadMyTransfers]);

  const filteredTransfers = useMemo(() => {
    if (!allTransfers) return [];
    if (!searchQuery) return allTransfers;

    return allTransfers.filter(
      (transfer) =>
        transfer.ID.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transfer.ReceiverID.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (transfer.isAccepted ? "completed" : "pending").includes(searchQuery.toLowerCase())
    );
  }, [allTransfers, searchQuery]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return {
    allTransfers,
    filteredTransfers,
    transfersIsLoading,
    transfersError,
    searchQuery,
    handleSearchChange,
    loadMyTransfers // To allow manual refresh if needed
  };
}
