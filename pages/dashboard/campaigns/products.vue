<template>
    <div>
         <CampaignTabs/>



        <template v-if="one_info_ready">
        

            <div class="campaign" v-if="activeTab === 'Overview'">
                <div class="campaign-section-title">
                    Campaign Details
                </div>

                <div class="page">
                    <div class="page__header">
                        <div class="page__header__content"> 
                            <!--<p>Status:</p>-->

                            <div class="page__header__status">
                                <div class="page__header__status__indicator green-fill" v-if="campaign.is_active"></div>
                                <div class="page__header__status__indicator red-fill" v-else></div>

                                <p class="green" v-if="campaign.is_active">Active</p>
                                <p class="red" v-else>Inactive</p>

                            </div>
                        </div>
                        

                        <div class="page__header__ctas">
                            <SwitchComponent v-on:execute="changeCampaignStatus" :checked="campaign.is_active"/>
                          <!--  <button @click="editCampaign">Edit</button>-->
                        </div>
                    </div>

                    <div class="page__content">
                        <div class="page__content__item">
                            <p>Title</p>
                            <p>{{campaign.title}}</p>
                        </div>
                        <div class="page__content__item">
                            <p>Description</p>
                            <p>{{truncateText(campaign.description)}}</p>
                        </div>
                        <div class="page__content__item">
                            <p>Public URL</p>
                            <p>https://afflee.com/{{campaign.slug}}</p>
                        </div>
                    
                        <div class="page__content__item">
                            <p>Budget</p>
                            <p>{{campaign.currency + ' ' +Intl.NumberFormat('en-US').format(campaign.budget)}}</p>
                
                        </div>
                        <div class="page__content__item">
                            <p>Budget Left</p>
                            <p>{{campaign.currency + ' ' +Intl.NumberFormat('en-US').format(campaign.budget_left)}}</p>
                        </div>
                        <div class="page__content__item">
                            <p>Started At</p>
                            <p>{{formatDate(campaign.started_at)}}</p>
                        </div>
                        <div class="page__content__item">
                            <p>Ends At</p>
                            <p>{{formatDate(campaign.ends_at)}}</p>
                        </div>
                        <div class="page__content__item">
                            <p>Marketers Required</p>
                            <p>{{campaign.marketers_required || 'unlimited'}} </p>
                        </div>
                        <div class="page__content__item">
                            <p>Purpose</p>
                            <p>{{campaign.purpose}}</p>
                        </div>
                        <div class="page__content__item">
                            <p>Categories</p>
                            <p>{{campaignCategories}}</p>
                        </div>
                    </div>
                </div>

                <div class="campaign-section-title">
                    Overview
                </div>
                <div class="campaign__overview">   
                    <div class="flex-column">
                        <div class="card">
                            <div class="card__header">
                                <p>Leads</p>
                            </div>
                            <div class="card__body">

                                <div class="card__body__detail">
                                    <p>0</p>
                                    <p>Total</p>
                                </div>
                                <div class="card__body__divider"></div>

                                <div class="card__body__detail">
                                    <p>NGN 0</p>
                                    <p>Disbursements</p>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card__header">
                                <p>Sales</p>
                            </div>
                            <div class="card__body">

                                <div class="card__body__detail">
                                    <p>{{calculatedSales.volume}} units</p>
                                    <p>Total</p>
                                </div>

                                <div class="card__body__divider"></div>
                                <div class="card__body__detail">
                                    <p>NGN{{formatMoney(calculatedSales.value)}}</p>
                                    <p>Value</p>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <CampaignBudgetLeftChart  :show="show_campaign_budget_chart" :campaign="campaign"/>
                

                    <CampaignLinksChart :show="show_campaign_links_chart" :campaign_links="campaign_links"/>

                    


                </div>

                <div class="campaign-section-title">
                    Sales Insights
                </div>
                <div class="lead-insights">
                    <div class="stat_item">
                        <SalesValueChart/>
                    </div>
                    <div class="stat_item">
                        <StatisticsChart v-if="leadDisbursementsGroupByDayChart" title="Disbursements" type='line' :chart_data="leadDisbursementsGroupByDayChart"/>
                    </div>
                    <div class="stat_item">
                        <StatisticsChart v-if="lead_stats.top_referrers" title="Top Sources" type='list' :listing_records="lead_stats.top_referrers" :listing_labels="top_referrers_labels" />
                    </div>
                </div>
                



                <div class="campaign-section-title">
                    Lead Insights
                </div>
                <div class="lead-insights">
                    <div class="stat_item">
                        <StatisticsChart v-if="leadGainedGroupByDayChart" title="Generated Leads" type='bar' :chart_data="leadGainedGroupByDayChart"/>
                    </div>
                    <div class="stat_item">
                        <StatisticsChart v-if="leadDisbursementsGroupByDayChart" title="Disbursements" type='line' :chart_data="leadDisbursementsGroupByDayChart"/>
                    </div>
                    <div class="stat_item">
                        <StatisticsChart v-if="lead_stats.top_referrers" title="Top Sources" type='list' :listing_records="lead_stats.top_referrers" :listing_labels="top_referrers_labels" />
                    </div>
                </div>

                <Modal width='half' @close="closeInviteModal" title="Invite marketers" v-if="actionInviteMarketers">
                    <FormInviteMarketers/>
                
                </Modal>


                <Modal @close="closeEditCampaignModal" title="Edit Campaign" v-if="actionEditCampaign">
                    <FormEditCampaign :campaign="campaign"/>
                </Modal>

            </div>

            <div class="markeers" v-else-if="activeTab === 'Marketers'">

                    <Modal width='half' @close="closeInviteModal" title="Invite marketers" v-if="actionInviteMarketers">
                        <FormInviteMarketers :campaign_id="campaign_id"/>
                    
                    </Modal>

                    <FindMarketersModal classes="sixty-body" @close="closeFindMarketersModal" :show="actionFindMarketers"  v-if="actionFindMarketers" :campaign="campaign"/>

                    <div class="campaign__marketers">
                        <div class="section__header">

                            <div></div>
                            <div class="">
                                <button @click="findMarketers">Find Marketers</button>
                                <button @click="inviteMarketers">Invite</button>
                            </div>
                        </div>
                        <Listing v-if="campaign_marketers.list && campaign_marketers.list.length > 0 && !loading.marketers" :records="campaign_marketers.list" :pagination="campaign_marketers.page_info" :labels="campaign_marketers.labels" :constants="computedConstants"></Listing>
                        <template v-else-if="loading.marketers"><div class="loading">Loading...</div></template>
                        <template v-else><div class="center">No marketers on this campaign yet</div></template>
                    </div>
            </div>

            <div class="links" v-else-if="activeTab === 'Links'">
                <Modal width='half' @close="closeAddLinkModal" title="Add Campaign Link" v-if="actionAddLink">
                    <FormAddLink/>
                </Modal>
                <div class="section">
                    <div class="campaign__marketers section__item">
                        <div class="section__header">

                            <p class="campaign-section-title">Campaign Links</p>
                        </div>
                        <Listing 
                            :records="campaign_links.list" 
                            :labels="campaign_links.labels"
                            :pagination="campaign_links.page_info"
                            :actions="campaign_links.list_actions"
                        ></Listing>
                    </div>
                    <div style="display: flex; justify-content:center; width: 100%">
                        <button class="add-link"  @click="addLink">Add link</button>
                    </div>


                </div>
            </div>

            <div class="" v-else-if="activeTab === 'Products'">
                <Products :campaign_id="campaign_id"/>
            </div>
        </template>

        <template v-else>
            <div> Loading </div>
        </template>
    </div>
    
