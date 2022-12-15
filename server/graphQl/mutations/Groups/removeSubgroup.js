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
    type: Subgroup_type,
    args: {
        id: { type: GraphQLID },
    },
    async resolve(_, { id }) {
        const subgroup = await Subgroups_Schema.findByIdAndDelete(id),
            course = await Courses_Schema.findById(subgroup.course_id);
        await Promise.all(
            subgroup.student_ids.map(async (studentId) => {
                return await Users_Schema.findByIdAndUpdate(studentId, {
                    group_id: course.group_id,
                });
            })
        );
        return subgroup;
    },
};
