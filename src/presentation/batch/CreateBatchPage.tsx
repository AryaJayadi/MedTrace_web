import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { AlertTriangle, PackagePlus } from "lucide-react"
import useViewModel from "./CreateBatchPageViewModel"

export default function CreateBatchPage() {
  const {
    form,
    onSubmit,
    apiError,
    isLoading,
  } = useViewModel()

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <PackagePlus className="h-9 w-9 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Create New Batch</h1>
        </div>
        <p className="text-muted-foreground">
          Fill in the details below to register a new batch of pharmaceuticals.
        </p>
      </div>

      <Card className="w-full max-w-lg shadow-xl bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground">Batch Details</CardTitle>
          <CardDescription className="text-muted-foreground">
            All fields are required.
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
            <CardContent className="space-y-4 pt-4 pb-6">
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

            <CardFooter className="pt-2 pb-6">
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? "Creating Batch..." : "Create Batch"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
