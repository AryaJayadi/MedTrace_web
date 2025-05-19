import { cn } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Package, Pencil, Trash2 } from "lucide-react"
import { useState } from "react"

// This would typically come from an API
interface Batch {
  id: string;
  drugName: string;
  quantity: number;
  productionDate: string;
  expiryDate: string;
  status: string; // "active", "pending", "expired"
}

// This would typically come from an API
const initialBatches: Batch[] = [
  {
    id: "B-001",
    drugName: "Paracetamol",
    quantity: 100000,
    productionDate: "2025-01-01",
    expiryDate: "2027-01-01",
    status: "active",
  },
  {
    id: "B-002",
    drugName: "Amoxicillin",
    quantity: 50000,
    productionDate: "2025-02-15",
    expiryDate: "2026-02-15",
    status: "active",
  },
  {
    id: "B-003",
    drugName: "Ibuprofen",
    quantity: 75000,
    productionDate: "2025-03-10",
    expiryDate: "2027-03-10",
    status: "pending",
  },
  {
    id: "B-004",
    drugName: "Aspirin",
    quantity: 20000,
    productionDate: "2024-01-01",
    expiryDate: "2025-01-01",
    status: "expired",
  },
];

export default function BatchesTable() {
  const [data, setData] = useState<Batch[]>(initialBatches);

  // getStatusBadgeClasses function is no longer needed as styles are applied directly

  // TODO: Implement actual edit and delete functions
  const handleEdit = (batchId: string) => {
    console.log("Edit batch:", batchId);
    // Navigate to edit page or open a modal
  };

  const handleDelete = (batchId: string) => {
    console.log("Delete batch:", batchId);
    // Show confirmation dialog and then remove from data
    // setData(data.filter(batch => batch.id !== batchId));
  };

  if (!data || data.length === 0) {
    // Assumes 'card', 'card-foreground', 'primary', 'foreground',
    // 'muted-foreground' are aliased in @theme inline and produce utilities
    // like bg-card, text-primary etc.
    return (
      <div className="bg-card text-card-foreground rounded-xl p-8 shadow-lg flex flex-col items-center justify-center text-center py-16">
        <div className="bg-primary/10 p-4 rounded-full mb-6"> {/* Assumes 'primary' utility exists */}
          <Package className="h-10 w-10 text-primary" /> {/* Using Package icon */}
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No Batches Found
        </h3>
        <p className="text-muted-foreground max-w-md">
          Create your first batch to get started.
        </p>
      </div>
    );
  }

  return (
    // Assumes 'border', 'muted', 'card-foreground', 'foreground' produce utilities
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="border-b border-border">
            <TableHead className="font-semibold text-muted-foreground">Batch ID</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Drug Name</TableHead>
            <TableHead className="font-semibold text-muted-foreground text-right">Quantity</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Production Date</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Expiry Date</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Status</TableHead>
            <TableHead className="text-right font-semibold text-muted-foreground">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-card-foreground">
          {data.map((batch) => (
            <TableRow
              key={batch.id}
              className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
            >
              <TableCell className="font-medium text-foreground">{batch.id}</TableCell>
              <TableCell>{batch.drugName}</TableCell>
              <TableCell className="text-right">{batch.quantity.toLocaleString()}</TableCell>
              <TableCell>{batch.productionDate}</TableCell>
              <TableCell>{batch.expiryDate}</TableCell>
              <TableCell>
                <Badge
                  variant="outline" // Outline variant uses theme's border color by default.
                  // We are overriding bg, text, and border for status indication.
                  className={cn(
                    "capitalize font-medium px-2.5 py-0.5 text-xs", // Base badge styles
                    batch.status.toLowerCase() === "active" &&
                    "bg-status-info-background text-status-info-foreground border-status-info-border", // Blue for active
                    batch.status.toLowerCase() === "pending" &&
                    "bg-status-pending-background text-status-pending-foreground border-status-pending-border", // Yellow for pending
                    batch.status.toLowerCase() === "expired" &&
                    "bg-status-rejected-background text-status-rejected-foreground border-status-rejected-border", // Red for expired
                    // Fallback for any other status not explicitly defined
                    !["active", "pending", "expired"].includes(batch.status.toLowerCase()) &&
                    "bg-muted text-muted-foreground border-border" // Uses general theme utilities
                  )}
                >
                  {batch.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleEdit(batch.id)}
                    aria-label={`Edit batch ${batch.id}`}
                    className={cn(
                      "p-1.5 rounded-md transition-colors",
                      "text-muted-foreground hover:text-primary hover:bg-primary/10", // Uses primary theme for hover
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                    )}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(batch.id)}
                    aria-label={`Delete batch ${batch.id}`}
                    className={cn(
                      "p-1.5 rounded-md transition-colors",
                      "text-muted-foreground hover:text-destructive hover:bg-destructive/10", // Uses destructive theme for hover
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                    )}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
