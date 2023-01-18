<template>
    <div class="product" @click="gotoPlan(plan.id)">
        <div class="product__container">
            <div class="product__details">
                <div class="product__title">
                    <p>{{ plan.name }}</p>
                </div>
                <div class="product__description">
                    <a>afflee.com/reservations/{{ plan.slug }}</a>
                </div>
            </div>

            <div class="product__meta">
                <div class="product__meta__item">
                    <label for="">Marketer Commisson</label>
                    <p>{{ productCommission(plan) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["plan"],
    created() {},
    data() {
        return {};
    },

    methods: {
        gotoPlan(id) {
            this.$router.push("/dashboard/reservations/plans/" + id);
        },
        formatMoney(value) {
            return Intl.NumberFormat("en-US").format(value);
        },
        goToProduct(product) {
            this.$router.push("/dashboard/products/" + plan.id);
        },

        productCommission(product) {
            let suffix = "";
            if (
                !this.plan.pay_per_sale ||
                (this.plan && this.plan.pay_per_sale_type === "percent")
            ) {
                return this.plan.pay_per_sale + " " + "%";
            }
            return (
                this.plan.pay_per_sale_currency + " " + this.plan.pay_per_sale
            );
        },
    },
    computed: {},
};
</script>

<style lang="scss" scoped>
.out-of-stock {
    color: red;
    font-size: 13px;
    font-weight: 300;
}
.center {
    color: $charcoal;
    width: 100%;
    text-align: center;
}
.available {
    color: lightseagreen;
    font-size: 13px;
    font-weight: 300;
}
.products {
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
    //border: 0.2px solid rgba(211, 211, 211, 0.151);
    border-left: 0;
    border-right: 0;
    margin-bottom: 8px;
    @include card;

    &__container {
        padding: 16px;
        display: grid;
        grid-template-columns: 100%;

        @include media("<=dashbreak") {
            display: flex;
            flex-direction: column;
        }
    }

    &__meta {
        display: grid;
        grid-template-columns: 50% 50%;
        //border: 0.2px solid rgba(211, 211, 211, 0.151);
        border-left: 0;

        &__item {
            padding: 8px 16px;

            @include media("<=dashbreak") {
                padding: 8px 0px;
            }

            label {
                color: $charcoal;
                font-size: 15px;
            }

            p {
                color: $faint;
                font-size: 14px;
                font-weight: 400;
            }
        }
    }

    &__details {
        width: 100%;
        padding-left: 16px;
        padding-right: 16px;
        border-right: 0.5px solid rgba(211, 211, 211, 0.221);

        @include media("<=dashbreak") {
            padding: 0;
        }
    }
    &__description {
        color: $primary;
        font-size: 15px;
        max-height: 95px;
        overflow-y: hidden;
        //text-align: justify;
        font-weight: 400;
        a {
            cursor: pointer;
        }
    }
    &__title {
        color: $charcoal;
        font-size: 18px;
        font-weight: 600;
        @include media("<=dashbreak") {
            margin-top: 16px;
        }
    }
    &__thumbnail {
        width: 100%;
        height: 200px;

        img {
            object-fit: cover;
            height: 100%;
            width: 100%;
        }
    }
}
</style>
