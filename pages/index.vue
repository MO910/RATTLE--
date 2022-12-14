<template>
    <div class="d-flex align-center flex-column">
        <v-icon>mdi-home</v-icon>
        <v-card width="400">
            <v-card-title>This is a title</v-card-title>
            <v-card-subtitle>This is a subtitle</v-card-subtitle>
            <v-card-text> This is {{ dataa }} </v-card-text>
        </v-card>
    </div>
</template>

<script setup>
const counter = useState("counter", () => Math.round(Math.random() * 1000));
const dataa = await useFetch(`/api/mongo`);

// const query = gql`
//     query characters {
//         characters {
//             results {
//                 name
//                 gender
//             }
//         }
//     }
// `;
// const { data } = await useAsyncQuery(query);
console.log(dataa);
</script>
