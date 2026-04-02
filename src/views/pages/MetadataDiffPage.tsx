import { useState, useMemo } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { 
  ChevronRight, FileSearch, CheckCircle2,
  Search, ChevronRight as NextIcon,
  AlertTriangle, ShieldCheck, History
} from "lucide-react";

const metadataPairs = [
  { 
    id: 1, 
    property: "Signature of issuing authority", 
    location: "Page 3, Block 7", 
    internalMetadata: "H. Johnson (Issuing Officer)", 
    surfaceValue: "Annotation overlay detected", 
    detectionLog: "Inconsistent font mapping vs. object stream",
    status: "Tampered", 
    confidence: 99 
  },
  { 
    id: 2, 
    property: "Google Invoices from Marketing", 
    location: "Page 1, Block 2", 
    internalMetadata: "InvoiceID: G-9283-X", 
    surfaceValue: "Matched", 
    detectionLog: "Structural integrity verified",
    status: "Valid", 
    confidence: 100 
  },
  { 
    id: 3, 
    property: "Hubspot CRM Export Docs", 
    location: "Page 2, Block 4", 
    internalMetadata: "UserID: admin_hubspot", 
    surfaceValue: "Matched", 
    detectionLog: "XMP metadata aligns with object data",
    status: "Valid", 
    confidence: 98 
  },
  { 
    id: 4, 
    property: "Hubspot Quarterly Summary", 
    location: "Page 4, Block 1", 
    internalMetadata: "ExportTS: 2023-10-12", 
    surfaceValue: "Matched", 
    detectionLog: "No mutation in stream trail",
    status: "Valid", 
    confidence: 92 
  },
  { 
    id: 5, 
    property: "Account holder verification", 
    location: "Page 1, Block 9", 
    internalMetadata: "Entity: John Doe", 
    surfaceValue: "Annotation stamp detected", 
    detectionLog: "Pixel Hash variance in stamp layer",
    status: "Tampered", 
    confidence: 100 
  },
  { 
    id: 6, 
    property: "Embedded JS Environment", 
    location: "Header, Block 2", 
    internalMetadata: "/XFA-Form JavaScript", 
    surfaceValue: "Scripting Block Mutated", 
    detectionLog: "Unauthorized field write operation",
    status: "Tampered", 
    confidence: 97 
  },
  { 
    id: 7, 
    property: "Modification History", 
    location: "System, Block 1", 
    internalMetadata: "/ModifyDate: 2013-10-24", 
    surfaceValue: "Matched", 
    detectionLog: "Metadata aligns with OS creation date",
    status: "Valid", 
    confidence: 88 
  },
  { 
    id: 8, 
    property: "XMP:Creator Property", 
    location: "Header, Block 1", 
    internalMetadata: "Creator: Adobe Acrobat 9.0", 
    surfaceValue: "String Mutation: Canva v2.4", 
    detectionLog: "Tool signature discrepancy (Creator v/s Producer)",
    status: "Tampered", 
    confidence: 100 
  },
  { 
    id: 9, 
    property: "Total Due Label", 
    location: "Page 1, Block 12", 
    internalMetadata: "Value: $2,400.00", 
    surfaceValue: "Rendered: $24,000.00", 
    detectionLog: "Direct stream number mutation in object stream 412",
    status: "Tampered", 
    confidence: 94 
  },
];

