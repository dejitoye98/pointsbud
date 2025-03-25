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
                                    <option value="instantly">ASAP</option>
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
    props: ['business', 'mode'],
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
                delivery_time: "Instantly",
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

            await this.createCheckoutSession(payload)
            this.step = 7;

            const orders_ref = ref(this.db, `business_orders/${this.business.id}/${this.table_identifier}/orders`)
            let new_order_ref = push(orders_ref);

            await set(new_order_ref, {
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
            const orders = [];

            this.cart.forEach(async item => {
                let item_key = await this.generateUniqueCode(5)
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
                    question_answers: item.question_answers
                };
                orders.push(obj);

                
                
            });
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

               // if (!this.walletBalanceSufficient) {

                    //this.makePayment(id, url)
               // }
              
                //this.points_earned += obj.points_earned;


                /*let message = this.createOrderMessage(url)
                //alert(message)

                let encoded = encodeURIComponent(message)
                const link = `whatsapp://send?text=${encoded}&phone=9039884463`;
                window.open(link, '_self')*/

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
// Using your existing color variables
$primary: #E53945;
$deepprimary: #A02730;
$secondary: #f79939;
$secondarylight: #f798398b;
$secondaryaccent: #5ac091;
$lightaccent: $primary;
$darkaccent: #dd6b6b36;
$border-grey: #E0E0E0;
$faint: #686868;
$charcoal: #36454F;
$input_background: #F3F3F3;
$dashboard-background-color: rgb(255, 255, 255);

* {
  font-family: "Inter", sans-serif !important;
  box-sizing: border-box;

// Custom styles for third-party components
&:deep(.vue-tel-input) {
    border: none !important;
    background-color: $input_background;
    border-radius: 10px;
    height: 52px;
    
    .vti__input {
      background-color: transparent;
      height: 52px;
      font-size: 15px;
      border: none !important;
      
      &:focus {
        outline: none;
      }
    }
    
    .vti__dropdown {
      background-color: transparent;
      border-right: 1px solid rgba(104, 104, 104, 0.2);
      padding-right: 8px;
    }
    
    &:focus-within {
      border: 1px solid $primary !important;
      box-shadow: 0 0 0 3px rgba(229, 57, 69, 0.1);
    }
  }
  
  &:deep(.time-picker) {
    width: 100% !important;
    
    input {
      height: 52px !important;
      background-color: $input_background;
      border: 1px solid transparent;
      border-radius: 10px;
      width: 100%;
      font-size: 15px;
      padding: 0 16px;
      
      &:focus {
        border-color: $primary;
        outline: none;
        box-shadow: 0 0 0 3px rgba(229, 57, 69, 0.1);
      }
    }
  }
  
  &:deep(.cov-datepicker) {
    width: 100%;
  }
  
  &:deep(.cov-date-body) {
    background-color: $primary !important;
  }
  
  &:deep(.active) {
    background-color: $primary !important;
  }
}

// Global Styles
.padding-16 {
  padding: 16px;
}

.padding-16-y {
  padding: 16px 0;
}

.space-between {
  justify-content: space-between;
}

.flex-center-y {
  display: flex;
  align-items: center;
}

.flex {
  display: flex;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.gap-2 {
  gap: 8px;
}

.gap-16 {
  gap: 16px;
}

.grid {
  display: grid;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

.full-width {
  width: 100%;
}

.no-wrap {
  white-space: nowrap;
  text-overflow: ellipsis;
}

// Header styling
:deep(.modal-header) {
  padding: 20px;
  border-bottom: 1px solid $border-grey;
  
  p {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
    color: $charcoal;
  }

  svg {
    transition: transform 0.2s ease;

    &:hover {
      transform: rotate(90deg);
    }
  }
}

// Form input styling
.form-input {
  margin: 24px 0;
  
  label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: $charcoal;
    margin-bottom: 8px;
    letter-spacing: 0.3px;
  }

  .required {
    color: $primary;
  }

  input, select, textarea {
    width: 100%;
    height: 52px;
    padding: 0 16px;
    background-color: $input_background;
    border: 1px solid transparent;
    border-radius: 10px;
    font-size: 15px;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: $primary;
      box-shadow: 0 0 0 3px rgba(229, 57, 69, 0.1);
    }
  }

  textarea {
    padding: 16px;
    min-height: 100px;
    resize: vertical;
  }

  .number-input {
    letter-spacing: 1.5px;
    font-weight: 500;
  }
}

// Button styling
.big-btn {
  height: 52px;
  padding: 0 24px;
  border-radius: 10px;
  background-color: $primary;
  color: white !important;
  font-weight: 600;
  font-size: 15px;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
  box-shadow: 0 4px 12px rgba(229, 57, 69, 0.2);

  &:hover {
    background-color: $deepprimary;
    transform: translateY(-2px);
    box-shadow: 0 6px 14px rgba(229, 57, 69, 0.25);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    background-color: grey;
  }
}

// Tabs styling
.tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: $input_background;
  border-radius: 999px;
  padding: 4px;
  gap: 4px;
  margin-bottom: 16px;

  .tab {
    border-radius: 999px;
    padding: 12px;
    font-weight: 500;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 14px;
    background-color: $dashboard-background-color;
    color: $faint;

    &:hover {
      color: $charcoal;
    }
  }

  .selected-tab {
    background-color: $primary !important;
    color: white !important;
    box-shadow: 0 4px 8px rgba(229, 57, 69, 0.2);
  }
}

