<template>
    <div class="product">
        <div class="settings__tabs">
            <div v-for="tab in tabs" class="settings__tabs__tab" :class="[activeTab == tab ? 'active' : '']" :key="tab" @click="activateTab(tab)">{{tab}}</div>
        </div>

        <div v-if="activeTab === 'Info'">
                        <div class="page" v-if="product">
                            <div class="page__header">
                                    <div class="page__header__content"> 

                                        <div class="page__header__status">
                                            <div class="page__header__status__indicator green-fill" v-if="details.is_active"></div>
                                            <div class="page__header__status__indicator red-fill" v-else></div>

                                            <p class="red" v-if="details.out_of_stock">Out of Stock</p>
                                            <p class="green" v-else>Available</p>

                                        </div>
                                    </div>
                                <div class="page__header__ctas">
                                    <button>Edit</button>
                                </div>
                            </div>

                            <div class="page__content">
                                <div class="page__content__item">
                                    <p>Name</p>
                                    <p>{{product.name}}</p>
                                </div>
                                <div class="page__content__item">
                                    <p>Description</p>
                                    <p>{{product.description}}</p>
                                </div>
                                <div class="page__content__item">
                                    <p>Units Sold</p>
                                    <p>{{product.sales}}</p>
                                </div>
                                <div class="page__content__item">
                                    <p>Sales Amount</p>
                                    <p>{{product.sales_amount}}</p>
                                </div>
                                <div class="page__content__item">
                                    <p>Unit Price</p>
                                    <p>{{product.currency}}{{product.unitprice}}</p>
                                </div>
                                <div class="page__content__item">
                                    <p>Quantity Available</p>
                                    <p>{{product.qty}}</p>
                                </div>
                                
                                <div class="page__content__item">
                                    <p>Quantity Per Unit</p>
                                    <p>{{product.qty_per_unit}}</p>
                                </div>
                                <div class="page__content__item">
                                    <p>Marketer Commission</p>
                                    <p>{{product.marketer_commission}}</p>
                                </div>
                                <div class="page__content__item">
                                    <p>Discount </p>
                                    <p>{{product.discount}}%</p>
                                </div>
                                
                            
                                
                            </div>
                        </div>

                        <div class="half">

                            <div class="page">
                                <div class="page__header">
                                    <div class="page__header__content"> 

                                        <div class="page__header__status">
                                            <p class="">Images</p>
                                        </div>
                                    </div>
                                
                                </div>

                                <div class="page__content" >
                                    <div class="page__content__image" v-for="(image, index) in productImages" :key="index">
                                        <img :src="image" alt="">
                                    </div>                               
                                </div>
                            </div>
                            <div class="page" v-if="productFeatures">
                                <div class="page__header">
                                        <div class="page__header__content"> 

                                            <div class="page__header__status">
                                                <p>Product Features</p>
                                            </div>
                                        </div>
                                    <div class="page__header__ctas">
                                        <button>Edit</button>
                                    </div>
                                </div>

                                <div class="page__content">
                                    <div class="page__content__item">
                                        <p>Name</p>
                                        <p>Cruise in Two Cities</p>
                                    </div>
                                    <div class="page__content__item">
                                        <p>Description</p>
                                        <p>We are gooing to the new way bitch</p>
                                    </div>
                                    <div class="page__content__item">
                                        <p>Unit Price</p>
                                        <p>NGN 50</p>
                                    </div>
                                    <div class="page__content__item">
                                        <p>Quantity Available</p>
                                        <p>200</p>
                                    </div>
                                    
                                    <div class="page__content__item">
                                        <p>Quantity Per Unit</p>
                                        <p>2</p>
                                    </div>
                                    <div class="page__content__item">
                                        <p>Marketer Commission</p>
                                        <p>14</p>
                                    </div>
                                    <div class="page__content__item">
                                        <p>Discount </p>
                                        <p>14%</p>
                                    </div>
                                    
                                
                                    
                                </div>
                            </div>
                        </div>
                        
                        <div class="half">

                            <div class="page">
                                <div class="page__header">
                                        <div class="page__header__content"> 

                                            <div class="page__header__status">
                                                <p>Variations</p>
                                            </div>
                                        </div>
                                    <div class="page__header__ctas">
                                        <button>Edit</button>
                                    </div>
                                </div>

                                <div class="variation" v-if="productVariationDetails">
                                    <div class="variation__body">
                                        <div class="variation__item">
                                            <div class="variation__item__thumbnail">
                                                <img src="../../../static/events.jpg" alt="">

                                            </div>
                                            <div class="variation__item__content">
                                                <div class="variation__item__meta">
                                                    <label for="">Size</label>
                                                <p>XXL</p>
                                                </div>
                                                <div class="variation__item__meta">
                                                    <label for="">Size</label>
                                                <p>XX</p>
                                                </div>
                                                <div class="variation__item__meta">
                                                    <label for="">Size</label>
                                                <p>XX</p>
                                                </div>
                                                <div class="variation__item__meta">
                                                    <label for="">Size</label>
                                                <p>XX</p>
                                                </div>
                                                <div class="variation__item__meta">
                                                    <label for="">Size</label>
                                                <p>XX</p>
                                                </div>
                                                <div class="variation__item__meta">
                                                    <label for="">Size</label>
                                                <p>XV</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="variation__item">
                                            <div class="variation__item__thumbnail">
                                                <img src="../../../static/events.jpg" alt="">

                                            </div>
                                            <div class="variation__item__content">
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="page">
                                <div class="page__header">
                                        <div class="page__header__content"> 

                                            <div class="page__header__status">
                                                <p>Delivery Details</p>
                                            </div>
                                        </div>
                                    <div class="page__header__ctas">
                                        <button>Edit</button>
                                    </div>
                                </div>

                                <div class="page__content"  v-if="productDeliveryDetails">
                                    <div class="page__content__item">
                                        <p>Name</p>
                                        <p>Cruise in Two Cities</p>
                                    </div>
                                    <div class="page__content__item">
                                        <p>Description</p>
                                        <p>We are gooing to the new way bitch</p>
                                    </div>
                                    <div class="page__content__item">
                                        <p>Unit Price</p>
                                        <p>NGN 50</p>
                                    </div>
                                    <div class="page__content__item">
                                        <p>Quantity Available</p>
                                        <p>200</p>
                                    </div>
                                    
                                    <div class="page__content__item">
                                        <p>Quantity Per Unit</p>
                                        <p>2</p>
                                    </div>
                                    <div class="page__content__item">
                                        <p>Marketer Commission</p>
                                        <p>14</p>
                                    </div>
                                    <div class="page__content__item">
                                        <p>Discount </p>
                                        <p>14%</p>
                                    </div>
                                    
                                
                                    
                                </div>
                            </div>
                        </div>
        </div>


        <div class="" v-else-if="activeTab === 'Orders'">

        </div>

        <div class="" v-else-if="activeTab === 'Sales'">
            <Listing/>
        </div>

    </div>
