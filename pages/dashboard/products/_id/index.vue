<template>
    <div class="product">

        <EditProductDetailsForm :show="edit_product_details" :product="product" @close="closeEditDetails"/>
        <EditDeliveryDetailsForm :show="edit_product_delivery_details" :details="productDeliveryDetails" :product="product" @close="toggleEditDeliveryDetails"/>
        <EditProductFeaturesForm :show="edit_product_features" :features="productFeatures" :product="product" @close="toggleEditFeatures"/>
        <EditVariationDetailsForm :show="edit_product_variations" :details="productVariationDetails" :product="product" @close="toggleEditVariationDetails"/>
        <EditProductImagesForm :show="edit_product_images"  :images="productImages" :product="product" @close="toggleEditProductImages"/>
        
        <!--- share modal -->
        
        <ShareCampaignLinkModal :advert_note='product.advert_note' :link="marketer_link" v-if="show_share_modal" @close="show_share_modal=false"/>
    

        <!--
        <Modal title="Share Product" v-if="show_share_modal" @close="show_share_modal = false">
            
            <div class="share-product">
                <div class="share-product__detail">
                        <label>Advert Note</label>
                    <div class="share-product__detail__flex">
                        
                        <div class="share-product__detail__field">{{product.advert_note}}</div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                                            
                </div>
                
                
                <div class="share-product__detail">
                    <label for="URL">Your Link</label>
                    <div class="share-product__detail__flex">

                        <div class="share-product__detail__field share-product__detail__field--url">https://www.something.com/serwer</div>
                        
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                    </div>
                   
                </div>
            </div>
            
        </Modal> -->
        
        
        
        <ProductTabs v-if="product" :params="{id: product_id}"/>
        <div>
            <div class="mobile-share" @click="show_share_modal=true">
                <div class="mobile-share__container">
                    <div class="class">

                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.51002 2.23001L16.07 6.51001C19.91 8.43001 19.91 11.57 16.07 13.49L7.51002 17.77C1.75002 20.65 -0.59998 18.29 2.28002 12.54L3.15002 10.81C3.37002 10.37 3.37002 9.64001 3.15002 9.20001L2.28002 7.46001C-0.59998 1.71001 1.76002 -0.649988 7.51002 2.23001Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                    </div>
                </div>
            </div>
            <div class="section-title">
                Overview
            </div>

            <template v-if="!loading">
                <div class="page" v-if="product">
                    <div class="page__header">
                            <div class="page__header__content"> 

                                <div class="page__header__status">
                                    <div class="page__header__status__indicator green-fill" v-if="!product.out_of_stock"></div>
                                    <div class="page__header__status__indicator red-fill" v-else></div>

                                    <p class="red" v-if="product.out_of_stock">Out of Stock</p>
                                    <p class="green" v-else>Available</p>

                                </div>
                            </div>
                        <div class="page__header__ctas" v-if="userContext === 'business'">
                            <button @click="triggerEditDetails">Edit</button>
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
                            <p>Advert Note</p>
                            <p>{{product.advert_note}}</p>
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
                            <div class="page__header__ctas">
                                <button @click="toggleEditProductImages"  v-if="userContext === 'business'">Edit</button>
                            </div>
                        
                        </div>

                        <div class="page__content page__content--images" >
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
                                <button @click="toggleEditFeatures" v-if="userContext === 'business'">Edit</button>
                            </div>
                        </div>

                        <div class="page__content flex-row">
                            <div class="page__content__item" v-for="(f, index) in productFeatures" :key="index">
                                <p>{{f}}  &middot; </p>
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
                                <button @click="toggleEditVariationDetails" v-if="userContext === 'business'">Edit</button>
                            </div>
                        </div>

                        <div class="variation" v-if="productVariationDetails">
                            <div class="variation__body" v-for="(detail, index) in productVariationDetails" :key="index">
                                <div class="variation__item">
                                    <div class="variation__item__thumbnail">
                                        <img :src="detail.images[0]" alt="">

                                    </div>
                                    <div class="variation__item__content">
                                            <div class="variation__item__meta">
                                                <label for="">Name</label>
                                            <p>{{detail.name}}</p>
                                            </div>
                                            <div class="variation__item__meta">
                                                <label for="">Quantity</label>
                                                <p>{{detail.qty}}</p>
                                            </div>
                                        
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
                                <button @click="toggleEditDeliveryDetails" v-if="userContext === 'business'">Edit</button>
                            </div>
                        </div>

                        <div class="page__content"  v-if="productDeliveryDetails">
                            <div class="page__content__item" v-for="(detail, index) in productDeliveryDetails" :key="index">
                                <p>{{detail.name}}</p>
                                <p>{{detail.value}}</p>
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
            </template>

            <template v-else>
                <LoadingState/>
            </template>
        </div>


        

    </div>
