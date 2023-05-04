<template>
    <BaseModal @close="$emit('close', true)">

        <template #footer>
            <div class="footer" v-if="model">

                <button id="reject">Reject</button>
                <button id="process" @click="processOrder">Process Order</button>
                <button id="accept" @click="acceptOrder">Accept and Request Payment</button>
            </div>
        </template>

        <template #body>
            <div class="notifmodal">
                <div class="notifmodal__container" v-if="model">
                    <div class="notifmodal__space" v-if="model.space_type || model.space_id">
                        <p v-if="model.space_type">{{ model.space_type }}</p>
                        <p v-if="model.space_id">{{ model.space_id }}</p>
                    </div>
                    <div class="notifmodal__customer">
                        <div class="notifmodal__customer__name">
                            {{ model.customer?.name || "Anonymous customer" }}
                        </div>

                        <div class="notifmodal__customer__email">
                            {{ model.customer?.email }}
                        </div>

                        <div class="notifmodal__customer__details">
                            <div class="notifmodal__customer__details__item" v-if="model.customer && model.customer.points">
                                <p>Points</p>
                                <p>{{ model.customer?.points }}</p>
                            </div>


                        </div>
                    </div>

                    <div class="notifmodal__order">
                        <div class="notifmodal__order__header">Order Details</div>
                        <div class="notifmodal__order__details">
                            <div class="notifmodal__order__details__item">
                                <p>Total</p>
                                <p>{{ currency }} {{ totalOrderAmount | money }}</p>
                            </div>
                            <div class="notifmodal__order__details__item">
                                <p>Points used</p>
                                <p>{{ totalPointsUsed }}</p>
                            </div>
                        </div>

                        <div class="notifmodal__order__content">
                            <div class="notifmodal__order__item">

                            </div>
                        </div>
                    </div>

                    <div class="notifmodal__items">
                        <div class="notifmodal__items__container">
                            <div class="items__header" style="font-weight: 400; color:black; margin-bottom: 8px;">Items
                            </div>
                            <div class="item" :class="getOrderStyle(order.status)" v-for="(order, index) in model.orders"
                                :key="index">
                                <div class="item__image">
                                    <img :src="order && order.product?.thumbnail || 'https://cdn-icons-png.flaticon.com/512/4901/4901689.png'"
                                        alt="">

                                </div>
                                <div class="item__details">
                                    <div class="item__details__name">{{ order.product.name }}</div>
                                    <div class="item__details__quantity">
                                        <p>Quantity: <b>{{ order.quantity }}</b></p>
                                    </div>
                                    <div class="item__details__comment">
                                        <p v-if="order.customer_comment"><b>Comment</b>: {{ order.customer_comment }}</p>
                                    </div>
                                </div>

                                <div class="item__cost">
                                    <div v-if="order.total_amount"> {{ order.currency }} {{ order.total_amount | money }}
                                    </div>
                                    <div v-if="order.points_used">{{ order.points_used + ' points' }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </template>

    </BaseModal>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    props: ['id', 'socket'],
    data() {
        return {
            model: null,
        }
    },



    computed: {

        currency() {
            if (this.model && this.model.orders) {
                return this.model.orders[0].currency
            }
        },
        totalOrderAmount() {
            let total = 0;
            if (this.model && this.model.orders) {
                this.model.orders.forEach(order => {
                    total += order.total_amount
                })
            }

            return total;
        },
        totalPointsUsed() {
            let total = 0;
            if (this.model && this.model.orders) {
                this.model.orders.forEach(order => {
                    total += order.points_used
                })
            }

            return total;
        },
    },

    methods: {
        getOrderStyle(status) {
            switch (status) {
                case 'new':
                    return '';
                default:
                    return 'blur'
            }
        },
        processOrder() {
            const token = this.$cookies.get('loyal-token')

            this.model.status = 'processing'

            this.model.token = token;
            this.model.status = 'processing'
            this.socket.emit('processing_order', this.model)
            this.socket.on('processed_order' + this.id, () => {
                this.$emit('close', true)
            })

        },
        getOrder() {
            this.$api.get(`/orders/pending-sales/${this.id}`).then(resp => {
                this.model = resp.data.data;
            })
        },
        acceptOrder() {

            /*this.$api.put('/orders/pending-sales/' + this.model.id, { status: 'accepted' }).then(resp => {
                this.$emit('close', true)
            })*/
            const token = this.$cookies.get('loyal-token')
            this.model.token = token;
            this.model.status = 'awaiting-payment'
            this.socket.emit('approved_order', this.model)
            this.socket.on('approval_done_' + this.id, () => {
                this.$emit('close', true)
            })
        }
    },

    created() {
        this.getOrder();
    }
}
</script>



<style lang="scss" scoped>
.blur {
    filter: blur(10px);
}

.footer {
    button {
        margin-right: 16px;

        &:first-of-type {
            background-color: red;
            color: white;
        }
    }

    #process {
        background: gold !important;
        color: black;
    }
}

.notifmodal {
    min-width: 600px;
    color: black;

    &__space {
        // border: 1px dashed grey;
        margin: auto;
        text-align: center;
        font-size: 20px;
        width: 50%;
        background-color: gold;
        color: black;
        font-weight: 500;
        display: flex;
        justify-content: center;
    }

    &__container {
        padding: 16px;
    }

    &__order {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px;
        font-weight: 500;
        width: 100%;
        border-bottom: 2px dashed whitesmoke;




        &__header {
            font-size: 25px;
        }

        &__content {
            display: flex;
            flex-direction: column;
        }

        &__details {
            display: flex;
            justify-content: center;
            flex-direction: row;
            //border: 1px solid lightgrey;
            width: 100%;

            &__item {
                display: flex;
                flex-direction: column;
                padding: 8px 16px;
                align-items: center;
                color: $charcoal;

                p {
                    &:first-child {
                        color: $faint;
                    }
                }
            }
        }
    }

    &__customer {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-bottom: 2px dashed whitesmoke;
        padding: 16px;
        width: 100%;

        &__name {
            font-size: 25px;
            font-weight: 500;
            color: black;
        }

        &__email {
            color: $charcoal;
        }

        &__details {
            display: flex;
            justify-content: center;
            flex-direction: row;
            //border: 1px solid lightgrey;
            width: 100%;

            &__item {
                display: flex;
                flex-direction: column;
                padding: 8px 16px;
                align-items: center;
                color: $charcoal;

                p {
                    &:first-child {
                        color: $faint;
                    }
                }
            }
        }
    }

    &__items {
        &__container {
            padding: 16px;
        }

        .item {
            display: grid;
            grid-template-columns: 20% 70% 10%;
            border: 1px solid whitesmoke;
            margin-bottom: 2px;
            border-radius: 10px;

            &__image {
                height: 100%;
                width: 100px;

                img {
                    height: 100%;
                    width: 100%;
                    object-fit: cover;
                }
            }

            &__details {
                margin-left: 8px;
                padding: 16px 0;

                &__name {
                    font-size: 16px;
                    font-weight: 600;
                }
            }

            &__cost {
                padding: 16px 8px;
                font-weight: 400;
                display: flex;
                justify-content: flex-end;
                font-size: 16px;
            }
        }
    }
}
</style>