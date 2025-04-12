<template>
    <BaseModal @close="$emit('close')">
        <template #header>
            <div class="padding-16 space-between flex-center-y">
                <p>Cart</p>

                <svg @click="$emit('close')" style="cursor: pointer;" width="16" height="16" viewBox="0 0 8 8" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L7 7" stroke="black" stroke-width="0.5" stroke-linecap="round" />
                <path d="M7 1L1 7" stroke="black" stroke-width="0.5" stroke-linecap="round" />
                </svg>     
            </div>
        </template>


        <template #body>
            <div class="padding-16">

                <template v-if="step === 2">
                    <div>
                        <p>Payment will be stored in your PointsBud Wallet until your items are delivered. If not, you'll be refunded</p>
                        <div class="form-input">
                            <label for="">Your Phone</label>
                            <vue-tel-input v-model="confirm.customer_phone"></vue-tel-input>
                            <div class="fetching-wallet"  v-if="fetching_wallet" style="width:100%; height: 20px; padding: 8px 0; margin-top: 10px; display: flex; align-items:center; color: grey;">
                                <p style="width: 100%;">Fetching wallet...</p>
                            </div>
                        </div>
                        
                        <div class="form-input" v-if="fetched_wallet">
                            <label for=""> 6-Digit Pin <span class="required">*</span></label>
                            <input required  @keydown="filterInput" type="password" class="number-input" v-model="confirm.wallet_pin">

                        </div>
                        <div class="form-input"  v-if="fetched_wallet &&  !customer_wallet">
                            <label for=""> Confirm Pin  <span class="required">*</span></label>
                            <input required @keydown="filterInput" class="number-input" type="password" v-model="confirm.confirm_wallet_pin">

                        </div>

                       
                        <div style="align-items: center;display: flex;gap: 8px;padding: 16px;justify-content: center;width: 100%;flex-direction: column;">
                            <button  class="big-btn" style="margin: auto !important" :disabled="!enableNextStep2 || fetching_wallet || validating_wallet || creating_wallet" @click="nextStep">Proceed</button>
                            <button class="big-btn" style="background-color: white; color: black !important" @click="step--">
                                Go Back
                            </button>
                        </div>

                    </div>
                    
                </template>


                <template v-else-if="step === 1">

                    <CartItem v-for="(item, index) in cart" :item="item"></CartItem>

                    <button class="big-btn full-width" @click="step++" v-if="business.qr_ordering_mode === 'order-and-pay' ">
                        Continue With Items
                    </button>

                    <button class="big-btn full-width" :disabled="creating_session" v-else-if="business.qr_ordering_mode === 'order-only'" @click="step = 6">
                        Place Order with Attendant
                    </button>
                </template>

                <template v-else-if="step === 3">
                    <div>
                        <div class="tabs">
                            <div class="tab" @click="delivery_type = 'delivery'" :class="[delivery_type === 'delivery' ? 'selected-tab' : '']">Delivery</div>
                            <div class="tab" @click="delivery_type = 'pickup'" :class="[delivery_type === 'pickup' ? 'selected-tab' : '']">Pickup</div>
                        </div>
                    </div>
                    <div>
                        <template v-if="delivery_type === 'delivery'">
                            <div class="form-input">
                                <label for="">Delivery Time</label>
                                <select v-model="delivery_meta.delivery_time">
                                    <option value="instantly" selected default>ASAP</option>
                                    <option value="scheduled">Scheduled</option>
                                </select>
                            </div>

                            <div class="form-input" v-if="delivery_meta.delivery_time === 'scheduled'">
                                <label>Scheduled Time</label>
                                <vue-timepicker format="hh:mm A" v-model="delivery_meta.scheduled_delivery_time"></vue-timepicker>
                            </div>
                            <div class="form-input" v-if="deliveryRegions.length">
                                <label for="">Delivery Area</label>
                                <select v-model="delivery_meta.destination_region">
                                    <option :value="region.place" v-for="(region, index) in deliveryRegions" :key="index"> {{region.place}} - {{region.currency | currencySymbol}}{{region.price | money}}</option>
                                </select>
                            </div>
                            <div class="form-input">
                                <label>Your Delivery Address </label>
                                <input id="address" v-model="delivery_meta.destination_address">
                            </div>


                            <div class="delivery-options" v-if="deliveryFee.price || dynamic_delivery_fee">
                                <h4>Delivery Options</h4>
                                
                                <div class="delivery-option premium" :class="{}" @click="selectDeliveryOption('premium')">
                                    <div class="option-header">
                                        <input type="radio" name="delivery-speed" id="premium-delivery" v-model="delivery_meta.delivery_speed" value="premium">
                                        <label for="premium-delivery">Premium Instant </label>
                                        <span class="price"> {{deliveryFee.currency | currencySymbol}}{{deliveryFee.price || dynamic_delivery_fee | money}}</span>
                                    </div>
                                    <p class="description">Get your order delivered as soon as possible</p>
                                </div>
                                
                                <div class="delivery-option scheduled" :class="{}" @click="selectDeliveryOption('scheduled')" v-if="false">
                                    <div class="option-header">
                                        <input type="radio" name="delivery-speed" id="scheduled-delivery" v-model="delivery_meta.delivery_speed" value="scheduled">
                                        <label for="scheduled-delivery">Scheduled Delivery <span class="discount-tag">Save up to 50%</span></label>
                                        <span class="price">{{deliveryFee.currency | currencySymbol}}{{getDiscountedDeliveryFee | money}}</span>
                                    </div>
                                    <p class="description">Select a time slot and stand a chance to save 50%</p>
                                    
                                    <div class="time-slots" v-if="delivery_meta.delivery_speed === 'scheduled'">
                                        <div class="slot-day">
                                            <h5>Today</h5>
                                            <div class="slot-times">
                                                <button class="slot-time" 
                                                    v-for="slot in todayTimeSlots" 
                                                    :key="slot"
                                                    :class="{ selected: delivery_meta.selected_slot === slot }"
                                                    @click="selectTimeSlot(slot)">
                                                    {{slot.time}} ({{ slot.discount }}% off delivery)
                                                </button>
                                            </div>
                                        </div>
                                        <div class="slot-day">
                                            <h5>Tomorrow</h5>
                                            <div class="slot-times">
                                                <button class="slot-time" 
                                                    v-for="slot in tomorrowTimeSlots" 
                                                    :key="slot"
                                                    :class="{ selected: delivery_meta.selected_slot === slot }"
                                                    @click="selectTimeSlot(slot)">
                                                    {{slot.time}} ({{ slot.discount }}% off delivery)
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="form-input">
                                <label> Delivery Note (optional)</label>
                                <textarea v-model="delivery_meta.note"></textarea>
                            </div>


                            <div class=" gap-16 grid grid-cols-2">

                                <button  @click="step--" style="background-color: white; color: black !important" class="big-btn full-width">
                                    Back
                                </button>
                                <button class="big-btn full-width" :disabled="!canProceedFromDelivery" @click="nextStep">
                                    Continue
                                </button>
                            </div>

                        </template>

                        <template v-else-if="delivery_type === 'pickup'">
                            <div class="form-input flex-col">
                                <label for="">Pickup Date</label>
                                <date-picker :option="date_picker_option" :date="date_picker_date"></date-picker>

                                
                            </div>
                            <div class="form-input">
                                <label>Pickup Time </label>
                                <vue-timepicker v-model="delivery_meta.pickup_time" format="hh:mm A"></vue-timepicker>     
                            </div>


                            <div class="form-input">
                                <label>Pickup Note (optional)</label>
                                <textarea v-model="delivery_meta.note"></textarea>
                            </div>
                            


                            <div class=" gap-16 grid grid-cols-2">

                                <button  @click="step--" style="background-color: white; color: black !important" class="big-btn full-width">
                                    Back
                                </button>
                                <button class="big-btn full-width" @click="nextStep">
                                    Continue
                                </button>
                            </div>

                        </template>
                    </div>
                </template>


                <template v-else-if="step ===4">
                    <div>
                        <div class="section-title">Items</div>
                        <div class="flex space-between gap-2 total-item" style="margin: 16px 0;" v-for="(item, index) in cart" :key="index">
                            <div>
                                {{ item.name }} x  {{ item.quantity }}
                            </div>

                            <div class="no-wrap">
                              {{ "NGN" | currencySymbol }}  {{ getItemTotal(item) }}
                            </div>
                        </div>
                        <div class="section-title">Delivery Detail</div>

                        <template v-if="delivery_type === 'delivery'">

                            <div class="padding-16-y total-item">
                                <div>
                                    Delivery Region
                                </div>
    
                                <div>
                                    {{ delivery_meta.destination_region }}
                                </div>
                            </div>

                            <div  class="padding-16-y total-item">
                                <div>
                                    Delivery Address
                                </div>
    
                                <div>
                                    {{ delivery_meta.destination_address }}
                                </div>
                            </div>
                            
                        </template>
                        <template v-else>
                            <div class="padding-16-y form-input total-item">
                                <div>
                                    Pickup Date
                                </div>
    
                                <div>
                                    <p>

                                        {{ delivery_meta.pickup_date}}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    Pickup Time
                                </div>
    
                                <div>
                                    {{ delivery_meta.pickup_time?.hh + ':' + delivery_meta.pickup_time?.mm + ' ' + delivery_meta.pickup_time.A}}
                                </div>
                            </div>
                            
                        </template>




                        <div class="total">
                            <div class="total-item">
                                <p>Subtotal</p>
                                <p>{{"NGN" | currencySymbol}} {{cartTotal | money}}</p>
                            </div>
                            <div class="total-item" v-if="totalTaxes">
                                <p>Taxes</p>
                                <p>{{totalTaxes | money}}</p>
                            </div>
                            <div class="total-item">
                                <p>Delivery Fee</p>
                                <p>{{deliveryFee.currency || "NGN" | currencySymbol}} {{deliveryFee.price || dynamic_delivery_fee | money}}</p>
                            </div>
                            <div class="total-item">
                                <p>
                                    Service Fee
                                </p>

                                <p>{{"NGN" | currencySymbol}} {{appFee | money }}</p>
                            </div>

                            <div class="total-item">
                                <b style="font-size: 16px;" class="bold">Total</b>

                                <b style="font-size: 16px;" >{{"NGN" | currencySymbol}} {{grandTotal | money}}</b>
                            </div>
                        </div>



                        <div class=" gap-16 grid grid-cols-2">

                            <button  @click="step--" style="background-color: white; color: black !important" class="big-btn full-width">
                                Back
                            </button>
                            <button class="big-btn full-width" :disabled="creating_session" @click="triggerPay">
                                Pay
                            </button>
                        </div>
                    </div>
                </template>

                <template v-else-if="step === 5">
                    <div class="payment-success">
                        <div class="success-icon">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18457 2.99721 7.13633 4.39828 5.49707C5.79935 3.85782 7.69279 2.71538 9.79619 2.24015C11.8996 1.76491 14.1003 1.98234 16.07 2.86" stroke="#5ac091" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M22 4L12 14.01L9 11.01" stroke="#5ac091" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <h2 class="success-title">Payment Successful!</h2>
                        <p class="success-message">Your order has been placed successfully. The merchant will process it shortly.</p>
                        
                        <div class="order-details">
                            <div class="order-number">
                                <span>Order Number:</span>
                                <strong>#{{ checkout_url }}</strong>
                            </div>
                            <div class="order-time">
                                <span>Order Time:</span>
                                <strong>{{ new Date().toLocaleString() }}</strong>
                            </div>
                        </div>
                        
                        <div class="success-actions">
                            <button class="big-btn full-width" @click="viewOrderDetails">
                                View Order Details
                            </button>
                            <button class="big-btn full-width outline" @click="$emit('close')">
                                Close
                            </button>
                        </div>
                    </div>
                </template>

                <template v-else-if="step===6"> 
                    <p>Please enter your first name</p>
                    <div class="form-input">
                        <label for="">First Name <span class="required">*</span> </label>
                        <input v-model="payload.customer_name">
                    </div>
                    <div class="form-input">
                        <label for="">Phone Number</label>
                        <vue-tel-input v-model="payload.customer_phone"></vue-tel-input>
                        <span style="font-size: 11px !important">To track your order</span>
                    </div>

                    <button class="btn big-btn full-width" :disabled="!payload.customer_name" @click="placeUnpaidOrder">Place Order</button>
                </template>


                <template v-else-if="step === 7">
                    <p>Your order has been placed with an attendant</p>
                </template>
            </div>

        </template>
    


    </BaseModal>
