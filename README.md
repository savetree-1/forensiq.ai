# forensiq.ai

Prototype frontend for document fraud analysis and signature
verification.

## Demo Video

Source issue:
https://github.com/savetree-1/truemark.ai/issues/14

<video
src="https://github.com/user-attachments/assets/35e6c822-d116-4703-a0b3-0224f8d57848" controls width="960">
  Your browser does not support
the video tag.
</video>

Direct link:
https://github.com/user-attachments/assets/35e6c822-d116-4703-a0b3-0224f8d57848

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Hugging Face Deployment Configuration

For this project, we deployed three Hugging Face Spaces and use them as
inference backends:

- Document Blur Detection:
  https://huggingface.co/spaces/FraudDetection/Document_Blur_Detection
- TruFor Splicing Detector:
  https://huggingface.co/spaces/FraudDetection/trufor-splicing-detecto
- Valid Document Detection:
  https://huggingface.co/spaces/FraudDetection/ValidDocumentDetection

Recommended frontend environment configuration:

```bash
VITE_HF_BLUR_DETECTION_URL=https://huggingface.co/spaces/FraudDetection/Document_Blur_Detection
VITE_HF_SPLICING_DETECTION_URL=https://huggingface.co/spaces/FraudDetection/trufor-splicing-detecto
VITE_HF_VALID_DOCUMENT_URL=https://huggingface.co/spaces/FraudDetection/ValidDocumentDetection
```

Suggested service mapping:

- Blur check requests should target VITE_HF_BLUR_DETECTION_URL.
- Splicing/tamper analysis should target VITE_HF_SPLICING_DETECTION_URL.
- Document validity checks should target VITE_HF_VALID_DOCUMENT_URL.

## Contributions

- Abhay Kanojia (@Abhay-k12)
