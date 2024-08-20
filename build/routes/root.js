"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diary = __importStar(require("../services/sampleService"));
const vaildateDiaries_1 = __importDefault(require("../utils/vaildateDiaries"));
const fileController_1 = require("../controllers/fileController");
const FileService_1 = require("../services/FileService");
const router = express_1.default.Router();
const fileController = new fileController_1.FileController(new FileService_1.FileService());
router.get('/file-content', fileController.getFileContent);
router.get('/:id', (req, res) => {
    const diaryConst = diary.findById(+req.params.id);
    return diaryConst != null ? res.send(diaryConst) : res.sendStatus(404);
});
router.post('/', (req, res) => {
    try {
        const newDiaryEntry = (0, vaildateDiaries_1.default)(req.body);
        const addedDiaryEntry = diary.addDiary(newDiaryEntry);
        res.json(addedDiaryEntry);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.default = router;
