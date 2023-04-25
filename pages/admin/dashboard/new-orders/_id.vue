<template>
    <div>

        <div class="order">
            <div class="order__container">
                <div style="text-align: center; color: grey; margin-bottom: 16px; cursor:pointer !important" class=""
                    @click="goBack">Go Back</div>
                <div class="order__content" v-if="model">
                    <div class="order__header">

                        <h2>Order #{{ model.id }}</h2>
                    </div>

                    <div class="order__customer">
                        <p class="order__customer__name">

                            {{ model.customer.name }}
                        </p>
                        <p class="order__customer__email">
                            {{ model.customer.email }}
                        </p>
                        <div class="order__customer__details">
                            <p>Points</p>
                            <p>{{ model.customer.points }}</p>
                        </div>
                    </div>



                    <div class="order__details">
                        <div class="order__details__item">
                            <p>Total</p>
                            <p>{{ currency }} {{ totalOrderAmount | money }}</p>
                        </div>
                        <div class="order__details__item">
                            <p>Points used</p>
                            <p>{{ totalPointsUsed }}</p>
                        </div>
                    </div>


                    <div class="order__items">
                        <div class="order__items__container">
                            <div class="order__items__item" v-for="(order, index) in model.orders" :key="index">
                                <div class="order__items__item__image">
                                    <img :src="order.product?.thumbnail" alt="">
                                </div>

                                <div class="order__items__item__name">
                                    <p> {{ order.product.name }} </p>
                                    <p>x</p>
                                    <p>{{ order.quantity }}</p>
                                </div>

                                <div class="order__items__item__cost">
                                    <div v-if="order.total_amount"> {{ order.currency }} {{ order.total_amount | money }}
                                    </div>
                                    <div v-if="order.points_used">{{ order.points_used + ' points' }}</div>
                                </div>
                            </div>
                        </div>


                    </div>



                    <div class="order__ctas">
                        <button>Reject</button>
                        <button>Accept</button>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    layout: 'admin-dashboard',
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
        goBack() {
            this.$router.back()
        },
        getOrder() {
            this.$api.get(`/orders/pending-sales/${this.$route.params.id}`).then(resp => {
                this.model = resp.data.data;
            })
        },
        acceptOrder() {

            /*this.$api.put('/orders/pending-sales/' + this.model.id, { status: 'accepted' }).then(resp => {
                this.$emit('close', true)
            })*/

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
.footer {
    button {
        margin-right: 16px;

        &:first-of-type {
            background-color: red;
            color: white;
        }
    }
}

.order {
    &__total {
        display: flex;
        justify-content: space-between;
        width: 50%;
        margin: auto;
    }

    &__ctas {
        display: flex;
        justify-content: center;
        width: 100%;
        margin: auto;
        box-sizing: border-box;

        button {
            @include smallbutton;

            &:first-child {
                background: red;
                color: white;
                margin-right: 24px;
            }

            &:last-child {
                background-color: lightseagreen;
            }
        }
    }

    &__container {
        padding: 16px;
        width: 60%;
        margin: auto;

        @include media ('<=900px') {
            width: 100%
        }
    }

    &__content {
        background: white;
        padding: 36px;
    }

    &__header {
        text-align: center;
    }

    &__customer {
        border-bottom: 1px dashed whitesmoke;
        padding: 16px;

        &__name {
            text-align: center;
            font-weight: 600;
            font-size: 20px;
        }

        &__email {
            text-align: center;
        }

        &__details {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            p {
                &:first-child {
                    font-weight: 500 !important;
                }

                font-weight: 400;
            }
        }
    }

    &__details {
        display: flex;

        justify-content: center;
        margin: auto;
        //border: 1px solid pink;
        width: 50%;
        margin-top: 16px;
        border-bottom: 1px solid whitesmoke;


        &__item {
            padding: 16px;
            width: 50%;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            //border: 1px solid whitesmoke;

            p {
                &:last-child {
                    font-weight: 600;
                }
            }

        }

    }

    &__items {
        &__container {
            display: flex;
            flex-direction: column;
            padding: 24px;
            width: 100%;
        }

        &__item {
            display: grid;
            width: 100%;
            margin: auto;
            grid-template-columns: 10% 49% 39%;
            justify-content: space-between;

            padding: 16px;
            border-bottom: 1px solid whitesmoke;
            margin-bottom: 8px;


            &__name {
                display: flex;
                font-weight: 600;

                p {
                    margin-right: 8px;
                }
            }
        }
    }
}
</style>