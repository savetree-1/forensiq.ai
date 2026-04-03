import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "@/views/pages/HomePage";
import { HowItWorksPage } from "@/views/pages/HowItWorksPage";
import { UploadQueuePage } from "@/views/pages/UploadQueuePage";
import { SignatureLabPage } from "@/views/pages/SignatureLabPage";
import { MetadataDiffPage } from "@/views/pages/MetadataDiffPage";
import { FindingsPage } from "@/views/pages/FindingsPage";
import { AuditTrailPage } from "@/views/pages/AuditTrailPage";
import { RiskTimelinePage } from "@/views/pages/RiskTimelinePage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/try-it-now" element={<Navigate to="/dashboard/metadata-diff" replace />} />
      <Route path="/dashboard" element={<Navigate to="/dashboard/metadata-diff" replace />} />
      <Route path="/dashboard/upload-queue" element={<UploadQueuePage />} />
      <Route path="/dashboard/signature-lab" element={<SignatureLabPage />} />
      <Route path="/dashboard/metadata-diff" element={<MetadataDiffPage />} />
      <Route path="/dashboard/risk-timeline" element={<RiskTimelinePage />} />
      <Route path="/dashboard/findings" element={<FindingsPage />} />
      <Route path="/dashboard/audit-trail" element={<AuditTrailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
