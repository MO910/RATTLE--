import mongoose from "mongoose";
import schema from "~/server/graphQl/schema";
import connect from "~/server/functions/connect";
import { graphql } from "graphql";

export default defineEventHandler(async (event) => {
    // connect to mongoose
    const { MONGO_URL } = process.env;
    await connect(mongoose, MONGO_URL);
    // get the data and make the graphQl request
    const { query: source } = await readBody(event);
    return await graphql({ schema, source });
});
