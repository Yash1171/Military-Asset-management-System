"use client"

import { useState } from "react"
import { Calendar, ChevronDown, Filter, Plus } from "lucide-react"

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { DataTable } from "@/components/data-table"

export default function AssignmentsPage() {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("assigned")

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Assignments & Expenditures</h2>
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
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1">
                  <Plus className="h-3.5 w-3.5" />
                  <span>New Record</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Record Assignment/Expenditure</DialogTitle>
                  <DialogDescription>Enter the details for asset assignment or expenditure</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <RadioGroup defaultValue="assign" className="grid grid-cols-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="assign" id="assign" />
                      <Label htmlFor="assign">Assign Asset</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="expend" id="expend" />
                      <Label htmlFor="expend">Expend Asset</Label>
                    </div>
                  </RadioGroup>
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
                    <Select defaultValue="base-alpha">
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select base" />
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
                    <Label htmlFor="personnel" className="text-right">
                      Personnel/Unit
                    </Label>
                    <Input id="personnel" className="col-span-3" placeholder="Personnel or unit name" />
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
                    Record
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Tabs defaultValue="assigned" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="assigned">Assigned Assets</TabsTrigger>
            <TabsTrigger value="expended">Expended Assets</TabsTrigger>
          </TabsList>
          <TabsContent value="assigned" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Assigned Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={[
                    { header: "Date", accessorKey: "date" },
                    { header: "Base", accessorKey: "base" },
                    { header: "Type", accessorKey: "type" },
                    { header: "Quantity", accessorKey: "quantity" },
                    { header: "Assigned To", accessorKey: "assignedTo" },
                    { header: "Authorized By", accessorKey: "authorizedBy" },
                    { header: "Status", accessorKey: "status" },
                  ]}
                  data={[
                    {
                      date: "May 22, 2025",
                      base: "Base Alpha",
                      type: "Vehicles",
                      quantity: 5,
                      assignedTo: "1st Infantry Division",
                      authorizedBy: "Col. Richards",
                      status: "Active",
                    },
                    {
                      date: "May 20, 2025",
                      base: "Base Bravo",
                      type: "Weapons",
                      quantity: 50,
                      assignedTo: "2nd Armored Division",
                      authorizedBy: "Maj. Thompson",
                      status: "Active",
                    },
                    {
                      date: "May 18, 2025",
                      base: "Base Charlie",
                      type: "Ammunition",
                      quantity: 100,
                      assignedTo: "3rd Special Forces",
                      authorizedBy: "Lt. Col. Davis",
                      status: "Active",
                    },
                    {
                      date: "May 15, 2025",
                      base: "Base Alpha",
                      type: "Vehicles",
                      quantity: 3,
                      assignedTo: "4th Reconnaissance Unit",
                      authorizedBy: "Col. Richards",
                      status: "Active",
                    },
                    {
                      date: "May 12, 2025",
                      base: "Base Bravo",
                      type: "Weapons",
                      quantity: 25,
                      assignedTo: "5th Infantry Division",
                      authorizedBy: "Maj. Thompson",
                      status: "Active",
                    },
                    {
                      date: "May 10, 2025",
                      base: "Base Charlie",
                      type: "Ammunition",
                      quantity: 75,
                      assignedTo: "6th Artillery Unit",
                      authorizedBy: "Lt. Col. Davis",
                      status: "Active",
                    },
                    {
                      date: "May 8, 2025",
                      base: "Base Alpha",
                      type: "Vehicles",
                      quantity: 2,
                      assignedTo: "7th Mechanized Division",
                      authorizedBy: "Col. Richards",
                      status: "Active",
                    },
                    {
                      date: "May 5, 2025",
                      base: "Base Bravo",
                      type: "Weapons",
                      quantity: 30,
                      assignedTo: "8th Special Operations",
                      authorizedBy: "Maj. Thompson",
                      status: "Active",
                    },
                    {
                      date: "May 3, 2025",
                      base: "Base Charlie",
                      type: "Ammunition",
                      quantity: 50,
                      assignedTo: "9th Infantry Division",
                      authorizedBy: "Lt. Col. Davis",
                      status: "Active",
                    },
                    {
                      date: "May 1, 2025",
                      base: "Base Alpha",
                      type: "Vehicles",
                      quantity: 4,
                      assignedTo: "10th Armored Division",
                      authorizedBy: "Col. Richards",
                      status: "Active",
                    },
                  ]}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="expended" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Expended Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={[
                    { header: "Date", accessorKey: "date" },
                    { header: "Base", accessorKey: "base" },
                    { header: "Type", accessorKey: "type" },
                    { header: "Quantity", accessorKey: "quantity" },
                    { header: "Operation", accessorKey: "operation" },
                    { header: "Authorized By", accessorKey: "authorizedBy" },
                    { header: "Status", accessorKey: "status" },
                  ]}
                  data={[
                    {
                      date: "May 21, 2025",
                      base: "Base Alpha",
                      type: "Ammunition",
                      quantity: 15,
                      operation: "Training Exercise Alpha",
                      authorizedBy: "Col. Richards",
                      status: "Completed",
                    },
                    {
                      date: "May 19, 2025",
                      base: "Base Bravo",
                      type: "Ammunition",
                      quantity: 25,
                      operation: "Operation Thunderbolt",
                      authorizedBy: "Maj. Thompson",
                      status: "Completed",
                    },
                    {
                      date: "May 17, 2025",
                      base: "Base Charlie",
                      type: "Ammunition",
                      quantity: 10,
                      operation: "Training Exercise Bravo",
                      authorizedBy: "Lt. Col. Davis",
                      status: "Completed",
                    },
                    {
                      date: "May 14, 2025",
                      base: "Base Alpha",
                      type: "Ammunition",
                      quantity: 5,
                      operation: "Routine Maintenance",
                      authorizedBy: "Col. Richards",
                      status: "Completed",
                    },
                    {
                      date: "May 11, 2025",
                      base: "Base Bravo",
                      type: "Ammunition",
                      quantity: 8,
                      operation: "Operation Sentinel",
                      authorizedBy: "Maj. Thompson",
                      status: "Completed",
                    },
                    {
                      date: "May 9, 2025",
                      base: "Base Charlie",
                      type: "Ammunition",
                      quantity: 2,
                      operation: "Training Exercise Charlie",
                      authorizedBy: "Lt. Col. Davis",
                      status: "Completed",
                    },
                  ]}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
