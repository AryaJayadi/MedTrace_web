import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useViewModel from "./LoginPageViewModel"
import { Link, useNavigate } from "react-router"
import { useEffect } from "react"
import { useAuth } from "@/presentation/context/AuthContext"

export const LoginPage = () => {
  const {
    organizationRef,
    passwordRef,
    handleSubmit
  } = useViewModel()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app/beranda")
    }
  }, [isAuthenticated, navigate])

  return (
    <Card className="w-[350px] mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="organization">Organization</Label>
              <Input id="organization" placeholder="Enter your organization ID" ref={organizationRef} type="text" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="Enter your password" ref={passwordRef} type="password" />
            </div>
            <Button type="submit" className="w-full mt-4">Login</Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          <p>Don't have an account? <Link to="/auth/register"
            className="text-blue-600 underline cursor-pointer">Register now</Link></p>
          <p className="mt-2">Forgot your password? <Link to="/auth/forgot-password"
            className="text-blue-600 underline cursor-pointer">Reset here</Link></p>
        </div>
      </CardContent>
    </Card>
  )
}
