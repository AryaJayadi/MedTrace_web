import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2, AlertCircle, Fullscreen } from 'lucide-react'
import { cn, formatDateLong, formatDateTime } from "@/lib/utils"
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
            <TableHead className="font-semibold text-muted-foreground">Role</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Sender ID</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Receiver ID</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Transfer Date</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Status</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Receive Date</TableHead>
            <TableHead className="font-semibold text-muted-foreground text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-card-foreground">
          {transfers.map((transfer) => {
            const isCurrentUserReceiver = transfer.ReceiverID === currentUserId;
            const transferActionState = actionStates[transfer.ID] || { isLoading: false };
            const isRejected = transfer.ReceiveDate && !transfer.isAccepted;

            return (
              <TableRow
                key={transfer.ID}
                className={cn(
                  "border-b border-border last:border-b-0 transition-colors",
                  !isCurrentUserReceiver ?
                    "bg-primary/10 hover:bg-primary/20"
                    :
                    "hover:bg-muted/30"
                )}
              >
                <TableCell className="font-medium text-foreground">{transfer.ID}</TableCell>
                <TableCell>{isCurrentUserReceiver ? "Receiver" : "Sender"}</TableCell>
                <TableCell>{transfer.SenderID}</TableCell>
                <TableCell>{transfer.ReceiverID}</TableCell>
                <TableCell>{transfer.TransferDate ? formatDateTime(transfer.TransferDate) : 'N/A'}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "capitalize font-medium px-2.5 py-0.5 text-xs",
                      transfer.isAccepted ?
                        "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700"
                        : isRejected ?
                          "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700"
                          :
                          "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700"
                    )}
                  >
                    {transfer.isAccepted ? "Accepted" : isRejected ? "Rejected" : "Pending"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {transferActionState.isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                  ) : transferActionState.error ? (
                    <div className="flex items-center justify-center text-destructive" title={transferActionState.error}>
                      <AlertCircle className="h-5 w-5 mr-1" /> Error
                    </div>
                  ) : transfer.ReceiveDate ? (
                    formatDateTime(transfer.ReceiveDate)
                  ) : transfer.isAccepted ? (
                    'N/A'
                  ) : (
                    'Not Yet Actioned'
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {transferActionState.isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                  ) : transferActionState.error ? (
                    <div className="flex items-center justify-center text-destructive" title={transferActionState.error}>
                      <AlertCircle className="h-5 w-5 mr-1" /> Error
                    </div>
                  ) : (
                    <div className="flex justify-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAccept(transfer.ID)}
                        className="bg-blue-500 hover:bg-blue-600 text-white border-blue-600"
                      >
                        <Fullscreen className="h-4 w-4 mr-0.5" /> View
                      </Button>
                      {!transfer.isAccepted && !isRejected && isCurrentUserReceiver && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAccept(transfer.ID)}
                            className="bg-green-500 hover:bg-green-600 text-white border-green-600"
                          >
                            <CheckCircle className="h-4 w-4 mr-0.5" /> Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReject(transfer.ID)}
                            className="bg-red-500 hover:bg-red-600 text-white border-red-600"
                          >
                            <XCircle className="h-4 w-4 mr-0.5" /> Reject
                          </Button>
                        </>
                      )}
                    </div>
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
