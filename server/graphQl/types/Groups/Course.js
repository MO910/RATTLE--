import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
} from "graphql";
//
// User
import User_type from "../Users/User";
import Users_schema from "../../../models/Users/Users";
// Subgroups
import subgroup_type from "./Subgroup";
import subgroups_schema from "../../../models/Groups/Subgroups";
// User Type
export default new GraphQLObjectType({
    name: "Course",
    fields: () => ({
        id: { type: GraphQLID },
        group_id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        floatingStudents: {
            type: new GraphQLList(User_type),
            async resolve({ id: course_id, group_id }) {
                const subgroups = await subgroups_schema.find({ course_id }),
                    // get an array of ids only
                    studentsInSubgroups = subgroups
                        .map((sub) => sub.student_ids)
                        .flat(),
                    allGroupStudents = await Users_schema.find({ group_id });
                // filter out the students who is already in subgroup
                return allGroupStudents.filter(
                    ({ id }) => !studentsInSubgroups.some((s_id) => s_id == id)
                );
            },
        },
        subgroups: {
            type: new GraphQLList(subgroup_type),
            async resolve({ id: course_id }) {
                return await subgroups_schema.find({
                    course_id,
                });
            },
        },
    }),
});
