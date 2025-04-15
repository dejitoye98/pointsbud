<template>
    <BaseModal>
      <template #header>
        <div class="cart-header">
          <h2 class="cart-title">Your Cart</h2>
          <p class="cart-subtitle">Review your items before checkout</p>
        </div>
      </template>
      <template #body>
        <div class="cart-body">
          <!-- Cart Items List -->
          <div class="cart-items">
            <div v-if="cart.length > 0">
              <div v-for="(item, index) in cart" :key="index" class="cart-item">
                <div class="item-details">
                  <h3 class="item-name">{{ item.name }}</h3>
                  <div class="item-quantity">Qty: {{ item.quantity }}</div>
                </div>
                <div class="item-price">{{item.currency || "NGN" | currencySymbol}}{{ (item.unitprice * item.quantity).toFixed(2) | money}}</div>
              </div>
              
              <div class="cart-summary">
                <div class="summary-line">
                  <span>Subtotal</span>
                  <span>{{"NGN" | currencySymbol}}{{ subtotal.toFixed(2) }}</span>
                </div>
                <div class="summary-line">
                  <span>Tax</span>
                  <span>{{"NGN" | currencySymbol}}{{ totalTaxes.toFixed(2) }}</span>
                </div>
                <div class="summary-line total">
                  <span>Total</span>
                  <span>{{"NGN" | currencySymbol}}{{ total.toFixed(2) }}</span>
                </div>
              </div>
            </div>
            
            <div v-else class="empty-cart">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <p>Your cart is empty</p>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="cart-actions" v-if="cart.length > 0">
            
            <button class="secondary-btn" @click="addMoreItems">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              Add More Items
            </button>
            
            <button class="primary-btn" @click="proceedToPayment" :disabled="loading">
              <span v-if="!loading">Pay Now</span>
              <span v-else class="loader"></span>
            </button>

            <button class="danger-btn" @click="cancelOrder">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                Cancel Order
              </button>
              
          </div>
          
          <button v-else class="primary-btn" @click="addMoreItems">
            Start Adding Items
          </button>
        </div>
      </template>
    </BaseModal>
  </template>
  
  <script>
  import { initializeApp } from 'firebase/app';


