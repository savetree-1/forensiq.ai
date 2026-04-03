import { Sidebar } from "@/components/dashboard/Sidebar";
import { Download, Printer, Share2, ShieldAlert, CheckCircle2, AlertTriangle, FileText } from "lucide-react";
import { motion } from "framer-motion";

export function ReportPage() {
  return (
    <div className="flex h-screen bg-[#0b0f24] font-inter overflow-hidden text-white/90">
      <Sidebar />

      <div className="flex-1 overflow-y-auto relative bg-[#0b0f24]">
        
        {/* Floating Action Bar */}
        <div className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-[#0b0f24]/80 backdrop-blur-md border-b border-white/5 shadow-2xl">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                 <FileText size={16} className="text-gray-400" />
              </div>
              <div>
                 <h2 className="text-[13px] font-bold text-white tracking-tight">Final Diagnostics Report</h2>
                 <p className="text-[11px] font-medium text-gray-500">Ready for statutory export or distribution</p>
              </div>
           </div>
           
           <div className="flex items-center gap-3 space-x-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all border border-white/10">
                <Share2 size={14} />
                Share
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all border border-white/10">
                <Printer size={14} />
                Print
              </button>
              <button className="flex items-center gap-2 px-6 py-2 bg-[#007AFF] hover:bg-[#007AFF]/80 text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all shadow-lg shadow-[#007AFF]/20">
                <Download size={14} />
                Download PDF
              </button>
           </div>
        </div>

        {/* Report Document Canvas */}
        <div className="relative py-12 px-8 flex justify-center pb-32">
          
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, ease: "easeOut" }}
             className="w-full max-w-[850px] bg-white rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden text-gray-900 border border-gray-200 [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]"
          >
             {/* Report Header */}
             <div className="px-12 pt-16 pb-8 border-b-4 border-gray-100 flex items-start justify-between bg-[url('https://www.transparenttextures.com/patterns/clean-text-patterns.png')]">
                <div>
                   <h1 className="text-[28px] font-black tracking-tight text-black uppercase mb-1">Forensic Analysis Report</h1>
                   <p className="text-[13px] font-bold text-gray-400 uppercase tracking-[0.2em]">Generated via ForensIQ.ai Automated Diagnostic Pipeline</p>
                </div>
                <div className="text-right">
                   <img src="/src/assets/branding/image copy 2.png" alt="ForensIQ Logo" className="h-8 invert opacity-80 mb-2 ml-auto" />
                   <div className="text-[10px] font-bold text-gray-400">
                      CASE ID: <span className="text-black">FQ-2023-8992A</span><br />
                      DATE: <span className="text-black">24 OCT 2023</span>
                   </div>
                </div>
             </div>

             {/* Core Information Grid */}
             <div className="px-12 py-8 grid grid-cols-2 gap-8 border-b border-gray-100">
                <div>
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Subject Document</h3>
                   <p className="text-[14px] font-bold text-black border-l-2 border-gray-200 pl-3">Account_statement_lending_citi.pdf</p>
                   <p className="text-[12px] font-medium text-gray-500 mt-2 pl-3">SHA-256: 8f434346648...90a</p>
                </div>
                <div>
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Lead Investigator</h3>
                   <p className="text-[14px] font-bold text-black border-l-2 border-gray-200 pl-3">John Doe</p>
                   <p className="text-[12px] font-medium text-gray-500 mt-2 pl-3">Digital Forensics Division</p>
                </div>
             </div>

             {/* Final Verdict Banner */}
             <div className="px-12 py-10">
                <h3 className="text-[11px] font-black uppercase tracking-[0.1em] text-gray-400 mb-4 border-b border-gray-100 pb-2">Primary Diagnosis & Verdict</h3>
                
                <div className="flex items-center gap-6 p-6 bg-red-50 border border-red-100 rounded-2xl">
                   <div className="w-16 h-16 shrink-0 rounded-full bg-red-100 flex items-center justify-center border border-red-200">
                      <ShieldAlert className="text-red-600" size={32} />
                   </div>
                   <div className="flex-1">
                      <div className="flex items-baseline gap-3 mb-1">
                         <h2 className="text-[24px] font-black tracking-tight text-red-600 uppercase leading-none">Severe Risk</h2>
                         <span className="text-[14px] font-bold text-red-400">/ 0% Document Confidence</span>
                      </div>
                      <p className="text-[14px] font-bold text-red-900/70 leading-relaxed">
                         Document successfully identified as <span className="text-red-600 font-bold">computationally forged</span>. Digital manipulation overlays and structural inconsistencies verified. Do not authorise.
                      </p>
                   </div>
                </div>
             </div>

             {/* Executive Summary */}
             <div className="px-12 pb-10">
                <h3 className="text-[11px] font-black uppercase tracking-[0.1em] text-gray-400 mb-4 border-b border-gray-100 pb-2">Executive Summary</h3>
                <p className="text-[14px] font-medium text-gray-700 leading-relaxed text-justify">
                   On October 24, 2023, the document <i>Account_statement_lending_citi.pdf</i> was subjected to a Level 4 deep structural scan via the ForensIQ.ai Neural Engine. The analysis confirms substantial evidence of tampering, primarily involving unauthorised font substitution routines within the signature block (identifying Arial rendered where Helvetica Neue was declared natively), as well as a critical 10-year discrepancy between the XMP metadata creation timestamp and the native file system timestamp. A $24,000 credit entry on Page 2 was structurally inserted via a discrete overlay vector path not native to the overarching PDF stream architecture.
                </p>
             </div>

             {/* Top Identified Anomalies */}
             <div className="px-12 pb-12">
                <h3 className="text-[11px] font-black uppercase tracking-[0.1em] text-gray-400 mb-6 border-b border-gray-100 pb-2">Critical Flagged Vectors</h3>

                <div className="space-y-4">
                   <AnomalyRow 
                     title="Font Substitution on Signature Block" 
                     category="Typography Matrix" 
                     detail="The font used for the issuing officer relies on an injected Arial stream masking the original base."
                     sev="CRITICAL"
                   />
                   <AnomalyRow 
                     title="External Wire Credit Entry Overlay" 
                     category="Vector Manipulation" 
                     detail="A wire credit of $24,000 appears in a specific block with a distinct layer overlay architecture."
                     sev="HIGH"
                   />
                   <AnomalyRow 
                     title="XMP Metadata Timestamp Mismatch" 
                     category="Historical Inconsistency" 
                     detail="Document reports 2013 creation but XMP metadata proves physical modification occurred in 2023."
                     sev="HIGH"
                   />
                </div>
             </div>

             {/* Signoff block */}
             <div className="px-12 py-10 bg-gray-50 border-t border-gray-100 flex items-end justify-between">
                <div>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Generated Checksum</p>
                   <p className="text-[12px] font-mono text-gray-500">e3b0c44298fc1c149afbf4c8996fb924</p>
                </div>
                <div className="text-right">
                   <div className="w-48 h-12 border-b-2 border-gray-300 mx-auto mb-2 relative">
                      {/* Fake signature graphic */}
                      <span className="absolute bottom-2 right-2 font-[Brush_Script_MT] text-[24px] text-blue-900 opacity-60 italic">John Doe</span>
                   </div>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Authorised Investigator</p>
                </div>
             </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
}

function AnomalyRow({ title, category, detail, sev }: { title: string, category: string, detail: string, sev: string }) {
   return (
      <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
         <div className="shrink-0 mt-1">
            <AlertTriangle size={18} className="text-red-500" strokeWidth={2.5} />
         </div>
         <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
               <h4 className="text-[14px] font-bold text-gray-900 leading-tight">{title}</h4>
               <span className="px-2 py-0.5 rounded text-[9px] font-black text-red-600 bg-red-100 border border-red-200 uppercase tracking-widest">{sev}</span>
            </div>
            <p className="text-[13px] font-medium text-gray-600 mb-2">{detail}</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
               <CheckCircle2 size={12} /> Confirmed via {category}
            </p>
         </div>
      </div>
   );
}
