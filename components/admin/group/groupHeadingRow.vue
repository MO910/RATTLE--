<template lang="pug">
v-row.mb-8
    v-col.text-h2 {{group.title}}
    v-col.d-flex.justify-end.align-center
        v-btn(
            v-if='authorizationForCurrentGroup?.includes("admin")'
            :to='manageRout' nuxt
            prepend-icon='mdi-human-capacity-increase' color='blue-darken-3' size='large'
        ) {{$vuetify.locale.t("$vuetify.manageGroup")}}
        v-btn.ms-3(
            v-if='!isAttendance'
            :to='attendanceRout' nuxt
            prepend-icon='mdi-format-list-checks' variant='outlined' size='large'
        ) {{$vuetify.locale.t("$vuetify.attend")}}
    v-col(cols=12)
        v-divider
</template>

<script>
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import { useGroupsStore } from "~/store/groups";

export default {
    async setup() {
        // use groups data
        const authStore = useAuthStore();
        const groupsStore = useGroupsStore();
        // return the store
        return { ...storeToRefs(authStore), ...storeToRefs(groupsStore) };
    },
    mounted() {
        console.log();
    },
    computed: {
        group() {
            const { groupId } = useRoute().params;
            console.log(this.groups);
            return this.groups.find((group) => group.id === groupId);
        },
        isAttendance() {
            return useRoute().href.split("/").includes("attendance");
        },
        // routes
        manageRout() {
            const { groupId } = useRoute().params;
            return `/admin/groups/${groupId}`;
        },
        attendanceRout() {
            const { groupId } = useRoute().params;
            return `/${groupId}/attendance`;
        },
    },
};
</script>
