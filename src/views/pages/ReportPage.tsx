import { Sidebar } from "@/components/dashboard/Sidebar";
import { Printer, ShieldAlert, AlertTriangle, FileText, FileCheck, Info, FileSpreadsheet } from "lucide-react";
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
             {/* 1. Formal Header */}
             <div className="px-14 pt-16 pb-10 border-b-[3px] border-gray-900">
                <div className="flex justify-between items-end mb-8">
                   <div>
                      <div className="flex items-center gap-2 text-[#007AFF] mb-3">
                         <FileCheck size={20} />
                         <span className="text-[14px] font-bold tracking-tight">ForensIQ forensic laboratory</span>
                      </div>
                      <h1 className="text-[36px] font-bold tracking-tight text-gray-900 leading-none">Document authentication report</h1>
                   </div>
                   <div className="text-right">
                      <div className="text-[12px] font-medium text-gray-400 leading-relaxed">
                         Reference: <span className="text-gray-900 font-bold">FQ-2023-8992A</span><br />
                         Issued: <span className="text-gray-900 font-bold">Oct 24, 2023 · 09:18 EST</span>
                      </div>
                   </div>
                </div>
                
                <div className="pt-6 border-t border-gray-100 flex gap-12">
                   <div>
                      <span className="text-[11px] font-bold text-gray-400 block mb-1">Status</span>
                      <span className="text-[13px] font-bold text-red-600 flex items-center gap-1.5 pointer-events-none">
                         <ShieldAlert size={14} /> Verified forgery
                      </span>
                   </div>
                   <div>
                      <span className="text-[11px] font-bold text-gray-400 block mb-1">Analysis layer</span>
                      <span className="text-[13px] font-bold text-gray-900">Neural Engine v4.22</span>
                   </div>
                   <div>
                      <span className="text-[11px] font-bold text-gray-400 block mb-1">Confidence</span>
                      <span className="text-[13px] font-bold text-gray-900">0.00% Score</span>
                   </div>
                </div>
             </div>

             {/* 2. Primary Analysis Summary */}
             <div className="px-14 py-12 bg-gray-50/50">
                <div className="max-w-3xl">
                   <h3 className="text-[16px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Info size={18} className="text-gray-400" /> Executive summary
                   </h3>
                   <p className="text-[15px] font-medium text-gray-700 leading-relaxed text-justify">
                      Comprehensive examination of the submitted asset, <i>Account_statement_lending_citi.pdf</i>, has been concluded. The automated forensic framework has identified significant structural irregularities and metadata discrepancies that deviate from native document standards. The presence of synthetic typographical overlays and administrative timestamp mismatches confirms that this document has been subject to unauthorized alteration post-generation.
                   </p>
                </div>
             </div>

             {/* 3. Detailed Technical Specifications */}
             <div className="px-14 py-12 border-b border-gray-100">
                <h3 className="text-[16px] font-bold text-gray-900 mb-8 flex items-center gap-2">
                   <FileSpreadsheet size={18} className="text-gray-400" /> Technical provenance
                </h3>
                
                <div className="grid grid-cols-2 gap-x-16 gap-y-6">
                   <div className="flex flex-col border-l-2 border-gray-100 pl-4">
                      <span className="text-[11px] font-bold text-gray-400 mb-1">Source file name</span>
                      <span className="text-[14px] font-bold text-gray-900 tracking-tight">Account_statement_lending_citi.pdf</span>
                   </div>
                   <div className="flex flex-col border-l-2 border-gray-100 pl-4">
                      <span className="text-[11px] font-bold text-gray-400 mb-1">Total payload size</span>
                      <span className="text-[14px] font-bold text-gray-900 tracking-tight">2.4 MB (Binary)</span>
                   </div>
                   <div className="flex flex-col border-l-2 border-gray-100 pl-4">
                      <span className="text-[11px] font-bold text-gray-400 mb-1">Document architecture</span>
                      <span className="text-[14px] font-bold text-gray-900 tracking-tight">ISO-32000 / PDF 1.7</span>
                   </div>
                   <div className="flex flex-col border-l-2 border-gray-100 pl-4">
                      <span className="text-[11px] font-bold text-gray-400 mb-1">Investigation lead</span>
                      <span className="text-[14px] font-bold text-gray-900 tracking-tight">Officer John Doe</span>
                   </div>
                </div>

                <div className="mt-10 bg-gray-900 rounded-xl p-5 shadow-inner">
                   <div className="flex items-start gap-4 mb-3 border-b border-white/5 pb-3">
                      <span className="text-[10px] font-bold text-gray-500 w-16 uppercase tracking-wider">Sha-256</span>
                      <span className="font-mono text-[11px] text-gray-300 break-all leading-relaxed">8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc3279c1</span>
                   </div>
                   <div className="flex items-start gap-4">
                      <span className="text-[10px] font-bold text-gray-500 w-16 uppercase tracking-wider">MD5</span>
                      <span className="font-mono text-[11px] text-gray-300 break-all leading-relaxed">e4d909c290d0fb1ca068ffaddf22cbd0</span>
                   </div>
                </div>
             </div>

             {/* 4. Identified Forensic Anomalies */}
             <div className="px-14 py-12">
                <h3 className="text-[16px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                   <AlertTriangle size={18} className="text-red-500" /> Detected risk vectors
                </h3>
                <p className="text-[13px] font-medium text-gray-500 mb-8 border-b border-gray-100 pb-4 italic">
                   The following anomalies represent direct violations of document integrity protocols.
                </p>

                <div className="space-y-10">
                   <DetailAnomalyRow 
                     title="Font substitution on signature block" 
                     category="Typography array" 
                     detail="Examination of the PDF stream reveals that text strings declared as 'Helvetica Neue' were rendered using an embedded 'Arial' subset. This is characteristic of post-generation modification via external PDF editors."
                     sev="Critical"
                     location="Page 03, block 07"
                     riskImpact="Identity manipulation"
                   />
                   <DetailAnomalyRow 
                     title="Unauthorized vector overlay" 
                     category="Spatial architecture" 
                     detail="A numerical credit entry of '$24,000.00' exhibits a distinct Z-index coordinate that does not align with the native document's table structure, suggesting a visual layer insertion."
                     sev="High"
                     location="Page 02, block 12"
                     riskImpact="Financial inflation"
                   />
                </div>
             </div>

             {/* 5. Formal Footer and Sign-off */}
             <div className="px-14 pt-10 pb-16 bg-white border-t-2 border-gray-100 flex items-start justify-between">
                <div className="max-w-sm">
                   <h3 className="text-[13px] font-bold text-gray-900 mb-2">Certification of accuracy</h3>
                   <p className="text-[12px] font-medium text-gray-500 leading-relaxed text-left">
                     This report serves as a formal attestation of document state. Any modification to this diagnostic record is tracked within the immutable ForensIQ ledger.
                   </p>
                </div>
                <div className="text-right">
                   <div className="w-56 h-16 border-b border-gray-200 mb-3 flex items-center justify-center">
                      <span className="font-[Brush_Script_MT] text-[32px] text-blue-900 opacity-60 italic transform -rotate-1">John Doe</span>
                   </div>
                   <div className="leading-tight">
                      <p className="text-[12px] font-bold text-gray-900">Investigator signature</p>
                      <p className="text-[10px] font-bold text-gray-400 italic mt-1">Ref: FIQ-8900-X-LAB</p>
                   </div>
                </div>
             </div>

             {/* Print Footer */}
             <div className="px-14 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400 font-bold">
                <span>CONFIDENTIAL PROPERTY OF FORENSIQ LABORATORY</span>
                <span>Page 01 of 01</span>
                <span>Validated Oct 2023</span>
             </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
}

