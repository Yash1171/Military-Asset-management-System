"use client"

import { useState } from "react"
import { Calendar, ChevronDown, Filter, Plus } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { DataTable } from "@/components/data-table"

export default function PurchasesPage() {
  const [open, setOpen] = useState(false)
  const { user, canEdit, getVisibleBases } = useAuth()
  const visibleBases = getVisibleBases()

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Purchases</h2>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1 bg-transparent">
                  <Filter className="h-3.5 w-3.5" />
                  <span>Filter</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user?.role === "Admin" ? (
                  <>
                    <DropdownMenuCheckboxItem checked>All Bases</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Base Alpha</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Base Bravo</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Base Charlie</DropdownMenuCheckboxItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuCheckboxItem checked>{user?.base}</DropdownMenuCheckboxItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>All Equipment</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Vehicles</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Weapons</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Ammunition</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" className="h-8 gap-1 bg-transparent">
              <Calendar className="h-3.5 w-3.5" />
              <span>May 2025</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </Button>
            {canEdit("purchases") && (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-8 gap-1">
                    <Plus className="h-3.5 w-3.5" />
                    <span>New Purchase</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Record New Purchase</DialogTitle>
                    <DialogDescription>Enter the details of the new asset purchase</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="text-right">
                        Date
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        className="col-span-3"
                        defaultValue={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="base" className="text-right">
                        Base
                      </Label>
                      <Select
                        defaultValue={user?.role === "Admin" ? "base-alpha" : user?.base?.toLowerCase() || "base-alpha"}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select base" />
                        </SelectTrigger>
                        <SelectContent>
                          {user?.role === "Admin" ? (
                            <>
                              <SelectItem value="base-alpha">Base Alpha</SelectItem>
                              <SelectItem value="base-bravo">Base Bravo</SelectItem>
                              <SelectItem value="base-charlie">Base Charlie</SelectItem>
                            </>
                          ) : (
                            <SelectItem value={user?.base?.toLowerCase() || "base-alpha"}>{user?.base}</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">
                        Asset Type
                      </Label>
                      <Select defaultValue="vehicles">
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select asset type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vehicles">Vehicles</SelectItem>
                          <SelectItem value="weapons">Weapons</SelectItem>
                          <SelectItem value="ammunition">Ammunition</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="quantity" className="text-right">
                        Quantity
                      </Label>
                      <Input id="quantity" type="number" className="col-span-3" defaultValue="1" min="1" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="notes" className="text-right">
                        Notes
                      </Label>
                      <Input id="notes" className="col-span-3" placeholder="Additional information" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      onClick={() => {
                        setOpen(false)
                      }}
                    >
                      Record Purchase
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Purchase History</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  { header: "Date", accessorKey: "date" },
                  { header: "Base", accessorKey: "base" },
                  { header: "Type", accessorKey: "type" },
                  { header: "Quantity", accessorKey: "quantity" },
                  { header: "Recorded By", accessorKey: "recordedBy" },
                  { header: "Status", accessorKey: "status" },
                ]}
                data={[
                  {
                    date: "May 15, 2025",
                    base: "Base Alpha",
                    type: "Vehicles",
                    quantity: 25,
                    recordedBy: "Capt. Johnson",
                    status: "Completed",
                  },
                  {
                    date: "May 10, 2025",
                    base: "Base Bravo",
                    type: "Weapons",
                    quantity: 100,
                    recordedBy: "Lt. Smith",
                    status: "Completed",
                  },
                  {
                    date: "May 5, 2025",
                    base: "Base Charlie",
                    type: "Ammunition",
                    quantity: 50,
                    recordedBy: "Maj. Williams",
                    status: "Completed",
                  },
                  {
                    date: "Apr 28, 2025",
                    base: "Base Alpha",
                    type: "Vehicles",
                    quantity: 15,
                    recordedBy: "Capt. Johnson",
                    status: "Completed",
                  },
                  {
                    date: "Apr 22, 2025",
                    base: "Base Bravo",
                    type: "Weapons",
                    quantity: 75,
                    recordedBy: "Lt. Smith",
                    status: "Completed",
                  },
                  {
                    date: "Apr 18, 2025",
                    base: "Base Charlie",
                    type: "Ammunition",
                    quantity: 120,
                    recordedBy: "Maj. Williams",
                    status: "Completed",
                  },
                  {
                    date: "Apr 12, 2025",
                    base: "Base Alpha",
                    type: "Vehicles",
                    quantity: 10,
                    recordedBy: "Capt. Johnson",
                    status: "Completed",
                  },
                  {
                    date: "Apr 8, 2025",
                    base: "Base Bravo",
                    type: "Weapons",
                    quantity: 50,
                    recordedBy: "Lt. Smith",
                    status: "Completed",
                  },
                  {
                    date: "Apr 3, 2025",
                    base: "Base Charlie",
                    type: "Ammunition",
                    quantity: 80,
                    recordedBy: "Maj. Williams",
                    status: "Completed",
                  },
                  {
                    date: "Mar 29, 2025",
                    base: "Base Alpha",
                    type: "Vehicles",
                    quantity: 5,
                    recordedBy: "Capt. Johnson",
                    status: "Completed",
                  },
                ]}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
