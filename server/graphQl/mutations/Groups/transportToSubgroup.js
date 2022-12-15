import {
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLBoolean,
    GraphQLList,
} from "graphql";
//subgroup
import Subgroups_Schema from "../../../models/Groups/Subgroups";
import Subgroup_type from "../../types/Groups/Subgroup";
//course
import Courses_Schema from "../../../models/Courses/Courses";
//group
import Groups_Schema from "../../../models/Groups/Groups";
// user
import Users_Schema from "../../../models/Users/Users";
// import Subgroup_type from "../../types/Groups/Subgroup"
// Function
export default {
    type: GraphQLBoolean,
    args: {
        student_id: { type: GraphQLID },
        subgroup_id: { type: GraphQLID },
        course_id: { type: GraphQLID },
    },
    async resolve(_, { student_id, subgroup_id, course_id }) {
        // const { course_id } = await Subgroups_Schema.findById(subgroup_id);
        // remove from floating student
        // await Users_Schema.findByIdAndUpdate(student_id, {
        //     $unset: { group_id: "" },
        // });
        // remove from any subgroup in this course
        await Subgroups_Schema.updateMany(
            { course_id },
            {
                $pull: { student_ids: student_id },
            }
        );
        // push to subgroup if there any
        if (subgroup_id)
            await Subgroups_Schema.findByIdAndUpdate(subgroup_id, {
                $push: { student_ids: student_id },
            });
        return true;
    },
};
