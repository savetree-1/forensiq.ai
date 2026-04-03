import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "@/views/pages/HomePage";
import { HowItWorksPage } from "@/views/pages/HowItWorksPage";
import { DashboardPage } from "@/views/pages/DashboardPage";
import { UploadQueuePage } from "@/views/pages/UploadQueuePage";
import { SignatureLabPage } from "@/views/pages/SignatureLabPage";
import { MetadataDiffPage } from "@/views/pages/MetadataDiffPage";
import { FindingsPage } from "@/views/pages/FindingsPage";
import { AuditTrailPage } from "@/views/pages/AuditTrailPage";
import { RiskTimelinePage } from "@/views/pages/RiskTimelinePage";
import { ReportPage } from "@/views/pages/ReportPage";
import { LoginPage } from "@/views/pages/LoginPage";
import { useAuthStore } from "@/store/authStore";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected Forensic Laboratory Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/dashboard/upload-queue" element={<ProtectedRoute><UploadQueuePage /></ProtectedRoute>} />
      <Route path="/dashboard/signature-lab" element={<ProtectedRoute><SignatureLabPage /></ProtectedRoute>} />
      <Route path="/dashboard/metadata-diff" element={<ProtectedRoute><MetadataDiffPage /></ProtectedRoute>} />
      <Route path="/dashboard/risk-timeline" element={<ProtectedRoute><RiskTimelinePage /></ProtectedRoute>} />
      <Route path="/dashboard/findings" element={<ProtectedRoute><FindingsPage /></ProtectedRoute>} />
      <Route path="/dashboard/audit-trail" element={<ProtectedRoute><AuditTrailPage /></ProtectedRoute>} />
      <Route path="/dashboard/report" element={<ProtectedRoute><ReportPage /></ProtectedRoute>} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
