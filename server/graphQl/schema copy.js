import {
    GraphQLID,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLSchema,
} from "graphql";
// user
import User_type from "./types/Users/User";
import Users_schema from "../models/Users/Users";
import Rules_schema from "../models/Users/Rules";
// Attendance
import Attendance_type from "./types/Users/Attendance";
import Attendances_schema from "../models/Users/Attendances";
// Plans
import Plan_Schema from "../models/Plans/Plans";
import Plan_type from "./types/Plans/Plan";
import Plan_History_Schema from "../models/Plans/Plan_History";
import Plan_History_type from "./types/Plans/Plan_History";
import Custom_Plans_Schema from "../models/Plans/Custom_Plans";
// group
import Group_type from "./types/Groups/Group";
import Groups_schema from "../models/Groups/Groups";
// Organization
import Organization_type from "./types/Organization";
import Organizations_schema from "../models/Organizations";
// center
import Center_type from "./types/Center";
import Centers_schema from "../models/Centers";
// mutations
// Goals
import addPlan from "./mutations/Plans/addPlan";
import removePlan from "./mutations/Plans/removePlan";
import updatePlanHistory from "./mutations/Plans/updateHistory";
import spreadPlan from "./mutations/Plans/spreadPlan";
import editCustomPlan from "./mutations/Plans/editCustomPlan";
// Users
import createUser from "./mutations/Users/createUser";
import updateUser from "./mutations/Users/updateUser";
// rule convert function
import rulesConverter from "./types/shared/rulesConverter";
// Center
import createCenter from "./mutations/createCenter";
// Groups
import createSubgroup from "./mutations/Groups/createSubgroup";
import removeSubgroup from "./mutations/Groups/removeSubgroup";
import transportToSubgroup from "./mutations/Groups/transportToSubgroup";
// attendance
import updateAttendance from "./mutations/attendance/updateAttendance";
/*
    import removeGoal from "./mutations/Goals/removeGoal"
    import updateGoalsHistory from "./mutations/Goals/updateHistory"
    // Organization
    import createOrganization from "./mutations/createOrganization"
    */
//
const query = new GraphQLObjectType({
        name: "RootQueryType",
        fields: {
            // get user info
            user: {
                type: new GraphQLList(User_type),
                args: {
                    id: { type: GraphQLID },
                    organization_id: { type: GraphQLID },
                    rules: { type: new GraphQLList(GraphQLString) },
                },
                async resolve(_, { id, organization_id, rules }) {
                    // get ids from rules titles
                    let rule_ids = rules && (await rulesConverter({ rules }));
                    rule_ids = rule_ids && { $in: rule_ids };
                    // filter the empty keys
                    let query = { _id: id, organization_id, rule_ids };
                    query = Object.entries(query).reduce((a, [k, v]) => {
                        v && (a[k] = v);
                        return a;
                    }, {});
                    // search and return
                    return await Users_schema.find(query);
                },
            },
            // get group attendance
            groupAttendanceAtDate: {
                type: new GraphQLList(User_type),
                args: {
                    group_id: { type: GraphQLID },
                    date: { type: GraphQLString },
                },
                async resolve(_, { group_id, date }) {
                    let students = await Users_schema.find({ group_id });
                    students = students.map((s) => {
                        s.attendance_Date = date;
                        return s;
                    });
                    return students;
                },
            },
            groups: {
                type: new GraphQLList(Group_type),
                args: { userId: { type: GraphQLID } },
                async resolve(_, { userId }) {
                    return await Groups_schema.find({ teacher_id: userId });
                },
            },
            organization: {
                type: Organization_type,
                args: { userId: { type: GraphQLID } },
                async resolve(_, { userId }) {
                    const user = await Users_schema.findById(userId);
                    return await Organizations_schema.findById(
                        user.organization_id
                    );
                },
            },
            subgroupHistoryAtDate: {
                type: new GraphQLList(Plan_History_type),
                args: {
                    subgroup_id: { type: GraphQLID },
                    date: { type: GraphQLString },
                },
                async resolve(_, { subgroup_id, date }) {
                    const $gte = new Date(date),
                        $lte = new Date(
                            new Date($gte).setDate($gte.getDate() + 1)
                        );
                    // get plans
                    const plans = await Plan_Schema.find({ subgroup_id }),
                        allHistories = await Promise.all(
                            plans.map(async (plan) => {
                                // get all custom plans in this date
                                let custom_plans =
                                    await Custom_Plans_Schema.find({
                                        plan_id: plan.id,
                                        date: { $gte, $lte },
                                    });
                                // get the history of these custom plans
                                return await Promise.all(
                                    await custom_plans.map(async (cp) => {
                                        let custom_history =
                                            await Plan_History_Schema.find({
                                                custom_plan_id: cp.id,
                                            });
                                        // add extra info
                                        return custom_history.map((h) => ({
                                            ...h._doc,
                                            plan_id: plan.id,
                                            date,
                                        }));
                                    })
                                );
                            })
                        );
                    return allHistories.flat().flat();
                },
            },
        },
    }),
    mutation = new GraphQLObjectType({
        name: "mutation",
        fields: {
            // users
            createUser,
            updateUser,
            // plans
            addPlan,
            updatePlanHistory,
            removePlan,
            spreadPlan,
            editCustomPlan,
            // centers
            createCenter,
            // groups
            createSubgroup,
            removeSubgroup,
            transportToSubgroup,
            // attendance
            updateAttendance,
        },
    });
// exports
export default new GraphQLSchema({ query, mutation });
