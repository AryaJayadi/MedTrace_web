
import TransfersTable from "@/components/transfers-table";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/core/Routes";
import { Plus, ArrowRightLeft, Filter, Send } from "lucide-react"
import { useState } from "react";
import { Link } from "react-router"

// Interface for Transfer data, should match the one used in TransfersTable
interface Transfer {
  id: string;
  batchId: string;
  drugName: string;
  quantity: number;
  sender: string;
  receiver: string;
  status: string;
  date: string;
}

export default function TransferPage() {
  // Mock data for demonstration, in a real app this would come from an API
  const [allTransfers, setAllTransfers] = useState<Transfer[]>([
    {
      id: "T-001",
      batchId: "B-001",
      drugName: "Paracetamol",
      quantity: 25000,
      sender: "PT Manufacturer Pharmacy",
      receiver: "General Hospital KL",
      status: "pending",
      date: "2025-02-15",
    },
    {
      id: "T-002",
      batchId: "B-002",
      drugName: "Amoxicillin",
      quantity: 10000,
      sender: "PT Manufacturer Pharmacy",
      receiver: "City Pharmacy",
      status: "completed",
      date: "2025-01-20",
    },
    {
      id: "T-003",
      batchId: "B-003",
      drugName: "Ibuprofen",
      quantity: 15000,
      sender: "PT Manufacturer Pharmacy",
      receiver: "Medical Center Penang",
      status: "pending",
      date: "2025-03-05",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredTransfers = allTransfers.filter(
    (transfer) =>
      transfer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transfer.drugName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transfer.receiver.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transfer.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasTransfers = filteredTransfers.length > 0;
  const hasAnyTransfersAtAll = allTransfers.length > 0; // To distinguish between no data vs. no search results

  // Fallback for create transfer route
  const createTransferPath = ROUTES.FULL_PATH_APP_TRANSFER_CREATE || "/transfers/create";


  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Transfer Management</h1>
        <Link to={createTransferPath}>
          <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="mr-2 h-4 w-4" /> Create Transfer
          </Button>
        </Link>
      </div>

      {hasAnyTransfersAtAll ? (
        <div className="bg-card text-card-foreground rounded-xl p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="w-full sm:max-w-md lg:max-w-lg relative">
              <Input
                placeholder="Filter by ID, drug, receiver, status..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 border-input rounded-lg focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
              />
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <Link to={createTransferPath}>
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                <Send className="h-4 w-4" /> Initiate New Transfer {/* Changed text for clarity */}
              </Button>
            </Link>
          </div>

          {hasTransfers ? (
            <TransfersTable transfers={filteredTransfers} />
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
