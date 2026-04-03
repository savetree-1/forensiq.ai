import { jsPDF } from "jspdf";
import autoTable, { FontStyle, Color } from "jspdf-autotable";
import { ReportData } from "../models/ReportData";

/**
 * Generates a high-severity formal PDF directly in the browser
 */
export async function downloadForensicPdf(data: ReportData) {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const themeBlue: [number, number, number] = [0, 122, 255];
    const themeDark: [number, number, number] = [11, 15, 42];
    const textGray: [number, number, number] = [102, 102, 102];
    const severeRed: [number, number, number] = [250, 17, 79];

    // --- 1. Top Branding Strip ---
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
    doc.text(`Official Analysis Case: ${data.metadata.caseId || 'N/A'}`, margin, 31);
    doc.text(`Issuance Timestamp: ${data.metadata.date || new Date().toLocaleString()}`, margin, 36);

    // Status Badge
    doc.setFillColor(255, 235, 235);
    doc.setDrawColor(severeRed[0], severeRed[1], severeRed[2]);
    doc.roundedRect(pageWidth - margin - 45, 20, 45, 12, 1, 1, 'FD');
    doc.setFont("helvetica", "bold");
    doc.setTextColor(severeRed[0], severeRed[1], severeRed[2]);
    doc.text("VERIFIED FORGERY", pageWidth - margin - 40, 26);

    // --- 3. Executive Summary ---
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

    autoTable(doc, {
      startY: 100,
      head: [],
      body: provenanceData,
      margin: { left: margin },
      theme: 'plain',
      styles: { fontSize: 9, cellPadding: 3, textColor: [40, 40, 40] as Color },
      columnStyles: { 0: { fontStyle: 'bold' as FontStyle, textColor: textGray as Color, cellWidth: 40 } }
    });

    // --- 5. Diagnostic Index ---
    const currentY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(textGray[0], textGray[1], textGray[2]);
    doc.text("3.0 FORENSIC DIAGNOSTIC INDEX", margin, currentY);

    const anomalyRows = data.anomalies.map(a => [
      { 
        content: `${a.title.toUpperCase()}\n${a.severity} Severity Vector`, 
        styles: { fontStyle: 'bold' as FontStyle, textColor: severeRed as Color } 
      },
      { 
        content: `${a.detail}\nLocation: ${a.location}`, 
        styles: { textColor: [60,60,60] as Color } 
      }
    ]);

    autoTable(doc, {
      startY: currentY + 5,
      body: anomalyRows,
      margin: { left: margin },
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 5 },
      columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 'auto' } }
    });

    // --- 6. Signature Block ---
    const footerSigY = pageHeight - 45;
    doc.setDrawColor(200, 200, 200);
    doc.line(pageWidth - 80, footerSigY, pageWidth - margin, footerSigY);
    doc.setFont("times", "italic");
    doc.setFontSize(18);
    doc.setTextColor(themeDark[0], themeDark[1], themeDark[2]);
    doc.text(data.investigator.name || "Authorized User", pageWidth - 70, footerSigY - 5);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(textGray[0], textGray[1], textGray[2]);
    doc.text("Authorized Investigator", pageWidth - 75, footerSigY + 5);

    // --- 7. Formal Footer Strip ---
    doc.setFillColor(themeDark[0], themeDark[1], themeDark[2]);
    doc.rect(0, pageHeight - 15, pageWidth, 15, 'F');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(255, 255, 255);
    doc.text("FORENSIQ FORENSIC DIVISION // SECURE OUTPUT", margin, pageHeight - 7);
    doc.text("STRICTLY CONFIDENTIAL", pageWidth - margin - 40, pageHeight - 7);

    // --- FINAL PDF SAVE ---
    doc.save(`ForensIQ_Report_${data.metadata.caseId || 'Export'}.pdf`);
  } catch (error) {
    console.error("PDF Generation Error:", error);
  }
}
