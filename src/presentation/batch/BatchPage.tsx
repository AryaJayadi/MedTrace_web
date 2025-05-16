import BatchesTable from "@/components/batches-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Filter } from "lucide-react"
import { Link } from "react-router"

export default function BatchesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Batch Management</h1>
      </div>

      <div className="bg-white rounded-xl p-6 card-shadow">
        <div className="flex justify-between items-center mb-6">
          <div className="w-full max-w-lg relative">
            <Input placeholder="Filter batches..." className="pl-10 border-gray-200 rounded-lg focus:ring-primary" />
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <Link to="/batches/create">
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="mr-2 h-4 w-4" /> Create Batch
            </Button>
          </Link>
        </div>

        <BatchesTable />
      </div>
    </div>
  )
}
