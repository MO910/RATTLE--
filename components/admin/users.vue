<template lang="pug">
//- users cards
custom-card(
    :each="searchResults"
    :evalTitle='fullName'
    :openContext="openStudentContext"
    :link='false'
    :description='mode == "centers"'
    :addAction='addAction' addButton
    :clickEvent='openProfile'
)
profile(:evalName='fullName')
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
import profile from "~/components/admin/profile";
import confirmDialog from "~/components/customCard/contextmenu/confirmDialog";
import { useProfileStore } from "~/store/profile";

export default {
    props: ["searchResults", "addAction"],
    components: { customCard, contextmenu, userForm, confirmDialog, profile },
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
        const profileStore = useProfileStore();
        // return the store
        return {
            ...storeToRefs(authStore),
            ...storeToRefs(adminStore),
            ...storeToRefs(userFormStore),
            ...storeToRefs(customCardStore),
            ...storeToRefs(groupsStore),
            ...storeToRefs(profileStore),
        };
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
        },
        async removeAction() {
            this.confirmDialogLoading = true;
        },
        openProfile(entity) {
            this.userProfileDialog = true;
            this.profileEntity = entity;
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
