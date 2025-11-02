"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type UserRole = "Admin" | "Base Commander" | "Logistics Officer"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  base?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  switchRole: (role: UserRole) => void
  canAccess: (page: string) => boolean
  canEdit: (resource: string) => boolean
  canDeleteUsers: () => boolean
  canManageAllBases: () => boolean
  getVisibleBases: () => string[]
  allUsers: User[]
  addUser: (user: User) => void
  removeUser: (userId: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const DEFAULT_USERS: Record<string, { password: string; user: User }> = {
  "admin@mams.com": {
    password: "admin123",
    user: {
      id: "1",
      name: "Admin User",
      email: "admin@mams.com",
      role: "Admin",
      base: "Central Command",
    },
  },
  "commander@mams.com": {
    password: "commander123",
    user: {
      id: "2",
      name: "Base Commander",
      email: "commander@mams.com",
      role: "Base Commander",
      base: "Base Alpha",
    },
  },
  "logistics@mams.com": {
    password: "logistics123",
    user: {
      id: "3",
      name: "Logistics Officer",
      email: "logistics@mams.com",
      role: "Logistics Officer",
      base: "Base Bravo",
    },
  },
}

const PERMISSIONS = {
  Admin: {
    canAccessDashboard: true,
    canAccessPurchases: true,
    canAccessTransfers: true,
    canAccessAssignments: true,
    canAccessReports: true,
    canAccessUsers: true,
    canCreatePurchases: true,
    canCreateTransfers: true,
    canCreateAssignments: true,
    canDeleteUsers: true,
    canEditUsers: true,
    canViewAllBases: true,
    canManageAllOperations: true,
  },
  "Base Commander": {
    canAccessDashboard: true,
    canAccessPurchases: true,
    canAccessTransfers: true,
    canAccessAssignments: true,
    canAccessReports: true,
    canAccessUsers: false, // Cannot access user management
    canCreatePurchases: true,
    canCreateTransfers: true,
    canCreateAssignments: true,
    canDeleteUsers: false,
    canEditUsers: false,
    canViewAllBases: false, // Only own base
    canManageAllOperations: false,
  },
  "Logistics Officer": {
    canAccessDashboard: true,
    canAccessPurchases: true,
    canAccessTransfers: true,
    canAccessAssignments: false, // Cannot access assignments
    canAccessReports: false, // Cannot access reports
    canAccessUsers: false,
    canCreatePurchases: true,
    canCreateTransfers: true,
    canCreateAssignments: false,
    canDeleteUsers: false,
    canEditUsers: false,
    canViewAllBases: false, // Only own base
    canManageAllOperations: false,
  },
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [allUsers, setAllUsers] = useState<User[]>(Object.values(DEFAULT_USERS).map((u) => u.user))

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const storedUsers = localStorage.getItem("allUsers")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
      }
    }
    if (storedUsers) {
      try {
        setAllUsers(JSON.parse(storedUsers))
      } catch (error) {
        console.error("Failed to parse stored users:", error)
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const credentials = DEFAULT_USERS[email]

    if (!credentials || credentials.password !== password) {
      throw new Error("Invalid email or password")
    }

    setUser(credentials.user)
    localStorage.setItem("user", JSON.stringify(credentials.user))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const switchRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  const canAccess = (page: string): boolean => {
    if (!user) return false
    const perms = PERMISSIONS[user.role]
    switch (page) {
      case "dashboard":
        return perms.canAccessDashboard
      case "purchases":
        return perms.canAccessPurchases
      case "transfers":
        return perms.canAccessTransfers
      case "assignments":
        return perms.canAccessAssignments
      case "reports":
        return perms.canAccessReports
      case "users":
        return perms.canAccessUsers
      default:
        return false
    }
  }

  const canEdit = (resource: string): boolean => {
    if (!user) return false
    const perms = PERMISSIONS[user.role]
    switch (resource) {
      case "purchases":
        return perms.canCreatePurchases
      case "transfers":
        return perms.canCreateTransfers
      case "assignments":
        return perms.canCreateAssignments
      default:
        return false
    }
  }

  const canDeleteUsers = (): boolean => {
    if (!user) return false
    return PERMISSIONS[user.role].canDeleteUsers
  }

  const canManageAllBases = (): boolean => {
    if (!user) return false
    return PERMISSIONS[user.role].canViewAllBases
  }

  const getVisibleBases = (): string[] => {
    if (!user) return []
    if (PERMISSIONS[user.role].canViewAllBases) {
      return ["Base Alpha", "Base Bravo", "Base Charlie", "Base Delta", "Base Echo", "Base Foxtrot"]
    }
    return user.base ? [user.base] : []
  }

  const addUser = (newUser: User) => {
    if (!user || !PERMISSIONS[user.role].canEditUsers) {
      throw new Error("Not authorized to add users")
    }
    const updatedUsers = [...allUsers, newUser]
    setAllUsers(updatedUsers)
    localStorage.setItem("allUsers", JSON.stringify(updatedUsers))
  }

  const removeUser = (userId: string) => {
    if (!user || !PERMISSIONS[user.role].canDeleteUsers) {
      throw new Error("Not authorized to remove users")
    }
    const updatedUsers = allUsers.filter((u) => u.id !== userId)
    setAllUsers(updatedUsers)
    localStorage.setItem("allUsers", JSON.stringify(updatedUsers))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        switchRole,
        canAccess,
        canEdit,
        canDeleteUsers,
        canManageAllBases,
        getVisibleBases,
        allUsers,
        addUser,
        removeUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