</template>


<script>
import {mapGetters} from 'vuex'
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'
import myDatepicker from 'vue-datepicker';
import crypto from 'crypto'
import { initializeApp } from 'firebase/app';


import { getDatabase, ref, set, get, update, push, serverTimestamp, increment, runTransaction, onValue } from 'firebase/database'


import moment from 'moment'
import PriceComparisonBadge from '../PriceComparisonBadge.vue';

function debounce(func, wait = 500) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export default {
    components: {
    VueTimepicker,
    'date-picker': myDatepicker,
    PriceComparisonBadge
},
    props: ['business', 'mode', 'last_checkout_session_id'],
    data() {
        return {
            db: null,
            table_identifier: null,

            loading_dynamic_delivery_fee: false,
            dynamic_delivery_fee: 0,

            custom_date_picker: {
            time: moment().format('YYYY-MM-DD').toString()
        },
        todayTimeSlots: [
            { time: '2:30PM', deliveries: 10, discount: 5 },
            { time: '3:00PM', deliveries: 6, discount: 15 },
            { time: '4:00PM', deliveries: 3, discount: 30 }
        ],
        tomorrowTimeSlots: [
            { time: '9:00 AM - 11:00 AM', deliveries: 2, discount: 50 },
            { time: '11:00 AM - 1:00 PM', deliveries: 4, discount: 25 },
            { time: '1:00 PM - 3:00 PM', deliveries: 7, discount: 15 },
            { time: '3:00 PM - 5:00 PM', deliveries: 9, discount: 10 },
            { time: '5:00 PM - 7:00 PM', deliveries: 5, discount: 20 }
        ],


            customer_id: null,
            checkout_url: null,
            creating_session: false,

            fetching_wallet: false,
            validating_wallet: false,
            creating_wallet: false,
            fetched_wallet: false,
            delivery_type: 'delivery',
            delivery_meta: null,
            delivery_fee: null,

            customer_wallet: {},
            customer_id: null,

            confirm: {

                wallet_pin: '',
                confirm_wallet_pin: ''

            },


            step: 1,
            payload: {

            },
            delivery_meta: {

                delivery_speed: 'premium',
                delivery_time: "instantly",
                selected_slot: null,
                time_selection_method: 'preset',
                custom_time: {
                    hh: '12',
                    mm: '00',
                    A: 'PM'
                },
                selected_discount: 0
            },
            date_picker_option: {
                type: 'day',
                format: 'YYYY-MM-DD',
                week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

            },
            date_picker_date: {
                time: moment().format('YYYY-MM-DD').toString()
            },
            
        }
    },

    created() {
        this.setupFirebase()

        if (this.$route.query.t) {
        this.table_identifier = 'table_' +  this.$route.query.t
      }
    },
    mounted() {
        if (this.customer_wallet && Object.keys(this.customer_wallet).length > 1) {
            this.step = 2;
        }

        if (this.mode) {
            this.delivery_type = this.mode;
        }
    },
    watch: {
        customerPhone(value) {
            if ( value.replace(/\s/g, '').length === 11) {
                console.log("PHONE LENGTH") 
                console.log(value.length)
                this.getCustomerWallet()
            }
        },
        step(value) {
            if (value === 3) {
                //alert('a')
                this.loadGoogleMapScript()
            }
        },
        datePickerValue(value) {
             this.delivery_meta.pickup_date = value;
            // alert(value)
        },

        'delivery_meta.destination_address': debounce(function(value) {
            this.loadDynamicDeliveryFee();
        }, 1000), // 500ms delay

        'delivery_meta.scheduled_delivery_time': function(value) {
            //alert(JSON.stringify(value))

            this.$set(this.delivery_meta, 'scheduled_delivery_time', `${moment().toISOString()} ${value.hh}:${value.mm} ${value.A}`)
        }

    },
    computed: {
        ...mapGetters('shop', ['cart']),
        canProceedFromDelivery() {
            // if delivery step 

            if (!this.delivery_meta.destination_address) return false;
            if (!this.delivery_meta.destination_region && this.deliveryRegions.length) return false;
            if (!this.deliveryFee.price && !this.dynamic_delivery_fee) return false

            return true;
        },
        dynamicDeliveryFee() {

            // dynamic dlelivery fee should be  = 1 if there are no delivery regiions
            if (!this.deliveryRegions.length) return true;
            return false;
            const pref = this.getPreference('menu_settings');
            const value = pref && pref.value && JSON.parse(pref.value);
            if (value) return value.dynamic_delivery_fee
            return false
        },
        datePickerValue() {
            return this.date_picker_date.time;
        },

        getDiscountedDeliveryFee() {
        if (this.deliveryFee && this.deliveryFee.price) {
            // Apply the appropriate discount based on selection
            let discountPercent = 0;
            
            if (this.delivery_meta.delivery_speed === 'scheduled') {
                if (this.delivery_meta.time_selection_method === 'custom') {
                    discountPercent = 10; // Fixed 10% discount for custom times
                } else if (this.delivery_meta.selected_discount > 0) {
                    discountPercent = this.delivery_meta.selected_discount;
                } else {
                    discountPercent = 20; // Default discount if nothing selected yet
                }
            }
            
            return this.deliveryFee.price * (1 - (discountPercent / 100));
        }
        return 0;
    },
        grandTotal() {
            return parseFloat(this.cartTotal) +
             parseFloat(this.deliveryFee.price || this.dynamic_delivery_fee || 0) + 
             parseFloat(this.appFee) +
             parseFloat(this.totalTaxes)

        },
        cartTotal() {
            let sum = 0;

            for (let item of this.cart) {
                //sum += item.unitprice * item.quantity;

               /* if (item.delivery_pack) {
                    sum += item.delivery_pack.unitprice
                }*/


                sum += this.getItemTotal(item)
                
            }
            
            
            return sum
        },
        taxes() {
            /*
                examples of what it returns [{
                    tax, 
                    value,
                    
                }]
            */
            const array = []
            if (this.business && this.business.taxes && this.cartTotal) {
                let total_tax_value = 0;
                JSON.parse(this.business.taxes).forEach(tax => {
                    if (tax.type === 'percent' && tax.value) {

                        if (!this.deliveryFee.price) {

                            const obj = {
                                name: tax.name,
                                value_total: parseFloat(tax.value / 100) * (this.cartTotal).toFixed(2),
                            }
                            array.push(obj)
                        }
                        else {

                            const obj = {
                                name: tax.name,
                                value_total: parseFloat((tax.value / 100) * (this.cartTotal + this.deliveryFee.price)).toFixed(2),
                            }
                            array.push(obj)
                        }






                    }

                })
                return array;
            }
            array
            return []

        },
        totalTaxes() {
            return this.taxes.map(t =>
                parseFloat(t.value_total).toFixed(2)).reduce((accumulator, currentValue) => {
                    return parseFloat(accumulator) + parseFloat(currentValue);
                }, 0)
        },
        appFee() {
            try {

                let paystack_pricing = parseFloat((1.4 / 100) * (this.cartTotal + this.totalTaxes + this.deliveryFee.price))

                let resolved_app_fee = 0
            
                




                let default_fee = {value: 5, type: 'percent'};
                let resolved_fee = {}


                if(this.business && this.business.custom_app_fee){
                    resolved_fee = JSON.parse(this.business.custom_app_fee);
                }
                
                if(!resolved_fee.value) resolved_fee = default_fee;
    
                if(resolved_fee.type === 'flat') {
                    resolved_app_fee = resolved_fee.value;
                    //alert(resolved_app_fee)
                }
                else {
                  resolved_app_fee = parseFloat((resolved_fee.value/100) * this.cartTotal);
                }

                if ((this.cartTotal + resolved_app_fee + this.deliveryFee.price + this.totalTaxes) > 2500) {
                    return parseFloat(resolved_app_fee  + 100).toFixed(2);
                }
                else {
                    return parseFloat(resolved_app_fee).toFixed(2)
                }
                return 0
            }catch(e) {
               // alert(e)
                return parseFloat((5/100) * this.cartTotal).toFixed(2)
            }
        },
        deliveryFee() {
            let fee = 0;
            if (this.deliveryRegions && this.delivery_meta.destination_region) {
                const chosenRegion = this.delivery_meta.destination_region
                const regionObj = this.deliveryRegions.find(r => r.place === chosenRegion);
                return { currency: regionObj.currency, price: regionObj.price }
            }
            return { currency: null, price: null }
        },
        customerPhone() {
            if (this.confirm)
            return this.confirm.customer_phone
        },
        getPreference(pref) {
            if (this.prefs) {

                return this.prefs.find(p => p.business_setting.setting_alias === pref);
            }
            return null
        },
        deliveryRegions() {
            if (this.business?.delivery_regions) {
                return JSON.parse(this.business.delivery_regions)
            }
            return []

        },
        enableNextStep2() {
            if (this.confirm.customer_phone) {

                if (this.fetched_wallet && this.confirm.wallet_pin.length === 6 && this.confirm.confirm_wallet_pin.length === 6) {
                    return true 
                }
                if (this.fetched_wallet && this.customer_wallet && this.confirm.wallet_pin.length === 6) {
                    return true
                }
                return false
            }
            return false
        },
    },
    methods: {
        setupFirebase() {
            const firebaseConfig = {
                apiKey: "AIzaSyBdh2ygNy-eIL0OtJwlA4LGAfHpcXMmWB8",
                authDomain: "pointsbudapp.firebaseapp.com",
                databaseURL: "https://pointsbudapp-default-rtdb.firebaseio.com",
                projectId: "pointsbudapp",
                storageBucket: "pointsbudapp.appspot.com",
                messagingSenderId: "76264286716",
                appId: "1:76264286716:web:b1caa1165fae6fb0a4aa79",
                measurementId: "G-PM3C3PV904"
            };

            const firebaseApp = initializeApp(firebaseConfig);
            this.db = getDatabase();
            // alert(this.db)

        },

        async placeUnpaidOrder() {
            const orders = [];
            let r_uid =  this.generateUniqueCode();
            let id, url = null;

            this.cart.forEach(async item => {
                let item_key = this.generateUniqueCode(5);
                
                const obj = {
                    name: item.name,
                    product_id: item.id,
                    unitprice: item.unitprice,
                    item_key,
                    r_uid,
                    item_uid: item_key, 
                    space: this.table_identifier || this.mode  || 'delivery', 
                    timestamp: serverTimestamp(),
                    //points_earned: this.loyalty_program && item.points_to_earn || 0,
                    //points_used: this.loyalty_program && this.products_using_points.includes(item.id) ? (item.quantity * item.points_to_deduct) : 0,
                    currency: item.currency || "NGN",
                    quantity: item.quantity,
                    total_amount: (item.quantity * item.unitprice),
                    customer_comment: item.customer_comment || "",
                    delivery_pack: item.delivery_pack || '',
                    //variations: item.variations,
                    question_answers: item.question_answers || ""
                };
                orders.push(obj);

                
                
            });
            let payload = {
                    delivery_type: this.table_identifier || this.mode || 'delivery',
                    delivery_fee:   0,
                    business_slug: this.$route.params.slug,
                    business_id: this.business.id,
                    items: orders,
                    taxes: this.taxes,
                    origin: 'qr-call-waiter',
                // vat: parseFloat(this.vat || 0),
                    //appFee: this.appFee,
                    // checkout_session: ref,
                    customer_phone: this.payload.customer_phone,
                    customer_name: this.payload.customer_name,
                    send_alert: true,
                    
                }

            if (!this.last_checkout_session_id) {

               

                // first_create checkoutSession
                this.creating_session = true;
                let checkout = await this.createCheckoutSession(payload)
                id = checkout.id
                url = checkout.url

                window.localStorage.setItem('lastCheckoutSessionId', url)
                window.localStorage.setItem('lastCheckoutSessionCreatedAt', new Date().toISOString());

            }

            else {

                // add item, not create

                alert("YOU're ABOUT TO CREATE SOME SHIT")
                return
            }
            

          
            

           
            this.step = 7;

            const orders_ref = ref(this.db, `business_orders/${this.business.id}/${this.table_identifier}/orders/${url}`)

            await set(orders_ref, {
                r_uid,
                status: 'pending',
                timestamp: serverTimestamp(),
                customer_name: this.payload.customer_name || '',
                customer_phone: this.payload.customer_phone || '',
                taxes: this.totalTaxes || 0,
                ...orders
            })
        },


        generateUniqueCode(length = 6) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const randomBytes = crypto.randomBytes(length);
            const code = [...randomBytes].map(byte => characters[byte % characters.length]).join('');
            return code;
        },
        viewOrderDetails() {
            this.$router.push('/track-order/' + this.checkout_url);
        },

        async loadDynamicDeliveryFee(){
            this.loading_dynamic_delivery_fee = true
            return await this.$api.post('/checkout-session/menu/pricing', {
                address1: this.business.address,
                address2: this.delivery_meta.destination_address
            }).then(resp=> {
                if (resp.data.data) {

                    this.dynamic_delivery_fee = parseFloat(resp.data.data).toFixed(0)
                }
                //alert(this.dynamic_delivery_fee)
                return resp.data.data;
            }).catch(err=> {
                throw new Error(err)
            }).finally(()=>{
                this.loading_dynamic_delivery_fee = false
            })
       },
        
    
        selectTimeSlot(slotTime, discount) {
            this.$set(this.delivery_meta, 'selected_slot', slotTime)
            this.$set(this.delivery_meta, 'selected_discount', discount)
           
        },
        
        updateCustomDate(date) {
            //this.custom_date_picker.time = date;
            this.$set(this.custom_date_picker, 'time', date)
            this.updateCustomTimeSlot();
        },
        
        updateCustomTimeSlot() {
            if (this.delivery_meta.custom_time && this.custom_date_picker) {
                const formattedDate = moment(this.custom_date_picker.time).format('MMM D');
                const formattedTime = `${this.delivery_meta.custom_time.hh}:${this.delivery_meta.custom_time.mm} ${this.delivery_meta.custom_time.A}`;
                

                this.$set(this.delivery_meta, 'selected_slot', `${formattedDate}, ${formattedTime}`)
                this.$set(this.delivery_meta, 'selected_discount', 10)
                //this.delivery_meta.selected_slot = `${formattedDate}, ${formattedTime}`;
                //this.delivery_meta.selected_discount = 10; // Fixed 10% discount for custom time
            }
        },
        selectDeliveryOption(type) {

            this.$set(this.delivery_meta, 'delivery_speed' , type)
            this.delivery_meta.delivery_speed = type;
            // Reset selected slot if changing from scheduled to premium
            if (type === 'premium') {
                //this.delivery_meta.selected_slot = null;
                this.$set(this.delivery_meta, 'selected_slot' , null)
                this.$set(this.delivery_meta, 'selected_discount' , 0)


            }
        },
        selectTimeSlot(slot) {
            this.delivery_meta.selected_slot = slot;
        },
        makePaymentBudpay(checkout_session_id, checkout_url) {
            BudPayCheckout({
                    key: this.$config.BUDPAY_PUBLIC_KEY || 'pk_test_ts9gpurgsis82hlhoaezoayijt06m4vhn4jrk2', // Replace with your public key
                    email: this.customer?.email || 'anon@gmail.com',
                    amount: this.grandTotal.toFixed(2),
                    first_name: this.customer?.name || 'anon',
                    last_name: this.customer?.name || 'anon',
                    currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars
                    reference: '' + Math.floor((Math.random() * 100000000000) + 1) + new Date().getSeconds() + new Date().getMilliseconds(), // generates a pseudo-unique reference. Please replace with a reference you generated. or remove the line entirely so our API will generate one for you
                    callback: (response) => {
                    //this happens after the payment is completed successfully
                        var reference = response.reference;
                        let data = response
                        //alert('Payment complete! Reference: ' + reference + ', Status: ' + response.status);
                        this.step = 5;
                       
                        
                       let payload = { type: "order-paid", checkout_session_id, ...data, business_slug: this.$route.params.slug, business_id: this.business.id };
                            this.$api.post("/transactions/verify-budpay", payload).then(resp => {
                               //this.registerFirebaseOrder()


                           });
                           let message = this.createOrderMessage()

                          
   
                           let encoded = encodeURIComponent(message)
                           const link = `whatsapp://send?text=${encoded}&phone=${this.business.contact_phone}`;
                           window.open(link, '_self')
                    },
                    onClose: function (response) {
                        console.log(response);
                        alert('Transaction was not completed, window closed.');
                        },
                       
                });

        },
        makePayment(checkout_session_id, checkout_url) {
            try {

                FlutterwaveCheckout({
                    public_key: this.$config.FLW_PUBLIC_KEY || "FLWPUBK_TEST-ad1d316f90548fca239af66bd32bd954-X",
                    tx_ref: `pointsbudtx_${Date.now()}`,
                    amount: this.grandTotal,
                    currency: "NGN",
                    payment_options: "card, banktransfer, ussd",
                    //redirect_url: "https://ae83-102-89-45-99.ngrok.io/api/v1/transactions/verify-flw",
                    meta: {
                        //customer_id: this.userDetails.business ? this.userDetails.business.id : this.userDetails.id,
                        //is_business: this.userDetails.business ? 1 : 0
                        type: 'order-paid'
                    },
                    narration: "Wallet Funding",
                    customer: {
                        email: this.customer && this.customer.email || this.business?.contact_email || "anon@gmail.com",
                        // phone_number: this.userDetails.contact_phone_number,
                        name: this.customer && this.customer.name || "Anon-Customer",
                    },
                    customizations: {
                        title: "Afflee PointsBud",
                        logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
                    },
                    callback: async (data) => {
                        //this.$store.commit('dashboard/setActionFundWallet', false);
                        this.cart_step = 5;
                        //this.payment_status = data.status;
                       // alert(data.status)
                       
                        
                       let payload = { type: "order-paid", checkout_session_id, ...data, business_slug: this.$route.params.slug, business_id: this.business.id };
                            this.$api.post("/transactions/new-verify-flw", payload).then(resp => {
                               //this.socketClient.emit("order-paid", { ...payload, business_slug: this.$route.params.slug, ...resp.data.data });
                               //this.registerFirebaseOrder()


                           });
                           let message = this.createOrderMessage()

                          // alert("You'll be redirected to WhatsApp to share your receipt with the business")
                   //alert(message)
   
                           let encoded = encodeURIComponent(message)
                           const link = `whatsapp://send?text=${encoded}&phone=${this.business.contact_phone}`;
                           window.open(link, '_self')


                       
                       // window.open(`/receipts/${checkout_url}`, "self")
                        //this.$router.push(`/receipts/${checkout_url}`);
                    }
                });
            }catch(e) {
                alert(JSON.stringify(e))
            }
        },
        createOrderMessage(url) {
            try {

                let message = "*New Order*\n\nItems:";
                 for (let item of this.cart) {
                     message+= `\n*${item.name} x ${item.quantity}*`
                     if (item.additions && item.additions.length)  {
                         message+= `\nAdditions: ${item.additions.map(a=>a.value).join(',')}`
                        
                     }
                     if (item.delivery_pack) {
                        
                         message += `\nPack: ${item.delivery_pack.name}`
                     }
                     if (item.customer_comment) {
                        
                        message += `\nComment: ${item.customer_comment}`
                       
                    }
     
                     
                 }
     
                 message += '\n\n ----------'

                 message += `\nDelivery Details\n`
                 if (this.delivery_type === 'delivery') {
     
                     message+=`\nRegion:${this.delivery_meta.destination_region}\nDelivery Address: ${this.delivery_meta.destination_address}`
                 }
                 if (this.delivery_type === 'pickup') {
     
                     message+=`\nPickup Date:  ${this.delivery_meta.pickup_date}\nPickup Time: ${this.delivery_meta.pickup_time.hh + ":" + this.delivery_meta.pickup_time.mm + " " +  this.delivery_meta.pickup_time.A }`
                 }
                 if (this.delivery_meta.note) {
     
                        message+=`\nNote:  ${this.delivery_meta.note}\n`
                    }

                 message += `\n\n ----------`
                 message += `\n\nSubtotal: ${this.cartTotal}`
                 message += `\nDeliveryFee: ${this.dynamicDeliveryFee ? this.dynamic_delivery_fee :  this.deliveryFee?.price }`
                 message += `\n ----------\n`
                 
                 message += `\nPayment Details: https://www.pointsbud.com/receipts/${this.checkout_url}`
                 message += `\n\nTo Accept Order: https://www.pointsbud.com/admin/checkout/${this.checkout_url}/accept`
                    message += `\n\nTo Reject Order: https://www.pointsbud.com/admin/checkout/${this.checkout_url}/reject`
     
                 return message;
            }catch(e) {
                alert(e)
            }


        },
        paywithPaystack(checkout_session_id, checkout_url) {
            let handler = PaystackPop.setup({
                    key: this.$config.PAYSTACK_PUBLIC_KEY, // Replace with your public key
                    email:  "pointsbud@gmail.com",
                    amount: parseFloat(this.grandTotal || 0) * 100,
                    ref: `pointsbudtx_${Date.now()}`, // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
                    // label: "Optional string that replaces customer email"
                    onClose: function () {
                        //alert('Window closed.');
                    },
                    callback: (response) => {
                        //alert(JSON.stringify(response))
                        let vm = this
                        // let message = 'Payment complete! Reference: ' + response.reference;
                        //alert(message);
                        try {
                            let payload = { type: "order-paid", checkout_session_id, ...response, business_slug: this.$route.params.slug, business_id: this.business.id };
                                /*this.$showToast({
                                    message: "Redirecting you"
                                })*/
                            vm.$api.post("/transactions/verify-paystack", payload).then(resp => {
                                // this.socketClient.emit("order-paid", { ...payload, business_slug: this.$route.params.slug, ...resp.data.data });
                                //this.$router.push(`/menu/${this.$route.params.slug}?receipt_generated=${resp.data.data.receipt_id}`);
                                
                                //this.registerFirebaseOrder()
                                this.$router.push('/receipts/' + checkout_url)
                                this.$emit('close', true)
                            });
                        } catch (e) {
                           // alert(e)
                        }
                    }
                });

                handler.openIframe();
        },
        async triggerPay() {

            try {
                
                const orders = [];
    
                this.cart.forEach(async item => {
                    let item_key = this.generateUniqueCode(5)
                    const obj = {
                        name: item.name,
                        product_id: item.id,
                        unitprice: item.unitprice,
                        item_key, 
                        item_uid: item_key,
                        //points_earned: this.loyalty_program && item.points_to_earn || 0,
                        //points_used: this.loyalty_program && this.products_using_points.includes(item.id) ? (item.quantity * item.points_to_deduct) : 0,
                        currency: item.currency,
                        quantity: item.quantity,
                        total_amount: (item.quantity * item.unitprice),
                        customer_comment: item.customer_comment,
                        delivery_pack: item.delivery_pack,
                        //variations: item.variations,
                       // question_answers: item.question_answers
                    };
                    orders.push(obj);
    
                    
                    
                });
                //alert(JSON.stringify(orders))
                const payload = {
                    token: this.$cookies.get("usertoken"),
                    r_uid: Date.now(),
                    delivery_type: this.table_identifier || this.delivery_type,
                    delivery_meta: this.delivery_meta,
                    delivery_fee: this.deliveryFee && this.deliveryFee.price,
                    business_slug: this.$route.params.slug,
                    business_id: this.business.id,
                    items: orders,
                    taxes: this.taxes,
                   // vat: parseFloat(this.vat || 0),
                    appFee: this.appFee,
                    // checkout_session: ref,
                    customer_phone: this.customerPhone,
                    send_alert: false,
                    pending_sale_id: window.localStorage.getItem("last_order") && JSON.parse(window.localStorage.getItem("last_order")).id
                }
    
    
    
    
    
                    const {id, url} = await this.createCheckoutSession(payload)
                    //this.paywithPaystack(id, url)
                    this.makePaymentBudpay(id, url)
            }
            catch (e) {
                alert(e)
                console.log(e)
            }

               

        },
        async createCheckoutSession(payload) {
            this.creating_session = true
            if (this.business?.id) {

                return await this.$api.post('/checkout-session/create/menu', payload).then(resp => {
                    const code = resp.data.data.url;
                    this.checkout_url = code;


                    const url = new URL(window.location.href);
                    url.searchParams.set('csess', code);

                    window.history.pushState(null, null, url.toString());

                    return resp.data.data;
                    

                }).finally(()=> {
                    this.creating_session = false
                })
            }
        },
        getItemTotal(item) {
            let result = 0;
        
            if (item) {
                const retrieved_item = this.cart.find(i=> i.id === item.id); 
                if (retrieved_item) {
                    
                    let item_total = (retrieved_item.quantity * retrieved_item.unitprice);
                    result += item_total;
                    
                    if (retrieved_item.additions) {
                        for (let addition of retrieved_item.additions) {
                            result += (addition.unitprice * retrieved_item.quantity )
                        }
                    }

                    if (retrieved_item.delivery_pack?.unitprice) {
                        result += retrieved_item.delivery_pack.unitprice
                    }
                }
            }

            return result
        },
        nextStep() {
            if (this.step === 2) {
                if (this.fetched_wallet && !this.customer_wallet) {
                        this.createWallet()
                }
                else {
                    this.validateWalletPin()
                }
            }
            if (this.step ===3) {
                if (this.delivery_type === 'delivery')  {
                    if (!this.delivery_meta.destination_address) return false;
                    if (!this.delivery_meta.destination_region && this.deliveryRegions.length) return false;

                    if (!this.deliveryFee.price && !this.dynamic_delivery_fee) return false
                }

                this.step = 4
            }

            return true;
        },
        loadGoogleMapScript() {
            setTimeout(() => {
                if (document.getElementById('address')) {
                    var defaultBounds = new google.maps.LatLngBounds(
                        new google.maps.LatLng(6.5244, 3.3792), // Southwest corner (latitude, longitude)
                        new google.maps.LatLng(6.7028, 3.6236)  // Northeast corner (latitude, longitude)
                    );
                    var input = document.getElementById('address');
                    var options = {
                        bounds: defaultBounds,
                        //types: ['establishment']
                    };
                    this.autocomplete = new google.maps.places.Autocomplete(
                        input, options
                    );
                    //this.getLocationBounds()
                    this.autocomplete.addListener("place_changed", this.fillInAddress);


                   // alert('e')
                }
            }, 2000)
        },
        fillInAddress() {
            this.place = this.autocomplete.getPlace();
            this.delivery_meta.destination_address = this.place.formatted_address;
            // alert(JSON.stringify(Object.keys(this.place)))
            const placesService = new google.maps.places.PlacesService(document.createElement('div'));
            const autocompleteService = new google.maps.places.AutocompleteService();

            const place = autocompleteService.getPlacePredictions({ input: this.place.formatted_address }, (predictions, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && predictions && predictions.length > 0) {
                    const placeId = predictions[0].place_id;

                    // Get Place Details using Place ID
                    placesService.getDetails({ placeId }, (placeResult, placeStatus) => {
                        if (placeStatus === google.maps.places.PlacesServiceStatus.OK) {
                            const latitude = placeResult.geometry.location.lat();
                            const longitude = placeResult.geometry.location.lng();

                            this.delivery_meta.destination_bounds = { lat: latitude, long: longitude }

                            this.delivery_meta.destination_latitude = latitude;
                            this.delivery_meta.destination_longitude = longitude

                            console.log(`Longitude: ${longitude}`);
                        } else {
                            console.log('Error getting place details:', placeStatus);
                        }
                    });
                } else {
                    console.log('Error getting predictions:', status);
                }
            });
        },
        createWallet() {
            this.creating_wallet = true;
            this.$api.post('/customers/wallets', {
                customer_phone: this.customerPhone,
                wallet_pin: this.confirm.wallet_pin,
                business_id: this.business.id,
            }).then(resp=> {
                this.customer_wallet = resp.data.data.wallet;
                this.customer_id = resp.data.data.customer_id;
                this.step = 2

            }).finally(() => {
                this.creating_wallet = false
            })
        },

        filterInput(event) {
            //alert(event.target.value.length)
            if (event.target.value.length == 6) {
                if (event.keyCode === 8 || event.keyCode === 46) {
                    console.log('Backspace or Delete was pressed');
                    return
                    // Handle backspace/delete key here
                }
                else {
                    event.preventDefault();
                    return;

                }
            }
            const value = event.target.value;
            event.target.value = value.replace(/[^0-9]/g, '');
        
        },

        validateWalletPin() {
            this.validating_wallet = true; 
        
            this.$api.post('/customers/wallets/validate', {
                wallet_pin: this.confirm.wallet_pin,
                customer_phone: this.customerPhone,
                business_id: this.business.id,
            
            }).then(resp=> {
                this.customer_wallet = resp.data.data.wallet;
                this.customer_id = resp.data.data.customer_id;
                this.step = 3;


                /*if (!this.cartuid) {

                    this.current_step_name = this.purchase_link_step_order[this.step]
                }
                else {
                    this.current_step_name = this.normal_step_order[this.step]

                }*/

                if (resp.data.data.token) {
                    // authenticate customer
                    this.$cookies.set('usertoken', resp.data.data.token);
                    
                }
            }).catch(e=> {
                alert(e?.response?.data?.data)
            }).finally(()=>{
                this.validating_wallet =false;
            })
        },
        getCustomerWallet() {
            this.fetching_wallet = true
            this.$api.get('/customers/wallets/' + this.confirm.customer_phone.replace(/\s/g, '') + '?business_id=' + this.business.id).then(resp=> {
                this.customer_wallet = resp.data.data.wallet
                this.fetched_wallet = true
            }).catch(e=> {
                //alert(e)
            }).finally((e) =>{
                this.fetching_wallet = false
            })
        },
    }
}
</script>

