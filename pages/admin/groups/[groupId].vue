<template lang="pug">
v-container
    v-row 
        v-col.text-h3 {{ group?.title }}
        v-col.d-flex.justify-end.align-center
            v-btn(
                color='blue-darken-3' size='large' prepend-icon="mdi-human-male-board"
                nuxt :to='teacherModeURL'
            ) وضع المعلم
            v-btn.ms-5(
                @click='openGroupSettingsDialog'
                size='large' variant='outlined'
                prepend-icon='mdi-cog'
            ) الاعدادات
        v-col(cols='12')
        //- searching
        v-col(cols='12' v-if='mode == "users"')
            | Rules:
            v-chip-group(
                v-model='tags'
                selected-class='text-blue' column multiple mandatory
            )
                v-chip(v-for='rule in rules' filter) {{ rule }}
        v-col(cols=12)
            v-text-field(
                v-model="search"
                :label="$vuetify.locale.t(`$vuetify.search`)"
                single-line hide-details
                variant='solo'
            )
                template(#append)
                    v-btn.appendBtn.ms-2(
                        size='large'
                        @click='openAddUserDialog()()'
                        color='blue' 
                        variant='outlined'
                    ) {{$vuetify.locale.t(`$vuetify.addStudent`)}}
        v-col
    //- tabs
    v-row 
        v-col
            v-tabs(
                v-model="activeSubTab"
                align-tabs="end" grow
            )
                v-tab(v-for='tab, i in tabs' :value="i") {{$vuetify.locale.t(`$vuetify.${tab}`)}}
            v-window(v-model="activeSubTab")
                //- students
                v-window-item(:value="0")
                    users(
                        v-if='searchResults.length'
                        :searchResults='searchResults'
                        :addAction='openAddUserDialog()'
                    )
                    empty-message(
                        v-else-if='!allUsers.length'
                        message='noStudentsYetMessage'
                        btn='addStudent'
                        :options='studentOptions'
                    )
                v-window-item(v-for='_, i in (tabs.slice(1))' :value="i + 1")
                    soon
                //- div
                    //- courses
                    v-window-item(:value="1")
                        custom-card(:each='group.courses')
                    //- teachers in about
                    v-window-item(:value="2") 
                        custom-card(
                            :each='group.teacher'
                            v-if='group.teacher.length'
                            :evalTitle='fullName'
                            :link='false'
                        )
                        empty-message(
                            v-else
                            message='noTeacherYetMessage'
                            btn='assignTeacher'
                            :options='teacherOptions'
                        )
    //- dialogs
    user-form
    assign-teacher-dialog
    group-settings-dialog(:addTeacherAction='openAddUserDialog(true)')
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
import emptyMessage from "~/components/customCard/emptyMessage";
import userForm from "~/components/admin/userForm";
import assignTeacherDialog from "~/components/admin/assignTeacherDialog";
import groupSettingsDialog from "~/components/admin/groupSettingsDialog";
import confirmDialog from "~/components/customCard/contextmenu/confirmDialog";

export default {
    components: {
        users,
        customCard,
        emptyMessage,
        contextmenu,
        userForm,
        groupSettingsDialog,
        assignTeacherDialog,
        confirmDialog,
    },
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
            tabs: ["students", "parents", "subjects", "about"],
        };
    },
    computed: {
        // eval params
        group() {
            const { groupId } = useRoute().params;
            return this.groupsAsAdmin?.filter((g) => g.id == groupId)[0];
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
            //search by rules
            let results = this.allUsers.filter((user) =>
                user.rules.some((rule) =>
                    this.tabs[this.activeSubTab].includes(rule.title)
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
        // assign teacher options
        teacherOptions() {
            return [
                {
                    text: "addTeacher",
                    action: this.openAddUserDialog(true),
                },
                {
                    text: "assignExistingTeacher",
                    action: this.assignExistingTeacher,
                },
            ];
        },
        studentOptions() {
            return [{ action: this.openAddUserDialog() }];
        },
        teacherModeURL() {
            const { groupId } = useRoute().params;
            return `/${groupId}`;
        },
    },
    methods: {
        // open user dialogs
        openAddUserDialog(isTeacher) {
            console.log({ isTeacher });
            return () => {
                const { groupId } = useRoute().params;
                this.userForm.selectedGroupId = groupId;
                this.userForm.selectedRules = [isTeacher ? 2 : 0];
                this.userForm.dialog = true;
            };
        },
        // teacher
        assignExistingTeacher() {
            this.assignTeacherForm.dialog = true;
        },
        openGroupSettingsDialog() {
            this.groupSettingsDialog = true;
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

<style lang="sass">
.v-input__append
    padding: 0
.appendBtn
    height: 100% !important
</style>
