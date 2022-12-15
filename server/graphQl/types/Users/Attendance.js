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
    name: "Attendance",
    fields: () => ({
        id: { type: GraphQLID },
        user_id: { type: GraphQLID },
        updated_by: { type: GraphQLID },
        attendance_status: { type: GraphQLString },
        date: { type: GraphQLString },
        note: { type: GraphQLString },
    }),
});
