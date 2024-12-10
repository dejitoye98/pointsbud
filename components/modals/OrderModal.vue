<template>
    <BaseModal v-if="item" @close="$emit('close')">
        <template #header>
            <div style="height: 300px; position: relative">

                <img :src="item.thumbnail">
                
                <div style="position: absolute; top: 16px; right: 16px; background: black; padding: 16px; border-radius: 50%;">
                    <svg @click="$emit('close')" style="cursor: pointer;" width="16" height="16" viewBox="0 0 8 8" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L7 7" stroke="white" stroke-width="0.5" stroke-linecap="round" />
                    <path d="M7 1L1 7" stroke="white" stroke-width="0.5" stroke-linecap="round" />
                    </svg>           

                </div>
         </div>

        </template>
        <template #body>
            <div class="padding-16">
                <div class="flex space-between">
                    <h2>{{item.name}}</h2>

                    <p class="price">{{item.currency || currencySymbol}} {{item.unitprice | money}}</p>

                </div>

                <div>
                    <p class="description">{{item.description}}</p>
                </div>

                <div class="additions" v-if="productAdditions">

                    <div class="additions__container"  v-for="(addition, index) in productAdditions" :key="index"> 
                        <p class="additions__header">{{addition.name}}</p>

                        <div class="checkbox-container" v-for="(option, o_index) in addition.options" :key="o_index">
                            
                            <label class="container"> {{option.name}} ({{ option.currency | currencySymbol }} {{ option.unitprice | money }})


                                    <input :checked="additionIsChosen(addition.name)" @change="changeAddition(addition.name, option)"   :name="addition.name" :value="option.name" :type="addition.input_type">
                               
                                <span class="checkmark"></span>
                            </label>

                        </div>

                    </div> 
                </div>


                <div class="quantity">
                    <button @click="decrease">
                        -
                    </button>
                    <input :value="isInCart?.quantity" @input="handleInput">

                    <button @click="increase">+</button>
                </div>


                <div class="cta">

                    <button class="big-btn full-width" @click="addToCart" v-if="!isInCart">
                        Add to Cart
                    </button>
                    <button style="background-color: red;" class="big-btn full-width" @click="removeFromCart" v-else>
                        Remove From Cart
                    </button>
                </div>

                <div class="">

                    <button @click="$emit('close')" style="background-color: white; color: black" class="big-btn full-width" v-if="!isInCart">
                       Close
                    </button>
                </div>

            </div>
        </template>
    </BaseModal>
</template>


