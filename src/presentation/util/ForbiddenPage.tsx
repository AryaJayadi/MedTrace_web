import { Activity, Shield, Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link, useNavigate } from "react-router"
import { ROUTES } from "@/core/Routes"

export default function ForbiddenPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top gradient bar: Using primary color. If a specific gradient is intended, 
          the 'gradient-bg' class would need to be defined in global CSS. */}
      <div className="bg-primary h-2 w-full"></div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Logo Section */}
        <div className="mb-8 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            {/* Activity Icon: Uses themed primary color (var(--primary)) */}
            <Activity className="h-8 w-8 text-primary" />
            {/* App Name: Uses themed foreground color (var(--foreground)) */}
            <h1 className="text-3xl font-bold text-foreground">MedTrace</h1>
          </div>
        </div>

        {/* Card: Shadcn UI Card component will use themed variables (bg-card, border-border, etc.)
            'card-shadow' is assumed to be a custom utility class defined elsewhere. */}
        <Card className="w-full max-w-md shadow-lg"> {/* Using shadow-lg for consistency */}
          <CardContent className="p-8 text-center">
            {/* Error Icon Container */}
            <div className="mb-6 flex justify-center">
              {/* Icon Background: Uses a light shade of destructive color (var(--destructive)) */}
              <div className="bg-destructive/10 p-4 rounded-full">
                {/* Shield Icon: Uses themed destructive color (var(--destructive)) */}
                <Shield className="h-12 w-12 text-destructive" />
              </div>
            </div>

            {/* Error Message Section */}
            <div className="mb-6">
              {/* Title: Uses themed foreground color */}
              <h2 className="text-2xl font-bold text-foreground mb-2">Access Forbidden</h2>
              {/* Paragraph: Uses themed muted-foreground color (var(--muted-foreground)) */}
              <p className="text-muted-foreground mb-4">
                You don't have permission to access this resource. This could be due to:
              </p>
              {/* List: Uses themed muted-foreground color */}
              <ul className="text-sm text-muted-foreground text-left space-y-1 mb-4">
                <li>• Insufficient user privileges</li>
                <li>• Organization access restrictions</li>
                <li>• Session has expired</li>
                <li>• Resource requires special authorization</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link to={ROUTES.FULL_PATH_APP_BATCH} className="block"> {/* Ensure '/batches' is a valid route */}
                {/* Button (Primary): Uses themed primary colors (var(--primary), var(--primary-foreground)) */}
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Home className="mr-2 h-4 w-4" />
                  Go to Dashboard
                </Button>
              </Link>
              {/* Button (Outline): Uses themed border and interactive accent colors */}
              <Button
                variant="outline"
                className="w-full border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>

          </CardContent>
        </Card>

        {/* Additional Info Section */}
        <div className="mt-6 text-center text-sm text-muted-foreground max-w-md">
          If you believe this is an error, please contact your system administrator or try logging out and back in.
        </div>
      </div>

      {/* Footer: Uses themed muted-foreground color */}
      <footer className="py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} MedTrace. All rights reserved.
      </footer>
    </div>
  );
}
