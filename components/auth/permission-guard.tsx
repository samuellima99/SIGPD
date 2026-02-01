"use client"

import { usePermissions } from "@/contexts/auth-context"
import { type ReactNode } from "react"

interface PermissionGuardProps {
  permission: string
  children: ReactNode
  fallback?: ReactNode
}

export function PermissionGuard({
  permission,
  children,
  fallback = null,
}: PermissionGuardProps) {
  const permissions = usePermissions()
  const hasPermission = permissions[permission as keyof typeof permissions]

  if (!hasPermission) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
