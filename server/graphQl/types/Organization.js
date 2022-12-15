import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
} from "graphql";
import {
    GraphQLID,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLSchema,
} from "graphql";
//
import Center_type from "./Center";
import Centers_schema from "../../models/Centers";
// User Type
export default new GraphQLObjectType({
    name: "Organization",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        centers: {
            type: new GraphQLList(Center_type),
            async resolve({ id: organization_id }) {
                return await Centers_schema.find({
                    organization_id,
                });
            },
        },
    }),
});
