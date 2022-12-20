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

        



        <template >
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
       
    },
    data() {
        return {
            activeTab: 'Preferences',
            
            loading_bank_accounts: true,
            banks_empty: false,

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
       
    },
    created() {
        this.$store.commit('dashboard/setDashboardTitle', 'Settings')
        this.getBankAccounts()
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