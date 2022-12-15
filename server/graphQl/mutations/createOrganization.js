import { GraphQLString, GraphQLInt, GraphQLID, GraphQLBoolean } from "graphql";
import Organizations_Schema from "../../models/Organizations";
import Organization_type from "../types/Organization";
// Function
export default {
    type: Organization_type,
    args: {
        name: { type: GraphQLString },
        owner_id: { type: GraphQLID },
    },
    async resolve(_, args) {
        return await Organizations_Schema.create(args);
    },
};
