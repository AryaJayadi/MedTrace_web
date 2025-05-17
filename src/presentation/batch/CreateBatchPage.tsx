
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Calendar, ArrowLeft, Save } from "lucide-react"
import { Link, useNavigate } from "react-router"
import { ROUTES } from "@/core/Routes"

export default function CreateBatchPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    drugName: "",
    quantity: "",
    productionDate: "",
    expiryDate: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send data to an API
    console.log("Submitting batch:", formData)

    // Navigate back to batches list
    navigate(ROUTES.FULL_PATH_APP_BATCH)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center gap-2">
        <Link to={ROUTES.FULL_PATH_APP_BATCH} className="text-gray-500 hover:text-gray-700 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Create New Batch</h1>
      </div>

      <Card className="card-shadow">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-lg font-medium text-gray-700">Batch Information</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              <div className="bg-primary/5 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Manufacturer Name</div>
                <div className="font-medium text-gray-800">PT Manufacturer Pharmacy</div>
              </div>

              <div className="bg-primary/5 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Manufacture Location</div>
                <div className="font-medium text-gray-800">Kuala Lumpur, Malaysia</div>
              </div>

              <div>
                <Label htmlFor="drugName" className="text-gray-700">
                  Drug Name
                </Label>
                <Input
                  id="drugName"
                  name="drugName"
                  value={formData.drugName}
                  onChange={handleChange}
                  placeholder="Insert drug name"
                  className="mt-1 border-gray-200 focus:ring-primary"
                />
              </div>

              <div>
                <Label htmlFor="quantity" className="text-gray-700">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Insert quantity"
                  className="mt-1 border-gray-200 focus:ring-primary"
                />
              </div>

              <div>
                <Label htmlFor="productionDate" className="text-gray-700">
                  Production Date
                </Label>
                <div className="relative">
                  <Input
                    id="productionDate"
                    name="productionDate"
                    type="date"
                    value={formData.productionDate}
                    onChange={handleChange}
                    className="mt-1 border-gray-200 focus:ring-primary"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                </div>
              </div>

              <div>
                <Label htmlFor="expiryDate" className="text-gray-700">
                  Expiry Date
                </Label>
                <div className="relative">
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="mt-1 border-gray-200 focus:ring-primary"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-4 p-6 border-t bg-gray-50">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(ROUTES.FULL_PATH_APP_BATCH)}
              className="border-gray-200 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-white gap-2">
              <Save className="h-4 w-4" /> Save Batch
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