// Section titles
.section-title {
  background-color: $input_background;
  border-left: 3px solid $primary;
  padding: 14px 16px;
  font-weight: 600;
  font-size: 15px;
  margin: 24px 0 16px;
  border-radius: 0 8px 8px 0;
  color: $charcoal;
}

// Cart items styling
.cart-item {
  display: flex;
  padding: 16px;
  margin: 16px 0;
  border-radius: 12px;
  background-color: $input_background;
  position: relative;
  
  &__content {
    flex: 1;
  }
  
  &__name {
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 4px;
    color: $charcoal;
  }
  
  &__price {
    font-weight: 700;
    color: $primary;
    margin-top: 6px;
  }
  
  &__quantity {
    display: flex;
    align-items: center;
    margin-top: 10px;
    
    button {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: none;
      background-color: white;
      color: $charcoal;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
      
      &:hover {
        background-color: $primary;
        color: white;
      }
    }
    
    span {
      margin: 0 12px;
      font-weight: 500;
    }
  }
}

// Total section
.total {
  border-top: 1px solid $border-grey;
  padding: 20px 0;
  margin: 20px 0;

  &-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    font-size: 14px;
    color: $faint;
    
    &:last-child {
      margin-top: 12px;
      padding-top: 14px;
      border-top: 1px dashed $border-grey;
      
      b {
        font-size: 18px !important;
        color: $primary;
      }
    }
  }
}


// Loading state
.fetching-wallet {
  background-color: $input_background;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  color: $faint;
  padding: 12px 16px !important;
  margin-top: 16px;
  
  &::before {
    content: '';
    width: 16px;
    height: 16px;
    border: 2px solid rgba(104, 104, 104, 0.2);
    border-top-color: $primary;
    border-radius: 50%;
    margin-right: 12px;
    animation: spin 1s linear infinite;
  }

  p {
    margin: 0;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

// Responsive styles
@media (max-width: 640px) {
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
  
  .section-title {
    font-size: 14px;
    padding: 12px;
  }
  
  .big-btn {
    height: 48px;
    font-size: 14px;
  }
  
  .form-input label {
    font-size: 12px;
  }
}

// Fix for Google Places autocomplete dropdown
.pac-container {
  z-index: 100000000000000 !important;
}

// Delivery options styling
.delivery-options {
    margin: 24px 0;
    
    h4 {
        font-size: 15px;
        font-weight: 600;
        margin-bottom: 12px;
        color: $charcoal;
    }
}

.delivery-option {
    border: 1px solid $border-grey;
    border-radius: 10px;
    padding: 16px;
    margin-bottom: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        border-color: $primary;
    }
    
    &.active {
        border-color: $primary;
        background-color: rgba(229, 57, 69, 0.05);
    }
    
    .option-header {
        display: flex;
        align-items: center;
        //justify-content: space-between;
        margin-bottom: 8px;
        
        label {
            margin: 0 0 0 8px;
            font-weight: 600;
            cursor: pointer;
            font-size: 14px;
        }
        
        .price {
            font-weight: 700;
            color: $primary;
        }
    }
    
    .description {
        font-size: 13px;
        color: $faint;
        margin-left: 24px;
    }
    
    .discount-tag {
        background-color: #5ac091;
        color: white;
        border-radius: 4px;
        padding: 2px 6px;
        font-size: 11px;
        font-weight: 600;
        margin-left: 8px;
    }
}

.time-slots {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px dashed $border-grey;
    
    .slot-day {
        margin-bottom: 16px;
        
        h5 {
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 8px;
            color: $charcoal;
        }
    }
    
    .slot-times {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
    
    .slot-time {
        padding: 8px 12px;
        border-radius: 8px;
        background-color: $input_background;
        border: 1px solid transparent;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
        
        &:hover {
            border-color: $primary;
        }
        
        &.selected {
            background-color: $primary;
            color: white;
            border-color: $primary;
            font-weight: 600;
        }
    }
}

// Update summary section to show delivery option information
// Add this to your total section
.summary-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    font-size: 14px;
    
    .discount {
        color: #5ac091;
    }
}


.payment-success {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 24px 16px;
    
    .success-icon {
      background-color: rgba(90, 192, 145, 0.1);
      border-radius: 50%;
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
      animation: scale-in 0.5s ease forwards;
    }
    
    .success-title {
      font-size: 24px;
      font-weight: 700;
      color: #5ac091;
      margin-bottom: 16px;
      animation: fade-in 0.5s ease 0.3s both;
    }
    
    .success-message {
      font-size: 15px;
      color: $faint;
      margin-bottom: 32px;
      max-width: 340px;
      line-height: 1.5;
      animation: fade-in 0.5s ease 0.4s both;
    }
    
    .order-details {
      background-color: $input_background;
      border-radius: 12px;
      padding: 16px;
      width: 100%;
      margin-bottom: 32px;
      animation: fade-in 0.5s ease 0.5s both;
      
      .order-number, .order-time {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        
        span {
          color: $faint;
          font-size: 14px;
        }
        
        strong {
          font-weight: 600;
          color: $charcoal;
        }
      }
      
      .order-number {
        border-bottom: 1px dashed $border-grey;
        padding-bottom: 12px;
        margin-bottom: 4px;
      }
    }
    
    .success-actions {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
      animation: fade-in 0.5s ease 0.6s both;
      
      .big-btn.outline {
        background-color: transparent;
        color: $primary !important;
        border: 1px solid $primary;
        
        &:hover {
          background-color: rgba(229, 57, 69, 0.05);
        }
      }
    }
  }
  
  @keyframes scale-in {
    0% {
      transform: scale(0.5);
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
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>