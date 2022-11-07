<template>
    <div class="products">
        <div class="products__container">
            <div class="products__header">
                <p>Products</p>
            </div>
            <div class="products__body">
                <div class="product" @click="goToProduct(product)" v-for="product in products" :key="product.id">
                    <div class="product__container">
                        <div class="product__thumbnail">
                            <img :src="product.thumbnail" alt="">
                        </div>
                        <div class="product__details">
                            <p class="out-of-stock">Out of Stock</p>
                            <div class="product__title">
                                <p>{{product.name}}</p>
                            </div>
                            <div class="product__description">
                                <p>{{product.description}}</p>
                            </div>
                        </div>
                       
                       <div class="product__meta">
                           <div class="product__meta__item">
                               <label for=""> Sales</label>
                               <p> {{product.sales || 0}}</p>
                           </div>
                           <div class="product__meta__item">
                               <label for="">Unit Price</label>
                                <p> {{product.currency}} {{product.unitprice}}</p>
                           </div>
                           <div class="product__meta__item">
                               <label for="">Quantity</label>
                                <p>{{product.qty}}</p>
                           </div>
                           
                           <div class="product__meta__item">
                               <label for="">Commisson</label>
                               <p>{{productCommission(product)}}</p>
                           </div>
                           
                       </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>


<script>
export default {
    props: ['campaign_id'],
    created() {
        this.getProducts()
    },
    data() {
        return {
            products: []
        }
    },

    methods: {
        goToProduct(product) {
            this.$router.push('/dashboard/products/' + product.id)
        },
        getProducts() {
            this.$api.get('/products?campaign_id=' + this.campaign_id)
                .then(resp => {
                    this.products = resp.data.data.list;
                })
                .catch(err=> {
                    //this.
                })
        },
        productCommission(product) {
            let suffix = ''
            if (!product.marketer_commission_type || product && product.marketer_commission_type === 'percent') {
                return product.marketer_commission + ' ' + '%'
            }
            return product.currency + ' ' + product.marketer_commission
        }
    },
    computed: {
        
    }
    
}
</script>


<style lang="scss" scoped>
.out-of-stock {
    color: red;
    font-size: 13px;
    font-weight: 300;
}
.available {
    color: lightseagreen;
    font-size: 13px;
    font-weight: 300;
}
.products {
    background: white;

    &__header {
        padding: 8px 16px;
        p {
            font-size: 16px;
            color: $charcoal;
        }
    }
}

.product {
    cursor: pointer;
    background: white;
    border: 0.2px solid rgba(211, 211, 211, 0.151);
    border-left: 0;
    border-right: 0;

    &__container {
        padding: 16px;
        display: grid;
        grid-template-columns: 10% 60% 30% ;
        
    }

    &__meta {
        display: grid;
        grid-template-columns: 50% 50%;
        border: 0.2px solid rgba(211, 211, 211, 0.151);
        border-left: 0;

        &__item {
            padding: 8px 16px;
        

            label {
                color: $charcoal;
                font-size: 15px;
            }

            p {
                color: $faint;
                font-size: 14px;
                font-weight: 300;
            }
        }
    }



    &__details {
        width:100%;
        padding-left: 16px;
        padding-right: 16px;
        border-right: 0.5px solid rgba(211, 211, 211, 0.221);
    }
    &__description {
        color: $charcoal;
        font-size: 15px;
        max-height: 95px;
        overflow-y: hidden;
        text-align: justify;
        font-weight: 300;
    }
     &__title {
        color: $charcoal;
        font-size: 18px;
        font-weight: 600;
    }
    &__thumbnail {
        width: 100%;
        height: 100%;
            
        img {
            object-fit: cover;
            height: 100%;
            width: 100%;
        }
    
    }
}
</style>