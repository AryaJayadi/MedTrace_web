import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Package } from "lucide-react"
import useViewModel from "./DrugsTableViewModel"
import { DrugViewModel } from "./DrugViewModel"

interface DrugsTableProps {
  viewModels: DrugViewModel[];
}

export default function DrugsTable({ viewModels }: DrugsTableProps) {
  const {
  } = useViewModel();

  if (!viewModels || viewModels.length === 0) {
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
          </TableRow>
        </TableHeader>
        <TableBody className="text-card-foreground">
          {viewModels.map((model) => (
            <TableRow
              key={model.BatchID}
              className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
            >
              <TableCell className="font-medium text-foreground">{model.BatchID}</TableCell>
              <TableCell>{model.DrugName}</TableCell>
              <TableCell className="">
                {model.Quantity.toLocaleString()}
              </TableCell>
              <TableCell>{model.ProductionDate}</TableCell>
              <TableCell>{model.ExpiryDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
