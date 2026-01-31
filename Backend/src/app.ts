import express from "express"
import path from "path"
import cors from "cors"
import { globalErrorHandler } from "./middlewares/error.handler"
const app=express()

app.use(cors())

app.use(express.json())

app.use("/uploads",express.static(path.join(__dirname,"../uploads")))

app.use(globalErrorHandler);


app.get("/", (_req, res) => {
  res.send("PDF Extractor API Running 🚀");
});
export default app;