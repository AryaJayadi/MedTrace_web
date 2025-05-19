import { useState } from "react"
import { Activity, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Link, useNavigate } from "react-router"
import { ROUTES } from "@/core/Routes"
import { z } from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const formSchema = z.object({
  organization: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // API/Server-side error state
  const [apiError, setApiError] = useState("");

  // 2. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organization: "",
      password: "",
    },
  });

  // 3. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setApiError(""); // Clear previous API errors
    setIsLoading(true);
    console.log("Form values being submitted:", values);

    try {
      // In a real app, this would be an API call to authenticate
      // For demo purposes, we'll simulate a successful login after a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate success/failure
      if (values.organization === "testorg" && values.password === "password123") {
        console.log("Login successful simulation");
        // Redirect to the batches page after successful login
        navigate(ROUTES.FULL_PATH_APP_BATCH || "/app/batches");
      } else {
        console.log("Login failed simulation");
        setApiError("Invalid organization or password.");
      }
    } catch (err) {
      console.error("API Error:", err);
      setApiError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    // Main page container with themed background
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar: Using primary background color */}
      <div className="bg-primary h-1.5 w-full"></div>

      {/* Content area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Activity className="h-9 w-9 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">MedTrace</h1>
          </div>
          <p className="text-muted-foreground">
            Pharmaceutical Tracking System
          </p>
        </div>

        <Card className="w-full max-w-md shadow-xl bg-card text-card-foreground">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-foreground">Sign in</CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your organization credentials to access your account
            </CardDescription>
          </CardHeader>

          {/* Using react-hook-form's Form component */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0"> {/* Removed space-y-8 from form tag to control spacing in CardContent/Footer */}
              <CardContent className="space-y-4 pt-4 pb-6">
                {apiError && (
                  <Alert variant="destructive" className="text-sm">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Login Error</AlertTitle>
                    <AlertDescription>{apiError}</AlertDescription>
                  </Alert>
                )}

                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-foreground">Organization</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your organization name"
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
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-foreground">Password</FormLabel>
                        <Link
                          to={ROUTES.FULL_PATH_FORGOT_PASSWORD || "/forgot-password"}
                          className="text-sm text-primary hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          className="border-input focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage /> {/* Displays validation errors for this field */}
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
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to={ROUTES.FULL_PATH_CONTACT_US || "/contact"}
            className="font-medium text-primary hover:underline"
          >
            Contact us
          </Link>{" "}
          to get started.
        </div>
      </div>

      <footer className="py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} MedTrace. All rights reserved.
      </footer>
    </div>
  );
}
