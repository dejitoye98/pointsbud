<template>
    <BaseModal v-if="item" @close="$emit('close')" class="gourmet-modal">
      <template #header>
        <template v-if="step == 1">
          <div class="modal-header">
            <div class="food-image-container">
              <img :src="_product.thumbnail" alt="Food item" class="food-image">
              
              <!-- Image Gallery Dots -->
              <div class="image-gallery-dots" v-if="hasMultipleImages">
                <div class="dot active"></div>
                <div class="dot"></div>
                <div class="dot"></div>
              </div>
              
              <!-- Back button -->
              <button @click="$emit('close')" class="back-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              
              <!-- Badge for bestseller/special -->
              <div class="item-badge" v-if="item.is_deal || item.is_popular">
                {{ _product.is_deal || _product.deal_id ? 'Special Offer' : 'Bestseller' }}
              </div>
            </div>
          </div>
        </template>
        <template v-else-if="step === 2">
            <div class="modal-header">
                <p>Delivery Details</p>
            </div>
        </template>
        <template v-else-if="step === 3">
            <div class="modal-header">
                <p>Confirm Your Wallet</p>
            </div>
        </template>
      </template>
      
      <template #body>
        <template v-if="step === 1">
          <div class="modal-body">
            <!-- Item details header -->
            <div class="item-details">
              <div class="item-details-header">
                <h2 class="item-name">{{ _product.name }}</h2>
                <p class="item-price">{{ _product.currency | currencySymbol }} {{ formatMoney(_product.unitprice) }}</p>
              </div>
              
              <div class="item-rating" v-if="item.rating">
                <div class="stars">
                  <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" :fill="i <= Math.floor(_product.rating || 4.5) ? '#FFD700' : 'none'" stroke="#FFD700" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <span class="rating-value">{{ _product.rating || '4.5' }}</span>
                <span class="rating-count">({{ _product.rating_count || '24' }} ratings)</span>
              </div>
              
              <p class="item-description">{{ _product.description }}</p>
              
              <!-- Item additions like toppings, sizes, etc -->
              <div class="additions-section" v-if="productAdditions">
                <div class="addition-group" v-for="(addition, index) in productAdditions" :key="index">
                  <div class="addition-header">
                    <h3>{{ addition.name }}</h3>
                    <span v-if="addition.required" class="required-badge">Required</span>
                  </div>
                  
                  <div class="addition-options">
                    <div class="option-item" 
                        v-for="(option, o_index) in addition.options" 
                        :key="o_index"
                        :class="{ active: isOptionSelected(addition.name, option.name) }"
                        @click="changeAddition(addition.name, option)">
                      <div class="option-details">
                        <div class="option-selector">
                          <span v-if="addition.input_type === 'radio'" class="radio-selector" :class="{ active: isOptionSelected(addition.name, option.name) }"></span>
                          <span v-else class="checkbox-selector" :class="{ active: isOptionSelected(addition.name, option.name) }">
                            <svg v-if="isOptionSelected(addition.name, option.name)" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </span>
                        </div>
                        <div class="option-name">{{ option.name }}</div>
                      </div>
                      <div class="option-price">{{ getCurrencySymbol(option.currency) }} {{ formatMoney(option.unitprice) }}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Quantity selector -->
              <div class="quantity-section">
                <h3>Quantity</h3>
                <div class="quantity-selector">
                  <button class="quantity-btn decrease" @click="decrease" :disabled="!isInCart && order.quantity <= 1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                  <input type="number" 
                      class="quantity-input" 
                      :value="isInCart ? isInCart.quantity : order.quantity" 
                      @input="handleInput"
                      min="1">
                  <button class="quantity-btn increase" @click="increase">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </div>
              </div>
              
              <!-- Special instructions -->
              <div class="instructions-section">
                <h3>Special Instructions</h3>
                <textarea 
                    v-model="order.customer_comment" 
                    placeholder="Add notes (e.g. allergies, spice level, etc.)" 
                    class="instructions-input">
                </textarea>
              </div>
            </div>
            
            <!-- Order actions footer -->
            <div class="order-actions">
              <div class="order-summary" v-if="isInCart">
                <div class="summary-detail">
                  <span class="detail-label">Subtotal:</span>
                  <span class="detail-value">{{ _product.currency || "NGN" | currencySymbol}} {{ getSubtotal | money }}</span>
                </div>
              </div>
              
              <button class="action-button primary" @click="addToCart" v-if="!isInCart">
                <span>Add to Cart</span>
                <span class="price-tag">{{ _product.currency || "NGN" | currencySymbol }} {{ _product.unitprice | money }}</span>
              </button>
              
              <button class="action-button remove" @click="removeFromCart" v-else>
                <span>Remove from Cart</span>
              </button>
            </div>
          </div>
        </template>
  
        <template v-else-if="step === 2">
          <div class="modal-body">
              <div class="padding-16">
                 <div class="form-input">
                      <label>Delivery Region</label>
                      <select v-model="payload.delivery_meta.destination_region">
                          <option v-for="(region, index) in deliveryRegions" :key="index" :value="region.name">
                              {{ region.name }} -  {{region.currency || 'NGN' | currencySymbol}}{{ region.fee }}
                          </option>
                      </select>

                      
                 </div>

                 <div class="form-input">
                    <label for="">Delivery Address</label>
                    <input type="" id="address" v-model="payload.delivery_meta.destination_address">
                 </div>

                 
                 <div class="form-input">
                    <label for="">Delivery Note</label>
                    <textarea v-model="payload.delivery_note">
                        
                    </textarea>
                 </div>
              </div>
          </div>
        </template>


        <template v-else-if="step === 3">
            <p>Please enter your phone number to track your order and receive delivery notifications</p>
            <div class="form-input">
                <label for="">Your WhatsApp Phone</label>
                
                <vue-tel-input v-model="payload.customer_phone"></vue-tel-input>

                <div class="fetching-wallet"  v-if="fetching_wallet" style="width:100%; height: 20px; padding: 8px 0; margin-top: 10px; display: flex; align-items:center; color: grey;">
                    <p style="width: 100%;">Fetching wallet...</p>
                </div>
                
            </div>
            <div class="form-input" v-if="fetched_wallet">
                <label for="">Your 6-digit Pin</label>
                
                <input v-model="customer.pin" type="password">
                
            </div>
            <div class="form-input" v-if="fetched_wallet && !customer_wallet">
                <label for="">Your 6-digit Pin</label>
                
                <input v-model="customer.confirm_pin">
                
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


                    <div class="padding-16-y total-item">
                        <div>
                            Delivery Region
                        </div>

                        <div>
                            {{ payload.delivery_meta.destination_region }}
                        </div>
                    </div>

                    <div  class="padding-16-y total-item">
                        <div>
                            Delivery Address
                        </div>

                        <div>
                            {{ payload.delivery_meta.destination_address }}
                        </div>
                    </div>
                    
                




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
                        <p>{{ "NGN" | currencySymbol}} {{ deliveryFee || dynamic_delivery_fee | money}}</p>
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




        <div class>
            <button class="btn" v-if="step !== 1 && step !== 4" @click="nextStep">Continue</button>
        </div>
      </template>
    </BaseModal>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  import mixpanel from 'mixpanel-browser';
  import crypto from 'crypto'
  
  export default {
    props: ['item', 'business'],
    created() {
      if (this.item) {
          this.order.deal_id = this.item.deal_id;
      }
    },
  
    watch: {
      'payload.delivery_meta.destination_region'(value) {
          if (value) {
              let delivery_fee = this.deliveryRegions.find(a => a.name === value)?.fee
              this.$set(this.payload.delivery_meta, 'delivery_fee', delivery_fee)
          }
      },
      'payload.customer_phone'(value) {
        if ( value.replace(/\s/g, '').length === 11) {
                console.log("PHONE LENGTH") 
                console.log(value.length)
                this.getCustomerWallet()
            }
      },
      step(value) {
        if (this.step === 2) {
            this.loadGoogleMapScript()
        }
      }
    },
    data() {
      return {
        creating_session: false,
        payload: {
            delivery_meta: {},
            delivery_type: 'delivery',
            delivery_note: ''
        },
        customer: {

        },
        validating_wallet: false,
        fetching_wallet: false,
        fetched_wallet: false,
        customer_wallet: null,
        creating_wallet: false,
        step: 1,
        order: {
          quantity: 1,
          additions: [],
          variations: [],
          customer_comment: "",
          delivery_pack: {},
          deal_id: null,
          question_answers: [],
        },
        
        hasMultipleImages: true, // Set to true if the item has multiple images
        productQuestions: [], // Define the missing variable
        hasPackRequirements: false, // Define the missing variable
        deliveryPacks: [], // Define the missing variable
        getCurrencySymbol: '$', // Default currency symbol
      }
    },
    computed: {
      ...mapGetters('preorder', ['cart']),
      _product() {
        if (this.item && this.item.products && this.item.products[0]) {
            return this.item.products[0]
        }
      },
      deliveryFee(){
        return this.payload.delivery_meta.delivery_fee
      },
      deliveryRegions() {
          let regions = [];
          if (this.item) {
              if (this.item.delivery_regions) {
                  let pre = JSON.parse(this.item.delivery_regions);
                  regions = pre
              }
          }
          return regions;
      },
      isInCart() {
        return this.cart?.find(item => item.id === this._product.id)
      },
      productAdditions() {
        return this._product && this._product.meta && JSON.parse(this._product.meta).additions || null;
      },
      getSubtotal() {
        if (!this.isInCart) return 0;
        
        let basePrice = this._product.unitprice * this.isInCart.quantity;
        let additionsPrice = 0;
        
        // Calculate additions price
        if (this.isInCart.additions && this.isInCart.additions.length > 0) {
          for (const addition of this.isInCart.additions) {
            additionsPrice += addition.unitprice || 0;
          }
        }
        
        return basePrice + additionsPrice;
      },
      grandTotal() {
            return parseFloat(this.cartTotal) +
             parseFloat(this.deliveryFee || this.dynamic_delivery_fee || 0) + 
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

                        if (!this.deliveryFee) {

                            const obj = {
                                name: tax.name,
                                value_total: parseFloat(tax.value / 100) * (this.cartTotal).toFixed(2),
                            }
                            array.push(obj)
                        }
                        else {

                            const obj = {
                                name: tax.name,
                                value_total: parseFloat((tax.value / 100) * (this.cartTotal + this.deliveryFee)).toFixed(2),
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

                let paystack_pricing = parseFloat((1.4 / 100) * (this.cartTotal + this.totalTaxes + this.deliveryFee))

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

                if ((this.cartTotal + resolved_app_fee + this.deliveryFee + this.totalTaxes) > 2500) {
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
    },
    mounted() {
      if (this.item) {
        this.mixpanel = mixpanel.init('1f580add8d0558ccae5fc19ca5997dab', { debug: false, track_pageview: false });
        mixpanel.track("Preorder Model Opened", {
          product: this._product?.name 
        })
      }
    },
    methods: {
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
            this.$set(this.payload['delivery_meta'], 'destination_address', this.place.formatted_address)
            //this.delivery_meta.destination_address = this.place.formatted_address;
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

                            this.$set(this.payload['delivery_meta'], 'destination_latitude' ,latitude)
                            this.$set(this.payload['delivery_meta'], 'destination_longitude' ,longitude)

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
                    deal_id: item.deal_id,
                    //variations: item.variations,
                    question_answers: item.question_answers
                };
                orders.push(obj);

                
                
            });
            const payload = {
                token: this.$cookies.get("usertoken"),
                r_uid: Date.now(),
                delivery_type: 'delivery',
                delivery_meta: this.payload.delivery_meta,
                delivery_fee:  this.deliveryFee || 0,
                business_slug: this.$route.params.slug,
                business_id: this.business.id,
                items: orders,
                taxes: this.taxes,
               // vat: parseFloat(this.vat || 0),
                appFee: this.appFee,
                // checkout_session: ref,
                customer_phone: this.payload.customer_phone,
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
        async createCheckoutSession(payload) {
            this.creating_session = true
            if (this.business?.id) {

                if (this.item.ordering_ends_at) {
                    payload.is_preorder = true
                }

                if (this.item.ordering_ends_at) {
                    this.$set(payload['delivery_meta'], 'delivery_date', this.item.delivery_starts_at)
                    this.$set(payload['delivery_meta'], 'scheduled_delivery_time', this.item.delivery_starts_at)
                }

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
      // Added missing methods
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
            if (!this.payload.delivery_meta.destination_region || !this.payload.delivery_meta.destination_address) {
                alert("Please enter the required details")
                return;
            }
            else {
                this.step++
            }
        }
        else if (this.step === 3) {
            if (this.fetched_wallet && !this.customer_wallet) {
                this.createwallet()
            }
            else {
                this.validateWalletPin()
            }
        }

      },
      createWallet() {
            this.creating_wallet = true;
            this.$api.post('/customers/wallets', {
                customer_phone: this.payload.customer_phone,
                wallet_pin: this.customer.pin,
                business_id: this.business.id,
            }).then(resp=> {
                this.customer_wallet = resp.data.data.wallet;
                this.payload.customer_id = resp.data.data.customer_id;
                this.$set(this.payload, 'customer_id', resp.data.data.customer_id)
                this.step = 4

            }).finally(() => {
                this.creating_wallet = false
            })
        },

      validateWalletPin() {
            this.validating_wallet = true; 
        
            this.$api.post('/customers/wallets/validate', {
                wallet_pin: this.customer.pin,
                customer_phone: this.payload.customer_phone,
                business_id: this.business.id,
            
            }).then(resp=> {
                this.customer_wallet = resp.data.data.wallet;
                this.customer_id = resp.data.data.customer_id;
                this.step = 4;


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
            this.$api.get('/customers/wallets/' + this.payload.customer_phone.replace(/\s/g, '') + '?business_id=' + this.business.id).then(resp=> {
                this.customer_wallet = resp.data.data.wallet
                this.fetched_wallet = true
            }).catch(e=> {
                //alert(e)
            }).finally((e) =>{
                this.fetching_wallet = false
            })
        },
    
      formatMoney(value) {
        // Format money with 2 decimal places
        return value ? parseFloat(value).toFixed(2) : '0.00';
      },
      getCurrencySymbol(currency) {
        // This method returns the currency symbol based on the currency code
        const symbols = {
          USD: '$',
          EUR: '€',
          GBP: '£',
          // Add more currency symbols as needed
        };
        return symbols[currency] || '$';
      },
      generateUniqueCode(length = 6) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const randomBytes = crypto.randomBytes(length);
        const code = [...randomBytes].map(byte => characters[byte % characters.length]).join('');
        return code;
      },
      removeFromCart() {
        this.$store.dispatch('preorder/removeFromCart', this._product.id);
        this.$emit('close');
      },
      handleInput($evt) {
        const value = parseInt($evt.target.value) || 1;
        
        if (this.isInCart) {
          this.$store.dispatch('preorder/setItemQuantity', {id: this._product.id, quantity: value})
        } else {
          this.order.quantity = value;
        }
      },
      increase() {
        if (!this.isInCart) {
          this.order.quantity++;
          return;
        }
        
        this.$store.dispatch('preorder/increaseItemQuantity', this._product.id)
      },
      decrease() {
        if (!this.isInCart) {
          if (this.order.quantity > 1) {
            this.order.quantity--;
          }
          return;
        }
        
        this.$store.dispatch('preorder/decreaseItemQuantity', this._product.id)
      },
      isOptionSelected(addition, option) {
        const found = this.order.additions.find(a => a.addition === addition && a.value === option);
        return !!found;
      },
      verifyAdditions() {
        if (this.productAdditions) {
          for (let addition of this.productAdditions) {
            if (addition.required) {
              if (!this.order.additions.find(a => a.addition === addition.name)?.value) {
                this.$toast.error(`Please select ${addition.name}`);
                return false;
              }
            }
          }
        }
        
        if (this.productQuestions) {
          for (let i = 0; i < this.productQuestions.length; i++) {
            const question = this.productQuestions[i];
            if (question.required && (!this.order.question_answers[i] || !this.order.question_answers[i].answer)) {
              this.$toast.error("Please answer all the required questions");
              return false;
            }
          }
        }
        
        if (this.hasPackRequirements && this.deliveryPacks && this.deliveryPacks.length > 0) {
          if (Object.keys(this.order.delivery_pack).length === 0) {
            this.$toast.error("Please choose a delivery pack");
            return false;
          }
        }
        
        if (this.productVariations && this.order.variations.length === 0) {
          this.$toast.error(`Please select a variation of ${this._product.name}`);
          return false;
        }
        
        return true;
      },
      addToCart() {
        if (!this.verifyAdditions()) {
          return;
        }
        
        let variations_quantity = 0;
        
        for (let v of this.order.variations) {
          variations_quantity += v.quantity;
        }
  
        let item_key = this.generateUniqueCode(6);
        
        const item = {
          unitprice: this._product.unitprice,
          currency: this._product.currency,
          name: this._product.name,
          id: this._product.id,
          thumbnail: this._product.thumbnail,
          description: this._product.description,
          quantity: variations_quantity ? variations_quantity : this.order.quantity,
          customer_comment: this.order.customer_comment,
          additions: this.order.additions,
          variations: this.order.variations,
          question_answers: this.order.question_answers,
          availability: this._product.availability,
          item_key: item_key,
          item_uid: item_key,
          deal_id: this._product.deal_id
        };
        
        if (this.order.delivery_pack && Object.keys(this.order.delivery_pack).length > 0) {
          item.delivery_pack = this.order.delivery_pack;
        }
        
        this.$store.dispatch('preorder/addToCart', item);
  
        mixpanel.track("Added to cart", {
          product: this._product?.name
        })
        
        // Show success toast
        this.$toast.success(`${item.name} added to cart`);
  
        this.step++;
      },
      changeAddition(addition_name, selected) {
        const addition_exists = this.order.additions.find(a => a.addition === addition_name);
        
        if (addition_exists) {
          // For checkbox, toggle selection
          if (this.getAdditionType(addition_name) === 'checkbox') {
            if (addition_exists.value === selected.name) {
              // Remove this option
              this.order.additions = this.order.additions.filter(
                a => !(a.addition === addition_name && a.value === selected.name)
              );
              return;
            }
          }
          
          // For radio buttons or updating checkbox
          const index = this.order.additions.indexOf(addition_exists);
          this.order.additions[index] = {
            addition: addition_name, 
            value: selected.name, 
            unitprice: selected.unitprice, 
            currency: selected.currency
          };
        }
        else {
          this.order.additions.push({ 
            addition: addition_name, 
            value: selected.name, 
            unitprice: selected.unitprice, 
            currency: selected.currency 
          });
        }
      },
      getAdditionType(name) {
        if (!this.productAdditions) return 'radio';
        
        const addition = this.productAdditions.find(a => a.name === name);
        return addition ? addition.input_type : 'radio';
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  // Colors

  $deep-primary: #A02730;

  $primary-color: #FF6B6B;
  $primary-dark: #FF5252;
  $secondary-color: #4ECDC4;
  $text-dark: #333333;
  $text-medium: #666666;
  $text-light: #999999;
  $white: #FFFFFF;
  $off-white: #F9F9F9;
  $light-gray: #F5F5F5;
  $border-color: #EEEEEE;
  $danger-color: #E53935;
  $success-color: #4CAF50;
  $warning-color: #FFC107;
  
  // Shadows
  $shadow-soft: 0 4px 6px rgba(0, 0, 0, 0.05);
  $shadow-medium: 0 6px 12px rgba(0, 0, 0, 0.08);
  $shadow-hard: 0 10px 20px rgba(0, 0, 0, 0.12);
  
  // Border Radius
  $radius-sm: 4px;
  $radius-md: 8px;
  $radius-lg: 16px;
  $radius-xl: 24px;
  $radius-full: 9999px;
  
  // Transitions
  $transition-fast: 0.15s ease;
  $transition-base: 0.25s ease;
  $transition-slow: 0.35s ease;
  

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

  * {

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
        min-height: 40px;

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
  // The Gourmet Modal
  .gourmet-modal {
    :deep(.modal-container) {
      max-width: 90%;
      width: 500px;
      border-radius: $radius-lg;
      overflow: hidden;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
    }
    
    :deep(.modal-content) {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: hidden;
    }
    
    :deep(.modal-header) {
      padding: 0;
    }
    
    :deep(.modal-body) {
      padding: 0;
      flex: 1;
      overflow-y: auto;
    }
  }
  
  // Modal Header with Image
  .form-input {
    // Replace the mixin with actual styles
    margin: 20px 0;
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
    }
    
    select, input, textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid $border-color;
      border-radius: $radius-md;
      background-color: $light-gray;
      font-size: 14px;
      resize: none;
      transition: $transition-fast;
      
      &:focus {
        outline: none;
        border-color: $primary-color;
      }
      
      &::placeholder {
        color: $text-light;
      }
    }
  }
  
  // Order Actions
  .order-actions {
    padding: 20px;
    border-top: 1px solid $border-color;
    background-color: $off-white;
  }
  
  // Order Summary
  .order-summary {
    margin-bottom: 15px;
    
    .summary-detail {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .detail-label {
        font-size: 14px;
        color: $text-medium;
      }
      
      .detail-value {
        font-size: 14px;
        font-weight: 600;
        color: $text-dark;
      }
    }
  }
  
  // Action Button
  .action-button {
    width: 100%;
    padding: 16px;
    border: none;
    border-radius: $radius-full;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: $transition-base;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    &:hover {
      transform: translateY(-2px);
    }
    
    &.primary {
      background-color: $primary-color;
      color: $white;
      box-shadow: 0 4px 10px rgba($primary-color, 0.3);
      
      &:hover {
        background-color: darken($primary-color, 5%);
        box-shadow: 0 6px 15px rgba($primary-color, 0.4);
      }
      
      .price-tag {
        background-color: rgba($white, 0.2);
        padding: 6px 12px;
        border-radius: $radius-full;
      }
    }
    
    &.remove {
      background-color: rgba($danger-color, 0.1);
      color: $danger-color;
      
      &:hover {
        background-color: rgba($danger-color, 0.2);
      }
    }
  }
  
  // Animations
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  // Media queries for responsiveness
  @media (max-width: 600px) {
    .gourmet-modal {
      :deep(.modal-container) {
        width: 100%;
        max-width: 100%;
        height: 100%;
        max-height: 100%;
        border-radius: 0;
        margin: 0;
      }
    }
    
    .modal-header {
      .food-image-container {
        height: 200px;
      }
    }
    
    .item-name {
      font-size: 20px;
    }
    
    .action-button {
      padding: 14px;
      &:focus {
        outline: none;
        border-color: $primary-color;
      }
    }
  
      
    
  }
  
  .padding-16 {
    padding: 16px;
  }
  
  .modal-header {
    position: relative;
    .food-image-container {
      position: relative;
      width: 100%;
      height: 250px;
      overflow: hidden;
      
      .food-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform $transition-base;
        
        &:hover {
          transform: scale(1.05);
        }
      }
      
      // Image gallery dots
      .image-gallery-dots {
        position: absolute;
        bottom: 15px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 8px;
        
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.5);
          transition: $transition-fast;
          
          &.active {
            background-color: $white;
            width: 10px;
            height: 10px;
          }
        }
      }
      
      // Back button
      .back-button {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.5);
        color: $white;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: $transition-fast;
        z-index: 10;
        
        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
          transform: scale(1.1);
        }
      }
      
      // Badge for bestseller/special
      .item-badge {
        position: absolute;
        top: 15px;
        left: 15px;
        background-color: $primary-color;
        color: $white;
        padding: 6px 12px;
        border-radius: $radius-full;
        font-weight: 600;
        font-size: 12px;
        box-shadow: $shadow-soft;
      }
    }
  }
  
  // Modal Body
  .modal-body {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  // Item Details
  .item-details {
    padding: 20px;
    flex: 1;
    
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
    }
  }
  
  // Item Name
  .item-name {
    font-size: 22px;
    font-weight: 700;
    color: $text-dark;
    margin: 0;
    padding-right: 15px;
    line-height: 1.3;
  }
  
  // Item Price
  .item-price {
    font-size: 18px;
    font-weight: 700;
    color: $primary-color;
    margin: 0;
    white-space: nowrap;
  }
  
  // Item Rating
  .item-rating {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    
    .stars {
      display: flex;
      gap: 2px;
      margin-right: 8px;
    }
    
    .rating-value {
      font-weight: 600;
      font-size: 14px;
      color: $text-dark;
      margin-right: 4px;
    }
    
    .rating-count {
      font-size: 14px;
      color: $text-light;
    }
  }
  
  // Item Description
  .item-description {
    font-size: 15px;
    line-height: 1.6;
    color: $text-medium;
    margin-bottom: 24px;
  }
  
  // Additions Section
  .additions-section {
    margin-bottom: 24px;
  }
  
  // Addition Group
  .addition-group {
    margin-bottom: 20px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  // Addition Header
  .addition-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    
    h3 {
      font-size: 16px;
      font-weight: 600;
      color: $text-dark;
      margin: 0;
    }
    
    .required-badge {
      font-size: 12px;
      padding: 3px 8px;
      background-color: rgba($warning-color, 0.2);
      color: darken($warning-color, 15%);
      border-radius: $radius-full;
      font-weight: 500;
    }
  }
  
  // Addition Options
  .addition-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  // Option Item
  .option-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 15px;
    border-radius: $radius-md;
    background-color: $light-gray;
    cursor: pointer;
    transition: $transition-fast;
    
    &:hover {
      background-color: darken($light-gray, 3%);
    }
    
    &.active {
      background-color: rgba($primary-color, 0.1);
      border: 1px solid rgba($primary-color, 0.2);
    }
    
    .option-details {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .option-selector {
      display: flex;
      align-items: center;
      justify-content: center;
      
      .radio-selector {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid $border-color;
        position: relative;
        transition: $transition-fast;
        
        &.active {
          border-color: $primary-color;
          
          &:after {
            content: '';
            position: absolute;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: $primary-color;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
      
      .checkbox-selector {
        width: 20px;
        height: 20px;
        border-radius: $radius-sm;
        border: 2px solid $border-color;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: $transition-fast;
        
        &.active {
          border-color: $primary-color;
          background-color: $primary-color;
          color: $white;
        }
      }
    }
    
    .option-name {
      font-size: 14px;
      font-weight: 500;
      color: $text-dark;
    }
    
    .option-price {
      font-size: 14px;
      font-weight: 600;
      color: $text-dark;
    }
  }
  
  // Quantity Section
  .quantity-section {
    margin-bottom: 24px;
    
    h3 {
      font-size: 16px;
      font-weight: 600;
      color: $text-dark;
      margin: 0 0 12px 0;
    }
  }
  
  // Quantity Selector
  .quantity-selector {
    display: flex;
    align-items: center;
    gap: 12px;
    
    .quantity-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: none;
      background-color: $light-gray;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: $transition-fast;
      
      &:hover {
        background-color: darken($light-gray, 5%);
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      &.decrease {
        color: $text-dark;
      }
      
      &.increase {
        color: $white;
        background-color: $primary-color;
        
        &:hover {
          background-color: darken($primary-color, 5%);
        }
      }
    }
    
    .quantity-input {
      width: 60px;
      height: 40px;
      border: 1px solid $border-color;
      border-radius: $radius-md;
      text-align: center;
      font-size: 16px;
      font-weight: 600;
      color: $text-dark;
      
      &:focus {
        outline: none;
        border-color: $primary-color;
      }
      
      // Remove up/down arrows
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      -moz-appearance: textfield;
    }
  }
  
  // Instructions Section
  .instructions-section {
    margin-bottom: 20px;
    
    h3 {
      font-size: 16px;
      font-weight: 600;
      color: $text-dark;
      margin: 0 0 12px 0;
    }
    
    .instructions-input {
      width: 100%;
      height: 100px;
      padding: 15px;
      border: 1px solid $border-color;
      border-radius: $radius-md;
      font-size: 16px;
    }
}

.btn {
    width: 100%;
    background-color: $primary;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: $deep-primary;
    }
  }


.summary-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    font-size: 14px;
    
    .discount {
        color: #5ac091;
    }
}


.summary-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    font-size: 14px;
    
    .discount {
        color: #5ac091;
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
  
</style>