<template lang="pug">
v-dialog(
    v-model='userForm.dialog'
    @update:modelValue='close'
    :persistent='loading || userForm.edit'
    max-width='570px'
)
    v-card
        v-card-title.text-h4.text-capitalize
            span {{$vuetify.locale.t("$vuetify.addUser")}}
            v-btn delete
        v-card-text
            v-container
                v-form(v-model="userForm.textFieldsValid" ref="userFormRef")
                    v-row
                        v-col(cols='12')
                            v-chip-group(
                                v-model='userForm.selectedRules'
                                active-class='text-blue' column multiple
                            )
                                v-chip(v-for='rule in userForm.rules' filter) {{ rule }}
                        v-col(cols='6')
                            v-text-field(
                                v-model='userForm.first_name'
                                :variant='variant'
                                :rules="[requiredRole]"
                                name="first name"
                                autocomplete="first name"
                                :label="$vuetify.locale.t('$vuetify.first_name')"
                            )
                        v-col(cols='6')
                            v-text-field(
                                v-model='userForm.parent_name'
                                :variant='variant'
                                :rules="[requiredRole]"
                                name="parent name"
                                autocomplete="parent name"
                                :label="$vuetify.locale.t('$vuetify.parent_name')"
                            )
                        v-col(cols='12')
                            v-text-field(
                                v-model="userForm.email"
                                :variant='variant'
                                :rules="[requiredRole]"
                                name="email"
                                autocomplete="email"
                                :label="$vuetify.locale.t('$vuetify.email')"
                            )
                        v-col(cols='12')
                            v-text-field(
                                v-model='userForm.phone'
                                :variant='variant'
                                name="phone"
                                autocomplete="phone"
                                :label="$vuetify.locale.t('$vuetify.phone')"
                            )
                        v-col(cols='6')
                            v-select(
                                v-model="userForm.selectedCenterId"
                                :variant='variant'
                                :items="organization.centers"
                                item-text='title'
                                item-value='id'
                                label="center"
                            )
                        v-col(cols='6')
                            v-select(
                                v-model="userForm.selectedGroupId"
                                :variant='variant'
                                :disabled='!selectedCenterGroups'
                                :items="selectedCenterGroups"
                                item-text='title'
                                item-value='id'
                                label="group"
                            )
                v-card-actions
                    v-spacer
                    v-btn(color='red darken-1' text @click='close(false)')
                        | {{$vuetify.locale.t("$vuetify.cancel")}}
                    v-btn(
                        @click='apply'
                        color='blue darken-1' text
                        :loading='loading'
                        :disabled='!valid'
                    ) {{$vuetify.locale.t(`$vuetify.${userForm.edit ? 'edit' : 'add'}`)}}
</template>
<script>
// Stores
import { storeToRefs } from "pinia";
import { useAdminStore } from "~/store/admin";
import { useGroupsStore } from "~/store/groups";
import { useUserFormStore } from "~/store/admin/userForm";
import { useCustomCardStore } from "~/store/customCard";

export default {
    props: ["newUserRule", "nodePath"],
    setup() {
        const adminStore = useAdminStore();
        const groupsStore = useGroupsStore();
        const userFormStore = useUserFormStore();
        const customCardStore = useCustomCardStore();
        return {
            adminStore,
            userFormStore,
            customCardStore,
            ...storeToRefs(adminStore),
            ...storeToRefs(customCardStore),
            ...storeToRefs(userFormStore),
            ...storeToRefs(groupsStore),
        };
    },
    data: () => ({
        requiredRole: (v) => !!v || "this field is required",
        variant: "outlined",
        form: null,
    }),
    mounted() {
        // console.log({ form: this.form });
    },
    computed: {
        selectedCenterGroups() {
            return this.organization.centers?.filter(
                (c) => c.id == this.userForm.selectedCenterId
            )?.[0]?.groups;
        },
        valid() {
            return (
                this.userForm.textFieldsValid &&
                this.userForm.selectedRules.length
            );
        },
    },
    methods: {
        // validate
        async close(val) {
            // validate
            await this.$refs?.userFormRef?.validate();
            // if open do nothing
            if (val) return;
            this.userForm.dialog = false;
            this.userForm.first_name =
                this.userForm.email =
                this.userForm.phone =
                    "";
            // reset store
            this.userFormStore.$reset();
        },
        async apply() {
            this.userForm.loading = true;
            if (!this.valid) return;
            // prepare data
            let rules = this.userForm.selectedRules?.map(
                    (ti) => this.userForm.rules[ti]
                ),
                args = {
                    organization_id: this.organization.id,
                    group_id: this.userForm.selectedGroupId,
                    email: this.userForm.email,
                    first_name: this.userForm.first_name,
                    parent_name: this.userForm.parent_name,
                    phone: this.userForm.phone,
                    rules: rules.map((title) => ({
                        title,
                    })),
                    nodePath: "users",
                };
            // do action
            if (this.userForm.edit) {
                await this.adminStore.updateUser(args);
            } else {
                await this.adminStore.createUser(args);
            }
            // stop loading and close dialog
            this.userForm.loading = false;
            this.close();
        },
    },
};
</script>
