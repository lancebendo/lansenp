"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const connectionString = 'mongodb://lancebendo:tmackulet1@ds239359.mlab.com:39359/lansenotepaddb';
const mongoClient = () => mongodb_1.MongoClient.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
exports.default = mongoClient;
