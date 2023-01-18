<template>
    <div>
        <base-tabs 
            v-if="userContext === 'business' && businessTabs && businessTabs.length > 0"
            :params="params"
            :business_tabs="businessTabs"
            ></base-tabs>
        
    </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
    props: ["params", "campaign"],
    data() {
        return{
          
        }
    },
    created() {
        // get campaign 
        
    },
    computed: {
        ...mapGetters("campaign", ["focusedCampaign"]),
        businessTabs() {
            return [
                {
                    name: 'Reservation Plans',
                    show: true,
                    route: '/dashboard/reservations/plans'

                }, 
                {
                    name: 'All Reservations',
                    show: true,
                    route: '/dashboard/reservations/list'

                }, {
                    name: "Upcoming",
                    show: true,
                    route: '/dashboard/reservations/upcoming'

    
                }, 
                 {
                    name: "New",
                    show: true,
                    route: '/dashboard/reservations/new',
                    updates_tag: "reservations"

    
                }, 
                
                
            ]
        },
        marketerTabs() {
            if (this.focusedCampaign) {
                return [
                        {
                            name: 'All Reservations',
                            show: true,
                            route: '/dashboard/reservations/list'
    
                        }, {
                            name: "Upcoming",
                            show: true,
                            route: '/dashboard/reservations/upco'

            
                        }, 
                        
                        
                    ]
            }
            
        },
        userContext() {
            return window.localStorage.getItem('afContext');
        },
        userDetails() {
            return JSON.parse(window.localStorage.getItem('afUserDetails'));
        },
        canChangePassword() {
            return this.password.old_password && this.password.new_password && this.password.confirm_password && (this.password.new_password === this.password.confirm_password);
        }
    },
}
</script>