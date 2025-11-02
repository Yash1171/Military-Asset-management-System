"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { CircleUser, FileText, Home, LogOut, Menu, Package, Search, Shield, Truck, Users } from "lucide-react"
import { Suspense } from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useAuth } from "@/lib/auth-context"
import { ThemeToggle } from "@/components/theme-toggle"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { user, logout, switchRole, canAccess } = useAuth()

  if (!user) {
    router.push("/login")
    return null
  }

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
      active: pathname === "/dashboard",
      visible: canAccess("dashboard"),
    },
    {
      label: "Purchases",
      icon: Package,
      href: "/dashboard/purchases",
      active: pathname === "/dashboard/purchases",
      visible: canAccess("purchases"),
    },
    {
      label: "Transfers",
      icon: Truck,
      href: "/dashboard/transfers",
      active: pathname === "/dashboard/transfers",
      visible: canAccess("transfers"),
    },
    {
      label: "Assignments",
      icon: Users,
      href: "/dashboard/assignments",
      active: pathname === "/dashboard/assignments",
      visible: canAccess("assignments"),
    },
    {
      label: "Reports",
      icon: FileText,
      href: "/dashboard/reports",
      active: pathname === "/dashboard/reports",
      visible: canAccess("reports"),
    },
    {
      label: "User Management",
      icon: Shield,
      href: "/dashboard/users",
      active: pathname === "/dashboard/users",
      visible: canAccess("users"),
    },
  ]

  const visibleRoutes = routes.filter((r) => r.visible)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleRoleSwitch = (role: "Admin" | "Base Commander" | "Logistics Officer") => {
    switchRole(role)
  }

  return (
    <Suspense>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <Sheet open={open} onOpenChange={setOpen}>
            <Button variant="outline" size="icon" className="md:hidden bg-transparent" onClick={() => setOpen(true)}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
            <SheetContent side="left" className="pr-0">
              <div className="px-7">
                <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                  <Shield className="h-6 w-6" />
                  <span>MAMS</span>
                </Link>
              </div>
              <div className="flex flex-col gap-4 px-4 py-4">
                <div className="flex items-center gap-2 px-3">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search assets..." className="h-9 w-full bg-background" />
                </div>
                <nav className="grid gap-1">
                  {visibleRoutes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                        route.active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      }`}
                    >
                      <route.icon className="h-4 w-4" />
                      {route.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <Shield className="h-6 w-6" />
              <span className="hidden md:inline-block">Military Asset Management System</span>
              <span className="inline-block md:hidden">MAMS</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 md:flex-initial">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search assets..."
                  className="w-full bg-background pl-8 md:w-[240px] lg:w-[280px]"
                />
              </div>
            </form>
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full border-none bg-transparent">
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col gap-1">
                    <span>{user.name}</span>
                    <span className="text-xs font-normal text-muted-foreground">{user.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs font-semibold">Current Role</DropdownMenuLabel>
                <div className="px-2 py-1 text-sm font-medium text-primary">{user.role}</div>
                {user.base && <div className="px-2 text-xs text-muted-foreground">Base: {user.base}</div>}
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs font-semibold">Switch Role (Demo)</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleRoleSwitch("Admin")}>
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Admin</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleSwitch("Base Commander")}>
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Base Commander</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRoleSwitch("Logistics Officer")}>
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Logistics Officer</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <CircleUser className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 dark:text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex flex-1">
          <aside className="hidden w-[240px] flex-col border-r bg-muted/40 md:flex">
            <nav className="grid gap-1 p-4">
              {visibleRoutes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                    route.active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <route.icon className="h-4 w-4" />
                  {route.label}
                </Link>
              ))}
            </nav>
          </aside>
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </Suspense>
  )
}
