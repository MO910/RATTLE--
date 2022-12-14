import mongoose from "mongoose";
import subgroup from "~/server/models/Groups/Subgroups.js";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const connection = await mongoose.connect(config.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    // graphqlHTTP({ schema, graphiql: true })
    let s = await subgroup.find();
    return {
        msg: "mongooooos connected ..........",
        s,
    };
});
