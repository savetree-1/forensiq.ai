# forensiq.ai

forensiq.ai is the frontend workspace for the same product line as truemark.ai in your repositories. It focuses on analyst-facing document fraud workflows, including document intake, forensic review screens, and structured reporting views.

Repository:
- https://github.com/savetree-1/forensiq.ai

Related repository (same product direction):
- https://github.com/savetree-1/truemark.ai

## Purpose

The goal of this project is to provide a complete review console for document risk analysis. The interface is designed to support investigators and operations teams who need to validate uploaded documents, inspect suspicious signals, and generate explainable outputs for internal and external review.

In practical terms, the app gives users:
- A guided entry point for secure login.
- A dashboard workflow for navigating different analysis modules.
- Visual review surfaces for risk, metadata differences, signatures, and audit history.
- A report-oriented output flow that can be used as evidence packaging.

## Relationship With truemark.ai

This repository and truemark.ai represent the same overall solution direction, but can evolve at different speeds for UI and implementation details.

A simple way to think about it:
- truemark.ai: primary product identity and broader project narrative.
- forensiq.ai: frontend implementation and dashboard workflow surface for that product vision.

## Current Scope

This codebase is currently frontend-first. It contains production-style routing, module composition, and UI logic for the forensic workflow, while many analysis values are still represented through prototype/local flows.

That means:
- The investigation experience is fully represented in the UI.
- The backend contract should be finalized and connected for fully live inference.
- Hugging Face endpoints are documented and prepared for integration.

## Core User Flow

A typical user journey inside the app is:

1. Sign in using Google OAuth on the login page.
2. Enter protected dashboard routes after authentication state is persisted.
3. Upload or review queued documents.
4. Open focused modules for signature checks, metadata differences, findings, and timeline-based risk context.
5. Generate or export report outputs for downstream decisioning.

This flow is organized to reduce context switching for analysts and keep high-risk evidence visible in a structured sequence.

## Technology Stack

The project is built with modern frontend tooling and a modular React architecture:

- React 18 for component-driven UI.
- TypeScript for stronger static typing and safer refactors.
- Vite for fast local development and build output.
- Tailwind CSS for design system and utility-based styling.
- React Router DOM for public and protected route control.
- Zustand with persistence middleware for client auth state.
- Framer Motion for controlled UI transitions.
- PDF.js for document preview and rendering behavior.
- jsPDF and jsPDF-AutoTable for report generation workflows.
- Google OAuth client integration for sign-in entry.

## Route Map

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

Protected routes enforce an authenticated session. If no valid auth state is present, users are redirected back to /login.

## Module Description

### Upload Queue

The upload queue module represents incoming document traffic and processing status. It is the operational entry point where analysts can quickly understand what is complete, what is pending, and which files need intervention.

### Signature Lab

This module provides a focused screen for signature-related inspection and comparison. It is designed to make signature integrity checks easier to perform in sequence while preserving review context.

### Metadata Diff

Metadata diff views are intended to compare original and changed values in a way that highlights suspicious edits. This module helps reviewers reason about structural inconsistencies instead of relying only on visual judgment.

### Risk Timeline

The risk timeline provides chronological context around risk events. It is useful for reconstructing activity flow and identifying when suspicious states appear in the lifecycle.

### Findings and Audit Trail

Findings organize detected issues into reviewable items. Audit trail provides an event-history style perspective so teams can trace actions and support compliance requirements.

### Report

The report area is used to summarize analysis outputs in a shareable format. The codebase already includes report-related generation utilities and model structures for this purpose.

## Local Development Setup

Prerequisites:
- Node.js 18 or newer.
- npm 9 or newer.

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

Expected result:
- Dev server starts with Vite.
- Routing works locally for all public pages.
- Protected pages require authentication state as implemented in the store.

## Deployment Notes

The repository includes Vercel SPA rewrite configuration:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

This ensures direct navigation to deep routes in production does not return 404 from static hosting, and always resolves to the app shell.

## Hugging Face Deployment Configuration

Forensiq.ai is configured around three deployed Hugging Face Spaces that map to distinct fraud-analysis responsibilities:

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

Suggested responsibility mapping:
- `VITE_HF_BLUR_DETECTION_URL`: image quality and blur gate checks.
- `VITE_HF_SPLICING_DETECTION_URL`: tampering and splice-risk analysis.
- `VITE_HF_VALID_DOCUMENT_URL`: document validity scoring/classification.

Integration recommendation:
- Route external service calls through a server-side API layer where possible.
- Keep tokens and private keys out of frontend code.
- Normalize responses to one internal schema before rendering module-level findings.

## Authentication Model

Authentication currently uses Google OAuth client-side sign-in and persists user state through Zustand middleware. Route protection is enforced in the routing controller, where unauthenticated access is redirected to the login page.

This is suitable for initial product flow and demos. For production hardening, pair it with backend token validation, session expiry policies, and role-based authorization checks.

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

## Engineering Notes

- The app already contains a strong section-based component layout and route segmentation.
- Some modules include prototype datasets and local simulation patterns; wire these to API-backed data for production parity.
- Keep UX continuity between truemark.ai and forensiq.ai by aligning route semantics, model names, and report terminology.

## Contribution

Contributors:
- Abhay Kanojia (@Abhay-k12)

If you are extending this project, keep commits scoped by module (for example: upload queue, metadata diff, report generation) to simplify review and release tracking.

## License

A license file is not currently present in this repository. Add a LICENSE file to define explicit reuse and distribution terms.
