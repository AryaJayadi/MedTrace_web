
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/core/Routes";
import { Plus, ArrowRightLeft } from "lucide-react"
import { Link } from "react-router"

export default function TransfersPage() {
  return (
    // Main container for the page
    <div className="space-y-6 p-4 md:p-6">
      {/* Page Header: Title and Create Transfer Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Page Title: Uses themed foreground color */}
        <h1 className="text-2xl font-bold text-foreground">Transfer Management</h1>
        {/* Create Transfer Button */}
        {/* - bg-primary text-primary-foreground: Themed primary button.
            If this is a shadcn/ui Button, default variant might already apply this.
        */}
        <Link to={ROUTES.FULL_PATH_APP_TRANSFER_CREATE}>
          <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="mr-2 h-4 w-4" /> Create Transfer
          </Button>
        </Link>
      </div>

      {/* Empty State / Content Area */}
      {/* - bg-card: Themed background.
          - text-card-foreground: Default text color within this area.
          - rounded-xl: Kept from original.
          - shadow-lg: Standard Tailwind shadow.
          - p-8, py-16: Padding.
      */}
      <div className="bg-card text-card-foreground rounded-xl p-8 card-shadow flex flex-col items-center justify-center text-center py-16 shadow-lg">
        {/* Icon Container */}
        {/* - bg-primary/10: Light themed primary background (or accent/10 if more appropriate).
            - text-primary: Themed color for the icon.
        */}
        <div className="bg-primary/10 p-4 rounded-full mb-6"> {/* Increased mb */}
          <ArrowRightLeft className="h-10 w-10 text-primary" /> {/* Increased icon size */}
        </div>

        {/* Empty State Title */}
        {/* - text-xl font-medium text-foreground: Themed text. */}
        <h3 className="text-xl font-semibold text-foreground mb-2"> {/* Changed font-medium to font-semibold */}
          No Transfers Yet
        </h3>
        {/* Empty State Description */}
        {/* - text-muted-foreground: Themed color for less prominent text. */}
        <p className="text-muted-foreground max-w-md mb-8"> {/* Increased mb */}
          Start transferring batches to distributors, hospitals, or pharmacies to track your supply chain.
        </p>
        {/* Create First Transfer Button */}
        <Link to={ROUTES.FULL_PATH_APP_TRANSFER_CREATE}>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground"> {/* Added size="lg" */}
            <Plus className="mr-2 h-5 w-5" /> Create Your First Transfer
          </Button>
        </Link>
      </div>
      {/* If there were transfers, a table similar to BatchesTable would go here.
        Example: <TransfersTable /> 
      */}
    </div>
  );
}