<style lang="scss" scoped>
// Enhanced Cart Modal Styling
// Modern color palette
$primary: #FF6B6B;
$primary-dark: #FF5252;
$secondary: #4ECDC4;
$accent: #7A69F5;
$success: #45CB85;
$warning: #FFD166;
$danger: #F25F5C;
$text-dark: #2D3748;
$text-medium: #4A5568;
$text-light: #718096;
$border-color: #E2E8F0;
$background-white: #FFFFFF;
$background-light: #F7FAFC;
$background-lighter: #EDF2F7;
$shadow-soft: rgba(0, 0, 0, 0.05);
$shadow-medium: rgba(0, 0, 0, 0.08);
$shadow-hard: rgba(0, 0, 0, 0.12);


.form-input {
    @include greyforminput;
}

// Improved base styling
.cart-modal {
  &:deep(.modal-container) {
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    transform: translateY(0);
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    max-width: 95%;
    width: 520px;
    max-height: 90vh;
  }
  
  &:deep(.modal-header) {
    border-bottom: 1px solid $border-color;
    padding: 20px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    h3 {
      font-size: 20px;
      font-weight: 700;
      color: $text-dark;
      margin: 0;
      
      &::before {
        content: '';
        display: inline-block;
        width: 10px;
        height: 22px;
        background-color: $primary;
        border-radius: 2px;
        margin-right: 12px;
        vertical-align: middle;
      }
    }
    
    .close-button {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $background-lighter;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background-color: $border-color;
        transform: rotate(90deg);
      }
    }
  }
  
  &:deep(.modal-body) {
    padding: 0;
    overflow-y: auto;
    
    .cart-content {
      padding: 24px;
    }
  }
}

