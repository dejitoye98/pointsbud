<template>
    <div class="header">

        <MobileSidebar></MobileSidebar>
        <div class="header__container">
            <svg  @click="showMobileNavigation" class="mobile-nav" width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.2246 13C19.2246 13.5523 18.6839 14 18.0169 14L1.71235 14C1.04534 14 0.504612 13.5523 0.504612 13C0.504612 12.4477 1.04534 12 1.71235 12L18.0169 12C18.6839 12 19.2246 12.4477 19.2246 13Z" fill="#343C6A"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.2246 7C19.2246 7.55228 18.759 8 18.1846 8L1.54461 8C0.970236 8 0.504612 7.55228 0.504612 7C0.504612 6.44771 0.970236 6 1.54461 6L18.1846 6C18.759 6 19.2246 6.44772 19.2246 7Z" fill="#343C6A"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.2246 0.999998C19.2246 1.55228 18.6839 2 18.0169 2L1.71235 2C1.04534 2 0.504612 1.55229 0.504612 1C0.504612 0.447719 1.04534 3.94466e-06 1.71235 3.79389e-06L18.0169 -5.07625e-08C18.6839 -2.61145e-07 19.2246 0.447714 19.2246 0.999998Z" fill="#343C6A"/>
            </svg>


            <div class="show-mobile">
                {{dashboard_title}}
            </div>


            <div class="flex-center-y flex-center-x gap-8">

                
                <div class="notification" style="cursor: pointer;" @click="$router.push('/dashboard/notifications')">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9995 3C12.9995 2.44772 12.5518 2 11.9995 2C11.4472 2 10.9995 2.44772 10.9995 3V3.57088C7.6072 4.0561 4.99948 6.97352 4.99948 10.5V15.5L4.28188 16.7558C3.71046 17.7558 4.43251 19 5.58425 19H8.12553C8.56957 20.7252 10.1357 22 11.9995 22C13.8634 22 15.4295 20.7252 15.8735 19H18.4147C19.5664 19 20.2885 17.7558 19.7171 16.7558L18.9995 15.5V10.5C18.9995 6.97354 16.3918 4.05614 12.9995 3.57089V3ZM6.99948 16.0311L6.44584 17H17.5531L16.9995 16.0311V10.5C16.9995 7.73858 14.7609 5.5 11.9995 5.5C9.23805 5.5 6.99948 7.73858 6.99948 10.5V16.0311ZM11.9995 20C11.2592 20 10.6129 19.5978 10.2671 19H13.7319C13.3861 19.5978 12.7398 20 11.9995 20Z" fill="#667085"/>
                    </svg>

                    <div class='badge' v-if="unreadNotifications">{{unreadNotifications}}</div>
                        
                </div>

            
                <div class="profile" style="cursor: pointer;" @click="show_profile_dropdown = !show_profile_dropdown">
                    <div class="profile__image">
                      
                            
                    </div>
                    
                    <div class="profile__name mobile-noshow">
                        {{ userDetails?.first_name + ' ' + userDetails?.last_name }}
                    </div>
                    <div class="profile__dropdown__button mobile-noshow">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 19.1C15.0258 19.1 19.1 15.0258 19.1 10C19.1 4.97421 15.0258 0.9 10 0.9C4.97421 0.9 0.9 4.97421 0.9 10C0.9 15.0258 4.97421 19.1 10 19.1Z" stroke="#5C5C5C" stroke-width="0.2"/>
                            <path d="M10 10.7929L7.73162 8.14645C7.56425 7.95118 7.29289 7.95118 7.12553 8.14645C6.95816 8.34171 6.95816 8.65829 7.12553 8.85355L9.69695 11.8536C9.86432 12.0488 10.1357 12.0488 10.303 11.8536L12.8745 8.85355C13.0418 8.65829 13.0418 8.34171 12.8745 8.14645C12.7071 7.95118 12.4358 7.95118 12.2684 8.14645L10 10.7929Z" fill="#565656"/>
                            <mask id="mask0_860_1377" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="7" y="8" width="6" height="4">
                            <path d="M10 10.7929L7.73162 8.14645C7.56425 7.95118 7.29289 7.95118 7.12553 8.14645C6.95816 8.34171 6.95816 8.65829 7.12553 8.85355L9.69695 11.8536C9.86432 12.0488 10.1357 12.0488 10.303 11.8536L12.8745 8.85355C13.0418 8.65829 13.0418 8.34171 12.8745 8.14645C12.7071 7.95118 12.4358 7.95118 12.2684 8.14645L10 10.7929Z" fill="white"/>
                            </mask>
                            <g mask="url(#mask0_860_1377)">
                            </g>
                            </svg>
                            
                    </div>


                    <div class="profile__dropdown" v-if="show_profile_dropdown">
                        <div class="profile__dropdown__item"  @click="$router.push('/dashboard/settings#Account')">
                            <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.6797 10.9766L17.3906 11.3867C17.4727 11.4141 17.5 11.5234 17.4727 11.6055C17.2812 12.207 16.9805 12.7266 16.5703 13.1914C16.5156 13.2461 16.4062 13.2734 16.3242 13.2188L15.6133 12.8086C15.3125 13.0547 14.9844 13.2734 14.6016 13.3828V14.2031C14.6016 14.3125 14.5469 14.3945 14.4648 14.3945C13.8633 14.5312 13.2617 14.5312 12.6328 14.3945C12.5508 14.3945 12.4961 14.3125 12.4961 14.2031V13.3828C12.1133 13.2734 11.7852 13.0547 11.4844 12.8086L10.7734 13.2188C10.6914 13.2734 10.582 13.2461 10.5273 13.1914C10.1172 12.7266 9.78906 12.207 9.625 11.6055C9.59766 11.5234 9.625 11.4141 9.70703 11.3867L10.418 10.9766C10.3359 10.5938 10.3359 10.1836 10.418 9.80078L9.70703 9.39062C9.625 9.36328 9.59766 9.25391 9.625 9.17188C9.78906 8.57031 10.1172 8.05078 10.5273 7.58594C10.582 7.53125 10.6914 7.50391 10.7734 7.55859L11.4844 7.96875C11.7852 7.72266 12.1133 7.50391 12.4961 7.39453V6.57422C12.4961 6.46484 12.5508 6.38281 12.6328 6.38281C13.2344 6.24609 13.8359 6.24609 14.4648 6.38281C14.5469 6.38281 14.6016 6.46484 14.6016 6.57422V7.39453C14.9844 7.50391 15.3125 7.72266 15.6133 7.96875L16.3242 7.55859C16.4062 7.50391 16.5156 7.53125 16.5703 7.58594C16.9805 8.05078 17.2812 8.57031 17.4727 9.17188C17.5 9.25391 17.4727 9.36328 17.3906 9.39062L16.6797 9.80078C16.7617 10.1836 16.7617 10.5938 16.6797 10.9766ZM13.5625 11.7148C14.2734 11.7148 14.875 11.1133 14.875 10.375C14.875 9.66406 14.2734 9.0625 13.5625 9.0625C12.8242 9.0625 12.2227 9.66406 12.2227 10.375C12.2227 11.1133 12.8242 11.7148 13.5625 11.7148ZM6.125 7.75C4.18359 7.75 2.625 6.19141 2.625 4.25C2.625 2.33594 4.18359 0.75 6.125 0.75C8.03906 0.75 9.625 2.33594 9.625 4.25C9.625 6.19141 8.03906 7.75 6.125 7.75ZM11.6211 13.957V14.2031C11.6211 14.3125 11.6484 14.4219 11.6758 14.5312C11.457 14.668 11.2109 14.75 10.9375 14.75H1.3125C0.574219 14.75 0 14.1758 0 13.4375V12.3164C0 10.293 1.64062 8.625 3.66406 8.625H4.12891C4.73047 8.92578 5.41406 9.0625 6.125 9.0625C6.83594 9.0625 7.49219 8.92578 8.09375 8.625H8.55859C8.66797 8.625 8.77734 8.65234 8.88672 8.67969C8.85938 8.76172 8.80469 8.81641 8.77734 8.89844C8.64062 9.39062 8.83203 9.91016 9.26953 10.1562L9.48828 10.293C9.48828 10.3477 9.48828 10.4297 9.48828 10.4844L9.26953 10.6211C8.83203 10.8672 8.64062 11.3867 8.77734 11.8789C8.99609 12.5625 9.37891 13.2461 9.89844 13.7656C10.0898 13.9844 10.3906 14.1211 10.6641 14.1211C10.8555 14.1211 11.0469 14.0664 11.2109 13.9844L11.4297 13.8477C11.4844 13.875 11.5391 13.9297 11.6211 13.957Z" fill="#FC4904"/>
                                </svg>
                                
                            <p>Manage Account</p>
                        </div>
                        <div class="profile__dropdown__item" @click="$router.push('/dashboard/settings#Security')">
                            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 5.58984C14 8.24219 11.8398 10.375 9.1875 10.375C8.85938 10.375 8.55859 10.3477 8.28516 10.293L7.62891 11.0312C7.49219 11.168 7.32812 11.25 7.13672 11.25H6.125V12.3438C6.125 12.7266 5.82422 13 5.46875 13H4.375V14.0938C4.375 14.4766 4.07422 14.75 3.71875 14.75H0.65625C0.273438 14.75 0 14.4766 0 14.0938V11.9609C0 11.7969 0.0546875 11.6328 0.191406 11.4961L4.59375 7.09375C4.45703 6.60156 4.375 6.10938 4.375 5.5625C4.375 2.91016 6.50781 0.777344 9.16016 0.75C11.8398 0.75 14 2.91016 14 5.58984ZM9.1875 4.25C9.1875 4.98828 9.76172 5.5625 10.5 5.5625C11.2109 5.5625 11.8125 4.98828 11.8125 4.25C11.8125 3.53906 11.2109 2.9375 10.5 2.9375C9.76172 2.9375 9.1875 3.53906 9.1875 4.25Z" fill="#FC4904"/>
                                </svg>
                                
                            <p>Change Password</p>
                        </div>
                        <div class="profile__dropdown__item">
                            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.5898 6.21484L8.99609 10.8086C8.58594 11.2188 7.875 10.9453 7.875 10.3438V7.71875H4.15625C3.77344 7.71875 3.5 7.44531 3.5 7.0625V4.4375C3.5 4.08203 3.77344 3.78125 4.15625 3.78125H7.875V1.15625C7.875 0.582031 8.55859 0.28125 8.99609 0.691406L13.5898 5.28516C13.8359 5.55859 13.8359 5.96875 13.5898 6.21484ZM5.25 10.6719C5.25 10.8633 5.08594 11 4.92188 11H2.625C1.17578 11 0 9.82422 0 8.375V3.125C0 1.67578 1.17578 0.5 2.625 0.5H4.92188C5.08594 0.5 5.25 0.664062 5.25 0.828125V1.92188C5.25 2.11328 5.08594 2.25 4.92188 2.25H2.625C2.13281 2.25 1.75 2.66016 1.75 3.125V8.375C1.75 8.86719 2.13281 9.25 2.625 9.25H4.92188C5.08594 9.25 5.25 9.41406 5.25 9.57812V10.6719Z" fill="#FC4904"/>
                                </svg>
                                
                            <p>Logout</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    computed: {
        ...mapGetters('dashboard', ['dashboard_title', 'show_mobile_navigation', 'notifications']),
        userDetails() {
            const userDetails = window.localStorage.getItem('userDetails');
            if (userDetails) {
                return JSON.parse(userDetails)
            }
            return {}
        },

        unreadNotifications() {
            if (this.notifications) {
                let unread = this.notifications.filter(a=> !a.seen)
                return unread && unread.length  || 0
            }
            
            return 0;
        }
    },
    data() {
        return {
            show_profile_dropdown: false,
        }
    },
    created() {
        this.fetchNotifications()
    },

    methods:{
        fetchNotifications() {
            this.$store.dispatch('dashboard/fetchNotifications');
        },
        showMobileNavigation() {
            this.$store.commit('dashboard/setShowMobileNavigation', true)
        }
    }
}


