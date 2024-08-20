"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
class FileController {
    constructor(fileService) {
        this.fileService = fileService;
        this.getFileContent = (_req, res, next) => {
            this.fileService.readFile()
                .then(content => {
                res.json({ content });
            })
                .catch(error => {
                if (error instanceof Error) {
                    next(new Error(`Error reading file: ${error.message}`));
                }
                else {
                    next(new Error('Unknown error occurred while reading the file'));
                }
            });
        };
    }
}
exports.FileController = FileController;
