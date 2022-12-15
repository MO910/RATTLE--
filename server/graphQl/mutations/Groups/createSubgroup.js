import {
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLBoolean,
    GraphQLList,
} from "graphql";
import Subgroups_Schema from "../../../models/Groups/Subgroups";
import Subgroup_type from "../../types/Groups/Subgroup";
// Function
export default {
    type: Subgroup_type,
    args: {
        course_id: { type: GraphQLID },
        title: { type: GraphQLString },
        student_ids: { type: GraphQLID },
    },
    async resolve(_, args) {
        return await Subgroups_Schema.create(args);
    },
};
