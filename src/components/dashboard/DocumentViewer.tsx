import { useState, useRef } from "react";
import { ZoomIn, ZoomOut, RotateCw, Maximize, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";

export function DocumentViewer() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [finding, setFinding] = useState(2);
  const totalPages = 28;
  const totalFindings = 6;

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current?.requestFullscreen().catch((err) => {
        alert(`Error escaping fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleNextPage = () => setPage((p) => Math.min(p + 1, totalPages));
  const handlePrevPage = () => setPage((p) => Math.max(p - 1, 1));
  const handleZoomIn = () => setZoom((z) => Math.min(z + 10, 200));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 10, 50));
  const handleRotate = () => setRotation((r) => (r + 90) % 360);
  const handleNextFinding = () => setFinding((f) => Math.min(f + 1, totalFindings));
  const handlePrevFinding = () => setFinding((f) => Math.max(f - 1, 1));

  return (
    <div ref={viewerRef} className="bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col h-full min-h-[600px] overflow-hidden">
      {/* Header Controls */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100 bg-[#F9FAFB]/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg px-2 py-1 shadow-sm">
            <button 
              onClick={handlePrevPage}
              className="hover:text-blue-600 transition-colors disabled:opacity-30" 
              disabled={page === 1}
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs font-semibold px-1 whitespace-nowrap">Page {page} / {totalPages}</span>
            <button 
              onClick={handleNextPage}
              className="hover:text-blue-600 transition-colors disabled:opacity-30" 
              disabled={page === totalPages}
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
            <button 
              onClick={handleZoomIn}
              className="p-1 hover:text-blue-600 transition-colors text-gray-400"
            >
              <ZoomIn size={16} />
            </button>
            <span className="text-[10px] text-gray-400 px-1 font-bold w-10 text-center">{zoom}%</span>
            <button 
              onClick={handleZoomOut}
              className="p-1 hover:text-blue-600 transition-colors text-gray-400"
            >
              <ZoomOut size={16} />
            </button>
            <div className="w-px h-4 bg-gray-100 mx-1" />
            <button 
              onClick={handleRotate}
              className="p-1 hover:text-blue-600 transition-colors text-gray-400"
            >
              <RotateCw size={16} />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleFullScreen}
            className="p-2 hover:bg-gray-50 text-gray-500 rounded-lg transition-all active:scale-95" 
            title={document.fullscreenElement ? "Exit Fullscreen" : "Fullscreen"}
          >
            <Maximize size={16} />
          </button>
        </div>
      </div>

      {/* PDF Contents Area */}
      <div className="flex-1 bg-[#F3F4F6] p-8 overflow-y-auto relative flex justify-center">
        <div 
          className="bg-white w-full max-w-3xl min-h-[1000px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100 p-12 flex flex-col mx-auto transition-all duration-300 origin-top"
          style={{ 
            transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
          }}
        >
          {/* Header */}
          <div className="w-full flex justify-between items-start mb-10 pb-6 border-b border-gray-50">
            <div>
              <h1 className="text-4xl text-[#003DA5] font-black tracking-tighter">citi</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1 ml-0.5">Citibank Mortgage Services</p>
            </div>
            <div className="text-right text-[11px] text-gray-500 font-medium leading-relaxed">
              <p className="text-gray-900 font-bold border-b border-gray-100 mb-1 pb-1">STATEMENT OF ACCOUNT</p>
              <p>ACCOUNT: ****9201</p>
              <p>PERIOD: SEP 01, 2013 - OCT 01, 2013</p>
              <p>REF NO: CF-1029-92X</p>
              <p className="mt-2 text-[#003DA5] font-bold text-lg">$1,041.57 DUE</p>
            </div>
          </div>

          <div className="w-full bg-[#003DA5] text-white px-5 py-2.5 text-xs font-bold rounded-sm mb-8 flex justify-between items-center shadow-lg">
            <span className="uppercase tracking-widest text-[10px]">Mortgage Account Information</span>
            <span className="text-[10px] opacity-80 font-normal tracking-normal">CUSTOMER SERVICE: +1 (800) 283-7918</span>
          </div>
          
          <div className="grid grid-cols-2 gap-12 mb-10 text-[13px]">
            <div className="space-y-4">
              <div className="flex justify-between items-end border-b border-gray-50 pb-1"><span className="text-gray-400 font-medium">Principal Balance</span><span className="font-bold text-gray-900">$189,450.00</span></div>
              <div className="flex justify-between items-end border-b border-gray-50 pb-1"><span className="text-gray-400 font-medium">Interest Rate</span><span className="font-bold text-gray-900">3.875%</span></div>
              <div className="flex justify-between items-end border-b border-gray-50 pb-1"><span className="text-gray-400 font-medium">Escrow Balance</span><span className="font-bold text-gray-900">$2,847.12</span></div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end border-b border-gray-50 pb-1"><span className="text-gray-400 font-medium">Next Payment Due</span><span className="font-bold text-[#E5484D]">OCT 24, 2023</span></div>
              <div className="flex justify-between items-end border-b border-gray-50 pb-1"><span className="text-gray-400 font-medium">Monthly Installment</span><span className="font-bold text-gray-900">$641.57</span></div>
              <div className="flex justify-between items-end border-b border-gray-50 pb-1"><span className="text-gray-400 font-medium">Property Tax Pmt</span><span className="font-bold text-gray-900">$400.00</span></div>
            </div>
          </div>

          <div className="relative w-full p-8 border-2 border-[#E5484D]/40 border-dashed rounded-xl bg-[#FFF1F1]/30 mb-10">
            <div className="absolute -top-3.5 left-6 bg-[#E5484D] text-white text-[10px] px-3 py-1 rounded-full font-black tracking-widest shadow-lg uppercase">
              Manipulation Detected
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#E5484D] rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-red-500/20">
                <AlertCircle size={22} className="text-white" />
              </div>
              <div className="space-y-4 w-full">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-black uppercase tracking-tighter mb-1">Detected Modified Content:</span>
                  <p className="text-gray-800 font-bold text-base leading-none">External Wire Credit - Global Funds</p>
                  <p className="text-[#E5484D] font-mono text-sm mt-1 font-black">+$24,000.00</p>
                </div>
                <div className="h-px bg-gray-100 w-full" />
                <div className="bg-red-50 border border-red-100 rounded-lg p-2 flex items-center justify-between text-[11px] font-mono text-[#E5484D]">
                   <span className="font-bold">SUSPECTED INJECTION</span>
                   <span className="px-2 py-0.5 bg-[#E5484D] text-white rounded text-[9px] font-black uppercase tracking-widest">Type-4 Layer</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full mb-10">
             <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Recent Transaction History</h3>
             <div className="space-y-3">
                {[
                  { desc: "September Mortgage Auto-Debit", date: "SEP 24", amt: "-$1,041.57", type: "db" },
                  { desc: "Escrow Disbursement - Property Tax", date: "SEP 18", amt: "-$400.00", type: "db" },
                  { desc: "Interest Adjustment Credit", date: "SEP 05", amt: "+$42.10", type: "cr" },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-lg text-[13px]">
                    <div className="flex flex-col"><span className="font-bold text-gray-800">{row.desc}</span><span className="text-[10px] text-gray-400 uppercase font-black">{row.date}</span></div>
                    <span className={`font-mono font-bold ${row.type === 'cr' ? 'text-green-600' : 'text-gray-900'}`}>{row.amt}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Panel */}
      <div className="bg-white border-t border-gray-100 px-6 py-3.5 flex justify-between items-center text-sm shadow-[0_-5px_25px_rgba(0,0,0,0.02)]">
        <div>
          <span className="font-black text-[#E5484D] uppercase text-xs tracking-tight">Content Flagged</span>
          <p className="text-[11px] text-gray-400 font-medium">Digital manipulation detected on page 1, block 7</p>
        </div>
        <div className="flex items-center gap-4 text-gray-500">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-bold bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
            <button 
              onClick={handlePrevFinding}
              className="cursor-pointer hover:text-gray-900 p-0.5 disabled:opacity-20"
              disabled={finding === 1}
            >
              <ChevronLeft size={16} />
            </button>
            <span className="tracking-tighter">FINDING {finding} <span className="text-gray-300">/</span> {totalFindings}</span>
            <button 
              onClick={handleNextFinding}
              className="cursor-pointer hover:text-gray-900 p-0.5 disabled:opacity-20"
              disabled={finding === totalFindings}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
