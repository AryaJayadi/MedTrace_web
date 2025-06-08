import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { AlertTriangle, ArrowLeft, Building, Loader2, MapPin, PackagePlus, Save } from "lucide-react"
import useViewModel from "./CreateBatchPageViewModel"
import { Link, useNavigate } from "react-router"
import { ROUTES } from "@/core/Routes"
import { cn } from "@/lib/utils"
import { useAuth } from "../context/AuthContext"

export default function CreateBatchPage() {
  const {
    form,
    onSubmit,
    apiError,
    isLoading,
  } = useViewModel()
  const {
    user,
  } = useAuth()
  const navigate = useNavigate()

  const manufacturerInfo = {
    name: user?.Name || "Manufacturer Name",
    location: user?.Location || "Manufacturer Location",
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
          <PackagePlus className="h-9 w-9 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Create New Batch</h1>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="bg-card text-card-foreground shadow-lg">
            <CardHeader className="border-b border-border items-center">
              <CardTitle className="text-lg font-semibold text-foreground whitespace-nowrap">
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
                      Manufacturer Location
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
            <CardHeader className="border-b border-border">
              <CardTitle className="text-lg font-semibold text-foreground">
                Organization Receiver
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {apiError && (
                <Alert variant="destructive" className="text-sm">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Creation Error</AlertTitle>
                  <AlertDescription>{apiError}</AlertDescription>
                </Alert>
              )}

              <FormField
                control={form.control}
                name="DrugName"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-foreground">Drug Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Amoxicillin 250mg"
                        className="border-input focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Amount"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-foreground">Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter total quantity in this batch"
                        className="border-input focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ProductionDate"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-foreground">Production Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="border-input focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ExpiryDate"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-foreground">Expiry Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="border-input focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex flex-col sm:flex-row justify-end items-center gap-4 p-6 border-t border-border bg-muted/50">
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(ROUTES.FULL_PATH_APP_BATCH || "/batches")}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Save className="h-4 w-4" />}
                  {isLoading ? "Creating Batch..." : "Create Batch"}
                </Button>
              </div>
            </CardFooter>
          </Card>

        </form>
      </Form>
    </div>
  )
}
