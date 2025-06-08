import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/core/Routes";
import { cn, formatDateLong } from "@/lib/utils";
import { ArrowLeft, Building, CalendarArrowUp, CalendarCheck, Fullscreen, MapPin } from "lucide-react";
import { Link, useParams } from "react-router";
import useViewModel from "./TransferDetailPageViewModel.ts"
import { Badge } from "@/components/ui/badge.tsx";

export default function TransferDetailPage() {
  const { transferID } = useParams();
  const {
    transfer,
    sender,
    receiver,
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
          <Fullscreen className="h-9 w-9 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Transfer {transferID}</h1>
        </div>
      </div>

      <div className="space-y-6">
        <Card className="bg-card text-card-foreground shadow-lg">
          <CardHeader className="border-b border-border items-center">
            <CardTitle className="flex flex-row justify-between items-center">
              <div className="text-lg font-semibold text-foreground whitespace-nowrap">
                Transfer Information
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "capitalize font-semibold px-2.5 py-0.5 text-lg",
                  badgeStyle()
                )}
              >
                {status}
              </Badge>
            </CardTitle>
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
                    {sender?.Name || "Sender Name"}
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
                    {sender?.Location || "Sender Location"}
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
                    {receiver?.Name || "Receiver Name"}
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
                    {receiver?.Location || "Receiver Location"}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div >
  )
}
