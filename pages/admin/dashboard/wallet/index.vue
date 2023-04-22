<template>
    <div class="page">


        <div class="section-title">
            <p>Wallets</p>
            <button>Widthdraw</button>
        </div>
        <div class="table" v-if="wallets">



            <div class="wallets">
                <div class="wallets__container">
                    <div class="wallets__item" v-for="(wallet, index) in wallets" :key="index">
                        <p>{{ wallet.currency }}</p>
                        <p> Avaailable Balance: {{ wallet.available_balance || 0 | money }}</p>
                        <p>Withheld Balance: {{ wallet.witheld_balance || 0 | money }}</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
  
<script>
import BaseTable from '../../../../components/tables/base-table.vue';

export default {
    layout: "admin-dashboard",
    data() {
        return {
            wallets: []
        };
    },
    created() {
        this.getWallets()
    },
    methods: {
        getWallets() {
            this.$api.get('/wallets').then(resp => {
                this.wallets = resp.data.data
            })
        }
    },
    components: { BaseTable }
};
</script>
  
<style lang="scss" scoped>
.wallets {
    &__container {
        display: grid;
        grid-template-columns: 24% 24% 24% 24%;
    }

    &__item {
        background: white;
        border-radius: 10px;
        padding: 24px;
    }
}

.section-title {
    display: flex;
    justify-content: space-between;
    margin-top: 10vh;
    margin-bottom: 16px;
    align-items: flex-end;

    p {
        color: $charcoal;
        font-size: 20px;
        font-weight: 500
    }

    button {
        @include smallbutton;
    }
}

.add-customer {
    width: 600px;

    .form {
        padding: 24px;
    }

    .form-input {
        @include plain-form-input;
    }
}

.page {
    padding: 36px;
}

.insights {
    width: 100%;

    &__container {
        width: 100%;
        display: flex;
        flex-wrap: wrap
    }
}

.card {
    @include card;
    padding: 16px;
    width: 250px;
    height: 250px;
    border-radius: 10px;
    background: rgb(77, 195, 189);
    margin-right: 16px;

    &:last-of-type {
        background-color: #ff7777;

    }

    &__header {
        color: white;
        display: flex;
        align-items: center;
        font-size: 18px;

        div {
            height: 15px;
            width: 15px;
            border-radius: 50%;
            background: white;
            margin-right: 16px;
        }
    }

    p {
        margin-left: 31px;
        font-size: 40px;
        color: white;

    }
}

.table {
    //margin-top: 10vh;
    width: 100%;
    //border-radius: 10px;

    table {
        font-size: 15px;
        width: 100%;

        tr {
            border-bottom: 1px solid whitesmoke;
            height: 45px;
            cursor: pointer;

            &:hover {
                background: $dashboard-background-color;
            }
        }

        th {
            //background: $dashboard-background-color;
            background: white;
            color: $charcoal;
            text-align: left;
            padding: 0 16px;
            font-weight: 500;
        }

        td {
            text-align: left;
            color: $charcoal;
            padding: 0 16px;
        }
    }
}
</style>
  