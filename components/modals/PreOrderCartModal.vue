<template>
    <BaseModal  @close="$emit('close')">
        <template #header>
            <div class="padding-16">
                Order {{ item.name }}
            </div>
        </template>
        <template #body>
            <div class="padding-16">



                <template v-if="step === 1">
                    <div class="form-input">
                        <label>Delivery Location</label>
                        <select v-model="payload.delivery_region">
                            <option v-for="(location, index) in deliveryLocations" :value="location.name">
                                {{ 
                                    location.name
                                 }}
                            </option>
                        </select>
                        
                        
                        
                    </div>

                    <div class="form-input">
                        <label for="">Delivery Destination</label>
                        <input id="address">
                        <span class="error" style="color:black" v-if="verifying_location_region">verifying region and location</span>
                        <span v-if="location_region_verified && !location_allowed" class="error">Destination doesn't align with the region</span>
                    </div>

                    <div class="form-input">
                        <label>Choose a time slot</label>
                        <select v-model="payload.time_slot">

                            <option v-for="(slot, index) in timeSlots" :value="slot">
                                {{ 
                                   formatTime(slot.from)
                                 }} 
                                 -
                                 {{ 
                                    formatTime(slot.to)
                                }}
                            </option>
                        </select>
                    </div>

                    <div class="form-input">
                        <label>Delivey Fee <span class="tag">Save 50%</span></label>
                        
                        <p v-if="payload.delivery_region">{{"NGN" | currencySymbol}} {{locationPrice | money}}</p>
                    </div>
                    <div>
                        <button class="big-btn" @click="step++" :disabled="!canContinue">Next</button>
                    </div>
                </template>
















                <template v-else-if="step === 2">
                    <div class="form-input">
                        <label for="">Your Phone (Whatsapp)</label>
                        <vue-tel-input v-model="payload.customer_phone" type="number" inputmode="numeric" autocomplete="off"></vue-tel-input>

                        <!-- 
                        <input type="text" v-model="payload.whatsapp_phone">-->
                    </div>

                    <div class="form-input">
                        <label for="">Alternative Phone (optional)</label>
                        <vue-tel-input v-model="payload.alternative_phone" type="number" inputmode="numeric" autocomplete="off"></vue-tel-input>
                        <span class="error" style="font-size: 12px; color: black;">Just in case you aren't around</span>
                        <!-- 
                        <input type="text" v-model="payload.whatsapp_phone">-->
                    </div>
                    <div class="form-input">
                        <label for="">
                           Delivery Note
                        </label>
                        <textarea v-model="payload.delivery_note">
                            
                        </textarea>
                    </div>

                    

                    <div class="form-input">
                        <button class="big-btn" @click="pay">
                            Pay
                        </button>
                    </div>
                </template>
            </div>
        </template>
    </BaseModal>
</template>


