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
    Groups_schema = require("../../../models/Groups/Groups"),
    // Subgroups
    Subgroup_type = require("../Groups/Subgroup"),
    Subgroups_schema = require("../../../models/Groups/Subgroups"),
    // center
    Organizations_schema = require("../../../models/Organizations"),
    Centers_schema = require("../../../models/Centers"),
    //
    Rule_type = require("../Users/Rule"),
    rulesConverter = require("../shared/rulesConverter");
// User Type
const User_type = new GraphQLObjectType({
    name: `User`,
    fields: () => ({
        ...userBaseFields,
        // admin
        groupsAsAdmin: {
            type: new GraphQLList(Group_type),
            async resolve({ id: owner_id, rule_ids }) {
                let rules = await rulesConverter({ rule_ids });
                rules = rules.map((rule) => rule.title);
                // organization admin
                if (rules.indexOf("OWNER_organization") !== -1) {
                    let organizations = await Organizations_schema.find({
                            owner_id,
                        }),
                        $in = organizations.map(
                            (organization) => organization.id
                        );
                    var centers = await Centers_schema.find({
                        organization_id: { $in },
                    });
                }
                // center admin
                else if (rules.indexOf("OWNER_center") !== -1) {
                    var centers = await Centers_schema.find({ owner_id });
                } else return [];
                // return groups
                let $in = centers.map((center) => center.id);
                return await Groups_schema.find({ center_id: { $in } });
            },
        },
        // teachers
        groupsAsTeacher: {
            type: new GraphQLList(Group_type),
            async resolve({ id }) {
                return await Groups_schema.find({ teacher_id: id });
            },
        },
        // students or parents
        groupsAsParticipant: {
            type: new GraphQLList(Group_type),
            async resolve({ group_ids }, i) {
                return await Groups_schema.find({ _id: { $in: group_ids } });
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
