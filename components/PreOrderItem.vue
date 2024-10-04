<template>
    <div class="product">
        
        <PreOrderCartModal v-if="show_order_modal" @close="show_order_modal = false" :item="item"></PreOrderCartModal>
        <div class="product__container">
            <div class="product__time" :class="[orderingTimeDetails.class]">

                <template v-if="!orderingTimeDetails.has_ended">

                    <template v-if="!orderingTimeDetails.is_active">
                        <p>Starts at {{orderingTimeDetails.starts_at}}</p>
                    </template>
                    <template v-else>
                        Active
                    </template>
                </template>

                <template v-else>
                    <p>Ended</p>
                </template>
                                
            </div>
            <div class="product__thumbnail">
                <div class="thumbnail-tag" style="position: absolute; left: 10; top: 10;">
                    {{ item.delivery_discount }}% off delivery
                </div>
                <img v-if="!item.thumbnail" src="https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg" alt="">
                <img v-else :src="item.thumbnail" alt="">
            </div>
            

            <div class="product__details">
                


                <div class="flex gap-16">

                    <p class="product__name">
                        {{ item.name }}
                    </p>

                   
                </div>

              
                <div class="product__price">

                    <span class="product__price__unit">
                        
                        {{ "NGN" | currencySymbol }} {{ item.unitprice | money }}
                    </span>
                    <span class="strikethrough product__price__regular" >
                        {{ "NGN" | currencySymbol }} {{ item.regular_price | money }}

                    </span>


                   
                </div>

                <p class="product__description">
                   {{ item.description }}
                </p>

               

                <div class="left">
                    {{ordersCount.orders}} of {{ordersCount.max_order_count}} left
                </div>

               

                <div class="range">
                    <div class="range-bar" :style="{ width: ordersCount.percent + '%' }"></div>
                </div>

                <div class="product__timer" style="width: 50%; margin:20px auto">


                    <p v-if="orderingTimeDetails.is_active">Offer ends in</p>
                    <p v-if="!orderingTimeDetails.is_active && !orderingTimeDetails.has_ended">Offer starts at</p>

                    <div class="product__timer__time">
                    
                        <template v-if="!orderingTimeDetails.is_active && !orderingTimeDetails.has_ended">

                            <div>
                                <span :id="'startsat-hours-' + item.id" class="time-counter"></span>
                                <span>Hours</span>
    
                            </div>
                            <div>
                                :
                            </div>
    
                            <div  >
                                <span :id="'startsat-minutes-' + item.id" class="time-counter">0</span>
                                <span>mins</span>
                            </div>
    
                            <div>
                                <span  :id="'startsat-seconds-' + item.id" class="time-counter"></span>
                                <span>secs</span>
                            </div>

                        </template>
                        <template v-if="orderingTimeDetails.is_active">

                            <div>
                                <span :id="'endsat-hours-' + item.id" class="time-counter">0</span>
                                <span>Hours</span>
    
                            </div>
                            <div>
                                :
                            </div>
    
                            <div  >
                                <span :id="'endsat-minutes-' + item.id" class="time-counter">0</span>
                                <span>mins</span>
                            </div>
    
                            <div>
                                <span  :id="'endsat-seconds-' + item.id" class="time-counter">0</span>
                                <span>secs</span>
                            </div>

                        </template>

                    </div>
                </div>

                <div>
                    <button @click="triggerPayment" class="buy-btn flex flex-col flex-center-x flex-center-y" v-if="orderingTimeDetails.is_active">

                        <span>
                            Preorder Now

                        </span>

                        <span style="font-size: 12px">
                            {{item.delivery_discount? `(Save ${item.delivery_discount}%)`: ''}}
                        </span>

                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import moment  from 'moment';
