import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { LeftPanel } from "@/components/dashboard/LeftPanel";
import { RightPanel } from "@/components/dashboard/RightPanel";

export function DashboardPage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0B0F2A] to-[#12163A] font-inter overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <div className="px-6 pt-4 pb-2">
          <TopBar />
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 flex gap-5 px-6 pb-6 overflow-hidden">
          <LeftPanel />
          <RightPanel />
        </div>
      </div>
    </div>
  );
}
