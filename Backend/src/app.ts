import express from "express"
import path from "path"
import cors from "cors"
import pdfRoutes from "./routes/pdf.routes"
import { globalErrorHandler } from "./middlewares/error.handler"
const app=express()

console.log("Frontend URI:", process.env.FRONTEND_URI);

app.use(cors({
  origin:process.env.FRONTEND_URI,
  credentials:true
}))


app.use(express.json())

app.use("/uploads",express.static(path.join(__dirname,"../uploads")))
app.use("/api/pdf",pdfRoutes)



app.get("/", (_req, res) => {
  res.send("PDF Extractor API Running 🚀");
});
app.use(globalErrorHandler);

export default app;
 