const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const connect = require("./server/functions/connect");
const schema = require("./server/graphQl/schema");
const mongoose = require("mongoose");
require("dotenv").config();

// connect to mongoose server
connect(mongoose, process.env.MONGO_URL).then(() => {
    // host apollo server for testing
    const server = new ApolloServer({ schema });
    startStandaloneServer(server).then(({ url }) => {
        console.log(`🚀 Server listening at: ${url}`);
    });
});
