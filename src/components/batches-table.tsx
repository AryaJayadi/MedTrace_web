import { cn } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2 } from "lucide-react"
import { useState } from "react"

// This would typically come from an API
const initialBatches = [
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
    expiryDate: "2025-01-01", // Example of an expired batch
    status: "expired",
  },
];

export default function BatchesTable() {
  const [data, setData] = useState(initialBatches);

  // Function to determine badge styling based on status
  // This now uses themed variables.
  // For more specific status colors, you might define variables like
  // --status-active-background, --status-active-foreground, etc. in your global.css
  // and map them in tailwind.config.js
  const getStatusBadgeClasses = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        // Using accent for active, assuming accent is a positive/neutral color like green or blue
        // bg-accent/10 for a light background, text-accent for darker text.
        return "bg-primary/10 text-primary border-primary/20";
      case "pending":
        // Using a generic approach for pending, could be a yellow-ish or blue-ish accent
        // For example, if you have chart-1 as a yellow-ish color:
        return "bg-chart-1/10 text-chart-1 border-chart-1/20";
      case "expired":
        // Using destructive for expired status
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        // Default fallback using muted colors
        return "bg-muted/50 text-muted-foreground border-border";
    }
  };

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


  return (
    // Table container
    // - rounded-lg: Keeps rounded corners.
    // - border border-border: Uses the themed border color.
    // - overflow-hidden: Necessary for rounded corners on the table itself.
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        {/* Table Header */}
        {/* - bg-muted/50: A very light background for the header, using a muted theme color.
            Alternatively, bg-card or bg-background could be used for a flatter look.
        */}
        <TableHeader className="bg-muted/50">
          <TableRow className="border-b border-border">
            {/* Table Headings */}
            {/* - text-muted-foreground: Uses themed color for less prominent text.
                - font-semibold: Standard bolding.
            */}
            <TableHead className="font-semibold text-muted-foreground">Batch ID</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Drug Name</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Quantity</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Production Date</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Expiry Date</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Status</TableHead>
            <TableHead className="text-right font-semibold text-muted-foreground">Actions</TableHead>
          </TableRow>
        </TableHeader>
        {/* Table Body */}
        {/* - text-card-foreground: Default text color for table cells, inherited from parent card or set here. */}
        <TableBody className="text-card-foreground">
          {data.length === 0 ? (
            // Empty state row
            <TableRow>
              <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                No batches found.
                {/* You could add a button here to "Create New Batch" if desired */}
              </TableCell>
            </TableRow>
          ) : (
            // Data rows
            data.map((batch) => (
              <TableRow
                key={batch.id}
                // - hover:bg-muted/30: Light hover effect using a muted theme color.
                // - border-b border-border: Bottom border for each row.
                className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
              >
                <TableCell className="font-medium text-foreground">{batch.id}</TableCell>
                <TableCell>{batch.drugName}</TableCell>
                <TableCell>{batch.quantity.toLocaleString()}</TableCell>
                <TableCell>{batch.productionDate}</TableCell>
                <TableCell>{batch.expiryDate}</TableCell>
                <TableCell>
                  {/* Badge for status */}
                  {/* - variant="outline" is kept from original.
                      - getStatusBadgeClasses provides themed background, text, and border colors.
                  */}
                  <Badge
                    variant="outline"
                    className={cn("capitalize font-medium", getStatusBadgeClasses(batch.status))}
                  >
                    {batch.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {/* Action buttons */}
                  <div className="flex justify-end gap-2">
                    {/* Edit Button */}
                    <button
                      onClick={() => handleEdit(batch.id)}
                      aria-label={`Edit batch ${batch.id}`}
                      className={cn(
                        "p-1.5 rounded-md transition-colors",
                        "text-muted-foreground hover:text-primary hover:bg-primary/10",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                      )}
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(batch.id)}
                      aria-label={`Delete batch ${batch.id}`}
                      className={cn(
                        "p-1.5 rounded-md transition-colors",
                        "text-muted-foreground hover:text-destructive hover:bg-destructive/10",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                      )}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
