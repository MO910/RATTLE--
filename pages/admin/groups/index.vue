<template lang="pug">
//- template(v-slot:extension)
    v-tabs(
        v-model="activeTab"
    )
        v-tab(v-for='tab, i in tabs' :value="i") {{tab.title}}
v-container
    v-row
        v-col.text-h3 {{$vuetify.locale.t("$vuetify.groups")}}
    custom-card(:each='groups')
    //- v-window(v-model="activeTab")
        v-window-item(:value="0")
            v-container
                v-tabs(
                    v-model="activeSubTab"
                    align-tabs="end"
                )
                    v-tab(v-for='tab, i in tabs[activeTab].tabs' :value="i") {{tab.title}}
                v-window(v-model="activeSubTab")
                    v-window-item(:value="0")
                        students
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
import students from "~/components/admin/students";

export default {
    components: { students },
    async setup() {
        // fetch data middleware
        definePageMeta({
            middleware: ["fetch-user", "fetch-groups", "admin-entity"],
        });
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
    mounted() {},
    data() {
        return {};
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
        // tabs
        tabs() {
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
    },
    methods: {},
};
</script>
