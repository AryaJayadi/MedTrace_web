import { cn } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Package, Pencil, Trash2, Loader2, AlertCircle } from "lucide-react"
import { Batch } from "@/domain/model/batch/Batch"
import useViewModel from "./BatchesTableViewModel"

interface BatchesTableProps {
  batches: Batch[];
}

export default function BatchesTable({ batches }: BatchesTableProps) {
  const {
    batchQuantities,
    batchQuantitiesLoading,
    batchQuantitiesError,
    handleEdit,
    handleDelete,
  } = useViewModel(batches);

  if (!batches || batches.length === 0) {
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
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="border-b border-border">
            <TableHead className="font-semibold text-muted-foreground">Batch ID</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Drug Name</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Quantity</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Production Date</TableHead>
            <TableHead className="font-semibold text-muted-foreground">Expiry Date</TableHead>
            <TableHead className="text-right font-semibold text-muted-foreground">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-card-foreground">
          {batches.map((batch) => (
            <TableRow
              key={batch.ID}
              className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
            >
              <TableCell className="font-medium text-foreground">{batch.ID}</TableCell>
              <TableCell>{batch.DrugName}</TableCell>
              <TableCell className="">
                {batchQuantitiesLoading[batch.ID] ? (
                  <Loader2 className="h-4 w-4 animate-spin inline-block" />
                ) : batchQuantitiesError[batch.ID] ? (
                  <div className="flex items-center justify-end text-destructive">
                    <AlertCircle className="h-4 w-4 mr-1 inline-block" />
                    <span className="sr-only">Error: {batchQuantitiesError[batch.ID]}</span>
                    N/A
                  </div>
                ) : batchQuantities[batch.ID] !== undefined ? (
                  batchQuantities[batch.ID]!.toLocaleString()
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell>{batch.ProductionDate}</TableCell>
              <TableCell>{batch.ExpiryDate}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleEdit(batch.ID)}
                    aria-label={`Edit batch ${batch.ID}`}
                    className={cn(
                      "p-1.5 rounded-md transition-colors",
                      "text-muted-foreground hover:text-primary hover:bg-primary/10", // Uses primary theme for hover
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                    )}
                  >
                    <Pencil className="h-4 w-4" />
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
