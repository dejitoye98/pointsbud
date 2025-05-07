<template>
    <div class="page">
        
    </div>
</template>

<script>
import moment from 'moment';
export default {
    data() {
        return {
            customerName: '',
            session: {},
            delivery_info: {},
            countdownDisplay: '14:59',
            order: {
                serialNo: '324SDF',
                status: 'on-the-way',
                estimatedDelivery: '15-20 mins',
                createdAt: new Date(),
                paymentMethod: 'Wallet',
                total: 2500,
                deliveryFee: 0,
                orderType: 'Delivery',
                customerPhone: '+2348012345678',
                items: [
                    { id: 1, name: 'Afang Soup', price: 2000, quantity: 1 },
                    { id: 2, name: 'Water', price: 250, quantity: 2 }
                ],
                timeline: [],
                riderLocation: { lat: 6.4551, lng: 3.3751 } // Sample Lagos coordinates
            },
            suggestions: [
                { id: 1, name: 'Grilled Chicken', price: 3500, emoji: '🍗' },
                { id: 2, name: 'Jollof Rice', price: 1800, emoji: '🍚' }
            ],
            countdownTimer: null,
            can_process_refund: false,
            customer: {}
        }
    },
    computed: {
        sessionId() {
            return this.session?.id
        },
        grandTotal() {
            return this.subtotal + this.deliveryFee + this.appFee + this.taxes;
        },
        subtotal() {
            return this.session?.pending_sale?.orders.reduce((sum, item) => sum + (item.product?.unitprice * item.quantity), 0) || 0;
        },
        deliveryFee() {
            let delivery_meta = this.session?.pending_sale?.delivery_meta;
            if (delivery_meta) {
                try {
                    delivery_meta = JSON.parse(delivery_meta);
                    return delivery_meta?.delivery_fee || 0;
                } catch (e) {
                    console.error("Error parsing delivery_meta:", e);
                    return 0;
                }
            }
            return 0;
        },
        appFee() {
            return this.session?.pending_sale?.appFee || 0;
        },
        taxes() {
            return this.session?.pending_sale?.taxes || 0;
        }
    },
    watch: {
        sessionId(value) {
            if (value) {
                this.payWithBudpay()
            }
            //alert(value)
        }
    },
    created() {
        this.getSession()
    },
    methods: {
        getSession() {
            try {

                this.$api.get('/checkout-session/track?url=' + this.$route.params.slug).then(resp => {
                    this.session = resp.data.data.session;
                    this.delivery_info = resp.data.data.delivery_info;
                    this.can_process_refund = resp.data.data.can_process_refund;
    
                    if (this.session.checkout_events?.length) {
                        for (let event of this.session.checkout_events) {
                            this.order.timeline.push({
                                status: event.action,
                                completed: true,
                                time: moment(event.createdAt).format("hh:mm A").toString()
                            });
                        }
                    }
                }).catch(error => {
                    console.error('Error fetching order data:', error);
                });
            }catch(e) {
                console.log(e)
            }
        },

        payWithBudpay() {
            BudPayCheckout({
                key: this.$config.BUDPAY_PUBLIC_KEY || 'pk_test_ts9gpurgsis82hlhoaezoayijt06m4vhn4jrk2', // Replace with your public key
                email: this.customer?.email || 'anon@gmail.com',
                amount: this.grandTotal.toFixed(2),
                first_name: this.customer?.name || 'anon',
                last_name: this.customer?.name || 'anon',
                currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars
                reference: '' + Math.floor((Math.random() * 100000000000) + 1) + new Date().getSeconds() + new Date().getMilliseconds(), // generates a pseudo-unique reference
                callback: (response) => {
                    //this happens after the payment is completed successfully
                    var reference = response.reference;
                    let data = response;
                    //alert('Payment complete! Reference: ' + reference + ', Status: ' + response.status);
                    this.step = 5;
                    
                    let payload = { 
                        type: "order-paid", 
                        checkout_session_id: this.session?.id, 
                        ...data, 
                        business_slug: this.$route.params.slug, 
                        business_id: this.session.business_id 
                    };
                    
                    this.$api.post("/transactions/verify-budpay", payload).then(resp => {
                        //this.registerFirebaseOrder()
                    });
                    //let message = this.createOrderMessage()
                },
                onClose: function(response) {
                    console.log(response);
                    alert('Transaction was not completed, window closed.');
                }
            });
        }
    }
}
</script>