import { Clock, CheckCircle, AlertTriangle, FileSearch, Upload, Bot } from "lucide-react";

const events = [
  {
    icon: Upload,
    label: "Document uploaded",
    time: "Oct 24, 2023 — 09:14 AM",
    user: "John Doe",
    color: "text-blue-500",
    bg: "bg-blue-100",
  },
  {
    icon: Bot,
    label: "AI analysis initiated",
    time: "Oct 24, 2023 — 09:14 AM",
    user: "System",
    color: "text-purple-500",
    bg: "bg-purple-100",
  },
  {
    icon: FileSearch,
    label: "Metadata extraction complete",
    time: "Oct 24, 2023 — 09:15 AM",
    user: "ML Engine v4.2",
    color: "text-gray-500",
    bg: "bg-gray-100",
  },
  {
    icon: AlertTriangle,
    label: "Font mismatch detected on Page 3",
    time: "Oct 24, 2023 — 09:15 AM",
    user: "ML Engine v4.2",
    color: "text-red-500",
    bg: "bg-red-100",
  },
  {
    icon: CheckCircle,
    label: "Risk assessment finalized — HIGH",
    time: "Oct 24, 2023 — 09:16 AM",
    user: "System",
    color: "text-green-600",
    bg: "bg-green-100",
  },
];

export function AuditTrail() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-gray-500" />
          <h3 className="text-gray-900 font-semibold text-sm">Audit Trail</h3>
        </div>
        <span className="text-gray-400 text-xs">{events.length} events</span>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[13px] top-2 bottom-2 w-px bg-gray-200" />

        <div className="space-y-4">
          {events.map((event, index) => {
            const Icon = event.icon;
            return (
              <div key={index} className="flex items-start gap-3 relative">
                <div className={`w-7 h-7 rounded-full ${event.bg} flex items-center justify-center flex-shrink-0 z-10`}>
                  <Icon size={13} className={event.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 text-[13px] font-medium">{event.label}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-gray-400 text-[11px]">{event.time}</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-gray-500 text-[11px]">{event.user}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
