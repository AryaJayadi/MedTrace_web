import { useState } from "react"
import { Activity, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Link, useNavigate } from "react-router"
import { ROUTES } from "@/core/Routes"

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    organization: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.organization || !formData.password) {
      setError("Please enter both organization name and password.");
      return;
    }

    try {
      setIsLoading(true);
      // In a real app, this would be an API call to authenticate
      // For demo purposes, we'll simulate a successful login after a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to the batches page after successful login
      // Ensure ROUTES.FULL_PATH_APP_BATCH is correctly defined
      navigate(ROUTES.FULL_PATH_APP_BATCH || "/app/batches"); // Added fallback
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Main page container with themed background
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar: Using primary background color */}
      <div className="bg-primary h-1.5 w-full"></div> {/* Adjusted height for subtlety */}

      {/* Content area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            {/* Logo icon: Uses primary text color */}
            <Activity className="h-9 w-9 text-primary" />
            {/* App Name: Uses themed foreground color */}
            <h1 className="text-3xl font-bold text-foreground">MedTrace</h1>
          </div>
          {/* App Description: Uses themed muted foreground color */}
          <p className="text-muted-foreground">
            Pharmaceutical Tracking System
          </p>
        </div>

        {/* Login Card: Uses themed card background and text color, and standard shadow */}
        <Card className="w-full max-w-md shadow-xl bg-card text-card-foreground">
          <CardHeader className="space-y-1 text-center">
            {/* Card Title: Uses themed foreground color for prominence */}
            <CardTitle className="text-2xl font-bold text-foreground">Sign in</CardTitle>
            {/* Card Description: Uses themed muted foreground color */}
            <CardDescription className="text-muted-foreground">
              Enter your organization credentials to access your account
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-4 pb-6"> {/* Adjusted padding */}
              {error && (
                // Alert: Destructive variant should apply themed destructive colors
                <Alert variant="destructive" className="text-sm">
                  <AlertTriangle className="h-4 w-4" /> {/* Icon for destructive alert */}
                  <AlertTitle>Login Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-1.5"> {/* Adjusted spacing */}
                {/* Label: Uses themed foreground color */}
                <Label htmlFor="organization" className="text-foreground">Organization</Label>
                <Input
                  id="organization"
                  name="organization"
                  placeholder="Enter your organization name"
                  value={formData.organization}
                  onChange={handleChange}
                  // Input: Uses themed border and focus ring, placeholder text
                  className="border-input focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-foreground">Password</Label>
                  {/* Link: Uses primary text color */}
                  <Link
                    to={ROUTES.FULL_PATH_FORGOT_PASSWORD || "/forgot-password"} // Added fallback
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border-input focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
                  disabled={isLoading}
                  required
                />
              </div>
            </CardContent>

            <CardFooter className="pt-2 pb-6"> {/* Adjusted padding */}
              {/* Button: Uses themed primary background and text color */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* "Don't have an account" link section */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to={ROUTES.FULL_PATH_CONTACT_US || "/contact"} // Added fallback
            className="font-medium text-primary hover:underline"
          >
            Contact us
          </Link>{" "}
          to get started.
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} MedTrace. All rights reserved.
      </footer>
    </div>
  );
}
