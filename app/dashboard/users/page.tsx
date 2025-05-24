"use client"

import { useState } from "react"
import { ChevronDown, Filter, Plus, Edit, Trash2, Shield, User } from "lucide-react"

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
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { DataTable } from "@/components/data-table"

interface UserInterface {
  id: string
  name: string
  email: string
  role: "Admin" | "Base Commander" | "Logistics Officer"
  base: string
  status: "Active" | "Inactive"
  lastLogin: string
  createdAt: string
}

export default function UsersPage() {
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserInterface | null>(null)

  const users: UserInterface[] = [
    {
      id: "1",
      name: "Col. Richards",
      email: "richards@military.gov",
      role: "Admin",
      base: "Base Alpha",
      status: "Active",
      lastLogin: "2025-05-24 09:30",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Maj. Thompson",
      email: "thompson@military.gov",
      role: "Base Commander",
      base: "Base Bravo",
      status: "Active",
      lastLogin: "2025-05-24 08:45",
      createdAt: "2024-02-20",
    },
    {
      id: "3",
      name: "Lt. Col. Davis",
      email: "davis@military.gov",
      role: "Base Commander",
      base: "Base Charlie",
      status: "Active",
      lastLogin: "2025-05-23 16:20",
      createdAt: "2024-03-10",
    },
    {
      id: "4",
      name: "Capt. Johnson",
      email: "johnson@military.gov",
      role: "Logistics Officer",
      base: "Base Alpha",
      status: "Active",
      lastLogin: "2025-05-24 07:15",
      createdAt: "2024-04-05",
    },
    {
      id: "5",
      name: "Lt. Smith",
      email: "smith@military.gov",
      role: "Logistics Officer",
      base: "Base Bravo",
      status: "Active",
      lastLogin: "2025-05-23 14:30",
      createdAt: "2024-05-12",
    },
    {
      id: "6",
      name: "Maj. Williams",
      email: "williams@military.gov",
      role: "Logistics Officer",
      base: "Base Charlie",
      status: "Inactive",
      lastLogin: "2025-05-20 11:45",
      createdAt: "2024-06-18",
    },
  ]

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Admin":
        return <Shield className="h-4 w-4" />
      case "Base Commander":
        return <User className="h-4 w-4" />
      case "Logistics Officer":
        return <User className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-800"
      case "Base Commander":
        return "bg-blue-100 text-blue-800"
      case "Logistics Officer":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusBadgeColor = (status: string) => {
    return status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
  }

  const handleEdit = (user: UserInterface) => {
    setSelectedUser(user)
    setEditOpen(true)
  }

  const handleDelete = (userId: string) => {
    // Handle user deletion logic here
    console.log("Deleting user:", userId)
  }

  const columns = [
    {
      header: "User",
      accessorKey: "user",
      cell: (row: UserInterface) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
            <AvatarFallback>
              {row.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-sm text-muted-foreground">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Role",
      accessorKey: "role",
      cell: (row: UserInterface) => (
        <Badge className={getRoleBadgeColor(row.role)}>
          {getRoleIcon(row.role)}
          <span className="ml-1">{row.role}</span>
        </Badge>
      ),
    },
    {
      header: "Base",
      accessorKey: "base",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row: UserInterface) => <Badge className={getStatusBadgeColor(row.status)}>{row.status}</Badge>,
    },
    {
      header: "Last Login",
      accessorKey: "lastLogin",
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: (row: UserInterface) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => handleEdit(row)}>
            <Edit className="h-4 w-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the user account for {row.name}.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(row.id)}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
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
                <DropdownMenuCheckboxItem checked>All Roles</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Admin</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Base Commander</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Logistics Officer</DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>All Bases</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Base Alpha</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Base Bravo</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Base Charlie</DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>Active Users</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Inactive Users</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1">
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add User</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>Create a new user account for the system</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Full Name
                    </Label>
                    <Input id="name" className="col-span-3" placeholder="Enter full name" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input id="email" type="email" className="col-span-3" placeholder="Enter email address" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Role
                    </Label>
                    <Select defaultValue="logistics-officer">
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="base-commander">Base Commander</SelectItem>
                        <SelectItem value="logistics-officer">Logistics Officer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="base" className="text-right">
                      Base Assignment
                    </Label>
                    <Select defaultValue="base-alpha">
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select base" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="base-alpha">Base Alpha</SelectItem>
                        <SelectItem value="base-bravo">Base Bravo</SelectItem>
                        <SelectItem value="base-charlie">Base Charlie</SelectItem>
                        <SelectItem value="base-delta">Base Delta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                      Password
                    </Label>
                    <Input id="password" type="password" className="col-span-3" placeholder="Enter password" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="confirmPassword" className="text-right">
                      Confirm Password
                    </Label>
                    <Input id="confirmPassword" type="password" className="col-span-3" placeholder="Confirm password" />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={() => {
                      setOpen(false)
                    }}
                  >
                    Create User
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* User Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">Active system users</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Admins</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.filter((u) => u.role === "Admin").length}</div>
              <p className="text-xs text-muted-foreground">System administrators</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Base Commanders</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.filter((u) => u.role === "Base Commander").length}</div>
              <p className="text-xs text-muted-foreground">Base command staff</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.filter((u) => u.status === "Active").length}</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>System Users</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={users} />
            </CardContent>
          </Card>
        </div>

        {/* Edit User Dialog */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>Update user information and permissions</DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="editName" className="text-right">
                    Full Name
                  </Label>
                  <Input id="editName" className="col-span-3" defaultValue={selectedUser.name} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="editEmail" className="text-right">
                    Email
                  </Label>
                  <Input id="editEmail" type="email" className="col-span-3" defaultValue={selectedUser.email} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="editRole" className="text-right">
                    Role
                  </Label>
                  <Select defaultValue={selectedUser.role.toLowerCase().replace(" ", "-")}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="base-commander">Base Commander</SelectItem>
                      <SelectItem value="logistics-officer">Logistics Officer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="editBase" className="text-right">
                    Base Assignment
                  </Label>
                  <Select defaultValue={selectedUser.base.toLowerCase().replace(" ", "-")}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="base-alpha">Base Alpha</SelectItem>
                      <SelectItem value="base-bravo">Base Bravo</SelectItem>
                      <SelectItem value="base-charlie">Base Charlie</SelectItem>
                      <SelectItem value="base-delta">Base Delta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="editStatus" className="text-right">
                    Status
                  </Label>
                  <Select defaultValue={selectedUser.status.toLowerCase()}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => {
                  setEditOpen(false)
                  setSelectedUser(null)
                }}
              >
                Update User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
