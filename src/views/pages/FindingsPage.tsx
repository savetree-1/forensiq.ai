import { useState, useMemo } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import {
  AlertTriangle, XCircle, ChevronRight,
  BarChart2, Calendar, Search, CheckCircle2,
  ChevronRight as NextIcon, History,
  ShieldCheck
} from "lucide-react";

const findings = [
  { id: 1, severity: "critical", title: "Font Substitution on Signature Block", page: "Page 3", block: "Block 7", category: "Typography", timestamp: "09:15 AM", description: "The font used for the issuing officer's name is Arial substituted over Helvetica Neue. This is a known digital manipulation technique used to alter names or figures.", recommendation: "Cross-reference with original embed metadata.", riskScore: 94 },
  { id: 2, severity: "high", title: "Metadata Timestamp Mismatch", page: "Page 1", block: "Header", category: "Metadata", timestamp: "09:15 AM", description: "Document reports 2013 creation but XMP metadata shows modification in 2023 — a 10-year discrepancy.", recommendation: "Check file system audit logs.", riskScore: 82 },
  { id: 3, severity: "high", title: "External Wire Credit Entry", page: "Page 2", block: "Block 12", category: "Financial", timestamp: "09:16 AM", description: "A wire credit of $24,000 appears in a block with a different background layer, suggesting it was overlayed.", recommendation: "Request bank originals.", riskScore: 89 },
  { id: 4, severity: "medium", title: "Notary Stamp Alias Inconsistency", page: "Page 4", block: "Block 1", category: "Image", timestamp: "09:16 AM", description: "The notary stamp exhibits inconsistent anti-aliasing at 400% zoom.", recommendation: "Contact notary office.", riskScore: 65 },
  { id: 5, severity: "low", title: "Trailing Whitespace in Address", page: "Page 1", block: "Block 3", category: "Metadata", timestamp: "09:17 AM", description: "Minor trailing whitespace characters detected in the metadata.", recommendation: "Low priority audit note.", riskScore: 24 },
];

const severityConfig = {
  critical: { color: "text-[#FA114F]", dot: "bg-[#FA114F]", label: "Critical", icon: XCircle, ring: "#FA114F" },
  high: { color: "text-orange-500", dot: "bg-orange-500", label: "High", icon: AlertTriangle, ring: "#FF9500" },
  medium: { color: "text-amber-500", dot: "bg-amber-500", label: "Medium", icon: AlertTriangle, ring: "#FFCC00" },
  low: { color: "text-[#007AFF]", dot: "bg-[#007AFF]", label: "Low", icon: ShieldCheck, ring: "#007AFF" },
};

