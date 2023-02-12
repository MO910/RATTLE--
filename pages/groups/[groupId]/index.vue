<template lang="pug">
v-container
    manage-group-btn
    //- teacher
    div(v-if='authorizationForCurrentGroup?.includes("teacher")')
        custom-card(:each='courses' to='to')
        custom-card(:each='folders' to='to' translate)
</template>

<script>
// Stores
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import { useGroupsStore } from "~/store/groups";
// components
import manageGroupBtn from "~/components/admin/manageGroupBtn";

export default {
    components: { manageGroupBtn },
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
    },
};
</script>
