
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Calendar, ArrowLeft, Save } from "lucide-react"
import { Link, useNavigate } from "react-router"
import { ROUTES } from "@/core/Routes"
import { cn } from "@/lib/utils"

export default function CreateBatchPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    drugName: "",
    quantity: "",
    productionDate: "",
    expiryDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to an API
    console.log("Submitting batch:", formData);

    // Navigate back to batches list
    navigate(ROUTES.FULL_PATH_APP_BATCH);
  };

  return (
    // Main container for the page
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Page Header: Back link and Title */}
      <div className="mb-6 flex items-center gap-3">
        <Link
          to={ROUTES.FULL_PATH_APP_BATCH}
          aria-label="Back to batches"
          className={cn(
            "p-2 rounded-md transition-colors",
            "text-muted-foreground hover:text-primary hover:bg-primary/10",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        {/* Page Title: Uses themed foreground color */}
        <h1 className="text-2xl font-bold text-foreground">Create New Batch</h1>
      </div>

      {/* Main Card for the form */}
      {/* - bg-card: Themed background for the card.
          - text-card-foreground: Default text color within the card.
          - shadow-lg: Standard Tailwind shadow.
      */}
      <Card className="bg-card text-card-foreground shadow-lg">
        {/* Card Header */}
        {/* - bg-muted/50: Light themed background for the header.
            - border-b border-border: Themed bottom border.
        */}
        <CardHeader className="bg-muted/50 border-b border-border">
          {/* Card Title: Uses themed foreground color (can be more specific if needed) */}
          <CardTitle className="text-lg font-medium text-foreground">
            Batch Information
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          {/* Card Content: Form fields */}
          <CardContent className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6"> {/* Adjusted gap-x */}
              {/* Informational Display: Manufacturer Name */}
              {/* - bg-accent/10: Light themed accent background.
                  - text-muted-foreground: For the label text.
                  - text-foreground: For the value text.
              */}
              <div className="bg-accent/10 p-4 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">
                  Manufacturer Name
                </div>
                <div className="font-medium text-foreground">
                  PT Manufacturer Pharmacy
                </div>
              </div>

              {/* Informational Display: Manufacture Location */}
              <div className="bg-accent/10 p-4 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">
                  Manufacture Location
                </div>
                <div className="font-medium text-foreground">
                  Kuala Lumpur, Malaysia
                </div>
              </div>

              {/* Form Field: Drug Name */}
              <div>
                {/* Label: Uses themed foreground color */}
                <Label htmlFor="drugName" className="text-foreground font-medium">
                  Drug Name
                </Label>
                <Input
                  id="drugName"
                  name="drugName"
                  value={formData.drugName}
                  onChange={handleChange}
                  placeholder="e.g., Paracetamol 500mg"
                  // - mt-1: Margin top.
                  // - border-input: Themed border for input.
                  // - focus:ring-2 focus:ring-ring: Themed focus ring.
                  // - placeholder:text-muted-foreground: Themed placeholder text.
                  className="mt-1 border-input focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
                  required
                />
              </div>

              {/* Form Field: Quantity */}
              <div>
                <Label htmlFor="quantity" className="text-foreground font-medium">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number" // Set type to number for quantity
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g., 100000"
                  className="mt-1 border-input focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
                  required
                />
              </div>

              {/* Form Field: Production Date */}
              <div>
                <Label htmlFor="productionDate" className="text-foreground font-medium">
                  Production Date
                </Label>
                <div className="relative">
                  <Input
                    id="productionDate"
                    name="productionDate"
                    type="date"
                    value={formData.productionDate}
                    onChange={handleChange}
                    className="mt-1 border-input focus:ring-2 focus:ring-ring"
                    required
                  />
                  {/* Calendar Icon: Uses themed muted foreground color */}
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none" />
                </div>
              </div>

              {/* Form Field: Expiry Date */}
              <div>
                <Label htmlFor="expiryDate" className="text-foreground font-medium">
                  Expiry Date
                </Label>
                <div className="relative">
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="mt-1 border-input focus:ring-2 focus:ring-ring"
                    required
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none" />
                </div>
              </div>
            </div>
          </CardContent>

          {/* Card Footer: Action Buttons */}
          {/* - bg-muted/50: Light themed background.
              - border-t border-border: Themed top border.
          */}
          <CardFooter className="flex justify-end gap-3 p-6 border-t border-border bg-muted/50">
            {/* Cancel Button */}
            {/* - variant="outline": Uses shadcn/ui outline variant which should be themed.
                If more specific control is needed:
                "border-border text-foreground hover:bg-muted"
            */}
            <Button
              type="button"
              variant="outline" // This should use themed outline styles
              onClick={() => navigate(ROUTES.FULL_PATH_APP_BATCH)}
            >
              Cancel
            </Button>
            {/* Save Button */}
            {/* - bg-primary text-primary-foreground: Themed primary button.
                If this is a shadcn/ui Button, default variant might already apply this.
            */}
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              <Save className="h-4 w-4" /> Save Batch
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
