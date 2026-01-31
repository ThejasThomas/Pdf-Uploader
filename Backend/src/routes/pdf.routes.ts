import { Router } from "express";
import multer from "multer"
import path from "path";
import { pdfController } from "../container";

const router=Router()

// const storage =multer.diskStorage({
//     destination:"uploads/originals",
//     filename:(_,file,cb)=>{
//         cb(null,Date.now()+path.extname(file.originalname));

//     }
// })
const upload=multer({
    storage:multer.memoryStorage(),
    fileFilter:(_,file,cb)=>{
        if(file.mimetype ==="application/pdf"){
            cb(null,true)
        }else{
            cb(new Error("Only pdf files allowed"))
        }
    }
})

router.post('/upload',upload.single("pdf"),pdfController.upload.bind(pdfController))
router.get("/list",pdfController.list.bind(pdfController))
router.post("/extract",pdfController.extract.bind(pdfController))
router.get(
    "/extracted",
    pdfController.listExtracted.bind(pdfController)
)
export default router;