<template>
    <div class="settings">
        <!--<div class="settings__tabs">
            <template v-if="userContext === 'business'">
                <div v-for="tab in tabs" class="settings__tabs__tab" :class="[activeTab == tab ? 'active' : '']" :key="tab" @click="activateTab(tab)">{{tab}}</div>
            </template>
            <template v-else>
                <div v-for="tab in tabs.filter(t=> t!=='Team')" class="settings__tabs__tab" :class="[activeTab == tab ? 'active' : '']" :key="tab" @click="activateTab(tab)">{{tab}}</div>

            </template>
        </div>-->

        <SettingsTabs></SettingsTabs>

        


        <template v-if="activeTab == 'Team'">

            <Panel title="Team members" :show_execute_button="false">
                <div class="flex">
                    <div class="card card--nopad bank-list">
                        <div class="empty" v-if="loading_teams">

                            <LoadingState v-if="loading_teams"/>
                        </div>

                        <div class="empty" v-else-if="!team_members.list || team_members.list.length < 1 && !loading_teams">
                            <!--No bank accounts added yet-->
                            
                            <EmptyState state="NO_DATA" caption="No team members added yet"/>
                        </div>
                        <div class="bank-item" v-for="member in team_members.list" :key="member.id">
                            
                            <div class="flex flex--between"><p class="bank-item__name">{{member.name}}</p> <!--<span class="remove remove--desktop" @click="deleteAccount(account.id)">Remove</span>--></div>
                            <p>Joined: {{formatDate(member.createdAt)}} </p>
                            <!--<span class="remove remove--mobile" >Remove</span>-->
                        </div>
                        <div class="bank-item__invitations" v-if="team_members.invitations.length > 0">Invitations</div>
                        <div class="bank-item" v-for="member in team_members.invitations" :key="member.id">
                            
                            <div class="flex flex--between"><p class="bank-item__name">{{member.invited_email}}</p> <!--<span class="remove remove--desktop" @click="deleteAccount(account.id)">Remove</span> --> </div>
                            <p>Not joined yet</p>
                            <!--<span class="remove remove--mobile" >Remove</span>-->
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card__header">
                            <p>Add Team Member</p>
                        </div>
                        <AddTeamMemberForm @reloadBankAccountsList="getBankAccounts"/>
                    </div>

                </div>

            </Panel>

        </template>



        <template v-if="activeTab == 'Bank Account'">
            <Panel title="Bank Accounts" :show_execute_button="false">
                <div class="flex">
                    <div class="card card--nopad bank-list">
                        <div class="empty" v-if="loading_bank_accounts">

                            <LoadingState v-if="loading_bank_accounts"/>
                        </div>

                        <div class="empty" v-else-if="!bank_accounts || bank_accounts.length < 1 && !loading_bank_accounts">
                            <!--No bank accounts added yet-->
                            
                            <EmptyState state="NO_DATA" caption="No bank accounts added yet"/>
                        </div>
                        <div class="bank-item" v-for="account in bank_accounts" :key="account.id">
                            <div class="flex flex--between"><p class="bank-item__name">{{account.bank_name}}</p> <span class="remove remove--desktop" @click="deleteAccount(account.id)">Remove</span></div>
                            <p>{{account.account_number}} ({{account.account_name}})</p>
                            <p v-if="account.is_primary">Primary Account</p>
                            <span class="remove remove--mobile" @click="deleteAccount(account.id)">Remove</span>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card__header">
                            <p>Add bank account</p>
                        </div>
                        <FormAddBankAccount @reloadBankAccountsList="getBankAccounts"/>
                    </div>

                </div>

            </Panel>

        </template>





        <template v-if="activeTab === 'Password'">
            <Panel title="Change Password" :disable_execute_button="!canChangePassword" @onExecute="changePassword">
                <div class="password">
                    <div class="password__container">
                
                        <div class="password__body">
                            <div class="form-input">
                                <span class="error"></span>
                                <label for="">Old Password </label>
                                <input type="password" v-model="password.old_password"> 
                            </div>
                            <div class="form-input">
                                <span class="error"></span>
                                <label for="">New Password </label>
                                <input type="password" v-model="password.new_password"> 
                            </div>
                            <div class="form-input">
                                <span class="error"></span>
                                <label for="">Confirm Password </label>
                                <input type="password" v-model="password.confirm_password"> 
                            </div>
                            
                        </div>
                    </div>
                </div>
            </Panel>

        </template>

        <template v-if="activeTab === 'Preferences'">
            <div class="preferences">
                <template v-if="loading_preferences">
                    <LoadingState/>
                </template>

                <template v-else>
                    <Panel title="Notification Settings" @onExecute="saveNotificationPreferences">
                        <PreferencesForm group="notification" @onChange="changePreferences" :settings="preferences.settings" :preferences="preferences.preferences" />
                    </Panel>
                    <Panel title="Privacy Settings" @onExecute="saveNotificationPreferences">
                        <PreferencesForm group="privacy" @onChange="changePreferences" :settings="preferences.settings" :preferences="preferences.preferences" />
                    </Panel>
                </template>
            </div>
        </template>
    </div>
