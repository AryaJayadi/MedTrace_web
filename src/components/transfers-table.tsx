import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button" // Button might not be needed if actions are handled outside
import { CheckCircle, XCircle } from 'lucide-react'
// import { useState } from "react" // Removed useState as transfers are now passed as props
import { cn } from "@/lib/utils"
import { Transfer } from "@/domain/model/transfer/Transfer"; // Import domain model

// Removed local Transfer interface

interface TransfersTableProps {
  transfers: Transfer[]; // Use domain model type
}

export default function TransfersTable({
  transfers, // Directly use passed transfers
}: TransfersTableProps) {
  // Removed local state for transfers
  // const [transfers, setTransfers] = useState<Transfer[]>(initialTransfers);

  // Removed local handleAccept and handleReject functions
  // These actions should be handled by the parent component/page or a dedicated ViewModel

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
            {/* Removed Batch ID, Drug Name, Quantity headers */}
            <TableHead className="font-semibold text-muted-foreground">Sender ID</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Receiver ID</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Transfer Date</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Status</TableHead>
            <TableHead className="font-semibold text-muted-foreground text-center">Receive Date</TableHead> 
          </TableRow>
        </TableHeader>
        <TableBody className="text-card-foreground">
          {transfers.map((transfer) => (
            <TableRow
              key={transfer.ID} // Use ID from domain model
              className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
            >
              <TableCell className="font-medium text-foreground">{transfer.ID}</TableCell>
              {/* Removed batchId, drugName, quantity cells */}
              <TableCell>{transfer.SenderID}</TableCell>
              <TableCell>{transfer.ReceiverID}</TableCell>
              <TableCell>{transfer.TransferDate ? new Date(transfer.TransferDate).toLocaleDateString() : 'N/A'}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={cn(
                    "capitalize font-medium px-2.5 py-0.5 text-xs",
                    transfer.isAccepted && // Use isAccepted from domain model
                    "bg-status-completed-background text-status-completed-foreground border-status-completed-border", // Assuming these classes exist for 'accepted'
                    !transfer.isAccepted && // Example for 'pending' or 'rejected' - needs refinement based on actual status logic
                    "bg-status-pending-background text-status-pending-foreground border-status-pending-border" 
                    // Add more specific status checks if the model supports more than isAccepted (e.g., a separate 'status' field)
                  )}
                >
                  {transfer.isAccepted ? "Accepted" : "Pending/Rejected"} {/* Adjust based on actual status logic */}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                {transfer.ReceiveDate ? new Date(transfer.ReceiveDate).toLocaleDateString() : (transfer.isAccepted ? 'N/A' : 'Not Yet Received')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
