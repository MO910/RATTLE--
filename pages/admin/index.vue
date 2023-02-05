<template lang="pug">
v-container
    v-row.mb-8
        //- v-col.text-h3(cols='12') {{$vuetify.locale.t(`$vuetify.${mode}`)}}
</template>

<script>
export default {
    mounted() {
        console.log(this.$route.query?.mode);
    },
};
</script>
