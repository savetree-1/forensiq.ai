import { useState, useRef } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import {
  Upload,
  FileText,
  CheckCircle2,
  Trash2,
  Eye,
  Search,
  Filter,
  ChevronRight,
  Plus,
  X,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

type FileStatus = "processing" | "complete" | "error" | "queued";

interface QueueFile {
  id: number;
  name: string;
  size: string;
  status: FileStatus;
  progress: number;
  risk: "High" | "Medium" | "Low" | null;
  uploadedAt: string;
  pages: number;
  extension: string;
}

const initialFiles: QueueFile[] = [
  { id: 1, name: "Account_statement_lending_citi.pdf", size: "2.4 MB", status: "complete", progress: 100, risk: "High", uploadedAt: "2 min ago", pages: 28, extension: "PDF" },
  { id: 2, name: "Income_verification_Q3_2023.pdf", size: "1.1 MB", status: "complete", progress: 100, risk: "Medium", uploadedAt: "5 min ago", pages: 12, extension: "PDF" },
  { id: 3, name: "Tax_return_2022_amended.pdf", size: "3.7 MB", status: "processing", progress: 62, risk: null, uploadedAt: "Just now", pages: 44, extension: "PDF" },
  { id: 4, name: "Employment_letter_HSBC.pdf", size: "0.8 MB", status: "error", progress: 0, risk: null, uploadedAt: "8 min ago", pages: 3, extension: "PDF" },
  { id: 5, name: "Bank_statement_Wells_Fargo.pdf", size: "1.9 MB", status: "queued", progress: 0, risk: null, uploadedAt: "10 min ago", pages: 18, extension: "PDF" },
];

export function UploadQueuePage() {
  const [files, setFiles] = useState<QueueFile[]>(initialFiles);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FileStatus | "all">("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredFiles = files.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || f.status === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: files.length,
    complete: files.filter(f => f.status === "complete").length,
    processing: files.filter(f => f.status === "processing").length,
    error: files.filter(f => f.status === "error").length,
  };

  const processingFiles = files.filter(f => f.status === "processing");

  const handleDelete = (id: number) => setFiles(f => f.filter(file => file.id !== id));

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = Array.from(e.dataTransfer.files);
    const newFiles: QueueFile[] = dropped.map((f, i) => ({
      id: Date.now() + i,
      name: f.name,
      size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
      status: "processing" as const,
      progress: 0,
      risk: null,
      uploadedAt: "Just now",
      pages: 0,
      extension: f.name.split('.').pop()?.toUpperCase() || "File",
    }));
    setFiles(prev => [...newFiles, ...prev]);
  };

  const handleBrowse = () => fileInputRef.current?.click();

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files);
    const newFiles: QueueFile[] = selected.map((f, i) => ({
      id: Date.now() + i,
      name: f.name,
      size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
      status: "processing" as const,
      progress: 0,
      risk: null,
      uploadedAt: "Just now",
      pages: 0,
      extension: f.name.split('.').pop()?.toUpperCase() || "File",
    }));
    setFiles(prev => [...newFiles, ...prev]);
  };

  return (
    <div className="flex h-screen bg-[#0b0f24] font-inter overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto relative">
        {/* Abstract Background Gradient */}
        <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-br from-[#1c234a]/40 to-transparent pointer-events-none" />

        <div className="p-8 max-w-[1600px] mx-auto w-full space-y-6 relative z-10">
          
          {/* ─── NAVIGATION BAR ────────────────────────────────────── */}
          <div className="flex items-center justify-between h-8 mt-2">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="hover:text-white cursor-pointer transition-colors">Home</span>
              <ChevronRight size={14} className="text-gray-500" />
              <span className="text-gray-200 font-medium [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]">Upload Queue</span>
            </div>
            
            <button
              onClick={handleBrowse}
              className="flex items-center gap-2 bg-transparent border border-white/20 hover:bg-white/5 active:scale-95 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all"
            >
              <Plus size={16} />
              Upload document
            </button>
          </div>

          {/* ─── METRICS CARDS (APPLE HEALTH STYLE) ───────────────── */}
          <section className="grid grid-cols-4 gap-4 pb-2">
            {([
              { id: "all", label: "Total files", value: stats.total, color: "text-[#FA114F]", icon: FileText, time: "10:00 AM", graphic: "bars-red" },
              { id: "complete", label: "Completed", value: stats.complete, color: "text-[#34C759]", icon: CheckCircle2, time: "9:41 AM", graphic: "ring-green" },
              { id: "processing", label: "Processing", value: stats.processing, color: "text-[#007AFF]", icon: RefreshCw, time: "10:05 AM", graphic: "pulse-blue" },
              { id: "error", label: "Errors", value: stats.error, color: "text-[#FF9500]", icon: AlertTriangle, time: "Yesterday", graphic: "graph-orange" },
            ] as const).map(stat => {
              const Icon = stat.icon;
              return (
                <button
                  key={stat.id}
                  onClick={() => setFilter(stat.id as any)}
                  className="relative text-left bg-white p-4 rounded-[20px] transition-all duration-300 hover:scale-[1.02] shadow-[0_2px_12px_rgba(0,0,0,0.06)] [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <Icon size={16} className={stat.color} strokeWidth={2.5} />
                      <span className={`text-[15px] font-bold tracking-tight ${stat.color}`}>{stat.label}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-medium text-[#8E8E93]">{stat.time}</span>
                      <ChevronRight size={14} className="text-[#C7C7CC]" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <h3 className="text-[34px] font-bold tracking-tight text-black leading-none">{stat.value}</h3>
                      <span className="text-[15px] font-medium text-[#8E8E93]">
                        {stat.id === "all" ? "files" : 
                         stat.id === "complete" ? "docs" : 
                         stat.id === "processing" ? "scans" : "flags"}
                      </span>
                    </div>

                    {/* Relevant Graphics */}
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

                      {stat.graphic === "graph-orange" && (
                        <div className="w-12 h-8 flex items-center relative overflow-hidden">
                           <svg viewBox="0 0 100 40" className="w-full h-full">
                              <path d="M0 35 L20 25 L40 30 L60 10 L80 15 L100 5" fill="none" stroke="#FF9500" strokeWidth="4" strokeLinecap="round" />
                              <path d="M0 35 L20 25 L40 30 L60 10 L80 15 L100 5 L100 40 L0 40 Z" fill="url(#grad)" opacity="0.1" />
                              <defs>
                                <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                  <stop offset="0%" stopColor="#FF9500" />
                                  <stop offset="100%" stopColor="transparent" />
                                </linearGradient>
                              </defs>
                           </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </section>

          {/* ─── TWO COLUMN WHITE CARD: UPLOAD & PROCESSING ──────── */}
          <section className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col md:flex-row h-[360px]">
            {/* Left: Drag & Drop Area */}
            <div className="w-full md:w-[45%] p-8 border-r border-gray-100 flex flex-col">
              <h2 className="text-xl font-bold text-gray-800 mb-6 [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]">File Upload</h2>
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`flex-1 border border-dashed rounded-xl flex flex-col items-center justify-center p-6 transition-all duration-300 ${
                  isDragging
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 bg-gray-50/50 hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                  isDragging ? "bg-blue-100 text-blue-600" : "bg-white border border-gray-200 text-gray-400 shadow-sm"
                }`}>
                  <Upload size={24} />
                </div>
                <h4 className="text-sm font-medium text-gray-800">Drag files to upload</h4>
                <p className="text-xs text-gray-500 mt-1 mb-4">Or click to select files</p>
                <button
                  onClick={handleBrowse}
                  className="px-6 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-95 text-white text-sm font-semibold rounded-lg transition-all shadow-md shadow-blue-500/20"
                >
                  Browse files
                </button>
              </div>
              <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileInput} />
            </div>

            {/* Right: Active Uploads */}
            <div className="flex-1 bg-gray-50/30 flex flex-col">
              <div className="px-6 py-4 border-b border-gray-100 bg-white/50 flex items-center justify-between">
                <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Currently uploading</h5>
                <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full">{processingFiles.length}</span>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-3">
                {processingFiles.length > 0 ? (
                  processingFiles.map(file => (
                    <div key={file.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-start justify-between gap-4">
                        <div className="w-8 h-10 rounded border border-gray-200 bg-gray-50 flex items-center justify-center shrink-0">
                          <span className="text-[9px] font-bold text-gray-500">{file.extension}</span>
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                          <div className="flex items-center justify-between mb-1.5">
                            <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                            <p className="text-xs text-gray-500 ml-4">{file.size}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${file.progress}%` }} />
                            </div>
                            <span className="text-[11px] font-medium text-gray-500 w-8">{file.progress}%</span>
                          </div>
                        </div>
                        <button onClick={() => handleDelete(file.id)} className="text-gray-400 hover:text-red-500 p-1">
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-3">
                    <CheckCircle2 size={32} strokeWidth={1.5} className="text-gray-300" />
                    <p className="text-sm font-medium text-gray-500">No active uploads</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ─── DOCUMENT LIBRARY TABLE ─────────────────────────── */}
          <section className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col">
            <header className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]">Document Library</h3>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all shadow-sm">
                  <Search size={14} className="text-gray-400" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search documents..."
                    className="bg-transparent text-sm text-gray-700 w-48 focus:outline-none placeholder-gray-400"
                  />
                </div>
                
                <div className="relative">
                  <button
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    className="flex items-center gap-2 text-sm font-medium border border-gray-200 px-3 py-1.5 rounded-lg text-gray-600 bg-white hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    <Filter size={14} />
                    {filter === "all" ? "Filter" : filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                  {showFilterDropdown && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 shadow-xl rounded-lg z-50 py-1">
                      {(["all", "complete", "processing", "error", "queued"] as const).map((f) => (
                        <button
                          key={f}
                          onClick={() => { setFilter(f); setShowFilterDropdown(false); }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                            filter === f ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {f === "all" ? "All statuses" : f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </header>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="py-3 px-6 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Original text</th>
                    <th className="py-3 px-6 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Size</th>
                    <th className="py-3 px-6 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="py-3 px-6 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Risk</th>
                    <th className="py-3 px-6 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Uploaded</th>
                    <th className="py-3 px-6 text-[11px] font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredFiles.map((file) => (
                    <tr key={file.id} className="hover:bg-gray-50/50 transition-all">
                      <td className="py-4 px-6">
                        <p className="text-sm font-semibold text-gray-800">{file.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{file.pages} pages</p>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600 font-medium">{file.size}</td>
                      <td className="py-4 px-6">
                        <span className={`text-sm font-semibold ${
                          file.status === "complete" ? "text-emerald-600" :
                          file.status === "processing" ? "text-blue-600" :
                          file.status === "error" ? "text-red-600" : "text-gray-500"
                        }`}>
                          {file.status === "complete" ? "Complete" : file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {file.risk ? (
                          <span className={`text-sm font-semibold ${
                            file.risk === "High" ? "text-red-600" :
                            file.risk === "Medium" ? "text-amber-500" : "text-emerald-600"
                          }`}>
                            {file.risk}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">—</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-xs text-gray-500">{file.uploadedAt}</td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-3">
                          {file.status === "complete" && (
                            <button
                              onClick={() => window.location.href = "/dashboard"}
                              className="text-gray-400 hover:text-blue-600 transition-colors"
                              title="View Document"
                            >
                              <Eye size={16} />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(file.id)}
                            className="text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete Document"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredFiles.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-16 text-center">
                        <p className="text-sm text-gray-500">No documents found.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span>Showing {filteredFiles.length} results</span>
                {filteredFiles.filter(f => f.risk === 'High').length > 0 && (
                  <span className="font-semibold text-red-500">{filteredFiles.filter(f => f.risk === 'High').length} high risk detected</span>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
