import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
} from "graphql";

// Users
// courses
import Courses_schema from "../../../models/Courses/Courses";
import Course_type from "./Course";
//     // Goals
//     import Goal_type from "../Goals/Goal"
//     import Goals_schema from "../../../models/Courses/Goals/Goals"
// export Type
export default new GraphQLObjectType({
    name: "Group",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        // student_ids: { type: GraphQLID },
        working_days: { type: new GraphQLList(GraphQLInt) },
        description: { type: GraphQLString },
        // goals: {
        //     type: new GraphQLList(Goal_type),
        //     async resolve({ id: group_id }) {
        //         return await Goals_schema.find({
        //             group_id,
        //         });
        //     },
        // },
        // students: {
        //     type: new GraphQLList(User_type),
        //     async resolve({ student_ids }) {
        //         const students = await Promise.all(
        //             student_ids.map(async (studentId) => {
        //                 return await Users_schema.findById(studentId);
        //             })
        //         );
        //         return students;
        //     },
        // },
        courses: {
            type: new GraphQLList(Course_type),
            async resolve({ id: group_id }) {
                return await Courses_schema.find({ group_id });
            },
        },
    }),
});
