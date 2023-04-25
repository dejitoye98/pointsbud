<template>
    <div class="sale">
        <div class="sale__container">

            <div class="receipt" v-if="receipt">
                <div class="receipt__header">
                    <div class="receipt__header__business">

                        <p>Order receipt</p>
                        <p>#{{ receipt.id }}</p>
                        <p>Circa Lagos</p>
                    </div>

                    <div class="receipt__header__customer">
                        <p> {{ order?.customer?.name || "Anon" }} </p>
                        <p> {{ order?.points_earned || 0 }} points earned </p>
                        <p> {{ order?.points_used || 0 }} points used </p>
                    </div>


                </div>
                <div class="receipt__container" v-if="orders">
                    <BaseTable :show_header="false" :show_footer="false" :show_search="false">
                        <template #header>
                            <th>Item</th>
                            <th>Unitprice</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </template>
                        <template #data>
                            <tr v-for="(order, index) in orders" :key="index">
                                <td>{{ order.product.name }}</td>
                                <td>{{ order.product.currency }} {{ order.product.unitprice | money }}</td>
                                <td>{{ order.quantity }}</td>
                                <td>{{ order.product.currency }} {{ order.total_amount | money }}</td>
                            </tr>
                        </template>
                    </BaseTable>

                </div>

                <div class="receipt__total">
                    <div class="receipt__total__item">
                        <p>Subtotal</p>
                        <p>NGN {{ receipt.total_amount }}</p>
                    </div>
                    <div class="receipt__total__item" v-for="(key, index) in Object.keys(taxBreakdown)">
                        <p>{{ normalizeKey(key) }}</p>
                        <p> NGN {{ taxBreakdown[key] }}</p>
                    </div>
                    <div class="receipt__total__item">
                        <p>Total</p>
                        <p><b>NGN {{ receipt.total_amount + receipt.pending_sale.taxes }} </b></p>
                    </div>
                </div>
            </div>

            <!-- 
            <div class="sale-details">
                <div class="sale-details__customer">
                    <div class="sale-details__customer__item">
                        <p>Customer Name</p>
                        <p>Deji Atoyebi</p>
                    </div>
                    <div class="sale-details__customer__item">
                        <p>Customer Email</p>
                        <p>itisdeji@gmail.com</p>
                    </div>
                    <div class="sale-details__customer__item">
                        <p>Points Used</p>
                        <p>10</p>
                    </div>
                    <div class="sale-details__customer__item">
                        <p>Points Earned</p>
                        <p>32</p>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>


<script>
export default {
    layout: 'admin-dashboard',
    data() {
        return {
            sale: null,
            receipt: null,
            orders: null
        }
    },
    components: {

    },

    computed: {
        taxBreakdown() {
            if (this.receipt && this.receipt.pending_sale && this.receipt.pending_sale.taxes_breakdown) {
                return JSON.parse(this.receipt.pending_sale.taxes_breakdown)
            }
        }
    },

    fetch() {
        this.$api.get(`/sales/${this.$route.params.id}`).then(resp => {
            this.sale = resp.data.data.sale
            this.receipt = resp.data.data.receipt
            this.orders = resp.data.data.orders
        })
    },
    methods: {
        normalizeKey(key) {
            key = key.split('_');
            let new_key = '';

            key.forEach(token => {
                new_key += `${token[0].toUpperCase() + token.slice(1)} `
            })

            return new_key
        }
    }

}
</script>

<style lang="scss" scoped>
.sale {
    &__container {
        margin: auto;
        justify-content: center;
        display: flex;
        flex-direction: column;
    }

}

.sale-details {
    background: white;
    padding: 24px;
    width: 80%;
}

.receipt {
    width: fit-content;
    margin: auto;
    margin-bottom: 30px;
    padding: 16px;

    background: white;
    display: flex;
    flex-direction: column;
    //align-items: center;
    //justify-content: center;
    text-align: center;


    &__total {
        padding: 16px;
        font-size: 14px;

        &__item {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }

    &__header {
        padding: 16px;
        color: $charcoal;
        font-weight: 500;
        display: flex;
        width: 100%;
        justify-content: space-between;

        &__business {
            p {
                text-align: left;
                font-size: 13px;

            }
        }

        &__customer {
            p {
                text-align: right;
                font-size: 13px;
            }
        }
    }

    table {
        padding: 24px;
    }

    th {
        background: black;
        color: white;
        padding: 20px !important;
    }
}
</style>