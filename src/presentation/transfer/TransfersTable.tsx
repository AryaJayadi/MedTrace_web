import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Transfer } from "@/domain/model/transfer/Transfer";
import useViewModel from "./TransfersTableViewModel";

interface TransfersTableProps {
  transfers: Transfer[];
  onTransferUpdate: () => void;
  currentUserId: string;
}

export default function TransfersTable({
  transfers,
  onTransferUpdate,
  currentUserId,
}: TransfersTableProps) {
  const {
    actionStates,
    handleAccept,
    handleReject,
  } = useViewModel(onTransferUpdate);

  if (!transfers || transfers.length === 0) {
    return (
      <div className="bg-card text-card-foreground rounded-xl p-8 shadow-lg flex flex-col items-center justify-center text-center py-16">
        <div className="bg-primary/10 p-4 rounded-full mb-6">
          <XCircle className="h-10 w-10 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No Transfers Found
        </h3>
        <p className="text-muted-foreground max-w-md">
          There are currently no transfers to display.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="border-b border-border">
            <TableHead className="font-semibold text-muted-foreground">Transfer ID</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Sender ID</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Receiver ID</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Transfer Date</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Status</TableHead>
            <TableHead className="font-semibold text-muted-foreground text-center">Actions / Receive Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-card-foreground">
          {transfers.map((transfer) => {
            const isCurrentUserReceiver = transfer.ReceiverID === currentUserId;
            const transferActionState = actionStates[transfer.ID] || { isLoading: false };

            return (
              <TableRow
                key={transfer.ID}
                className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
              >
                <TableCell className="font-medium text-foreground">{transfer.ID}</TableCell>
                <TableCell>{transfer.SenderID}</TableCell>
                <TableCell>{transfer.ReceiverID}</TableCell>
                <TableCell>{transfer.TransferDate ? new Date(transfer.TransferDate).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "capitalize font-medium px-2.5 py-0.5 text-xs",
                      transfer.isAccepted &&
                      "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700",
                      !transfer.isAccepted &&
                      "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700"
                    )}
                  >
                    {transfer.isAccepted ? "Accepted" : transfer.ReceiveDate ? "Rejected" : "Pending"}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  {transferActionState.isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                  ) : transferActionState.error ? (
                    <div className="flex items-center justify-center text-destructive" title={transferActionState.error}>
                      <AlertCircle className="h-5 w-5 mr-1" /> Error
                    </div>
                  ) : !transfer.isAccepted && isCurrentUserReceiver ? (
                    <div className="flex justify-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAccept(transfer.ID)}
                        className="bg-green-500 hover:bg-green-600 text-white border-green-600"
                      >
                        <CheckCircle className="h-4 w-4 mr-1.5" /> Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(transfer.ID)}
                        className="bg-red-500 hover:bg-red-600 text-white border-red-600"
                      >
                        <XCircle className="h-4 w-4 mr-1.5" /> Reject
                      </Button>
                    </div>
                  ) : transfer.ReceiveDate ? (
                    new Date(transfer.ReceiveDate).toLocaleDateString()
                  ) : transfer.isAccepted ? (
                    'N/A'
                  ) : (
                    'Not Yet Actioned'
                  )}
                </TableCell>
              </TableRow>
            )
          }
          )}
        </TableBody>
      </Table>
    </div>
  );
}
