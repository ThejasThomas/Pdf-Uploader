"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const pdf_routes_1 = __importDefault(require("./routes/pdf.routes"));
const error_handler_1 = require("./middlewares/error.handler");
const app = (0, express_1.default)();
console.log("Frontend URI:", process.env.FRONTEND_URI);
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URI,
    credentials: true
}));
app.use(express_1.default.json());
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
app.use("/api/pdf", pdf_routes_1.default);
app.get("/", (_req, res) => {
    res.send("PDF Extractor API Running 🚀");
});
app.use(error_handler_1.globalErrorHandler);
exports.default = app;