// Enhanced multi-step progress
.step-progress {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 32px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 10%;
    right: 10%;
    height: 2px;
    background-color: $border-color;
    transform: translateY(-50%);
    z-index: 0;
  }
  
  .step {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
    
    &-number {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: $background-lighter;
      color: $text-medium;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      margin-bottom: 8px;
      transition: all 0.3s ease;
      border: 2px solid $border-color;
    }
    
    &-label {
      font-size: 12px;
      color: $text-medium;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    
    &.active {
      .step-number {
        background-color: $primary;
        color: white;
        border-color: $primary;
        box-shadow: 0 0 0 5px rgba($primary, 0.2);
      }
      
      .step-label {
        color: $primary;
        font-weight: 600;
      }
    }
    
    &.completed {
      .step-number {
        background-color: $success;
        color: white;
        border-color: $success;
        
        &::after {
          content: '✓';
          font-size: 16px;
        }
      }
    }
  }
}

// Enhanced cart items
.cart-item {
  background-color: $background-light;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease;
  border-left: 4px solid $primary;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px $shadow-medium;
  }
  
  &-image {
    width: 70px;
    height: 70px;
    border-radius: 12px;
    object-fit: cover;
    background-color: $background-lighter;
  }
  
  &-details {
    flex: 1;
  }
  
  &-name {
    font-weight: 600;
    font-size: 16px;
    color: $text-dark;
    margin: 0 0 4px;
  }
  
  &-options {
    font-size: 13px;
    color: $text-medium;
    margin: 0 0 8px;
  }
  
  &-price {
    font-weight: 700;
    color: $primary;
    font-size: 15px;
  }
  
  &-controls {
    display: flex;
    align-items: center;
    gap: 12px;
    
    .quantity-control {
      display: flex;
      align-items: center;
      background-color: $background-white;
      border-radius: 50px;
      overflow: hidden;
      border: 1px solid $border-color;
      height: 36px;
      
      button {
        width: 36px;
        height: 36px;
        border: none;
        background: none;
        cursor: pointer;
        color: $text-medium;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        
        &:hover {
          background-color: $background-lighter;
          color: $primary;
        }
        
        &:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      }
      
      .quantity {
        width: 32px;
        text-align: center;
        font-weight: 600;
        color: $text-dark;
      }
    }
    
    .remove-button {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: none;
      background-color: rgba($danger, 0.1);
      color: $danger;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      
      &:hover {
        background-color: $danger;
        color: white;
      }
    }
  }
}

