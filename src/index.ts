import { createConnection } from "typeorm";
import express, { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { TaskResolver } from "./resolvers/task";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { Task } from "./entities/Task";


const main = async () => {
  await createConnection({
    type: "postgres",
    database: "admin",
    username: "admin",
    password: "admin",
    logging: true,
    synchronize: true,
    entities: [Task],
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TaskResolver],
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();
  const app: Express = express();

  apolloServer.applyMiddleware({ app });

  const PORT = 8000;
  app.listen(PORT, () => console.log(`server started on port ${PORT}`));
};

main().catch((err) => console.error(err));