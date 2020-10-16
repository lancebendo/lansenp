"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const main = (dbClient) => {
    app.get('/notes', (req, res) => {
        db;
    });
    app.post('/notes', (req, res) => {
        //create new note
    });
    //get note by id
    //put update note 
    app.listen(3100, () => {
        console.log('Backend is in port 3100.');
    });
};
exports.default = main;
