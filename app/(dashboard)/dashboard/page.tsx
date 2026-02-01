"use client"

import { useAuth } from "@/contexts/auth-context"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { AttendanceChart } from "@/components/dashboard/attendance-chart"
import { RecentRecords } from "@/components/dashboard/recent-records"
import { PendingApprovals } from "@/components/dashboard/pending-approvals"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <DashboardHeader userName={user?.name || "Usuário"} />

      {/* Stats Cards */}
      <DashboardStats />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Attendance Chart - Larger */}
        <div className="lg:col-span-2">
          <AttendanceChart />
        </div>

        {/* Pending Approvals */}
        <div>
          <PendingApprovals />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Records */}
        <div className="lg:col-span-2">
          <RecentRecords />
        </div>

        {/* Quick Actions */}
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  )
}
