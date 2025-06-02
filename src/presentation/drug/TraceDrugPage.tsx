import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Building, TruckIcon, Hospital } from "lucide-react"
import DrugTimeline from "@/components/drug-timeline"

export default function TracePage() {
  const [drugId, setDrugId] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchPerformed, setSearchPerformed] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!drugId) return

    setIsSearching(true)

    // Simulate API call
    setTimeout(() => {
      setIsSearching(false)
      setSearchPerformed(true)

      // In a real app, this would navigate to a specific drug trace page
      // For demo, we'll just show the results on the same page
    }, 1000)
  }

  // Sample drug trace data
  const drugTraceData = {
    id: "404ase-ajkrn2943-ewjnvur-093J",
    name: "Paracetamol",
    dosage: "500mg",
    timeline: [
      {
        date: "2020-01-01 10:05 a.m.",
        organization: "PT Manufacture Pharmacy",
        location: "Kuala Lumpur, Malaysia",
        type: "manufacturer",
        icon: <Building className="h-5 w-5" />,
      },
      {
        date: "2020-01-03 12:05 a.m.",
        organization: "Indonesia Distributor",
        location: "Jakarta Barat, Indonesia",
        type: "distributor",
        icon: <TruckIcon className="h-5 w-5" />,
      },
      {
        date: "2020-01-05 10:10 a.m.",
        organization: "Clinic Sejahtera",
        location: "Tangerang, Indonesia",
        type: "clinic",
        icon: <Hospital className="h-5 w-5" />,
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Trace Drug</h1>
      </div>

      <Card className="card-shadow">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-lg font-medium text-gray-700">Search Drug by ID</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <Input
                placeholder="Enter drug ID..."
                value={drugId}
                onChange={(e) => setDrugId(e.target.value)}
                className="pl-10 border-gray-200 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-white" disabled={isSearching}>
              {isSearching ? "Searching..." : "Trace"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {searchPerformed && (
        <Card className="card-shadow">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-lg font-medium text-gray-700">Drug Trace Results</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-8 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">Trusted by MedTrace</h2>
              <p className="text-gray-500 text-sm">Verified pharmaceutical supply chain</p>
            </div>

            <DrugTimeline timeline={drugTraceData.timeline} />

            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-sm text-gray-500">Drug ID:</span>
                  <span className="ml-2 font-mono text-gray-700">{drugTraceData.id}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-100">
                    Download Certificate
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90 text-white">Verify Authenticity</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
