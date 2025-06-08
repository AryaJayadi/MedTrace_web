import { AcceptTransfer } from "@/domain/usecase/transfer/AcceptTransfer";
import { RejectTransfer } from "@/domain/usecase/transfer/RejectTransfer";
import { TransferApiDataSource } from "@/data/datasource/api/TransferApiDataSource";
import { TransferRepositoryDataSource } from "@/data/repository/TransferRepositoryDataSource";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { ProcessTransferRequest } from "@/domain/model/transfer/ProcessTransferRequest";
import { useNavigate } from "react-router";
import { ROUTES } from "@/core/Routes";

export default function TransfersTableViewModel(onTransferUpdate: () => void) {
  const navigate = useNavigate()
  const transferDataSource = useMemo(() => new TransferApiDataSource(), []);
  const transferRepository = useMemo(() => new TransferRepositoryDataSource(transferDataSource), [transferDataSource]);

  const acceptTransferUseCase = useMemo(() => new AcceptTransfer(transferRepository), [transferRepository]);
  const rejectTransferUseCase = useMemo(() => new RejectTransfer(transferRepository), [transferRepository]);

  const [actionStates, setActionStates] = useState<{ [transferId: string]: { isLoading: boolean; error?: string } }>({});

  function handleView(transferID: string) {
    navigate(ROUTES.FULL_PATH_APP_TRANSFER_VIEW.replace(":transferID", transferID));
  }

  const handleAccept = useCallback(async (transferId: string) => {
    setActionStates(prev => ({ ...prev, [transferId]: { isLoading: true } }));
    const request: ProcessTransferRequest = { transferID: transferId, ReceiveDate: new Date().toISOString() };
    try {
      const result = await acceptTransferUseCase.execute(request);
      if (result.success) {
        toast.success("Transfer Accepted", { description: `Transfer ${transferId} has been accepted.` });
        onTransferUpdate(); // Callback to tell parent to refresh list
      } else {
        const errorMsg = result.error?.message || "Failed to accept transfer";
        toast.error("Acceptance Failed", { description: errorMsg });
        setActionStates(prev => ({ ...prev, [transferId]: { isLoading: false, error: errorMsg } }));
      }
    } catch (e: any) {
      const errorMsg = e.message || "An unexpected error occurred";
      toast.error("Acceptance Error", { description: errorMsg });
      setActionStates(prev => ({ ...prev, [transferId]: { isLoading: false, error: errorMsg } }));
    }
    // No finally to reset isLoading, as parent will refresh and row might disappear or change state
  }, [acceptTransferUseCase, onTransferUpdate]);

  const handleReject = useCallback(async (transferId: string) => {
    setActionStates(prev => ({ ...prev, [transferId]: { isLoading: true } }));
    const request: ProcessTransferRequest = { transferID: transferId, ReceiveDate: new Date().toISOString() };
    try {
      const result = await rejectTransferUseCase.execute(request);
      if (result.success) {
        toast.success("Transfer Rejected", { description: `Transfer ${transferId} has been rejected.` });
        onTransferUpdate();
      } else {
        const errorMsg = result.error?.message || "Failed to reject transfer";
        toast.error("Rejection Failed", { description: errorMsg });
        setActionStates(prev => ({ ...prev, [transferId]: { isLoading: false, error: errorMsg } }));
      }
    } catch (e: any) {
      const errorMsg = e.message || "An unexpected error occurred";
      toast.error("Rejection Error", { description: errorMsg });
      setActionStates(prev => ({ ...prev, [transferId]: { isLoading: false, error: errorMsg } }));
    }
  }, [rejectTransferUseCase, onTransferUpdate]);

  return {
    actionStates,
    handleView,
    handleAccept,
    handleReject,
  };
}
