"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPdfSchema = void 0;
const zod_1 = require("zod");
exports.extractPdfSchema = zod_1.z.object({
    fileName: zod_1.z.string().min(1, "File name is required"),
    pages: zod_1.z.array(zod_1.z.number().int().nonnegative())
});
