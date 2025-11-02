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

export default function TransfersPage() {
  const [open, setOpen] = useState(false)
  const { user, canEdit } = useAuth()

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Transfers</h2>
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
            {canEdit("transfers") && (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-8 gap-1">
                    <Plus className="h-3.5 w-3.5" />
                    <span>New Transfer</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Transfer</DialogTitle>
                    <DialogDescription>Enter the details for transferring assets between bases</DialogDescription>
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
                      <Label htmlFor="from" className="text-right">
                        From Base
                      </Label>
                      <Select defaultValue="base-alpha">
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select source base" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="base-alpha">Base Alpha</SelectItem>
                          <SelectItem value="base-bravo">Base Bravo</SelectItem>
                          <SelectItem value="base-charlie">Base Charlie</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="to" className="text-right">
                        To Base
                      </Label>
                      <Select defaultValue="base-bravo">
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select destination base" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="base-alpha">Base Alpha</SelectItem>
                          <SelectItem value="base-bravo">Base Bravo</SelectItem>
                          <SelectItem value="base-charlie">Base Charlie</SelectItem>
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
                      Create Transfer
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
              <CardTitle>Transfer History</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  { header: "Date", accessorKey: "date" },
                  { header: "From", accessorKey: "from" },
                  { header: "To", accessorKey: "to" },
                  { header: "Type", accessorKey: "type" },
                  { header: "Quantity", accessorKey: "quantity" },
                  { header: "Authorized By", accessorKey: "authorizedBy" },
                  { header: "Status", accessorKey: "status" },
                ]}
                data={[
                  {
                    date: "May 20, 2025",
                    from: "Base Alpha",
                    to: "Base Delta",
                    type: "Vehicles",
                    quantity: 8,
                    authorizedBy: "Col. Richards",
                    status: "Completed",
                  },
                  {
                    date: "May 18, 2025",
                    from: "Base Delta",
                    to: "Base Alpha",
                    type: "Vehicles",
                    quantity: 12,
                    authorizedBy: "Col. Richards",
                    status: "Completed",
                  },
                  {
                    date: "May 14, 2025",
                    from: "Base Bravo",
                    to: "Base Echo",
                    type: "Weapons",
                    quantity: 22,
                    authorizedBy: "Maj. Thompson",
                    status: "Completed",
                  },
                  {
                    date: "May 12, 2025",
                    from: "Base Echo",
                    to: "Base Bravo",
                    type: "Weapons",
                    quantity: 40,
                    authorizedBy: "Maj. Thompson",
                    status: "Completed",
                  },
                  {
                    date: "May 9, 2025",
                    from: "Base Charlie",
                    to: "Base Foxtrot",
                    type: "Ammunition",
                    quantity: 20,
                    authorizedBy: "Lt. Col. Davis",
                    status: "Completed",
                  },
                  {
                    date: "May 7, 2025",
                    from: "Base Foxtrot",
                    to: "Base Charlie",
                    type: "Ammunition",
                    quantity: 30,
                    authorizedBy: "Lt. Col. Davis",
                    status: "Completed",
                  },
                  {
                    date: "Apr 28, 2025",
                    from: "Base Alpha",
                    to: "Base Bravo",
                    type: "Vehicles",
                    quantity: 5,
                    authorizedBy: "Col. Richards",
                    status: "Completed",
                  },
                  {
                    date: "Apr 25, 2025",
                    from: "Base Bravo",
                    to: "Base Charlie",
                    type: "Weapons",
                    quantity: 15,
                    authorizedBy: "Maj. Thompson",
                    status: "Completed",
                  },
                  {
                    date: "Apr 20, 2025",
                    from: "Base Charlie",
                    to: "Base Alpha",
                    type: "Ammunition",
                    quantity: 25,
                    authorizedBy: "Lt. Col. Davis",
                    status: "Completed",
                  },
                  {
                    date: "Apr 15, 2025",
                    from: "Base Delta",
                    to: "Base Echo",
                    type: "Vehicles",
                    quantity: 3,
                    authorizedBy: "Col. Richards",
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
