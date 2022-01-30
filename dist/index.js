"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const task_1 = require("./resolvers/task");
const apollo_server_core_1 = require("apollo-server-core");
const Task_1 = require("./entities/Task");
const main = async () => {
    await (0, typeorm_1.createConnection)({
        type: "postgres",
        database: "admin",
        username: "admin",
        password: "admin",
        logging: true,
        synchronize: true,
        entities: [Task_1.Task],
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [task_1.TaskResolver],
            validate: false,
        }),
        plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()],
    });
    await apolloServer.start();
    const app = (0, express_1.default)();
    apolloServer.applyMiddleware({ app });
    app.get("/", (_req, res) => res.send("you have not screwed up!"));
    const PORT = 8000;
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
};
main().catch((err) => console.error(err));
//# sourceMappingURL=index.js.map