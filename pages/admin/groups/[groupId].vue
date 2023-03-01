<template lang="pug">
v-container
    v-row 
        v-col.text-h3 {{ group?.title }}
        //- add user
        v-col
            v-btn.mx-2(
                @click='openAddStudentDialog'
                color='blue' 
                variant='outlined'
            ) add student
        //- searching
        v-col(cols='12' v-if='mode == "users"')
            | Rules:
            v-chip-group(
                v-model='tags'
                selected-class='text-blue' column multiple mandatory
            )
                v-chip(v-for='rule in rules' filter) {{ rule }}
        v-col(cols='12')
            v-text-field(
                v-model="search"
                append-icon="mdi-magnify"
                :label="$vuetify.locale.t(`$vuetify.search`)"
                single-line hide-details
                variant='solo'
            )
    //- tabs
    v-row 
        v-col
            v-tabs(
                v-model="activeSubTab"
                align-tabs="end" grow
            )
                v-tab(v-for='tab, i in tabs' :value="i") {{tab.title}}
            v-window(v-model="activeSubTab")
                //- v-window-item(v-for='i in [0, 1]' :value="i")
                v-window-item(:value="0")
                    users(v-if='searchResults.length' :searchResults='searchResults')
                    span(v-else) there is no users here!!
                v-window-item(:value="1")
                    custom-card(:each='group.courses')
                v-window-item(:value="2") 
                    v-card
                        v-card-title(v-if='group.teacher') {{teacherName}}
                        v-card-title(v-else) there is no teacher assigned for this group
    //- dialogs
    user-form
    confirm-dialog(type='remove' :action='removeUser')
        span(v-html='confirmRemoveMsg')
</template>

<script>
// Stores
import { storeToRefs } from "pinia";
import { useAdminStore } from "~/store/admin";
import { useGroupsStore } from "~/store/groups";
import { useUserFormStore } from "~/store/admin/userForm";
import { useAuthStore } from "~/store/auth";
import { useCustomCardStore } from "~/store/customCard";
// components
import users from "~/components/admin/users";
import customCard from "~/components/customCard";
import contextmenu from "~/components/customCard/contextmenu";
import userForm from "~/components/admin/userForm";
import confirmDialog from "~/components/customCard/contextmenu/confirmDialog";

export default {
    components: { users, customCard, contextmenu, userForm, confirmDialog },
    async setup() {
        // fetch data middleware
        definePageMeta({
            middleware: ["fetch-user", "fetch-groups", "has-auth"],
        });
        const authStore = useAuthStore();
        const adminStore = useAdminStore();
        const userFormStore = useUserFormStore();
        const customCardStore = useCustomCardStore();
        const groupsStore = useGroupsStore();
        // return the store
        return {
            adminStore,
            ...storeToRefs(authStore),
            ...storeToRefs(adminStore),
            ...storeToRefs(userFormStore),
            ...storeToRefs(customCardStore),
            ...storeToRefs(groupsStore),
        };
    },
    mounted() {},
    data() {
        return {
            search: "",
        };
    },
    computed: {
        // eval params
        group() {
            const { groupId } = useRoute().params;
            return this.groupsAsAdmin?.filter((g) => g.id == groupId)[0];
        },
        // course() {
        //     const { courseId } = useRoute().params;
        //     return this.group?.courses?.find((s) => s.id == courseId);
        // },
        // tabs
        tabs() {
            return [
                {
                    title: this.$vuetify.locale.t("$vuetify.students"),
                    value: "student",
                },
                {
                    title: this.$vuetify.locale.t("$vuetify.subjects"),
                    value: "subject",
                },
                // {
                //     title: this.$vuetify.locale.t("$vuetify.parents"),
                //     value: "parent",
                // },
                {
                    title: this.$vuetify.locale.t("$vuetify.about"),
                    value: "about",
                },
            ];
            return [
                {
                    title: this.$vuetify.locale.t("$vuetify.groups"),
                    tabs: [
                        {
                            title: this.$vuetify.locale.t("$vuetify.students"),
                        },
                        {
                            title: this.$vuetify.locale.t("$vuetify.subjects"),
                        },
                        {
                            title: this.$vuetify.locale.t("$vuetify.about"),
                        },
                    ],
                },
                {
                    title: this.$vuetify.locale.t("$vuetify.plans"),
                },
                {
                    title: this.$vuetify.locale.t("$vuetify.competitions"),
                },
            ];
        },
        //
        allUsers() {
            const course = this.group.courses?.[0];
            let allUsers = [];
            if (course) {
                // push floating students
                const floatingStudents = course.floatingStudents;
                if (floatingStudents) allUsers.push(floatingStudents.flat());
                // push subgroups students
                const subgroupStudents = course.subgroups
                    .map((subgroup) => subgroup.students)
                    .flat();
                if (subgroupStudents) allUsers.push(subgroupStudents.flat());
            }
            return allUsers.flat();
        },
        searchResults() {
            console.log({ allUsers: this.allUsers });
            //search by rules
            let results = this.allUsers.filter((user) =>
                user.rules.some(
                    (rule) => this.tabs[this.activeSubTab].value === rule.title
                )
            );
            // search by name
            results = results.filter((user) =>
                this.fullName(user).match(this.search)
            );
            // sort by name
            results.sort((x, y) =>
                this.fullName(x).localeCompare(this.fullName(y))
            );
            return results || [];
        },
        // remove message
        confirmRemoveMsg() {
            const name = this.fullName(this.contextMenu.entity);
            return this.$vuetify.locale
                .t(`$vuetify.confirmRemoveMsg`)
                .replace("###", name);
        },
        // get teacher name
        teacherName() {
            return this.fullName(this.group.teacher);
        },
    },
    methods: {
        // open dialogs actions
        openAddStudentDialog() {
            const { groupId } = useRoute().params;
            this.userForm.selectedGroupId = groupId;
            this.userForm.selectedRules = [0];
            this.userForm.dialog = true;
        },
        // get full name or title
        fullName(entity) {
            return `${entity.first_name} ${entity.parent_name || ""}`;
        },
        // remove user
        async removeUser() {
            await this.adminStore.removeUser(this.contextMenu.entity.id);
        },
    },
};
</script>
