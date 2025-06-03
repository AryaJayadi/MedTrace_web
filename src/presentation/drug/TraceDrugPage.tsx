import type React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, AlertTriangle, X, PackageIcon, Info } from "lucide-react"
import DrugTimeline from "@/components/drug-timeline"
import useViewModel from "./TraceDrugPageViewModel"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate } from "@/lib/utils"

// Skeleton for the results section
const DrugTraceSkeleton = () => (
  <Card className="shadow-lg">
    <CardHeader className="bg-muted/50 border-b border-border">
      <Skeleton className="h-6 w-1/2" />
    </CardHeader>
    <CardContent className="p-6">
      <div className="mb-8 text-center">
        <Skeleton className="h-5 w-2/5 mx-auto mb-1" />
        <Skeleton className="h-4 w-3/5 mx-auto" />
      </div>
      {/* Skeleton for timeline items */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4 py-3 border-b last:border-b-0">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-1.5 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
      <div className="mt-8 pt-6 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Skeleton className="h-5 w-1/3" />
          <div className="flex flex-col sm:flex-row gap-2">
            <Skeleton className="h-10 w-36" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)

export default function TraceDrugPage() {
  const {
    drugId,
    setDrugId,
    drugHistory,
    isLoading,
    error,
    handleSearch,
    searchPerformed,
    clearSearch,
  } = useViewModel()

  const timelineData = drugHistory?.map(item => ({
    date: formatDate(item.Timestamp),
    organization: `Owner: ${item.Drug.OwnerID}`,
    location: item.Drug.BatchID ? `Batch: ${item.Drug.BatchID}` : "N/A",
    type: item.IsDelete ? "Deleted" : "Updated/Created",
    icon: <PackageIcon className="h-5 w-5" />,
  }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch()
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Trace Drug</h1>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-lg font-medium text-card-foreground">Search Drug by ID</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Input
                placeholder="Enter drug ID..."
                value={drugId}
                onChange={(e) => setDrugId(e.target.value)}
                className="pl-10 pr-10 border-input focus-visible:ring-ring"
                disabled={isLoading}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              {drugId && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
                  onClick={clearSearch}
                  disabled={isLoading}
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading || !drugId}>
              {isLoading ? "Searching..." : "Trace"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isLoading && searchPerformed && <DrugTraceSkeleton />}

      {!isLoading && searchPerformed && error && (
        <Card className="shadow-lg border-destructive">
          <CardHeader className="bg-destructive/10 border-b border-destructive/30">
            <CardTitle className="text-lg font-medium text-destructive flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" /> Error Fetching Trace
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 text-center text-destructive">
            <p>{error}</p>
            <Button onClick={handleSearch} variant="outline" className="mt-4 border-destructive text-destructive hover:bg-destructive/10">
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {!isLoading && searchPerformed && !error && drugHistory && (
        drugHistory.length > 0 ? (
          <Card className="shadow-lg">
            <CardHeader className="border-b border-border align-items-center">
              <CardTitle className="text-lg font-medium text-card-foreground">Drug Trace Results for: <span className="font-mono">{drugId}</span></CardTitle>
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
                    <span className="ml-2 font-mono text-foreground">{drugHistory[0]?.Drug.ID || drugId}</span>
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
              <p className="text-muted-foreground">No trace history found for Drug ID: <strong>{drugId}</strong>.</p>
              <p className="text-sm text-muted-foreground mt-1">This could mean the Drug ID is incorrect, or the drug has no recorded history.</p>
            </CardContent>
          </Card>
        )
      )}
    </div>
  )
}
