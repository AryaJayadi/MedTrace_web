import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Organization } from "@/domain/model/organization/Organization";
import { TransferApiDataSource } from "@/data/datasource/api/TransferApiDataSource";
import { TransferRepositoryDataSource } from "@/data/repository/TransferRepositoryDataSource";
import { GetTransfer } from "@/domain/usecase/transfer/GetTransfer";
import { Transfer } from "@/domain/model/transfer/Transfer";

export default function TransferDetailPageViewModel(transferID: string) {
  const {
    user,
    otherOrgs,
  } = useAuth();
  const [transfer, setTransfer] = useState<Transfer | null>(null)
  const [receiver, setReceiver] = useState<Organization | null>(null)

  const transferDataSource = useMemo(() => new TransferApiDataSource(), []);
  const transferRepository = useMemo(() => new TransferRepositoryDataSource(transferDataSource), [transferDataSource]);

  const getTransferUseCase = useMemo(() => new GetTransfer(transferRepository), [transferRepository]);
  const getTranfser = useCallback(async () => {
    return await getTransferUseCase.execute(transferID);
  }, [getTransferUseCase, transferID]);

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
  }
}