import PreOrderCartModal from './modals/PreOrderCartModal.vue';
export default {
    props: ['item'],
    data() {
        return {
            show_order_modal: false,
            location_region_verified: false,
            verifying_location_region: false,
        };
    },
    created() {
        setTimeout(() => {
            if (this.item && !this.orderingTimeDetails.is_active && !this.orderingTimeDetails.has_ended) {
                this.orderStartAtCounter();
            }
            else if (this.item && this.orderingTimeDetails?.is_active) {
                this.orderEndsAtCounter();
            }
        }, 1000);
    },
    methods: {
        verifyLocationRegion() {
            this.$api.post('/utils/location-region-verify', {
                location: thispayl
            }).then(resp=>{
                this.location_region_verified = resp.data.data
            })
        },
        triggerPayment() {
            this.show_order_modal = true;
            /*
            FlutterwaveCheckout({
                public_key: this.$config.FLW_PUBLIC_KEY || "FLWPUBK_TEST-ad1d316f90548fca239af66bd32bd954-X",
                tx_ref: `pointsbudtx_${Date.now()}`,
                amount: this.payload.amount,
                currency: this.payload.currency,
                payment_options: "card, banktransfer, ussd",
                //redirect_url: "https://ae83-102-89-45-99.ngrok.io/api/v1/transactions/verify-flw",
                meta: {
                    //customer_id: this.userDetails.business ? this.userDetails.business.id : this.userDetails.id,
                    //is_business: this.userDetails.business ? 1 : 0
                },
                narration: "Wallet Funding",
                customer: {
                    email: this.customer && this.customer.email || "anon@gmail.com",
                    // phone_number: this.userDetails.contact_phone_number,
                    name: this.customer && this.customer.name || "Dine-Customer",
                },
                customizations: {
                    title: "Afflee PointsBud",
                    logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
                },
                callback: (data) => {
                    //this.$store.commit('dashboard/setActionFundWallet', false);
                  //  this.cart_step = 5;
                    let payload = {...data, customer_wallet_id: this.payload.wallet_id, customer_id: this.payload.customer_id}
                    this.$api.post("/customers/wallets/verify-fund", payload).then(resp => {
                     
                       
                    });
                }
            });*/
        },
        orderStartAtCounter() {
            let countdownDate = moment(this.item.ordering_starts_at);
            const duration = moment.duration(countdownDate.diff(moment()));
            setInterval(() => {
                const duration = moment.duration(countdownDate.diff(moment()));
                // Get hours, minutes, and seconds from the duration
                const hours = Math.floor(duration.asHours()); // Get total hours
                const minutes = duration.minutes(); // Get remaining minutes
                const seconds = duration.seconds(); // Get remaining seconds
                // Display the result in the element with id="countdown"
                document.getElementById("startsat-hours-" + this.item.id).innerHTML = hours;
                document.getElementById("startsat-minutes-" + this.item.id).innerHTML = minutes;
                document.getElementById("startsat-seconds-" + this.item.id).innerHTML = seconds;
            }, 1000);
        },
        orderEndsAtCounter() {
            let countdownDate = moment(this.item.ordering_ends_at);
            // Get hours, minutes, and seconds from the duration
            setInterval(() => {
                const duration = moment.duration(countdownDate.diff(moment()));
                // Get hours, minutes, and seconds from the duration
                const hours = Math.floor(duration.asHours()); // Get total hours
                const minutes = duration.minutes(); // Get remaining minutes
                const seconds = duration.seconds(); // Get remaining seconds
                console.log({ hours, minutes, seconds });
                // Display the result in the element with id="countdown"
                document.getElementById("endsat-hours-" + this.item.id).innerHTML = hours;
                document.getElementById("endsat-minutes-" + this.item.id).innerHTML = minutes;
                document.getElementById("endsat-seconds-" + this.item.id).innerHTML = seconds;
            }, 1000);
        }
    },
    computed: {
        orderingTimeDetails() {
            const details = {
                is_active: false,
                has_ended: false,
                class: 'pending',
            };
            if (this.item?.ordering_starts_at) {
                details.starts_at = moment(this.item.ordering_starts_at).format("MMM DD, HH:MM A").toString();
                if (moment().isAfter(moment(this.item.ordering_starts_at)) &&
                    moment().isBefore(moment(this.item.ordering_ends_at))) {
                    // item is active
                    details.ends_at = moment(this.item.ordering_ends_at).format("MMM DDD").toString();
                    details.class = 'active';
                    details.is_active = true;
                }
                else {
                    if (moment().isAfter(moment(this.item.ordering_ends_at))) {
                        details.has_ended = true;
                        details.class = 'ended';
                    }
                }
                /// check if sold 
            }
            return details;
        },
        ordersCount() {
            let item = this.item;
            let orders = item.count || 0;
            let max_order_count = item.max_order_count;
            let details = {
                orders: orders,
                max_order_count,
                percent: 0
            };
            if (details.orders) {
                details.percent = (parseFloat(parseInt(details.orders) / parseInt(details.max_order_count)) * 100).toFixed(2);
            }
            return details;
        },
    },
    components: { PreOrderCartModal }
}
</script>


