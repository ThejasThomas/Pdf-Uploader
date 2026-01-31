"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const container_1 = require("../container");
const router = (0, express_1.Router)();
// const storage =multer.diskStorage({
//     destination:"uploads/originals",
//     filename:(_,file,cb)=>{
//         cb(null,Date.now()+path.extname(file.originalname));
//     }
// })
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    fileFilter: (_, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        }
        else {
            cb(new Error("Only pdf files allowed"));
        }
    }
});
router.post('/upload', upload.single("pdf"), container_1.pdfController.upload.bind(container_1.pdfController));
router.get("/list", container_1.pdfController.list.bind(container_1.pdfController));
router.post("/extract", container_1.pdfController.extract.bind(container_1.pdfController));
router.get("/extracted", container_1.pdfController.listExtracted.bind(container_1.pdfController));
exports.default = router;
