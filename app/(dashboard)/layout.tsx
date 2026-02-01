import React from "react"

import { AppSidebar } from "@/components/layout/app-sidebar"
import { AppTopbar } from "@/components/layout/app-topbar"
import { PrivateRoute } from "@/components/auth/private-route"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PrivateRoute>
      <div className="min-h-screen bg-background">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <AppSidebar />
        </div>

        {/* Main Content */}
        <div className="lg:pl-64">
          <AppTopbar />
          <main className="p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </PrivateRoute>
  )
}
