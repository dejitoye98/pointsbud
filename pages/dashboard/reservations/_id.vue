<template>
    <div class="re">
        <div class="container">
            <template v-if="reservation">
                <div class="flex-row">
                    <div class="receipt-container">
                        <div class="receipt-header header-title">Receipt</div>
                        <div class="receipt">
                            <div class="receipt__left">
                                <img
                                    src="../../../static/Afflee-favicon.png"
                                    width="100"
                                    height="100"
                                    alt=""
                                />
                                <div class="receipt__customer">
                                    <p>{{ customer.name }}</p>
                                    <p>{{ customer.email }}</p>
                                </div>
                            </div>
                            <div class="receipt__right">
                                <div class="receipt__head">
                                    <p class="receipt__head__reservation">
                                        Reservation
                                    </p>
                                    <p class="receipt__head__space">
                                        For:
                                        {{ reservation.reservation_space.name }}
                                    </p>
                                    <p class="receipt__head__date">
                                        {{ formatDate(reservation.day) }}
                                    </p>
                                </div>

                                <div class="receipt__price">
                                    <div class="receipt__price-knob"></div>
                                    <div class="receipt__contain">
                                        <p>
                                            {{
                                                reservation.reservation_space
                                                    .currency
                                            }}
                                            {{ reservation.amount | money }}
                                        </p>
                                        <span>No discount</span>
                                    </div>
                                    <div class="receipt__price-knob"></div>
                                </div>
                                <div class="receipt__date"></div>
                                <div class="receipt__number">
                                    <p>
                                        #{{
                                            reservation.receipt_no ||
                                            "4243OU234LSr"
                                        }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="details">
                        <div class="header-title">Details</div>
                        <div class="details__container">
                            <div class="details__item">
                                <p class="details__header">
                                    Reservation Details
                                </p>
                                <div class="details__item__container">
                                    <div>
                                        <label>Check in</label>
                                        <p>{{ reservation.from_time }}</p>
                                    </div>
                                    <div>
                                        <label>Check out</label>
                                        <p>{{ reservation.to_time }}</p>
                                    </div>
                                    <div>
                                        <label>Reservation Item</label>
                                        <p>
                                            {{
                                                reservation.reservation_space
                                                    .name
                                            }}
                                        </p>
                                    </div>
                                    <div>
                                        <label>Amount Paid</label>
                                        <p>
                                            NGN {{ reservation.amount | money }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="details__item">
                                <p class="details__header">Customer Details</p>
                                <div class="details__item__container">
                                    <div>
                                        <label>Customer Name</label>
                                        <p>{{ customer.name }}</p>
                                    </div>
                                    <div>
                                        <label>Customer Email</label>
                                        <p>{{ customer.email }}</p>
                                    </div>

                                    <div
                                        v-for="(meta, index) in customerMeta"
                                        :key="index"
                                    >
                                        <label>{{
                                            Object.keys(meta)[0]
                                        }}</label>
                                        <p>{{ Object.values(meta)[0] }}</p>
                                    </div>
                                </div>
                            </div>
                            <div style="padding: 16px">
                                <button @click="contactCustomer">
                                    Contact
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else-if="!loading">
                <div><LoadingState />></div>
            </template>
        </div>
    </div>
</template>

<script>
import moment from "moment";
export default {
    layout: "dashboard",
    created() {
        this.$store.commit(
            "dashboard/setActive",
            `Reservations ${this.$route.params.id}`
        );
        this.$store.commit(
            "dashboard/setDashboardTitle",
            `Reservations ${this.$route.params.id}`
        );
        this.getReservation();
    },
    data() {
        return {
            reservation: null,
            loading: true,
        };
    },
    methods: {
        contactCustomer() {},
        getReservation() {
            this.loading = true;
            this.$api
                .get(`/reservations/${this.$route.params.id}`)
                .then((resp) => {
                    this.reservation = resp.data.data;
                })
                .catch((err) => {})
                .finally(() => {
                    this.loading = false;
                });
        },
        formatDate(date) {
            if (date) {
                return moment(date).format("MMM DD, YYYY");
            }
            return "";
        },
        capitalize(token) {
            if (token) {
                return token[0].toUpperCase() + token.slice(1, token.length);
            }
        },
    },
    computed: {
        customer() {
            if (
                this.reservation &&
                this.reservation.sale &&
                this.reservation.sale.customer
            ) {
                return this.reservation.sale.customer;
            }
            return {};
        },
        customerMeta() {
            const array = [];
            if (this.customer && this.customer.meta) {
                try {
                    const meta = JSON.parse(this.customer.meta);
                    Object.keys(meta).forEach((key) => {
                        if (key) {
                            const obj = {};
                            const value = meta[key];
                            if (key.split("_").length > 1) {
                                let _normalized = "";
                                key = key.split("_");
                                key.forEach((token) => {
                                    _normalized += `${this.capitalize(token)} `;
                                });
                                obj[_normalized] = value;
                            } else {
                                obj[this.capitalize(key)] = value;
                            }
                            array.push(obj);
                        }
                    });
                } catch (e) {
                    console.log(e);
                }
            }
            return array;
        },
    },
};
</script>

<style lang="scss" scoped>
.header-title {
    color: $faint;
    font-size: 18px;
    margin-bottom: 8px;
    text-align: center;
}
.flex-row {
    display: grid;
    grid-template-columns: 45% 45%;
    justify-content: space-between;
}

.receipt {
    background: white;
    height: 300px;
    box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
    border: 0.5px solid rgba(211, 211, 211, 0.442);
    display: grid;
    grid-template-columns: 40% 60%;
    border-radius: 8px;

    &__left {
        background: #f8fafc;
        border-right: 0.5px solid rgba(211, 211, 211, 0.442);
        display: flex;
        justify-content: center;
        align-items: center;
        display: flex;
        flex-direction: column;
    }
    &__right {
        color: black;
    }

    &__customer {
        display: flex;
        flex-direction: column;
        align-items: center;
        p {
            color: black;
            font-size: 15px;
        }
    }

    &__head {
        margin: auto;
        //padding: 16px;
        //padding: 16px;
        text-align: center;
        color: $charcoal;
        font-size: 14px;
        width: 70%;
        padding: 16px 0;

        border-bottom: 0.5px solid rgba(211, 211, 211, 0.336);
        &__reservation {
            color: black;
            font-size: 20px;
            font-weight: 500;
        }
    }

    &__price {
        // border: 1px solid rgba(211, 211, 211, 0.336);
        display: flex;
        width: 70%;
        margin: auto;
        margin-top: 16px;
        padding: 16px;
        align-items: center;
        justify-content: space-between;
        // border: 1px solid $primary;
        p {
            font-size: 18px;
            font-weight: 500;
            text-align: center;
        }
        span {
            color: $charcoal;
            font-size: 14px;
            text-align: center;
            color: $primary;
        }

        &__contain {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }

        &-knob {
            height: 10px;
            width: 10px;
            border-radius: 50%;
            background: lightgray;
            margin-left: 8px;
            &:first-of-type {
                margin-right: 8px;
                margin-left: 0;
            }
        }
    }
    &__number {
        padding: 16px;
        font-size: 20px;
        font-weight: 500;
        text-align: center;
        margin-top: 16px;
        border-top: 1px solid rgba(211, 211, 211, 0.336);
    }
}
.details {
    margin-left: 16px;

    &__container {
        background: white;
        box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
    }

    &__header {
        font-size: 15px !important;
        margin-bottom: 16px;
        color: $darkaccent !important;
    }

    &__item {
        display: flex;
        flex-direction: column;
        padding: 16px;
        border-bottom: 0.5px solid rgba(211, 211, 211, 0.442);
        label {
            color: $charcoal;
            font-size: 15px;
        }
        p {
            color: black;
            font-size: 15px;
        }

        &__container {
            display: grid;
            width: 100%;
            grid-template-columns: 50% 50%;
            justify-content: space-between;

            div {
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin-bottom: 16px;
            }
        }
    }
    button {
        @include smallbutton;
    }
}
</style>
