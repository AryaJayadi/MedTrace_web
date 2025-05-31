import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useEffect } from "react"
import { Search, ArrowLeft, Save, Building, MapPin, Package, AlertTriangle, Loader2 } from "lucide-react"
import { Link, useNavigate } from "react-router"
import { ROUTES } from "@/core/Routes"
import { cn } from "@/lib/utils"
import useViewModel from "./CreateTransferPageViewModel"
import { toast } from "sonner"
import { useAuth } from "../context/AuthContext"

export default function CreateTransferPage() {
  const navigate = useNavigate();
  const {
    form,
    onSubmit,
    overallApiError,
    isSubmittingForm,
    availableUiBatches,
    batchesIsLoading,
    batchesError,
    batchSearchQuery,
    setBatchSearchQuery,
    handleBatchSelectionChange,
    handleBatchQuantityChange,
    uiBatches,
  } = useViewModel();
  const {
    user,
    otherOrgs,
    organizationsIsLoading,
    organizationsError
  } = useAuth();

  useEffect(() => {
    if (overallApiError) {
      toast.error("Operation Failed", { description: overallApiError });
    }
  }, [overallApiError]);

  const selectedBatchesCount = uiBatches.filter(b => b.isSelected && b.selectedQty !== "" && parseInt(b.selectedQty, 10) > 0).length;

  const renderOrganizationOptions = () => {
    if (organizationsIsLoading) return <SelectItem value="loading" disabled>Loading organizations...</SelectItem>;
    if (organizationsError) return <SelectItem value="error" disabled>Error: {organizationsError.message}</SelectItem>;
    if (!otherOrgs || otherOrgs.length === 0) return <SelectItem value="empty" disabled>No organizations found</SelectItem>;
    return otherOrgs.map(org => (
      <SelectItem key={org.ID} value={org.ID}>{org.Name} ({org.Type})</SelectItem>
    ));
  };

  const manufacturerInfo = {
    name: user?.Name || "My Pharma Corp (Placeholder)",
    location: user?.Location || "My Location (Placeholder)"
  };

  console.log(organizationsError, organizationsIsLoading, otherOrgs);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6">
      <div className="mb-6 flex items-center gap-3">
        <Link
          to={ROUTES.FULL_PATH_APP_TRANSFER || "/transfers"}
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="bg-card text-card-foreground shadow-lg">
            <CardHeader className="bg-muted/50 border-b border-border">
              <CardTitle className="text-lg font-medium text-foreground">
                Manufacturer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-3 rounded-lg mt-1">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Manufacturer Name
                    </div>
                    <div className="font-medium text-foreground">
                      {manufacturerInfo.name}
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
                      {manufacturerInfo.location}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground shadow-lg">
            <CardHeader className="bg-muted/50 border-b border-border">
              <CardTitle className="text-lg font-medium text-foreground">
                Company Receiver
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <FormField
                control={form.control}
                name="receiverId"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="receiverId" className="text-foreground font-medium mb-1 block">
                      Company (Receiver)
                    </Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={organizationsIsLoading || !!organizationsError || !otherOrgs || otherOrgs.length === 0}
                    >
                      <FormControl>
                        <SelectTrigger className="border-input focus:ring-2 focus:ring-ring text-foreground">
                          <SelectValue placeholder="Select Receiver Company" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover text-popover-foreground">
                        {renderOrganizationOptions()}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                    {organizationsError && !organizationsIsLoading && <p className="text-sm text-destructive pt-1">Error: {organizationsError.message}</p>}
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground shadow-lg">
            <CardHeader className="bg-muted/50 border-b border-border flex flex-col sm:flex-row items-center justify-between gap-3 p-4">
              <CardTitle className="text-lg font-medium text-foreground whitespace-nowrap">
                Select Batches for Transfer
              </CardTitle>
              <div className="relative w-full sm:w-72">
                <Input
                  placeholder="Search by Batch ID or Drug Name..."
                  className="border-input focus:ring-2 focus:ring-ring pl-10 placeholder:text-muted-foreground"
                  value={batchSearchQuery}
                  onChange={(e) => setBatchSearchQuery(e.target.value)}
                  disabled={batchesIsLoading}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {batchesIsLoading ? (
                <div className="h-60 flex items-center justify-center text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin mr-2" /> Loading available batches & drug data...
                </div>
              ) : batchesError ? (
                <div className="h-60 flex flex-col items-center justify-center text-destructive p-4 text-center">
                  <AlertTriangle className="h-8 w-8 mb-2" />
                  <p className="font-semibold">Error loading batch/drug data:</p>
                  <p className="text-sm">{batchesError.message}</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow className="border-b-0">
                        <TableHead className="w-[50px] text-muted-foreground"><span className="sr-only">Select</span></TableHead>
                        <TableHead className="font-semibold text-muted-foreground">Batch ID</TableHead>
                        <TableHead className="font-semibold text-muted-foreground">Drug Name</TableHead>
                        <TableHead className="font-semibold text-muted-foreground text-right">Available Qty</TableHead>
                        <TableHead className="font-semibold text-muted-foreground text-right w-[150px]">Transfer Qty</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="text-card-foreground">
                      {availableUiBatches.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="h-40 text-center text-muted-foreground">
                            <div className="flex flex-col items-center justify-center py-6">
                              <Package className="h-10 w-10 text-muted-foreground/50 mb-3" />
                              {batchSearchQuery ? 'No batches match your search.' : 'No available batches with transferable drugs.'}
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        availableUiBatches.map((batch) => (
                          <TableRow
                            key={batch.ID}
                            className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
                          >
                            <TableCell className="py-3">
                              <Checkbox
                                id={`select-batch-${batch.ID}`}
                                checked={batch.isSelected}
                                onCheckedChange={(checked) => handleBatchSelectionChange(batch.ID, !!checked)}
                                aria-label={`Select batch ${batch.ID}`}
                                disabled={batch.remainingQty <= 0}
                              />
                            </TableCell>
                            <TableCell className="font-medium text-foreground py-3">{batch.ID}</TableCell>
                            <TableCell className="py-3">{batch.DrugName}</TableCell>
                            <TableCell className="text-right py-3">
                              {batch.remainingQty.toLocaleString()}
                            </TableCell>
                            <TableCell className="py-3">
                              <Input
                                type="number"
                                min="0"
                                max={batch.remainingQty}
                                value={batch.selectedQty}
                                onChange={(e) => handleBatchQuantityChange(batch.ID, e.target.value)}
                                placeholder="0"
                                className="w-full border-input focus:ring-2 focus:ring-ring text-right disabled:opacity-50"
                                disabled={!batch.isSelected || batch.remainingQty <= 0}
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 border-t border-border bg-muted/50">
              <p className="text-sm text-muted-foreground">
                Selected Batches: {selectedBatchesCount}
              </p>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(ROUTES.FULL_PATH_APP_TRANSFER || "/transfers")}
                  disabled={isSubmittingForm}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                  disabled={isSubmittingForm || selectedBatchesCount === 0 || !form.getValues("receiverId")}
                >
                  {isSubmittingForm ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Save className="h-4 w-4" />}
                  {isSubmittingForm ? "Submitting..." : "Save Transfer"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
