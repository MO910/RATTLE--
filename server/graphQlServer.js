const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const schema = require("./graphQl/schema");

const server = new ApolloServer({ schema });
startStandaloneServer(server).then(({ url }) => {
    console.log(`🚀 Server listening at: ${url}`);
});
