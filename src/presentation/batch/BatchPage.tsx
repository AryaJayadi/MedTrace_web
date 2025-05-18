import BatchesTable from "@/components/batches-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ROUTES } from "@/core/Routes"
import { Plus, Filter, Package } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"

export default function BatchesPage() {
  const [hasBatches, setHasBatches] = useState(false);

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Batch Management</h1>
        <Link to={ROUTES.FULL_PATH_APP_BATCH_CREATE}>
          <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="mr-2 h-4 w-4" /> Create Batch
          </Button>
        </Link>
      </div>

      {hasBatches ? (
        <div className="bg-card text-card-foreground rounded-xl p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="w-full sm:max-w-md lg:max-w-lg relative">
              <Input
                placeholder="Filter batches..."
                className="pl-10 border-input rounded-lg focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
              />
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <Link to={ROUTES.FULL_PATH_APP_BATCH_CREATE} className="w-full sm:w-auto">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="mr-2 h-4 w-4" /> Create Batch
              </Button>
            </Link>
          </div>

          <BatchesTable />
        </div>
      ) : (
        <div className="bg-card text-card-foreground rounded-xl p-8 shadow-lg flex flex-col items-center justify-center text-center py-16">
          <div className="bg-primary/10 p-4 rounded-full mb-6">
            <Package className="h-10 w-10 text-primary" /> {/* Increased icon size */}
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No Batches Yet
          </h3>
          <p className="text-muted-foreground max-w-md mb-8">
            Start creating medication batches to track your pharmaceutical
            inventory and supply chain.
          </p>
          <Link to={ROUTES.FULL_PATH_APP_BATCH_CREATE}>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              <Plus className="h-5 w-5" /> Create Your First Batch
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
