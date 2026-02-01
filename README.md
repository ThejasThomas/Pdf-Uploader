# 📄 PDF Page Extractor

A full-stack PDF processing application that allows users to:

- Upload a PDF file
- Preview all pages visually
- Select specific pages
- Reorder selected pages
- Extract selected pages into a new PDF
- Download the newly created PDF
---

## 🚀 Live Deployment

- **Frontend**: Hosted on Vercel  
- **Backend**: Hosted on AWS (Node.js + Express)

---

# 🏗️ Tech Stack

## Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- Axios
- pdfjs-dist
- dnd-kit (Drag & Drop)
- react-hot-toast

## Backend
- Node.js
- Express
- Multer
- pdf-lib
- Zod (Validation)
- dotenv
- CORS

---

# 📌 Features

## ✅ 1. Upload PDF
- Drag & drop supported
- Validates file type (PDF only)
- Backend validation using Multer + Zod

## ✅ 2. Visual Page Preview
- Uses `pdfjs-dist` to render PDF pages
- Fully responsive preview
- Works on desktop and mobile

## ✅ 3. Page Selection
- Users can select pages using checkboxes
- Selected pages are highlighted

## ✅ 4. Drag & Reorder
- Selected pages can be reordered using drag & drop
- Uses `@dnd-kit`

## ✅ 5. Extract PDF
- Backend extracts selected pages using `pdf-lib`
- Maintains selected order
- Generates a new PDF file
- Download link provided






