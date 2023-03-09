<template lang="pug">
//- users cards
custom-card(
    :each="searchResults"
    :evalTitle='fullName'
    :openContext="openStudentContext"
    :link='false' translate
    :description='mode == "centers"'
)
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
import customCard from "~/components/customCard";
import contextmenu from "~/components/customCard/contextmenu";
import userForm from "~/components/admin/userForm";
import confirmDialog from "~/components/customCard/contextmenu/confirmDialog";

export default {
    props: ["searchResults"],
    components: { customCard, contextmenu, userForm, confirmDialog },
    async setup() {
        // fetch data middleware
        // definePageMeta({
        //     middleware: ["fetch-user", "fetch-groups", "admin-entity"],
        // });
        const authStore = useAuthStore();
        const adminStore = useAdminStore();
        const userFormStore = useUserFormStore();
        const customCardStore = useCustomCardStore();
        const groupsStore = useGroupsStore();
        // return the store
        return {
            ...storeToRefs(authStore),
            ...storeToRefs(adminStore),
            ...storeToRefs(userFormStore),
            ...storeToRefs(customCardStore),
            ...storeToRefs(groupsStore),
        };
    },
    mounted() {
        // select all rules
        // if (this.mode == "users")
        //     this.tags = Array.from(
        //         { length: this.rules.length },
        //         (_, i) => i * 1
        //     );
    },
    data() {
        return {
            tab: null,
            // mode: this.$route.query?.mode,
            mode: "users",
            page: 1,
            pageCount: 2,
            itemsPerPage: 10,
            select: false,
            search: "",
            tempValue: "",
            newGroupSelectedId: "",
            tags: [],
        };
    },
    computed: {
        // eval params
        group() {
            const { groupId } = useRoute().params;
            return this.groups?.find((g) => g.id == groupId);
        },
        course() {
            const { courseId } = useRoute().params;
            return this.group?.courses?.find((s) => s.id == courseId);
        },
        //
        // allEntitiesInfo() {
        //     return this.users?.map((user) => {
        //         const group = user.groups?.map((g) => g.title)?.join(", ");
        //         const subgroup = user.subgroups
        //             ?.map((g) => g.title)
        //             ?.join(", ");
        //         return { ...user, group, subgroup };
        //     });
        // },
        // searchResults() {
        //     let results;
        //     // if (this.mode == "users") {
        //     let selectedRules = this.tags?.map((ti) => this.rules[ti]);
        //     //search by rules
        //     results = this.allEntitiesInfo.filter((user) =>
        //         user.rules.some((rule) => "student" === rule.title)
        //     );
        //     // search by name
        //     results = results.filter((user) =>
        //         this.fullName(user).match(this.search)
        //     );
        //     // sort by name
        //     results.sort((x, y) =>
        //         this.fullName(x).localeCompare(this.fullName(y))
        //     );
        //     // } else if (this.mode == "centers")
        //     //     results = this.organization.centers.filter((center) =>
        //     //         `${center.title} ${center.description}`.match(this.search)
        //     //     );
        //     return results || [];
        // },
        // rules() {
        //     let rules = this.allEntitiesInfo
        //         .map((u) => u.rules)
        //         .flat()
        //         .map((r) => r.title);
        //     return Array.from(new Set(rules));
        // },
        // translate remove text
        confirmRemoveMsg() {
            const translate = this.$vuetify.locale.t(
                "$vuetify.confirmRemoveMsg"
            );
            const text = this.fullName(this.contextMenu.entity);
            const classes = "font-weight-bold";
            return translate.replace(
                "###",
                `<span class='${classes}'> ${text}</span>`
            );
        },
    },
    methods: {
        // context
        openStudentContext() {
            this.contextMenu.type = "user";
        },
        // open dialogs actions
        openAddUserDialog() {
            this.userForm.dialog = true;
            // this.updateModel(["addUserDialog", true]);
        },
        openEditUserDialog(user) {
            // this.updateModel(["editUserForm.dialog", true]);
            // this.updateModel(["editUserForm.user", user]);
        },
        openCenterDialog() {
            // this.updateModel(["addCenterForm.dialog", true]);
        },
        openImport() {
            // this.updateModel(["importExcel.dialog", true]);
        },
        async removeAction() {
            this.confirmDialogLoading = true;
            // do action
            // await this.groupsStore.removeSubgroup({
            //     id: this.contextMenu.entity.id,
            //     course_id,
            // });

            // stop loading and close dialog
            // this.confirmDialogLoading = false;
            // this.contextMenu.dialog.show = false;
        },
        // get full name or title
        fullName(entity) {
            if (this.mode == "users")
                return `${entity.first_name} ${entity.parent_name || ""}`;
            else if (this.mode == "centers") return entity.title;
        },
    },
};
</script>
