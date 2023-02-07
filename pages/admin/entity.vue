<template lang="pug">
v-container
    v-row.mb-8
        v-col.text-h3(cols='12') {{$vuetify.locale.t(`$vuetify.${mode}`)}}
        v-col(cols='12')
            //- add user
            v-btn.mx-2(
                v-if='mode == "users"'
                @click='openAddUserDialog'
                color='blue' 
                icon='mdi-plus' 
                variant='outlined'
            )
            //- add center
            v-btn.mx-2(
                v-else-if='mode == "centers"'
                @click='openCenterDialog'
                color='blue'
                icon='mdi-plus' 
                variant='outlined'
            )
            //- v-btn.mx-2(
            //-     @click='openImport'
            //-     color='green'
            //-     icon='mdi-table' 
            //-     variant='outlined'
            //- )
            //- v-btn.mx-2(
            //-     @click='select=!select'
            //-     color='secondary'
            //-     icon='mdi-pencil'
            //-     variant='outlined'
            //- ) 
        //- searching
        v-col(cols='12' v-if='mode == "users"')
            | Rules:
            v-chip-group(
                v-model='tags'
                selected-class='text-blue' column multiple mandatory
            )
                v-chip(v-for='rule in rules' filter) {{ rule }}
        v-col(cols='12')
            v-text-field(
                v-model="search"
                append-icon="mdi-magnify"
                :label="$vuetify.locale.t(`$vuetify.search`)"
                single-line hide-details
                variant='solo'
            )
    //- users cards
    customCard(
        :each='searchResults'
        :evalTitle='fullName'
        chips='rules'
        :evalChipsTitle='(rule) => rule.title'
        translate
        link=false
    )
    //- v-row
        v-col(
            v-for='entity in searchResults'
            md=4 sm=6 xs=12
        )
            v-card(@click='openEditUserDialog(entity)')
                v-card-title {{fullName(entity)}}
                v-card-text(v-if='mode == "users"') 
                    v-chip.ma-3(v-for='rule in entity.rules' :key='rule.id') {{rule.title}}
                v-card-text(v-else-if='mode == "centers"') {{entity.description}}
        v-col(v-if='!searchResults.length') there is no search results
//- dialogs
add-user-dialog(v-if='mode == "users"')
</template>

<script>
// Stores
import { storeToRefs } from "pinia";
import { useAdminStore } from "~/store/admin";
import { useAuthStore } from "~/store/auth";
// components
import customCard from "~/components/customCard";
import addUserDialog from "~/components/admin/addUserDialog";

export default {
    components: { customCard, addUserDialog },
    async setup() {
        const authStore = useAuthStore();
        const adminStore = useAdminStore();
        // fetch data middleware
        definePageMeta({
            middleware: ["fetch-user", "admin-entity"],
        });
        return { ...storeToRefs(authStore), ...storeToRefs(adminStore) };
    },
    mounted() {
        // select all rules
        if (this.mode == "users")
            this.tags = Array.from(
                { length: this.rules.length },
                (_, i) => i * 1
            );
    },
    data() {
        return {
            mode: this.$route.query?.mode,
            page: 1,
            pageCount: 2,
            itemsPerPage: 10,
            select: false,
            search: "",
            tempValue: "",
            newGroupSelectedId: "",
            tags: [],
        };
    },
    computed: {
        allEntitiesInfo() {
            return this.users?.map((user) => {
                const group = user.groups?.map((g) => g.title)?.join(", ");
                const subgroup = user.subgroups
                    ?.map((g) => g.title)
                    ?.join(", ");
                return { ...user, group, subgroup };
            });
        },
        searchResults() {
            let results;
            if (this.mode == "users") {
                let selectedRules = this.tags?.map((ti) => this.rules[ti]);
                //search by rules
                results = this.allEntitiesInfo.filter((user) =>
                    user.rules.some(
                        (rule) => selectedRules?.indexOf(rule.title) !== -1
                    )
                );
                // search by name
                results = results.filter((user) =>
                    this.fullName(user).match(this.search)
                );
                // sort by name
                results.sort((x, y) =>
                    this.fullName(x).localeCompare(this.fullName(y))
                );
            } else if (this.mode == "centers")
                results = this.organization.centers.filter((center) =>
                    `${center.title} ${center.description}`.match(this.search)
                );
            return results || [];
        },
        rules() {
            let rules = this.allEntitiesInfo
                .map((u) => u.rules)
                .flat()
                .map((r) => r.title);
            return Array.from(new Set(rules));
        },
    },
    methods: {
        // open dialogs actions
        openAddUserDialog() {
            this.addUserDialog = true;
            // this.updateModel(["addUserDialog", true]);
        },
        openEditUserDialog(user) {
            // this.updateModel(["editUserForm.dialog", true]);
            // this.updateModel(["editUserForm.user", user]);
        },
        openCenterDialog() {
            // this.updateModel(["addCenterForm.dialog", true]);
        },
        openImport() {
            // this.updateModel(["importExcel.dialog", true]);
        },
        // get full name or title
        fullName(entity) {
            if (this.mode == "users")
                return `${entity.first_name} ${entity.parent_name || ""}`;
            else if (this.mode == "centers") return entity.title;
        },
    },
};
</script>
