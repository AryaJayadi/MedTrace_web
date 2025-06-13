import { useParams } from "react-router";
import useViewModel from "./TraceDrugQRPageViewModel";
import DrugTraceSkeleton from "./DrugTraceSkeleton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Activity, AlertTriangle, Info, PackageIcon } from "lucide-react";
import DrugTimeline from "@/components/drug-timeline";

export default function TraceDrugQRPage() {
  const { drugID } = useParams()
  const {
    drugHistoryFromApi,
    isLoading,
    apiError,
    fetchSuccess
  } = useViewModel(drugID || "", <PackageIcon className="h-5 w-5" />)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="bg-primary h-2 w-full"></div>
      <div className="w-full flex-1 flex flex-col items-center justify-center px-4 py-12">

        <div className="mb-8 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">MedTrace</h1>
          </div>
        </div>

        {isLoading && <DrugTraceSkeleton />}

        {!isLoading && apiError && (
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
        )}

        {fetchSuccess && drugHistoryFromApi && (
          drugHistoryFromApi.length > 0 ?
            (
              <Card className="min-w-[60%] shadow-lg">
                <CardHeader className="border-b border-border align-items-center">
                  <CardTitle className="text-lg font-medium text-card-foreground">Drug Trace Results for: <span className="font-mono">{drugID}</span></CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-8 text-center">
                    <h2 className="text-xl font-semibold text-foreground mb-1">Trusted by MedTrace</h2>
                    <p className="text-muted-foreground text-sm">Verified pharmaceutical supply chain history</p>
                  </div>
                  <DrugTimeline timeline={drugHistoryFromApi || []} />
                  <div className="mt-8 pt-6 border-t border-border">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-sm text-muted-foreground">Batch ID:</span>
                        <span className="ml-2 font-mono text-foreground">{drugHistoryFromApi[0].batchID}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
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
        )}

      </div>
    </div>
  )
} 
