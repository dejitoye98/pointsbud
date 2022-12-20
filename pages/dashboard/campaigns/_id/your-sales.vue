<template>
    <div class="">
         <CampaignTabs :params="{id: campaign_id}"/>
        <Listing :show_pagination="false" :records="sales" :labels="sales_labels"/>
    </div>

</template>


<script>
import {mapGetters} from "vuex";
import Listing from '../../../../components/Listing'
import EditProductDetailsForm from '../../../../components/forms/EditProductDetailsForm'
import EditProductFeaturesForm from '../../../../components/forms/EditProductFeaturesForm'

export default {
    layout: 'dashboard',
    components: {
        Listing,
        EditProductDetailsForm,
        EditProductFeaturesForm,
    },
    data() {
        return {
        
            product: {},
            
            details: {
                out_of_stock: true
            },
            campaign_id: this.$route.params.id,
            
            sales: [],
            sales_page_info: {},
            sales_labels: {
                "Link": {
                    type: "text",
                    property: 'redir_link.redir_link'
                },
                "Amount Paid": {
                    type: "money",
                    property: "pay_amount"
                },
                "Amount Received": {
                    type: "money",
                    property: "receive_amount"
                },
                "Qty": {
                    type: "money",
                    property: "order.qty"
                },
                "Customer": {
                    type: 'text',
                    property: "order.unique_field_value"
                }
            }
            
        }
    },
    watch: {
        
        
    },
    created() {
        this.$store.commit('dashboard/setDashboardTitle', 'Product - ' + this.$route.params.id)
        this.getSales()
    },
    methods: {
       
        getSales() {
            this.$api.get(`/campaigns/` + this.$route.params.id + '/sales').then(resp=> {
                this.sales= resp.data.data.list;
                this.sales_page_info = resp.data.data.page_info;
            }).catch(err=> {

            })
        },
        
        getProduct() {
            this.$api.get(`/products/` + this.$route.params.id)
                .then(resp=> {
                    this.product = resp.data.data
                }).catch(e=> {


                })
        }
    },
    computed: {
        ...mapGetters("dashboard", ["dashboardTitle",]),

    }
    
}
</script>
