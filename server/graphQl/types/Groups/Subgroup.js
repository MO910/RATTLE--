import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
} from "graphql";
//
import User_type from "../Users/User";
import Users_schema from "../../../models/Users/Users";
//
import Plan_type from "../Plans/Plan";
import Plans_schema from "../../../models/Plans/Plans";
// export Type
// User Type
export default new GraphQLObjectType({
    name: "Subgroup",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        student_ids: { type: GraphQLID },
        plans: {
            type: new GraphQLList(Plan_type),
            async resolve({ id: subgroup_id }) {
                return await Plans_schema.find({
                    subgroup_id,
                });
            },
        },
        students: {
            type: new GraphQLList(User_type),
            async resolve({ student_ids }) {
                const students = await Promise.all(
                    student_ids.map(async (studentId) => {
                        return await Users_schema.findById(studentId);
                    })
                );
                return students;
            },
        },
    }),
});