</template>




<script>
import { mapGetters } from 'vuex';
import  moment from 'moment';

export default {
    layout: 'dashboard',
    components: {
    
        Products,
    },
    data() {
        return {
            loading: {
              marketers: true,  
            },
            one_info_ready: false,
            activeTab: "Overview",
            tabs: ['Overview', 'Products', 'Marketers', 'Links'],

            campaign: {},
            campaign_id: this.$route.params.id,
            stat_filter: "week",
            lead_stats: {},

            top_referrers_labels: {
                    "Source": {property: "referrer"}, 
                    "Leads Generated": {property: "total", type: "number"},
                    
            },

            campaign_invitations: [],

            campaign_marketers: {
                labels: {
                    "Photo": {property: "marketer.profile_photo", type:"photo"},
                    "Name": {property: "marketer.name", type: "text"},
                    "Clicks": {property: "clicks_driven", type: "number"},
                    "Earned from Clicks": {property: "earned_from_clicks", type: "money"},
                    "Leads": {property: "leads_driven", type: "number"},
                    "Earned from Leads": {property: "earned_from_leads", type: "money"},
                    "Sales": {property: "sales_driven", type: "number"},
                    "Earned from Sales": {property: "earned_from_sales", type: "money"},
                },
                list: [],
                page_info: {}
            },

            campaign_clicks: {
                stat: null,
            },
            
            campaign_links: {
                list: [],
                stat: null,
                page_info: {},
                labels: {
                    "URL": {property: "link", type: "text"},
                    "Cost Per Click": {property: "pay_per_click", currency: "pay_currency", type: "money"},
                    "Cost Per Lead": {property: "pay_per_lead", currency: "pay_currency", type: "money"},
                    "Cost Per Sale": {property: "pay_per_sale", currency: "pay_currency", type: "money"},
                },
                list_actions: [
                    {
                        title: "Marketer Links",
                        goToBaseUrl: `/dashboard/campaigns/:campaign_id/links/:link_id`,
                        params: ['campaign_id', 'id']
                    }
                ]
            },

            show_campaign_budget_chart: false,
            show_campaign_links_chart: false,
            show_campaign_clicks_chart: false,
            products: [],
            
        }
    },

    watch: {
        campaign(value) {
            this.show_campaign_budget_chart = true
        },
        campaign_links(value) {
            this.show_campaign_links_chart = true
        },
        campaign_clicks(value) {
            this.show_campaign_clicks = true
        }
    },
    created() {
        this.$store.commit('dashboard/setDashboardTitle', `Campaign - ${this.campaign_id}`)
        this.$store.commit('dashboard/setActive', 'Campaigns')
        this.getCampaign()
        this.getCampaignMarketers()
        this.getCampaignLinks();
        this.getLeadStats()
        this.getCampaignInvitations();
        this.getProducts()
    },
    methods: {
        getProducts() {
            this.$api.get('/products?campaign_id=' + this.campaign_id)
                .then(resp => {
                    this.one_info_ready = true
                    this.products = resp.data.data.list;
                })
                .catch(err=> {
                    //this.
                })
        },
        getCampaignInvitations() {
            this.$api.get(`/campaigns/${this.campaign_id}/invitations`).then(resp=> {
                this.campaign_invitations = resp.data.data;
            }).catch(err=> {
                console.log("Could not get campaign invitations")
            })
        },
        activateTab(tab) {
            this.activeTab = tab
        },
        isActive(tab) {
            this.activeTab === tab;
        },
        truncateText(text){
            if (text)
                return text.slice(0, 30) + '...'
            return ""
        },
        closeFindMarketersModal() {
            this.$store.commit('dashboard/setActionFindMarketers', false)
        },
        changeCampaignStatus() {

            this.$api.put(`/campaigns/${this.campaign_id}`, {
                is_active: this.campaign.is_active === true ? 0: 1
                
            }).then(resp=> {
                this.campaign = resp.data.data
                this.$store.dispatch('dashboard/actionShowSuccessToast', {message: 
                `Campaign set to ${this.campaign.is_active ? 'Active': 'Inactive'}`})

            }).catch(err=> {
                this.$store.dispatch('dashboard/actionShowErrorToast', {message: "Couldn't change the status of this campaign"})
            })
            
        },
        addLink() {
            this.$store.commit('dashboard/setActionAddLink', true)
        },
        editCampaign() {
            this.$store.commit('dashboard/setActionEditCampaign', true)
        },
        findMarketers() {
            this.$store.commit('dashboard/setActionFindMarketers', true)
        },
        inviteMarketers() {
            this.$store.commit('dashboard/setActionInviteMarketers', true)
        },
        getCampaign() {
            const campaign_id = this.$route.params.id;
            // get campaign 
            this.$api.get('/campaigns/' + campaign_id).then(resp=> {
                                    this.one_info_ready = true

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
            this.loading.marketers = true
            this.$api.get(`/campaigns/${this.campaign_id}/marketers`)
                .then(resp=> {
                    this.one_info_ready = true;
                    this.loading.marketers = false;
                    this.campaign_marketers.list = resp.data.data.list;
                    this.campaign_marketers.page_info = resp.data.data.page_info
                }).catch(err=> {
                    this.loading.marketers = false;
                })
        },
        getCampaignLinks(){
            this.$api.get(`/campaigns/${this.campaign_id}/links`)
                .then(resp=> {
                    this.one_info_ready = true;
                    this.campaign_links.list = resp.data.data.list;
                    this.campaign_links.page_info = resp.data.data.page_info
                    this.campaign_links.stat = resp.data.data.stat

                    this.show_campaign_links_chart = true;

                }).catch(err=> {

                })
        },
        formatDate(date) {
            if (date) {
                return moment(date).format("MMM DD, YYYY")
            }
            return ""
        },
        formatMoney(value) {
            return Intl.NumberFormat('en-US').format(value)

        },
        getLeadStats() {
            this.$api.get(`/insights/leads?campaign_id=${this.campaign_id}&include=overview,group_by_day,top_countries,top_referrers`)
                .then(resp=> {
                    this.lead_stats = resp.data.data;
                })
                .catch(err=> {

                })
        },
        
        
    },
    computed: {
        calculatedSales() {
            const obj  = {
                value: 0,
                volume: 0,
            }
            if (this.products && this.products.length > 0) {
                this.products.forEach(p => {
                    obj.value += p.sales_amount;
                    obj.volume += p.sales
                })
            }
            return obj
        },
        computedConstants() {
            return {
                currency: this.campaign && this.campaign.currency,

            }
        },
         
        leadDisbursementsGroupByDayChart() {
            const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
            const values = [0, 0, 0, 0, 0, 0, 0];

            if (this.lead_stats && this.lead_stats.group_by_day) {
                if (this.stat_filter === "week") { 
                    this.lead_stats.group_by_day.forEach(stat=> {
                        if (stat.date) {
                            const day = moment(stat.date).day();
                            // populate day
                            values[day] = stat.amount
                        }
                    })
                }

                return {
                    labels: days,
                    datasets: [{
                        label: [`Amount in NGN`],
                        borderColor: ['#DE5C6E'],
                        fill: false,
                        data: values

                    }]
                }

            }
            return null
             
        },
        leadGainedGroupByDayChart() {
            const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
            const values = [0, 0, 0, 0, 0, 0, 0];

            if (this.lead_stats && this.lead_stats.group_by_day) {
                if (this.stat_filter === "week") { 
                    this.lead_stats.group_by_day.forEach(stat=> {
                        if (stat.date) {
                            const day = moment(stat.date).day();
                            // populate day
                            values[day] = stat.total
                        }
                    })
                }

                return {
                    labels: days,
                    datasets: [{
                        label: [`Number of generated leads`],
                        borderColor: ['#DE5C6E'],
                        fill: true,
                        data: values

                    }]
                }

            }
            return null
             
        },
        topSourcesList() {
            const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
            const values = [0, 0, 0, 0, 0, 0, 0];

            if (this.lead_stats && this.lead_stats.group_by_day) {
                if (this.stat_filter === "week") { 
                    this.lead_stats.group_by_day.forEach(stat=> {
                        if (stat.date) {
                            const day = moment(stat.date).day();
                            // populate day
                            values[day] = stat.total
                        }
                    })
                }

                return {
                    labels: days,
                    datasets: [{
                        label: [`Number of generated leads`],
                        borderColor: ['#DE5C6E'],
                        fill: true,
                        data: values

                    }]
                }

            }
            return null
             
        },
        campaignCategories() {
            if (this.campaign && this.campaign.campaign_categories && this.campaign.campaign_categories.length > 0) {

                return this.campaign.campaign_categories.map(c => c && c.category && c.category.name).join(", ")
            }
            else {
                return ""
            }
        },
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
        ...mapGetters("dashboard", ["actionFindMarketers", "actionInviteMarketers", 'actionAddLink', 'actionEditCampaign']),
    }
}
</script>

<style lang="scss" scoped>
.loading {
    width: 100%;
    height: 100%;;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $charcoal;
    font-size: 15px;;
}

.add-link {
    @include smallbutton;
    margin-top: 50px;
}

.flex-column {
    display :flex;
    flex-direction: column;
    
}
.active {
    border-bottom: 2px solid $lightaccent !important;
    color: $lightaccent !important;
}

.settings {
    padding: 0 24px;

    &__tabs {
        display: flex;
        margin-bottom: 16px;
        //justify-content: space-between;

        &__tab {
            padding: 16px;
            text-align: center;
            color: grey;
            cursor: pointer;
            
        }
    }
}
.lead-insights {
    display: grid;
    grid-template-columns: 30% 30% 30%;
    justify-content: space-between;
}
.campaign-section-title {
    
    font-size: 18px;
    margin-bottom: 8px;
    color: darkgrey;
    background: transparent !important;

    margin-top: 50px;
}
.green {
    color: lightseagreen;

}
.green-fill {
    background: lightseagreen;

}

.red {
    color: red;
}
.red-fill {
    background: red;
}
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
        display: grid;
        grid-template-columns: 30% 30% 30%;
        justify-content: space-between;
        margin-bottom: 100px;
    }
}

