import { Sidebar } from "@/components/dashboard/Sidebar";
import { Printer, ShieldAlert, AlertTriangle, FileText, FileSpreadsheet } from "lucide-react";
import { motion } from "framer-motion";

export function ReportPage() {
  return (
    <div className="flex h-screen bg-[#0b0f24] font-inter overflow-hidden text-white/90 print:block print:h-auto print:overflow-visible print:bg-white">
      <Sidebar />

      <div className="flex-1 overflow-y-auto relative bg-[#0b0f24] print:bg-white print:overflow-visible print:block">
        
        {/* Floating Action Bar */}
        <div className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-[#0b0f24]/80 backdrop-blur-md border-b border-white/5 shadow-2xl print:hidden">
           <div className="flex items-center gap-3">
              <FileText size={18} className="text-[#007AFF]" />
              <div>
                 <h2 className="text-[14px] font-bold text-white tracking-tight">Forensic analysis report</h2>
                 <p className="text-[11px] font-medium text-gray-400">Formal document authentication records</p>
              </div>
           </div>
           
           <div className="flex items-center gap-3 space-x-2">
              <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 px-6 py-2 bg-[#007AFF] hover:bg-[#007AFF]/80 text-white rounded-xl text-[12px] font-bold transition-all shadow-lg shadow-[#007AFF]/20"
              >
                <Printer size={14} />
                Generate final report
              </button>
           </div>
        </div>

        {/* Report Document Canvas */}
        <div className="relative py-12 px-8 flex justify-center pb-32 print:p-0 print:py-0">
          
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, ease: "easeOut" }}
             className="w-full max-w-[900px] print:max-w-none bg-white print:shadow-none shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden text-gray-900 border border-gray-200 print:border-none print:m-0 [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]"
          >
             {/* 1. Brand Header Strip */}
             <div className="bg-[#007AFF] px-14 py-8 mb-10 flex items-center justify-between relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#fff_1px,_transparent_1px)] [background-size:20px_20px]" />
                <div className="relative z-10 flex items-center gap-6">
                   <div className="bg-white p-2 rounded-xl shadow-lg">
                      <img src="/src/assets/branding/image copy 2.png" alt="ForensIQ Logo" className="h-10 invert brightness-0" />
                   </div>
                   <div className="text-white">
                      <h1 className="text-[24px] font-black tracking-tight leading-none mb-1">Forensic analysis report</h1>
                      <div className="flex items-center gap-3 text-[11px] font-bold text-white/70 uppercase tracking-widest">
                         <span>ForensIQ laboratory</span>
                         <span className="w-1 h-1 bg-white/30 rounded-full" />
                         <span>Session FQ-8992A</span>
                      </div>
                   </div>
                </div>
                <div className="text-right text-white relative z-10">
                   <div className="text-[12px] font-black uppercase tracking-widest mb-0.5">Official certification</div>
                   <div className="text-[10px] font-bold text-white/60">Issued: Oct 24, 2023</div>
                </div>
             </div>

             {/* Case Summary Grid */}
             <div className="px-14 pb-10 border-b border-gray-100 grid grid-cols-3 gap-10">
                <div>
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Status</span>
                   <div className="flex items-center gap-2 text-red-600">
                      <ShieldAlert size={14} />
                      <span className="text-[14px] font-black leading-none">Verified forgery</span>
                   </div>
                </div>
                <div>
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Confidence</span>
                   <span className="text-[14px] font-black text-gray-900">0.00% Score</span>
                </div>
                <div>
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Extraction engine</span>
                   <span className="text-[14px] font-black text-gray-900 border-l-2 border-[#007AFF] pl-2">Neural v4.22</span>
                </div>
             </div>

             {/* Executive Summary Section */}
             <div className="px-14 py-10">
                <div className="flex items-center gap-2 mb-4">
                   <div className="w-1.5 h-6 bg-[#007AFF] rounded-full" />
                   <h3 className="text-[16px] font-black text-gray-900">Executive summary</h3>
                </div>
                <p className="text-[14px] font-medium text-gray-600 leading-relaxed text-justify max-w-3xl">
                   Analysis of the asset, <b>Account_statement_lending_citi.pdf</b>, has confirmed severe structural compromise. The investigative framework has isolated typographical injections and layering anomalies consistent with synthetic forgery.
                </p>
             </div>

             {/* Technical Context Table */}
             <div className="px-14 py-10 bg-gray-50/50 border-y border-gray-100">
                <h3 className="text-[14px] font-black text-gray-900 mb-6 flex items-center gap-2">
                   <FileSpreadsheet size={16} className="text-[#007AFF]" /> Document provenance
                </h3>
                <div className="grid grid-cols-2 gap-x-12 gap-y-5">
                   <ProvenanceRow label="File name" value="Account_statement_lending_citi.pdf" />
                   <ProvenanceRow label="File size" value="2.4 MB (Encrypted stream)" />
                   <ProvenanceRow label="Structure" value="ISO-32000-1 / PDF 1.7" />
                   <ProvenanceRow label="Investigator" value="Officer John Doe" />
                </div>
                <div className="mt-8 pt-6 border-t border-gray-200">
                   <div className="flex items-start gap-4 mb-2">
                      <span className="text-[10px] font-black text-gray-400 w-16 uppercase tracking-widest">SHA-256</span>
                      <span className="font-mono text-[11px] text-gray-400 break-all leading-relaxed">8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc3279c1</span>
                   </div>
                </div>
             </div>

             {/* Forensic Anomalies Section */}
             <div className="px-14 py-10">
                <div className="flex items-center gap-2 mb-8 border-b border-gray-100 pb-4">
                   <AlertTriangle size={18} className="text-red-500" />
                   <h3 className="text-[16px] font-black text-gray-900">Detected risk vectors</h3>
                </div>
                
                <div className="space-y-12">
                   <DetailAnomalyRow 
                     title="Font substitution on signature block" 
                     detail="PDF text stream declared as 'Helvetica Neue' rendered using an 'Arial' subset. Typical of post-export modification via external PDF editors."
                     sev="Critical"
                     location="Page 03, block 07"
                   />
                   <DetailAnomalyRow 
                     title="Unauthorized vector overlay" 
                     detail="Numerical credit entry ($24,000.00) exhibits a distinct Z-index coordinate mismatch against the primary document architecture."
                     sev="High"
                     location="Page 02, block 12"
                   />
                </div>
             </div>

             {/* Authorisation & Vertical Footer */}
             <div className="mt-auto px-14 pb-20 pt-10 border-t-4 border-[#007AFF] flex justify-between items-end bg-gradient-to-t from-gray-50 to-white">
                <div className="max-w-xs">
                   <h4 className="text-[12px] font-black text-gray-900 mb-2">Certification log</h4>
                   <p className="text-[11px] font-bold text-gray-400 leading-relaxed italic">
                      This record is immutably stored within the ForensIQ data matrix. It serves as a binding certification of document state as of the issuance timestamp.
                   </p>
                </div>
                <div className="text-right">
                   <div className="w-48 h-12 border-b-2 border-gray-200 mb-2 flex items-center justify-center">
                      <span className="font-[Brush_Script_MT] text-[28px] text-[#0b0f24] opacity-50 italic">John Doe</span>
                   </div>
                   <p className="text-[11px] font-black text-gray-900 uppercase tracking-widest">Authorized investigator</p>
                   <p className="text-[10px] font-bold text-[#007AFF] mt-1 italic">FIQ-8900-X-LAB / SECURED</p>
                </div>
             </div>

             {/* Formal Blue Brand Footer */}
             <div className="bg-[#0b0f24] px-14 py-8 flex justify-between items-center text-white relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#007AFF]" />
                <div className="flex items-center gap-4">
                   <img src="/src/assets/branding/image copy 2.png" alt="ForensIQ Logo" className="h-6 opacity-30" />
                   <div className="w-px h-6 bg-white/10" />
                   <div className="text-[10px] font-black uppercase tracking-widest text-white/50">ForensIQ forensic division</div>
                </div>
                <div className="flex gap-6 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                   <span>Page 01 of 01</span>
                   <span>Strictly confidential</span>
                </div>
             </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
}

function ProvenanceRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col border-l-2 border-gray-100 pl-4">
      <span className="text-[10px] font-black text-gray-400 mb-0.5 uppercase tracking-widest">{label}</span>
      <span className="text-[13px] font-black text-gray-900 tracking-tight">{value}</span>
    </div>
  );
}

