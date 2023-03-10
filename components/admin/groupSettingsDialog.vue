<template lang="pug">
v-dialog(
    v-model='groupSettingsDialog'
    max-width='570px'
)
    v-card
        v-card-title.text-h4.text-capitalize {{$vuetify.locale.t(`$vuetify.settings`)}}
        v-card-text
            v-container
                v-row
                    v-col.text-h6 {{$vuetify.locale.t(`$vuetify.teacher`)}}
                    v-col 
                        v-select(
                            v-model="selected"
                            :items="teachers"
                        )
                            template(#prepend-item)
                                v-list-item(value='add' @click='addTeacherAction') {{$vuetify.locale.t(`$vuetify.addTeacher`)}}
                                v-divider
</template>

<script>
import { storeToRefs } from "pinia";
import { useAdminStore } from "~/store/admin";

export default {
    props: ["addTeacherAction"],
    setup() {
        const adminStore = useAdminStore();
        return { adminStore, ...storeToRefs(adminStore) };
    },
    data: () => ({
        items: ["fsda", "fdsa"],
        selected: null,
    }),
    mounted() {
        this.adminStore.getTeachers("6336d66da99d2cb48dab4446");
    },
    computed: {},
    methods: {},
};
</script>
