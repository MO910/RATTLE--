const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const schema = require("./server/graphQl/schema");
const mongoose = require("mongoose");
require("dotenv").config();
// connect with
mongoose.set("strictQuery", true);
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        // server for testing
        const server = new ApolloServer({ schema });
        startStandaloneServer(server).then(({ url }) => {
            console.log(`🚀 Server listening at: ${url}`);
        });
    });
