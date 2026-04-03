import { Sidebar } from "@/components/dashboard/Sidebar";
import { ShieldAlert, FileText, Code2, Download } from "lucide-react";
import { motion } from "framer-motion";
import { downloadForensicPdf } from "@/controllers/PdfGenerator";
import { downloadLatexSource } from "@/controllers/LatexGenerator";
import { MOCK_REPORT_DATA } from "@/models/ReportData";

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
                onClick={() => downloadLatexSource(MOCK_REPORT_DATA)}
                className="p-2 hover:bg-white/5 text-gray-400 hover:text-white rounded-lg transition-all border border-white/5"
                title="Download .tex Source"
              >
                <Code2 size={16} />
              </button>
              <button 
                onClick={() => downloadForensicPdf(MOCK_REPORT_DATA)}
                className="flex items-center gap-2 px-6 py-2 bg-[#007AFF] hover:bg-[#007AFF]/80 text-white rounded-xl text-[12px] font-bold transition-all shadow-lg shadow-[#007AFF]/20"
              >
                <Download size={14} />
                Download diagnostic PDF
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
             {/* 1. Authoritative Header Strip */}
             <div className="border-t-[6px] border-[#007AFF] px-14 py-10 flex items-start justify-between">
                <div>
                   <img src="/src/assets/branding/image copy 2.png" alt="ForensIQ Logo" className="h-8 invert opacity-90 mb-6" />
                   <h1 className="text-[28px] font-bold tracking-tight text-gray-900 leading-none">Forensic Extraction Report</h1>
                   <p className="text-[12px] font-bold text-gray-400 mt-2 tracking-tight">Report ID: FQ-2023-8992A-SECURED</p>
                </div>
                <div className="text-right">
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-100 rounded text-red-600 mb-4">
                      <ShieldAlert size={14} />
                      <span className="text-[11px] font-black uppercase tracking-widest">Verified Forgery</span>
                   </div>
                   <div className="text-[11px] font-bold text-gray-400 leading-tight">
                      Extraction Date: <span className="text-gray-900 font-black">24 OCT 2023</span><br />
                      Extraction Time: <span className="text-gray-900 font-black">09:18 EST</span>
                   </div>
                </div>
             </div>

             {/* Primary Case Data */}
             <div className="px-14 py-8 bg-gray-50 border-y border-gray-100 grid grid-cols-4 gap-8">
                <div>
                   <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Risk Verdict</span>
                   <span className="text-[13px] font-black text-red-600">Severe</span>
                </div>
                <div>
                   <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Confidence</span>
                   <span className="text-[13px] font-black text-gray-900">0.00%</span>
                </div>
                <div>
                   <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Engine Version</span>
                   <span className="text-[13px] font-black text-gray-900">Neural v4.22</span>
                </div>
                <div>
                   <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Analysis Mode</span>
                   <span className="text-[13px] font-black text-gray-900">Standard Extraction</span>
                </div>
             </div>

             {/* Investigative Summary */}
             <div className="px-14 py-12 border-b border-gray-100">
                <h3 className="text-[13px] font-black text-gray-400 uppercase tracking-widest mb-4">1.0 Executive Summary</h3>
                <p className="text-[15px] font-medium text-gray-700 leading-relaxed text-left max-w-3xl">
                   This formal report serves as the final authentication record for the asset designated <b>Account_statement_lending_citi.pdf</b>. Synthetic forensics extraction has isolated critical structural discrepancies—specifically unauthorized typographical substitution and vector layering anomalies. These findings collectively render the document as <b>Compromised</b> and unsuitable for standard verification workflows.
                </p>
             </div>

             {/* Technical Provenance */}
             <div className="px-14 py-12 border-b border-gray-100 bg-white">
                <h3 className="text-[13px] font-black text-gray-400 uppercase tracking-widest mb-8">2.0 Technical Provenance</h3>
                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                   <ProvenanceRow label="Source Filename" value="Account_statement_lending_citi.pdf" />
                   <ProvenanceRow label="Binary Size" value="2.4 MB (2,458,112 bytes)" />
                   <ProvenanceRow label="Architecture" value="Adobe PDF v1.7 (ISO-32000)" />
                   <ProvenanceRow label="MIME Type" value="application/pdf" />
                </div>
                <div className="mt-10 pt-8 border-t border-gray-100 flex items-start gap-4">
                   <div className="shrink-0 bg-gray-50 border border-gray-200 px-3 py-1 rounded text-[9px] font-black text-gray-500 uppercase tracking-widest">Hash Map</div>
                   <div className="flex-1 space-y-2">
                      <div className="flex items-start gap-4">
                         <span className="text-[10px] font-black text-gray-400 w-16 uppercase pb-0.5">SHA-256</span>
                         <span className="font-mono text-[11px] text-gray-500 break-all">8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc3279c1</span>
                      </div>
                   </div>
                </div>
             </div>

             {/* Risk Anomaly Detail */}
             <div className="px-14 py-12">
                <h3 className="text-[13px] font-black text-gray-400 uppercase tracking-widest mb-10">3.0 Forensic Diagnostic Index</h3>
                <div className="space-y-12">
                   <DetailAnomalyRow 
                     title="Font Substitution Signature Block" 
                     detail="Primary text stream declared as 'Helvetica Neue' was rendered using an injected 'Arial' subset. This mismatch confirms retroactive layer modification post-issuance."
                     sev="Critical"
                     location="Page 03 // Block 07"
                   />
                   <DetailAnomalyRow 
                     title="Unauthorized Vector Overlay" 
                     detail="Numerical entry ($24,000.00) exhibits a distinct Z-index coordinate mismatch against the primary table architecture. Indicates a visual insertion on top of original data."
                     sev="High"
                     location="Page 02 // Block 12"
                   />
                </div>
             </div>

             {/* Certification and Signature */}
             <div className="mt-auto px-14 py-16 bg-gray-50 border-t border-gray-100 flex justify-between items-end">
                <div className="max-w-xs">
                   <h4 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.2em] mb-3">5.0 Official Certification</h4>
                   <p className="text-[11px] font-bold text-gray-400 leading-relaxed text-justify">
                      This diagnostic report was generated via the ForensIQ Secure API. All extraction protocols are logged immutably within the administrative audit matrix and tied to the investigator listed.
                   </p>
                </div>
                <div className="text-right">
                   <div className="w-56 h-14 border-b border-gray-300 mb-2 flex items-center justify-center grayscale opacity-60">
                      <span className="font-[Brush_Script_MT] text-[32px] text-blue-900 italic">John Doe</span>
                   </div>
                   <p className="text-[11px] font-black text-gray-900 uppercase tracking-widest">Certified Investigator</p>
                   <p className="text-[9px] font-bold text-gray-400 mt-1 italic tracking-tight">Credential ID: FIQ-8900-X-SECURED</p>
                </div>
             </div>

             {/* Final Corporate Footer */}
             <div className="bg-[#0b0f24] px-14 py-8 flex justify-between items-center text-white border-t-4 border-[#007AFF]">
                <div className="flex items-center gap-4">
                   <img src="/src/assets/branding/image copy 2.png" alt="ForensIQ Logo" className="h-6 opacity-30" />
                   <div className="w-px h-6 bg-white/10" />
                   <div className="text-[10px] font-black uppercase tracking-widest text-white/50">ForensIQ Forensic Division</div>
                </div>
                <div className="flex gap-8 text-[9px] font-black uppercase tracking-[0.2em] text-white/30">
                   <span>Page 01 of 01</span>
                   <span>Strictly Confidential</span>
                   <span>© 2023 ForensIQ.ai</span>
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
