<template>
    <div class="campaign">
        <div class="campaign__overview">
            <CampaignBudgetLeftChart :show="show_campaign_budget_chart" :campaign="campaign"/>
            <!--<div class="card card-30">
                <div class="card__stat">
                </div>
                <p class="card__lead">90%</p>
                <p class="card__caption">of budget used</p>
            </div>-->
            <!--<div class="card card-30">
                <p class="card__lead">{{campaign_marketers.page_info.total}}</p>
                <p class="card__caption">marketers joined</p>
            </div>-->

            <CampaignLinksChart :show="show_campaign_links_chart" :campaign_links="campaign_links"/>

            <!--
            <div class="card card-30 card--flex">
                <div>
                    <p class="card__lead">{{campaign_links && campaign_links.stat && parseInt(campaign_links.stat.accepted_clicks) + parseInt(campaign_links.stat.blocked_clicks)}}</p>
                    <p class="card__caption">link clicks</p>

                </div>
                <div>
                    <div class="link-stat">
                        <div class="indicator indicator--green"></div>
                        <p>{{campaign_links && campaign_links.stat && parseInt(campaign_links.stat.accepted_clicks)}} Accepted</p>
                    </div>
                    <div  class="link-stat">
                        <div class="indicator indicator--red"></div>
                        <p>{{campaign_links && campaign_links.stat && parseInt(campaign_links.stat.blocked_clicks)}} Disallowed</p>
                    </div>
                </div>
            </div>-->
        </div>

        <div class="flex-row">
            <div class="campaign__details">
                <div class="card">
                    <div class="card__header">
                        <p class="section__head">Campaign Details</p>
                        <button @click="editCampaign">Edit</button>
                    </div>
                    <div class="card__body">
                        <div class="card__body__detail">
                            <p>Title</p>
                            <p>{{campaign.title}}</p>
                        </div>
                        <div class="card__body__detail">
                            <p>Budget</p>
                            <p>{{campaign.currency + ' ' +Intl.NumberFormat('en-US').format(campaign.budget)}}</p>
                        </div>
                        <div class="card__body__detail">
                            <p>Budget Left</p>
                            <p>{{campaign.currency + ' ' +Intl.NumberFormat('en-US').format(campaign.budget_left)}}</p>
                        </div>
                        <div class="card__body__detail">
                            <p>Ends At</p>
                            <p>{{campaign.end_date}}</p>
                        </div>
                        <div class="card__body__detail">
                            <p>Budget Left</p>
                            <p>{{campaign.budget_left}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="campaign__marketers section__item">
                <div class="section__header">

                    <p class="section__head">Campaign marketers</p>
                    <button @click="inviteMarketers">Invite</button>
                </div>
                <Listing :records="campaign_marketers.list" :pagination="campaign_marketers.page_info" :labels="campaign_marketers.labels"></Listing>
            </div>
            <div class="campaign__marketers section__item">
                <div class="section__header">

                    <p class="section__head">Links</p>
                    <button  @click="addLink">Add link</button>
                </div>
                <Listing 
                     :records="campaign_links.list" 
                     :labels="campaign_links.labels"
                     :pagination="campaign_links.page_info"
                ></Listing>
            </div>

        </div>



        <Modal width='half' @close="closeInviteModal" title="Invite marketers" v-if="actionInviteMarketers">
            <FormInviteMarketers/>
        
        </Modal>


        <Modal width='half' @close="closeAddLinkModal" title="Add Campaign Link" v-if="actionAddLink">
            <FormAddLink/>
        </Modal>

        <Modal @close="closeEditCampaignModal" title="Edit Campaign" v-if="actionEditCampaign">
            <FormEditCampaign :campaign="campaign"/>
        </Modal>
    </div>

    
</template>




<script>
import { mapGetters } from 'vuex';
import  moment from 'moment';

import CampaignBudgetLeftChart from '../../../components/charts/CampaignBudgetLeftChart'
import CampaignLinksChart from '../../../components/charts/CampaignLinksChart'
export default {
    layout: 'dashboard',
    components: {
        CampaignBudgetLeftChart,
        CampaignLinksChart
    },
    data() {
        return {
            campaign: {},
            campaign_id: this.$route.params.id,


            campaign_marketers: {
                labels: {
                    "Photo": {property: "marketer.profile_photo", type:"photo"},
                    "Name": {property: "marketer.name", type: "text"},
                    "Clicks Driven": {property: "clicks_driven", type: "number"},
                    "Money Earned": {property: "earned_per_click", currency: "campaign.currency", type: "money"}
                },
                list: [],
                page_info: {}
            },
            
            campaign_links: {
                list: [],
                stat: null,
                page_info: {},
                labels: {
                    "URL": {property: "link", type: "text"},
                    "Cost Per Click": {property: "pay_per_click", currency: "pay_currency", type: "money"}
                }
            },

            show_campaign_budget_chart: false,
            show_campaign_links_chart: false
            
        }
    },

    watch: {
        campaign(value) {
            this.show_campaign_budget_chart = true
        },
        campaign_links(value) {
            this.show_campaign_links_chart = true
        }
    },
    created() {
        this.$store.commit('dashboard/setDashboardTitle', `Campaign - ${this.campaign_id}`)
        this.$store.commit('dashboard/setActive', 'Campaigns')
        this.getCampaign()
        this.getCampaignMarketers()
        this.getCampaignLinks()
    },
    methods: {
        addLink() {
            this.$store.commit('dashboard/setActionAddLink', true)
        },
        editCampaign() {
            this.$store.commit('dashboard/setActionEditCampaign', true)
        },
        inviteMarketers() {
            this.$store.commit('dashboard/setActionInviteMarketers', true)
        },
        getCampaign() {
            const campaign_id = this.$route.params.id;
            // get campaign 
            this.$api.get('/campaigns/' + campaign_id).then(resp=> {
                this.campaign = resp.data.data;
            })
        },
        closeInviteModal() {
            this.$store.commit('dashboard/setActionInviteMarketers', false);
        },
        closeAddLinkModal() {
            this.$store.commit('dashboard/setActionAddLink', false);
        },
        closeEditCampaignModal() {
            this.$store.commit('dashboard/setActionEditCampaign', false);
        },
        getCampaignMarketers() {
            this.$api.get(`/campaigns/${this.campaign_id}/marketers`)
                .then(resp=> {
                    this.campaign_marketers.list = resp.data.data.list;
                    this.campaign_marketers.page_info = resp.data.data.page_info
                }).catch(err=> {

                })
        },
        getCampaignLinks(){
            this.$api.get(`/campaigns/${this.campaign_id}/links`)
                .then(resp=> {
                    this.campaign_links.list = resp.data.data.list;
                    this.campaign_links.page_info = resp.data.data.page_info
                    this.campaign_links.stat = resp.data.data.stat

                    this.show_campaign_links_chart = true;

                }).catch(err=> {

                })
        }
        
    },
    computed: {
        campaignBudgetLeftInPercentage() {
            const budget = this.campaign.budget;
            const budget_left = this.campaign.budget_left;

            if (budget_left) {
                const percentage = parseFloat(budget_left/budget).toFixed(2) * 100
                return percentage
            }

            else return 100
            
        },
        campaignEndDate() {
            if (this.campaign.end_date) {
                return this.campaign.end_date
            }
            return this.campaign.end_date;
        },
        ...mapGetters("dashboard", ["actionInviteMarketers", 'actionAddLink', 'actionEditCampaign']),
    }
}
</script>

<style lang="scss" scoped>
.link-stat {
    display: flex;
    align-items: center;
    color: grey;
    font-size: 14px;

}
.indicator { 
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 8px;
    &--red {
        background: red;
    }
    &--green {
        background: lightseagreen
    }
}

.campaign {
    &__overview {
        display: flex;
        justify-content: space-between;
        margin-bottom: 50px;
    }
}

.section {
    margin: 50px 0px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    

    &__item {
        width: 48% !important;

        @include media("<=t") {
            width: 100% !important;
            margin-bottom: 20px;
        }
    }
    &__head {
        font-size: 16px !important; 
        font-weight: 400 !important;
        color: grey !important;
        margin: 8px 0;
    }

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        button {
            @include smallbutton-white;
            min-height: auto;
            height: auto;
            width: auto;
            padding: 8px 16px;
            margin-bottom: 0;
        }
    }
}

