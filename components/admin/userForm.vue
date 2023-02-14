<template lang="pug">
v-dialog(
    v-model='userForm.dialog'
    @update:modelValue='close'
    :persistent='loading || userForm.edit'
    max-width='570px'
)
    v-card
        v-card-title.text-h4.text-capitalize {{cardTitle}}
        //- v-btn(:click='userFormRef.validate()') delete
        v-card-text
            v-container
                v-form(v-model="userForm.textFieldsValid" ref="userFormRef")
                    //- select gender
                    v-item-group(mandatory v-model='userForm.genderSelected')
                        v-row
                            v-col(
                                v-for='gender in genders'
                                cols=12 md=6
                            )
                                v-item(v-slot='{isSelected, toggle}')
                                    v-card(
                                        :color="isSelected ? 'blue' : 'grey-darken-3'"
                                        class="d-flex align-center"
                                        height="125" flat
                                        @click="toggle" 
                                    )
                                        v-card-title.text-h3.flex-grow-1.text-center.text-capitalize {{ gender.title }}
                    v-row
                        //- v-col(cols='12')
                            v-chip-group(
                                v-model='userForm.selectedRules'
                                active-class='text-blue' column multiple
                            )
                                v-chip(v-for='rule in userForm.rules' filter) {{ rule }}
                        v-col(cols=12)
                            v-text-field(
                                v-model='userForm.first_name'
                                :variant='variant'
                                :rules="[requiredRole]"
                                name="first name"
                                autocomplete="first name"
                                :label="$vuetify.locale.t('$vuetify.first_name')"
                            )
                        v-col(cols=12)
                            v-text-field(
                                v-model='userForm.parent_name'
                                :variant='variant'
                                :rules="[requiredRole]"
                                name="parent name"
                                autocomplete="parent name"
                                :label="$vuetify.locale.t('$vuetify.parent_name')"
                            )
                        v-col(cols=12)
                            v-text-field(
                                v-model="userForm.email"
                                :variant='variant'
                                name="email"
                                autocomplete="email"
                                :label="$vuetify.locale.t('$vuetify.email')"
                            )
                        v-col(cols=12)
                            v-text-field(
                                v-model='userForm.phone'
                                :variant='variant'
                                name="phone"
                                autocomplete="phone"
                                :label="$vuetify.locale.t('$vuetify.phone')"
                            )
                        //- v-col(cols='6')
                        //-     v-select(
                        //-         v-model="userForm.selectedCenterId"
                        //-         :variant='variant'
                        //-         :items="organization.centers"
                        //-         item-text='title'
                        //-         item-value='id'
                        //-         label="center"
                        //-     )
                        //- v-col(cols='6')
                        //-     v-select(
                        //-         v-model="userForm.selectedGroupId"
                        //-         :variant='variant'
                        //-         :disabled='!selectedCenterGroups'
                        //-         :items="selectedCenterGroups"
                        //-         item-text='title'
                        //-         item-value='id'
                        //-         label="group"
                        //-     )
                v-card-actions
                    v-spacer
                    v-btn(color='red darken-1' text @click='close(false)')
                        | {{$vuetify.locale.t("$vuetify.cancel")}}
                    v-btn(
                        @click='apply'
                        color='blue darken-1' text
                        :loading='userForm.loading'
                        :disabled='!valid'
                    ) {{$vuetify.locale.t(`$vuetify.${userForm.edit ? 'edit' : 'add'}`)}}
</template>
<script>
// Stores
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import { useAdminStore } from "~/store/admin";
import { useGroupsStore } from "~/store/groups";
import { useUserFormStore } from "~/store/admin/userForm";
import { useCustomCardStore } from "~/store/customCard";

export default {
    props: ["newUserRule", "nodePath"],
    setup() {
        const authStore = useAuthStore();
        const adminStore = useAdminStore();
        const groupsStore = useGroupsStore();
        const userFormStore = useUserFormStore();
        const customCardStore = useCustomCardStore();
        return {
            adminStore,
            groupsStore,
            userFormStore,
            customCardStore,
            ...storeToRefs(authStore),
            ...storeToRefs(adminStore),
            ...storeToRefs(customCardStore),
            ...storeToRefs(userFormStore),
            ...storeToRefs(groupsStore),
        };
    },
    data: () => ({
        requiredRole: (v) => !!v || "this field is required",
        variant: "outlined",
        selection: null,
    }),
    mounted() {
        // const { groupId } = useRoute().params;
        // for (let auth of this.groupsTree) {
        //     if (this.user[auth[0]].find(checkGroup))
        //         authStore.authorizationForCurrentGroup.push(auth[1]);
        // }
        // this.user.groupsAsAdmin;
    },
    computed: {
        cardTitle() {
            if (this.userForm.selectedRules.includes(0))
                return this.$vuetify.locale.t("$vuetify.addStudent");
        },
        selectedCenterGroups() {
            return this.organization.centers?.filter(
                (c) => c.id == this.userForm.selectedCenterId
            )?.[0]?.groups;
        },
        valid() {
            return (
                this.userForm.first_name &&
                this.userForm.parent_name &&
                this.userForm.selectedRules
            );
        },
        genders() {
            return [
                {
                    title: this.$vuetify.locale.t("$vuetify.male"),
                    value: "male",
                },
                {
                    title: this.$vuetify.locale.t("$vuetify.female"),
                    value: "female",
                },
            ];
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
            // console.log(this.valid);
            // if (!this.valid) return;
            // prepare data
            let rules = this.userForm.selectedRules?.map(
                    (ti) => this.userForm.rules[ti]
                ),
                args = {
                    // organization_id: this.organization.id,
                    group_ids: [this.userForm.selectedGroupId],
                    email: this.userForm.email,
                    first_name: this.userForm.first_name,
                    parent_name: this.userForm.parent_name,
                    phone: this.userForm.phone,
                    rules: rules.map((title) => ({
                        title,
                    })),
                    tree: ["groupsAsAdmin"],
                    targetArray: "courses[0].floatingStudents",
                };
            // prepare the tree
            // args.tree = this.groupsStore.checkAuthForGroup(
            //     this.userForm.selectedGroupId
            // );
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
