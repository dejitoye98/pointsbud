<template>
    <BaseModal @close="$emit('close')">
        <template #header>
            <div class="padding-16">
                <p>Cart</p>
            </div>
        </template>


        <template #body>
            <div class="padding-16">

                <template v-if="step === 1">
                    <div>
                        <p>Money will be stored in your PointsBud Wallet until your items are delivered</p>
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

                       
                        <div style="display: flex; justify-content: center;">
                            <button  class="big-btn" style="margin: auto !important" :disabled="!enableNextStep2 || fetching_wallet || validating_wallet || creating_wallet" @click="nextStep">Proceed</button>
                        </div>

                    </div>
                    
                </template>


                <template v-else-if="step === 2">
                    <CartItem v-for="(item, index) in cart" :item="item"></CartItem>

                    <button class="big-btn full-width" @click="step++">
                        Continue
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
                                <label for="">Delivery Area</label>
                                <select v-model="delivery_meta.destination_region">
                                    <option :value="region.place" v-for="(region, index) in deliveryRegions" :key="index"> {{region.place}} - {{region.currency | currencySymbol}}{{region.price | money}}</option>
                                </select>
                            </div>
                            <div class="form-input">
                                <label>Your Delivery Address </label>
                                <input id="address" v-model="delivery_meta.destination_address">
                            </div>

                            <div class="form-input">
                                <label> Delivery Note </label>
                                <textarea v-model="delivery_meta.note"></textarea>
                            </div>


                            <div class=" gap-16 grid grid-cols-2">

                                <button  @click="step--" style="background-color: white; color: black" class="big-btn full-width">
                                    Back
                                </button>
                                <button class="big-btn full-width" @click="nextStep">
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

                            


                            <div class=" gap-16 grid grid-cols-2">

                                <button  @click="step--" style="background-color: white; color: black" class="big-btn full-width">
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
                        <div class="flex space-between gap-2" style="margin: 16px 0;" v-for="(item, index) in cart" :key="index">
                            <div>
                                {{ item.name }} x  {{ item.quantity }}
                            </div>

                            <div class="no-wrap">
                              {{ "NGN" | currencySymbol }}  {{ getItemTotal(item) }}
                            </div>
                        </div>
                        <div class="section-title">Delivery Detail</div>

                        <template v-if="delivery_type === 'delivery'">

                            <div class="padding-16-y">
                                <div>
                                    Delivery Region
                                </div>
    
                                <div>
                                    {{ delivery_meta.destination_region }}
                                </div>
                            </div>

                            <div  class="padding-16-y">
                                <div>
                                    Delivery Address
                                </div>
    
                                <div>
                                    {{ delivery_meta.destination_address }}
                                </div>
                            </div>
                            <div  class="flex gap-16 space-between">
                                <div>
                                    Delivery Fee
                                </div>
    
                                <div v-if="deliveryFee.price">
                                   {{ "NGN" | currencySymbol }} {{ deliveryFee.price | money }}
                                </div>
                                <div v-else-if="deliveryFee.currency"></div>
                            </div>
                        </template>
                        <template v-else>
                            <div class="padding-16-y form-input">
                                <div>
                                    Pickup Date
                                </div>
    
                                <div>
                                    <p>

                                        {{ delivery_meta.pickup_date}}
                                    </p>
                                </div>
                            </div>
                            <div class="form-input">
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
                                <p>{{deliveryFee.currency | currencySymbol}} {{deliveryFee.price | money}}</p>
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

                            <button  @click="step--" style="background-color: white; color: black" class="big-btn full-width">
                                Back
                            </button>
                            <button class="big-btn full-width" @click="triggerPay">
                                Pay
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

import moment from 'moment'
export default {
    components: {
        VueTimepicker,
        'date-picker': myDatepicker,
    },
    props: ['business'],
    data() {
        return {

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
    mounted() {
        if (this.customer_wallet && Object.keys(this.customer_wallet).length > 1) {
            this.step = 2;
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
             alert(value)
        },

    },
    computed: {
        ...mapGetters('shop', ['cart']),
        datePickerValue() {
            return this.date_picker_date.time;
        },

        grandTotal() {
            return parseFloat(this.cartTotal) +
             parseFloat(this.deliveryFee.price || 0) + 
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
                }
                else {
                  resolved_app_fee = parseFloat((resolved_fee.value/100) * this.cartTotal);
                }

                if ((this.cartTotal + resolved_app_fee + paystack_pricing + this.deliveryFee.price + this.totalTaxes) > 2500) {
                    return resolved_app_fee + paystack_pricing + 100;
                }
                else {
                    return (resolved_app_fee + paystack_pricing)
                }
                return 0
            }catch(e) {
                alert(e)
                return parseFloat((5/100) * this.cartTotal)
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
                const obj = {
                    name: item.name,
                    product_id: item.id,
                    unitprice: item.unitprice,
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
                token: this.$cookies.get("loyal-token"),
                r_uid: Date.now(),
                delivery_type: this.delivery_type,
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
                this.paywithPaystack(id, url)

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
            if (this.step === 1) {
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
                    if (!this.delivery_meta.destination_region) return false;
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
                this.step = 2;


                /*if (!this.cartuid) {

                    this.current_step_name = this.purchase_link_step_order[this.step]
                }
                else {
                    this.current_step_name = this.normal_step_order[this.step]

                }*/

                if (resp.data.data.token) {
                    // authenticate customer
                    this.$cookies.set('loyal-token', resp.data.data.token);
                    
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
* {
    font-family: "Inter", sans-serif !important;

  

    &:deep(.vue-tel-input:focus-within) {
        border: 0; box-shadow: none;
    }

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
    &:deep(.vue-tel-input:focus-within) {
        border: 0; box-shadow: none;
    }

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
    &:deep(.vti__input) {
        border: none !important;
    }
}


.section-title {
    background-color: lightgrey;
    padding: 16px;
    text-align: center;
    font-weight: 600;
}


.total {
    border-top: 1px solid whitesmoke;
    padding: 16px 0;
    margin: 16px 0;

    &-item {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
    }
}

.tabs  {
    display: grid;
    grid-template-columns: 45% 45%;
    background-color: whitesmoke;
    border-radius: 999px;
    justify-content: center;
    padding: 16px;
    gap: 8px;

    .tab {
        background-color: white;
        border-radius: 999px;
        padding: 8px 16px;

        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.no-wrap {
    white-space: nowrap;
    text-overflow: ellipsis;
}
.form-input {
    @include greyforminput;
    margin: 20px 0;
    label {
        font-size: 12px;
        font-weight: 800;
    }
}


.selected-tab {
    background-color: #DD6B6B !important;
    color: white !important;
}
</style>