"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowDown, ArrowRight, ArrowUp, Calendar, ChevronDown, Filter, Package, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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

export default function DashboardPage() {
  const [openDialog, setOpenDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
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
                <DropdownMenuCheckboxItem checked>All Equipment</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Vehicles</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Weapons</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Ammunition</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>May 2025</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Opening Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,245</div>
              <p className="text-xs text-muted-foreground">Total assets at period start</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Closing Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,352</div>
              <p className="text-xs text-muted-foreground">Total assets at period end</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Movement</CardTitle>
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Net Movement Details</DialogTitle>
                    <DialogDescription>Breakdown of asset movements during the period</DialogDescription>
                  </DialogHeader>
                  <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="purchases">Purchases</TabsTrigger>
                      <TabsTrigger value="transferIn">Transfer In</TabsTrigger>
                      <TabsTrigger value="transferOut">Transfer Out</TabsTrigger>
                    </TabsList>
                    <TabsContent value="purchases" className="space-y-4">
                      <div className="rounded-md border">
                        <div className="flex items-center justify-between p-4">
                          <div className="space-y-1">
                            <h4 className="text-sm font-medium">Purchases</h4>
                            <p className="text-sm text-muted-foreground">New assets acquired during the period</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                              <Package className="h-4 w-4 text-green-700" />
                            </div>
                            <div className="text-2xl font-bold text-green-600">+175</div>
                          </div>
                        </div>
                        <div className="px-4 pb-4">
                          <DataTable
                            columns={[
                              { header: "Date", accessorKey: "date" },
                              { header: "Base", accessorKey: "base" },
                              { header: "Type", accessorKey: "type" },
                              { header: "Quantity", accessorKey: "quantity" },
                            ]}
                            data={[
                              {
                                date: "May 15, 2025",
                                base: "Base Alpha",
                                type: "Vehicles",
                                quantity: 25,
                              },
                              {
                                date: "May 10, 2025",
                                base: "Base Bravo",
                                type: "Weapons",
                                quantity: 100,
                              },
                              {
                                date: "May 5, 2025",
                                base: "Base Charlie",
                                type: "Ammunition",
                                quantity: 50,
                              },
                            ]}
                          />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="transferIn" className="space-y-4">
                      <div className="rounded-md border">
                        <div className="flex items-center justify-between p-4">
                          <div className="space-y-1">
                            <h4 className="text-sm font-medium">Transfer In</h4>
                            <p className="text-sm text-muted-foreground">Assets transferred in from other bases</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                              <ArrowDown className="h-4 w-4 text-blue-700" />
                            </div>
                            <div className="text-2xl font-bold text-blue-600">+82</div>
                          </div>
                        </div>
                        <div className="px-4 pb-4">
                          <DataTable
                            columns={[
                              { header: "Date", accessorKey: "date" },
                              { header: "From", accessorKey: "from" },
                              { header: "To", accessorKey: "to" },
                              { header: "Type", accessorKey: "type" },
                              { header: "Quantity", accessorKey: "quantity" },
                            ]}
                            data={[
                              {
                                date: "May 18, 2025",
                                from: "Base Delta",
                                to: "Base Alpha",
                                type: "Vehicles",
                                quantity: 12,
                              },
                              {
                                date: "May 12, 2025",
                                from: "Base Echo",
                                to: "Base Bravo",
                                type: "Weapons",
                                quantity: 40,
                              },
                              {
                                date: "May 7, 2025",
                                from: "Base Foxtrot",
                                to: "Base Charlie",
                                type: "Ammunition",
                                quantity: 30,
                              },
                            ]}
                          />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="transferOut" className="space-y-4">
                      <div className="rounded-md border">
                        <div className="flex items-center justify-between p-4">
                          <div className="space-y-1">
                            <h4 className="text-sm font-medium">Transfer Out</h4>
                            <p className="text-sm text-muted-foreground">Assets transferred out to other bases</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                              <ArrowUp className="h-4 w-4 text-amber-700" />
                            </div>
                            <div className="text-2xl font-bold text-amber-600">-50</div>
                          </div>
                        </div>
                        <div className="px-4 pb-4">
                          <DataTable
                            columns={[
                              { header: "Date", accessorKey: "date" },
                              { header: "From", accessorKey: "from" },
                              { header: "To", accessorKey: "to" },
                              { header: "Type", accessorKey: "type" },
                              { header: "Quantity", accessorKey: "quantity" },
                            ]}
                            data={[
                              {
                                date: "May 20, 2025",
                                from: "Base Alpha",
                                to: "Base Delta",
                                type: "Vehicles",
                                quantity: 8,
                              },
                              {
                                date: "May 14, 2025",
                                from: "Base Bravo",
                                to: "Base Echo",
                                type: "Weapons",
                                quantity: 22,
                              },
                              {
                                date: "May 9, 2025",
                                from: "Base Charlie",
                                to: "Base Foxtrot",
                                type: "Ammunition",
                                quantity: 20,
                              },
                            ]}
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+107</div>
              <div className="mt-1 flex items-center space-x-2 text-xs">
                <div className="flex items-center">
                  <Package className="mr-1 h-3 w-3 text-green-600" />
                  <span className="text-green-600">+175</span>
                </div>
                <div className="flex items-center">
                  <ArrowDown className="mr-1 h-3 w-3 text-blue-600" />
                  <span className="text-blue-600">+82</span>
                </div>
                <div className="flex items-center">
                  <ArrowUp className="mr-1 h-3 w-3 text-amber-600" />
                  <span className="text-amber-600">-50</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assigned & Expended</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <span className="text-blue-600">428</span> / <span className="text-red-600">65</span>
              </div>
              <div className="mt-1 flex items-center space-x-2 text-xs">
                <div className="flex items-center">
                  <Users className="mr-1 h-3 w-3 text-blue-600" />
                  <span className="text-blue-600">Assigned</span>
                </div>
                <div className="flex items-center">
                  <Package className="mr-1 h-3 w-3 text-red-600" />
                  <span className="text-red-600">Expended</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
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
              <CardTitle>Asset Status</CardTitle>
            </CardHeader>
            <CardContent>
              <AssetStatusChart />
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Recent Transfers</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  { header: "Date", accessorKey: "date" },
                  { header: "From", accessorKey: "from" },
                  { header: "To", accessorKey: "to" },
                  { header: "Type", accessorKey: "type" },
                  { header: "Quantity", accessorKey: "quantity" },
                  { header: "Status", accessorKey: "status" },
                ]}
                data={[
                  {
                    date: "May 20, 2025",
                    from: "Base Alpha",
                    to: "Base Delta",
                    type: "Vehicles",
                    quantity: 8,
                    status: "Completed",
                  },
                  {
                    date: "May 18, 2025",
                    from: "Base Delta",
                    to: "Base Alpha",
                    type: "Vehicles",
                    quantity: 12,
                    status: "Completed",
                  },
                  {
                    date: "May 14, 2025",
                    from: "Base Bravo",
                    to: "Base Echo",
                    type: "Weapons",
                    quantity: 22,
                    status: "Completed",
                  },
                  {
                    date: "May 12, 2025",
                    from: "Base Echo",
                    to: "Base Bravo",
                    type: "Weapons",
                    quantity: 40,
                    status: "Completed",
                  },
                  {
                    date: "May 9, 2025",
                    from: "Base Charlie",
                    to: "Base Foxtrot",
                    type: "Ammunition",
                    quantity: 20,
                    status: "Completed",
                  },
                ]}
              />
              <div className="mt-4 flex justify-end">
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/transfers">
                    View All Transfers
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Purchases</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  { header: "Date", accessorKey: "date" },
                  { header: "Base", accessorKey: "base" },
                  { header: "Type", accessorKey: "type" },
                  { header: "Quantity", accessorKey: "quantity" },
                ]}
                data={[
                  {
                    date: "May 15, 2025",
                    base: "Base Alpha",
                    type: "Vehicles",
                    quantity: 25,
                  },
                  {
                    date: "May 10, 2025",
                    base: "Base Bravo",
                    type: "Weapons",
                    quantity: 100,
                  },
                  {
                    date: "May 5, 2025",
                    base: "Base Charlie",
                    type: "Ammunition",
                    quantity: 50,
                  },
                ]}
              />
              <div className="mt-4 flex justify-end">
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/purchases">
                    View All Purchases
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
