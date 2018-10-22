"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// import express_graphql from "express-graphql";
// import { buildSchema } from "graphql";
// import { Connection } from "tedious";
// import jwt from "express-jwt";
// import dotenv from "dotenv";
// configure the environment variables
// dotenv.config();
// configure the port number to run on
var port = process.env.PORT || 3000;
// configure the database
// const db_config = {
//   userName: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   server: process.env.DB_HOST,
//   options: {
//     database: process.env.DB_NAME,
//     encrypt: true
//   }
// };
// configure the database
// const conn = new Connection(db_config);
// conn.on('connect', err => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Connected!");
//     conn.close();
//   }
// });
// configure authentication
// const auth = jwt({
//   secret: process.env.JWT_SECRET || ""
// });
// // schema
// const schema = buildSchema(`
//   type Query {
//     message: String
//   }
// `);
// root resolver
// const root = {
//   message: () => 'Hello, World!'
// };
var app = express_1.default();
// // setup the graphql api with authentication
// app.use('/api/graphql', auth, express_graphql({
//   schema: schema,
//   rootValue: root,
//   graphiql: true
// }));
app.get('*', function (req, res) {
    res.send("Under Construction");
});
app.listen(port, function () {
    console.log("Express GraphQL server now running on http://localhost:" + port + "/api/graphql");
});