<script>
import {mapGetters} from 'vuex'
export default {
    props: ['item'],
    data() {
        return {
            order: {
                quantity: 1,
                additions: [],
                variations: [],
                customer_comment: "",
                delivery_pack: {},
            }
        }
    },
    computed: {
        ...mapGetters('shop', ['cart']),
        isInCart() {
            return this.cart.find(item => item.id === this.item.id)

        },

        productAdditions() {
            return this.item && this.item.meta && JSON.parse(this.item.meta).additions || null;
        },
    },
    methods: {
        removeFromCart() {
            this.$store.dispatch('shop/removeFromCart', this.item.id)
        },
        handleInput($evt) {
            const value = $evt.target.value;
            this.$store.dispatch('shop/setItemQuantity', {id: this.item.id, quantity: value})

        },
        increase() {
            if (!this.isInCart) {
                this.$store.dispatch('shop/addToCart', {...this.item, quantity: 1, ...this.order})
                return
            }
            
            this.$store.dispatch('shop/increaseItemQuantity', this.item.id)

        },
        decrease() {
            this.$store.dispatch('shop/decreaseItemQuantity', this.item.id)

        },
        verifyAdditions() {
            if (this.productAdditions) {
                    // compare order additions to the additions and see what's required;
                    // alert('ewr')
                for (let addition of this.productAdditions) {
                    if (addition.required) {
                        // see if the user has it filled
                        if (!this.order.additions.find(a => a.addition == addition.name)?.value) {
                            alert('Please select ' + addition.name)
                            return 0;
                        }
                    }
                }


            }
            
            if (this.productQuestions) {
                    for (let i = 0; i < this.productQuestions.length; i++) {
                        const question = this.productQuestions[i];
                        if (question.required && !this.order.question_answers[i].answer) {
                            alert("Please answer all the required questions")
                            return 0
                        }
                    }



                }
                if (this.hasPackRequirements && this.deliveryPacks && this.deliveryPacks.length > 0) {
                    if (Object.keys(this.order.delivery_pack).length === 0) {
                        alert("Please choose a delivery pack")
                        return 0
                    }
                }


                if (this.productVariations && this.order.variations.length === 0) {
                    alert('Please select a variation of ' + this.focused_product.name)
                    return 0

                }
               // let cart = window.localStorage.getItem("cart");

               

                return 1
            
        },
        addToCart() {
            const payload = {
                ...this.item,
                ...this.order
            }

            if (!this.verifyAdditions()) {
                
                return;
            }

            let variations_quantity = 0;

            for (let v of this.order.variations) {
                variations_quantity += v.quantity
            }

            const item = {
                unitprice: this.item.unitprice,
                currency: this.item.currency,
                name: this.item.name,
                id: this.item.id,
                thumbnail: this.item.thumbnail,
                description: this.item.description,
                quantity: variations_quantity ? variations_quantity : this.order.quantity,
                customer_comment: this.order.customer_comment,
                additions: this.order.additions,
                variations: this.order.variations,
                question_answers: this.order.question_answers,
                availability: this.item.availability,
            };

           
            if (this.order.delivery_pack && Object.keys(this.order.delivery_pack).length > 0) {
                item.delivery_pack = this.order.delivery_pack
            }

            this.order.customer_comment = ''

           

             this.$store.dispatch('shop/addToCart', item)


            

            this.$emit('close')
        },
        additionIsChosen(name) {
            if (this.order.additions) {

                return this.order.additions.find(ad => ad.name === name) || null;
            }
        },
        changeAddition(addition_name, selected, operation = "set") {
            if (operation === 'set') {
                const addition_exists = this.order.additions.find(a => a.addition === addition_name);
                if (addition_exists) {
                    const index = this.order.additions.indexOf(addition_exists);
                    this.order.additions[index] = {
                        addition: addition_name, value: selected.name, unitprice: selected.unitprice, currency: selected.currency
                    }
                }
                else {
                    this.order.additions.push({ addition: addition_name, value: selected.name, unitprice: selected.unitprice, currency: selected.currency })

                }
            }

        },
    }


}
</script>


<style lang="scss" scoped>
img {
    object-fit: cover;
    height: 100%;
}
h2, .price {
    font-weight: 600;
    font-size: 16px;
}

.description {
    color: $charcoal !important;
}
.additions {
    &__container {
        //padding: 16px;
        //border: 2px solid grey;
       // width: 95%;
        margin: auto;
        //font-family: Poppins;

    }

    &__header {
        //font-family: Poppins;
       //font-family: "Open", sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
       // border-bottom: 2.123px solid #E4E4E4;
        border-radius: 8px;
        background: #F5F5F5;
        padding: 16px 8px;

        line-height: 20.018px; 
        @include media("<=t") {
            font-size: 15px;
            font-weight: 400;
        }
    }

    .checkbox-container {
        @include checkbox-input;
        display: flex;
       // align-items: center;
        //padding: px 16px;
        line-height: 32px;
        padding-left: 8px;
        padding-top: 16px;
        //font-family: Poppins !important;
    }
}

.quantity {
    display: flex;
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 20px 0;
    
    button {
        height: 30px;
        width: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        border-radius: 50%;
        background-color: black;
    }
    input {
        width: 50px;
        text-align: center;
    }
}
</style>