import { RiskBanner } from "./RiskBanner";
import { IndicatorCard } from "./IndicatorCard";
import { MetadataTable } from "./MetadataTable";

export function LeftPanel() {
  return (
    <div className="w-[42%] flex flex-col gap-5 overflow-y-auto pr-1 h-full scroll-smooth">
      <RiskBanner />
      <IndicatorCard />
      <MetadataTable />
    </div>
  );
}
