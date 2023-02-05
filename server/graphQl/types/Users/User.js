const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
} = require("graphql");
const userBaseFields = require("../shared/userBaseFields"),
    getGroupFromStudentId = require("../shared/getGroupFromStudentId"),
    // Groups
    Group_type = require("../Groups/Group"),
    // Subgroups
    Subgroup_type = require("../Groups/Subgroup"),
    Subgroups_schema = require("../../../models/Groups/Subgroups");
// User Type
const User_type = new GraphQLObjectType({
    name: `User`,
    fields: () => ({
        ...userBaseFields,
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
module.exports = User_type;
