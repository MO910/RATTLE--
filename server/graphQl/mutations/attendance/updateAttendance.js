import {
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLBoolean,
} from "graphql";
// Attendance
import Attendances_Schema from "../../../models/Users/Attendances";
import Attendance_type from "../../types/Users/Attendance";
// Function
export default {
    type: GraphQLBoolean,
    args: {
        user_id: { type: GraphQLID },
        updated_by: { type: GraphQLID },
        attendance_status: { type: GraphQLString },
        date: { type: GraphQLString },
        note: { type: GraphQLString },
    },
    async resolve(_, args) {
        // exists
        const exists = await Attendances_Schema.findOneAndUpdate(
            {
                user_id: args.user_id,
                date: args.date,
            },
            args
        );
        return !!(exists || (await Attendances_Schema.create(args)));
    },
};