</template>

<script>
import EmptyState from '../../../components/states/EmptyState'
import LoadingState from '../../../components/states/LoadingState'
import Panel from '../../../components/general/Panel'
import PreferencesForm from '../../../components/forms/PreferencesForm'
import AddTeamMemberForm from '../../../components/forms/AddTeamMember'

import moment from "moment";

export default {
    layout: 'dashboard',
    components: {
        Panel,
        PreferencesForm,
        EmptyState,
        LoadingState,
        AddTeamMemberForm
    },
    watch: {
        activeTab(value) {
            if (value === 'Preferences' && this.preferences.settings.length < 1) {
                this.setUpPreferences()
            }

            if (value === 'Team') {
                this.getTeamMembers()
            }
        }
    },
    data() {
        return {
            activeTab: 'Preferences',
            tabs: ['Preferences', 'Team', 'Bank Account', 'Password'],
            mode: '',
            password: {
                old_password: '',
                new_password: '',
                confirm_password: ''
            },
            bank_accounts: [],
            preferences: {
                settings: [],
                preferences: []
            },
            changes: [],

            loading_bank_accounts: true,
            banks_empty: false,

            loading_preferences: true,

            team_members: {
                list: [],
                invitations: []
            },
            loading_teams: true,
            teams_empty: false,
        }
    },
    computed: {
        userContext() {
            return window.localStorage.getItem('afContext');
        },
        userDetails() {
            return JSON.parse(window.localStorage.getItem('afUserDetails'));
        },
        canChangePassword() {
            return this.password.old_password && this.password.new_password && this.password.confirm_password && (this.password.new_password === this.password.confirm_password);
        }
    },
    methods: {
        formatDate(date) {
            return moment(date).format("MMM DD, yyyy") 
        },
        getTeamMembers() {
            this.loading_teams = true;
            this.$api.get('/users/team-members').then(resp=> {
                this.team_members.list = resp.data.data.members;
                this.team_members.invitations = resp.data.data.invitations;
                this.loading_teams = false;
            }).catch(err=> {
                this.teams_empty = true;
                this.loading_teams = false;
            })
        },
        changePassword() {
            this.$api.put('/auth/change-password',
             {email: this.userDetails.email,
                ...this.password}).then(resp=> {
                this.$store.dispatch('dashboard/actionShowSuccessToast', {message: "Password successfully changed"})

            }).catch(e=> {
                this.$store.dispatch('dashboard/actionShowErrorToast', {message: e.response && e.response.data.data || e})

            })

        },
        changePreferences(data) {
            this.changes.push(data)
        },
        saveNotificationPreferences() {
            this.$api.put('/preferences', {
                preferences: this.changes,
            }).then(resp=> {
                this.$store.dispatch('dashboard/actionShowSuccessToast', {message: "Preferences successfully saved"})
            }).catch(e=> {
                this.$store.dispatch('dashboard/actionShowErrorToast', {message: e.response && e.response.data.data || e})

            })
        },
        activateTab(tab) {
            this.activeTab = tab
        },
        isActive(tab) {
            this.activeTab === tab;
        },
        deleteAccount(id) {
            const response = confirm("Are you sure you want to delete this account?")
            if (response) {
                this.$api.delete('/bank-accounts/' +id).then(resp => {
                    this.getBankAccounts()
                })
            }
        },
        getBankAccounts() {
            this.loading_bank_accounts = true,
            this.$api.get('/bank-accounts').then(resp=> {
                this.loading_bank_accounts = false;
                this.bank_accounts = resp.data.data;

                if (this.bank_accounts.length < 1) this.banks_empty = true;
            }).catch(err=> {
                this.error = err && err.response && err.response.data.data || err
            })
        },
        async setUpPreferences() {
            this.loading_preferences = true;
            const vm = this;
            async function getPreferences(){
                vm.$api.get('/preferences').then(resp=> {
                    vm.loading_preferences = false;

                    vm.preferences.preferences = resp.data.data
                }).catch(err=> {
                    vm.loading_preferences = false;
                    console.log(err)
                })
            }

            async function getSettings() {
                vm.$api.get('/preferences/settings').then(resp=> {
                    vm.preferences.settings = resp.data.data
                }).catch(err=> {
                    console.log(err)
                })
            }

            await getSettings()
            await getPreferences()
        },
    },
    created() {
        this.$store.commit('dashboard/setDashboardTitle', 'Settings')
        if (this.activeTab === 'Bank Account') {
            this.getBankAccounts()
        }
        if (this.activeTab === 'Preferences') {
            this.setUpPreferences()
        }
        if (this.activeTab === 'Team') {
            this.getTeamMembers()
        }
    }
}
</script>

