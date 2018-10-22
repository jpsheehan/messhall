"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_graphql_1 = __importDefault(require("express-graphql"));
var graphql_1 = require("graphql");
var express_jwt_1 = __importDefault(require("express-jwt"));
var dotenv_1 = __importDefault(require("dotenv"));
// configure the environment variables
dotenv_1.default.config();
// configure the port number to run on
var port = process.env.PORT || 3000;
// configure the database
var db_config = {
    userName: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_HOST,
    options: {
        database: process.env.DB_NAME,
        encrypt: true
    }
};
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
var auth = express_jwt_1.default({
    secret: process.env.JWT_SECRET || ""
});
// schema
var schema = graphql_1.buildSchema("\n  type Query {\n    message: String\n  }\n");
// root resolver
var root = {
    message: function () { return 'Hello, World!'; }
};
var app = express_1.default();
// setup the graphql api with authentication
app.use('/api/graphql', auth, express_graphql_1.default({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.use(function (req, res) {
    res.send("Under Construction");
});
app.listen(port, function () {
    console.log("Express GraphQL server now running on http://localhost:" + port + "/api/graphql");
});
