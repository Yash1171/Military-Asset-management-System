"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Shield, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await login(email, password)
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setLoading(false)
    }
  }

  const fillCredentials = (cred: { email: string; password: string }) => {
    setEmail(cred.email)
    setPassword(cred.password)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-slate-900 flex flex-col items-center justify-center p-4">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-8">
        {/* Logo and Title */}
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-primary">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-center">Military Asset Management System</h1>
          <p className="text-sm text-muted-foreground text-center">Track and manage military assets efficiently</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl flex items-center gap-2">
              <LogIn className="w-5 h-5" />
              Login
            </CardTitle>
            <CardDescription>Enter your credentials to access the system</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded text-sm text-red-600 dark:text-red-200">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-center">Demo Credentials</p>
          <div className="grid gap-2">
            <DemoCredentialButton role="Admin" email="admin@mams.com" password="admin123" onFill={fillCredentials} />
            <DemoCredentialButton
              role="Base Commander"
              email="commander@mams.com"
              password="commander123"
              onFill={fillCredentials}
            />
            <DemoCredentialButton
              role="Logistics Officer"
              email="logistics@mams.com"
              password="logistics123"
              onFill={fillCredentials}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function DemoCredentialButton({
  role,
  email,
  password,
  onFill,
}: {
  role: string
  email: string
  password: string
  onFill: (cred: { email: string; password: string }) => void
}) {
  return (
    <Button
      type="button"
      variant="outline"
      className="justify-start text-left h-auto py-3 px-4 bg-transparent"
      onClick={() => onFill({ email, password })}
    >
      <div className="flex flex-col gap-1 text-left">
        <span className="font-semibold text-sm">{role}</span>
        <span className="text-xs text-muted-foreground">{email}</span>
      </div>
    </Button>
  )
}
