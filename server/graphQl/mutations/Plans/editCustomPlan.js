import {
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLBoolean,
    GraphQLList,
    GraphQLInputObjectType,
    GraphQLObjectType,
} from "graphql";
import Custom_Plans_Schema from "../../../models/Plans/Custom_Plans";
import Input_Custom_Plan from "../../types/Plans/Input_Custom_Plan";
// Function
export default {
    type: GraphQLBoolean,
    args: {
        custom_plan_id: { type: GraphQLID },
        newData: { type: Input_Custom_Plan },
    },
    async resolve(_, { custom_plan_id, newData }) {
        if (!newData)
            return !!(await Custom_Plans_Schema.findByIdAndDelete(
                custom_plan_id
            ));
        return !!(await Custom_Plans_Schema.findByIdAndUpdate(
            custom_plan_id,
            newData
        ));
    },
};
