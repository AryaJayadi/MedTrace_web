import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from 'lucide-react'
import { useState } from "react"
import { cn } from "@/lib/utils"

interface Transfer {
  id: string;
  batchId: string;
  drugName: string;
  quantity: number;
  sender: string;
  receiver: string;
  status: string;
  date: string;
}

interface TransfersTableProps {
  transfers: Transfer[];
}

export default function TransfersTable({
  transfers: initialTransfers,
}: TransfersTableProps) {
  const [transfers, setTransfers] = useState<Transfer[]>(initialTransfers);

  const handleAccept = (id: string) => {
    setTransfers(
      transfers.map((transfer) =>
        transfer.id === id ? { ...transfer, status: "completed" } : transfer
      )
    );
    // TODO: Add API call to update status on the backend
    console.log(`Transfer ${id} accepted.`);
  };

  const handleReject = (id: string) => {
    setTransfers(
      transfers.map((transfer) =>
        transfer.id === id ? { ...transfer, status: "rejected" } : transfer
      )
    );
    // TODO: Add API call to update status on the backend
    console.log(`Transfer ${id} rejected.`);
  };

  if (!transfers || transfers.length === 0) {
    return (
      <div className="bg-card text-card-foreground rounded-xl p-8 shadow-lg flex flex-col items-center justify-center text-center py-16">
        <div className="bg-primary/10 p-4 rounded-full mb-6"> {/* Assumes 'primary' utility exists */}
          <XCircle className="h-10 w-10 text-primary" /> {/* Assumes 'text-primary' utility exists */}
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
        <TableHeader className="bg-muted/50"> {/* Assumes 'muted' utility exists */}
          <TableRow className="border-b border-border">
            <TableHead className="font-semibold text-muted-foreground">Transfer ID</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Batch ID</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Drug Name</TableHead>
            <TableHead className="font-semibold text-muted-foreground text-right">Quantity</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Receiver</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Status</TableHead>
            <TableHead className="font-semibold text-muted-foreground text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-card-foreground">
          {transfers.map((transfer) => (
            <TableRow
              key={transfer.id}
              className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
            >
              <TableCell className="font-medium text-foreground">{transfer.id}</TableCell>
              <TableCell>{transfer.batchId}</TableCell>
              <TableCell>{transfer.drugName}</TableCell>
              <TableCell className="text-right">{transfer.quantity.toLocaleString()}</TableCell>
              <TableCell>{transfer.receiver}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={cn(
                    "capitalize font-medium px-2.5 py-0.5 text-xs",
                    transfer.status.toLowerCase() === "completed" &&
                    "bg-status-completed-background text-status-completed-foreground border-status-completed-border",
                    transfer.status.toLowerCase() === "pending" &&
                    "bg-status-pending-background text-status-pending-foreground border-status-pending-border",
                    transfer.status.toLowerCase() === "rejected" &&
                    "bg-status-rejected-background text-status-rejected-foreground border-status-rejected-border",
                    // Fallback for any other status not explicitly defined
                    !["completed", "pending", "rejected"].includes(transfer.status.toLowerCase()) &&
                    "bg-muted text-muted-foreground border-border"
                  )}
                >
                  {transfer.status}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                {transfer.status.toLowerCase() === "pending" ? (
                  <div className="flex justify-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleAccept(transfer.id)}
                      className="bg-status-accept-background hover:bg-status-accept-hover-background text-status-accept-foreground"
                      aria-label={`Accept transfer ${transfer.id}`}
                    >
                      <CheckCircle className="h-4 w-4 mr-1.5" /> Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReject(transfer.id)}
                      className="bg-status-reject-background border-status-reject-border text-status-reject-foreground hover:bg-status-reject-hover-background hover:text-status-reject-foreground focus-visible:ring-status-reject-background"
                      aria-label={`Reject transfer ${transfer.id}`}
                    >
                      <XCircle className="h-4 w-4 mr-1.5" /> Reject
                    </Button>
                  </div>
                ) : (
                  <span className={cn(
                    "text-sm font-medium",
                    transfer.status.toLowerCase() === "completed" ? "text-status-completed-foreground" : "",
                    transfer.status.toLowerCase() === "rejected" ? "text-status-rejected-foreground" : ""
                  )}>
                    {transfer.status === "completed" ? "Accepted" : "Rejected"}
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
