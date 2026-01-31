"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeFileStorage = void 0;
const promises_1 = __importDefault(require("fs/promises"));
class NodeFileStorage {
    async write(filePath, data) {
        await promises_1.default.writeFile(filePath, data);
    }
    async read(filePath) {
        return await promises_1.default.readFile(filePath);
    }
}
exports.NodeFileStorage = NodeFileStorage;
