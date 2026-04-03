import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { ReportData } from "../models/ReportData";

/**
 * Generates a high-severity formal PDF directly in the browser
 * This replicates the professional "Sentinel Prism" layout without requiring a LaTeX engine.
 */
export async function downloadForensicPdf(data: ReportData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // --- Constants and Colors ---
  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const themeBlue = [0, 122, 255]; // #007AFF
  const themeDark = [11, 15, 42];  // #0B0F2A
  const textGray = [80, 80, 80];
  const severeRed = [250, 17, 79];

  // --- 1. Top Branding Strip (Auth Bar) ---
  doc.setFillColor(themeBlue[0], themeBlue[1], themeBlue[2]);
  doc.rect(0, 0, pageWidth, 8, 'F');

  // --- 2. Header Content ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(themeDark[0], themeDark[1], themeDark[2]);
  doc.text("Forensic Extraction Report", margin, 25);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(textGray[0], textGray[1], textGray[2]);
  doc.text(`Official Analysis Case: ${data.metadata.caseId}`, margin, 31);
  doc.text(`Issuance Timestamp: ${data.metadata.date}`, margin, 36);

  // Status Badge
  doc.setFillColor(255, 235, 235);
  doc.setDrawColor(severeRed[0], severeRed[1], severeRed[2]);
  doc.roundedRect(pageWidth - margin - 45, 20, 45, 12, 1, 1, 'FD');
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(severeRed[0], severeRed[1], severeRed[2]);
  doc.text("VERIFIED FORGERY", pageWidth - margin - 40, 26);
  doc.setFontSize(7);
  doc.setTextColor(textGray[0], textGray[1], textGray[2]);
  doc.text("High Severity Protocol", pageWidth - margin - 40, 30);

  // --- 3. Executive Summary Bar ---
  doc.setFillColor(245, 245, 248);
  doc.rect(margin, 45, pageWidth - (margin * 2), 35, 'F');
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(textGray[0], textGray[1], textGray[2]);
  doc.text("1.0 EXECUTIVE SUMMARY", margin + 5, 52);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(50, 50, 50);
  const summaryText = `Examination of asset ${data.provenance.filename} has confirmed severe structural compromise. The investigative framework has isolated critical typographical injections and layering anomalies. Collective findings render the document as COMPROMISED.`;
  const splitSummary = doc.splitTextToSize(summaryText, pageWidth - (margin * 2) - 10);
  doc.text(splitSummary, margin + 5, 58);

  // --- 4. Technical Provenance Table ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(textGray[0], textGray[1], textGray[2]);
  doc.text("2.0 TECHNICAL PROVENANCE", margin, 95);

  const provenanceData = [
    ["Source Filename", data.provenance.filename],
    ["Binary Size", data.provenance.size],
    ["Architecture", data.provenance.architecture],
    ["MIME Type", data.provenance.mime],
    ["SHA-256 Hash", data.provenance.hashes.sha256]
  ];

  (doc as any).autoTable({
    startY: 100,
    head: [],
    body: provenanceData,
    margin: { left: margin },
    theme: 'plain',
    styles: { fontSize: 9, cellPadding: 3, textColor: [40, 40, 40] },
    columnStyles: { 0: { fontStyle: 'bold', textColor: textGray, width: 40 } }
  });

  // --- 5. Diagnostic Index ---
  const currentY = (doc as any).lastAutoTable.finalY + 15;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(textGray[0], textGray[1], textGray[2]);
  doc.text("3.0 FORENSIC DIAGNOSTIC INDEX", margin, currentY);

  const anomalyRows = data.anomalies.map(a => [
    { content: `${a.title.toUpperCase()}\n${a.severity} Severity Vector`, styles: { fontStyle: 'bold', textColor: severeRed } },
    { content: `${a.detail}\nLocation: ${a.location}`, styles: { textColor: [60,60,60] } }
  ]);

  (doc as any).autoTable({
    startY: currentY + 5,
    body: anomalyRows,
    margin: { left: margin },
    theme: 'grid',
    styles: { fontSize: 8, cellPadding: 5 },
    columnStyles: { 0: { width: 50 }, 1: { cellWidth: 'auto' } }
  });

  // --- 6. Signature Block ---
  const footerY = doc.internal.pageSize.getHeight() - 40;
  doc.setDrawColor(200, 200, 200);
  doc.line(pageWidth - 80, footerY, pageWidth - margin, footerY);
  
  doc.setFont("times", "italic");
  doc.setFontSize(18);
  doc.setTextColor(themeDark[0], themeDark[1], themeDark[2]);
  doc.text(data.investigator.name, pageWidth - 70, footerY - 5);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(textGray[0], textGray[1], textGray[2]);
  doc.text("Authorized Investigator", pageWidth - 75, footerY + 5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.text(`ID: ${data.investigator.id}`, pageWidth - 75, footerY + 9);

  // --- 7. Formal Footer Strip ---
  doc.setFillColor(themeDark[0], themeDark[1], themeDark[2]);
  doc.rect(0, pageWidth * 1.3, pageWidth, 15, 'F'); // Roughly at the bottom
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text("FORENSIQ FORENSIC DIVISION // SECURE OUTPUT", margin, doc.internal.pageSize.getHeight() - 8);
  doc.text("STRICTLY CONFIDENTIAL", pageWidth - margin - 40, doc.internal.pageSize.getHeight() - 8);

  // --- Final Download ---
  doc.save(`ForensIQ_Report_${data.metadata.caseId}.pdf`);
}