import { getDatabase, ref, set, get, update, push, serverTimestamp, increment, runTransaction, onValue } from 'firebase/database'

  export default {
    props: ['order', 'db', 'business', 'checkout_session_id', 'taxes'],
    data() {
      return {
       // db: null,
        loading: false,
        // Dummy cart data
        cartItems: [
          {
            id: 1,
            name: "Spicy Chicken Burger",
            price: 12.99,
            quantity: 2
          },
          {
            id: 2,
            name: "Sweet Potato Fries",
            price: 4.50,
            quantity: 1
          },
          {
            id: 3,
            name: "Chocolate Milkshake",
            price: 5.99,
            quantity: 2
          },
          {
            id: 4,
            name: "Caesar Salad",
            price: 8.75,
            quantity: 1
          }
        ],
        cart: []
      }
    },
    created() {
        //alert(this.taxes)
        if (this.order) {
            // items will be here
            let item_keys = Object.keys(this.order) 
            for (let key of item_keys) {
                let item = this.order[key];
                if (typeof(item) === 'object' && item.status !== 'paid') {
                    this.cart.push(item)
                }
            }
        }
        else {

        }
    },
    computed: {
      subtotal() {
        return this.cart.reduce((total, item) => {
            if (item.unitprice) {

              return total + (item.unitprice * item.quantity);
            }
            return 0
        }, 0);
      },
      tax() {
        // Assuming tax rate of 8%
        return 0;
      },
      taxesBreakdown() {
          /*
              examples of what it returns [{
                  tax, 
                  value,
                  
              }]
          */
          const array = []
          if (this.taxes && this.subtotal) {
              let total_tax_value = 0;
              JSON.parse(this.taxes).forEach(tax => {
                  if (tax.type === 'percent' && tax.value) {

                    

                          const obj = {
                              name: tax.name,
                              value_total: parseFloat(tax.value / 100) * (this.subtotal).toFixed(2),
                          }
                          array.push(obj)
                      






                  }

              })
              return array;
          }
          array
          return []

      },
      total() {
        return this.subtotal + this.totalTaxes || 0;
      },
      totalTaxes() {
          return this.taxesBreakdown.map(t =>
              parseFloat(t.value_total).toFixed(2)).reduce((accumulator, currentValue) => {
                  return parseFloat(accumulator) + parseFloat(currentValue);
              }, 0)
        },

        grandTotal() {
          return this.total
        }
    },
    methods: {

      payWithBudpay() {
        let vm = this;
        BudPayCheckout({
                key: this.$config.BUDPAY_PUBLIC_KEY || 'pk_test_ts9gpurgsis82hlhoaezoayijt06m4vhn4jrk2', // Replace with your public key
                email: this.customer?.email || 'anon@gmail.com',
                amount: this.grandTotal.toFixed(2),
                first_name: this.customer?.name || 'anon',
                last_name: this.customer?.name || 'anon',
                currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars
                reference: '' + Math.floor((Math.random() * 100000000000) + 1) + new Date().getSeconds() + new Date().getMilliseconds(), // generates a pseudo-unique reference. Please replace with a reference you generated. or remove the line entirely so our API will generate one for you
                callback: (response) => {
                //this happens after the payment is completed successfully
                    var reference = response.reference;
                    let data = response
                    //alert('Payment complete! Reference: ' + reference + ', Status: ' + response.status);
                    this.step = 5;
                    
                    
                    let payload = { type: "order-paid", checkout_session_id: vm.checkout_session_id, ...data, business_id: this.business.id };
                        
                    this.$api.post("/transactions/payment", payload).then(resp => {
                            //this.registerFirebaseOrder()

                            this.$close()

                    });

                      

                       
                },
                onClose: function (response) {
                    console.log(response);
                    alert('Transaction was not completed, window closed.');
                },
                    
            });
      },
      pay() {
        
      },
      proceedToPayment() {
        this.loading = true;
        // Emit event to parent component to handle payment
        this.payWithBudpay()
      },
      addMoreItems() {
        // Close this modal and navigate to menu
        this.$store.commit('shop/setExistingCart', this.cart)
        this.$emit('close');
        this.$emit('onAddMore');
      },
      cancelOrder() {
        // Ask for confirmation before cancelling
        const confirmed = window.confirm("Are you sure you want to cancel this order?");
        
        // Only proceed if user confirms
        if (confirmed) {
            this.executeCancelOrder()

          // Clear the cart and emit an event to notify parent
          this.cart = [];
          this.$store.commit('shop/setCart', []);
          this.$emit('onCancel');
          this.$emit('close');
        }
      },
      async executeCancelOrder() {
        try {

            if (this.order.acceptance_status === 'accepted' || !this.order.status === 'paid') {
                alert("Can't cancel this order without the help of an assistant.")
                return
            }

            if (!this.db) {
                this.setupFirebase();
                
            }

           //))

           

           let space = this.order.space || "table_1"
    
            setTimeout(async () => {
    
                const order_ref = ref(this.db, `business_orders/${this.business.id}/${this.order?.space}/orders/${this.checkout_session_id}`);
               // alert(`business_orders/${this.business.id}/${this.order?.space}/orders/${this.checkout_session_id}`)
                let snap = await get(order_ref);
                let data = snap.val();
                
                if (data) {
                    update(order_ref, {
                        status: 'cancelled'
                    })
                }
            }, 500)
        }catch(e) {
            alert(e)
        }

        
      },
      setupFirebase() {
            const firebaseConfig = {
                apiKey: "AIzaSyBdh2ygNy-eIL0OtJwlA4LGAfHpcXMmWB8",
                authDomain: "pointsbudapp.firebaseapp.com",
                databaseURL: "https://pointsbudapp-default-rtdb.firebaseio.com",
                projectId: "pointsbudapp",
                storageBucket: "pointsbudapp.appspot.com",
                messagingSenderId: "76264286716",
                appId: "1:76264286716:web:b1caa1165fae6fb0a4aa79",
                measurementId: "G-PM3C3PV904"
            };

            const firebaseApp = initializeApp(firebaseConfig);
            this.db = getDatabase();
            // alert(this.db)

        },

    }
  }
  </script>
  
  <style lang="scss" scoped>
  // Variables
  $primary-color: #E53945;
  $primary-dark: darken($primary-color, 10%);
  $primary-light: lighten($primary-color, 35%);
  $secondary-color: #F3F2F7;
  $danger-color: #FF4D4F;
  $danger-dark: darken($danger-color, 10%);
  $text-color: #36454F;
  $border-color: #E0E0E0;
  $white: #FFFFFF;
  $shadow: rgba(0, 0, 0, 0.08);
  
  // Mixins
  @mixin flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  // Cart header styling
  .cart-header {
    padding: 24px 24px 0;
    text-align: center;
    
    .cart-title {
      font-size: 24px;
      font-weight: 700;
      color: $text-color;
      margin: 0 0 8px;
    }
    
    .cart-subtitle {
      font-size: 16px;
      color: lighten($text-color, 20%);
      margin: 0;
    }
  }
  
  // Cart body styling
  .cart-body {
    padding: 24px;
  }
  
  // Cart items styling
  .cart-items {
    margin-bottom: 24px;
    max-height: 60vh;
    overflow-y: auto;
  }
  
  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid $border-color;
    
    &:last-child {
      border-bottom: none;
    }
    
    .item-details {
      flex: 1;
      
      .item-name {
        font-size: 16px;
        font-weight: 500;
        color: $text-color;
        margin: 0 0 4px;
      }
      
      .item-quantity {
        font-size: 14px;
        color: lighten($text-color, 20%);
      }
    }
    
    .item-price {
      font-size: 16px;
      font-weight: 600;
      color: $text-color;
    }
  }
  
  // Empty cart styling
  .empty-cart {
    @include flex-center;
    flex-direction: column;
    padding: 40px 0;
    color: lighten($text-color, 30%);
    
    svg {
      margin-bottom: 16px;
    }
    
    p {
      font-size: 16px;
      margin: 0;
    }
  }
  
  // Cart summary
  .cart-summary {
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px dashed $border-color;
    
    .summary-line {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 14px;
      color: lighten($text-color, 20%);
      
      &.total {
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid $border-color;
        font-size: 18px;
        font-weight: 600;
        color: $text-color;
      }
    }
  }
  
  // Action buttons
  .cart-actions {
    display: flex;
    gap: 12px;
    margin-top: 24px;
  }
  
  // Primary button
  .primary-btn {
    flex: 1;
    padding: 14px;
    border-radius: 8px;
    border: none;
    background-color: $primary-color;
    color: $white;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    @include flex-center;
    
    &:hover:not(:disabled) {
      background-color: $primary-dark;
    }
    
    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    
    .loader {
      width: 20px;
      height: 20px;
      border: 2px solid $white;
      border-radius: 50%;
      border-top-color: transparent;
      animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  }
  
  // Secondary button
  .secondary-btn {
    flex: 1;
    padding: 14px;
    border-radius: 8px;
    border: 1px solid $border-color;
    background-color: $secondary-color;
    color: $text-color;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    @include flex-center;
    
    svg {
      margin-right: 8px;
    }
    
    &:hover {
      background-color: darken($secondary-color, 3%);
      border-color: darken($border-color, 8%);
    }
  }
  
  // Danger button
  .danger-btn {
    flex: 1;
    padding: 14px;
    border-radius: 8px;
    border: 1px solid $danger-color;
    background-color: rgba($danger-color, 0.1);
    color: $danger-color;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    @include flex-center;
    
    svg {
      margin-right: 8px;
    }
    
    &:hover {
      background-color: $danger-color;
      color: $white;
    }
  }
  
  // Media queries for responsiveness
  @media (max-width: 480px) {
    .cart-header {
      padding: 16px 16px 0;
      
      .cart-title {
        font-size: 20px;
      }
      
      .cart-subtitle {
        font-size: 14px;
      }
    }
    
    .cart-body {
      padding: 16px;
    }
    
    .cart-actions {
      flex-direction: column;
    }
  }
  </style>