<template>


    <BaseModal container-width="85%" @close="$emit('close')">
        <template #header>
    
            
            
        </template>
        <template #body>
            <div class="flex-col event-modal-body" v-if="step == 1">
    
    
                    
                    <div>
                        <img  :src="promotion.thumbnail">
                    </div>
        
                    <div class="form-group padding-16">
                        
                        
                        <div class="ctas flex-col gap-4">
                            <button @click="clickedCTA(cta.text)" v-for="(cta, index) in ctas" :key="index" :style="{'background-color': cta.button_background}">
                                {{ cta.text }}
                            </button>
                            <button class="remind" @click="triggerSetReminder" v-if="promotion.allow_reminder" >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 21H14C14 22.1 13.1 23 12 23C10.9 23 10 22.1 10 21ZM21 19V20H3V19L5 17V11C5 7.9 7 5.2 10 4.3V4C10 2.9 10.9 2 12 2C13.1 2 14 2.9 14 4V4.3C17 5.2 19 7.9 19 11V17L21 19ZM17 11C17 8.2 14.8 6 12 6C9.2 6 7 8.2 7 11V18H17V11Z" fill="white"/>
                                </svg>
                                <span>
        
                                    Set Reminder
                                </span>
                            </button>
                            <button class="reserve" v-if="promotion.allow_reservation">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 4H17V3C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2C15.7348 2 15.4804 2.10536 15.2929 2.29289C15.1054 2.48043 15 2.73478 15 3V4H9V3C9 2.73478 8.89464 2.48043 8.70711 2.29289C8.51957 2.10536 8.26522 2 8 2C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3V4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7956 4 19 4ZM20 19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V12H20V19ZM20 10H4V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H7V7C7 7.26522 7.10536 7.51957 7.29289 7.70711C7.48043 7.89464 7.73478 8 8 8C8.26522 8 8.51957 7.89464 8.70711 7.70711C8.89464 7.51957 9 7.26522 9 7V6H15V7C15 7.26522 15.1054 7.51957 15.2929 7.70711C15.4804 7.89464 15.7348 8 16 8C16.2652 8 16.5196 7.89464 16.7071 7.70711C16.8946 7.51957 17 7.26522 17 7V6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7V10Z" fill="black"/>
                                    </svg>
                                    
        
                                    <span>
        
                                        Make Reservation
                                    </span>
                            </button>
                            <button class="close" @click="notInterested">
                                            <svg @click="$emit('close')" style="cursor: pointer;" width="16" height="16" viewBox="0 0 8 8" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L7 7" stroke="white" stroke-width="0.5" stroke-linecap="round" />
                                        <path d="M7 1L1 7" stroke="white" stroke-width="0.5" stroke-linecap="round" />
                                    </svg>
        
                                    <span> 
                    
                                        Minimize
                                    </span>
                             </button>
                        </div>
                        
        
                        
                    </div>
    
               
            </div>
            <div v-else>
                <div class="reminder">
                    <div class="reminder__header flex space-between">
                        <div>
    
                            <p class="title">
        
                                Set a reminder
                            </p>
                            <p class="caption">{{promotion.title}}</p>
                        </div>
    
                        <div class="close">
                            <svg @click="$emit('close')" style="cursor: pointer;" width="16" height="16" viewBox="0 0 8 8" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L7 7" stroke="black" stroke-width="0.5" stroke-linecap="round" />
                        <path d="M7 1L1 7" stroke="black" stroke-width="0.5" stroke-linecap="round" />
                    </svg>
                        </div>
                        
                    </div>
    
                    <div class="reminder__body">
    
                        <template v-if="!reminder_set">
    
    
                            <div class="form-input" v-if="user_identifier==='email'">
        
                                <div class="space-between">
        
                                    <label for="">Your email</label>
        
                                    <span style="color: #E53945; cursor:pointer" @click="user_identifier = 'phone'">use phone</span>
                                </div>
                                <input type="text" v-model="payload.email">
                            </div>
        
                            <div class="form-input" v-else-if="user_identifier === 'phone'">
                                <div class="space-between">
        
                                    <label for="">Your phone</label>
                                    <span style="color: #E53945; cursor:pointers" @click="user_identifier = 'email'">use email</span>
        
                                </div>
        
                                <vue-tel-input v-model="payload.phone" type="number" inputmode="numeric" autocomplete="off"></vue-tel-input>
        
                            </div>
        
        
                            <div class="cta" v-if="!loading">
                                <button @click="setReminder" :disabled="loading" class="big-btn full-width" style="width: 100%;">Set Reminder</button>
                            </div>
        
                            <div class="padding-16 flex-center-x flex-center-y" v-else>
                                <LoadingState></LoadingState>
                            </div>
                        </template>
    
                        <template v-else>
                            <div class="padding-16 flex-center-x flex-center-y">
                                <p>Reminder set!</p>
                            </div>
                        </template>
                       
                    </div>
                </div>
            </div>
    
    
        </template>
    </BaseModal>
    </template>
    
    <script>
    import mixpanel from 'mixpanel-browser';
    
    export default {
        props: ['promotion', 'device_id', 'mixpanel', 'show', 'promotions'],
        created() {
            this.mx = mixpanel.init('1f580add8d0558ccae5fc19ca5997dab', { debug: false, track_pageview: false });
        },
        data() {
            return {
                mx: {},
                step: 1,
                payload: {
                    business_id: '',
                },
                user_identifier: "phone",
                loading: false,
                reminder_set: false,
            }
        }, 
        computed: {
            ctas() {
                if (this.promotion && this.promotion.ctas) {
                    return JSON.parse(this.promotion.ctas)
                }else {
                    return []
                }
            }
        },
        methods: {
            clickedCTA(text) {
               this.mx.track("Clicked Event CTA: " + text)
            },
            triggerSetReminder() {
                this.step = 2
            },
            notInterested() {
                this.createRSVP({not_interested: 1});
                this.$emit('close');
                //this.$store.commit('qrmenu/setMinimizePromotion', true)
            },
            createRSVP(payload) {
                payload.customer_id = this.device_id;
                payload.business_id = this.promotion.business_id;
                this.$api.post(`/promotions/${this.promotion.id}/rsvp`, {...this.payload, ...payload})
            },
            setReminder() {
                this.payload.business_id = this.promotion.business_id;
                this.loading = true;
                this.$api.post(`/promotions/${this.promotion.id}/reminder`, this.payload).then(resp=> {
                    this.reminder_set = true;
                }).finally(()=> {
                    this.loading = false;
                })
            }
        }
    }</script>
    
    
    <style lang="scss" scoped>
    * {
        &:deep(.modal__mask) {
            background: rgba(255, 255, 255, 0.868) !important;
        }
        &:deep(.modal__body) {
            background: transparent !important;
        }
        &:deep(.modal__container) {
            background: transparent !important;
        }
        &:deep(.modal__footer) {
            background: transparent !important;
        }
        font-family: "Open Sans", sans-serif;
    }
    
    .form-input {
        @include greyforminput;
    }
    
    .close-button {
        background-color: red;
        color: white;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
    
    .ctas {
        display: flex-column;
        justify-content: space-between;
    
        button {
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
    
            &:hover {
                filter: grayscale(1);
            }
        }
        .remind {
                background-color: $primary;
            }
        .reserve {
            background-color: $secondaryaccent;
            color: white;
        }
        .close {
            background-color: red;
    
        }
    }
    
    .reminder {
    
        &__header {
            padding: 8px 0;
            border-bottom: 1px solid whitesmoke;
            margin-bottom: 40px;
            font-family: Poppins, sans-serif !important;
        }
    
        .title {
            font-weight: 600;
    
        }
        .caption {
            font-weight: 300;
            font-size: 12px;
        }
        padding: 20px;
        padding-bottom: 60px;
        border: 1px solid lightgray;
        background: white !important;
    }
    </style>