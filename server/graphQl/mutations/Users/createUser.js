import {
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLBoolean,
} from "graphql";
// User
import User_Schema from "../../../models/Users/Users";
import User_type from "../../types/Users/User";
// rule convert function
import rulesConverter from "../../types/shared/rulesConverter";
// Function
export default {
    type: User_type,
    args: {
        email: { type: GraphQLString },
        group_id: { type: GraphQLID },
        organization_id: { type: GraphQLID },
        password: { type: GraphQLString },
        first_name: { type: GraphQLString },
        parent_name: { type: GraphQLString },
        gender: { type: GraphQLString },
        phone: { type: GraphQLString },
        rules: { type: new GraphQLList(GraphQLString) },
    },
    async resolve(_, args) {
        // extract id from rule title
        args.rule_ids = await rulesConverter({ rules: args.rules });
        return User_Schema.create(args);
    },
};