<style lang="scss" scoped>

* {
    font-family: "Open Sans", sans-serif;
    &:deep(.vue-tel-input) {
        border: none !important;
        background-color: $input_background;
        border-radius: 10px;

        &:focus {
            outline: none;
        }
        &:active {
            outline: none;
        }
    }
    &:deep(.cov-date-body) {
        background-color: $primary !important;

    }

    &:deep(.active) {
        background-color: $primary !important;
    }

    &:deep(.time-picker) {
        width: 100% !important;
        input {
            height: 50px !important;
        }
    }
}




.thumbnail-tag {
    background: #5ac090;
    color: white;
    padding: 2px 8px;
}
.page {
    background-color: whitesmoke;
    min-height: 100vh;
}

.list {
    display: flex;
    padding: 36px;
    @include media("<=t") {
        padding: 16px;
    }

}

.contain {
    width: 80%;
    margin: auto;
    padding: 16px;
    @include media("<=t") {
        width: 100%;
    }
}

.navbar {
    width: 100%;
    background-color: white;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

}
.strikethrough {
    text-decoration: line-through;
    color: rgb(165, 165, 165);

}
.list {
    display: grid;
    grid-template-columns: 30% 30% 30%;
    justify-content: space-between;
    margin-top: 60px;
   // background-color: white;
    //padding: 36px;

    @include media("<=t") {
        grid-template-columns: 100%;
    }

}

.left {
    font-size: 15px;
   text-align: center;
    color: grey;
    margin-top: 20px;
}

.product{
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
     //   background-color: white;
        border-radius: 10px;

    &__container {
        padding: 8px;
    }

    &__thumbnail {
        padding: 8px;
        border-radius: 8px;
        height: 150px;
        width: 100%;

        img {
            border-radius: 8px;
            object-fit: cover;
            height: 100%;
            width: 100%;
        }
    }

    &__details {
        padding: 8px 16px;

        @include media("<=t") {
            padding: 8px 16px;
        }
    }

    &__time {
        
        font-size: 13px;
        background-color: whitesmoke;
        color: black;
        font-weight: 600;
        width: fit-content;
        padding: 4px 10px;
        border-radius: 10px;
    }

    &__description {
        font-size: 15px;
        color: $faint;
        display: none;
        //line-height: 36px;
        margin-bottom: 10px;
    }


    &__price {
        font-size: 20px;
        font-family: "Didact Gothic", sans-serif;
        //margin-bottom: 20px;
        gap: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        &__unit {
            color: black;
            font-weight: 700;
            //margin-top: -50px;
        }

        &__regular {
            font-size: 16px;
        }
    }
    &__name {
        font-size: 20px;
        font-weight: 800;
        color: black;
        text-align: center  !important;
        width: 100%;
    }

    &__timer {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: 10px;
        text-align: center;
        font-size: 14px;
        //border: 1px solid lightgrey;
        display: grid;

        &__time {
            display: grid;
            grid-template-columns: 29% 10% 29% 29%;
            justify-content: space-between;
            gap: 8px;

            div {
                display: flex;
                flex-direction: column;
            }

        }
    }
}

.buy-btn {
    border-radius: 10px;
    color: white;
    background-color: black;
    width: 100%;
    background-color: $primary;
    max-width: fit-content;
    padding: 8px 36px;
    margin: auto;
    
}

.range {
    background-color: whitesmoke;
    border-radius: 20px;
    width: 100%;
    height: 10px;
    
    &-bar{
        background-color: $primary;
        width: 80%;
        height: 100%;
        border-radius: 20px;
    }
}

.time-counter {
    font-weight: 400
}
.tag {
    @include done-btn;
    padding: 2px 8px;
    text-align: center;
    font-size: 12px;
    border-radius: 10px;
}



.pending {
    @include pending-btn;
}

.active {
    @include paid-btn;
}

.ended {
    @include reject-btn;
}
</style>


