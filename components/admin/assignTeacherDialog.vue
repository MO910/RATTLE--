<template lang="pug">
v-dialog(
    v-model='assignTeacherForm.dialog'
    max-width='570px'
)
    v-card
        v-card-title.text-h4.text-capitalize {{$vuetify.locale.t(`$vuetify.assignTeacher`)}}
        v-card-text
        
</template>

<script>
import { storeToRefs } from "pinia";
import { useUserFormStore } from "~/store/admin/userForm";

export default {
    setup() {
        const userFormStore = useUserFormStore();
        return {
            ...storeToRefs(userFormStore),
        };
    },
    computed: {},
    methods: {},
};
</script>
