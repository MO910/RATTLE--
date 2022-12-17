import mongoose from "mongoose";
import schema from "~/server/graphQl/schema";
import { graphql } from "graphql";

export default defineEventHandler(async (event) => {
    // get the data and make the graphQl request
    const config = useRuntimeConfig();
    mongoose.set("strictQuery", true);
    const connection = await mongoose.connect(config.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const { query: source } = await readBody(event);
    // console.log(source);
    return await graphql({ schema, source });
});
