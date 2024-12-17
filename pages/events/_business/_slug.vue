<template>
    <div class="page">
        <BaseModal v-if="show_book_modal" @close="show_book_modal = false">
            <template #header>
                <div class="padding-16">
                    <div class="flex gap-4">
                        <svg v-if="step !== 1" @click="step--" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.6167 11H4.58337" stroke="#120D26" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M11 17.4166L4.58337 10.9999L11 4.58325" stroke="#120D26" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                            

                        <p>Book a table </p>
                    </div>
                </div>
                <template v-if="step === 1">

                    <template v-if="!checking">


                        <div class="padding-16">
                            <p style="font-size: 16px; font-weight: 300; color: black;">Enter the following details to see available slots</p>
                            
                            <div>
        
                                <div class="form-input">
                                    <label for="">Date</label>
                                    <p style="font-size: 15px; color: rgba(0, 0, 0, 0.726);">{{formatTime(event.date,  'dddd DD MMM YYYY')}}</p>
                                    
                                </div>
                                <div class="form-input">
                                    <label for="">Time</label>
                                    <div style="">
        
                                        <vue-timepicker :minute-range="[0]" :hour-range="computedTimeRange" v-model="payload.from_time" format="hh:mm A" ></vue-timepicker>
                                    </div>
                                    
                                </div>
                                <div class="form-input">
                                    <label for="">No. of guests <span class="required">*</span></label>
                                    <input type="number" inputmode="numeric" v-model="payload.guests">
                                </div>
        
                                <div class="">
                                    <label for="">How much time do you intend to spend? <span class="required">*</span></label>
                                    <div>
        
                                        <input for="" type="range" v-model="payload.duration" inputmode="numeric">
                                        <label>{{payload.duration }}  {{payload.duration === 1 ? ' hour' : ' hours'}}</label>
                                    </div>
                                </div>
        
                                <div class="ctas">
                                    <button @click="checkAvailableSpots">Check Availability</button>
                                </div>
                            </div>
                        </div>
                    </template>

                    <template v-else>
                        <LoadingState>

                        </LoadingState>
                    </template>


                </template>

                <template v-else-if="step ==2">
                    <div class="section">
                        

                        <div class="spaces">
                            <p class="title">Available Spaces for {{ payload.from_time }}</p>
                           
                            <div class="space" v-for="(space, index) in available_spaces" :key="index">
                                <div>
                                    <p>{{space.name}}</p>
                                    <span style="color: grey; font-size: 12px">(capacity: {{ space.max_guests }} guests) </span>
                                    <div class="flex gap-2 flex-center-y">
                                     </div>
    
                                </div>
                                
                                <button  style="font-size: 13px; font-weight: 600; padding: 8px 16px; border-radius: 24px;" class="reserve-button" @click="triggerReserveSpace(space)">Book</button>
                            
                            </div>
                        </div>


                        <div class="time-slots" style="margin-top: 60px" v-if="false">
                            <p class="title">Available Time Slots</p>
                            <div class="space" v-for="(space, index) in spaces" :key="index">
                                <div style="width: 100%;">
                                    <p>{{space.name}} (capacity: {{ space.max_guests }})</p>
    
                                    <div class="flex gap-2 flex-center-y">
                                        <p style="font-size: 13px; color: grey">{{space.available_slots.length}} time slots available</p>
                                        
                                    </div>
                                    <div class="flex justify-end">
    
                                        <button style="font-size: 13px; font-weight: 600; padding: 8px 16px; border-radius: 24px;" @click="chosen_space = space" class="view-slots-btn">
                                            View Slots
                                        </button>
                                    </div>
    
                                </div>
                                
                            
                            </div>
                        </div>

                        <div style="width: 90%; display: flex; justify-content: center; margin: auto">
                            <button @click="step--" style="padding: 16px; width: 100%; margin: auto; border: 1px solid lightgrey;">Go Back</button>
                        </div>
                        
                    </div>
                </template>



                <template v-else-if="step === 3">
                    <div class="padding-24">
                        <div class="event-item flex space-between">
                            <p>Space:</p>

                            <p>{{chosen_space.name}}</p>
                        </div>
                        <div class="event-item  flex space-between">
                            <p>Event:</p>

                            <p>{{event.name}}</p>
                        </div>
                        <div class="event-item  flex space-between">
                            <p>Date:</p>

                            <p>{{formatTime(event.date, "dddd, DD MMM")}}</p>
                        </div>
                        <div class="event-item  flex space-between">
                            <p>Time:</p>

                            <p>{{payload.from_time}}</p>
                        </div>

                        <div class="event-item  flex space-between">
                            <p>Guests:</p>

                            <p>{{payload.guests}}</p>
                        </div>

                        <div class="item flex-center-x space-between">
                            <button class="big-btn" @click="step = 4">Continue</button>
                        </div>
                    </div>
                </template>


                <template v-else-if="step === 4">
                    <div class="padding-24">
                        <div class="form-input">
                            <label for="">Your Name</label>
                            <input type="text"  v-model="payload.name">
                        </div>
                        <div class="form-input">
                            <label for="">Your Email</label>
                            <input type="text" v-model="payload.email">
                        </div>
                        <div class="form-input">
                            <label for="">Your Phone</label>
                            <vue-tel-input v-model="payload.customer_phone"></vue-tel-input>
                        </div>
                        <div class="form-input">
                            <label for="">Special Request</label>
                            <textarea v-model="payload.note"></textarea>
                        </div>
                        <div class="item flex-center-x space-between">
                            <button class="big-btn" @click="makePayment">Make Payment {{'NGN' | currencySymbol}} {{event.deposit_amount | money}}</button>
                        </div>
                    </div>
                </template>

                <template v-else-if="step==5">
                    <div class="padding-24">
                        Booking Successful!
                    </div>
                
                </template>

                
            </template>
        </BaseModal>
        <div class="page__container" v-if="event && event.name">
            <div class="header" :style="{'backgroundImage': `url('${event.thumbnail}')`}">
                <div class="header__container">
                </div>
            </div>

            <div class="main">
                <h1>{{event.name}}</h1>

                <div class="event-detail-item">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect opacity="0.1" width="48" height="48" rx="12" fill="#E53945"/>
                        <path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M20.1838 15.352H27.8621V13.5642H20.1838V15.352ZM18.4371 13.6376V13.6465C17.8377 13.701 17.2447 13.8201 16.6679 13.9992V13.9925C16.6507 13.9997 16.6346 14.0053 16.6191 14.0106C16.5987 14.0176 16.5795 14.0242 16.5606 14.0337C16.5145 14.0448 16.4695 14.0615 16.4266 14.0826C16.3001 14.1238 16.1736 14.1727 16.0545 14.2228C16.0229 14.235 15.9913 14.2492 15.9596 14.2634C15.928 14.2776 15.8964 14.2918 15.8648 14.304C15.8213 14.3246 15.776 14.3471 15.7307 14.3696C15.6854 14.3922 15.6401 14.4147 15.5967 14.4353L15.3822 14.5588C15.3426 14.579 15.3059 14.6027 15.2684 14.6269C15.2461 14.6413 15.2236 14.6559 15.2 14.67C14.8772 14.8781 14.5781 15.1217 14.3079 15.3987L14.2918 15.4154C14.2563 15.4568 14.2209 15.4969 14.1861 15.5365C14.1272 15.6034 14.0697 15.6687 14.0151 15.7358L13.999 15.7514C13.122 16.9617 12.6823 18.4536 12.7585 19.9655V20.445H14.4901V19.961C14.4901 17.854 15.1614 16.5423 16.655 15.8704C17.2254 15.629 17.828 15.4799 18.4414 15.4254H18.4574V13.6454L18.4371 13.6376ZM33.9975 15.7291L34.005 15.7447C34.881 16.9562 35.3185 18.4491 35.2413 19.961V20.445H33.5107V19.9488C33.5471 19.0566 33.3681 18.1688 32.9885 17.3667C32.6239 16.6803 32.0406 16.1474 31.3362 15.8582C30.7754 15.6167 30.1814 15.4666 29.5755 15.4132V13.6421C30.1749 13.6977 30.7679 13.8156 31.3458 13.9947V13.9858C31.3783 14.0006 31.4031 14.0093 31.4456 14.0244L31.453 14.027C31.4728 14.034 31.4912 14.041 31.5094 14.0479C31.5347 14.0575 31.5596 14.0669 31.5871 14.0759C31.7056 14.1148 31.8165 14.1607 31.9306 14.2079L31.9506 14.2161C32.0032 14.2346 32.0528 14.2575 32.0975 14.2782C32.1119 14.2849 32.1259 14.2913 32.1393 14.2973C32.2336 14.3385 32.3301 14.3874 32.4073 14.4286C32.4588 14.4553 32.509 14.4839 32.556 14.5107C32.5814 14.5252 32.606 14.5392 32.6293 14.5521C32.6677 14.5733 32.7011 14.596 32.7332 14.6178C32.7567 14.6338 32.7795 14.6493 32.803 14.6633C33.1268 14.8725 33.4292 15.1172 33.7026 15.392L33.7123 15.4087C33.813 15.5099 33.9085 15.6167 33.9975 15.7291Z" fill="#E53945"/>
                        <path d="M29.6252 12.3962V16.3356C29.6252 16.8319 29.2225 17.234 28.7252 17.234C28.228 17.234 27.8252 16.8319 27.8252 16.3356V12.4051C27.8207 11.9088 28.2212 11.5034 28.7185 11.5C29.2157 11.4967 29.6219 11.8953 29.6252 12.3917V12.3962Z" fill="#E53945"/>
                        <path d="M20.175 12.4104V16.34C20.175 16.8386 19.7718 17.2428 19.2744 17.2428C18.7771 17.2428 18.375 16.8386 18.375 16.34V12.4104C18.375 11.9119 18.7771 11.5088 19.2744 11.5088C19.7718 11.5088 20.175 11.9119 20.175 12.4104" fill="#E53945"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.75 30.1376V20.4448H35.25V30.1376C35.25 34.3644 32.8895 36.4999 28.2114 36.4999H19.7779C15.1105 36.4999 12.75 34.3644 12.75 30.1376ZM17.8251 25.8334C17.8251 26.4198 18.2865 26.8956 18.8552 26.8956C19.4346 26.8956 19.8959 26.4088 19.8852 25.8223C19.8852 25.2359 19.4238 24.7601 18.8659 24.7601H18.8552C18.2865 24.7601 17.8251 25.247 17.8251 25.8334ZM22.9646 25.8334C22.9646 26.4198 23.4367 26.8956 24.0054 26.8956C24.574 26.8956 25.0354 26.4198 25.0354 25.8223C25.0354 25.247 24.574 24.7712 24.0054 24.7601H23.9946C23.426 24.7712 22.9646 25.247 22.9646 25.8334ZM29.1449 26.8956C28.5762 26.8956 28.1148 26.4198 28.1148 25.8334C28.1148 25.247 28.5655 24.7712 29.1449 24.7712C29.7135 24.7712 30.1749 25.247 30.1749 25.8334C30.1749 26.4198 29.7135 26.8956 29.1449 26.8956ZM29.1449 31.4322C28.5762 31.4322 28.1148 30.9564 28.1041 30.37C28.1041 29.7836 28.5655 29.3078 29.1341 29.3078H29.1449C29.7135 29.3078 30.1749 29.7836 30.1749 30.37C30.1749 30.9564 29.7135 31.4322 29.1449 31.4322ZM24.0054 31.4322C23.4367 31.4322 22.9646 30.9564 22.9646 30.37C22.9646 29.7836 23.426 29.3078 23.9946 29.2967H24.0054C24.574 29.3078 25.0247 29.7836 25.0354 30.3589C25.0354 30.9564 24.574 31.4322 24.0054 31.4322ZM18.8552 31.4322C18.2865 31.4322 17.8251 30.9564 17.8251 30.37C17.8144 29.7836 18.2758 29.2967 18.8552 29.2967C19.4238 29.2967 19.8852 29.7725 19.8852 30.3589C19.8852 30.9454 19.4238 31.4322 18.8552 31.4322Z" fill="#E53945"/>
                    </svg>
                        

                    <div>
                        <p class="event-detail-item-title">{{formatTime(event.date, 'DD MMMM YYYY')}}</p>
                        <p class="event-detail-item-caption">{{formatTime(event.date, "dddd")}}, {{ event.from_time }} - {{event.to_time}}</p>
                    </div>



                        
                </div>

                <div class="event-detail-item">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect opacity="0.12" width="48" height="48" rx="12" fill="#E53945"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.6645 12.671C22.3956 11.0841 25.7525 11.1118 28.458 12.7436C31.1368 14.4086 32.765 17.3802 32.7498 20.5768C32.6874 23.7524 30.9416 26.7375 28.7593 29.0451C27.4998 30.383 26.0908 31.566 24.5611 32.57C24.4035 32.6611 24.2309 32.7221 24.0519 32.75C23.8795 32.7427 23.7116 32.6917 23.5634 32.6018C21.228 31.0932 19.1792 29.1675 17.5154 26.9175C16.1232 25.0392 15.3323 22.77 15.25 20.418C15.2482 17.2153 16.9335 14.2578 19.6645 12.671ZM21.2427 21.7434C21.7021 22.876 22.7865 23.6147 23.9895 23.6147C24.7776 23.6204 25.5352 23.3047 26.0935 22.738C26.6518 22.1713 26.9643 21.4007 26.9616 20.5979C26.9658 19.3725 26.2443 18.2653 25.1341 17.7934C24.0238 17.3215 22.7438 17.5779 21.8916 18.4429C21.0395 19.3079 20.7833 20.6108 21.2427 21.7434Z" fill="#E53945"/>
                        <path opacity="0.4" d="M24 36.5C27.4518 36.5 30.25 35.9404 30.25 35.25C30.25 34.5596 27.4518 34 24 34C20.5482 34 17.75 34.5596 17.75 35.25C17.75 35.9404 20.5482 36.5 24 36.5Z" fill="#E53945"/>
                    </svg>
                        
                        

                    <div>
                        <p class="event-detail-item-title">{{event.business.name}}</p>
                        <p class="event-detail-item-caption">{{event.business.address}}</p>
                    </div>

                    

                        
                </div>


                <div class="about" v-if="event.description">
                    <h2>About Event</h2>
                    <p>{{event.description}}</p>
                </div>


                <div class="bottom">
                    <button @click="triggerBook">Book a Table</button>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'

