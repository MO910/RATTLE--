<template lang="pug">
v-container
    group-heading-row
    //- teacher
    template(v-if='hasAuth')
        v-row
            v-col.text-h4(cols=12) {{$vuetify.locale.t("$vuetify.subjects")}}
        custom-card(:each='courses' to='to' translate titleStyling='text-h4')
</template>

<script>
// Stores
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import { useGroupsStore } from "~/store/groups";
// components
import groupHeadingRow from "~/components/admin/group/groupHeadingRow";

export default {
    components: { groupHeadingRow },
    async setup() {
        // fetch user
        definePageMeta({
            middleware: ["fetch-user", "fetch-groups", "has-auth"],
        });
        // use groups data
        const authStore = useAuthStore();
        const groupsStore = useGroupsStore();
        // return the store
        return { ...storeToRefs(authStore), ...storeToRefs(groupsStore) };
    },
    mounted() {
        console.log(this.courses);
    },
    computed: {
        courses() {
            const { groupId } = useRoute().params;
            const courses = this.groups?.filter((g) => g.id == groupId)[0]
                ?.courses;
            return courses.map((course) => {
                course.to = `courses/${course.id}`;
                return course;
            });
        },
        folders() {
            // const { groupId } = useRoute().params;
            // const currentGroup = this.groups.find(
            //     (group) => group.id === groupId
            // );
            // const isOne = currentGroup.courses?.length === 1;
            // const title = currentGroup.courses[0].title;
            // const id = currentGroup.courses[0].id;
            return [
                // {
                //     title: "$vuetify.subjects",
                //     icon: "mdi-bookshelf",
                //     color: "teal darken-1",
                //     title_color: "teal--text text--darken-4",
                //     to: quranId ? `courses/${quranId}` : "courses",
                // },
                {
                    title: "$vuetify.attend",
                    icon: "mdi-calendar-range",
                    color: "pink darken-2",
                    title_color: "pink--text text--darken-4",
                    to: "attendance",
                },
            ];
        },
        hasAuth() {
            console.log({
                authorizationForCurrentGroup: this.authorizationForCurrentGroup,
            });
            return this.authorizationForCurrentGroup?.some((rule) =>
                rule.match(/(teacher)|(owner)|(admin)/i)
            );
        },
    },
};
</script>
