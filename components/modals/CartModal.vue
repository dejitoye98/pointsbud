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

                  <div v-if="existing_cart?.length" style="margin-bottom: 20px">
                      <div class="tag tag--red" v-if="existing_cart?.length">Old</div>

                      <CartItem v-for="(item, index) in existing_cart" :editable="false" :item="item" :styling="styling"></CartItem>
                  </div>

                  <div>
                      <div class="tag" v-if="existing_cart?.length">New</div>
                      <CartItem v-for="(item, index) in cart" :item="item" :styling="styling"></CartItem>
                  </div>

                  <button class="big-btn full-width" @click="step++" v-if="business.qr_ordering_mode === 'order-and-pay' ">
                      Continue With Items
                  </button>

                  <button class="big-btn full-width" :disabled="creating_session" v-else-if="business.qr_ordering_mode === 'order-only'" @click="resolvePlaceOrderWithAttendant">
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

                        <button class="big-btn full-width payment-button" 
                          :disabled="creating_session" 
                          @click="triggerPay"
                          :class="{'loading': creating_session}"
                          >
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

              <template v-else-if="step === 6"> 
                  <p class="please">Please enter your first name</p>
                  <div class="form-input">
                      <label for="">First Name <span class="required">*</span> </label>
                      <input v-model="payload.customer_name">
                  </div>
                 

                  <button class="btn big-btn full-width" :disabled="!payload.customer_name || creating_session" @click="placeUnpaidOrder">Place Order</button>
              </template>


              <template v-else-if="step === 7">
                  <div class="order-success-container">
                    <!-- Success Illustration -->
                    <div class="success-illustration">
                      <svg width="120" height="120" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="128" cy="128" r="120" fill="#F0FFF4" />
                        <path d="M128 36C76.7878 36 36 76.7878 36 128C36 179.212 76.7878 220 128 220C179.212 220 220 179.212 220 128C220 76.7878 179.212 36 128 36Z" fill="#48BB78" fill-opacity="0.2" />
                        <path d="M176 100L112 164L80 132" stroke="#48BB78" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                    
                    <h2 class="success-title">Order Placed Successfully!</h2>
                    <p class="success-message">Your order has been received and is being processed. An attendant will assist you shortly.</p>
                    
                    <!-- WhatsApp Track Order Button - Fixed version -->
                    <a :href="'https://wa.me/2348097000001?text=Track%20my%20order%20%23' + checkout_url" class="whatsapp-track-btn">
                      <div class="whatsapp-icon">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                          <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                          <path fill="currentColor" d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.627-5.372-12-12-12zm.029 18.88a6.736 6.736 0 0 1-3.831-1.184l-4.128 1.08 1.11-4.05a6.789 6.789 0 0 1-1.3-3.979C3.88 6.942 7.591 3.2 12.03 3.2c2.109 0 4.09.818 5.58 2.3a7.802 7.802 0 0 1 2.308 5.578c-.001 4.365-3.531 7.801-7.889 7.801z"/>
                        </svg>
                      </div>
                      <div class="track-text-container">
                        <span class="track-text">TRACK ORDER LIVE</span>
                        <span class="on-whatsapp">on WhatsApp</span>
                      </div>
                      <div class="instant-badge">
                        <span class="instant-text">INSTANT UPDATES</span>
                      </div>
                    </a>
                    
                    <!-- Incentive message -->
                    <div class="incentive-message">
                      <div class="incentive-icon">🎁</div>
                      <p>Unlock a mystery box when you track your order on WhatsApp</p>
                    </div>
                    
                    <!-- Action buttons -->
                    <div class="success-actions">
                      <button class="big-btn full-width outline" @click="$emit('close')">
                        Close
                      </button>
                    </div>
                  </div>
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
    props: ['business', 'mode', 'last_checkout_session_id', 'styling', 'existing_order'],
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
        ...mapGetters('shop', ['cart', 'existing_cart']),
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
        setButtonLoading(buttonSelector, isLoading, loadingText = null) {
          const button = document.querySelector(buttonSelector);
          if (!button) return;
          
          if (isLoading) {
            button.disabled = true;
            button.classList.add('loading');
            
            if (loadingText) {
              button.setAttribute('data-original-text', button.textContent);
              button.textContent = loadingText;
            }
          } else {
            button.disabled = false;
            button.classList.remove('loading');
            
            if (button.hasAttribute('data-original-text')) {
              button.textContent = button.getAttribute('data-original-text');
              button.removeAttribute('data-original-text');
            }
          }
        },
        resolvePlaceOrderWithAttendant() {
            if (this.existing_order) {
                // no need to go to the part that asks for number

                this.placeUnpaidOrder()
            }
            else {
                this.step = 6;
            }
        },
        trackOrder() {
            // this should take you to whatsapp
        },
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
            let r_uid =  this.generateUniqueCode(7);
            let id, url = null;


            this.setButtonLoading('.order-button', true, 'Placing Order...');


            this.cart.forEach(async item => {
                let item_key = this.generateUniqueCode(5);
                
                const obj = {
                    name: item.name,
                    product_id: item.id,
                    unitprice: item.unitprice,
                    item_key,
                    item_uid: item_key,
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
                    space: this.table_identifier || this.mode  || 'delivery', 

                // vat: parseFloat(this.vat || 0),
                    //appFee: this.appFee,
                    // checkout_session: ref,
                    customer_phone: this.payload.customer_phone || '-',
                    customer_name: this.payload.customer_name || "",
                    send_alert: true,
                    send_customer_alert: true,
                    r_uid
                    
                }

            if (!this.last_checkout_session_id && !this.existing_order) {

               

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


                // update the checkoutsession
                this.updateCheckoutSession().then(resp=> {
                    
                    
                                    let order_ref = ref(this.db, `business_orders/${this.business.id}/${this.existing_order?.space || this.table_identifier}/orders/${this.last_checkout_session_id}`)
                                    let added_ref = push(order_ref);
                                    
                    
                                    update(added_ref, ...orders)
                                    this.step = 7
                })
                
                //
                // add to

                // ref


                // update checkout session
                
                //alert("YOU're ABOUT TO CREATE SOME SHIT")
                return
            }
            

          
            

           
            this.step = 7;

            const orders_ref = ref(this.db, `business_orders/${this.business.id}/${this.table_identifier}/orders/${url}`)

            await set(orders_ref, {
                r_uid,
                status: 'pending',
                space: this.table_identifier || 'dinein',
                timestamp: serverTimestamp(),
                customer_name: this.payload.customer_name || '',
                customer_phone: this.payload.customer_phone || '-',
                taxes: this.totalTaxes || 0,
                ...orders,
                seen: false,
                read: false
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
        
        async updateCheckoutSession() {
            let vm = this;
           return await this.$api.put(`/checkout-session/${this.last_checkout_session_id}`, {
                r_uid: this.existing_order?.r_uid,
                new_items: this.cart,
                space: vm.existing_order?.space || ''
            })
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
                this.setButtonLoading('.payment-button', true, 'Processing Payment...');

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
                    r_uid: this.generateUniqueCode(7),
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
            }finally {
              this.setButtonLoading('.payment-button', false);

            }

               

        },
        async createCheckoutSession(payload) {
            this.creating_session = true

            if (this.business?.id) {
              this.setButtonLoading('.order-button', false);

                return await this.$api.post('/checkout-session/create/menu', payload).then(resp => {
                    const code = resp.data.data.url;
                    this.checkout_url = code;


                    const url = new URL(window.location.href);
                    url.searchParams.set('csess', code);

                    window.history.pushState(null, null, url.toString());

                    return resp.data.data;
                    

                }).finally(()=> {
                    this.creating_session = false
                    this.setButtonLoading('.checkout-button', false);

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

<style lang="scss" scoped>/* Modern color palette */
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



.tag {
    @include done-btn;

    padding: 2px 8px;
    text-align: center;
    font-size: 12px;
    border-radius: 10px;
    width: fit-content;


    &--red {
        @include reject-btn;
    }
}

/* Base Mixins */
@mixin greyforminput {
  margin-bottom: 18px;
  
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
  
  input, select, textarea, .vue-tel-input {
    width: 100%;
    padding: 14px 16px;
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
  
  .number-input {
    letter-spacing: 2px;
    font-size: 16px;
    
    &::placeholder {
      color: $text-light;
    }
  }
}

/* Layout Utilities */
.flex {
  display: flex;
}

.flex-center-y {
  align-items: center;
}

.space-between {
  justify-content: space-between;
}

.flex-col {
  flex-direction: column;
}

.padding-16 {
  padding: 16px;
}

.padding-16-y {
  padding-top: 16px;
  padding-bottom: 16px;
}

.gap-16 {
  gap: 16px;
}

.gap-2 {
  gap: 8px;
}

.grid {
  display: grid;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

.no-wrap {
  white-space: nowrap;
}

.full-width {
  width: 100%;
}

/* Button Styles */
.btn, .big-btn {
  height: 50px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  padding: 0 24px;
  background-color: $primary;
  color: white;
  border: 2px solid transparent;
  box-shadow: 0 4px 10px rgba($primary, 0.3);
  width: 100%;
  margin: 0;
  position: relative;
  overflow: hidden;
  
  &:hover:not(:disabled) {
    background-color: $primary-dark;
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba($primary, 0.4);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 5px rgba($primary, 0.25);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: #B0B0B0 !important; /* Gray background for disabled state */
    transform: none;
    box-shadow: none;
    color: #E0E0E0; /* Light text for disabled state */
    border: 2px solid #DADADA; /* Light border for disabled state */
  }

  /* Loading indicator for disabled buttons */
  &:disabled::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    right: 16px;
    border-radius: 50%;
    border: 2px solid #E0E0E0;
    border-top-color: #FFFFFF;
    animation: spin 1s linear infinite;
  }
  
  &.outline {
    background-color: transparent;
    border-color: $primary;
    color: $primary;
    box-shadow: none;
    
    &:hover:not(:disabled) {
      background-color: rgba($primary, 0.1);
      box-shadow: none;
    }
    
    &:disabled {
      border-color: #DADADA;
      color: #B0B0B0;
    }
  }
}

/* Loading spinner animation */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Adding a loading class for buttons that are processing */
.btn.loading, .big-btn.loading {
  position: relative;
  padding-right: 44px; /* Make room for the spinner */
  
  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    right: 16px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: #FFFFFF;
    animation: spin 1s linear infinite;
  }
}

/* Additional styling for big buttons */
.big-btn {
  height: 56px;
  font-size: 16px;
  font-weight: 700;
  
  &[style*="background-color: white"] {
    background-color: $background-white;
    color: $text-dark;
    border: 2px solid $border-color;
    box-shadow: none;
    
    &:hover:not(:disabled) {
      background-color: $background-lighter;
      border-color: $text-medium;
      box-shadow: none;
    }
    
    &:disabled {
      background-color: #F5F5F5 !important;
      color: #B0B0B0;
      border-color: #DADADA;
    }
  }
}

/* For buttons with text transformation during loading state */
.btn.text-loading, .big-btn.text-loading {
  &::before {
    content: 'Processing...';
    position: absolute;
    left: 0;
    right: 0;
  }
  
  span {
    opacity: 0;
  }
}
/* Cart Components */
.total {
  background-color: $background-light;
  border-radius: 16px;
  padding: 20px;
  margin: 24px 0;
  
  .total-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: 15px;
    
    &:last-child {
      margin-bottom: 0;
      padding-top: 12px;
      border-top: 1px dashed $border-color;
    }
    
    p {
      margin: 0;
      color: $text-medium;
    }
    
    b {
      color: $text-dark;
      font-weight: 700;
    }
  }
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: $text-dark;
  margin: 24px 0 16px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 3px;
    background-color: $primary;
    border-radius: 2px;
  }
}

/* Tab Styling */
.tabs {
  display: flex;
  background-color: $background-light;
  border-radius: 12px;
  padding: 5px;
  margin-bottom: 20px;
  
  .tab {
    flex: 1;
    padding: 12px 16px;
    text-align: center;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.3s ease;
    color: $text-medium;
    
    &.selected-tab {
      background-color: $primary;
      color: white;
      box-shadow: 0 4px 8px rgba($primary, 0.2);
    }
    
    &:not(.selected-tab):hover {
      background-color: $background-lighter;
      color: $text-dark;
    }
  }
}

/* Delivery Options */
.delivery-options {
  margin: 24px 0;
  
  h4 {
    font-size: 17px;
    font-weight: 600;
    color: $text-dark;
    margin-bottom: 16px;
  }
  
  .delivery-option {
    border: 2px solid $border-color;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: rgba($primary, 0.5);
    }
    
    .option-header {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      
      input[type="radio"] {
        margin-right: 10px;
        width: 18px;
        height: 18px;
        accent-color: $primary;
        cursor: pointer;
      }
      
      label {
        flex: 1;
        font-weight: 600;
        font-size: 15px;
        color: $text-dark;
        margin: 0;
        cursor: pointer;
      }
      
      .price {
        font-weight: 700;
        color: $primary;
      }
      
      .discount-tag {
        font-size: 12px;
        font-weight: 600;
        background-color: rgba($success, 0.2);
        color: $success;
        padding: 3px 8px;
        border-radius: 50px;
        margin-left: 8px;
      }
    }
    
    .description {
      font-size: 14px;
      color: $text-medium;
      margin: 0 0 0 28px;
    }
  }
  
  .premium {
    &:has(input:checked) {
      border-color: $primary;
      background-color: rgba($primary, 0.05);
    }
  }
  
  .scheduled {
    &:has(input:checked) {
      border-color: $secondary;
      background-color: rgba($secondary, 0.05);
    }
    
    .time-slots {
      margin-top: 16px;
      padding-left: 28px;
      
      .slot-day {
        margin-bottom: 12px;
        
        h5 {
          font-size: 14px;
          font-weight: 700;
          color: $text-dark;
          margin: 0 0 8px;
        }
        
        .slot-times {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          
          .slot-time {
            padding: 8px 12px;
            background-color: $background-white;
            border: 1px solid $border-color;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 500;
            color: $text-dark;
            cursor: pointer;
            transition: all 0.2s ease;
            
            &:hover {
              border-color: $secondary;
              background-color: rgba($secondary, 0.05);
            }
            
            &.selected {
              background-color: $secondary;
              color: white;
              border-color: $secondary;
            }
          }
        }
      }
    }
  }
}

/* Payment Success */
.payment-success {
  text-align: center;
  padding: 30px 20px;
  
  .success-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: rgba($success, 0.1);
    margin: 0 auto 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pulse 2s infinite;
    
    svg {
      width: 64px;
      height: 64px;
      color: $success;
    }
  }
  
  .success-title {
    font-size: 24px;
    font-weight: 700;
    color: $text-dark;
    margin-bottom: 12px;
  }
  
  .success-message {
    font-size: 15px;
    color: $text-medium;
    line-height: 1.5;
    margin-bottom: 24px;
  }
  
  .order-details {
    background-color: $background-light;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 24px;
    
    .order-number, .order-time {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      
      span {
        color: $text-medium;
        font-size: 14px;
      }
      
      strong {
        color: $text-dark;
        font-weight: 600;
      }
    }
    
    .order-number {
      border-bottom: 1px solid $border-color;
      padding-bottom: 12px;
      margin-bottom: 12px;
    }
  }
  
  .success-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    
    .outline {
      margin-top: 8px;
    }
  }
}

/* Fetching wallet state */
.fetching-wallet {
  background-color: $background-lighter;
  border-radius: 8px;
  font-style: italic;
  
  p {
    margin: 0;
    opacity: 0.8;
    animation: pulse-text 1.5s infinite;
  }
}

/* Animations */
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

@keyframes pulse-text {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

/* CartItem Component Styling */
.CartItem {
  background-color: $background-light;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  border-left: 3px solid $primary;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px $shadow-medium;
  }
  
  .item-image {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    object-fit: cover;
    background-color: $background-lighter;
  }
  
  .item-details {
    flex: 1;
    
    .item-name {
      font-weight: 600;
      font-size: 16px;
      color: $text-dark;
      margin: 0 0 4px;
    }
    
    .item-price {
      font-weight: 700;
      color: $primary;
    }
    
    .item-quantity {
      font-size: 14px;
      color: $text-medium;
    }
  }
  
  .item-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}

/* Vue Time Picker Custom Styling */
.vue-timepicker {
  width: 100%;
  
  input {
    width: 100%;
    padding: 14px 16px;
    font-size: 15px;
    border: 1px solid $border-color;
    border-radius: 12px;
    background-color: $background-light;
  }
  
  .dropdown ul li:not([disabled]).active, 
  .dropdown ul li:not([disabled]).active:hover {
    background: $primary !important;
    color: white !important;
  }
  
  .dropdown ul li:not([disabled]):hover {
    background: rgba($primary, 0.1) !important;
  }
}

/* Vue Tel Input Custom Styling */
.vue-tel-input {
  border-radius: 12px !important;
  border-color: $border-color !important;
  
  &:focus-within {
    box-shadow: 0 0 0 4px rgba($primary, 0.1) !important;
    border-color: $primary !important;
  }
  
  .vti__dropdown {
    border-radius: 12px 0 0 12px !important;
    
    &:hover {
      background-color: $background-lighter !important;
    }
  }
  
  input {
    background-color: transparent !important;
    color: $text-dark !important;
    
    &::placeholder {
      color: $text-light !important;
    }
  }
}

/* DatePicker Custom Styling */
.datepicker {
  width: 100%;
  margin-bottom: 16px;
  
  .datepicker-trigger {
    width: 100%;
    
    input {
      width: 100%;
      padding: 14px 16px;
      font-size: 15px;
      border: 1px solid $border-color;
      border-radius: 12px;
      background-color: $background-light;
    }
  }
  
  .datepicker-container {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 15px 30px $shadow-medium;
    
    header {
      background-color: $primary !important;
      
      span {
        color: white !important;
      }
    }
    
    .datepicker-body {
      thead {
        tr {
          th {
            color: $text-medium !important;
          }
        }
      }
      
      tbody {
        tr {
          td {
            &.selected {
              background-color: $primary !important;
              
              span {
                color: white !important;
              }
            }
            
            &:hover:not(.disabled):not(.selected) {
              background-color: rgba($primary, 0.1) !important;
            }
          }
        }
      }
    }
  }
}

/* Responsive Adjustments */
@media (max-width: 640px) {
  .grid-cols-2 {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  
  .tabs .tab {
    padding: 10px;
    font-size: 14px;
  }
  
  .big-btn {
    height: 50px;
  }
  
  .delivery-options .delivery-option {
    padding: 12px;
    
    .option-header {
      flex-wrap: wrap;
      
      .price {
        width: 100%;
        margin-left: 28px;
        margin-top: 4px;
      }
    }
  }
  
  .total .total-item {
    font-size: 14px;
  }
  
  .section-title {
    font-size: 16px;
  }
  
  .payment-success {
    padding: 20px 16px;
    
    .success-title {
      font-size: 20px;
    }
    
    .success-message {
      font-size: 14px;
    }
  }
}

.form-input {
    @include greyforminput;
}

.order-success-container {
    padding: 32px 24px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FFFFFF;
    position: relative;
    overflow: hidden;
  }
  
  .success-illustration {
    margin-bottom: 16px;
    animation: bounceIn 0.8s ease;
  }
  
  .robot-avatar {
    position: absolute;
    top: 20px;
    right: 20px;
    animation: floatAnimation 3s ease-in-out infinite;
  }
  
  .success-title {
    font-size: 24px;
    font-weight: 700;
    color: #2D3748;
    margin-bottom: 12px;
    animation: fadeInUp 0.6s ease 0.2s both;
  }
  
  .success-message {
    font-size: 16px;
    color: #4A5568;
    margin-bottom: 24px;
    max-width: 400px;
    line-height: 1.5;
    animation: fadeInUp 0.6s ease 0.4s both;
  }
  
  .order-details {
    background-color: #F7FAFC;
    border-radius: 12px;
    padding: 16px 24px;
    margin-bottom: 32px;
    width: 100%;
    max-width: 320px;
    animation: fadeInUp 0.6s ease 0.6s both;
    
    .order-info {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      
      &:not(:last-child) {
        border-bottom: 1px dashed #E2E8F0;
      }
      
      .info-label {
        font-weight: 600;
        color: #4A5568;
      }
      
      .info-value {
        color: #2D3748;
        font-weight: 500;
      }
    }
  }
  
  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    max-width: 320px;
    animation: fadeInUp 0.6s ease 0.8s both;
  }
  
  .track-order-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background-color: $deepprimary;
    color: white;
    padding: 14px 20px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 16px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(66, 153, 225, 0.3);
    
    &:hover {
      background-color: $primary;
      transform: translateY(-2px);
      box-shadow: 0 6px 10px rgba(172, 6, 0, 0.4);
    }
    
    &:active {
      transform: translateY(0);
    }
    
    svg {
      animation: pulse 2s infinite;
    }
  }
  
  .close-button {
    background-color: #F7FAFC;
    color: #4A5568;
    padding: 14px 20px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 16px;
    border: 1px solid #E2E8F0;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 20px !important;
    
    &:hover {
      background-color: #EDF2F7;
    }
  }
  
  .delivery-animation {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    overflow: hidden;
    
    .road {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 20px;
      background-color: #CBD5E0;
      
      .divider {
        position: absolute;
        top: 8px;
        width: 100%;
        height: 4px;
        background: repeating-linear-gradient(
          to right,
          #FFFFFF,
          #FFFFFF 10px,
          transparent 10px,
          transparent 20px
        );
        animation: moveRoad 10s linear infinite;
      }
    }
    
    .delivery-vehicle {
      position: absolute;
      bottom: 20px;
      left: -32px;
      animation: moveVehicle 15s linear infinite;
      
      svg {
        color: #4A5568;
      }
    }
  }
  
  /* Animations */
  @keyframes bounceIn {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1.2);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  
  @keyframes floatAnimation {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  @keyframes moveRoad {
    from {
      background-position: 0 0;
    }
    to {
      background-position: -200px 0;
    }
  }
  
  @keyframes moveVehicle {
    from {
      left: -32px;
    }
    to {
      left: calc(100% + 32px);
    }
  }
  
  /* Responsive adjustments */
  @media (max-width: 480px) {
    .order-success-container {
      padding: 24px 16px 40px;
    }
    
    .robot-avatar {
      width: 60px;
      height: 60px;
      top: 15px;
      right: 15px;
    }
    
    .success-title {
      font-size: 20px;
    }
    
    .success-message {
      font-size: 14px;
    }
  }

  .whatsapp-track-container {
    max-width: 400px;
    margin: 20px auto;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  /* Button styling */
  .whatsapp-track-btn {
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
    color: white;
    text-decoration: none;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(37, 211, 102, 0.4), 0 0 0 4px rgba(37, 211, 102, 0.1);
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    z-index: 1;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }
  
  .whatsapp-track-btn:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 28px rgba(37, 211, 102, 0.6), 0 0 0 6px rgba(37, 211, 102, 0.2);
  }
  
  .whatsapp-track-btn:active {
    transform: translateY(0);
  }
  
  /* WhatsApp icon styling */
  .whatsapp-icon {
    background: rgba(255, 255, 255, 0.2);
    padding: 8px;
    border-radius: 50%;
    margin-right: 16px;
    flex-shrink: 0;
  }
  
  /* Button text styling */
  .track-text {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.5px;
    flex-grow: 1;
  }
  
  .on-whatsapp {
    font-size: 14px;
    opacity: 0.9;
    margin-left: 5px;
  }
  
  /* Instant updates badge */
  .instant-badge {
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: #FF3B30;
    color: white;
    font-size: 10px;
    font-weight: bold;
    padding: 4px 8px;
    border-radius: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transform: rotate(5deg);
    z-index: 2;
  }
  
  /* Pulsating animation */
  .pulse-wrapper {
    position: relative;
  }
  
  .pulse-wrapper::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(37, 211, 102, 0.5);
    border-radius: 12px;
    z-index: -1;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.7;
    }
    70% {
      transform: scale(1.05);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
  
  /* Incentive message styling */
  .incentive-message {
    display: flex;
    align-items: center;
    background-color: #FFF9E6;
    border-left: 4px solid #FFD700;
    padding: 10px 15px;
    margin-top: 15px;
    border-radius: 8px;
    font-size: 14px;
    color: #333;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .incentive-icon {
    font-size: 20px;
    margin-right: 10px;
  }
  
  .incentive-message p {
    margin: 0;
  }
  
  .incentive-message strong {
    color: #FF3B30;
  }
  
  /* Adding a subtle animated highlight effect */
  .whatsapp-track-btn::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
    transform: rotate(30deg);
    animation: shine 4s infinite;
    z-index: -1;
  }
  
  @keyframes shine {
    0% { left: -100%; opacity: 0; }
    10% { opacity: 0.5; }
    20% { left: 100%; opacity: 0; }
    100% { left: 100%; opacity: 0; }
  }


  .please {
    font-family: "Inter", sans-serif !important;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 30px;
  }
</style>