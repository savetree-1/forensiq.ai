import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  PenTool,
  Table2,
  TrendingUp,
  AlertTriangle,
  StickyNote,
  History,
  FileDown,
} from "lucide-react";
const brandLogo = "/src/assets/branding/image copy 2.png";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
  { icon: Upload, label: "Upload Queue", path: "/dashboard/upload-queue" },
  { icon: PenTool, label: "Signature Lab", path: "/dashboard/signature-lab" },
  { icon: Table2, label: "Metadata Diff", path: "/dashboard/metadata-diff" },
  { icon: TrendingUp, label: "Risk Timeline", path: "/dashboard/risk-timeline" },
  { icon: AlertTriangle, label: "Findings", path: "/dashboard/findings" },
  { icon: StickyNote, label: "Case Notes", path: "/dashboard/case-notes" },
  { icon: History, label: "Audit Trail", path: "/dashboard/audit-trail" },
  { icon: FileDown, label: "Export Report", path: "/dashboard/export-report" },
];

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-[280px] min-h-screen bg-[#080C24] flex flex-col py-6 border-r border-white/5 shrink-0">
      {/* Logo */}
      <div className="mb-8 px-5 flex items-center">
        <img src={brandLogo} alt="ForensIQ.ai Logo" className="h-16 w-full object-contain object-left" />
      </div>

      {/* Nav Items */}
      <nav className="flex-1 flex flex-col gap-1 w-full px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`
                relative w-full h-11 px-3 rounded-lg flex items-center justify-start gap-3 transition-all duration-200 text-sm [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]
                ${isActive
                  ? "text-[#2563EB] font-bold"
                  : "text-gray-400 font-medium hover:text-gray-200 hover:bg-white/5"
                }
              `}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className="text-[15px]">{item.label}</span>
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#2563EB] rounded-r-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom avatar */}
      <div className="mt-auto pt-4 px-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-white text-xs font-semibold ring-2 ring-white/10 shrink-0">
            JD
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm text-gray-200 font-medium">John Doe</span>
            <span className="text-xs text-gray-500">Investigator</span>
          </div>
        </div>
      </div>
    </div>
  );
}
