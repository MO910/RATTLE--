import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
} from "graphql";
// User Type
export default new GraphQLObjectType({
    name: "output_Custom_Plan",
    fields: () => ({
        id: { type: GraphQLID },
        from: { type: GraphQLString },
        to: { type: GraphQLString },

        date: { type: GraphQLString },
        note: { type: GraphQLString },
    }),
});
