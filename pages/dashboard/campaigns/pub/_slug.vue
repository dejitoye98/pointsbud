<template>
    <div class="pub">
        <Navbar page="pub-campaign-details" @onClickJoinCampaign="join" :dontShow="[context === 'business' ? 'join_campaign': '']"/>
        

        <div class="pub__container card" v-if="campaign">
            
                <!--<button @click="join">Join Campaign</button>-->
                <div class="card__image">
                    <img :src="campaign && campaign.thumbnail || ''" alt="">
                </div>
                
                <div class="card__body">
                    
                    <div class="card__body__header">
                        <p>{{campaign.title}}</p>
                    </div>

                    <div class="card__body__description">
                        <p>{{campaign.description}}</p>
                    </div>

                    <div class="card__body__details">
                        <div class="card__body__details__detail">
                            <label for="">Business Name</label>
                            <p>{{campaign.business.name}}</p>
                        </div>
                        <div class="card__body__details__detail">
                            <label for="">Budget</label>
                            <p>NGN {{computeMoney(campaign.budget)}}</p>
                        </div>
                        <div class="card__body__details__detail">
                            <label for="">Marketers Required</label>
                            <p>{{campaign.marketers_required || 'unlimited'}} </p>
                        </div>
                        <div class="card__body__details__detail">
                            <label for="">Marketers Joined</label>
                            <p>{{campaign.marketers_joined || 'unknown'}}</p>
                        </div>
                        
                        <div class="card__body__details__detail">
                            <label for="">Started</label>
                            <p>{{campaign.starts_at ? computeDate(campaign.starts_at) : computeDate(campaign.createdAt)}}</p>
                        </div>
                        <div class="card__body__details__detail">
                            <label for="">Ends At</label>
                            <p>{{computeDate(campaign.ends_at)}}</p>
                        </div>
                        <div class="card__body__details__detail">
                            <label for="">Application Required </label>
                            <p v-if="campaign.who_can_join === 2">Yes</p>
                            <p v-else>No</p>
                        </div>
                        <div class="card__body__details__detail">
                            <label for="">Recurring Links </label>
                            <p v-if="campaign.recurring_links === 0">No</p>
                            <p v-else>Yes</p>
                        </div>

                        <div class="card__body__details__detail card__body__details__detail--full">
                            <label>Links to promote</label>
                            <div class="links">
                                <div class="links__link" v-for="(link, index) in campaign.campaign_links" :key="index">
                                    <a :href="link.link">{{link.link}}</a>
                                    <p>Pay per click: NGN{{computeMoney(link.pay_per_click)}}</p>

                                </div>
                            </div>
                        </div>

                        <button v-if="context !== 'business' " @click="join">Join Campaign</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import moment from "moment"
export default {
    data() {
        return {
            budget: ''
        }
    },
    async asyncData({store, query, route, $api}) {
        const vm = this;
        const slug = route.params.slug;
        const campaign_id = slug.split('-')[0];
        let campaign, auth= {};
        try {

            const response = await $api.get('/campaigns/pub/' + campaign_id);
            if (response && response.data) {
                campaign = response.data.data;
                await store.dispatch('auth/getAuthUser').then(resp=> {
                    auth = resp.data.data;
                }).catch(err=> {
                    auth = {}
                })

                return {
                    campaign,
                    auth,
                    context: auth && auth.business ? 'business' : 'individual'
                }
                
            }  
            else {
                return {
                    error: "Counldn't find campaign"
                }
            }
        }
        catch(e) {
            return {
                error: "Counldn't find campaign"
            }
            
        }

    
    },
    methods: {
        join() {
            // if there's no auth details
            if (Object.keys(this.auth).length === 0) {
                this.$router.push('/login?' + 'intent=campaign-' + this.campaign.id)
            }
            else {

            }
        },

        getCampaign() {
            const slug = this.$route.params.slug;
            const campaign_id = slug.split('-')[0]
            this.$api.get('/campaigns/pub/' + campaign_id).then(resp=> {

            }).catch(err=> {

            })
        },
        computeMoney(money) {
            return Intl.NumberFormat('en-US').format(money)
        },
        computeDate(date) {
            return moment(date).format("MMM DD, YYYY")
        }
    },
    
}
</script>

<style lang="scss" scoped>
.pub {
    background: $dashboard-background-color;
    width: 100%;
    padding-bottom: 100px;
    &__container {
        margin: auto;
        margin-top: 20px;
    }
}

.links {
    width: 100%;
   // border: 1px solid black;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    
   &__link {
       width:50%;
        @include media('<=t') {
            width: 100%;
            margin-bottom: 8px;
        }
   }
}


.card {
    //min-height: 600px;
    border-radius: 10px;
    width: 50%;
    box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
    padding: 16px 16px;
    border: 0.5px solid rgba(211, 211, 211, 0.442);
    background: white;
    display: flex;
    flex-direction: column;
    position: relative;

    @include media('<=t') {
        width: 90%;
    }
    //justify-content: space-between;
    &__image {
        width: 100%;
        height: 400px;
        display: flex;
        justify-content: center;
        background-color: rgba(211, 211, 211, 0.372);
        position: absolute;
        top: 0;
        left: 0;

        //margin-right: 16px;
        img {
            //width: 50%;
            height: auto;
            object-fit: cover;
        }
    }
    &__body {
        margin-top: 408px;
        width: 100%;
        button {
            @include smallbutton;
        }
        &__description {
            font-size: 17px;
            margin: 8px 0;
            color: grey;
        }
        &__header {
            display: flex;
            width: 100%;
            //border: 1px solid grey;
            justify-content: space-between;

            p {
                color: black;
                font-size: 30px;
                font-weight: 700;
                display: block;
                width: 100%;

                @include media('<=t') {
                    font-size: 26px;
                }
            }


            button {
                @include smallbutton;
                margin-bottom: 0;
            }
        }

        &__details {

            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;

            button {
                @include largebutton;
                width: 100%;
                margin-top: 8px;
                margin-bottom: 16px;
            }

            &__detail {
                width: 24%;
                border-top: 0.5px solid rgba(211, 211, 211, 0.442);
                border-bottom: 0.5px solid rgba(211, 211, 211, 0.442);
                padding: 8px 0;

                label {
                    color: black;
                    font-weight: 600;
                    font-size: 15px;;
                }
                a {
                    color: $primary;
                }
                p {
                    font-size: 15px;
                    color: grey;
                }
                &--full {
                    width: 100%;
                }
            }

            
        }
    }
}


</style>