export function MetadataDiffPage() {
  const [selected, setSelected] = useState(metadataPairs[0]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const filteredItems = useMemo(() => {
    return metadataPairs.filter(p => 
      p.property.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.detectionLog.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleNext = () => setPage(p => Math.min(p + 1, totalPages));
  const handlePrev = () => setPage(p => Math.max(p - 1, 1));

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
              <span className="text-[13px] text-white font-bold tracking-tight">Forensic Audit Station</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-[13px] font-bold text-gray-300">
                  <FileSearch size={14} className="text-[#007AFF]" />
                  statement_citi.pdf
              </div>
            </div>
          </div>

          {/* ─── METRICS CARDS (3 COLUMNS ONLY) ─────────────────── */}
          <section className="grid grid-cols-3 gap-4 pb-8">
            {[
              { id: "all", label: "Metadata Extraction", value: filteredItems.length, unit: "nodes", color: "text-[#007AFF]", icon: Search, graphic: "pulse-blue", time: "10:05 AM" },
              { id: "tampered", label: "Tampered Nodes", value: filteredItems.filter(f => f.status === 'Tampered').length, unit: "alerts", color: "text-[#FA114F]", icon: AlertTriangle, graphic: "bars-red", time: "9:41 AM" },
              { id: "verified", label: "Audit Confidence", value: "98", unit: "%", color: "text-[#16A34A]", icon: ShieldCheck, graphic: "ring-green", time: "Today" },
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

          {/* ─── MAIN FORENSIC WORKSTATION ──────────────────────────── */}
          <div className="grid grid-cols-12 gap-8 items-start">
            
            {/* Metadata Table Card (Standard White) ───────────────── */}
            <div className="col-span-8 bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 flex flex-col min-h-[600px]">
              <div className="px-6 py-5 flex items-center justify-between border-b border-gray-50">
                <h2 className="text-[15px] font-bold text-gray-900 [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif] tracking-tight">
                  Metadata Audit Trail
                </h2>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-300" size={12} />
                  <input 
                    type="text" 
                    value={search}
                    onChange={(e) => {setSearch(e.target.value); setPage(1);}}
                    placeholder="Search metadata..." 
                    className="pl-8 pr-4 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-[11px] text-gray-600 font-bold focus:outline-none w-48"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-x-auto custom-scrollbar">
                <table className="w-full text-left min-w-[1100px] table-fixed">
                  <thead>
                    <tr className="border-b border-gray-100/50 bg-gray-50/30">
                      <th className="px-6 py-3.5 text-[10px] font-black text-gray-400 uppercase tracking-widest w-[22%]">Property</th>
                      <th className="px-6 py-3.5 text-[10px] font-black text-gray-400 uppercase tracking-widest w-[12%]">Location</th>
                      <th className="px-6 py-3.5 text-[10px] font-black text-gray-400 uppercase tracking-widest w-[20%]">Internal Data</th>
                      <th className="px-6 py-3.5 text-[10px] font-black text-gray-400 uppercase tracking-widest w-[20%]">Surface Render</th>
                      <th className="px-6 py-3.5 text-[10px] font-black text-gray-400 uppercase tracking-widest w-[26%]">Extraction Log</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedItems.map((pair) => (
                      <tr 
                        key={pair.id}
                        onClick={() => setSelected(pair)}
                        className={`group cursor-pointer border-b border-gray-50/50 transition-all ${
                          selected.id === pair.id ? 'bg-[#007AFF]/5' : 'hover:bg-gray-50/20'
                        }`}
                      >
                        <td className="px-6 py-5">
                          <p className={`text-[13px] font-bold ${selected.id === pair.id ? 'text-[#007AFF]' : 'text-gray-900'}`}>{pair.property}</p>
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">{pair.location}</span>
                        </td>
                        <td className="px-6 py-5">
                          <code className="text-[11px] font-black text-blue-500 bg-blue-50 px-2 py-1 rounded border border-blue-100">{pair.internalMetadata}</code>
                        </td>
                        <td className="px-6 py-5">
                          <p className={`text-[13px] font-medium leading-tight italic ${pair.status === 'Tampered' ? 'text-[#FA114F]/60' : 'text-emerald-500/60'}`}>"{pair.surfaceValue}"</p>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-[11px] font-bold text-gray-500 leading-snug">{pair.detectionLog}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                 <div className="flex items-center gap-6">
                    <span className="text-[#FA114F]">{metadataPairs.filter(m => m.status === 'Tampered').length} TAMPERED NODES IDENTIFIED</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <button onClick={handlePrev} className="hover:text-gray-900 disabled:opacity-30 font-black" disabled={page === 1}>PREV</button>
                    <span className="text-gray-900">{page} / {totalPages}</span>
                    <button onClick={handleNext} className="hover:text-gray-900 disabled:opacity-30 font-black" disabled={page >= totalPages}>NEXT</button>
                 </div>
              </div>
            </div>

            {/* Right Workstation Pillar ────────────────────────── */}
            <div className="col-span-4 space-y-6">
               {/* Proper Header Standard: Tampered Identification ───── */}
               <div className="bg-white rounded-[24px] p-6 shadow-2xl border border-gray-100 [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]">
                  <header className="flex items-center justify-between mb-6">
                     <h2 className="text-[15px] font-bold text-gray-900 tracking-tight">Tampered Identification</h2>
                     <ShieldCheck size={16} className={selected.status === 'Tampered' ? 'text-[#FA114F]' : 'text-[#16A34A]'} />
                  </header>

                  <div className="flex items-center gap-6 mb-8 p-5 bg-gray-50 rounded-[20px] border border-gray-100">
                     <div className="relative w-[88px] h-[88px] shrink-0">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 88 88">
                           <circle cx="44" cy="44" r="38" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
                           <circle cx="44" cy="44" r="38" fill="none" stroke="#007AFF" strokeWidth="6" strokeDasharray={239} strokeDashoffset={239 * (1 - selected.confidence/100)} strokeLinecap="round" />
                           <circle cx="44" cy="44" r="30" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
                           <circle cx="44" cy="44" r="30" stroke={selected.status === 'Tampered' ? '#FA114F' : '#34C759'} strokeWidth="6" strokeDasharray={188} strokeDashoffset={188 * 0.4} strokeLinecap="round" />
                        </svg>
                     </div>
                     <div className="flex-1 space-y-1">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Diagnostic Hub</span>
                        <h3 className="text-2xl font-bold text-gray-900 leading-none">{selected.confidence}%</h3>
                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{selected.status === 'Tampered' ? 'Critical Delta' : 'Authentic Alignment'}</p>
                     </div>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 leading-tight mb-2 uppercase">{selected.property}</h3>
                  <p className="text-[13px] text-gray-500 font-bold leading-relaxed mb-8">
                     Analysis of object stream <span className="text-gray-900">"{selected.location}"</span> identifies high-entropy substitution. Confidence at {selected.confidence}%.
                  </p>

                  <button className={`w-full py-4 rounded-xl text-[13px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all ${
                     selected.status === 'Tampered' ? 'bg-[#FA114F] text-white shadow-[#FA114F]/20' : 'bg-[#007AFF] text-white shadow-[#007AFF]/20'
                  }`}>
                     Escalate Finding
                  </button>
               </div>

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