// Improved form inputs
.form-group {
  margin-bottom: 24px;
  
  label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: $text-dark;
    margin-bottom: 8px;
    
    .required {
      color: $danger;
      margin-left: 4px;
    }
  }
  
  input, select, textarea {
    width: 100%;
    padding: 16px;
    font-size: 15px;
    border: 1px solid $border-color;
    border-radius: 12px;
    background-color: $background-light;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: $primary;
      box-shadow: 0 0 0 4px rgba($primary, 0.1);
    }
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
  }
  
  &.has-icon {
    position: relative;
    
    input {
      padding-left: 48px;
    }
    
    .icon {
      position: absolute;
      top: 50%;
      left: 16px;
      transform: translateY(-50%);
      color: $text-light;
    }
  }
}

// Enhanced delivery options
.delivery-options {
  margin-bottom: 24px;
  
  .delivery-option {
    border: 2px solid $border-color;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 16px;
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: rgba($primary, 0.5);
    }
    
    &.active {
      border-color: $primary;
      background-color: rgba($primary, 0.05);
      
      .option-radio {
        border-color: $primary;
        
        &::after {
          transform: scale(1);
        }
      }
    }
    
    .option-header {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      
      .option-radio {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 2px solid $text-light;
        margin-right: 12px;
        position: relative;
        flex-shrink: 0;
        transition: all 0.3s ease;
        
        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0);
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: $primary;
          transition: transform 0.2s ease;
        }
      }
      
      .option-label {
        font-weight: 600;
        font-size: 16px;
        color: $text-dark;
        flex: 1;
      }
      
      .option-price {
        font-weight: 700;
        color: $primary;
        font-size: 16px;
      }
    }
    
    .option-description {
      padding-left: 34px;
      font-size: 14px;
      color: $text-medium;
      line-height: 1.5;
    }
    
    .discount-badge {
      position: absolute;
      top: -10px;
      right: 20px;
      background-color: $success;
      color: white;
      font-size: 12px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 50px;
      box-shadow: 0 4px 8px rgba($success, 0.25);
    }
  }
}