</script>


<style lang="scss" scoped>

.show-mobile {
    display: none;
    @include media("<=t") {
        display: block;
    }
}

.header {
    width: 100%;
    background-color: white;
    border-bottom: 1px solid #F0F1F3;
    &__container{
        display: flex;
        justify-content: flex-end;
        width: 100%;
        gap: 8px;
        align-items: center;
        padding: 24px;

        @include media('<=t') {
            justify-content: space-between;
            width: 95%;
            margin: auto;
        }

        
    }

    
}


.mobile {
    &-noshow {
        @include media("<=t") {
            display: none;
        }
    }
}

.mobile-nav {
    cursor: pointer;
    @include media('>=t') {
        display: none;
    }
}

.profile {
    display: flex;
    align-items: center;
    gap: 5px;
    position: relative;

    &__image {
        
    }

    &__dropdown {
        position: absolute;
        //bottom: 10px;
        top: 30px;
        left :-100px;
        border-radius: 20px;
        background-color: white;;
        width: 250px;
        box-shadow: rgba(0, 0, 0, 0.041) 0px 4px 6px;


        //widh

        &__item {
            //padding: 16px;
            display: flex;
            //justify-content: space-between;
            align-items: center;
            gap: 16px;
            padding: 10px;
            cursor: pointer;
            &:hover {
                background: whitesmoke;
            }
        }
        
    }
}

.notification {
    position: relative;

    @include media("<=t") {
        display: none;
    }
    
    .badge {
        position: absolute;
        top: 0;
        right: 0;
        border-radius: 50%;
        background-color: red;
        color: white;
        font-size: 12px;
        height: 15px;
        width: 15px;

        display: flex;
        align-items: center;
        justify-content: center;
    }
}

</style>