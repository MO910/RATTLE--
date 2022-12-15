import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLInputObjectType,
} from "graphql";
// User Type
export default new GraphQLInputObjectType({
    name: "Input_Custom_Plan",
    fields: () => ({
        id: { type: GraphQLID },
        from: { type: GraphQLString },
        to: { type: GraphQLString },

        date: { type: GraphQLString },
        note: { type: GraphQLString },
    }),
});
