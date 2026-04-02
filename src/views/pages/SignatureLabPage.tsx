import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import {
  PenTool, Upload, ZoomIn, ZoomOut, RotateCcw, CheckCircle2, XCircle,
  AlertTriangle, ChevronRight, Download, RefreshCw, Activity, ShieldCheck, Fingerprint
} from "lucide-react";

const signatures = [
  { id: 1, name: "Issuing Officer Signature", page: "Page 3", block: "Block 7", status: "forged", confidence: 97.2, details: "Font mismatch detected. Original typeface: Helvetica Neue. Detected: Arial (substituted). Pixel density anomaly at baseline." },
  { id: 2, name: "Account Holder Signature", page: "Page 1", block: "Block 2", status: "valid", confidence: 98.4, details: "Signature matches reference database with 98.4% confidence. No manipulation detected." },
  { id: 3, name: "Notary Stamp", page: "Page 4", block: "Block 1", status: "forged", confidence: 89.1, details: "Digital overlay detected. Stamp edges show inconsistent anti-aliasing, suggesting composite insertion." },
  { id: 4, name: "Bank Manager Countersign", page: "Page 2", block: "Block 5", status: "valid", confidence: 94.7, details: "Countersign verified against bank's registered seal database." },
];

export function SignatureLabPage() {
  const [selected, setSelected] = useState(signatures[0]);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  return (
    <div className="flex h-screen bg-[#0b0f24] font-inter overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto relative">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-br from-[#1c234a]/40 to-transparent pointer-events-none" />

        <div className="p-8 max-w-[1600px] mx-auto w-full space-y-6 relative z-10 font-inter">
          
          {/* ─── NAVIGATION BAR ────────────────────────────────────── */}
          <div className="flex items-center justify-between h-8 mt-2">
            <div className="flex items-center gap-2 text-[15px] [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]">
              <span className="text-gray-400 hover:text-white cursor-pointer transition-colors font-bold">Overview</span>
              <ChevronRight size={14} className="text-gray-500" />
              <span className="text-white font-bold">Signature Lab</span>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-transparent border border-white/20 hover:bg-white/5 active:scale-95 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all">
                <Upload size={16} />
                Load reference
              </button>
              <button className="flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-95 text-white text-sm font-bold px-4 py-2 rounded-lg transition-all shadow-lg shadow-blue-500/20">
                <RefreshCw size={16} />
                Re-analyse
              </button>
            </div>
          </div>

          {/* ─── METRICS CARDS (APPLE HEALTH STYLE) ───────────────── */}
          <section className="grid grid-cols-4 gap-4 pb-2">
            {[
              { id: "all", label: "Total items", value: "4", unit: "signatures", color: "text-[#2563EB]", icon: PenTool, time: "9:41 AM", graphic: "bars" },
              { id: "forged", label: "Detected forge", value: "2", unit: "flags", color: "text-[#FA114F]", icon: AlertTriangle, time: "Just now", graphic: "pulse" },
              { id: "verified", label: "Verified safe", value: "2", unit: "docs", color: "text-[#16A34A]", icon: ShieldCheck, time: "Yesterday", graphic: "ring" },
              { id: "confidence", label: "Avg confidence", value: "94.8", unit: "%", color: "text-[#FF9500]", icon: Activity, time: "Active", graphic: "graph" },
            ].map((stat) => (
              <button
                key={stat.id}
                className="relative text-left bg-white p-4 rounded-[20px] transition-all duration-300 hover:scale-[1.02] shadow-[0_2px_12px_rgba(0,0,0,0.06)] [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]"
              >
                <div className="flex items-center justify-between mb-3 text-[15px] font-bold tracking-tight">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 flex items-center justify-center shrink-0">
                      <stat.icon size={16} className={stat.color} strokeWidth={2.5} />
                    </div>
                    <span className={`leading-none ${stat.color}`}>{stat.label}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[12px] font-medium text-[#8E8E93] leading-none">{stat.time}</span>
                    <ChevronRight size={14} className="text-[#C7C7CC] shrink-0" strokeWidth={2.5} />
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <h3 className="text-[34px] font-bold tracking-tight text-black leading-none">{stat.value}</h3>
                    <span className="text-[15px] font-medium text-[#8E8E93]">{stat.unit}</span>
                  </div>
                  <div className="flex items-center justify-center p-1">
                    {stat.graphic === "ring" && (
                      <div className="relative w-12 h-12">
                        <svg className="w-full h-full -rotate-90">
                          <circle cx="24" cy="24" r="18" fill="none" stroke="#DCFCE7" strokeWidth="6" />
                          <circle cx="24" cy="24" r="18" fill="none" stroke="#16A34A" strokeWidth="6" strokeDasharray={113} strokeDashoffset={25} strokeLinecap="round" />
                        </svg>
                      </div>
                    )}
                    {stat.graphic === "bars" && (
                      <div className="flex items-end gap-1 h-8 px-1">
                        {[0.4, 0.8, 0.6, 1].map((h, j) => (
                          <div key={j} className="w-1.5 bg-[#007AFF] rounded-t-full" style={{ height: `${h * 100}%` }} />
                        ))}
                      </div>
                    )}
                    {stat.graphic === "graph" && (
                      <div className="w-12 h-8 flex items-center relative overflow-hidden">
                        <svg viewBox="0 0 100 40" className="w-full h-full">
                          <path d="M0 35 Q30 5 70 30 T100 5" fill="none" stroke="#FF9500" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                      </div>
                    )}
                    {stat.graphic === "pulse" && (
                      <div className="w-10 h-10 rounded-full bg-[#FA114F]/10 flex items-center justify-center relative">
                        <div className="absolute inset-0 rounded-full bg-[#FA114F]/20 animate-ping opacity-75" />
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#FA114F] to-[#FF588A] shadow-lg shadow-red-500/30" />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </section>

          {/* ─── MAIN ANALYSIS CONTENT ───────────────────────────── */}
          <div className="grid grid-cols-12 gap-6 items-start">
            
            {/* Left: Signature Selector */}
            <div className="col-span-4 space-y-4">
              <h2 className="text-xl font-bold text-white pl-1 [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]">Signature Analysis</h2>
              <div className="flex flex-col gap-2">
                {signatures.map((sig) => (
                  <button
                    key={sig.id}
                    onClick={() => {
                      setSelected(sig);
                      setZoom(100);
                      setRotation(0);
                    }}
                    className={`text-left p-4 rounded-[20px] transition-all duration-300 shadow-sm border ${
                      selected.id === sig.id
                        ? "bg-white border-transparent scale-[1.02] shadow-lg ring-1 ring-white/10"
                        : "bg-white/5 border-white/5 hover:bg-white/10 text-gray-400"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          selected.id === sig.id ? "bg-blue-50 text-[#2563EB]" : "bg-white/5 text-gray-500"
                        }`}>
                          <Fingerprint size={20} />
                        </div>
                        <div>
                          <p className={`text-[15px] font-bold [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif] ${selected.id === sig.id ? 'text-gray-900' : 'text-gray-300'}`}>
                            {sig.name}
                          </p>
                          <p className="text-xs font-medium opacity-60 mt-0.5">{sig.page} · {sig.block}</p>
                        </div>
                      </div>
                      {sig.status === "forged" 
                        ? <XCircle size={16} className="text-red-500 mt-1" />
                        : <CheckCircle2 size={16} className="text-emerald-500 mt-1" />
                      }
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Lab View & Details */}
            <div className="col-span-8 space-y-4">
              <h2 className="text-xl font-bold text-white pl-1 [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]">Verification Details</h2>
              
              <div className="bg-white rounded-[24px] shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[500px]">
                {/* Lab Toolbar */}
                <header className="px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-[#F9FAFB]/50 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-bold text-gray-900 [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]">{selected.name}</span>
                    <span className="text-xs text-gray-400 font-medium">{selected.page}, {selected.block}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-100/50 p-1 rounded-xl border border-gray-200">
                    <button onClick={() => setZoom(z => Math.max(z - 10, 50))} className="p-1.5 hover:bg-white rounded-lg text-gray-500 transition-all shadow-sm active:scale-95"><ZoomOut size={16} /></button>
                    <button onClick={() => setZoom(100)} className="text-[11px] font-bold text-gray-500 w-10 text-center hover:text-blue-600 transition-colors cursor-pointer">{zoom}%</button>
                    <button onClick={() => setZoom(z => Math.min(z + 10, 200))} className="p-1.5 hover:bg-white rounded-lg text-gray-500 transition-all shadow-sm active:scale-95"><ZoomIn size={16} /></button>
                    <div className="w-px h-4 bg-gray-200 mx-1" />
                    <button onClick={() => setRotation(r => r - 45)} className="p-1.5 hover:bg-white rounded-lg text-gray-500 transition-all shadow-sm active:scale-95"><RotateCcw size={16} /></button>
                    <button 
                      onClick={() => alert(`Downloading forensic report: ${selected.name}`)}
                      className="p-1.5 hover:bg-white rounded-lg text-gray-500 transition-all shadow-sm active:scale-95"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                </header>

                {/* Lab Stage */}
                <div className="flex-1 bg-gray-100/50 relative overflow-hidden flex items-center justify-center p-12">
                   <div 
                    className={`bg-white rounded-2xl shadow-inner border-2 min-w-[440px] h-[240px] flex flex-col items-center justify-center p-10 transition-all duration-500 ${
                      selected.status === 'forged' ? 'border-red-200 ring-4 ring-red-50' : 'border-emerald-100 ring-4 ring-emerald-50'
                    }`}
                    style={{ transform: `scale(${zoom / 100}) rotate(${rotation}deg)` }}
                   >
                     {selected.status === 'forged' && (
                        <div className="absolute -top-3.5 bg-red-600 text-white text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest shadow-xl ring-2 ring-white">
                          FORGERY DETECTED
                        </div>
                     )}
                     <div className={`font-['Brush_Script_MT',_cursive] text-[64px] select-none leading-none ${selected.status === 'forged' ? 'text-gray-800' : 'text-blue-900 opacity-90'}`}>
                        {selected.status === 'forged' ? "J. Fitzgerald" : "A. Richardson"}
                     </div>
                     <div className="w-56 h-0.5 bg-gray-200 mt-6 rounded-full" />
                   </div>
                </div>

                {/* Lab Conclusion */}
                <footer className={`px-8 py-5 border-t-2 ${selected.status === 'forged' ? 'bg-[#E5484D] border-red-600' : 'bg-[#16A34A] border-emerald-700'}`}>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 pt-0.5">
                      {selected.status === 'forged' ? <AlertTriangle size={28} className="text-white" /> : <CheckCircle2 size={28} className="text-white" />}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif] leading-tight">
                        {selected.status === 'forged' ? 'Probability of Fraud: 97.2%' : 'Authenticity Verified'}
                      </h4>
                      <p className="text-sm mt-1 leading-relaxed text-white/80 font-medium max-w-2xl">
                        {selected.details}
                      </p>
                    </div>
                  </div>
                </footer>
              </div>
            </div>

          </div>

          {/* ─── DIGITAL LIGHTBOX (ALL SIGNATURES) ────────────────── */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xl font-bold text-white [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]">Digital Specimen Gallery</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-medium bg-white/5 px-3 py-1 rounded-full">{signatures.length} Total Specimens</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {signatures.map((sig) => (
                <button 
                  key={`gallery-${sig.id}`}
                  onClick={() => {
                    setSelected(sig);
                    setZoom(100);
                    setRotation(0);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`group relative bg-white rounded-[24px] p-6 text-left transition-all duration-300 hover:scale-[1.02] shadow-xl border-2 ${
                    selected.id === sig.id ? 'border-[#2563EB] ring-4 ring-blue-500/10' : 'border-transparent hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4 px-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black uppercase tracking-[0.1em] ${
                        sig.status === 'forged' ? 'text-red-500' : 'text-emerald-500'
                      }`}>
                        {sig.status}
                      </span>
                      {selected.id === sig.id && (
                        <div className="text-[#2563EB]">
                          <CheckCircle2 size={14} />
                        </div>
                      )}
                    </div>
                    <span className="text-[11px] font-bold text-gray-400 [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]">{sig.confidence}% match</span>
                  </div>

                  <div className="h-24 bg-gray-50 rounded-xl mb-4 flex items-center justify-center p-4 border border-gray-100/50 group-hover:bg-white transition-colors">
                     <div className={`font-['Brush_Script_MT',_cursive] text-[28px] select-none ${sig.status === 'forged' ? 'text-gray-400' : 'text-blue-900/60'}`}>
                        {sig.status === 'forged' ? "J. Fitzgerald" : "A. Richardson"}
                     </div>
                  </div>

                  <div>
                    <h5 className="text-[15px] font-bold text-gray-900 [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif] leading-tight">{sig.name}</h5>
                    <p className="text-[12px] text-gray-400 font-medium mt-0.5">{sig.page}, {sig.block}</p>
                  </div>


                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
