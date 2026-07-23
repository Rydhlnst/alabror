import { redirect } from "next/navigation"

import { validateAdminCredentials } from "@/lib/auth/admin"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

async function loginAction(formData: FormData) {
  "use server"

  const success = await validateAdminCredentials({
    username: String(formData.get("username") ?? ""),
    password: String(formData.get("password") ?? ""),
  })

  if (success) {
    redirect("/admin")
  }

  redirect("/admin/login?error=1")
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams
  const hasError = params.error === "1"

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/20 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>Use the single admin credential from your environment variables.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginAction} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" autoComplete="username" required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" autoComplete="current-password" required />
            </div>
            {hasError ? <p className="text-sm text-destructive">Invalid admin credentials.</p> : null}
            <Button type="submit">Sign In</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
