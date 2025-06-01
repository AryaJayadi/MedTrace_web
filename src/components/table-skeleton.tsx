import { Skeleton } from "./ui/skeleton";

export const TableSkeleton = () => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <Skeleton className="h-8 w-1/4" />
      <Skeleton className="h-10 w-1/4" />
    </div>
    <Skeleton className="h-12 w-full" />
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center space-x-4 p-4 border-b">
        <Skeleton className="h-6 w-1/6" />
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-6 w-1/6" />
        <Skeleton className="h-6 w-1/6" />
        <Skeleton className="h-6 w-1/6" />
        <Skeleton className="h-6 w-1/12" />
      </div>
    ))}
  </div>
);