import moment from 'moment';

export default {
    components: {
        VueTimepicker
    },
    data() {
        return {
            checking: false,
            event: {

            },
            step: 1,
            business: {
                id: 1
            },

            available_spaces:[],

            date: moment(),
            show_book_modal: false,
            chosen_space: {},

            chosen_slot: {}, 

            payload: {
                duration: 1,
                guests: null, 
                from_time: ''

            },
            available_spaces: [],
            spaces: [],

        }
    },
    methods: {
        makePayment() {
            let payload = {...this.payload}
            payload.event_id = this.event.id
            payload.business_id = this.event.business.id;
            payload.date = this.event.date;
            FlutterwaveCheckout({
                    public_key: this.$config.FLW_PUBLIC_KEY || "FLWPUBK_TEST-ad1d316f90548fca239af66bd32bd954-X",
                    tx_ref: `pointsbudreservations_${Date.now()}`,
                    amount: this.event?.deposit_amount || 20000,
                    currency: "NGN",
                    payment_options: "card, banktransfer, ussd",
                    //redirect_url: "https://ae83-102-89-45-99.ngrok.io/api/v1/transactions/verify-flw",
                    meta: {

                        ...payload,
                        //customer_id: this.userDetails.business ? this.userDetails.business.id : this.userDetails.id,
                        //is_business: this.userDetails.business ? 1 : 0
                    },
                    narration: "Reservation on Pointsbud",
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
                        //this.cart_step = 5;
                        //this.payment_status = data.status;
                       // alert(data.status)
                       
                        if (data.status.toLowerCase() === 'successful') {

                            payload = {...payload, ...data};
     
                            //payload.guests = t
                            
                            this.$api.post("/reservations", payload).then(resp => {
                                //this.socketClient.emit("order-paid", { ...payload, business_slug: this.$route.params.slug, ...resp.data.data });
                               // alert("Your reservation has been created thank you");
                                 this.step === 5
                             })
                        }
                       // window.open(`/receipts/${checkout_url}`, "self")
                        //this.$router.push(`/receipts/${checkout_url}`);
                    }
                });
        },
        objectToQueryString(obj) {
            const keyValuePairs = [];
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
                }
            }
            return keyValuePairs.join('&');
        },
        triggerBookTimeSlot(slot) {
           // this.step = 1; // return step just in case
           //this.chosen_space = null
            this.chosen_slot = moment(slot.start).format('hh:mm A');
            this.step++
            //this.show_time_slots_modal  = false;
            
            
        },
        triggerReserveSpace(space) {
            this.chosen_space = space
            this.payload.space_id = space.id
            this.step++;


        },
        checkAvailableSpots() {
            this.checking = true;
            let payload = {...this.payload};
            payload.date = moment(this.event.date).format("YYYY-MM-DD").toString()
            payload.business_id = this.event.business_id || 1;       
            payload.duration = this.payload.duration * 60     
            let query = this.objectToQueryString(payload)
            this.$api.get('/reservations/available-spaces?' + query).then(resp=> {
                const {matches_requested, spaces, available} = resp.data.data;
                
                if (matches_requested && spaces) {

                    this.available_spaces = matches_requested.map(item => ({...item.space, available_slots:item.available_slots }))
                    this.spaces  = spaces.map(item => ({...item.space, available_slots: item.available_slots}));
                    this.step = 2
                }
            }).catch(e=> {

            }).finally(()=> {
                this.checking = false;
            })
        },
        triggerBook(space) {
            this.show_book_modal = true;
        },
        getEvent() {
            //this.$api      
        },
        formatTime(string, output_format, input_format) {
            if (input_format) {

                return moment(string,input_format).format(output_format).toString()
            }
            return moment(string,).format(output_format).toString()

        }
    },

    computed: {
        computedTimeRange() {
            return  ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', 
                 '8a', '9a', '10a', '11a', '12a', '12p', '1p', '2p','3p', '4p','5p', '6p', '7p','8p', '9p', '11p', '12p'];

        },
        canCheckAvailability() {
            if (!this.payload.guests) {
                return false
                //alert(false)
            }
            return true;
        }
    },

    
    async fetch() {
        const response = this.$api.get(`/events?slug=${this.$route.params.slug}&bslug=${this.$route.params.business}`).then(resp=>{
            this.event = resp.data.data;
        })
    }
}
</script>


