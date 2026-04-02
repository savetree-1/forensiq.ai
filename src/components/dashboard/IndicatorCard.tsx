import { useState } from "react";
import { ChevronDown, ChevronUp, Share } from "lucide-react";

export function IndicatorCard() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="bg-[#FFF1F1] rounded-lg border border-red-200 shadow-sm overflow-hidden p-4">
      <div className="flex items-center justify-between mb-3 border-b border-red-100/50 pb-2">
        <h3 className="text-[#E5484D] font-bold text-sm [font-family:'SF_Pro_Rounded',-apple-system,system-ui,sans-serif]">Determining indicator detected!</h3>
        <button 
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-gray-700 text-xs hover:text-gray-900 font-medium [font-family:'SF_Pro_Rounded' ...]"
        >
          <Share size={12} className="rotate-90 scale-x-[-1]" />
          Hide {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {expanded && (
        <p className="text-gray-800 text-[13px] leading-relaxed">
          Based on the previously studied data patterns, we are almost certainly that
          we classify this document as dangerous. But the final decision is up to you.
        </p>
      )}
    </div>
  );
}
