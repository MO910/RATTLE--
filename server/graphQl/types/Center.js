import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
} from "graphql";
import Group_type from "./Groups/Group";
import Groups_schema from "../../models/Groups/Groups";
// User Type
export default new GraphQLObjectType({
    name: "Center",
    fields: () => ({
        id: { type: GraphQLID },
        organization_id: { type: GraphQLID },
        admin_ids: { type: new GraphQLList(GraphQLID) },
        title: { type: GraphQLString },
        working_days: { type: new GraphQLList(GraphQLInt) },
        description: { type: GraphQLString },
        groups: {
            type: new GraphQLList(Group_type),
            async resolve({ id: center_id }) {
                return await Groups_schema.find({
                    center_id,
                });
            },
        },
    }),
});