</template>


<script>
import {mapGetters} from "vuex";
import Listing from '../../../components/Listing'
export default {
    layout: 'dashboard',
    components: {
        Listing
    },
    data() {
        return {
            activeTab: 'Info',
            tabs: ["Info", "Orders", "Sales"],
            product: {},
            details: {
                out_of_stock: true
            }
        }
    },
    created() {
        this.$store.commit('dashboard/setDashboardTitle', 'Product - ' + this.$route.params.id)
        this.getProduct()
    },
    methods: {
        activateTab(tab) { 
            let previousTab = this.activeTab;
            this.$store.commit('dashboard/setDashboardTitle', "Product - " + this.$route.params.id)

            this.activeTab = tab;
            // title 
            let title = this.dashboardTitle;
            title = title  + " / " + tab;


            this.$store.commit('dashboard/setDashboardTitle', title)
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
        marketerCommission() {
            if (this.product) {
                if (this.product.marketer_commission.type === 'percent') {
                    return this.product.marketer_commission + ' %';

                }
                else {
                    return this.product.marketer_commission + ' flat'
                }
            }
        },
        productImages() {
            return this.product.images && JSON.parse(this.product.images)
        },
        productFeatures() {
            return this.product.meta && JSON.parse(this.product.images)
        },
        productVariationDetails() {
            return this.product.variation_details && JSON.parse(this.product.variation_details).length && JSON.parse(this.product.variation_details)
        },
        productDeliveryDetails() {
            return this.product.delivery_details && JSON.parse(this.product.delivery_details).length > 0 && JSON.parse(this.product.delivery_details)
        },

    }
    
}
</script>

<style lang="scss" scoped>

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