
import DashboardLayout from '../../components/layouts/dashboard-layout.vue';
<template>

    <DashboardLayout>

        <template #content>

            <div class="page">
                <div class="tabs">
                    <div class="tab" v-for="(tab, index) in tabs" :class="[selected_tab === tab ? 'selected' : '']"
                    @click="selected_tab = tab">
                        {{ tab }}
                    </div>
                </div>

                <div class="card">
                    <div class="card__container">
                        <div class="card__header">

                            <template v-if="selected_tab === 'Bank Details' ">

                                Primary Bank Details
                            </template>
                            <template v-if="selected_tab === 'Preferences' ">

                                Preferences
                            </template>
                            <template v-if="selected_tab === 'Security' ">

                                Security
                            </template>

                            <template v-if="selected_tab === 'Account' ">

                                Account
                            </template>
                        </div>

                        <div class="card__content">

                            <template v-if="selected_tab === 'Bank Details'">


                                <div class="form-input">
                                    <label>Bank Name</label>
                                    <input type="text">
                                </div>
                                <div class="form-input">
                                    <label for="">Account Number</label>
                                    <input placeholder="Enter Account Number"></input>
                                </div>

                                <div class="smallbutton">
                                    Change Password
                                </div>
                            </template>

                            <template v-if="selected_tab === 'Security'">


                                <div class="form-input">
                                    <label>Old Password</label>
                                    <input type="text">
                                </div>
                                <div class="form-input">
                                    <label for="">New Password</label>
                                    <input></input>
                                </div>
                                <div class="form-input">
                                    <label for="">Confirm Password</label>
                                    <input placeholder="Enter Account Number"></input>
                                </div>

                                <div class="smallbutton">
                                    Change Password
                                </div>
                            </template>
                           

                            <template v-if="selected_tab === 'Account'">

                                <div class="account flex">
                                    <div class="account__image">
                                        
                                            
                                    </div>
                                    <div class="form">
    
                                        <div class="split flex gap-8">
                                            <div class="form-input">
                                                <label>Old Password</label>
                                                <input type="text">
                                            </div>
                                            <div class="form-input">
                                                <label for="">New Password</label>
                                                <input placeholder="Enter Account Number"></input>
                                            </div>

                                        </div>
                                        <div class="form-input">
                                            <label for="">Confirm Password</label>
                                            <input placeholder="Enter Account Number"></input>
                                        </div>
                                    </div>
                                </div>


                                <div class="smallbutton">
                                   Save Changes
                                </div>
                            </template>
                           



                            <template v-if="selected_tab === 'Preference'">


                                <div class="form-input">
                                    <label>Currency</label>
                                    <select></select>
                                </div>
                                <div class="form-input">
                                    <label for="">Timezone</label>
                                    <select></select>
                                </div>
                            </template>
                           
                        </div>

                        
                    </div>
                </div>
            </div>
        </template>
    </DashboardLayout>
</template>


<script>
export default {
    created() {
        this.$store.commit('dashboard/setDashboardTitle', 'Settings' )
        this.$store.commit('dashboard/setActiveTab', 'Settings' );

        if (this.$route.hash) {
            
            this.selected_tab = this.$route.hash.split('#')[1];
        }

    },
    data() {
        return {
            tabs: ["Account", "Security", "Bank Details", "Preferences"],
            selected_tab: 'Account'
        }
    },
    methods: {

    }
    
}</script>



<style lang="scss" scoped>

.selected {
    color: $primary;
    border-bottom: 2px solid $primary;

}
.tabs {
    display: flex;
    gap: 10px;
    margin-top: 16px;

    .tab {
        color: #676879;
        cursor: pointer;
        padding: 8px 16px;
        word-wrap: normal;
        text-wrap: nowrap;

        
    }
}


.card {
    background-color: white;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    min-width: 50%;
    width: fit-content;

    &__container {
        padding: 24px;
        
    }
    &__header {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 20px;
    }

    &__content {
        padding: 50px 0;
    }
}

.form-input {
    @include plain-form-input;
}
</style>