<script>
import moment from "moment";
export default {
    props: ['item'],
    created() {
        this.loadGoogleMapScript();
        this.payload.item_id = this.item.id
       
    },
    watch: {
        deliveryDestination(value) {
            this.location_region_verified = false;
            this.verifyLocationRegion(value, this.payload.delivery_region)
            
        }
        
    },
    data() {
        return {
            step: 1,
            payload: {
                item_id: null, // set at created
                delivery_region: '',
                delivery_destination: '', 
                delivery_fee: '',
                delivery_note: '',
                alternative_phone: '',
                delivery_coordinates: {},                
            },
            autocomplete: null,

            location_region_verified: false,
            verifying_location_region: false,

            location_allowed: false,
        }
    },
    methods:{
        
        verifyLocationRegion(location, region) {
            this.verifying_location_region = true
            this.$api.post('/utils/location-region-verify', {
                location,
                region,
            }).then(resp => {
                this.location_region_verified = true;
                this.location_allowed = resp.data.data.toLowerCase() === 'true' ? true : false
            })
            
            .finally(()=> {
                this.verifying_location_region = false
            })
        },
        formatTime(time) {
            return moment(time).format("hh:mm A").toString()
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



                }
            }, 1000)
        },
        fillInAddress() {
            let place = this.autocomplete.getPlace();

            this.$set(this.payload, 'delivery_destination', place.formatted_address)
            //alert(JSON.stringify(place))
            //this.payload.delivery_destination =  place.formatted_address;

            // alert(JSON.stringify(Object.keys(this.place)))
            const placesService = new google.maps.places.PlacesService(document.createElement('div'));
            const autocompleteService = new google.maps.places.AutocompleteService();

             place = autocompleteService.getPlacePredictions({ input: place.formatted_address }, (predictions, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && predictions && predictions.length > 0) {
                    const placeId = predictions[0].place_id;

                    // Get Place Details using Place ID
                    placesService.getDetails({ placeId }, (placeResult, placeStatus) => {
                        if (placeStatus === google.maps.places.PlacesServiceStatus.OK) {
                            const latitude = placeResult.geometry.location.lat();
                            const longitude = placeResult.geometry.location.lng();

                            this.payload.delivery_coordinates = { lat: latitude, long: longitude }

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
        
        
        pay() {
            const self = this;
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
                    business_id: this.item.business_id
                },
                narration: "Preorder",
                customer: {
                    email: this.customer && this.customer.email || "anon@gmail.com",
                    // phone_number: this.userDetails.contact_phone_number,
                    name: this.customer && this.customer.name || "Preorder-Customer",
                },
                customizations: {
                    title: "Afflee PointsBud",
                    logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
                },
                callback: (data) => {
                    //this.$store.commit('dashboard/setActionFundWallet', false);
                  //  this.cart_step = 5;
                    /*let payload = {...data, customer_wallet_id: this.payload.wallet_id, customer_id: this.payload.customer_id}
                    this.$api.post("/customers/wallets/verify-fund", payload).then(resp => {
                     
                    
                       
                    });*/

                    if (data.status === 'successful') {
                        
                        const payload = {
                            business_id: this.item.business_id,
                            ...this.payload,
                            ...data
                        }

                        payload.delivery_fee = this.locationPrice
                        payload.delivery_upper_time_slot = this.upperTimeSlot
                        payload.delivery_lower_time_slot = this.lowerTimeSlot
                        this.registerPayment(payload)
                    }
                }
            });
        },

        registerPayment(data) {
            this.$api.post('/payments/pre-order', data).then(resp=> {
                
            })
        }
    },
    computed:{
        ordersLeft() {
        },
        lowerTimeSlot() {
            if (this.payload.time_slot) {
                return this.timeSlots.find(a=> a === this.payload.time_slot)?.from
            }
            return ""
        },
        upperTimeSlot() {
            if (this.payload.time_slot) {
                return this.timeSlots.find(a=> a === this.payload.time_slot)?.to
            }
            return ""
        },
        canContinue() {
            if (this.step === 1) {
                if (!this.payload.delivery_region || !this.payload.delivery_destination || !this.payload.time_slot || (!this.location_allowed  && this.location_region_verified))
                {
                    return false
                }
                return true
            }
            return true;
        },
        deliveryDestination() {
            return this.payload.delivery_destination
        },
        grandTotal() {
            return parseFloat(this.item.unitprice + parseFloat(this.locationPrice)).toFixed(2)
        },
        timeSlots() {
            if (this.item.time_slots) {
                return JSON.parse(this.item.time_slots)
            }
            return []
        },
        deliveryLocations() {
            if (this.item.delivery_locations) {
                return JSON.parse(this.item.delivery_locations)
            }
            return []
        },
        locationPrice() {
            let price = 0;
            price = this.deliveryLocations.find(location=> location.name == this.payload.delivery_region)?.unitprice || 0;
            price = price
            return price

        }
    }
}

</script>


<style lang="scss" scoped>

* {
    font-family: "Inter", sans-serif !important;
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

.error {
    font-size: 12px;
    color: red;
}

.form-input {
    @include greyforminput;
    margin-bottom: 20px; 
}

.big-btn {
    @include big-btn;
    width: 100%;
}


.tag {
    @include done-btn;
    padding: 2px 8px;
    text-align: center;
    font-size: 12px;
    border-radius: 10px;
}

</style>