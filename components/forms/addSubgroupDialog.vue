<template lang="pug">
v-dialog(
    max-width="570"
    v-model='addSubgroupDialog'
    transition="scale-transition"
    :persistent='loading'
)
    v-card
        v-card-title.text-capitalize {{$vuetify.locale.t("$vuetify.newSubgroup")}}
        v-card-text
            v-text-field(
                v-model='title'
                name="title" autocomplete="title"
                variant='underlined'
                :label="$vuetify.locale.t('$vuetify.name')"
            )
        v-card-actions
            v-spacer
            v-btn(color='error' text @click='close')
                | {{$vuetify.locale.t("$vuetify.cancel")}}
            v-btn(color='blue' text @click='add' :loading='loading')
                | {{$vuetify.locale.t("$vuetify.add")}}

</template>
<script>
// stores
import { storeToRefs } from "pinia";
import { useGroupsStore } from "~/store/groups";

export default {
    setup() {
        // use stores data
        const groupsStore = useGroupsStore();
        return { groupsStore, ...storeToRefs(groupsStore) };
    },
    data: () => ({ title: "", loading: false }),
    methods: {
        close() {
            this.addSubgroupDialog = false;
        },
        async add() {
            const { courseId } = this.$route.params;
            this.loading = true;
            await this.groupsStore.createSubgroup({
                title: this.title,
                course_id: courseId,
            });
            this.loading = false;
            this.close();
        },
    },
};
</script>