function DetailAnomalyRow({ title, detail, sev, location }: { title: string, detail: string, sev: string, location: string }) {
   return (
      <div className="flex items-start gap-8 relative">
         <div className="w-px h-full absolute left-[9px] top-6 bg-gray-100" />
         <div className="shrink-0 mt-1 relative z-10">
            <div className={`w-[20px] h-[20px] rounded-full ${sev === 'Critical' ? 'bg-red-600' : 'bg-orange-500'} flex items-center justify-center ring-4 ring-white shadow-sm`}>
               <div className="w-1.5 h-1.5 rounded-full bg-white transition-transform scale-110" />
            </div>
         </div>
         <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
               <h4 className="text-[17px] font-black text-gray-900 tracking-tight">{title}</h4>
               <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded bg-gray-50 border border-gray-100 ${sev === 'Critical' ? 'text-red-600 border-red-100' : 'text-orange-500 border-orange-100'}`}>{sev}</span>
            </div>
            
            <p className="text-[14px] font-medium text-gray-600 leading-relaxed mb-4 text-justify">{detail}</p>
            
            <div className="flex gap-10">
               <div>
                  <span className="text-[9px] font-black text-gray-300 mb-0.5 uppercase tracking-widest block">Extraction Location</span>
                  <span className="text-[12px] font-black text-gray-800">{location}</span>
               </div>
               <div>
                  <span className="text-[9px] font-black text-gray-300 mb-0.5 uppercase tracking-widest block">Signal Severity</span>
                  <span className={`text-[12px] font-black ${sev === 'Critical' ? 'text-red-600' : 'text-orange-500'}`}>{sev} Risk Layer</span>
               </div>
            </div>
         </div>
      </div>
   );
}
