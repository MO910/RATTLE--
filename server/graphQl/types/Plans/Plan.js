import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
} from "graphql";
//
import history_type from "./Plan_History";
import history_schema from "../../../models/Plans/Plan_History";
import output_Custom_Plan from "./output_Custom_Plan";
import custom_plans_schema from "../../../models/Plans/Custom_Plans";
// User Type
export default new GraphQLObjectType({
    name: "Plans",
    fields: () => ({
        id: { type: GraphQLID },
        rabt_for_plan_id: { type: GraphQLID },
        title: { type: GraphQLString },
        color: { type: GraphQLString },
        order_reversed: { type: GraphQLBoolean },

        from: { type: GraphQLInt },
        amount: { type: GraphQLInt },
        weeks: { type: GraphQLInt },

        rabt_amount: { type: GraphQLInt },

        working_days: { type: new GraphQLList(GraphQLInt) },
        starting_at: { type: GraphQLString },

        note: { type: GraphQLString },
        custom: { type: GraphQLBoolean },
        custom_plans: {
            type: new GraphQLList(output_Custom_Plan),
            // type: GraphQLBoolean,
            async resolve({ id, custom }) {
                // if (!custom) return [];
                return await custom_plans_schema.find({ plan_id: id });
            },
        },
        history: {
            type: new GraphQLList(history_type),
            // async resolve({ id: plan_id }) {
            //     return await Plan_History.find({ plan_id });
            // },
        },
    }),
});