.card {
    height: auto;
    border-radius: 10px;
    width: 100%;
    box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
    padding: 16px;
    border: 0.5px solid rgba(211, 211, 211, 0.442);
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &-30 {
        width: 30% !important;
    }
    &--flex {
        display: flex !important;
        flex-direction: row !important;
        justify-content: space-between;
        align-items: center !important;

        @include media("<=t") {
            flex-direction: column !important;
            align-items: flex-start !important;
        }

    }

    &__lead  {
        color: black;
        font-size: 44px;
    }
    &__caption {
        color: darkgrey;
        font-size: 20px;
    }

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        border-bottom: 0.5px solid rgba(211, 211, 211, 0.368);
        button {
            @include smallbutton-white;
            width: auto;
            padding: 8px 16px;
            height: auto;
            min-height: auto;
        }

        p {
            color: black;
            font-size: 16px !important;
            text-transform: none;
            font-weight: 600;
        }

        
    }

    &__body {
        display: flex;
        flex-wrap: wrap;
        padding: 16px 0;
        &__detail {
            display: flex;
            flex-direction: column;
            margin-right: 20px;
            //border: 1px solid black;
            max-width: 200px;
            margin-bottom: 16px;
            padding-right: 0px 16px;

            p {
                color: grey;

                &:first-of-type {
                    font-weight: 500 !important;
                    //text-transform: uppercase;
                }
                font-weight: 400;
            }
        }
    }

}


</style>