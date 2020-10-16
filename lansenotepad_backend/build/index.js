"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoclient_1 = __importDefault(require("./mongoclient"));
const main_1 = __importDefault(require("./main"));
mongoclient_1.default().then((c) => {
    console.log('Connection to database is successful.');
    main_1.default(c.db('lansenotepaddb'));
});
