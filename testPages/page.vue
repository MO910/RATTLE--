<template lang="pug">
v-container
    v-row
        v-col
            .page(v-text='getPage(3)')

</template>

<script>
import { storeToRefs } from "pinia";
import { useQuranStore } from "~/store/quran";

export default {
    async setup() {
        // use auth data
        const quranStore = useQuranStore();
        return { ...storeToRefs(quranStore) };
    },
    mounted() {},
    methods: {
        getPage(index) {
            let allVersesText = [];
            this.versesPerPage.pages[index].forEach((verse) => {
                let splittedVerseKey = verse.verse_key.split(":"),
                    surahIndex = splittedVerseKey[0] - 1,
                    ayahIndex = splittedVerseKey[1] - 1,
                    text = this.pages[surahIndex].surah[ayahIndex];
                allVersesText.push(text);
                allVersesText.push(`(${ayahIndex})`);
            });
            return allVersesText.join(" ");
        },
    },
};
</script>

<style lang="sass" scoped>
.page
    width: 14cm
    height: 20cm
    text-align: justify
    font-size: 31.46px
    line-height: 51px
</style>