<style lang="scss" scoped>

.item {
    display: flex !important;
    justify-content: space-between;
    font-size: 14px ; 
    font-weight: 300;

    p {
        font-size: 14px;
        font-weight: 300;
    }
}

.event-item {
    font-size: 15px;
    font-weight: 400;
    padding: 10px 0;
}

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
label {
    font-size: 14px; /* Small enough to pair well with input fields but still readable */
    font-weight: 600; /* Semi-bold for emphasis */
    color: #333333; /* Dark gray for good contrast without being too harsh */
    margin-bottom: 4px; /* Adds some spacing between label and input */
    display: block; 

    @include media("<=t") {
        font-size: 15px;
    }
}

.form-input {
    @include greyforminput;
    margin: 20px 0;

    label {
        font-size: 14px; /* Small enough to pair well with input fields but still readable */
        font-weight: 600; /* Semi-bold for emphasis */
        color: #333333; /* Dark gray for good contrast without being too harsh */
        margin-bottom: 4px; /* Adds some spacing between label and input */
        display: block; 
    }

    p {
        font-size: 16px;
        font-weight: 400;
    }
}
.page {
    max-width: 80%;
    margin: auto;
    position: relative;
    padding-bottom: 120px;

    @include media("<=t") {
        width: 100%;
        max-width: 100%;
    }
}
    .header {
        min-height: 300px;
        background-color: whitesmoke;
       // border-bottom: 1px solid grey;
       background-size: cover;
        &__container {
            padding: 16px;
        }
    }

    .main {
        padding: 16px;
        h1 {
            font-size: 24px;
            font-weight: 600;
            font-family: "Inter", sans-serif !important;
        }
    }

    .event-detail-item {
        display: flex;
        padding: 8px 0;
        gap: 16px;

        &-title {
            font-weight: 500;
            font-size: 16px;
            line-height: 30px;
        }

        &-caption {
            color: $charcoal;
            font-size: 16px;
        }
    }



    .spaces {
        background-color: white;
        display: flex;
        flex-direction: column;
    }

    .space {
        background-color: white;
        display: flex;
        justify-content: space-between;
        padding: 16px;
        align-items: center;
        color: black;
        font-weight: 400;
        font-size: 15px;
        background-color: whitesmoke;
        border-radius: 10px;
        width: 90%;
        margin: auto;
        margin-bottom: 10px;
        button{
            background-color: black;
            color: whitesmoke;
            border-radius: 5px;
            padding: 8px;
        }
    }
.bottom {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    //border: 1px solid grey;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 16px;

    button {
        background-color: $primary;
        color: white;
        padding: 16px;
        height: 60px;
        width: 50%;
        padding: 16px;
        border-radius: 5px;
        margin: auto;
        font-weight: 600;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

        @include media("<=t"){
            width: 90%;
        }

    }
}

.about {
    padding: 24px 0;
}
h2 {
    font-size: 18px !important;
    font-weight: 500;
}


.ctas {
    margin-top: 30px;
    button {
        @include big-btn;
        width: 100%;
        border-radius: 10px;
        background-color: $primary;

        &:disabled {
            background-color: grey;
        }
    }
}

.title {
    font-size: 16px;
    color: black;
    font-weight: 500;
    text-align: center;
    padding: 16px;
    background-color: lightgrey;
    margin-bottom: 20px;
}
</style>