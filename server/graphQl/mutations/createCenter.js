import {
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLBoolean,
    GraphQLList,
} from "graphql";
import Centers_Schema from "../../models/Centers";
import Center_type from "../types/Center";
// Function
export default {
    type: Center_type,
    args: {
        organization_id: { type: GraphQLID },
        admin_ids: { type: new GraphQLList(GraphQLID) },
        title: { type: GraphQLString },
        working_days: { type: new GraphQLList(GraphQLInt) },
        description: { type: GraphQLString },
    },
    async resolve(_, args) {
        return await Centers_Schema.create(args);
    },
};
