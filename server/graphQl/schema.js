const { GraphQLObjectType, GraphQLSchema, GraphQLBoolean } = require("graphql");
const query = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        // get user info
        user: {
            type: GraphQLBoolean,
            async resolve(_) {
                return true;
            },
        },
    },
});
// exports
module.exports = new GraphQLSchema({ query });
