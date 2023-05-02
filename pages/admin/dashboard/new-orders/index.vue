<template>
    <div class="page">

        <div class="table" v-if="pending_sales?.length > 0">
            <BaseTable>
                <template #header>

                    <th>Customer Name</th>
                    <th>Items ordered</th>
                    <th>Total Amount</th>
                    <th>Date & Time</th>
                    <th>Status</th>

                </template>

                <template #data>

                    <tr v-for="(order, index) in pending_sales" :key="index" @click="goToOrder(order.id)">

                        <td>{{ order.customer?.name || "Anon" }}</td>
                        <td>{{ order.order_ids?.split(',').length }}</td>
                        <td>NGN {{ order.total_amount | money || 'N/A' }}</td>
                        <td>{{ getMomentsAgo(order.createdAt) }}</td>
                        <td> <span class='status-data' :class="getStatusStyle(order.status)"
                                v-if="order.status !== 'pending'"> {{ order.status }} </span>
                            <span v-else class='status-data' :class="getStatusStyle(order.status)"> new </span>
                        </td>
                    </tr>
                </template>

            </BaseTable>
        </div>
    </div>
</template>
  
<script>
import moment from 'moment';
import BaseTable from '../../../../components/tables/base-table.vue';
import { mapGetters } from "vuex";


export default {
    computed: {
        ...mapGetters("updates", ['updateItems']),

    },
    layout: "admin-dashboard",
    props: ['socket'],
    data() {
        return {
            focused_order_id: null,
            new_customer: {
                name: "",
                email: "",
                phone: ""
            },
            stats: {
                customers_returned: 0,
                customers_count: 0
            },
            create_customer: false,
            customers: null,

            pending_sales: []
        };
    },
    created() {
        this.getCustomers();
        this.$store.dispatch('updates/setItems', { ...this.updateItems, pending_sales: 0 })
        this.getNewOrders();
    },


    methods: {
        goToOrder(id) {
            this.$router.push('/admin/dashboard/new-orders/' + id)
        },
        closeDetail() {
            this.focused_order_id = null
        },

        getMomentsAgo(date) {
            const now = moment();
            let diff_in_minutes = now.diff(date, 'minutes');

            if (diff_in_minutes < 60) {
                if (diff_in_minutes === 1) {
                    return "1 min ago"
                }
                else {
                    return `${diff_in_minutes} mins ago`
                }
            }
            else {
                if (diff_in_minutes === 60) {

                    return `1 hour ago`
                }
                else {
                    return `${parseInt(diff_in_minutes / 60)} hours ago`
                }
            }
        },

        getStatusStyle(status) {
            switch (status) {
                case 'awaiting-payment':
                    return 'awaiting-payment-status'
                case 'processing':
                    return 'processing-status'
                case 'accepted':
                    return 'accepted-status'
                case 'completed':
                    return 'accepted-status'
                case 'rejected':
                    return 'rejected-status'
                case 'pending':
                    return 'pending-status'
                default:
                    return 'accepted-status'
            }
        },

        getNewOrders() {
            this.$api.get('/orders/pending-sales').then(resp => {
                this.pending_sales = resp.data.data
            })
        },

        goToCustomer(customer) {
            this.$router.push("/admin/dashboard/customers/" + customer.id);
        },
        triggerCreateCustomer() {
            this.create_customer = true;
        },
        createCustomer() {
            this.$api
                .post("/customers", this.new_customer)
                .then(resp => {
                    this.create_customer = false;
                    this.getCustomers();
                })
                .catch(err => { });
        },
        getCustomers() {
            this.$api.get("/customers").then(resp => {
                this.customer_list_info = resp.data.data.page_info;
                this.customers = resp.data.data.list;
            });
        }
    },
    components: { BaseTable }
};
</script>
  
<style lang="scss" scoped>
.status-data {
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    width: 100%;
    border-radius: 0 !important;
    padding: 2px;
}

td {
    span {
        border-radius: 20px;
        ;
    }
}

.accepted-status {
    background: lightseagreen;
    color: white;
}

.awaiting-payment-status {
    background: gold;
    color: black;
}

.processing-status {
    background: gold;
    color: black;
}

.rejected-status {
    background: red;
    color: black;

}


.pending-status {
    background: yellow;
    color: black;
}

td {
    span {
        background: lightseagreen;
        padding: 8px;
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
  