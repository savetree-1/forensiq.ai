# forensiq.ai

forensiq.ai is a frontend implementation aligned with the truemark.ai project in this account.

Repository:
- https://github.com/savetree-1/forensiq.ai

Related project (same product direction):
- https://github.com/savetree-1/truemark.ai

## Project Overview

This project provides a modern document forensics interface for:
- Document upload and queue management
- Signature review workflows
- Metadata comparison and anomaly review
- Risk timeline and findings exploration
- Analyst audit trail and report export experience

The current repository is a Vite + React + TypeScript frontend application with protected dashboard routes and local prototype data flows.

## Demo

Source issue:
- https://github.com/savetree-1/truemark.ai/issues/14

Demo video:
- https://github.com/user-attachments/assets/35e6c822-d116-4703-a0b3-0224f8d57848

## Technology Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Zustand (persisted auth state)
- Framer Motion
- Google OAuth (client-side sign-in)
- jsPDF and jsPDF-AutoTable (report generation)
- PDF.js (document rendering)

## Key Application Routes

Public routes:
- /
- /how-it-works
- /login

Protected routes:
- /dashboard
- /dashboard/upload-queue
- /dashboard/signature-lab
- /dashboard/metadata-diff
- /dashboard/risk-timeline
- /dashboard/findings
- /dashboard/audit-trail
- /dashboard/report

## Local Development

Prerequisites:
- Node.js 18+
- npm 9+

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Create production build:

```bash
npm run build
```

## Deployment

This repository includes Vercel SPA rewrite configuration in vercel.json:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## Hugging Face Deployment Configuration

For this project, three Hugging Face Spaces are deployed as analysis services:

- Document Blur Detection:
  https://huggingface.co/spaces/FraudDetection/Document_Blur_Detection
- TruFor Splicing Detector:
  https://huggingface.co/spaces/FraudDetection/trufor-splicing-detecto
- Valid Document Detection:
  https://huggingface.co/spaces/FraudDetection/ValidDocumentDetection

Recommended environment variables:

```bash
VITE_HF_BLUR_DETECTION_URL=https://huggingface.co/spaces/FraudDetection/Document_Blur_Detection
VITE_HF_SPLICING_DETECTION_URL=https://huggingface.co/spaces/FraudDetection/trufor-splicing-detecto
VITE_HF_VALID_DOCUMENT_URL=https://huggingface.co/spaces/FraudDetection/ValidDocumentDetection
```

Suggested mapping:
- Use VITE_HF_BLUR_DETECTION_URL for blur quality checks.
- Use VITE_HF_SPLICING_DETECTION_URL for splice/tamper analysis.
- Use VITE_HF_VALID_DOCUMENT_URL for valid-document classification.

## Authentication Model

- Google OAuth is configured in the client.
- Auth state is stored with Zustand persist middleware.
- Protected dashboard pages redirect unauthenticated users to /login.

## Project Structure

```text
forensiq.ai/
  src/
    assets/
    components/
    controllers/
      AppRoutes.tsx
      PdfGenerator.ts
      LatexGenerator.ts
    models/
    sections/
    store/
      authStore.ts
    views/pages/
      HomePage.tsx
      LoginPage.tsx
      DashboardPage.tsx
      UploadQueuePage.tsx
      SignatureLabPage.tsx
      MetadataDiffPage.tsx
      RiskTimelinePage.tsx
      FindingsPage.tsx
      AuditTrailPage.tsx
      ReportPage.tsx
    App.tsx
    index.tsx
  index.html
  vite.config.ts
  tailwind.config.js
  vercel.json
```

## Notes for Integration

- This repository currently behaves as a frontend-first prototype for analyst workflows.
- If you are integrating live backend inference, wire the Hugging Face endpoints through an API layer and read values from environment variables.
- Keep secrets and access tokens out of client code.

## Contributions

- Abhay Kanojia (@Abhay-k12)

## License

No license file is currently present in this repository. Add a LICENSE file if you want explicit reuse terms.