.section {
   // margin: 50px 0px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    

    &__item {
        width: 100% !important;

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
            @include editbutton;
            min-height: auto;
            height: auto;
            width: auto;
            padding: 8px 16px;
            margin-bottom: 0;
            font-weight: 700;
        }
    }
}

.card {
    height: auto;
    border-radius: 5px;
    width: 100%;
    box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
    padding: 16px;
    border: 0.5px solid rgba(211, 211, 211, 0.442);
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 30px;

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
        //height: 50px;
        //border-bottom: 0.5px solid rgba(211, 211, 211, 0.368);
        button {
            @include smallbutton-white;
            width: auto;
            padding: 8px 16px;
            height: auto;
            min-height: auto;
        }

        p {
            color: $faint;
            font-size: 16px !important;
            text-transform: none;
            font-weight: 600;
            text-align: center;
            width: 100%;
        }

        
    }

    &__body {
        display: flex;
        //flex-wrap: wrap;
        padding: 16px 0;

        justify-content: space-between;

        &__divider {
            max-height: 100px;
            width: 1px;
            background-color: lightgrey;
        }
        &__detail {
            display: flex;
            flex-direction: column;
            //margin-right: 20px;
            //border: 1px solid black;
           

           // margin-bottom: 16px;
            //padding-right: 0px 16px;
            width: 45%;

            p {
                color: grey;
                width: 100%;
                text-align: center;

                &:first-of-type {
                    font-weight: 700 !important;
                    //text-transform: uppercase;
                    color: $charcoal;
                    font-size: 25px

                }
                font-weight: 400;
            }
        }
    }

}


.page {
    background: white;
   // border: 0.5px solid rgba(211, 211, 211, 0.24);
    margin-bottom: 10px;
        box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
    border: 0.5px solid rgba(211, 211, 211, 0.442);


    &__header {
        font-size: 16px;
        padding: 16px;
        display: flex;
        justify-content: flex-end;

        &__status {
            display: flex;
            align-items: center;
            //margin-left: 16px;
            font-size: 14px;
            &__indicator {
                width:10px;
                height: 10px;
                border-radius: 50%;;
                margin-right: 8px;;
            }
        }

        &__content {
            display: flex;
            align-items: center;
            margin-right: 16px;
        }
        &__ctas{
            display: flex;
            justify-content: space-between;

            button {
                @include editbutton;
            }
        }

        
        
    }
    &__content {
        padding: 8px 24px;
        display: grid;
        justify-content: space-between;
        grid-template-columns: 19% 19% 19% 19% 19%;
        &__item {
            //border: 1px solid lightgray;
            font-size: 14px;
            margin-bottom: 16px;
            p {
                font-size: 14px;
                font-weight: 400;
                
                &:last-of-type {
                    //font-weight: 300;
                    color: $faint;

                }
            }
        }
    }
}

</style>