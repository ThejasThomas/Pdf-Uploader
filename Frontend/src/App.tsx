import {  Routes, Route } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { Home } from "./pages/Home";
import { Documents } from "./pages/Documents";
import { PdfDetail } from "./pages/PdfDetail";
import { Extracted } from "./pages/ExtractedDocuments";

function App() {
  return (
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="documents" element={<Documents />} />
          <Route path="documents/:fileName" element={<PdfDetail />} />
          <Route path="/extracted" element={<Extracted />} />

        </Route>
      </Routes>
  );
}

export default App;