// Enhanced summary section
.order-summary {
  background-color: $background-light;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  
  .summary-header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    
    .icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: rgba($accent, 0.1);
      color: $accent;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16px;
    }
    
    h4 {
      font-size: 18px;
      font-weight: 700;
      color: $text-dark;
      margin: 0;
    }
  }
  
  .summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    
    .label {
      font-size: 14px;
      color: $text-medium;
    }
    
    .value {
      font-size: 14px;
      font-weight: 600;
      color: $text-dark;
    }
    
    &.discount {
      color: $success;
      .value {
        color: $success;
      }
    }
  }
  
  .summary-total {
    border-top: 1px dashed $border-color;
    margin-top: 16px;
    padding-top: 16px;
    display: flex;
    justify-content: space-between;
    
    .label {
      font-size: 18px;
      font-weight: 700;
      color: $text-dark;
    }
    
    .value {
      font-size: 22px;
      font-weight: 800;
      color: $primary;
    }
  }
}

// Enhanced action buttons
.action-buttons {
  display: flex;
  gap: 16px;
  margin-top: 32px;
  
  .btn {
    flex: 1;
    height: 56px;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
    
    &-primary {
      background-color: $primary;
      color: white;
      box-shadow: 0 8px 16px rgba($primary, 0.3);
      
      &:hover {
        background-color: $primary-dark;
        transform: translateY(-3px);
        box-shadow: 0 12px 20px rgba($primary, 0.4);
      }
      
      &:active {
        transform: translateY(0);
        box-shadow: 0 4px 8px rgba($primary, 0.25);
      }
      
      &:disabled {
        background-color: $text-light;
        transform: none;
        box-shadow: none;
        cursor: not-allowed;
      }
    }
    
    &-secondary {
      background-color: $background-white;
      color: $text-dark;
      border: 2px solid $border-color;
      
      &:hover {
        background-color: $background-lighter;
        border-color: $text-medium;
      }
      
      &:active {
        background-color: $border-color;
      }
    }
    
    &-icon {
      margin-right: 8px;
    }
  }
}

