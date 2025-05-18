import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Search, ArrowLeft, Save, Building, MapPin, Package } from "lucide-react"
import { Link, useNavigate } from "react-router"
import { ROUTES } from "@/core/Routes"
import { cn } from "@/lib/utils"
import useViewModel from "./CreateTransferPageViewModel"

// Define a type for a batch if not already defined elsewhere
interface Batch {
  id: string;
  productionDate: string;
  expiryDate: string;
  drugName: string;
  quantity: number;
  remainingQty: number;
  selectedQty: number | string; // Can be string during input
}

// Define a type for form data
interface TransferFormData {
  receiverType: string;
  company: string;
  searchQuery: string;
  selectedBatches: { id: string; quantity: number }[]; // Store ID and selected quantity
}

export default function CreateTransferPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TransferFormData>({
    receiverType: "",
    company: "",
    searchQuery: "",
    selectedBatches: [],
  });
  const {

  } = useViewModel();

  // This would come from an API in a real application
  const [availableBatches, setAvailableBatches] = useState<Batch[]>([
    {
      id: "B-001",
      productionDate: "2025-01-01",
      expiryDate: "2027-01-01",
      drugName: "Paracetamol",
      quantity: 100000,
      remainingQty: 100000,
      selectedQty: "", // Initialize as empty string for input
    },
    {
      id: "B-002",
      productionDate: "2025-02-15",
      expiryDate: "2026-02-15",
      drugName: "Amoxicillin",
      quantity: 50000,
      remainingQty: 30000, // Example of partially used batch
      selectedQty: "",
    },
    {
      id: "B-003",
      productionDate: "2024-12-01",
      expiryDate: "2025-12-01",
      drugName: "Ibuprofen",
      quantity: 75000,
      remainingQty: 0, // Example of fully used batch (should ideally not be selectable or shown)
      selectedQty: "",
    },
  ]);

  // Handle changes to selected quantity for a specific batch
  const handleBatchQuantityChange = (batchId: string, quantity: string) => {
    const numQuantity = parseInt(quantity, 10);
    setAvailableBatches((prevBatches) =>
      prevBatches.map((batch) =>
        batch.id === batchId
          ? {
            ...batch,
            selectedQty: isNaN(numQuantity) ? "" : Math.max(0, Math.min(numQuantity, batch.remainingQty)),
          }
          : batch
      )
    );
  };

  // Handle checkbox change for selecting/deselecting a batch
  const handleBatchSelectionChange = (batchId: string, checked: boolean) => {
    setFormData((prev) => {
      const currentBatch = availableBatches.find(b => b.id === batchId);
      if (!currentBatch) return prev;

      let newSelectedBatches;
      if (checked) {
        // Add or update batch, ensuring selectedQty is a number
        const qtyToSelect = typeof currentBatch.selectedQty === 'string' && currentBatch.selectedQty !== '' ? parseInt(currentBatch.selectedQty, 10) : (typeof currentBatch.selectedQty === 'number' ? currentBatch.selectedQty : 0);

        if (qtyToSelect > 0 && qtyToSelect <= currentBatch.remainingQty) {
          const existing = prev.selectedBatches.find(b => b.id === batchId);
          if (existing) {
            newSelectedBatches = prev.selectedBatches.map(b => b.id === batchId ? { ...b, quantity: qtyToSelect } : b);
          } else {
            newSelectedBatches = [...prev.selectedBatches, { id: batchId, quantity: qtyToSelect }];
          }
        } else {
          // If trying to select with 0 or invalid quantity, effectively deselect
          newSelectedBatches = prev.selectedBatches.filter((b) => b.id !== batchId);
        }
      } else {
        // Remove batch if unchecked
        newSelectedBatches = prev.selectedBatches.filter((b) => b.id !== batchId);
      }
      return { ...prev, selectedBatches: newSelectedBatches };
    });
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out batches where selected quantity might be 0 after final checks
    const finalSelectedBatches = formData.selectedBatches.filter(b => b.quantity > 0);

    if (finalSelectedBatches.length === 0) {
      // TODO: Show an error message to the user (e.g., using a toast notification)
      console.error("No batches selected or no quantity specified for selected batches.");
      alert("Please select at least one batch and specify a quantity greater than 0.");
      return;
    }
    if (!formData.receiverType || !formData.company) {
      alert("Please select a receiver type and company.");
      return;
    }


    const submissionData = {
      ...formData,
      selectedBatches: finalSelectedBatches,
    };
    console.log("Submitting transfer:", submissionData);
    // In a real app, this would send data to an API

    // Navigate back to transfers list
    navigate(ROUTES.FULL_PATH_APP_TRANSFER || "/transfers"); // Added fallback for ROUTES
  };

  // Filter batches based on search query (simple client-side filter)
  const filteredBatches = availableBatches.filter(
    (batch) =>
      batch.drugName.toLowerCase().includes(formData.searchQuery.toLowerCase()) ||
      batch.id.toLowerCase().includes(formData.searchQuery.toLowerCase())
  ).filter(batch => batch.remainingQty > 0); // Only show batches with remaining quantity

  const isBatchSelected = (batchId: string) => {
    return formData.selectedBatches.some(b => b.id === batchId && b.quantity > 0);
  }

  const getSelectedQuantityForBatch = (batchId: string): number | string => {
    const batchInForm = formData.selectedBatches.find(b => b.id === batchId);
    if (batchInForm) return batchInForm.quantity;
    const availableBatch = availableBatches.find(b => b.id === batchId);
    return availableBatch?.selectedQty || "";
  }


  return (
    // Main container for the page
    <div className="max-w-5xl mx-auto p-4 md:p-6">
      {/* Page Header: Back link and Title */}
      <div className="mb-6 flex items-center gap-3">
        <Link
          to={ROUTES.FULL_PATH_APP_TRANSFER || "/transfers"} // Added fallback
          aria-label="Back to transfers"
          className={cn(
            "p-2 rounded-md transition-colors",
            "text-muted-foreground hover:text-primary hover:bg-primary/10",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-foreground">Create New Transfer</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Manufacturer Information Card */}
          <Card className="bg-card text-card-foreground shadow-lg">
            <CardHeader className="bg-muted/50 border-b border-border">
              <CardTitle className="text-lg font-medium text-foreground">
                Manufacturer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-3 rounded-lg mt-1"> {/* Adjusted padding & margin */}
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Manufacturer Name
                    </div>
                    <div className="font-medium text-foreground">
                      PT Manufacturer Pharmacy
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-3 rounded-lg mt-1">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Manufacture Location
                    </div>
                    <div className="font-medium text-foreground">
                      Kuala Lumpur, Malaysia
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Receiver Card */}
          <Card className="bg-card text-card-foreground shadow-lg">
            <CardHeader className="bg-muted/50 border-b border-border">
              <CardTitle className="text-lg font-medium text-foreground">
                Company Receiver
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <Label htmlFor="receiverType" className="text-foreground font-medium mb-1 block">
                    Type
                  </Label>
                  <Select
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, receiverType: value }))}
                    value={formData.receiverType}
                  >
                    <SelectTrigger className="border-input focus:ring-2 focus:ring-ring text-foreground">
                      <SelectValue placeholder="Select receiver type" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover text-popover-foreground">
                      <SelectItem value="distributor">Distributor</SelectItem>
                      <SelectItem value="hospital">Hospital</SelectItem>
                      <SelectItem value="pharmacy">Pharmacy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="company" className="text-foreground font-medium mb-1 block">
                    Company
                  </Label>
                  <Select
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, company: value }))}
                    value={formData.company}
                  >
                    <SelectTrigger className="border-input focus:ring-2 focus:ring-ring text-foreground">
                      <SelectValue placeholder="Select Company" />
                    </SelectTrigger>
                    {/* Company options would typically be dynamic */}
                    <SelectContent className="bg-popover text-popover-foreground">
                      <SelectItem value="company1">Pharma Distribution Inc.</SelectItem>
                      <SelectItem value="company2">City General Hospital</SelectItem>
                      <SelectItem value="company3">Community Pharmacy Group</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* List of Batches Card */}
          <Card className="bg-card text-card-foreground shadow-lg">
            <CardHeader className="bg-muted/50 border-b border-border flex flex-col sm:flex-row items-center justify-between gap-3 p-4"> {/* Adjusted padding */}
              <CardTitle className="text-lg font-medium text-foreground whitespace-nowrap">
                Select Batches for Transfer
              </CardTitle>
              <div className="relative w-full sm:w-72">
                <Input
                  placeholder="Search by Batch ID or Drug Name..."
                  className="border-input focus:ring-2 focus:ring-ring pl-10 placeholder:text-muted-foreground"
                  value={formData.searchQuery}
                  onChange={(e) => setFormData((prev) => ({ ...prev, searchQuery: e.target.value }))}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow className="border-b-0">
                      <TableHead className="w-[50px] text-muted-foreground"><span className="sr-only">Select</span></TableHead>
                      <TableHead className="font-semibold text-muted-foreground">Batch ID</TableHead>
                      <TableHead className="font-semibold text-muted-foreground">Drug Name</TableHead>
                      <TableHead className="font-semibold text-muted-foreground text-right">Remaining Qty</TableHead>
                      <TableHead className="font-semibold text-muted-foreground text-right w-[150px]">Transfer Qty</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-card-foreground">
                    {filteredBatches.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-40 text-center text-muted-foreground">
                          <div className="flex flex-col items-center justify-center py-6">
                            <Package className="h-10 w-10 text-muted-foreground/50 mb-3" />
                            {availableBatches.length > 0 && formData.searchQuery ? 'No batches match your search.' : 'No available batches with remaining quantity.'}
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredBatches.map((batch) => (
                        <TableRow
                          key={batch.id}
                          className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
                        >
                          <TableCell className="py-3">
                            <Checkbox
                              id={`select-batch-${batch.id}`}
                              checked={isBatchSelected(batch.id)}
                              onCheckedChange={(checked) => handleBatchSelectionChange(batch.id, !!checked)}
                              aria-label={`Select batch ${batch.id}`}
                              disabled={batch.remainingQty <= 0}
                            />
                          </TableCell>
                          <TableCell className="font-medium text-foreground py-3">{batch.id}</TableCell>
                          <TableCell className="py-3">{batch.drugName}</TableCell>
                          <TableCell className="text-right py-3">{batch.remainingQty.toLocaleString()}</TableCell>
                          <TableCell className="py-3">
                            <Input
                              type="number"
                              min="0"
                              max={batch.remainingQty}
                              value={getSelectedQuantityForBatch(batch.id)}
                              onChange={(e) => handleBatchQuantityChange(batch.id, e.target.value)}
                              onBlur={() => handleBatchSelectionChange(batch.id, isBatchSelected(batch.id))} // Update selection on blur if qty changed
                              placeholder="0"
                              className="w-full border-input focus:ring-2 focus:ring-ring text-right disabled:opacity-50"
                              disabled={batch.remainingQty <= 0}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 border-t border-border bg-muted/50">
              <p className="text-sm text-muted-foreground">
                Selected Batches: {formData.selectedBatches.length}
              </p>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(ROUTES.FULL_PATH_APP_TRANSFER || "/transfers")}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                  <Save className="h-4 w-4" /> Save Transfer
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}
