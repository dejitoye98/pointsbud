<template>
    <div class="product">

        <EditProductDetailsForm :show="edit_product_details" :product="product" @close="closeEditDetails"/>
        <EditProductFeaturesForm :show="edit_product_features" :features="productFeatures" :product="product" @close="toggleEditFeatures"/>
        <ProductTabs v-if="product" :params="{id: product_id}"/>


        <div class="">
            <Listing :show_pagination="false" :records="sales" :labels="sales_labels"/>
        </div>

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
            product_id: this.$route.params.id,
            
            sales: [],
            sales_page_info: {},
            sales_labels: {
                "Marketer Name": {
                    type: "text",
                    property: 'marketer.name'
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
            this.$api.get(`/products/` + this.$route.params.id + '/sales').then(resp=> {
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

<style lang="scss" scoped>

.flex-row {
    display: flex !important;
    justify-content: space-between !important;
    flex-wrap: wrap;
    
}
.active {
    border-bottom: 2px solid $lightaccent !important;
    color: $lightaccent !important;
}

.settings {
    padding: 0 24px;

    &__tabs {
        display: flex;
        margin-bottom: 30px;
        //justify-content: space-between;

        &__tab {
            padding: 20px;
            text-align: center;
            color: black;
            cursor: pointer;
            
        }
    }
}
.half {
    display: grid;
    grid-template-columns: 49% 49%;
    justify-content: space-between;
}
.variation {
    padding: 0 16px;
   // border: 0.2px solid $faint;
    &__body {
        
    }
    &__item {
        margin-bottom: 16px;
        display: flex;
        justify-content: space-between;
        &__thumbnail{
            width:30%;
            //height: 300px;
            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }

       

        &__content {
            width: 69%;
            display: grid;
            grid-template-columns: 30% 30% 30%;

        }
        &__meta {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 8px;
            label {
                font-size: 14px;
                color: $charcoal;
                
            }
            p {
                font-size: 14px;
                color: $faint;
                font-weight: 300;
            }
        }
    }
}
.red {
    color: red;
    font-size: 15px;
}
.green-fill {
    background: lightseagreen;

}


.red-fill {
    background: red;
}
.green {
    color: lightseagreen;
    font-size: 15px;
}
.page {
    height: auto;
    background: white;
    border: 0.5px solid rgba(211, 211, 211, 0.24);
    margin-bottom: 30px;
    &__header {
        font-size: 16px;
        padding: 16px;
        display: flex;
        justify-content: space-between;

        &__status {
            display: flex;
            align-items: center;
            //margin-left: 16px;
            font-size: 14px;
            &__indicator {
                width:10px;
                height: 10px;
                border-radius: 50%;;
                margin-right: 8px;;
            }
        }

        &__content {
            display: flex;
            align-items: center;
        }
        &__ctas{
            display: flex;
            justify-content: space-between;

            button {
                @include editbutton;
            }
        }

        
        
    }
    &__content {
        padding: 8px 24px;
        display: grid;
        justify-content: space-between;
        grid-template-columns: 15% 15% 15% 15% 15%;

        &__image {
            padding-bottom: 16px;
            img {
                border-radius: 8px;
                object-fit: cover;
                width: 100%;
                height: 100%;
            }
        }
        &__item {
            //border: 1px solid lightgray;
            font-size: 14px;
            margin-bottom: 16px;
            p {
                font-size: 14px;
                font-weight: 400;
                
                &:last-of-type {
                    //font-weight: 300;
                    color: $faint;

                }
            }
        }
    }
}
</style>
