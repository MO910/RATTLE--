<template lang="pug">
v-dialog(
    v-model='userProfileDialog'
    max-width='570px'
)
    v-card
        v-card-title.text-h4.text-capitalize {{evalName(profileEntity)}}
        v-card-text
            v-container
                v-row
                    v-col
</template>

<script>
import { storeToRefs } from "pinia";
import { useProfileStore } from "~/store/profile";

export default {
    props: ["evalName"],
    setup() {
        const profileStore = useProfileStore();
        return { profileStore, ...storeToRefs(profileStore) };
    },
    data: () => ({}),
    mounted() {},
    computed: {},
    methods: {},
};
</script>
