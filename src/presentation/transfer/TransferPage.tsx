
import { Button } from "@/components/ui/button"
import { Plus, ArrowRightLeft } from "lucide-react"
import { Link } from "react-router"

export default function TransfersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Transfer Management</h1>
        <Link to={""}>
          <Button className="bg-primary hover:bg-primary/90 text-white">
            <Plus className="mr-2 h-4 w-4" /> Create Transfer
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-8 card-shadow flex flex-col items-center justify-center text-center py-16">
        <div className="bg-primary/10 p-4 rounded-full mb-4">
          <ArrowRightLeft className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-medium text-gray-800 mb-2">No Transfers Yet</h3>
        <p className="text-gray-500 max-w-md mb-6">
          Start transferring batches to distributors, hospitals, or pharmacies to track your supply chain.
        </p>
        <Link to={""}>
          <Button className="bg-primary hover:bg-primary/90 text-white">
            <Plus className="mr-2 h-4 w-4" /> Create Your First Transfer
          </Button>
        </Link>
      </div>
    </div>
  )
}