// Payment success animation
.payment-success {
  text-align: center;
  padding: 40px 24px;
  
  .success-icon {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: rgba($success, 0.1);
    margin: 0 auto 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pulse 2s infinite;
    
    svg {
      width: 60px;
      height: 60px;
      color: $success;
      animation: scale-in 0.5s ease-out;
    }
  }
  
  .success-title {
    font-size: 28px;
    font-weight: 800;
    color: $text-dark;
    margin-bottom: 16px;
    animation: fade-in 0.5s ease-out 0.2s both;
  }
  
  .success-message {
    font-size: 16px;
    color: $text-medium;
    line-height: 1.6;
    margin-bottom: 32px;
    animation: fade-in 0.5s ease-out 0.4s both;
  }
  
  .order-details {
    background-color: $background-light;
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 32px;
    animation: fade-in 0.5s ease-out 0.6s both;
    
    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid $border-color;
      
      &:last-child {
        border-bottom: none;
      }
      
      .label {
        font-size: 14px;
        color: $text-medium;
      }
      
      .value {
        font-size: 14px;
        font-weight: 600;
        color: $text-dark;
      }
    }
  }
  
  .success-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    animation: fade-in 0.5s ease-out 0.8s both;
  }
}

// Animations
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba($success, 0.4);
  }
  70% {
    box-shadow: 0 0 0 20px rgba($success, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba($success, 0);
  }
}

