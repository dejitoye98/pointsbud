<template>
    <div class="page" v-if="pending_sale">
        <div class="flex justify-center">
            <Logo></Logo>
        </div>
        <div class="page__container">

            <div class="status">
               Payment Successful
            </div>
            <!--<button @click="share" style="margin-bottom: 16px;">Share Receipt with Vendor</button>-->
            
            <div class="card">
                <div class="card__container">
                    <div class="card__header">
                        Order {{ $route.params.slug }}
                    </div>

                    <div class="card__section">
                        <div class="card__section">
                            <p class="card__section__header">
                            </p>

                            <div class="item" v-for="(item, index) in cart" :key="index">
                                <div class="">

                                    <p>{{item.name}} * {{item.quantity}}</p>
                                    
                                    <p v-if="item.pack">+{{item.pack.name}}</p>
                                
                                </div>
                                <p>{{item.currency | currencySymbol}}{{item.unitprice * item.quantity | money}}</p>
                                <p v-if="item.pack">{{item.pack.unitprice}}</p>

                            </div>
                        </div>
                    </div>

                    <div class="card__section">
                           <p class="card__section__header">
                                <!--Pricing Details-->
                            </p>

                            <div class="space-between">
                                <div class="">

                                    <p>Delivery Fee</p>
                                
                                </div>
                                <p v-if="deliveryMeta.delivery_fee">{{"NGN" | currencySymbol }}{{deliveryMeta.delivery_fee| money}}</p>
                                <p v-else>{{"NGN" | currencySymbol }} {{ 0}}</p>
                            </div>
                            <div class="space-between">
                                <div>

                                    <p>Taxes</p>
                                
                                </div>
                                <p v-if="pending_sale.taxes">{{"NGN" | currencySymbol }} {{pending_sale.taxes| money}}</p>
                                <p v-else>{{"NGN" | currencySymbol }} {{ 0}}</p>                            
                            </div>
                            <div class="space-between">
                                <div class="">

                                    <p>Service Fee</p>
                                
                                </div>
                                <p v-if="pending_sale.appFee">{{"NGN" | currencySymbol }} {{pending_sale.appFee| money}}</p>
                                <p v-else>{{"NGN" | currencySymbol }} {{0}}</p>
                            </div>
                    </div>

                    <div class="card__section">
                        <div class="space-between">
                            <p class="bold">Total</p>
                            <p class="bold">{{"NGN" | currencySymbol}} {{pending_sale.total_amount | money }}</p>
                        </div>
                    </div>

                </div>
            </div>

            <div class="card" style="display: none;">
                <div class="container">
                    <div class="card__section">
                        <div class="card__section">
                            <p class="card__section__header">
                                Delivery Details
                            </p>

                            <template class="" v-if="pending_sale.delivery_type === 'delivery'">
                                <div class="delivery-item">

                                    <p>Delivery Region</p>
                                    <p>{{deliveryMeta.destination_address || '-'}}</p>
                                </div>
                            </template>
                            <template class="" v-if="pending_sale.delivery_type === 'delivery'">
                                <div class="delivery-item">

                                    <p>Delivery Address </p>
                                    <p>{{deliveryMeta.destination_address || '-'}}</p>
                                </div>
                            </template>

                            <template class="" v-if="pending_sale.delivery_type === 'pickup'">
                                <div class="delivery-item">

                                    <p>Delivery Region</p>
                                    <p>{{deliveryMeta.pickup_date || '-'}}</p>
                                </div>
                            </template>
                            <template class="" v-if="pending_sale.delivery_type === 'pickup'">
                                <div class="delivery-item">

                                    <p>Delivery Address </p>
                                    <p>{{deliveryMeta.pickup_time.hh + ':' + deliveryMeta.pickup_time.mm + ' ' + deliveryMeta.pickup_time.A || '-'}}</p>
                                </div>
                            </template>

                            
                        </div>
                    </div>
                </div>
            </div>

            <button @click="share">Share Receipt with Vendor</button>

        </div>
    </div>
</template>

