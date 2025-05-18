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
  sender: string; // This field was in your interface but not used in the table, kept it.
  receiver: string;
  status: string; // "pending", "completed", "rejected"
  date: string; // This field was in your interface but not used in the table, kept it.
}

interface TransfersTableProps {
  transfers: Transfer[];
}

export default function TransfersTable({
  transfers: initialTransfers,
}: TransfersTableProps) {
  const [transfers, setTransfers] = useState<Transfer[]>(initialTransfers);

  // Function to determine badge styling based on status, using themed variables.
  const getStatusBadgeClasses = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        // Using accent for completed, assuming accent is a positive color (e.g., green)
        return "bg-primary/10 text-primary border-primary/20";
      case "pending":
        // Using a chart color for pending, assuming it's a neutral/warning color (e.g., yellow/blue)
        return "bg-chart-1/10 text-chart-1 border-chart-1/20";
      case "rejected":
        // Using destructive for rejected status
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        // Default fallback using muted colors
        return "bg-muted/50 text-muted-foreground border-border";
    }
  };

  const handleAccept = (id: string) => {
    setTransfers(
      transfers.map((transfer) =>
        transfer.id === id ? { ...transfer, status: "completed" } : transfer
      )
    );
    // TODO: Add API call to update status on the backend
  };

  const handleReject = (id: string) => {
    setTransfers(
      transfers.map((transfer) =>
        transfer.id === id ? { ...transfer, status: "rejected" } : transfer
      )
    );
    // TODO: Add API call to update status on the backend
  };

  if (!transfers || transfers.length === 0) {
    return (
      <div className="bg-card text-card-foreground rounded-xl p-8 shadow-lg flex flex-col items-center justify-center text-center py-16">
        <div className="bg-primary/10 p-4 rounded-full mb-6">
          <XCircle className="h-10 w-10 text-primary" /> {/* Or another appropriate icon */}
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
    // Table container
    // - rounded-lg: Keeps rounded corners.
    // - border border-border: Uses the themed border color.
    // - overflow-hidden: Necessary for rounded corners on the table itself.
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        {/* Table Header */}
        {/* - bg-muted/50: A very light background for the header. */}
        <TableHeader className="bg-muted/50">
          <TableRow className="border-b border-border">
            {/* Table Headings: Use themed muted foreground color. */}
            <TableHead className="font-semibold text-muted-foreground">Transfer ID</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Batch ID</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Drug Name</TableHead>
            <TableHead className="font-semibold text-muted-foreground text-right">Quantity</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Receiver</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Status</TableHead>
            <TableHead className="font-semibold text-muted-foreground text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        {/* Table Body: Default text color from parent card or text-card-foreground. */}
        <TableBody className="text-card-foreground">
          {transfers.map((transfer) => (
            <TableRow
              key={transfer.id}
              // - hover:bg-muted/30: Light themed hover effect.
              // - border-b border-border: Bottom border for each row.
              className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
            >
              <TableCell className="font-medium text-foreground">{transfer.id}</TableCell>
              <TableCell>{transfer.batchId}</TableCell>
              <TableCell>{transfer.drugName}</TableCell>
              <TableCell className="text-right">{transfer.quantity.toLocaleString()}</TableCell>
              <TableCell>{transfer.receiver}</TableCell>
              <TableCell>
                {/* Status Badge: Uses themed classes from getStatusBadgeClasses. */}
                <Badge
                  variant="outline" // Kept from original, shadcn Badge should handle this well with themed border
                  className={cn("capitalize font-medium", getStatusBadgeClasses(transfer.status))}
                >
                  {transfer.status}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                {transfer.status === "pending" ? (
                  <div className="flex justify-center gap-2">
                    {/* Accept Button: Themed for a positive action. */}
                    <Button
                      size="sm"
                      onClick={() => handleAccept(transfer.id)}
                      // Assuming accent is green-like, or define a specific --success variable
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      aria-label={`Accept transfer ${transfer.id}`}
                    >
                      <CheckCircle className="h-4 w-4 mr-1.5" /> Accept
                    </Button>
                    {/* Reject Button: Themed for a destructive action. */}
                    <Button
                      size="sm"
                      variant="outline" // Outline variant for secondary destructive action
                      onClick={() => handleReject(transfer.id)}
                      // Explicitly styling for destructive outline button
                      className="border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      aria-label={`Reject transfer ${transfer.id}`}
                    >
                      <XCircle className="h-4 w-4 mr-1.5" /> Reject
                    </Button>
                  </div>
                ) : (
                  // Status Text for completed/rejected: Uses themed muted foreground color.
                  <span className={cn(
                    "text-sm font-medium",
                    transfer.status === "completed" ? "text-primary" : "text-destructive"
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
