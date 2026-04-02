import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import {
  Upload, Bot, FileSearch, AlertTriangle, CheckCircle, History,
  ChevronRight, Filter, Download, User, Circle
} from "lucide-react";

const events = [
  { id: 1, icon: Upload, label: "Document uploaded", detail: "Account_statement_lending_citi.pdf (2.4 MB)", time: "09:14:03 AM", user: "John Doe", role: "Investigator", color: "text-blue-500", bg: "bg-blue-100", border: "border-blue-200" },
  { id: 2, icon: Bot, label: "AI analysis initiated", detail: "ML Engine v4.2 queued for processing", time: "09:14:05 AM", user: "System", role: "Automated", color: "text-purple-500", bg: "bg-purple-100", border: "border-purple-200" },
  { id: 3, icon: FileSearch, label: "Metadata extraction complete", detail: "18 metadata fields extracted, 2 anomalies flagged", time: "09:14:47 AM", user: "ML Engine v4.2", role: "System", color: "text-gray-500", bg: "bg-gray-100", border: "border-gray-200" },
  { id: 4, icon: AlertTriangle, label: "Font mismatch detected", detail: "Signature block (Page 3, Block 7) — Arial over Helvetica Neue", time: "09:15:12 AM", user: "ML Engine v4.2", role: "System", color: "text-red-500", bg: "bg-red-100", border: "border-red-200" },
  { id: 5, icon: AlertTriangle, label: "Timestamp anomaly flagged", detail: "Creation vs XMP modification date mismatch (10 years)", time: "09:15:18 AM", user: "ML Engine v4.2", role: "System", color: "text-orange-500", bg: "bg-orange-100", border: "border-orange-200" },
  { id: 6, icon: AlertTriangle, label: "External wire entry detected", detail: "+$24,000.00 overlay insertion (Page 2, Block 12)", time: "09:15:31 AM", user: "ML Engine v4.2", role: "System", color: "text-red-500", bg: "bg-red-100", border: "border-red-200" },
  { id: 7, icon: CheckCircle, label: "Risk score finalised", detail: "Composite risk score: 88/100 — HIGH RISK", time: "09:16:02 AM", user: "System", role: "Automated", color: "text-green-600", bg: "bg-green-100", border: "border-green-200" },
  { id: 8, icon: User, label: "Case assigned", detail: "Assigned to John Doe for manual review", time: "09:16:10 AM", user: "Admin", role: "Administrator", color: "text-blue-400", bg: "bg-blue-50", border: "border-blue-100" },
  { id: 9, icon: History, label: "Case notes added", detail: "\"Pending secondary verification from Citibank compliance team.\"", time: "09:18:44 AM", user: "John Doe", role: "Investigator", color: "text-indigo-500", bg: "bg-indigo-100", border: "border-indigo-200" },
];

export function AuditTrailPage() {
  const [filter, setFilter] = useState<"all"|"system"|"user">("all");

  const displayed = events.filter(e => {
    if (filter === "system") return e.role === "System" || e.role === "Automated";
    if (filter === "user") return e.role === "Investigator" || e.role === "Administrator";
    return true;
  });

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0B0F2A] to-[#12163A] font-inter overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="px-8 pt-6 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="text-white font-semibold">Audit Trail</span>
            <ChevronRight size={14} className="text-gray-600" />
            <span className="text-gray-400">Account_statement_lending_citi.pdf</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-1 text-xs">
              {(["all","system","user"] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-md font-semibold capitalize transition-all ${filter === f ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
                >
                  {f}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-sm px-3 py-2 rounded-lg transition-all">
              <Filter size={14} />
            </button>
            <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all active:scale-95 shadow-lg shadow-blue-500/20">
              <Download size={14} />
              Export Log
            </button>
          </div>
        </div>

        <div className="flex-1 px-8 pb-8 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Summary row */}
            <div className="flex items-center gap-6 px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="text-sm text-gray-600"><span className="font-bold text-gray-900">{events.length}</span> total events</div>
              <div className="text-sm text-gray-600"><span className="font-bold text-red-500">3</span> anomaly flags</div>
              <div className="text-sm text-gray-600"><span className="font-bold text-gray-900">2</span> actors</div>
              <div className="text-sm text-gray-400 ml-auto">Session: Oct 24, 2023 · 09:14 AM → 09:18 AM</div>
            </div>

            {/* Timeline */}
            <div className="relative px-8 py-6">
              <div className="absolute left-[52px] top-6 bottom-6 w-px bg-gray-100" />
              <div className="space-y-6">
                {displayed.map((event, i) => {
                  const Icon = event.icon;
                  return (
                    <div key={event.id} className="flex items-start gap-5 relative group">
                      {/* Icon */}
                      <div className={`w-9 h-9 rounded-full ${event.bg} border ${event.border} flex items-center justify-center shrink-0 z-10 shadow-sm`}>
                        <Icon size={15} className={event.color} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 bg-gray-50/60 group-hover:bg-gray-50 border border-gray-100 group-hover:border-gray-200 rounded-xl px-5 py-4 transition-all">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-gray-900 font-semibold text-sm">{event.label}</p>
                            <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{event.detail}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-gray-400 text-xs font-mono">{event.time}</p>
                            <div className="flex items-center gap-1 justify-end mt-1">
                              <Circle size={6} className="text-gray-300 fill-gray-300" />
                              <p className="text-gray-500 text-xs">{event.user}</p>
                              <span className="text-gray-300">·</span>
                              <p className="text-gray-400 text-xs">{event.role}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
