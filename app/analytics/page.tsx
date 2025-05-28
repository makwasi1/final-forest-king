"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DateRangePicker } from "@/components/date-range-picker"
import { OverviewTab } from "@/components/analytics/overview-tab"
import { AnalyticsTab } from "@/components/analytics/analytics-tab"
import { ReportsTab } from "@/components/analytics/reports-tab"
import { NotificationsTab } from "@/components/analytics/notifications-tab"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function AnalyticsPage() {
  const handleExportData = () => {
    // Implement export functionality here
    console.log("Exporting data...");
  };

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-6 md:p-8 pt-4 sm:pt-6 md:pt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Forest King</h2>
        {/* <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:space-x-2">
          <DateRangePicker />
          <Button
            onClick={handleExportData}
            className="flex items-center gap-2 bg-forest-600 hover:bg-forest-700 w-full sm:w-auto"
          >
            <Download className="h-4 w-4" />
            <span className="hidden xs:inline">Export Forest Data</span>
          </Button>
        </div> */}
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        {/* <TabsList className="grid grid-cols-1 sm:grid-cols-3 w-full">
          <TabsTrigger value="overview">Forest Overview</TabsTrigger>
          <TabsTrigger value="reports">Forest Reports</TabsTrigger>
        </TabsList> */}
        <TabsContent value="overview" className="space-y-4">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsTab />
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <ReportsTab />
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <NotificationsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
