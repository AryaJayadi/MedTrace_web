
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/core/Routes";
import { Plus, ArrowRightLeft } from "lucide-react"
import { Link } from "react-router"

export default function TransferPage() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Transfer Management</h1>
        <Link to={ROUTES.FULL_PATH_APP_TRANSFER_CREATE}>
          <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="mr-2 h-4 w-4" /> Create Transfer
          </Button>
        </Link>
      </div>

      <div className="bg-card text-card-foreground rounded-xl p-8 card-shadow flex flex-col items-center justify-center text-center py-16 shadow-lg">
        <div className="bg-primary/10 p-4 rounded-full mb-6">
          <ArrowRightLeft className="h-10 w-10 text-primary" />
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-2">
          No Transfers Yet
        </h3>
        <p className="text-muted-foreground max-w-md mb-8">
          Start transferring batches to distributors, hospitals, or pharmacies to track your supply chain.
        </p>
        <Link to={ROUTES.FULL_PATH_APP_TRANSFER_CREATE}>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="mr-2 h-5 w-5" /> Create Your First Transfer
          </Button>
        </Link>
      </div>
    </div>
  );
}
