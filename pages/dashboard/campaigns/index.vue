<template>
    <div class="campaigns">
       <Modal title='Create campaign' v-if="createCampaign" @close="closeCreateCampaignModal">
           <FormCreateCampaign  />
       </Modal>




        <template v-if="userContext === 'business'">
            <template v-if="campaigns.length === 0 && !loading">
                <div class="empty-state">
                    <EmptyState state="NO_DATA" caption="No campaigns" ></EmptyState>
                    <button @click="goToNewCampaign"> Create a campaign</button>
                </div>
            </template>
            <template v-else-if="loading">
                <LoadingState/>
            </template>

            <div v-else-if="campaigns.length> 0" class="campaigns__header">
                <p class="header">Your Campaigns</p>
                <Listing :records="campaigns" item_link="/dashboard/campaigns/:id" :labels="campaignLabels" :pagination="campaigns_page_info"/>
            </div>
        </template>




        <template v-else>
            <div class="campaigns">
                <div class="campaigns__tabs">
                    <div class="campaigns__tabs__tab" @click="changeTab('mine')" :class="[active_tab === 'mine' ? 'tab-active' : '']">
                        <p>My Campaigns</p>
                    </div>
                    <div class="campaigns__tabs__tab" @click="changeTab('find')" :class="[active_tab === 'find' ? 'tab-active' : '']">
                        <p>Find Campaigns</p>
                    </div>
                </div>
                <CampaignsListing  :tab="active_tab" v-if="active_tab==='mine'"/>
                <CampaignsListing  :tab="active_tab" v-if="active_tab === 'find'"/>
            </div>
            <!--<Listing :records="campaigns" item_link="/dashboard/campaigns/:id" :labels="campaignLabels" :pagination="campaigns_page_info"/>-->
        </template>
    </div>
</template>


<script>
import { mapGetters } from "vuex";
import EmptyState from '../../../components/states/EmptyState'
import LoadingState from '../../../components/states/LoadingState'

import CampaignsListing from "../../../components/lists/CampaignsListing";
import JoinedCampaignModal from '../../../components/modals/JoinedCampaignModal'
export default {
    layout: 'dashboard',
    components: {
        CampaignsListing,
        JoinedCampaignModal,
        EmptyState,
        LoadingState
    },
    data() {
        return {
            lead_stats: {},
            active_tab :'mine',
            create_campaign: false,
            loading: true,
            campaigns: [],
            campaigns_page_info: {},
            campaignLabels: {
                "" : {
                    property: "thumbnail",
                    type: "photo",
                    shape: 'rectangle',
                    placeholder: 'https://t3.ftcdn.net/jpg/02/68/55/60/360_F_268556012_c1WBaKFN5rjRxR2eyV33znK4qnYeKZjm.jpg'
                },
                'Title': {
                    property: 'title',
                    type: 'text'
                },
                'Budget': {property: 'budget', type: 'money'},
                'Budget Left' : {property:'budget_left', type: 'money'},
                'Ends At': {property: 'ends_at', type: 'date'}
            },
            loading: true,

        }
    },

    computed: {
        ...mapGetters('dashboard', ['createCampaign']),
        userContext() {
            return window.localStorage.getItem('afContext')
        },
    },

    methods: {
        getLeadStats() {
            this.$api.get('/insights/leads?include=overview,group_by_day,top_countries')
                .then(resp=> {
                    this.lead_stats = resp.data.data;
                })
                .catch(err=> {

                })
        },

        goToNewCampaign() {
            this.$router.push('/dashboard/campaigns/new')
        },
        changeTab(tab) {
            this.active_tab = tab; 
        },
        computeMoney(money) {
            return Intl.NumberFormat('en-US').format(money)
        },
        computeDate(date) {
            return moment(date).format("MMM DD, YYYY")
        },
        closeCreateCampaignModal()  {
            this.$store.commit('dashboard/setCreateCampaign', false)
        },
        getCampaigns() {
            this.loading = true;
            this.$api.get('/campaigns')
                .then(resp => {
                    this.campaigns = resp.data.data.list;
                    this.campaigns_page_info = resp.data.data.page_info;
                    this.loading = false;
                })
                .catch(err=> {
                    this.loading = false;
                })
        },
    },

    created() {
        this.$store.commit('dashboard/setActive', 'Campaigns')
        this.$store.commit('dashboard/setDashboardTitle', 'Campaigns');
        this.getCampaigns();
    },

}
</script>

<style lang="scss" scoped>
.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;

    button {
        @include smallbutton;
        margin-top: 30px !important;
        border-radius: 5px !important;
        text-transform: uppercase;
    }
}
.tab-active {
    color: $primary;
    border-bottom: 2px solid $primary
}
.campaigns {
    width: 100%;
    //position: relative;

    &__tabs {
        display: flex;
        margin-bottom: 20px;

        &__tab {
            cursor:pointer;
            padding: 10px 32px;
            //padding-left: 0;
            display: flex;
            justify-content: center;

            &:hover {
                color: grey !important;
            }

            p {
                text-align: center;
                font-size: 18px;
                
            }
        }
    }
}


</style>