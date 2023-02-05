<template lang="pug">
v-dialog(v-model='addUserDialog' persistent max-width='600px')
    v-card
        v-card-title.text-h4.text-capitalize {{$vuetify.locale.t("$vuetify.users")}}
        v-card-text
            v-container
                v-form(v-model="textFieldsValid")
                    v-row
                        v-col(cols='12')
                            //- searching
                            v-chip-group(
                                v-model='selectedRules'
                                active-class='primary--text' column multiple
                            )
                                v-chip(v-for='rule in rules' filter) {{ rule }}
                        v-col(cols='6')
                            v-text-field(
                                v-model='first_name'
                                :rules="[requiredRole]"
                                name="first name"
                                autocomplete="first name"
                                :label="$vuetify.locale.t('$vuetify.first_name')"
                            )
                        v-col(cols='6')
                            v-text-field(
                                v-model='parent_name'
                                :rules="[requiredRole]"
                                name="parent name"
                                autocomplete="parent name"
                                :label="$vuetify.locale.t('$vuetify.parent_name')"
                            )
                        v-col(cols='12')
                            v-text-field(
                                v-model="email"
                                :rules="[requiredRole]"
                                name="email"
                                autocomplete="email"
                                :label="$vuetify.locale.t('$vuetify.email')"
                            )
                        v-col(cols='12')
                            v-text-field(
                                v-model='phone'
                                name="phone"
                                autocomplete="phone"
                                :label="$vuetify.locale.t('$vuetify.phone')"
                            )
                        v-col(cols='6')
                            v-select(
                                v-model="selectedCenterId"
                                :items="organization.centers"
                                item-text='title'
                                item-value='id'
                                label="center"
                            )
                        v-col(cols='6')
                            v-select(
                                v-model="selectedGroupId"
                                :disabled='!selectedCenterGroups'
                                :items="selectedCenterGroups"
                                item-text='title'
                                item-value='id'
                                label="group"
                            )
                v-card-actions
                    v-spacer
                    v-btn(color='red darken-1' text @click='close')
                        | {{$vuetify.locale.t("$vuetify.cancel")}}
                    v-btn(color='blue darken-1' text @click='add' :disabled='!valid')
                        | {{$vuetify.locale.t("$vuetify.add")}}
</template>
<script>
import { storeToRefs } from "pinia";
import { useAdminStore } from "~/store/admin";

export default {
    props: ["newUserRule", "nodePath"],
    setup() {
        const adminStore = useAdminStore();
        return { adminStore, ...storeToRefs(adminStore) };
    },
    data: () => ({
        textFieldsValid: false,
        first_name: "",
        parent_name: "",
        email: "",
        phone: "",
        selectedCenterId: null,
        selectedGroupId: null,
        rules: ["student", "parent", "teacher", "admin"],
        selectedRules: [],
        requiredRole: (v) => !!v || "this field is required",
    }),
    computed: {
        selectedCenterGroups() {
            return this.organization.centers?.filter(
                (c) => c.id == this.selectedCenterId
            )?.[0]?.groups;
        },
        valid() {
            return this.textFieldsValid && this.selectedRules.length;
        },
    },
    methods: {
        close() {
            this.name = this.email = this.phone = "";
            this.addUserDialog = false;
        },
        async add() {
            if (!this.valid) return;
            let rules = this.selectedRules?.map((ti) => this.rules[ti]);
            await this.adminStore.createUser({
                organization_id: this.organization.id,
                group_id: this.selectedGroupId,
                email: this.email,
                first_name: this.first_name,
                parent_name: this.parent_name,
                phone: this.phone,
                rules: rules.map((title) => ({
                    title,
                })),
                nodePath: "users",
            });
            this.close();
        },
    },
};
</script>
