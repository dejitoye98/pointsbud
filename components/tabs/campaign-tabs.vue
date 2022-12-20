<template>
    <div>
        <base-tabs 
            v-if="userContext === 'business' && businessTabs && businessTabs.length > 0"
            :params="params"
            :business_tabs="businessTabs"
            ></base-tabs>
        <base-tabs 
            v-else
            :params="params"
            :marketer_tabs="marketerTabs"
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
            if (this.focusedCampaign) {

                return [{
                    name: 'Overview',
                    show: true,
                    route: '/dashboard/campaigns/:id'
    
                }, {
                    name:"Products",
                    show: this.focusedCampaign && this.focusedCampaign.purpose && this.focusedCampaign.purpose === 'sales',
                    route: '/dashboard/campaigns/:id/products'
    
                }, {
                    name: "Marketers",
                    show: true,
                    route: '/dashboard/campaigns/:id/marketers'
    
                }, {
                    name: "Links",
                    show: true,
                    route: '/dashboard/campaigns/:id/links'
    
                }]
            }else {
                
            }
        },
        marketerTabs() {
            if (this.focusedCampaign) {
                return [
                        {
                            name: 'Overview',
                            show: true,
                            route: '/dashboard/campaigns/:id'
    
                        }, {
                            name:"Products",
                            show: this.focusedCampaign && this.focusedCampaign.purpose && this.focusedCampaign.purpose === 'sales',
                            route: '/dashboard/campaigns/:id/products'
            
                        }, 
                        {
                            name:"Your Sales",
                            show: this.focusedCampaign && this.focusedCampaign.purpose && this.focusedCampaign.purpose === 'sales',
                            route: '/dashboard/campaigns/:id/your-sales'
            
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