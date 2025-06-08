import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/core/Routes";
import { Plus, ArrowRightLeft, Filter, Send, AlertTriangle } from "lucide-react"
import { Link } from "react-router"
import useViewModel from "./TransferPageViewModel";
import { Skeleton } from "@/components/ui/skeleton";
import TransfersTable from "./TransfersTable";
import { useAuth } from "../context/AuthContext";

const TransfersTableSkeleton = () => (
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

export default function TransferPage() {
  const {
    filteredTransfers,
    transfersIsLoading,
    transfersError,
    searchQuery,
    handleSearchChange,
    loadMyTransfers,
  } = useViewModel();
  const {
    user
  } = useAuth();

  const handleTransferUpdate = () => {
    loadMyTransfers();
  };

  const hasFilteredTransfers = filteredTransfers && filteredTransfers.length > 0;
  const hasAnyTransfersAtAll = !transfersIsLoading && !transfersError && filteredTransfers && filteredTransfers.length > 0 || (filteredTransfers?.length === 0 && searchQuery === "");

  const createTransferPath = ROUTES.FULL_PATH_APP_TRANSFER_CREATE;

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Transfer Management</h1>
        <Link to={createTransferPath}>
          <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
            <Send className="h-4 w-4" /> Initiate New Transfer
          </Button>
        </Link>
      </div>

      {transfersIsLoading ? (
        <TransfersTableSkeleton />
      ) : transfersError ? (
        <div className="bg-destructive/10 text-destructive-foreground rounded-xl p-8 shadow-lg flex flex-col items-center justify-center text-center py-16">
          <AlertTriangle className="h-10 w-10 text-destructive mb-6" />
          <h3 className="text-xl font-semibold mb-2">
            Error Fetching Transfers
          </h3>
          <p className="max-w-md mb-8">
            There was an issue retrieving transfer data. Please try again later.
          </p>
          <Button onClick={loadMyTransfers} variant="outline" className="text-destructive border-destructive hover:bg-destructive/20">
            Retry
          </Button>
        </div>
      ) : hasAnyTransfersAtAll || searchQuery !== "" ? (
        <div className="bg-card text-card-foreground rounded-xl p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="w-full sm:max-w-md lg:max-w-lg relative">
              <Input
                placeholder="Filter by ID, receiver, status..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 border-input rounded-lg focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
              />
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {hasFilteredTransfers ? (
            <TransfersTable
              transfers={filteredTransfers}
              onTransferUpdate={handleTransferUpdate}
              currentUserId={user?.ID || ""}
            />
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              <Filter className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-lg font-medium">No transfers match your filter criteria.</p>
              <p>Try adjusting your search or filter terms.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-card text-card-foreground rounded-xl p-8 flex flex-col items-center justify-center text-center py-16 shadow-lg">
          <div className="bg-primary/10 p-4 rounded-full mb-6">
            <ArrowRightLeft className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No Transfers Yet
          </h3>
          <p className="text-muted-foreground max-w-md mb-8">
            Start transferring batches to distributors, hospitals, or pharmacies
            to track your supply chain.
          </p>
          <Link to={createTransferPath}>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="mr-2 h-5 w-5" /> Create Your First Transfer
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