</template>


<script>
import {mapGetters} from "vuex";
import EditProductDetailsForm from '../../../../components/forms/EditProductDetailsForm'
import EditProductFeaturesForm from '../../../../components/forms/EditProductFeaturesForm'

export default {
    layout: 'dashboard',
    components: {
        EditProductDetailsForm,
        EditProductFeaturesForm,
    },
    data() {
        return {
            show_share_modal: false,
            edit_product_images: false,
            edit_product_variations: false,
            edit_product_details: false,
            edit_product_features: false,
            edit_product_delivery_details: false,
            product: {},
            product_id: this.$route.params.id,
            details: {
                out_of_stock: true
            },
            loading: true,
            marketer_link: ''
            
        }
    },
    watch: {
        
        
    },
    created() {
        this.$store.commit('dashboard/setDashboardTitle', 'Product - ' + this.$route.params.id)
        this.getProduct().then(resp=> {
            this.getMarketerLink()
        })
    },
    methods: {
        toggleEditProductImages() {
            this.edit_product_images = !this.edit_product_images;
        },
        toggleEditVariationDetails(){
            this.edit_product_variations = !this.edit_product_variations
        },
        toggleEditFeatures() {
            this.edit_product_features = !this.edit_product_features
            if (!this.edit_product_features) {
                this.getProduct()
            }
        },
        toggleEditDeliveryDetails() {
            this.edit_product_delivery_details = !this.edit_product_delivery_details;
            //if (!this.n)
        },
        triggerEditDetails() {
            this.edit_product_details = true;
        },
        closeEditDetails() {
            this.getProduct()
            this.edit_product_details = false;
        },
        getProduct() {
            return  this.$api.get(`/products/` + this.$route.params.id)
                .then(resp=> {
                    this.product = resp.data.data
                }).catch(e=> {


                }).finally(() => {
                    this.loading = false;
                })
        },
        getMarketerLink() {

            if (this.product && this.product.id) {
                
                this.$api.get(`/links?product_id=${this.product.id}`).then(resp=> {
                    const link = resp.data.data.redir_links[0] && resp.data.data.redir_links[0].redir_link;
                    const host = resp.data.data.redir_links[0].host;
                    this.marketer_link = host || 'afflee.com/' + link;

                })
            }
        }
    },
    computed: {
        ...mapGetters("dashboard", ["dashboardTitle",]),

        
        userContext() {
            return window.localStorage.getItem('afContext')
        },
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
            return this.product.meta && JSON.parse(this.product.meta)
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

.share-product {
    
    &__detail {
        margin-bottom: 16px;
        
        label {
            font-size: 13px;
            color: $charcoal;
            
        }

        &__field {
            background: #e3a09e05;
            padding: 8px;
            font-size: 13px;
            color: $charcoal;
            border-radius: 10px;
            border: 0.5px solid #36454f16;
            width: 100%;
            margin-right: 16px;

            &--url {
                background: #e3a09e05;
                padding: 8px;
                border: 0.5px solid #36454f16;
                font-size: 13px;
                border-radius: 10px;
                max-height: 50px;
                width:100% !important;
                margin-right: 16px;
            }

            svg {
                cursor: pointer;
            }
        }


        &__flex {
            display: flex;
            width: 100%;
            align-items: center;
        }
    }
}

.mobile-share{
    position: fixed;
    background: $primary;
    cursor: pointer;
    right: 5px;
    bottom: 5px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    box-shadow: 2px 2px 2px #888888;


    &__container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
}

.section-title {
    font-size: 18px;
    margin-bottom: 8px;
    color: darkgrey;
    background: transparent !important;

    margin-top: 50px;
}
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
    @include media("<=dashbreak") {
        grid-template-columns: 100%;
        justify-content: space-between;
    }
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
            display: grid;
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
        grid-template-columns: 24% 24% 24% 24%;
        @include media("<=dashbreak") {
            grid-template-columns: 49% 49%;
            //justify-content: space-between;
        }

        &--images {
            @include media("<=dashbreak") {
                grid-template-columns: 30% 30% 30%;
            }
        }

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