@keyframes scale-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

// Tab selector
.tab-selector {
  display: flex;
  background-color: $background-light;
  border-radius: 16px;
  padding: 6px;
  margin-bottom: 24px;
  
  .tab {
    flex: 1;
    padding: 14px 20px;
    border-radius: 12px;
    text-align: center;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: $text-medium;
    
    &.active {
      background-color: $primary;
      color: white;
      box-shadow: 0 4px 8px rgba($primary, 0.2);
    }
    
    &:hover:not(.active) {
      color: $text-dark;
      background-color: $background-lighter;
    }
  }
}

// Responsive adjustments
@media (max-width: 640px) {
  .cart-modal {
    &:deep(.modal-container) {
      max-width: 100%;
      width: 100%;
      border-radius: 20px 20px 0 0;
      max-height: 80vh;
      position: fixed;
      bottom: 0;
      top: auto;
    }
    
    &:deep(.modal-header) {
      padding: 16px 20px;
      
      h3 {
        font-size: 18px;
      }
    }
  }
  
  .action-buttons {
    flex-direction: column;
    
    .btn {
      width: 100%;
    }
  }
  
  .step-progress {
    .step-label {
      display: none;
    }
  }
  
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
    
    &-controls {
      width: 100%;
      justify-content: space-between;
      margin-top: 12px;
    }
  }
}
</style>