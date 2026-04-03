import { Sidebar } from "@/components/dashboard/Sidebar";
import { Printer, ShieldAlert, AlertTriangle, FileText, Cpu, Layout, FileSearch, Hash } from "lucide-react";
import { motion } from "framer-motion";

export function ReportPage() {
  return (
    <div className="flex h-screen bg-[#0b0f24] font-inter overflow-hidden text-white/90">
      <Sidebar />

      <div className="flex-1 overflow-y-auto relative bg-[#0b0f24] print:bg-white print:overflow-visible">
        
        {/* Floating Action Bar (Hidden when printing via Tailwind 'print:hidden') */}
        <div className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-[#0b0f24]/80 backdrop-blur-md border-b border-white/5 shadow-2xl print:hidden">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                 <FileText size={16} className="text-[#007AFF]" />
              </div>
              <div>
                 <h2 className="text-[13px] font-bold text-white tracking-tight">Final Diagnostics Report</h2>
                 <p className="text-[11px] font-medium text-gray-400">Comprehensive Forensic Analysis Document</p>
              </div>
           </div>
           
           <div className="flex items-center gap-3 space-x-2">
              <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 px-6 py-2 bg-[#007AFF] hover:bg-[#007AFF]/80 text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all shadow-lg shadow-[#007AFF]/20"
              >
                <Printer size={14} />
                Print / Export PDF
              </button>
           </div>
        </div>

        {/* Report Document Canvas */}
        <div className="relative py-12 px-8 flex justify-center pb-32 print:p-0 print:py-0">
          
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, ease: "easeOut" }}
             className="w-full max-w-[900px] bg-white print:shadow-none shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden text-gray-900 border border-gray-200 print:border-none [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]"
          >
             {/* 1. Header / Letterhead */}
             <div className="px-14 pt-16 pb-8 border-b-4 border-gray-900 flex items-start justify-between">
                <div>
                   <h1 className="text-[32px] font-black tracking-tight text-gray-900 uppercase leading-none mb-2">Diagnostic Report</h1>
                   <p className="text-[12px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Official Document Authentication Record</p>
                   
                   <div className="flex items-center gap-6 text-[11px] font-bold text-gray-400 mt-6">
                      <div>CASE ID: <span className="text-gray-900">FQ-2023-8992A</span></div>
                      <div>DATE: <span className="text-gray-900">24 OCT 2023 09:18 EST</span></div>
                      <div>ISSUER: <span className="text-gray-900">ForensIQ.ai Auto-Engine v4.2</span></div>
                   </div>
                </div>
                <div className="text-right">
                   <img src="/src/assets/branding/image copy 2.png" alt="ForensIQ Logo" className="h-10 invert opacity-90 mb-2 ml-auto" />
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-4">DO NOT DISTRIBUTE</p>
                </div>
             </div>

             {/* 2. Executive Summary & Verdict Banner */}
             <div className="px-14 py-10 bg-gray-50 border-b border-gray-200">
                <div className="flex flex-col md:flex-row items-stretch gap-8">
                   
                   <div className="flex-1">
                      <h3 className="text-[11px] font-black uppercase tracking-[0.1em] text-gray-400 mb-2">1.0 Executive Summary</h3>
                      <p className="text-[14px] font-medium text-gray-700 leading-relaxed text-justify">
                         This document, designated <i>Account_statement_lending_citi.pdf</i>, underwent deep structural, behavioral, and metadata forensic extraction via the ForensIQ Neural framework. Analysis concludes a **severe probability of synthetic forgery**, specifically locating unauthorized overlay injections intersecting the primary financial ledger, and digital typographical substitution masking native data inputs. The document should be treated as compromised.
                      </p>
                   </div>

                   <div className="w-72 shrink-0 bg-red-50 border border-red-200 rounded-2xl p-6 flex flex-col justify-center relative overflow-hidden">
                      <div className="absolute -right-4 -top-4 opacity-5 pointer-events-none">
                         <ShieldAlert size={120} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.15em] text-red-500 mb-1">Final Risk Verdict</span>
                      <h2 className="text-[28px] font-black tracking-tight text-red-600 uppercase leading-none mb-1">SEVERE</h2>
                      <div className="flex items-center justify-between mt-4 bg-white/50 px-3 py-2 rounded border border-red-100">
                         <span className="text-[11px] font-bold text-red-900">Confidence Score:</span>
                         <span className="text-[14px] font-black text-red-600 tracking-tight">0%</span>
                      </div>
                   </div>

                </div>
             </div>

             {/* 3. Document Provenance / File Specs */}
             <div className="px-14 py-10 border-b border-gray-100">
                <h3 className="text-[11px] font-black uppercase tracking-[0.1em] text-gray-400 mb-6 flex items-center gap-2">
                   <FileSearch size={14} className="text-[#007AFF]"/> 2.0 Document Provenance
                </h3>
                
                <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-[13px]">
                   <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-bold text-gray-400">File Name</span>
                      <span className="font-bold text-gray-900">Account_statement_lending_citi.pdf</span>
                   </div>
                   <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-bold text-gray-400">File Size</span>
                      <span className="font-bold text-gray-900">2.4 MB (2,458,112 bytes)</span>
                   </div>
                   <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-bold text-gray-400">MIME Type</span>
                      <span className="font-bold text-gray-900">application/pdf (Version 1.7)</span>
                   </div>
                   <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-bold text-gray-400">Target Extractor</span>
                      <span className="font-bold text-gray-900">ML Engine v4.2</span>
                   </div>
                   
                   {/* Full Span Hashes */}
                   <div className="col-span-2 pt-2">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                         <div className="flex items-start gap-4 mb-2">
                            <span className="shrink-0 text-[10px] font-black uppercase text-gray-400 w-16 pt-0.5 mt-px"><Hash size={10} className="inline mr-1 pb-0.5"/> SHA-256</span>
                            <span className="font-mono text-[11px] text-gray-600 break-all leading-relaxed">8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc3279c1</span>
                         </div>
                         <div className="flex items-start gap-4">
                            <span className="shrink-0 text-[10px] font-black uppercase text-gray-400 w-16 pt-0.5 mt-px"><Hash size={10} className="inline mr-1 pb-0.5"/> MD5</span>
                            <span className="font-mono text-[11px] text-gray-600 break-all leading-relaxed">e4d909c290d0fb1ca068ffaddf22cbd0</span>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             {/* 4. Extracted Diagnostic Anomalies */}
             <div className="px-14 py-10 border-b border-gray-100">
                <h3 className="text-[11px] font-black uppercase tracking-[0.1em] text-gray-400 mb-8 flex items-center gap-2">
                   <AlertTriangle size={14} className="text-[#FA114F]" /> 3.0 Diagnostic Anomaly Index
                </h3>

                <div className="space-y-6">
                   <DetailAnomalyRow 
                     title="Font Substitution on Protocol Signature Block" 
                     category="Typography Extraction Array" 
                     detail="Forensic analysis reveals that the underlying text stream for the issuing officer is declared as 'Helvetica Neue', but the rendered bytes match an injected 'Arial' subset, indicating retroactive text manipulation."
                     sev="CRITICAL"
                     location="Page 3, Block 7"
                     riskImpact="High probability of forged identity or amount."
                   />
                   <DetailAnomalyRow 
                     title="External Wire Credit Entry Overlay" 
                     category="Vector Architecture" 
                     detail="A wire credit value of '$24,000.00' exists within a distinctly separate Z-index layering stack from the surrounding table grid. It lacks the native DPI scaling properties of the original bank ledger."
                     sev="HIGH"
                     location="Page 2, Block 12"
                     riskImpact="Identified synthetic financial inflation."
                   />
                   <DetailAnomalyRow 
                     title="System Timeline / XMP Discrepancy" 
                     category="Metadata Verification" 
                     detail="The inherent PDF stream dictionary claims a document generation timestamp of 2013-10-18. However, the embedded XMP packet registers a modification history event dated exactly within the last 24 hours."
                     sev="HIGH"
                     location="Document Root Object"
                     riskImpact="Confirmation of saved, post-export modification."
                   />
                </div>
             </div>

             {/* 5. Sub-Engine Confidence Breakdowns */}
             <div className="px-14 py-10 border-b border-gray-100">
                <h3 className="text-[11px] font-black uppercase tracking-[0.1em] text-gray-400 mb-6 flex items-center gap-2">
                   <Cpu size={14} className="text-[#AF52DE]" /> 4.0 Sub-Engine Vector Ratings
                </h3>

                <div className="grid grid-cols-3 gap-6">
                   <div className="border border-gray-100 rounded-xl p-5 bg-white shadow-sm flex flex-col justify-between">
                      <h4 className="text-[11px] font-black uppercase tracking-widest text-[#AF52DE] mb-4">Structural Integrity</h4>
                      <div>
                         <p className="text-[28px] font-bold text-gray-900 leading-none mb-1 text-red-600">12%</p>
                         <p className="text-[10px] uppercase font-bold text-gray-400">Failed Extraction</p>
                      </div>
                   </div>
                   
                   <div className="border border-gray-100 rounded-xl p-5 bg-white shadow-sm flex flex-col justify-between">
                      <h4 className="text-[11px] font-black uppercase tracking-widest text-[#007AFF] mb-4">Metadata Coherence</h4>
                      <div>
                         <p className="text-[28px] font-bold text-gray-900 leading-none mb-1 text-[#FF9500]">44%</p>
                         <p className="text-[10px] uppercase font-bold text-gray-400">Timestamp Anomalies</p>
                      </div>
                   </div>

                   <div className="border border-gray-100 rounded-xl p-5 bg-white shadow-sm flex flex-col justify-between">
                      <h4 className="text-[11px] font-black uppercase tracking-widest text-[#34C759] mb-4">Malware / Phishing</h4>
                      <div>
                         <p className="text-[28px] font-bold text-gray-900 leading-none mb-1 text-[#34C759]">100%</p>
                         <p className="text-[10px] uppercase font-bold text-gray-400">Clean / No Scripts</p>
                      </div>
                   </div>
                </div>
             </div>

             {/* 6. Signoff block */}
             <div className="px-14 pt-12 pb-16 bg-white flex items-end justify-between">
                <div>
                   <h3 className="text-[11px] font-black uppercase tracking-[0.1em] text-gray-400 mb-2">5.0 Authorisation & Chain of Custody</h3>
                   <p className="text-[12px] font-medium text-gray-500 max-w-xs leading-relaxed text-justify">
                     This report was generated securely via ForensIQ.ai API. Any manual adjustments to risk modifiers are tracked entirely within the administrative Audit Log matrix.
                   </p>
                </div>
                <div className="text-right">
                   <div className="w-56 h-14 border-b-2 border-gray-300 mx-auto relative flex items-center justify-center">
                      <span className="font-[Brush_Script_MT] text-[28px] text-blue-900 opacity-60 italic transform -rotate-2">John Doe</span>
                   </div>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Certified Digital Investigator</p>
                   <p className="text-[10px] font-bold text-gray-400">Forensic ID: FIQ-8900X</p>
                </div>
             </div>

             {/* Footer Print Only */}
             <div className="px-14 py-4 bg-gray-900 flex justify-between items-center text-[10px] text-gray-400 font-medium">
                <span>Ref: FQ-2023-8992A</span>
                <span>Page 1 of 1</span>
                <span>Generated via ForensIQ.ai Proprietary ML Network</span>
             </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
}

