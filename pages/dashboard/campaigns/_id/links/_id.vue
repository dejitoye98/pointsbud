<template>
    <div>

        <p class="title">Link Details</p>
        <div class="page">
            <div class="page__header">
                    <div class="page__header__content"> 
                        <!--<p>Status:</p>-->

                        <div class="page__header__status">
                            <div class="page__header__status__indicator green-fill" v-if="details.is_active"></div>
                            <div class="page__header__status__indicator red-fill" v-else></div>

                            <p class="green" v-if="details.is_active">Active</p>
                            <p class="red" v-else>Inactive</p>

                        </div>
                    </div>
                

                <div class="page__header__ctas">
                    <SwitchComponent :checked="details.is_active"/>
                    <!--<button @click="editCampaign">Edit</button>-->
                </div>
            </div>

            <div class="page__content">
                <div class="page__content__item">
                    <p>URL</p>
                    <p>{{details.link}}</p>
                </div>
                <div class="page__content__item">
                    <p>Advert Note</p>
                    <p>{{details.advert_note}}</p>
                </div>
                <div class="page__content__item">
                    <p>Cost Per Click</p>
                    <p>{{details.pay_currency + ' ' + formatMoney(details.pay_per_click)}}</p>
                </div>
                <div class="page__content__item">
                    <p>Cost Per Lead</p>
                    <p>{{details.pay_currency + ' ' + formatMoney(details.pay_per_lead)}}</p>
                </div>
                
                <div class="page__content__item">
                    <p>Cost Per Sale</p>
                    <p>{{details.pay_currency + ' ' + formatMoney(details.pay_per_sale)}}</p>
                </div>
                
            </div>
        </div>


        <p class="title">Marketer Links</p>
        <Listing show_pagination="true" 
            :pagination="redir_links.page_info" 
            :labels="redir_links.labels"
            :records="redir_links.list"
            >
        </Listing>
    </div>
</template>


<style lang="scss" scoped>
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
.title {
    color: lightgray;
    font-size: 25px; 
    font-weight: 700;
    margin-top: 50px;
    &:first-of-type {
        margin-top: 0;
    }
}
.page {
    background: white;
    border: 0.5px solid rgba(211, 211, 211, 0.24);
    margin-bottom: 10px;
    &__header {
        font-size: 16px;
        padding: 16px;
        display: flex;
        justify-content: space-between;

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

<script>
import SwitchComponent from '../../../../../components/inputs/SwitchComponent'

export default {
    layout: 'dashboard',
    components: {
        SwitchComponent
    },
    data() {
        return {
            details: {},
            redir_links: {
                list: [],
                labels: {
                    "URL": {
                        property: "redir_link",
                        type: "text",
                    },
                    "Marketer": {
                        property: "campaign_marketer.marketer.name"
                    },
                    "Clicks": {
                        property: "campaign_marketer.clicks_driven"
                    },
                    "Leads": {
                        property: "campaign_marketer.leads_driven"
                    },
                    "Sales": {
                        property: "campaign_marketer.sales_driven"
                    },
                },
                page_info: {},
            }
        }
    },
    created() {
        this.getLink()
        this.getLinkDetails()
    },
    methods: {
        formatMoney(value) {
            return Intl.NumberFormat('en-US').format(value)

        },
        getLink() {
            this.$api.get(`/links/${this.$route.params.id}`)
                .then(resp => {
                    this.details = resp.data.data;
                }).catch(err=> {
                    this.error = err && err.response && err.response.data.data || err
                    this.$store.dispatch('dashboard/actionShowErrorToast', {message: this.error })          
                })
        },
        getLinkDetails() {
            this.$api.get(`/links/${this.$route.params.id}/redir_links`)
                .then(resp=> {
                    this.redir_links.list = resp.data.data.list;
                    this.redir_links.page_info = resp.data.data.page_info
                })
                .catch(err=> {
                    this.error = err && err.response && err.response.data.data || err
                    this.$store.dispatch('dashboard/actionShowErrorToast', {message: this.error })                
                })

        },
        computeFullURL(link) {
            if (link.host) {
                return link.host + '/' + link.redir_link
            }
            else {
                if (process.env.NODE_ENV === 'production') {
                    return "https://afflee.com/" + link.redir_link
                }

                return "https://afflee.com/" + link.redir_link
            }
        }
    },
    
}
</script>