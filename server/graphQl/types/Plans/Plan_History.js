import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
} from "graphql";
import timestamps from "../shared/timestamps";
// User Type
export default new GraphQLObjectType({
    name: "Plan_History",
    fields: () => ({
        id: { type: GraphQLID },
        plan_id: { type: GraphQLID },
        custom_plan_id: { type: GraphQLID },
        student_id: { type: GraphQLID },
        updated_by: { type: GraphQLID },
        amount_done: { type: GraphQLInt },
        grade: { type: GraphQLInt },

        rabt: { type: GraphQLBoolean },
        note: { type: GraphQLString },
        date: { type: GraphQLString },
        ...timestamps,
    }),
});
