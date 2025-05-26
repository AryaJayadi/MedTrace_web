import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import useViewModel from "./LoginPageViewModel"
import { Link } from "react-router"
import { Activity, AlertTriangle } from "lucide-react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form"

export const LoginPage = () => {
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
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
                        to={"/forgot-password"}
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
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          to={"/contact"}
          className="font-medium text-primary hover:underline"
        >
          Contact us
        </Link>{" "}
        to get started.
      </div>
    </div>
  );
}
