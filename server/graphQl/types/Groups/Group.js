const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
} = require("graphql");

const // courses
    Courses_schema = require("../../../models/Courses/Courses"),
    Course_type = require("./Course");
//
// Users_schema = require("../../../models/Users/Users"),
// User_type = require("../Users/User");
// export Type
module.exports = new GraphQLObjectType({
    name: "Group",
    fields: () => ({
        id: { type: GraphQLID },
        // teacher: {
        //     type: User_type,
        //     async resolve({ id }) {
        //         return await Users_schema.findById(id);
        //     },
        // },
        title: { type: GraphQLString },
        working_days: { type: new GraphQLList(GraphQLInt) },
        description: { type: GraphQLString },
        courses: {
            type: new GraphQLList(Course_type),
            async resolve({ id: group_id }) {
                return await Courses_schema.find({ group_id });
            },
        },
    }),
});
