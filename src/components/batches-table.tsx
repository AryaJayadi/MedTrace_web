import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2 } from "lucide-react"
import { useState } from "react"

// This would typically come from an API
const batches = [
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
]

export default function BatchesTable() {
  const [data, setData] = useState(batches)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "expired":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="rounded-lg overflow-hidden border border-gray-100">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="font-semibold text-gray-600">Batch ID</TableHead>
            <TableHead className="font-semibold text-gray-600">Drug Name</TableHead>
            <TableHead className="font-semibold text-gray-600">Quantity</TableHead>
            <TableHead className="font-semibold text-gray-600">Production Date</TableHead>
            <TableHead className="font-semibold text-gray-600">Expiry Date</TableHead>
            <TableHead className="font-semibold text-gray-600">Status</TableHead>
            <TableHead className="text-right font-semibold text-gray-600">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                No batches found. Create your first batch to get started.
              </TableCell>
            </TableRow>
          ) : (
            data.map((batch) => (
              <TableRow key={batch.id} className="hover:bg-gray-50 transition-colors">
                <TableCell className="font-medium">{batch.id}</TableCell>
                <TableCell>{batch.drugName}</TableCell>
                <TableCell>{batch.quantity.toLocaleString()}</TableCell>
                <TableCell>{batch.productionDate}</TableCell>
                <TableCell>{batch.expiryDate}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`${getStatusColor(batch.status)} capitalize`}>
                    {batch.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-1 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button className="p-1 rounded-full hover:bg-red-50 text-red-500 transition-colors">
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
  )
}