<style lang="scss" scoped>

.remove {
    &--desktop {
        @include media("<=t") {
            display: none;
        }
    }
    &--mobile {
        display: none;
        @include media("<=t") {
            display: block;
        }
    }
}
.empty {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    width: 100%;
    height: 100%;

    @include media("<=t") {
        font-size: 15px;
    }
}
.flex {
    display: flex;
    @include media("<=t") {
        flex-direction: column;
    }
    &--between {
        justify-content: space-between;
        width: 100%; 
        
    }
}
.bank-list {
    border-right: 1px solid rgba(211, 211, 211, 0.442);
    @include media("<=t") {
        //min-height: 200px;
    }
}
.bank-item {
    cursor: pointer;
    padding: 16px;
    border-bottom: 0.5px solid rgba(211, 211, 211, 0.442);
    &:hover {
        background: rgba(211, 211, 211, 0.442);
    }
    span {
        font-size: 14px; 
        color: $lightaccent;
        &:hover {
            background-color: lightgrey;
        }
    }
    p {
        font-weight: 400 !important;
        color: grey;
        font-size: 14px;;
        &__name {
            font-size: 15px !important;
            color: black !important;
            font-weight: 500 !important;
        }
    }
    &__invitations {
        background: rgba(211, 211, 211, 0.442);
        padding: 16px;
        font-size: 14px; 
        //margin-top: 8px;
        color: $lightaccent;
        &:hover {
            background-color: lightgrey;
        }
    }
}
.active {
    border-bottom: 2px solid $lightaccent !important;
    color: $lightaccent !important;
}
.settings {
    padding: 0 24px;
    background: white;
    margin-bottom: 50px;

    &__tabs {

        display: flex;
        margin-bottom: 16px;
        //justify-content: space-between;

        &__tab {
            padding: 16px;
            text-align: center;
            color: $charcoal;
            cursor: pointer;
            
        }
    }
}

.card, .notifications {
    box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
    width: 100%;
    background: white;
    padding: 16px;
    &--nopad {
        padding: 0 !important;
    }
    @include media('<=t') {
        margin-bottom: 10px;
        min-height: 200px;
        
    }
    &__header {
        font-size: 15px;
        color: grey;
        //border-bottom: 1px solid lightgrey;
        margin-bottom: 16px;
        font-weight: 500;
        //padding: 8px 0;
        
    }

}
.form-input {
    @include plain-form-input;
}
.password {
    height: auto;
    background: white;
    width: 50%;
    &__container {
        
    }
    &__body {
        padding: 16px;
    }
    &__header {
        border-bottom: 0.5px solid rgba(211, 211, 211, 0.442);
        padding:  16px;
        p {
            font-size: 16px;
            font-weight: 400;
            color: grey;
        }
    }
    &__button {
        @include smallbutton;
        width: auto;
        height: auto;
    }
}
</style>