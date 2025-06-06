import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DrugTraceSkeleton() {
  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-muted/50 border-b border-border">
        <Skeleton className="h-6 w-1/2" />
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-8 text-center">
          <Skeleton className="h-5 w-2/5 mx-auto mb-1" />
          <Skeleton className="h-4 w-3/5 mx-auto" />
        </div>
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
}
