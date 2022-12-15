import mongoose from "mongoose";
import schema from "~/server/graphQl/schema";
import { graphql } from "graphql";
// for testing
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const server = new ApolloServer({ schema });
export default defineEventHandler(async (event) => {
    return await startStandaloneServer(server);
});
