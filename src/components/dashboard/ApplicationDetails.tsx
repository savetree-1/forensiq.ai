import { User, Calendar, Hash, BarChart3 } from "lucide-react";

export function ApplicationDetails() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <h3 className="text-gray-900 font-semibold text-sm mb-4">Application Details</h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <User size={13} />
            <span>Applicant</span>
          </div>
          <span className="text-gray-900 text-sm font-medium">Johnathan Doe</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <Calendar size={13} />
            <span>Submitted</span>
          </div>
          <span className="text-gray-900 text-sm">Oct 24, 2023</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <Hash size={13} />
            <span>Entity ID</span>
          </div>
          <span className="text-gray-900 text-sm font-mono">#VX-99201</span>
        </div>

        {/* Risk Score */}
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <BarChart3 size={13} />
              <span>Risk Score</span>
            </div>
            <span className="text-red-600 text-sm font-bold">88 / 100</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 transition-all duration-700"
              style={{ width: "88%" }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            <span>Low</span>
            <span>Critical</span>
          </div>
        </div>
      </div>
    </div>
  );
}
