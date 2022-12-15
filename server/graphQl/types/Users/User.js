import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
} from "graphql";
// shared function
import getGroupFromStudentId from "../shared/getGroupFromStudentId";
// Users
import Users_schema from "../../../models/Users/Users";
//Attendance
import Attendance_type from "./Attendance";
import Attendances_schema from "../../../models/Users/Attendances";
// rules
import Rule_type from "./Rule";
import Rules_schema from "../../../models/Users/Rules";
// Plans
import Plan_type from "../Plans/Plan";
import Plans_schema from "../../../models/Plans/Plans";
// Advancements
import Plan_History_type from "../Plans/Plan_History";
import Plans_History_schema from "../../../models/Plans/Plan_History";
// rule convert function
import rulesConverter from "../shared/rulesConverter";
// User Type
const User_type = new GraphQLObjectType({
    name: `User${~~(Math.random() * 1000)}`,
    fields: () => ({
        id: { type: GraphQLID },
        group_id: { type: GraphQLID },
        organization_id: { type: GraphQLID },
        first_name: { type: GraphQLString },
        parent_name: { type: GraphQLString },
        email: { type: GraphQLString },
        gender: { type: GraphQLBoolean },
        phone: { type: GraphQLString },
        rule_ids: { type: new GraphQLList(GraphQLID) },
        rules: {
            type: new GraphQLList(Rule_type),
            async resolve({ rule_ids }) {
                return await rulesConverter({ rule_ids });
            },
        },
        groups: {
            type: new GraphQLList(Group_type),
            async resolve(args) {
                return await getGroupFromStudentId(args);
            },
        },
        subgroups: {
            type: new GraphQLList(Subgroup_type),
            async resolve({ id }) {
                return await Subgroups_schema.find({ student_ids: id });
            },
        },
        attendance_Date: { type: GraphQLString },
        attendance: {
            type: Attendance_type,
            async resolve(args) {
                let { id: user_id, attendance_Date } = args;
                return await Attendances_schema.findOne({
                    user_id,
                    date: attendance_Date,
                });
            },
        },
        plans_history: {
            type: new GraphQLList(Plan_History_type),
            async resolve({ id: student_id }) {
                return await Plans_History_schema.find({ student_id });
            },
        },
        plans: {
            type: new GraphQLList(Plan_type),
            async resolve({ id }) {
                return await Plans_schema.find({ subgroup_id: id });
            },
        },
        // children: {
        //     type: new GraphQLList(User_type),
        //     async resolve({ id, rule_ids }) {
        //         const parentRule = await rulesConverter({ rules: ["parent"] });
        //         if (!rule_ids?.some((r) => r == parentRule[0])) return;
        //         return await Users_schema.find({
        //             parent_id: id,
        //         });
        //     },
        // },
    }),
});
// export
export default User_type;
// This is here to prevent circular dependencies problem which will lead to the formation of infinite loop
// Groups
import Group_type from "../Groups/Group";
import Groups_schema from "../../../models/Groups/Groups";
import Courses_schema from "../../../models/Courses/Courses";
// Subgroups
import Subgroup_type from "../Groups/Subgroup";
import Subgroups_schema from "../../../models/Groups/Subgroups";
