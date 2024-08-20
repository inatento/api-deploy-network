"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
class FileService {
    constructor() {
        this.filePath = path_1.default.resolve(__dirname, '../ansible/ansible.cfg');
    }
    readFile() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0, promises_1.readFile)(this.filePath, 'utf8');
                return data;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Error reading file: ${error.message}`);
                }
                else {
                    throw new Error('Unknown error occurred while reading the file');
                }
            }
        });
    }
}
exports.FileService = FileService;