function DetailAnomalyRow({ title, category, detail, sev, location, riskImpact }: { title: string, category: string, detail: string, sev: string, location: string, riskImpact: string }) {
   return (
      <div className="flex items-start gap-8 relative">
         <div className="w-px h-full absolute left-[9px] top-6 bg-gray-100" />
         <div className="shrink-0 mt-1 relative z-10">
            <div className={`w-[20px] h-[20px] rounded-full ${sev === 'Critical' ? 'bg-red-600' : 'bg-orange-500'} flex items-center justify-center ring-4 ring-white`}>
               <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
         </div>
         <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
               <h4 className="text-[17px] font-bold text-gray-900 tracking-tight">{title}</h4>
               <span className={`text-[11px] font-black uppercase tracking-widest ${sev === 'Critical' ? 'text-red-600' : 'text-orange-500'}`}>{sev} severity</span>
            </div>
            
            <p className="text-[14px] font-medium text-gray-600 leading-relaxed mb-4 text-justify">{detail}</p>
            
            <div className="grid grid-cols-3 gap-8">
               <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 mb-0.5">Location</span>
                  <span className="text-[12px] font-bold text-gray-800">{location}</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 mb-0.5">Analysis layer</span>
                  <span className="text-[12px] font-bold text-[#007AFF]">{category}</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 mb-0.5">Primary risk</span>
                  <span className="text-[12px] font-bold text-gray-800">{riskImpact}</span>
               </div>
            </div>
         </div>
      </div>
   );
}
