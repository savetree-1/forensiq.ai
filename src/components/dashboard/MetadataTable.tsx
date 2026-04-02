import { useState, useMemo } from "react";
import { CheckCircle2, XCircle, ChevronLeft, ChevronRight, Search } from "lucide-react";

const rows = [
  { id: 1, original: "Signature of issuing authority", newText: "Annotation overlay", status: "error" as const, field: "Page 3, Block 7" },
  { id: 2, original: "Google Invoices from Marketing", newText: "Annotation reference", status: "success" as const, field: "Page 1, Block 2" },
  { id: 3, original: "Hubspot CRM Export Docs", newText: "Annotation metadata", status: "success" as const, field: "Page 2, Block 4" },
  { id: 4, original: "Hubspot Quarterly Summary", newText: "Annotation label", status: "success" as const, field: "Page 4, Block 1" },
  { id: 5, original: "Account holder verification", newText: "Annotation stamp", status: "error" as const, field: "Page 1, Block 9" },
  { id: 6, original: "Tax ID Confirmation", newText: "Original record", status: "success" as const, field: "Page 2, Block 1" },
  { id: 7, original: "Mailing Address Block", newText: "Modified metadata", status: "error" as const, field: "Page 1, Block 3" },
  { id: 8, original: "Income Statement Table", newText: "Valid entry", status: "success" as const, field: "Page 5, Block 2" },
];

export function MetadataTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredRows = useMemo(() => {
    return rows.filter((row) =>
      row.original.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.newText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.field.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const anomaliesCount = filteredRows.filter(r => r.status === "error").length;

  const handlePrevPage = () => setCurrentPage(p => Math.max(1, p - 1));
  const handleNextPage = () => setCurrentPage(p => Math.min(totalPages, p + 1));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-100">
        <h3 className="text-gray-900 font-bold text-base [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]">Metadata Analysis</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
            <Search size={12} className="text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search fields..."
              className="bg-transparent text-xs text-gray-700 w-24 focus:outline-none placeholder-gray-400"
            />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <button 
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-1 hover:text-gray-800 rounded hover:bg-gray-100 disabled:opacity-20"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="font-medium whitespace-nowrap">{currentPage} / {totalPages || 1}</span>
            <button 
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1 hover:text-gray-800 rounded hover:bg-gray-100 disabled:opacity-20"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto min-h-[200px]">
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="py-2.5 px-4 font-medium">Original Text</th>
              <th className="py-2.5 px-4 font-medium">New Text</th>
              <th className="py-2.5 px-4 font-medium">Location</th>
              <th className="py-2.5 px-4 font-medium text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row) => (
                <tr
                  key={row.id}
                  className={`border-t border-gray-50 transition-colors hover:bg-gray-50 ${
                    row.status === "error" ? "bg-red-50/30" : ""
                  }`}
                >
                  <td className="py-3 px-4 text-gray-900 font-medium">{row.original}</td>
                  <td className="py-3 px-4 text-gray-500">{row.newText}</td>
                  <td className="py-3 px-4 text-gray-400 text-xs font-mono">{row.field}</td>
                  <td className="py-3 px-4 text-center">
                    {row.status === "error" ? (
                      <span className="inline-flex items-center gap-1 text-red-600 bg-red-100 px-2 py-0.5 rounded-full text-[11px] font-medium">
                        <XCircle size={12} /> Tampered
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-green-700 bg-green-100 px-2 py-0.5 rounded-full text-[11px] font-medium">
                        <CheckCircle2 size={12} /> Valid
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-10 text-center text-gray-400 text-sm">
                  No matches found for "{searchQuery}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-gray-100 bg-gray-50 text-xs text-gray-500">
        <span>Showing {paginatedRows.length} of {filteredRows.length} results</span>
        <span className={anomaliesCount > 0 ? "text-red-500 font-semibold" : ""}>
          {anomaliesCount} anomalies detected
        </span>
      </div>
    </div>
  );
}
