import { Download, Share2, Printer, ChevronRight, FileText } from "lucide-react";

export function TopBar() {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "ForensIQ Analysis",
        text: "Check out this fraud analysis report.",
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "#"; // Placeholder for actual file blob
    link.download = "ForensIQ_Analysis_Report.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert("Downloading report...");
  };

  return (
    <div className="flex items-center justify-between py-3 px-1">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-[15px] [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]">
        <a href="/" className="text-gray-400 hover:text-blue-400 font-bold transition-colors">Overview</a>
        <ChevronRight size={14} className="text-gray-600" />
        <span className="text-white font-bold">John's Application</span>
      </div>

      {/* File + Actions */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 shadow-inner [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]">
          <FileText size={14} className="text-gray-400" />
          <span className="text-gray-300 text-sm font-bold">Account_statement_lending_citi.pdf</span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={handleShare}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 active:scale-95 transition-all" 
            title="Share"
          >
            <Share2 size={16} />
          </button>
          <button 
            onClick={handlePrint}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 active:scale-95 transition-all" 
            title="Print"
          >
            <Printer size={16} />
          </button>
          <button 
            onClick={handleDownload}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 active:scale-95 transition-all" 
            title="Download"
          >
            <Download size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