<script>
export default{
    data() {
        return {
            cart: null,
            //status: null,
            pending_sale: null,
            customer_phone: null,
        }
    },
    created() {
        this.getData()
    },

    methods: {
        share() {
          const message =   this.createOrderMessage();
          let encoded = encodeURIComponent(message)
        const link = `whatsapp://send?text=${encoded}&phone=${this.pending_sale.business?.contact_phone}`;
        window.open(link, '_blank')

        }, 

        createOrderMessage() {
            try {

                let encoded = "Accept Order "+ this.$route.params.slug
                const ACCEPT_LINK = `whatsapp://send?text=${encoded}&phone=9039884463`;

                encoded = "Reject Order "+ this.$route.params.slug
                const REJECT_LINK = `whatsapp://send?text=${encoded}&phone=9039884463`;

                let message = `*New Order (ID: ${this.$route.params.slug})*\n\nItems:`;
                for (let item of this.cart) {
                    message+= `\n*${item.name} x ${item.quantity}*`
                    if (item.additions && item.additions.length)  {
                        message+= `\nAdditions: ${item.additions.map(a=>a.value).join(',')}`
                        
                    }
                    if (item.delivery_pack) {
                        
                        message += `\nPack: ${item.delivery_pack.name}`
                    }
                    if (item.customer_comment) {
                        
                        message += `\nComment: ${item.customer_comment}`
                    
                    }

                    
                }

                message += '\n\n ----------'

                message += `\nDelivery Details`
                if (this.deliveryMeta.destination_address) {

                    message+=`\nRegion:${this.deliveryMeta.destination_region}\nDelivery Address: ${this.deliveryMeta.destination_address}`
                }
                if (this.deliveryMeta.pickup_date) {

                    message+=`\nPickup Date:  ${this.deliveryMeta.pickup_date}\nPickup Time: ${this.deliveryMeta.pickup_time.hh + ":" + this.deliveryMeta.pickup_time.mm + " " +  this.deliveryMeta.pickup_time.A }`
                }
                if (this.deliveryMeta.note) {
                    message+=`\nNote:  ${this.deliveryMeta.note}\n`
                }

                message += `\n\n ----------`
                
                message += `\nPayment Details: https://www.pointsbud.com/receipts/${this.$route.params.slug}`
                message += `\n\nTo Accept Order: https://www.pointsbud.com/admin/checkout/${this.$route.params.slug}/accept`
                message += `\n\nTo Reject Order: https://www.pointsbud.com/admin/checkout/${this.$route.params.slug}/reject`
                

                return message;
                }catch(e) {
                alert(e)
                }
        },

        getData() {
            this.$api.get('/checkout-session/' + this.$route.params.slug).then(resp=> {
                this.cart = resp.data.data.cart
                //this.status = resp.data.data.status,
                this.pending_sale = resp.data.data.pending_sale,
                this.customer_phone = resp.data.data.customer_phone

                alert("Please make sure to click 'Share' to share this receipt with the vendor")

            }).catch(e=> {

            })
        }
    },
    computed: {
        deliveryMeta() {
            if (this.pending_sale && this.pending_sale.delivery_meta) {
                return JSON.parse(this.pending_sale.delivery_meta)
            }
        },
        status() {
            if (this.pending_sale && this.pending_sale.status === 'paid-pending-approval') {
                return "Paid - Pending Approval"
            }
            else if (this.pending_sale&& this.pending_sale.status === 'failed') {
                return "Failed"
            }
        },
    }
}

</script>

<style scoped lang="scss">

* {
    font-family: 'Open Sans', sans-serif;
}


button {
    //@include smallbutton;
    background-color: #25D366;
    border-radius: 50px;
    width: 100%;

    &:hover {
        background-color: #2fb15f;

    }
}

.bold {
    font-weight: 600;
}
.space-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.card {
    &__header {
        font-size: 16px;
    }

    &__section {
        margin: 16px 0;

        &__header {
            font-weight: 400px;
        }
    }
}

.item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card {
    @include card;
    margin-bottom: 20px;

    &__container{
        padding: 16px;
        width: 100%;
    }
}
.page {
    //background-color: white;

    &__container{
      //  padding: 16px !important;
      width: 95%;
      margin: auto;
      padding: 16px 0;
    }
}

.status {
    padding: 16px;
    //background-color: $primary;
    color: black;
    border-radius: 20px;
    font-size: 20px;
    text-align: center;
    margin-bottom: 32px;
}

button {
    padding: 24px;
}
</style>