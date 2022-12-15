// import {
//     GraphQLObjectType,
//     GraphQLString,
//     GraphQLID,
//     GraphQLInt,
//     GraphQLList,
//     GraphQLBoolean,
// } from "graphql";
// User Type
export default new GraphQLObjectType({
    name: "Rule",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        permissions: { type: GraphQLString },
    }),
});
