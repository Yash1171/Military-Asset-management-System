"use client"

import { useState } from "react"
import { Calendar, ChevronDown, Download, Filter, TrendingUp, TrendingDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { AssetMovementChart } from "@/components/asset-movement-chart"
import { AssetStatusChart } from "@/components/asset-status-chart"
import { DataTable } from "@/components/data-table"

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const assetSummaryData = [
    {
      base: "Base Alpha",
      vehicles: 125,
      weapons: 450,
      ammunition: 2500,
      total: 3075,
      change: "+5.2%",
      trend: "up",
    },
    {
      base: "Base Bravo",
      vehicles: 98,
      weapons: 380,
      ammunition: 2100,
      total: 2578,
      change: "+2.8%",
      trend: "up",
    },
    {
      base: "Base Charlie",
      vehicles: 87,
      weapons: 320,
      ammunition: 1800,
      total: 2207,
      change: "-1.5%",
      trend: "down",
    },
    {
      base: "Base Delta",
      vehicles: 76,
      weapons: 290,
      ammunition: 1600,
      total: 1966,
      change: "+3.1%",
      trend: "up",
    },
  ]

  const transferAnalysisData = [
    {
      route: "Alpha → Bravo",
      frequency: 15,
      avgQuantity: 25,
      totalAssets: 375,
      efficiency: "98%",
      status: "Optimal",
    },
    {
      route: "Bravo → Charlie",
      frequency: 12,
      avgQuantity: 18,
      totalAssets: 216,
      efficiency: "95%",
      status: "Good",
    },
    {
      route: "Charlie → Alpha",
      frequency: 8,
      avgQuantity: 22,
      totalAssets: 176,
      efficiency: "92%",
      status: "Good",
    },
    {
      route: "Delta → Echo",
      frequency: 6,
      avgQuantity: 15,
      totalAssets: 90,
      efficiency: "88%",
      status: "Review",
    },
  ]

  const expenditureAnalysisData = [
    {
      operation: "Training Exercise Alpha",
      base: "Base Alpha",
      assetsUsed: 150,
      cost: "$45,000",
      efficiency: "High",
      date: "May 2025",
    },
    {
      operation: "Operation Thunderbolt",
      base: "Base Bravo",
      assetsUsed: 280,
      cost: "$84,000",
      efficiency: "Medium",
      date: "May 2025",
    },
    {
      operation: "Training Exercise Bravo",
      base: "Base Charlie",
      assetsUsed: 95,
      cost: "$28,500",
      efficiency: "High",
      date: "May 2025",
    },
    {
      operation: "Operation Sentinel",
      base: "Base Bravo",
      assetsUsed: 120,
      cost: "$36,000",
      efficiency: "Medium",
      date: "May 2025",
    },
  ]

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  <span>Filter</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>All Bases</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Base Alpha</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Base Bravo</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Base Charlie</DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>All Time Periods</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Last 30 Days</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Last 90 Days</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Last Year</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>May 2025</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </Button>
            <Button size="sm" className="h-8 gap-1">
              <Download className="h-3.5 w-3.5" />
              <span>Export</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assets">Asset Analysis</TabsTrigger>
            <TabsTrigger value="transfers">Transfer Analysis</TabsTrigger>
            <TabsTrigger value="expenditures">Expenditure Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">9,826</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+2.5%</span> from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Transfers</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">41</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+12%</span> from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Expenditure</CardTitle>
                  <TrendingDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">645</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-red-600">-8%</span> from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Efficiency Score</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94.2%</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+1.2%</span> from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Asset Movement Trends</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <AssetMovementChart />
                </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Asset Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <AssetStatusChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="assets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Asset Summary by Base</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={[
                    { header: "Base", accessorKey: "base" },
                    { header: "Vehicles", accessorKey: "vehicles" },
                    { header: "Weapons", accessorKey: "weapons" },
                    { header: "Ammunition", accessorKey: "ammunition" },
                    { header: "Total Assets", accessorKey: "total" },
                    {
                      header: "Change",
                      accessorKey: "change",
                      cell: (row: any) => (
                        <span className={row.trend === "up" ? "text-green-600" : "text-red-600"}>
                          {row.trend === "up" ? (
                            <TrendingUp className="inline h-4 w-4 mr-1" />
                          ) : (
                            <TrendingDown className="inline h-4 w-4 mr-1" />
                          )}
                          {row.change}
                        </span>
                      ),
                    },
                  ]}
                  data={assetSummaryData}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transfers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Transfer Route Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={[
                    { header: "Transfer Route", accessorKey: "route" },
                    { header: "Frequency", accessorKey: "frequency" },
                    { header: "Avg Quantity", accessorKey: "avgQuantity" },
                    { header: "Total Assets", accessorKey: "totalAssets" },
                    { header: "Efficiency", accessorKey: "efficiency" },
                    {
                      header: "Status",
                      accessorKey: "status",
                      cell: (row: any) => (
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            row.status === "Optimal"
                              ? "bg-green-100 text-green-800"
                              : row.status === "Good"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {row.status}
                        </span>
                      ),
                    },
                  ]}
                  data={transferAnalysisData}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenditures" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Expenditure Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={[
                    { header: "Operation", accessorKey: "operation" },
                    { header: "Base", accessorKey: "base" },
                    { header: "Assets Used", accessorKey: "assetsUsed" },
                    { header: "Estimated Cost", accessorKey: "cost" },
                    {
                      header: "Efficiency",
                      accessorKey: "efficiency",
                      cell: (row: any) => (
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            row.efficiency === "High"
                              ? "bg-green-100 text-green-800"
                              : row.efficiency === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {row.efficiency}
                        </span>
                      ),
                    },
                    { header: "Date", accessorKey: "date" },
                  ]}
                  data={expenditureAnalysisData}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
