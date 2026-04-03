export interface ReportMetadata {
  caseId: string;
  verdict: string;
  confidence: string;
  date: string;
  engine: string;
}

export interface ReportAnomaly {
  title: string;
  detail: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  location: string;
}

export interface ReportData {
  metadata: ReportMetadata;
  provenance: {
    filename: string;
    size: string;
    architecture: string;
    mime: string;
    hashes: {
      sha256: string;
      md5?: string;
    }
  };
  anomalies: ReportAnomaly[];
  investigator: {
    name: string;
    id: string;
  }
}

/**
 * Mock data representing the latest forensic analysis
 */
export const MOCK_REPORT_DATA: ReportData = {
  metadata: {
    caseId: "FQ-2023-8992A-SECURED",
    verdict: "Severe",
    confidence: "0.00%",
    date: "24 OCT 2023 09:18 EST",
    engine: "Neural v4.22"
  },
  provenance: {
    filename: "Account_statement_lending_citi.pdf",
    size: "2.4 MB (2,458,112 bytes)",
    architecture: "Adobe PDF v1.7 (ISO-32000)",
    mime: "application/pdf",
    hashes: {
      sha256: "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc3279c1",
      md5: "e4d909c290d0fb1ca068ffaddf22cbd0"
    }
  },
  anomalies: [
    {
      title: "Font Substitution Signature Block",
      detail: "Primary text stream declared as 'Helvetica Neue' was rendered using an injected 'Arial' subset. This mismatch confirms retroactive layer modification post-issuance.",
      severity: "Critical",
      location: "Page 03 // Block 07"
    },
    {
      title: "Unauthorized Vector Overlay",
      detail: "Numerical entry ($24,000.00) exhibits a distinct Z-index coordinate mismatch against the primary table architecture. Indicates a visual insertion on top of original data.",
      severity: "High",
      location: "Page 02 // Block 12"
    }
  ],
  investigator: {
    name: "John Doe",
    id: "FIQ-8900-X-SECURED"
  }
};