function DetailAnomalyRow({ title, category, detail, sev, location, riskImpact }: { title: string, category: string, detail: string, sev: string, location: string, riskImpact: string }) {
   return (
      <div className="flex items-stretch gap-6 pb-6 border-b border-gray-100 last:border-b-0 last:pb-0">
         <div className="shrink-0 mt-1">
            <div className={`w-8 h-8 rounded-full border-2 border-red-100 bg-red-50 flex items-center justify-center`}>
               <AlertTriangle size={14} className="text-red-600" strokeWidth={3} />
            </div>
         </div>
         <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
               <div>
                  <h4 className="text-[15px] font-black text-gray-900 tracking-tight">{title}</h4>
                  <div className="flex items-center gap-3 mt-1.5">
                     <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-[0.1em] ${sev === 'CRITICAL' ? 'bg-red-600 text-white shadow-sm' : 'bg-orange-500 text-white'}`}>{sev}</span>
                     <span className="w-1 h-1 bg-gray-300 rounded-full" />
                     <span className="text-[11px] font-bold text-[#007AFF] uppercase tracking-widest flex items-center gap-1.5"><Layout size={10} /> {category}</span>
                  </div>
               </div>
            </div>
            
            <p className="text-[13px] font-medium text-gray-700 leading-relaxed mb-4 text-justify">{detail}</p>
            
            <div className="grid grid-cols-2 gap-4 bg-gray-50 border border-gray-100 rounded-lg p-4">
               <div>
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Detected Location</span>
                  <span className="text-[12px] font-bold text-gray-800">{location}</span>
               </div>
               <div>
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Calculated Impact</span>
                  <span className="text-[12px] font-bold text-red-600">{riskImpact}</span>
               </div>
            </div>
         </div>
      </div>
   );
}
