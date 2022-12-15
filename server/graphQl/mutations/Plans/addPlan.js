import {
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLBoolean,
} from "graphql";
import Plan_type from "../../types/Plans/Plan";
import Plans_Schema from "../../../models/Plans/Plans";
// Function
export default {
    type: Plan_type,
    args: {
        rabt_for_plan_id: { type: GraphQLID },
        subgroup_id: { type: GraphQLID },
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

        note: { type: GraphQLString },
    },
    async resolve(_, args) {
        return await Plans_Schema.create(args);
    },
};
