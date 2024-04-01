
import DashboardLayout from '../../../components/layouts/dashboard-layout.vue';
<template>
    <DashboardLayout>

        <template #content>

            <div class="page" v-if="!loading_page">

                <BaseModal v-if="show_invest_modal" @close="show_invest_modal=false">

                    <template #header>
                        <div class="modalheader flex space-between flex-center-y">
                            <p>Invest in {{ property.name }} </p>

                            <div>

                                <svg @click="show_invest_modal = false" style="cursor: pointer;" width="16" height="16" viewBox="0 0 8 8" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7" stroke="black" stroke-width="0.5" stroke-linecap="round" />
                                <path d="M7 1L1 7" stroke="black" stroke-width="0.5" stroke-linecap="round" />
                                </svg>
                            </div>
                            
                        
                        </div>
                    </template>
                

                    <template #body>
                        <div class="modalbody padding-16">
                            <div class="form">

                                <div class="form-input">
                                    <label for="">Investment Amount</label>
                                    <input type="text" v-model="invest_amount" placeholder="Enter Investment Amount">
                                </div>
                                
                                <!-- 
                                <div class="form-input">
                                    <label for="">ROI (Return on Investment)</label>
                                    <input type="text" disabled :value="roi">
                                </div>-->

                                <div class="cta">
                                    <button :disabled="loading_payment || !invest_amount" @click="proceedToPayment">Proceed to Payment</button>
                                </div>
                            </div>
                        </div>
                    </template>
                </BaseModal>
                <div class="page__container flex space-between gap-2">
                    <div class="left">
        
                        <div class="thumbnail">
                            <template v-if="focused_image">
                                <img :src="focused_image">
                            
                            </template>
                            <template v-else>

                                <img :src="property?.thumbnail ">
                            </template>
        
                        </div>
                        
        
        
                        <div class="images">
                            <div class="images__container">
                                <img  @click="changeFocusedImage(image)" :src="image" v-for="(image, index) in computedImages" :key="index">
                            </div>
                        </div>
        
        
                        <div class="property">
        
                            <div class="property__name">
                                {{property.name}}
                            </div>
        
                            <div class="property__status">
        
                                <div class="property__status__indicator">Open</div>
                            </div>
        
                            <div class="property__summary">
                                {{ property.summary }}
                            </div>
        
                            <div class="property__projections flex gap-8">
                                <div class="property__projections__item">
                                    <p> {{ "USD"  }} {{ property.rental_income | money }} </p>
                                    <span>Rental Income</span>
                                </div>
                                
                            </div>

                            <div class="property__description" v-html="property.description">

                            </div>
                        </div>
                    </div>
        
                    <div class="right">
                        <div class="totals">
                            <div class="totals__container">
                                <div class="totals__header">
                                    <p class="amount">{{  property.currency || "USD" }} {{property.current_market_value | money}}</p>
                                    <p class="total">Current Market Value <span><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_805_5355)">
                                        <path d="M9.00165 7.8747V12.3747M9.00165 6.9V5.3997M9.00165 16.4994C10.9907 16.4994 12.8983 15.7093 14.3047 14.3028C15.7112 12.8963 16.5014 10.9887 16.5014 8.9997C16.5014 7.01066 15.7112 5.10308 14.3047 3.69661C12.8983 2.29014 10.9907 1.5 9.00165 1.5C7.01261 1.5 5.10503 2.29014 3.69856 3.69661C2.2921 5.10308 1.50195 7.01066 1.50195 8.9997C1.50195 10.9887 2.2921 12.8963 3.69856 14.3028C5.10503 15.7093 7.01261 16.4994 9.00165 16.4994Z" stroke="#040609" stroke-width="1.14613"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_805_5355">
                                        <rect width="18" height="18" fill="white"/>
                                        </clipPath>
                                        </defs>
                                        </svg>
                                        </span></p>
                                </div>
        
                                <div class="totals__body">
                                    <div class="totals__body__item">
                                        <p>{{ property.max_investors || '-'}} </p>
                                        <p>Max Investors</p>
                                    </div>
                                    <div class="totals__body__item">
                                        <p>{{property.investors || '-'}} </p>
                                        <p>Investors</p>
                                    </div>
        
                                    
                                </div>
        
                                <div class="totals__bottom">
                                    <button @click="investNow" v-if="!user_has_invested">Invest Now</button>
                                    <button @click="investNow" v-else>Add to your investment</button>
                                </div>
                            </div>
                        </div>
        
                        <div class="amenities" v-if="property.amenities">
                            <div class="amenities__container">
                                <div class="amenities__header">
                                    <p class="amenities__header__title">Amenities</p>
        
                                    <div class="amenities__items">
                                        <div class="amenities__item" v-for="(amenity, index) in computedAmenities">
                                            <div class="icon-box">
                                                <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 6.707C3.58283 2.95588 8.533 0.635742 14 0.635742C19.4682 0.635742 24.4172 2.95588 28 6.707L25.6212 9.19617C22.6473 6.08413 18.5383 4.15763 14 4.15763C9.46167 4.15763 5.35267 6.08413 2.37883 9.19617L0 6.707ZM6.67333 13.6929C8.54817 11.7293 11.1382 10.516 14 10.516C16.8618 10.516 19.4518 11.7293 21.3267 13.6929L23.7685 11.1366C21.2683 8.51888 17.815 6.90034 14 6.90034C10.185 6.90034 6.73167 8.51888 4.2315 11.1366L6.67333 13.6929ZM10.941 18.1606C11.7238 17.341 12.8053 16.835 14 16.835C15.1935 16.835 16.2762 17.341 17.059 18.1606L19.4588 15.6483C18.0623 14.1861 16.1327 13.2819 14.0012 13.2819C11.8697 13.2819 9.94 14.1872 8.5435 15.6483L10.941 18.1606ZM14 19.3381C12.761 19.3381 11.7565 20.3349 11.7565 21.5644C11.7565 22.794 12.761 23.7908 14 23.7908C15.239 23.7908 16.2435 22.794 16.2435 21.5644C16.2435 20.3349 15.239 19.3381 14 19.3381Z" fill="#FC4904"/>
                                                    </svg>
                                                    
                                            </div>
                                            
                                            <p class="amenities__item__name">{{amenity}}</p>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
        
                        <div class="location">
                            <div class="location__container flex flex-center-y">
                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.5 1.6875C12.4394 1.6875 14.2994 2.45792 15.6707 3.82928C17.0421 5.20064 17.8125 7.0606 17.8125 9C17.8125 12.09 15.6413 15.4575 11.355 19.1385C11.1167 19.3432 10.8128 19.4557 10.4986 19.4554C10.1844 19.4551 9.88072 19.3422 9.64275 19.137L9.35925 18.891C5.26275 15.306 3.1875 12.021 3.1875 9C3.1875 7.0606 3.95792 5.20064 5.32928 3.82928C6.70064 2.45792 8.5606 1.6875 10.5 1.6875ZM10.5 6.1875C9.75408 6.1875 9.03871 6.48382 8.51126 7.01126C7.98382 7.53871 7.6875 8.25408 7.6875 9C7.6875 9.74592 7.98382 10.4613 8.51126 10.9887C9.03871 11.5162 9.75408 11.8125 10.5 11.8125C11.2459 11.8125 11.9613 11.5162 12.4887 10.9887C13.0162 10.4613 13.3125 9.74592 13.3125 9C13.3125 8.25408 13.0162 7.53871 12.4887 7.01126C11.9613 6.48382 11.2459 6.1875 10.5 6.1875Z" fill="black"/>
                                    </svg>
        
                                <p>{{property.location}}</p>
                                    
                            </div>
                        </div>
        
                        <div class="details">
                            <div class="details__container">
                                <div class="details__item flex space-between" style="display: none;">
                                    <p>Total Required Investment</p>
                                    <span>{{property.currency}} {{property.total_investment_needed | money}}</span>
                                </div>
                                <div class="details__item flex space-between">
                                    <p>Minimum Investment</p>
                                    <span>{{property.currency}} {{property.min_investment_amount | money}}</span>
                                </div>
                                <div class="details__item flex space-between">
                                    <p>Total Invested</p>
                                    <span>{{property.currency }} {{property.invested | money}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </DashboardLayout>
</template>

<script>
export default{

    computed: {
        computedAmenities() {
            if (this.property?.amenities) {
                return JSON.parse(this.property.amenities)
            }
            return []
        },
        computedImages() {
            if (this.property?.images) {
                return JSON.parse(this.property.images)
            }
            return []
        },
        userDetails(){
            let details = window.localStorage.getItem('userDetails');
            if (details) {
                return JSON.parse(details)
            }
        },
        roi() {
            const amount = this.invest_amount * (this.projectedReturn / 100)
            return this.invest_amount + amount
        },
        projectedReturn() {
           
            return this.property.projected_return
        }
    },
    created() {
        this.$store.commit('dashboard/setDashboardTitle', 'Properties' )
        this.getProperty();
        this.getUserInvestment()
       // alert(JSON.stringify(this.userDetails))
    },
    data() {
        return {
            loading_page: true,
            property: {},
            show_invest_modal: false,
            invest_amount: 0,
            loading_payment: false,
            focused_image: '',
            user_has_invested: false,
        }
    },
    methods: {
        getUserInvestment(){
            this.$api.get('/investments?property_id=' + this.$route.params.slug).then(resp=> {
                this.user_has_invested = resp.data.data.length
            })
        },
        changeFocusedImage(image) {
            this.focused_image = image
        },

        payWithPayaza() {
            try {

                const payazaCheckout = PayazaCheckout.setup({
                    merchant_key:  "PZ78-PKLIVE-FA9BB0D3-592F-4F8D-BA29-85F8B267F4A8",
                    connection_mode: "Live", // Live || Test
                    checkout_amount: Number(this.invest_amount),
                    currency_code: "USD", // NGN || USD
                    email_address: this.userDetails.email,
                    first_name: this.userDetails.first_name,
                    last_name: this.userDetails.last_name,
                    phone_number: "01232425262",
                    transaction_reference: "PL" + Math.floor(
                        (Math.random() * 10000000) + 1
                    ),
                    callback: (resp) => {
                        if (resp.type === 'success') {
                            this.$api.post('/transactions/payaza', {...resp.data,
                                user_id: this.userDetails.id,
                                property_id: this.property_id
                            })
                        }

                    }
                });


                payazaCheckout.setCallback(callback)

                payazaCheckout.showPopup();
            }catch(e) {
                alert(e)
            }


            
        },
        proceedToPayment() {
        
            this.loading_payment = true;
            this.payWithPayaza()



            
            /*FlutterwaveCheckout({
                public_key: this.$config.FLW_PUBLIC_KEY || "FLWPUBK_TEST-ad1d316f90548fca239af66bd32bd954-X",
                tx_ref: `pointsbud_dinetx_${Date.now()}`,
                amount: this.invest_amount,
                currency: "NGN",
                payment_options: "card, banktransfer, ussd",
                //redirect_url: "https://ae83-102-89-45-99.ngrok.io/api/v1/transactions/verify-flw",
                meta: {
                    //customer_id: this.userDetails.business ? this.userDetails.business.id : this.userDetails.id,
                    //is_business: this.userDetails.business ? 1 : 0
                    type: "PROPERTY_INVESTMENT",
                    user_id: this.userDetails.id,
                    property_id: this.property.id
                },
                narration: "Customer Wallet Funding",
                customer: {
                    email: this.user && this.user.email || 'anon@gmail.com',
                    // phone_number: this.userDetails.contact_phone_number,
                    name: this.user && this.user.name || "Anon-Customer",
                },
                customizations: {
                    title: "Afflee PointsBud",
                    logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
                },
                callback: async (data) => {
                    this.$api.post('/transactions/verify-investment', {
                        property_id: this.property.id, 
                        type: "PROPERTY_INVESTMENT", 
                        user_id: this.userDetails?.id,
                        ...data
                    })
                 //  const payload = {...data, ...this.user, fund_amount: this.fund.amount}
                   //this.$api.post(this.$config.DINE_ORDER_SERVICE_URL + `wallets/customer/fund`, payload)

                    /*this.cart_step = 5;
                    let payload = { type: "order-paid", pending_sale_id: this.paymentDetails.id, ...data, business_slug: this.$route.params.slug, business_id: this.business.id };
                    this.$api.post("/dineorders/verify-flw", payload).then(resp => {
                        this.socketClient.emit("order-paid", { ...payload, business_slug: this.$route.params.slug, ...resp.data.data });
                        this.$router.push(`/menu/${this.$route.params.slug}?receipt_generated=${resp.data.data.receipt_id}`);
                    });
                }
            });*/
            
        },
        getProperty() {
            this.loading_page = true
            this.$api.get(`/properties/${this.$route.params.slug}`).then(resp=>{
                this.property = resp.data.data;
            }).finally(()=> {
                this.loading_page = false
            })
        },

    
        investNow() {
            this.show_invest_modal = true;
            
        }
    }
}
</script>

<style lang="scss" scoped>
* {
    font-family: "Open Sans", sans-serif !important;
    &:deep(.modal__body) {
        min-width: 500px;

        @include media("<=t") {
            width: 90%;
            min-width: 90%;;
        }
    }
}


.images {
    height: 120px;
    width: 100%;
    
    &__container {
        height: 100%;
        display: flex;
        gap: 8px;
        padding: 16px 0;
        flex-wrap: wrap;

        img {
            width: 100px;
            object-fit: cover;
            border-radius: 20px;

            cursor: pointer;

            &:hover {
                filter: contrast(1);
            }
        }
    }
}
.thumbnail{
    width: 100%;

    img {
        width: 100%;
        border-radius: 20px;
        height: 400px;
        object-fit: cover;

        @include media("<=t") {
            height: 300px;
        }
    }
}
.right {
    width: 40%;
    padding: 16px;
    @include media("<=t") {
        width: 100%;
        padding: 0;
    }
    
}

.left {
    width: 50%;
    padding: 20px 0;
    @include media("<=t") {
        width: 100%;
    }
}

.property-list {
    width: 100%;
    overflow: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
}
.page {
    &__container {
        display: flex;
        flex-direction: row;

        @include media("<=t") {
            flex-direction: column;
        }
    }
}


.property {

    &__description {
        &:deep(h1, h2, h3, h4, h5) {
            //font-size: 18px;
            font-weight: 600;
        }
        &:deep(p) {
            color: #22262A;
            line-height: 30px;
        }
    }
    &__name {
        font-size: 30px;
        font-weight: 500;

        @include media("<=t") {
            font-size: 24px;
        }
    }

    &__summary {
        line-height: 30px;
        font-size: 15px;
        font-weight: 300;
        color: $charcoal;
    }

    &__status {
     &__indicator {
        padding: 8px 10px;
        background-color: #E0F0E7;
        color: #43795F;
        max-width: fit-content;
        border-radius: 10px;
        font-size: 12px;
     }
    }

    &__projections {
        display: grid;
        grid-template-columns: 30% 30% 30%;
        justify-content: space-between;
        gap: 10px;
        margin: 10px 0;

        @include media("<=t") {
            grid-template-columns: 100%;

        }
        &__item {
            background-color: #FFEDE6;
            padding: 16px;



            p {
                font-size: 20px;
            }

            span {
                font-size: 16px;
                color: #646769;
            }

        }
    }
}

.location {
    background-color: #F2F2F4;
    padding: 24px;
    color: #156CD8;
    text-decoration: underline;
}
.totals {
    background-color: #fc4a0430;
    border: 1px solid #FC4904;
    min-width: 100%;
    border-radius: 20px;


    &__container{
        padding: 24px;

        @include media("<=t") {
            padding: 16px;
        }

    }

    &__header {
        padding: 20px 0;
        border-bottom: 1px dashed $primary;
        margin-bottom: 20px;
        .amount {
            font-size: 20px;
            color: black;
            font-weight: 500;
        }

        .total {
            display: flex;
            align-items: center;
            gap: 2px;
        }
    }

    &__body {
        padding: 20px 0;
        display: flex;
        gap: 8px;
        border-bottom: 1px dashed $primary;
        margin-bottom: 20px;
    }

    &__item {
        
    }
    button {
        @include smallbutton;
        border-radius: 50px;
        width: 100%;
    }
}


.details {
    margin-top: 30px;
    background-color: #F2F2F4;
  //  border: 1px solid #6A7580;
    &__container {
        padding: 0px;
    }

    &__item {
        padding: 16px 24px;
        border-bottom: 1px solid #6a758014 ;
        
        p {
            color: #646464;
        }

        span {
            color: black;
            font-weight: 600;
        }
    }
}

.amenities {
    &__container {

        padding: 20px 24px;

    }

    &__header {
        &__title {
            color: #A1A1A1;
        }
    }

    &__items {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    }

    &__item {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .icon-box {
        border-radius: 10px;
        border: 1px solid $primary;
        min-width: 50px;
        min-height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

}


.cta {
    button {
        @include smallbutton;
        border-radius: 20px;
        width: 100%;
    }
}

.form-input {
    @include plain-form-input;
}

.modalbody{
    padding: 24px 16px;
}
</style>