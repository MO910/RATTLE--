import mongoose from "mongoose";
import schema from "~/server/graphQl/schema";
import { graphql } from "graphql";

export default defineEventHandler(async (event) => {
    // get the data and make the graphQl request
    const { query: source } = await readBody(event);
    // console.log(source);
    return await graphql({ schema, source });
});
