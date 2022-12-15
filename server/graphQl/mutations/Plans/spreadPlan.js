import {
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLBoolean,
    GraphQLList,
    GraphQLInputObjectType,
} from "graphql";
import Custom_Plans_Schema from "../../../models/Plans/Custom_Plans";
import Input_Custom_Plan from "../../types/Plans/Input_Custom_Plan";
import Output_Custom_Plan from "../../types/Plans/output_Custom_Plan";
// Function
export default {
    type: new GraphQLList(Output_Custom_Plan),
    args: {
        plan_id: { type: GraphQLID },
        custom_plans: { type: new GraphQLList(Input_Custom_Plan) },
    },
    async resolve(_, { plan_id, custom_plans }) {
        // delete the old days
        await Custom_Plans_Schema.deleteMany({ plan_id });
        // create all days
        custom_plans = custom_plans.map((c) => {
            c.plan_id = plan_id;
            return c;
        });
        return await Custom_Plans_Schema.create(custom_plans);
    },
};
