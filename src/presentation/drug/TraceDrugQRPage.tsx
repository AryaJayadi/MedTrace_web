import { useParams } from "react-router";
import useViewModel from "./TraceDrugQRPageViewModel";
import DrugTraceSkeleton from "./DrugTraceSkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { error } from "console";
import { AlertTriangle, Info, PackageIcon } from "lucide-react";
import DrugTimeline from "@/components/drug-timeline";
import { formatDate } from "@/lib/utils";

export default function TraceDrugQRPage() {
  const { drugID } = useParams()
  const {
    drugHistoryFromApi,
    isLoading,
    apiError,
    fetchSuccess
  } = useViewModel(drugID || "")

  const timelineData = drugHistoryFromApi?.map(item => ({
    date: formatDate(item.Timestamp),
    organization: `Owner: ${item.Drug.OwnerID}`,
    location: item.Drug.BatchID ? `Batch: ${item.Drug.BatchID}` : "N/A",
    type: item.IsDelete ? "Deleted" : "Updated/Created",
    icon: <PackageIcon className="h-5 w-5" />,
  }))

  if (isLoading) return (
    <DrugTraceSkeleton />
  )

  if (!isLoading && apiError) {
    return (
      <Card className="shadow-lg border-destructive">
        <CardHeader className="bg-destructive/10 border-b border-destructive/30">
          <CardTitle className="text-lg font-medium text-destructive flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" /> Error Fetching Trace
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center text-destructive">
          <p>{apiError.message}</p>
        </CardContent>
      </Card>
    )
  }

  if (!isLoading && !error && drugHistoryFromApi && drugHistoryFromApi.length > 0) return (
    <Card className="shadow-lg">
      <CardHeader className="border-b border-border align-items-center">
        <CardTitle className="text-lg font-medium text-card-foreground">Drug Trace Results for: <span className="font-mono">{drugID}</span></CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-semibold text-foreground mb-1">Trusted by MedTrace</h2>
          <p className="text-muted-foreground text-sm">Verified pharmaceutical supply chain history</p>
        </div>
        <DrugTimeline timeline={timelineData || []} />
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-sm text-muted-foreground">Drug ID:</span>
              <span className="ml-2 font-mono text-foreground">{drugID}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-muted/50 border-b border-border">
        <CardTitle className="text-lg font-medium text-card-foreground flex items-center">
          <Info className="h-5 w-5 mr-2 text-blue-500" /> No Trace Found
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 text-center">
        <p className="text-muted-foreground">No trace history found for Drug ID: <strong>{drugID}</strong>.</p>
        <p className="text-sm text-muted-foreground mt-1">This could mean the Drug ID is incorrect, or the drug has no recorded history.</p>
      </CardContent>
    </Card>
  )
} 
