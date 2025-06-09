import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/core/Routes";
import { cn, formatDateLong } from "@/lib/utils";
import { AlertTriangle, ArrowLeft, Building, CalendarCheck, ChevronsUpDown, Loader2, MapPin, Package, Search } from "lucide-react";
import { Link, useParams } from "react-router";
import useViewModel from "./TransferDetailPageViewModel.ts"
import { Badge } from "@/components/ui/badge.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table.tsx";
import { CalendarArrowUp } from "lucide-react";

export default function TransferDetailPage() {
  const { transferID } = useParams();
  const {
    transfer,
    sender,
    receiver,
    drugViewModels,
    drugViewModelsIsLoading,
    drugViewModelsError,
    batchSearchQuery,
    setBatchSearchQuery,
  } = useViewModel(transferID || "");

  const status = transfer ? transfer.isAccepted ? "Accepted" : transfer.ReceiveDate ? "Rejected" : "Pending" : "Pending"

  function badgeStyle() {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700"
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700"
    }
  }

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
        <div className="flex items-center gap-2 mb-3">
          <ChevronsUpDown className="h-9 w-9 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Transfer Details</h1>
        </div>
      </div>

      <div className="space-y-6">
        <Card className="bg-card text-card-foreground shadow-lg">
          <CardHeader className="border-b border-border p-4 flex flex-row justify-between items-center">
            <CardTitle className="text-lg font-semibold text-foreground whitespace-nowrap">
              Transfer Information
            </CardTitle>
            <Badge
              variant="outline"
              className={cn(
                "capitalize font-semibold px-2.5 py-0.5 text-sm",
                badgeStyle()
              )}
            >
              {status}
            </Badge>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-3 rounded-lg mt-1">
                  <CalendarArrowUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Transfer Date
                  </div>
                  <div className="font-medium text-foreground">
                    {transfer?.TransferDate ? formatDateLong(transfer.TransferDate) : "-"}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-3 rounded-lg mt-1">
                  <CalendarCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Receive Date
                  </div>
                  <div className="font-medium text-foreground">
                    {transfer?.ReceiveDate ? formatDateLong(transfer.ReceiveDate) : "-"}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-3 rounded-lg mt-1">
                  <Building className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Sender Name
                  </div>
                  <div className="font-medium text-foreground">
                    {sender?.Name || "Loading..."}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-3 rounded-lg mt-1">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Sender Location
                  </div>
                  <div className="font-medium text-foreground">
                    {sender?.Location || "Loading..."}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-3 rounded-lg mt-1">
                  <Building className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Receiver Name
                  </div>
                  <div className="font-medium text-foreground">
                    {receiver?.Name || "Loading..."}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-3 rounded-lg mt-1">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Receiver Location
                  </div>
                  <div className="font-medium text-foreground">
                    {receiver?.Location || "Loading..."}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card text-card-foreground shadow-lg">
          <CardHeader className="border-b border-border flex flex-col sm:flex-row items-center justify-between gap-3 p-4">
            <CardTitle className="text-lg font-semibold text-foreground whitespace-nowrap">
              Transferred Drugs
            </CardTitle>
            <div className="relative w-full sm:w-72">
              <Input
                placeholder="Search by Batch ID or Drug Name..."
                className="border-input focus:ring-2 focus:ring-ring pl-10 placeholder:text-muted-foreground"
                value={batchSearchQuery}
                onChange={(e) => setBatchSearchQuery(e.target.value)}
                disabled={drugViewModelsIsLoading}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {drugViewModelsIsLoading ? (
              <div className="h-60 flex items-center justify-center text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin mr-2" /> Loading transferred drugs...
              </div>
            ) : drugViewModelsError ? (
              <div className="h-60 flex flex-col items-center justify-center text-destructive p-4 text-center">
                <AlertTriangle className="h-8 w-8 mb-2" />
                <p className="font-semibold">Error loading transferred drugs:</p>
                <p className="text-sm">{drugViewModelsError?.message || "An unknown error occurred."}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow className="border-b-0">
                      <TableHead className="font-semibold text-muted-foreground">Batch ID</TableHead>
                      <TableHead className="font-semibold text-muted-foreground">Drug Name</TableHead>
                      <TableHead className="font-semibold text-muted-foreground">Production Date</TableHead>
                      <TableHead className="font-semibold text-muted-foreground">Expiry Date</TableHead>
                      <TableHead className="font-semibold text-muted-foreground text-right">Transferred Qty</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-card-foreground">
                    {drugViewModels.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-40 text-center text-muted-foreground">
                          <div className="flex flex-col items-center justify-center py-6">
                            <Package className="h-10 w-10 text-muted-foreground/50 mb-3" />
                            {batchSearchQuery ? 'No items match your search.' : 'No items were found in this transfer.'}
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      drugViewModels.map((item) => (
                        <TableRow
                          key={item.BatchID}
                          className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
                        >
                          <TableCell className="font-medium text-foreground py-3">{item.BatchID}</TableCell>
                          <TableCell className="py-3">{item.DrugName}</TableCell>
                          <TableCell className="py-3">{formatDateLong(item.ProductionDate)}</TableCell>
                          <TableCell className="py-3">{formatDateLong(item.ExpiryDate)}</TableCell>
                          <TableCell className="text-right py-3">{item.Quantity.toLocaleString()}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div >
  )
}