export function FindingsPage() {
  const [selected, setSelected] = useState(findings[0]);
  const [search, setSearch] = useState("");

  const filteredFindings = useMemo(() => {
    return findings.filter(f => 
      f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.category.toLowerCase().includes(search.toLowerCase()) ||
      f.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="flex h-screen bg-[#0b0f24] font-inter overflow-hidden text-white/90">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto relative">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 p-8 w-full max-w-[1500px] mx-auto">
          {/* ─── NAVIGATION BAR (STANDARD) ─────────────────────── */}
          <div className="flex items-center justify-between h-8 mt-1 mb-8">
            <div className="flex items-center gap-1.5 [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]">
              <span className="text-[13px] text-gray-500 font-medium hover:text-white cursor-pointer transition-colors">Overview</span>
              <ChevronRight size={13} className="text-gray-700" />
              <span className="text-[13px] text-white font-bold tracking-tight">Findings Analysis Lab</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                <input 
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search findings..."
                  className="pl-8 pr-4 py-2 bg-white/5 border border-white/5 rounded-xl text-[11px] text-white font-bold focus:outline-none w-64 transition-all"
                />
              </div>
            </div>
          </div>

          {/* ─── METRICS CARDS (3 COLUMNS ONLY) ─────────────────── */}
          <section className="grid grid-cols-3 gap-4 pb-10">
            {[
              { id: "all", label: "Findings Identification", value: filteredFindings.length, unit: "alerts", color: "text-[#007AFF]", icon: AlertTriangle, graphic: "pulse-blue", time: "10:05 AM" },
              { id: "critical", label: "Critical Risk Profile", value: filteredFindings.filter(f => f.severity === 'critical').length, unit: "severity", color: "text-[#FA114F]", icon: XCircle, graphic: "bars-red", time: "9:41 AM" },
              { id: "health", label: "Doc Confidence", value: "94.2", unit: "%", color: "text-[#16A34A]", icon: ShieldCheck, graphic: "ring-green", time: "Today" },
            ].map((stat) => (
              <button
                key={stat.id}
                className="relative text-left bg-white p-4 rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif] hover:scale-[1.02] transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                   <div className="flex items-center gap-1.5">
                      <stat.icon size={16} className={stat.color} strokeWidth={2.5} />
                      <span className={`text-[15px] font-bold tracking-tight ${stat.color}`}>{stat.label}</span>
                   </div>
                   <div className="flex items-center gap-1">
                      <span className="text-xs font-medium text-[#8E8E93]">{stat.time}</span>
                      <NextIcon size={14} className="text-[#C7C7CC]" strokeWidth={2.5} />
                   </div>
                </div>
                <div className="flex items-end justify-between">
                   <div className="flex items-baseline gap-1.5">
                      <h3 className="text-[34px] font-bold tracking-tight text-black leading-none">{stat.value}</h3>
                      <span className="text-[15px] font-medium text-[#8E8E93]">{stat.unit}</span>
                   </div>

                   {/* Graphics */}
                   <div className="flex items-center justify-center p-1">
                      {stat.graphic === "ring-green" && (
                        <div className="relative w-12 h-12">
                          <svg className="w-full h-full -rotate-90">
                            <circle cx="24" cy="24" r="18" fill="none" stroke="#E2FBE9" strokeWidth="6" />
                            <circle cx="24" cy="24" r="18" fill="none" stroke="#34C759" strokeWidth="6" strokeDasharray={113} strokeDashoffset={20} strokeLinecap="round" />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <CheckCircle2 size={12} className="text-[#34C759]" strokeWidth={3} />
                          </div>
                        </div>
                      )}
                      
                      {stat.graphic === "bars-red" && (
                        <div className="flex items-end gap-1 h-8 px-1">
                          {[0.4, 0.7, 0.5, 0.9, 0.6].map((h, i) => (
                            <div key={i} className="w-1.5 bg-[#FA114F] rounded-t-full" style={{ height: `${h * 100}%` }} />
                          ))}
                        </div>
                      )}

                      {stat.graphic === "pulse-blue" && (
                        <div className="w-10 h-10 rounded-full bg-[#007AFF]/10 flex items-center justify-center relative">
                          <div className="absolute inset-0 rounded-full bg-[#007AFF]/20 animate-ping opacity-75" />
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#007AFF] to-[#58A9FF] shadow-lg shadow-blue-500/30" />
                        </div>
                      )}
                   </div>
                </div>
              </button>
            ))}
          </section>

          <div className="grid grid-cols-12 gap-8 items-start">
            
            {/* Left Workspace: Findings List (WHITE LIST) ─────────── */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
              {filteredFindings.map(finding => {
                const sc = severityConfig[finding.severity as keyof typeof severityConfig];
                const Icon = sc.icon;
                return (
                  <button
                    key={finding.id}
                    onClick={() => setSelected(finding)}
                    className={`text-left p-6 rounded-[24px] transition-all duration-300 ${
                      selected.id === finding.id
                        ? "bg-white shadow-xl scale-[1.02] ring-1 ring-black/5"
                        : "bg-white/5 border border-white/5 hover:bg-white/10 text-gray-500"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                        selected.id === finding.id ? "bg-gray-50 " + sc.color : "bg-white/5 text-gray-500"
                      }`}>
                        <Icon size={18} strokeWidth={2.5} />
                      </div>
                      <div className="min-w-0">
                        <p className={`text-[14px] font-bold leading-tight [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif] ${selected.id === finding.id ? "text-gray-900" : "text-white/60"}`}>
                          {finding.title}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className={`text-[11px] font-black uppercase tracking-widest ${sc.color}`}>{sc.label}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-500" />
                          <span className="text-[12px] font-bold text-gray-500">{finding.category}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Findings DETAIL Card (WHITE SENTINEL STYLE) ──────────────── */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
              {filteredFindings.length > 0 ? (() => {
                const displayFinding = filteredFindings.find(f => f.id === selected.id) || filteredFindings[0];
                const sc = severityConfig[displayFinding.severity as keyof typeof severityConfig];
                const Icon = sc.icon;
                return (
                  <div className="bg-white rounded-[24px] shadow-2xl border border-gray-50 overflow-hidden flex flex-col [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]">
                    <div className="px-8 py-8 border-b border-gray-50 flex items-start justify-between">
                       <h2 className="text-[15px] font-bold text-gray-900 tracking-tight">Tampered Identification</h2>
                       <ShieldCheck size={18} className={sc.color} />
                    </div>

                    <div className="p-8 space-y-8">
                       <div className="flex items-start gap-6">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-sm ${sc.color} bg-gray-50 border-gray-100`}>
                             <Icon size={28} strokeWidth={2.5} />
                          </div>
                          <div className="pt-1">
                             <h2 className="text-gray-900 font-bold text-[18px] tracking-tight leading-tight mb-2 uppercase">
                                {displayFinding.title}
                             </h2>
                             <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                <span className="flex items-center gap-2"><BarChart2 size={14} /> {displayFinding.category}</span>
                                <span className="flex items-center gap-2"><Calendar size={14} /> {displayFinding.timestamp}</span>
                             </div>
                          </div>
                       </div>

                      {/* Integrated Rings Section */}
                      <div className="flex items-center gap-8 p-6 bg-gray-50 rounded-[28px] border border-gray-100">
                         <div className="relative w-28 h-28 shrink-0">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 112 112">
                               <circle cx="56" cy="56" r="48" fill="none" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
                               <circle cx="56" cy="56" r="48" fill="none" stroke="#007AFF" strokeWidth="10" strokeDasharray={301} strokeDashoffset={301 * 0.1} strokeLinecap="round" />
                               <circle cx="56" cy="56" r="36" fill="none" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
                               <circle cx="56" cy="56" r="36" fill="none" stroke={sc.ring} strokeWidth="10" strokeDasharray={226} strokeDashoffset={226 * (1 - displayFinding.riskScore/100)} strokeLinecap="round" />
                            </svg>
                         </div>
                         <div className="flex-1 space-y-2">
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Case Authenticator</h3>
                            <p className="text-gray-700 text-[15px] font-bold leading-relaxed">Structural confidence is currently <span className="text-gray-900 font-bold">"{displayFinding.riskScore}%"</span> based on font-substitution nodes.</p>
                            <div className="flex gap-4 pt-4">
                               <button className={`flex-1 py-3.5 rounded-xl text-[12px] font-black uppercase tracking-widest transition-all ${sc.color} bg-white shadow-sm border border-gray-100`}>Escalate</button>
                               <button className="flex-1 py-3.5 rounded-xl text-[12px] font-black uppercase tracking-widest text-gray-400 bg-white border border-gray-100">Ignore</button>
                            </div>
                         </div>
                      </div>

                      <p className="text-gray-700 text-[15px] font-bold leading-relaxed border-t border-gray-50 pt-8">{displayFinding.description}</p>
                    </div>
                  </div>
                );
              })() : null}

               {/* FORENSIC PROTOCOL (PROPER STRUDCTURE) ───────── */}
               <div className="bg-[#121836] rounded-[24px] p-6 border border-white/10 shadow-2xl [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]">
                  <header className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-2">
                        <History size={16} className="text-[#007AFF]" strokeWidth={2.5} />
                        <h2 className="text-[15px] font-bold text-white tracking-tight">Forensic Protocol</h2>
                     </div>
                  </header>
                  <p className="text-[#8E8E93] text-[13px] font-medium leading-relaxed">
                     XREF mutations indicate invisible content layers. Check Audit Trail.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
