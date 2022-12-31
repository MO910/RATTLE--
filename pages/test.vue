<template>
    <Datepicker v-model="date"></Datepicker>

    <div class="d-flex align-center flex-column">
        <v-icon>mdi-home</v-icon>
        <v-card width="400">
            <v-card-title>This is a title</v-card-title>
            <v-card-subtitle>This is a subtitle</v-card-subtitle>
            <v-card-text> This is {{ data }} </v-card-text>
        </v-card>
    </div>
</template>

<script>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
    async setup() {
        const counter = useState("counter", () =>
            Math.round(Math.random() * 1000)
        );
        // const dataa = await useFetch(`/api/mongo`);

        const query = gql`
            query {
                user(id: "634d4b4fc7bcf336fb038892") {
                    id
                    first_name
                }
            }
        `;
        const data = await useAsyncQuery(query);
    },
    components: { Datepicker },
    data() {
        return {
            date: null,
        };
    },
};
</script>
