const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const connectDBWithRetry = require("./src/utils/db-connection");
const { graphQLSchema } = require("./src/graphql/schemas");
const graphQLResolver = require("./src/graphql/resolvers");
const { isAuthenticated } = require("./src/middlewares");

connectDBWithRetry();
const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(isAuthenticated);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQLSchema,
    rootValue: graphQLResolver,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`running on http://localhost:${PORT}`);
});
