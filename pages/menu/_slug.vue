<template>
    <div class="menu">

        <BaseModal @close="show_receipt_modal = false" v-if="show_receipt_modal">
            <template #header>Receipt for your last order</template>
            <template #body>
                <div class="receipt">
                    <div class="receipt__container">
                        <div class="receipt__header">
                            <div class="receipt__logo">
                                <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/7QCEUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAGgcAigAYkZCTUQwYTAwMGE2YjAxMDAwMDRkMDIwMDAwYWUwMzAwMDBjZjAzMDAwMDBmMDQwMDAwYzIwNjAwMDA5YzA4MDAwMDBiMDkwMDAwMmMwOTAwMDA1ZDA5MDAwMGU0MGIwMDAwAP/bAEMABgQFBgUEBgYFBgcHBggKEAoKCQkKFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKP/bAEMBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/CABEIAJYAlgMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABAUGAwIBB//EABUBAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIQAxAAAAH8/CgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXM1mS1610c1eavM4a2HceDF6bhRGmznrgbTFa+uKAAAGqj0fs7yqXubXFeOZua3P+yzlZiWW8vL8zXW2Gjnj4AAGyz1jnzzsqDSEfLbfKl1zrbgqJUzLmqoLSmL3nykGXAABpPWZF72zgtPVSNF2y49aTMi6jVw00KmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/8QAJhAAAgMAAQIGAgMAAAAAAAAAAwQBAgUAFSAGERITFCE1YBAkMv/aAAgBAQABBQL90SRk9IVzyTopykwsuoQTOcmvcVaWKXOTFUufWQ1ibWlBZbnTAmCCtLFDjCYBP1PbqT6EeHOQ9ueIPyfGkDNqUBGPTBiJ0iXkhAnIHlYm1tAtky7Qoq32jiminGM75uhouVbNYYFsZxzuCFYpdVI3xET1aCCb5eiXKuWel3EPATkh29LQAY67T2bP1PZURJi/u1jlRktFotWeDoQskXMOeAEe/CReLcosclZi1e7AcYlxts7P8YTJ/c1CdQSFSSlfcspfP2DhOgvDjzOoabLFnUHn0Hd/QdeG2/o/Mz+3w/8Albf6aW9gK9F18jPqhxX+vo61JHopCzWj5shrqFHYRMKvpaCIjJhazVKt1CzndqWlRWOor8Zfg5XtKrYkWqq30W4cLTSiw66QQc859XUqFq2/JhINWTYnQXJLz1mafuv/xAAUEQEAAAAAAAAAAAAAAAAAAABg/9oACAEDAQE/AUn/xAAUEQEAAAAAAAAAAAAAAAAAAABg/9oACAECAQE/AUn/xAAzEAACAQMCAwUFCAMAAAAAAAABAgMAERIEIRMxQRAUICJxMkJRUmEFIzNgcoGRsSQ1Yv/aAAgBAQAGPwL86NLI4i0683NYRaxg/TiJsa4RbI4g3FAzavhv8uF6KSa0hwL2woCR8Uvu1qjZ9cQJFyXydKeXSahZ1TdhaxFAKLk8qA12pxl+SMXtUs2l1QdI1LEEWalEr4J1a16aTTarLoLra5qx8X2fEvscPP8AfsDSm5AC9j/pX+uzQNFhYQ28zWp5NQ4M8iFUjX+6Qn3FZh/FM7bsTc0/DNs1xb0oAczWkghv/jWJ+rda4sY+7nHEXxRRZqmqhGK5cmWrGIAfEsLVw0lEth5iOV6EkYTH6tTSx4FcR74+FCNLZE251pSMPuYbP5q7lq22P4Uh9w0hlAOPtWN9qMmhKzQnlY7imk1jrCoGwvck0NQ2PDj3AJ5mikjplz2ANDvHD46NdPMN1q3huqMR6VZ+IB9ey6o5H0FWbIH69lo1Zz9K88Tr6r2fcJIf0irS5Zf9dmSRSMPiFrcMPFFBxTwsT5f2q08hcDlfssZmGmhUuwpNbiA6Ng4Hw6Uka82NqOk0R4aR7Mw5saHeJGli6g71i20e7t6VjpWMEC+yqbU+m1PmnC5RSdfSoUm9gtvTqXeEKbKq7C1QpJ+Orksbc/FH6N/VGtM+V+MmXpWGplaJtScthc4ipdNHqXbvAxsy236VFxNsJBetQG+cmo4QupDt1vUsUWSxyK0a5fGmjcWZTY0dS34UKliaxhW77msHKyoOki3rvcUXBdXwZRyPiTHSRmRRbPrX+ug/moCdOgjiFhH0NYnSxqwGIa/KsmgSU8xl0ricFI2649aVNZp01AXYMdjWWj0SRyfMTe1ZX3veh33TJM49+9jQhijWGD5F60JkAJAI3rLUaGNpPipteljVFihXki/nb//EACYQAQACAQQBAwUBAQAAAAAAAAEAESExQVFhcRAggWCRocHwseH/2gAIAQEAAT8h+tGf7W/eA3Zan8KhvO0qfxExmNHZzZT5hNyZLqWS450yKOanfqRYMllFC5qKEVQN2GruW3fmwqbaOJtUsy2hgmHrscINIFApMPuTEleG7dfSpjo9GkNTzP7fH0QwDVGVzK/iwRxZhgX8iMI0NkjzN5+xaqCHaUE0iFYauYHVC/Jqff3WPiB1wr5if6FBh1QFHDgcy6MOKRmF2t8GU0jmXQvzF2QwRwj+Z92KHDfE0CUGY8MYntgTqSL9IUGzAQL3YBEdCoPPsAZ7l7MxUWGSCxajXtBbWI5SWrQuendUElWeFY9OnWBYAGnSwuOXOssWl1W/UbgBtayCmjU7NXEmKzFZs9yiU07MJiwmWmz06pOGuPvKcTNs1KaZFPzOJvp36sRey95JdjMng5YxxQ2zleZWQsg1G7mY1Sl/8joL4I2VNQQhoCsPn3fxuc/Ihg7LrlpBPwjMCZhdOq5rnV260wY6sPY5GY5o2NXUeBGnkX/YzqsGNjvwzoI5uWEeMwFhZWms0Hfc1Pc/JixbXMn7Ez3ZxolMcRKycRpZIqS5xKcata19wmk2lJ5inAjn4RZWbzuB81oFo75hdO3yuV3g82BozLdVq0rxFH/envl5frb/2gAMAwEAAgADAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKGCKDPLAAAKAKEHIAAAAAFIDMELAAAIMIMIIIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAGD/2gAIAQMBAT8QSf/EABQRAQAAAAAAAAAAAAAAAAAAAGD/2gAIAQIBAT8QSf/EACQQAQACAgICAQUBAQAAAAAAAAEAESExQVFhcSBggZGhscHx/9oACAEBAAE/EPrV76EQH9PQQI5QlfhoYXB3VRjlAdxjDdxByDWbAeRIlyqK9Yy+vMAkZbtzV7xPb0k5ts7qHsVmlMAQqU81XGofEY7MUBYujTmM+W2FNboyx0Bwg3FLbftFQKQeE2fJhrDCXYrtxOIz+tAMdD8cz9Z/ZtwDZLjkMuRwOyKDXFI20kOocZiHV5X5iS2hWqe4AaWAHmH6jEBDbVwEKNCp1+SYxMSDAa/xW+RrtgOmwaAYxENnA7yiqaqbltwO46jWWHOcLcu3oECpmC9jAsVBL2FgiwhwtoLRfDqOMBtN0MJZvpOI4BsGBUBMXTqNTEYFbvoialCGZAMK8vMQIJCNuOC0bjLlVHhYwOI4qqceSaaEwx6JaVN5PiuGZWD5EI3nBUZ9DDDgK6IcUW7UfuEa1hbeV6YNcztMj0+xNCv1g8YiUbZc/wCztGxa9sbSPAPyZiuYeGoxp21C+8EoIqnIbM8+PlbWlapSfhzFXrUKV+IQuQuxiGteVMxalUja+2PczwWr2gP7F1L1Iecq7ojLIoiqxpXSPmAW1J2xD2mIiSrrAYAZVtisFLBDa5omoigPlQl7PlxC6MInOgwlVmUdBAEaIm1z6+dz9n/YynIqlrGXOjMBcZt8lIcC5gdNgaM9JEjaUdh6I3F5pg4HUHkRnHDC8JXHGGBwakgUWmKRiPjEFVJCceKq1+0rqPYopDFlTAdZkCji3MOO4V2Abrz8qGdC6SK8ZGoulRW4pm0Rmt08m4UYy7pga/7CmNiiLuj6hFBpitzbmDISqG0V2HmPwYrHhShwMpoJU4S12dNwcCGghgZ+0wwhZ9iyp1MqBKuL8ou+QjEoQAJ9x9bH/9k="
                                    alt="">
                            </div>
                        </div>

                        <div class="receipt__container">
                            <BaseTable :show_search="false" :show_filter="false">
                                <template #header>



                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Price</th>


                                </template>
                                <template #data v-if="receipt_details">

                                    <tr v-for="(detail, index) in receipt_details.orders" :key="index">
                                        <td>{{ detail.product.name }}</td>
                                        <td>{{ detail.quantity }}</td>
                                        <td>{{ detail.currency }} {{ detail.total_amount }}</td>
                                    </tr>




                                </template>

                            </BaseTable>
                            <div class="receipt__total">
                                <p> {{ receipt_details.currency }} {{ receipt_details.total_amount }}</p>
                            </div>
                        </div>

                        <div class="receipt__footer">
                            <p>

                                © PointsBud.com
                            </p>
                        </div>
                    </div>
                </div>
            </template>
        </BaseModal>














        <template v-if="!loading_data">


            <!----  CART MODAL-->

            <BaseModal v-if="view_cart && cart.length > 0" @close="view_cart = false">
                <template #header>
                    <div class="cart-modal__header" v-if="cart_step === 2" @click.stop>
                        <div class="">
                            Cart
                        </div>
                        <div style="font-weight: 600; font-size: 16px" v-if="business_customer">
                            Available points:

                            <span> {{ business_customer.points - points_in_use }} </span>
                        </div>
                    </div>

                </template>

                <template #body>
                    <div class="cart-modal" @click.stop>

                        <div class="cart-modal__container" v-if="cart_step === 1">

                            <div class="cart-modal__redeem">

                                <p class="cart-modal__redeem__header"
                                    v-if="loyalty_program && loyalty_program.customer_reward_for_data_type === 'default' || !loyalty_program">
                                    Sign in to redeem points and discounts for your purchases</p>
                                <p class="cart-modal__redeem__header"
                                    v-if="loyalty_program && loyalty_program.customer_reward_for_data_type === 'freebie'">
                                    Sign in to stand a chance to get a freebie!</p>

                                <div class="cart-modal__redeem__auth">
                                    <div id="googleButton"></div>
                                </div>

                                <div class="or">
                                    <p>Or</p>
                                </div>


                                <div class="cart-modal__redeem__skipbtn">
                                    <button @click="cart_step = 2">Proceed to checkout</button>
                                </div>

                            </div>

                        </div>
                        <div class="cart-modal__container" v-else-if="cart_step === 2">
                            <div class="cart-modal__item" v-for="(item, index) in cart" :key="index">
                                <div class="cart-modal__item__thumbnail" v-if="item.thumbnail">
                                    <img :src="item.thumbnail || ''" alt="">
                                </div>
                                <div class="cart-modal__item__name">
                                    <div>

                                        <p>{{ item.name }}
                                        </p>


                                        <div style="display: flex;">

                                            <p style="margin-right: 8px;"> (Qty: {{ item.quantity }})</p>
                                            <!--<button>Change quantity</button>-->
                                            <button @click="removeCartItem(item)"><svg width="20" height="16"
                                                    viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M6.7 11.3C6.88334 11.4833 7.11667 11.575 7.4 11.575C7.68333 11.575 7.91667 11.4833 8.1 11.3L10 9.4L11.925 11.325C12.1083 11.5083 12.3333 11.6 12.6 11.6C12.8667 11.6 13.1 11.5 13.3 11.3C13.4833 11.1167 13.575 10.8833 13.575 10.6C13.575 10.3167 13.4833 10.0833 13.3 9.9L11.4 8L13.325 6.075C13.5083 5.89167 13.6 5.66667 13.6 5.4C13.6 5.13333 13.5 4.9 13.3 4.7C13.1167 4.51667 12.8833 4.425 12.6 4.425C12.3167 4.425 12.0833 4.51667 11.9 4.7L10 6.6L8.075 4.675C7.89167 4.49167 7.66667 4.4 7.4 4.4C7.13333 4.4 6.9 4.5 6.7 4.7C6.51667 4.88334 6.425 5.11667 6.425 5.4C6.425 5.68333 6.51667 5.91667 6.7 6.1L8.6 8L6.675 9.925C6.49167 10.1083 6.4 10.3333 6.4 10.6C6.4 10.8667 6.5 11.1 6.7 11.3ZM2 16C1.45 16 0.979002 15.804 0.587002 15.412C0.195002 15.02 -0.000664969 14.5493 1.69779e-06 14V2C1.69779e-06 1.45 0.196002 0.979002 0.588002 0.587002C0.980002 0.195002 1.45067 -0.000664969 2 1.69779e-06H18C18.55 1.69779e-06 19.021 0.196001 19.413 0.588001C19.805 0.980001 20.0007 1.45067 20 2V14C20 14.55 19.804 15.021 19.412 15.413C19.02 15.805 18.5493 16.0007 18 16H2Z"
                                                        fill="#F24E1E" />
                                                </svg>
                                            </button>
                                        </div>

                                    </div>
                                    <div class="points"
                                        v-if="loyalty_program && canUsePoints(item) || products_using_points.includes(item.id)">
                                        <label for="">
                                            <input type="checkbox"
                                                :disabled="!canUsePoints(item) && !products_using_points.includes(item.id)"
                                                @change="usePoints($event, item, item.points_to_deduct * item.quantity)">Use
                                            {{
                                                item.points_to_deduct * item.quantity }} points
                                        </label>

                                    </div>
                                </div>

                                <div class="cart-modal__item__total" v-if="calculatePriceWithPoints(item).type === 'money'">
                                    <p>{{ item.currency }} {{ item.quantity * item.unitprice | money }}</p>
                                </div>
                                <div class="cart-modal__item__total" v-else>
                                    <div>
                                        <img style="margin-right: 8px;" src="../../static/coins.png" alt="">
                                    </div>
                                    <p>{{ calculatePriceWithPoints(item).value }}</p>
                                </div>


                            </div>

                            <div class="cart-modal__total">
                                <div>SubTotal</div>
                                <div>{{ cart[0].currency }} {{ cartTotal | money }}</div>
                            </div>
                            <div class="cart-modal__total" v-if="getPreference('consumption_tax')">
                                <div>Consumption Tax ({{ getPreference('consumption_tax')?.value || 0 }}%) </div>
                                <div>{{ cart[0].currency }} {{ consumptionTax | money }}</div>
                            </div>
                            <div class="cart-modal__total" v-if="getPreference('vat')">
                                <div>Vat ({{ getPreference('vat')?.value || 0 }}%) </div>
                                <div>{{ cart[0].currency }} {{ vat | money }}</div>
                            </div>

                            <div class="cart-modal__total">
                                <div><b>Total</b></div>
                                <div>{{ cart[0].currency }} {{ (parseFloat(vat) + parseFloat(consumptionTax) +
                                    parseFloat(cartTotal)) | money }}</div>
                            </div>
                        </div>

                        <div class="cart-modal__container" v-else-if="cart_step === 3">
                            <div class="cart-modal__orderloading">
                                <p>Please hold on while your order is being reviewed. Don't close this page</p>
                            </div>

                            <div>
                                <LoadingState></LoadingState>
                            </div>
                        </div>

                        <div class="cart-modal__container" v-else-if="cart_step === 4">
                            <div class="cart-modal__orderaccepted"
                                style="display: flex; flex-direction: column; align-items:center; justify-content:center">
                                <div
                                    style="display: flex; margin-top: 48px; justify-content: center; width: 100px; margin:auto;">

                                    <img src="../../static/confetti.png" style="width: 100%; text-align: center" alt="">
                                </div>

                                <div class="cart-modal__orderaccepted__text"
                                    style="display: flex; margin-top: 16px; margin-bottom: 16px; font-size:16px; justify-content:center">
                                    <p style="text-align: center; padding: 16px;">Your order has been accepted.</p>

                                </div>
                                <button @click="makePayment">Make payment</button>


                                <!--
    
                                <div class="cart-modal__orderaccepted__offers">
                                    <p>You've also qualified for the following offers...</p>
                                    <div class="offers"
                                        style="display: flex; width: 100%;  justify-content: center; margin-top: 16px">
    
                                        <div class="offer" v-for="(type, index) in eligible_offers" :key="index"
                                            :style="{ background: type.background || '' }">
                                            <img v-if="type.offer === 'freebie'" src="../../static/offers_gift.png">
                                            <img v-else-if="type.offer === 'cashback'" src="../../static/offers_cashback.png">
                                            <img v-else-if="type.offer === 'discount'" src="../../static/icons8-coupon-58.png">
                                            <p class="offer__name">{{ type.title }}</p>
                                            <p class="offer__desc">{{ type.description }}</p>
    
                                            <button>View details</button>
                                        </div>
                                    </div>
                                </div> -->
                            </div>
                        </div>

                        <div class="cart-modal__container" v-else-if="cart_step === 6">
                            <div class="cart-modal__orderaccepted"
                                style="display: flex; margin-top: 48px; justify-content: center; width: 100px; margin:auto;">

                                <img src="../../static/confetti.png" style="width: 100%; text-align: center" alt="">


                                <div class="cart-modal__orderaccepted__text"
                                    style="display: flex; margin-top: 16px; margin-bottom: 16px; font-size:16px; justify-content:center">
                                    <p style="text-align: center; padding: 16px;">Your order has been accepted and is being
                                        processed</p>

                                </div>

                                <div>
                                    <!--<button @click="view_cart = false">Add to order</button> -->
                                </div>
                            </div>

                        </div>


                    </div>
                </template>
                <template #footer>
                    <div class="cart-modal__footer">
                        <div @click.stop class="order-modal__footer__cta" v-if="cart_step === 2">
                            <button id="go-back" @click="cart_step--">Go back</button>

                            <button :disabled="flag_creating_order" @click="completeOrder">Create Order</button>
                        </div>
                    </div>
                </template>
            </BaseModal>








            <!--- ORDER MODAL-->
            <BaseModal :show_header="false" :show_footer="false" v-if="show_order_modal"
                @close="show_order_modal = false; focused_product = null">
                <template #header>
                    <div class="order-modal__header" @click.stop>

                        <p class="order-modal__header__name">{{ focused_product.name }}</p>

                    </div>

                </template>
                <template #footer>
                    <div class="order-modal__footer">
                        <div class="order-modal__footer__form">

                            <div class="order-modal__footer__form__total">
                                {{ focused_product.currency }} {{ focused_product.unitprice * order.quantity | money }}
                            </div>
                        </div>

                        <div @click.stop class="order-modal__footer__cta">
                            <button @click="addToCart">Add to cart</button>
                        </div>
                    </div>
                </template>
                <template #body>
                    <div class="order-modal" @click.stop>
                        <div class="order-modal__top">
                            <div class="order-modal__top__points">{{ focused_product.points_to_earn }} points to earn</div>
                            <div><svg style="cursor: pointer;" @click="show_order_modal = false" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                                        fill="black" />
                                </svg>
                            </div>
                        </div>

                        <div class="order-modal__content">
                            <div class="order-modal__content__image">
                                <img :src="focused_product.thumbnail || business && business.logo">


                            </div>

                            <div class=" order-modal__content__name">
                                <p>{{ focused_product.name }}</p>
                            </div>

                            <div class="order-modal__content__description">
                                <p>{{ focused_product.description }}</p>
                            </div>

                            <div class="order-modal__content__quantity">
                                <p v-if="!isInCart(focused_product)" class="order-modal__content__quantity__header">Total:
                                    {{ focused_product.currency }} {{
                                        focused_product.unitprice * order.quantity | money }}
                                </p>

                                <p v-else class="order-modal__content__quantity__header">Total: {{ focused_product.currency
                                }} {{
    focused_product.unitprice * cart.find(i => i.id === focused_product.id).quantity | money
}}
                                </p>

                                <div class="order-modal__content__quantity__container">

                                    <button @click="decreaseQuantity"> -</button>
                                    <input type="text" v-if="!isInCart(focused_product)" v-model="order.quantity">
                                    <input type="text" v-else
                                        v-model="cart.find(i => i.id === focused_product.id).quantity">
                                    <button @click="increaseQuantity"> +</button>
                                </div>
                            </div>

                            <div class="order-modal__content__comment">
                                <p v-if="!order.to_add_comment" @click="triggerAddComment">Add a comment</p>

                                <div style="display: flex; flex-direction: column;"
                                    v-if="order.to_add_comment && !isInCart(focused_product)" class="form-input">
                                    <label for="">Comment</label>
                                    <textarea v-model="order.customer_comment"></textarea>
                                </div>


                            </div>

                            <div class="order-modal__content__ctas">
                                <button v-if="!isInCart(focused_product)" @click="addToCart">Add to cart</button>
                                <button style="background: red !important; color: white" v-else
                                    @click="removeCartItem(focused_product)">Remove from cart</button>
                            </div>
                        </div>




                    </div>
                </template>
            </BaseModal>






            <div class="navigation" v-if="show_navigation">
                <div class="navigation__container" @click="show_navigation = false">
                    <div class="navigation__wrapper">

                        <div class="navigation__header" @click.stop>
                            <img src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                                alt="">
                            <p>{{ this.customer && this.customer.name }} </p>
                            <p>{{ this.business && this.business.name }} customer</p>
                        </div>

                        <div class="navigation__content" @click.stop>
                            <div class="navigation__item" @click.stop>
                                <svg width="20" height="20" viewBox="0 0 32 32" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M19 21H13C12.2044 21 11.4413 21.3161 10.8787 21.8787C10.3161 22.4413 10 23.2044 10 24V26H12V24C12 23.7348 12.1054 23.4804 12.2929 23.2929C12.4804 23.1054 12.7348 23 13 23H19C19.2652 23 19.5196 23.1054 19.7071 23.2929C19.8946 23.4804 20 23.7348 20 24V26H22V24C22 23.2044 21.6839 22.4413 21.1213 21.8787C20.5587 21.3161 19.7956 21 19 21ZM16 20C16.7911 20 17.5645 19.7654 18.2223 19.3259C18.8801 18.8864 19.3928 18.2616 19.6955 17.5307C19.9983 16.7998 20.0775 15.9956 19.9231 15.2196C19.7688 14.4437 19.3878 13.731 18.8284 13.1716C18.269 12.6122 17.5563 12.2312 16.7804 12.0769C16.0044 11.9225 15.2002 12.0017 14.4693 12.3045C13.7384 12.6072 13.1136 13.1199 12.6741 13.7777C12.2346 14.4355 12 15.2089 12 16C12 17.0609 12.4214 18.0783 13.1716 18.8284C13.9217 19.5786 14.9391 20 16 20ZM16 14C16.3956 14 16.7822 14.1173 17.1111 14.3371C17.44 14.5568 17.6964 14.8692 17.8478 15.2346C17.9991 15.6001 18.0387 16.0022 17.9616 16.3902C17.8844 16.7781 17.6939 17.1345 17.4142 17.4142C17.1345 17.6939 16.7781 17.8844 16.3902 17.9616C16.0022 18.0387 15.6001 17.9991 15.2346 17.8478C14.8692 17.6964 14.5568 17.44 14.3371 17.1111C14.1173 16.7822 14 16.3956 14 16C14 15.4696 14.2107 14.9609 14.5858 14.5858C14.9609 14.2107 15.4696 14 16 14Z"
                                        fill="black" />
                                    <path
                                        d="M25 5H22V4C22 3.46957 21.7893 2.96086 21.4142 2.58579C21.0391 2.21071 20.5304 2 20 2H12C11.4696 2 10.9609 2.21071 10.5858 2.58579C10.2107 2.96086 10 3.46957 10 4V5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V28C5 28.5304 5.21071 29.0391 5.58579 29.4142C5.96086 29.7893 6.46957 30 7 30H25C25.5304 30 26.0391 29.7893 26.4142 29.4142C26.7893 29.0391 27 28.5304 27 28V7C27 6.46957 26.7893 5.96086 26.4142 5.58579C26.0391 5.21071 25.5304 5 25 5ZM12 4H20V8H12V4ZM25 28H7V7H10V10H22V7H25V28Z"
                                        fill="black" />
                                </svg>
                                Order History

                            </div>
                            <div class="navigation__item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="black"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M3 21.8V2.20001C3.03333 2.20001 3.07933 2.20401 3.138 2.21201C3.19667 2.22001 3.26733 2.26601 3.35 2.35001L4.15 3.15001C4.25 3.25001 4.36667 3.30001 4.5 3.30001C4.63333 3.30001 4.75 3.25001 4.85 3.15001L5.65 2.35001C5.75 2.25001 5.86667 2.20001 6 2.20001C6.13333 2.20001 6.25 2.25001 6.35 2.35001L7.15 3.15001C7.25 3.25001 7.36667 3.30001 7.5 3.30001C7.63333 3.30001 7.75 3.25001 7.85 3.15001L8.65 2.35001C8.75 2.25001 8.86667 2.20001 9 2.20001C9.13333 2.20001 9.25 2.25001 9.35 2.35001L10.15 3.15001C10.25 3.25001 10.3667 3.30001 10.5 3.30001C10.6333 3.30001 10.75 3.25001 10.85 3.15001L11.65 2.35001C11.75 2.25001 11.8667 2.20001 12 2.20001C12.1333 2.20001 12.25 2.25001 12.35 2.35001L13.15 3.15001C13.25 3.25001 13.3667 3.30001 13.5 3.30001C13.6333 3.30001 13.75 3.25001 13.85 3.15001L14.65 2.35001C14.75 2.25001 14.8667 2.20001 15 2.20001C15.1333 2.20001 15.25 2.25001 15.35 2.35001L16.15 3.15001C16.25 3.25001 16.3667 3.30001 16.5 3.30001C16.6333 3.30001 16.75 3.25001 16.85 3.15001L17.65 2.35001C17.75 2.25001 17.8667 2.20001 18 2.20001C18.1333 2.20001 18.25 2.25001 18.35 2.35001L19.15 3.15001C19.25 3.25001 19.3667 3.30001 19.5 3.30001C19.6333 3.30001 19.75 3.25001 19.85 3.15001L20.65 2.35001C20.7333 2.26668 20.8043 2.22101 20.863 2.21301C20.9217 2.20501 20.9673 2.20068 21 2.20001V21.8C20.9667 21.8 20.921 21.7957 20.863 21.787C20.805 21.7783 20.734 21.7327 20.65 21.65L19.85 20.85C19.75 20.75 19.6333 20.7 19.5 20.7C19.3667 20.7 19.25 20.75 19.15 20.85L18.35 21.65C18.25 21.75 18.1333 21.8 18 21.8C17.8667 21.8 17.75 21.75 17.65 21.65L16.85 20.85C16.75 20.75 16.6333 20.7 16.5 20.7C16.3667 20.7 16.25 20.75 16.15 20.85L15.35 21.65C15.25 21.75 15.1333 21.8 15 21.8C14.8667 21.8 14.75 21.75 14.65 21.65L13.85 20.85C13.75 20.75 13.6333 20.7 13.5 20.7C13.3667 20.7 13.25 20.75 13.15 20.85L12.35 21.65C12.25 21.75 12.1333 21.8 12 21.8C11.8667 21.8 11.75 21.75 11.65 21.65L10.85 20.85C10.75 20.75 10.6333 20.7 10.5 20.7C10.3667 20.7 10.25 20.75 10.15 20.85L9.35 21.65C9.25 21.75 9.13333 21.8 9 21.8C8.86667 21.8 8.75 21.75 8.65 21.65L7.85 20.85C7.75 20.75 7.63333 20.7 7.5 20.7C7.36667 20.7 7.25 20.75 7.15 20.85L6.35 21.65C6.25 21.75 6.13333 21.8 6 21.8C5.86667 21.8 5.75 21.75 5.65 21.65L4.85 20.85C4.75 20.75 4.63333 20.7 4.5 20.7C4.36667 20.7 4.25 20.75 4.15 20.85L3.35 21.65C3.26667 21.7333 3.19567 21.7793 3.137 21.788C3.07833 21.7967 3.03267 21.8007 3 21.8ZM7 17H17C17.2833 17 17.521 16.904 17.713 16.712C17.905 16.52 18.0007 16.2827 18 16C18 15.7167 17.904 15.479 17.712 15.287C17.52 15.095 17.2827 14.9993 17 15H7C6.71667 15 6.479 15.096 6.287 15.288C6.095 15.48 5.99933 15.7173 6 16C6 16.2833 6.096 16.521 6.288 16.713C6.48 16.905 6.71733 17.0007 7 17ZM7 13H17C17.2833 13 17.521 12.904 17.713 12.712C17.905 12.52 18.0007 12.2827 18 12C18 11.7167 17.904 11.479 17.712 11.287C17.52 11.095 17.2827 10.9993 17 11H7C6.71667 11 6.479 11.096 6.287 11.288C6.095 11.48 5.99933 11.7173 6 12C6 12.2833 6.096 12.521 6.288 12.713C6.48 12.905 6.71733 13.0007 7 13ZM7 9.00001H17C17.2833 9.00001 17.521 8.90401 17.713 8.71201C17.905 8.52001 18.0007 8.28268 18 8.00001C18 7.71668 17.904 7.47901 17.712 7.28701C17.52 7.09501 17.2827 6.99935 17 7.00001H7C6.71667 7.00001 6.479 7.09601 6.287 7.28801C6.095 7.48001 5.99933 7.71735 6 8.00001C6 8.28335 6.096 8.52101 6.288 8.71301C6.48 8.90501 6.71733 9.00068 7 9.00001ZM5 19.1H19V4.90001H5V19.1Z"
                                        fill="black" />
                                </svg>

                                Receipts

                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div class="menu__container">



                <!------ NAVIGATION -->

                <div class="menu__top" id="menu-top">
                    <div class="menu__top__container">
                        <div class="menu__top__header">



                            <div class="menu__top__navigation" @click="openNavigation" style="display: none;"
                                v-if="customer">
                                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" @click="openNavigation"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M2 3.5C2 3.36739 2.05268 3.24021 2.14645 3.14645C2.24021 3.05268 2.36739 3 2.5 3H13.5C13.6326 3 13.7598 3.05268 13.8536 3.14645C13.9473 3.24021 14 3.36739 14 3.5C14 3.63261 13.9473 3.75979 13.8536 3.85355C13.7598 3.94732 13.6326 4 13.5 4H2.5C2.36739 4 2.24021 3.94732 2.14645 3.85355C2.05268 3.75979 2 3.63261 2 3.5ZM2 7.5C2 7.36739 2.05268 7.24021 2.14645 7.14645C2.24021 7.05268 2.36739 7 2.5 7H13.5C13.6326 7 13.7598 7.05268 13.8536 7.14645C13.9473 7.24021 14 7.36739 14 7.5C14 7.63261 13.9473 7.75979 13.8536 7.85355C13.7598 7.94732 13.6326 8 13.5 8H2.5C2.36739 8 2.24021 7.94732 2.14645 7.85355C2.05268 7.75979 2 7.63261 2 7.5ZM2 11.5C2 11.3674 2.05268 11.2402 2.14645 11.1464C2.24021 11.0527 2.36739 11 2.5 11H13.5C13.6326 11 13.7598 11.0527 13.8536 11.1464C13.9473 11.2402 14 11.3674 14 11.5C14 11.6326 13.9473 11.7598 13.8536 11.8536C13.7598 11.9473 13.6326 12 13.5 12H2.5C2.36739 12 2.24021 11.9473 2.14645 11.8536C2.05268 11.7598 2 11.6326 2 11.5Z"
                                        fill="white" />
                                </svg>

                            </div>
                            <div class="menu__top__logo">
                                <img :src="business && business.logo">
                            </div>
                        </div>




                        <div class="menu__top__categories" id="categories-list">
                            <div :class="[chosenCategory === category.name ? 'selected' : '']" :id="category.name + '_nav'"
                                @click="selectCategory(category)" class="menu__top__categories__category"
                                v-for="(category, index) in categories" :key="index">{{ category.name }}</div>


                            <!--  <div class="scroll-left" id="scroll-left">
                            </div> -->

                            <!-- 
                            <button class="scroll-right" id="scroll-right">
                                <svg width="36" height="36  " viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6.4 18L5 16.6L9.575 12L5 7.4L6.4 6L12.4 12L6.4 18ZM13 18L11.6 16.6L16.175 12L11.6 7.4L13 6L19 12L13 18Z"
                                        fill="black" stroke-width="2" />
                                </svg>

                            </button>-->

                        </div>
                        <div style="background: gold; color: black; margin-top: 16px; padding: 8px; border-radius: 8px"
                            v-if="search_term !== '' && search_term !== ' '" class="search-results">
                            <p>{{ filteredProducts.length }} results found <span style="text-decoration:underline"
                                    @click="showSearchedProducts">Show</span></p>

                        </div>
                        <div class="form-input menu__top__search">


                            <input v-model="search_term" placeholder="search for an item on the menu" type="text"
                                class="menu__top__search__input">
                        </div>
                    </div>
                </div>


                <div class="menu__header">
                    <!--<div class="logo">
                        <img :src="business && business.logo" alt="">
                    </div>-->
                    <!-- 
                    <div class="categories">
                        <h2>Categories</h2>
                        <ul>
                            <li :class="[chosenCategory === category.name ? 'selected' : '']"
                                v-for="(category, index) in categories" :key="index" @click="selectCategory(category)">{{
                                    category.name }}</li>
                        </ul>
                    </div>-->







                    <!--
                    <div class="cart-button" v-if="cart && cart.length > 0" @click="viewCart"> 
                        <div class="cart-button__container">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                                    stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                                    stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                                    stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M9 8H21" stroke="white" stroke-width="1.5" stroke-miterlimit="10"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <p> Complete your order ({{ cart.length }} items)</p>

                        </div>
                    </div>-->


                </div>

                <div class="menu__login">
                    <div id="buttonDiv"></div>
                </div>

                <div class="menu__content" id="menu-content">

                    <!-- 
                    <div class="product" v-for="(product, index) in filteredProducts" :key="index"
                        @click="showOrderModal(product)">
                        <div class="product__image">
                            <img :src="product.thumbnail || business && business.logo" alt="">
                        </div>
                        
                        <div class="product__name">
                            {{ product.name }}
                        </div>

                        <div class="product__description">
                            {{ product.description }}
                        </div>
                        <div class="product__price">
                            {{ product.currency }} {{ product.unitprice | money }}
                        </div>

                      
                      
                    </div> -->

                    <div v-for="(category, index) in categories" :key="index" class="menu__content__item"
                        :id="category.name">
                        <div class="category-header-container">

                            <p class="category-header">{{ category.name }}</p>
                        </div>
                        <div :data-category="getCategory(product)" @click="showOrderModal(product)" class="product"
                            v-for="(product, index) in getCategoryProducts(category.id)" :key="index">
                            <div class="product__container">
                                <div class="product__image" v-if="product.thumbnail">
                                    <img :src="getProductCategoryImage(product.id)" alt="">

                                </div>

                                <div class="product__content">
                                    <p class="product__name">{{ product.name }}</p>

                                    <p class="product__description">
                                        <!--<TruncatedText :text="product.description" limit="100"></TruncatedText>-->
                                        {{ product.description }}
                                    </p>

                                    <div class="product__price">
                                        {{ product.currency }} {{ product.unitprice | money }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div class="checkout-cart">
                        <!--  <button>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="margin-right: 8px;"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                                    stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                                    stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                                    stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M9 8H21" stroke="black" stroke-width="1.5" stroke-miterlimit="10"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Complete your order
                            <span> ({{ cart.length }} items)</span>

                        </button>-->

                    </div>

                    <div class="bottom-sticky" style="display: none;">
                        <div class="bottom-sticky__container">
                            <button>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6.00001 23C4.60001 23 3.41668 22.5167 2.45001 21.55C1.48335 20.5833 1.00001 19.4 1.00001 18H2.50001C2.50001 18.9833 2.83735 19.8127 3.51201 20.488C4.18668 21.1633 5.01601 21.5007 6.00001 21.5V23ZM10.325 23C9.92501 23 9.54168 22.925 9.17501 22.775C8.80835 22.625 8.48335 22.4083 8.20001 22.125L0.950012 14.9L2.40001 13.825C2.73335 13.5917 3.07935 13.4543 3.43801 13.413C3.79668 13.3717 4.15068 13.4507 4.50001 13.65L7.00001 14.9V4C7.00001 3.71667 7.09601 3.479 7.28801 3.287C7.48001 3.095 7.71735 2.99933 8.00001 3C8.28335 3 8.52101 3.096 8.71301 3.288C8.90501 3.48 9.00068 3.71733 9.00001 4V12H11V2C11 1.71667 11.096 1.479 11.288 1.287C11.48 1.095 11.7173 0.999333 12 1C12.2833 1 12.521 1.096 12.713 1.288C12.905 1.48 13.0007 1.71733 13 2V12H15V3C15 2.71667 15.096 2.479 15.288 2.287C15.48 2.095 15.7173 1.99933 16 2C16.2833 2 16.521 2.096 16.713 2.288C16.905 2.48 17.0007 2.71733 17 3V12H19V5C19 4.71667 19.096 4.479 19.288 4.287C19.48 4.095 19.7173 3.99933 20 4C20.2833 4 20.521 4.096 20.713 4.288C20.905 4.48 21.0007 4.71733 21 5V19C21 20.1167 20.6083 21.0627 19.825 21.838C19.0417 22.6133 18.1 23.0007 17 23H10.325ZM22 5.025C22 4.175 21.7083 3.45833 21.125 2.875C20.5417 2.29167 19.825 2 18.975 2V0.5C20.225 0.5 21.2917 0.941667 22.175 1.825C23.0583 2.70833 23.5 3.775 23.5 5.025H22Z"
                                        fill="white" />
                                </svg>



                            </button>



                            <!-- 
                            <button v-if="cart && cart.length > 0" @click="viewCart">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="margin-right: 8px;"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                                        stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                                        stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                                        stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M9 8H21" stroke="black" stroke-width="1.5" stroke-miterlimit="10"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <span>{{ cart.length }}</span>
                            </button> -->
                        </div>
                    </div>

                    <div class="cart-sticky" v-if="cart && cart.length > 0" style="display: none">
                        <div class="cart-sticky__container">


                            <div class="cart-sticky__ctas" style="margin-top: 8px;">

                                <!--  <button disabled>Recommendations</button> -->
                                <button @click="viewCart">Go to cart ({{ cart.length }})</button>
                            </div>
                        </div>
                    </div>

                    <div class="cart-sticky" v-else style="display: none;">
                        <div class="cart-sticky__container">


                            <div class="cart-sticky__ctas" style="margin-top: 8px; width: 100% !important">

                                <button style="width: 100%;" disabled>Get recommendation</button>
                            </div>
                        </div>
                    </div>
                </div>




            </div>
        </template>


        <template v-else>
            <div class="loading">
                <div class="logo">
                    <img :src="business && business.logo" alt="">
                </div>
                <p>Loading menu. Please wait...</p>

                <LoadingState></LoadingState>
            </div>

        </template>

    </div>
</template>



<script>
import socket from "socket.io-client";


export default {
    data() {
        return {
            show_navigation: false,
            search_term: '',

            loading_data: true,
            flag_creating_order: false,

            created_order: null,
            business: null,

            categories: [],
            products: null,
            customer: null,
            /*
            customer: {
                name: "Deji Atoyebi"
            },*/
            business_customer: null,

            chosenCategory: null,
            show_order_modal: false,
            focused_product: {
                quantity: 1,
            },
            order: {
                quantity: 1,
                customer_comment: '',
                to_add_comment: false
            },
            quantity: 0,
            cart: [],
            view_cart: false,
            cart_step: 1,
            signed_in: false,

            points_in_use: 0,
            products_using_points: [],

            get_order_interval: null,
            points_earned: 0,

            eligible_offers: [{
                offer: 'discount',
                title: '50% discount on next purchase'
            }],

            paymentDetails: null,


            socketClient: null,

            show_receipt_modal: false,
            receipt_details: null,
            prefs: null,

            loyalty_program: null,


            category_ui_elements: [],
            scroll_position: 0,

        }
    },

    watch: {
        categories(value) {
            //this.category_ui_elements = value;
        },
        chosenCategory(value) {
            if (value && document.getElementById(value)) {

                document.getElementById(value).scrollIntoView({ behavior: 'smooth' });
                window.scrollBy({
                    top: -200
                })
                const element_nav = document.getElementById(value + "_nav");

                if (element_nav) {

                    const element_offset_left = element_nav.getBoundingClientRect().left;
                    const element_offset_right = element_nav.getBoundingClientRect().right;

                    // alert(element_offset_right)



                    if (element_offset_left + 50 > window.innerWidth) {
                        //alert(element_nav)

                        document.getElementById('categories-list').scrollBy({
                            left: element_offset_left - 20
                        })
                    }
                    else if (element_offset_left < 0) {
                        document.getElementById('categories-list').scrollBy({
                            left: element_offset_left - 20
                        })
                    }
                }
            }
            //alert(value)

        },
        loading_data(value) {
            if (value === false) {
                // this.initializeScrollingCategories()
                /*
                setTimeout(() => {
                    const category_container = window.document.getElementsByClassName('menu__top')[0];
                    const category_container_width = window.getComputedStyle(category_container).width;

                    const category_list = window.document.getElementById('categories-list')
                    const category_list_width = window.getComputedStyle(category_list).width;

                    //category_list.style.transform = "translateX(-100px)";

                    console.log(category_list.style.transform)


                    //alert()
                }, 2000)*/


                setTimeout(() => {

                    document.getElementById('scroll-right').addEventListener('click', (e) => {
                        //alert('s')
                        //alert('s')
                        let container_width = window.getComputedStyle(document.getElementsByClassName('menu__top__container')[0]).width;
                        container_width = container_width.split('px')[0]
                        container_width = parseInt(container_width)
                        document.getElementById('categories-list').scrollLeft += container_width - 100;
                    })
                }, 2000)



            }
            else {

            }
        },
        show_order_modal(value) {
            if (!value) {
                // this.to_add_comment = false;
                this.order.customer_comment = ''

            }
        },
        cart_step(value) {
            if (value === 1) {
                // Emit an event to the server
                google.accounts.id.initialize({
                    client_id: '309539494248-ir1uocjnkh6h8t3in55vn4r2m9jmt777.apps.googleusercontent.com',
                    callback: this.googleSignIn, //method to run after user clicks the Google sign in button
                    context: 'signin'
                })
            }
        },

        view_cart(value) {
            if (!value && this.cart_step === 6) {
                this.cart_step = 2
            }
        }
    },
    mounted() {
    },
    async created() {

        this.initializeScrollingCategories()


        //scroll




        window.localStorage.removeItem('cart')

        this.$api.get(`/businesses?slug=${this.$route.params.slug}`).then(resp => {
            this.business = resp.data.data;
            this.checkForLastOrder()
            this.getLoyaltyProgram()
            this.getPreferences()
            this.getCategories()
            this.getProducts();
            this.computeCartFromLocalStorage();
            this.isSignedIn();



        })



    },
    mounted() {
        this.socketClient = socket(this.$config.SOCKET_BASE); // Replace with your server URL

        if (this.$route.query.receipt_generated) {
            this.getReceipt()
            //this.show_receipt_modal = true;
        }
        // Add your event handlers here
        this.socketClient.on('connect', () => {
            console.log('Connected to server');
        });

        this.socketClient.on('disconnect', () => {
            console.log('Disconnected from server');
        });


        if (google) {

            // Emit an event to the server
            google.accounts.id.initialize({
                client_id: '309539494248-ir1uocjnkh6h8t3in55vn4r2m9jmt777.apps.googleusercontent.com',
                callback: this.googleSignIn, //method to run after user clicks the Google sign in button
                context: 'signin'
            })
        }


        this.initializeGoogleSignin()




        // render button

    },
    computed: {

        filteredProducts() {
            if (this.products) {
                let productsNotInCart = this.products;
                const category = this.categories.find(c => c.name === this.chosenCategory);

                if (category && !this.search_term) {

                    productsNotInCart = productsNotInCart.filter(item => parseInt(item.category_id) === parseInt(category.id)) || []

                }
                else if (this.search_term !== '' && this.search_term !== ' ') {
                    productsNotInCart = productsNotInCart.filter(item => item.name && item.name.toLowerCase().indexOf(this.search_term.toLowerCase()) > -1 || (item.description && item.description.toLowerCase().indexOf(this.search_item && this.search_term.toLowerCase()) > -1))

                }


                return productsNotInCart


            }

            return []

            /*
            if (this.products) {
    
                let productsNotInCart = this.products.filter(item => !this.cart.find(cart_item => item.id == cart_item.id)) || [];
                const category = this.categories.find(c => c.name === this.chosenCategory);
    
                if (category) {
    
                    productsNotInCart = productsNotInCart.filter(item => item.category_id === category.id) || []
    
                    if (this.search_term) {
                        productsNotInCart = productsNotInCart.filter(item => item.name.toLowerCase().indexOf(this.search_term.toLowerCase()) > -1 || item.description?.toLowerCase().indexOf(this.search_item.toLowerCase()) > -1)
                    }
                    return productsNotInCart
                }
                return []
    
            }
            return []
            /*if (this.chosenCategory) {
    
                const category = this.categories.find(c => c.name === this.chosenCategory);
                const category_id = category.id;
    
                return this.products.filter(product => product.product_categories.find(item => item.category_id === category_id))
            }
            return []*/

        },
        computedCart() {
            const cart = window.localStorage.getItem('cart');
            if (cart !== "null" && cart) return cart;

            return []
        },
        cartTotal() {
            let total = 0;
            this.cart.forEach(item => {
                if (!this.products_using_points.includes(item.id)) {
                    const price = item.quantity * item.unitprice;
                    total += price;
                }
            });

            // consumption tax and vat;


            let vat = this.getPreference('vat')
            vat = vat && vat.value || 0


            if (vat) {
                vat = parseFloat((vat / 100) * total)
            }
            //  alert(consumption_tax)
            return total

        },

        consumptionTax() {
            // consumption tax and vat;
            let consumption_tax = this.getPreference('consumption_tax')
            consumption_tax = consumption_tax && consumption_tax.value || 0;
            if (consumption_tax) {
                consumption_tax = parseFloat((consumption_tax / 100) * this.cartTotal).toFixed(2)
            }
            return consumption_tax

        },
        vat() {
            let vat = this.getPreference('vat')
            vat = vat && vat.value || 0


            if (vat) {
                vat = parseFloat((vat / 100) * this.cartTotal).toFixed(2)
            }

            return vat
            //  
        },
        totalPointsEarned() {
            // this
        }
    },
    methods: {
        initializeScrollingCategories() {
            //alert(JSON.stringify(menu_top))


            //alert(category_elements)
            window.addEventListener('scroll', () => {
                //console.log(this.category_ui_elements)

                try {

                    //alert('d')
                    //console.log(window.document.dataset)
                    const menu_top = document.getElementById('menu-top')
                    //console.log(menu_top)
                    this.categories.forEach(category => {




                        let element = document.getElementById(category.name)

                        var elDistanceToTop = window.pageYOffset;


                        const distance = element.getBoundingClientRect().top;
                        const nav = document.getElementById(category.name + '_nav');
                        const navOffset = document.getElementById(category.name + '_nav')?.getBoundingClientRect().left

                        if (distance > 100 && distance < 150) {
                            //console.log(element.getBoundingClientRect().top)
                            this.chosenCategory = category.name

                            console.log('nav')
                            console.log(category.name + '_nav')
                            console.log(navOffset)
                            console.log('window width')
                            console.log(window.innerWidth)






                        }

                        /* if (element.offsetHeight < menu_top.offsetHeight + 100) {
                             console.log('*****')
                             console.log('*****')
                             console.log(element)
                             console.log(menu_top.offsetHeight)
                             console.log('*****')
                             console.log('*****')
                         }*/
                    })
                } catch (e) {
                    console.log(e)
                }
            })
        },
        getCategoryProducts(category_id) {
            return this.products.filter(p => p.category_id === category_id)
        },
        getCategory(product) {
            return this.categories.find(c => c.id === product.category_id)?.name
        },
        getProductCategoryImage(product_id) {
            try {

                const product = this.products.find(p => p.id === product_id);

                if (product.thumbnail) return product.thumbnail;

                const category = this.categories.find(c => product.category_id);
                if (category && category.type.toLowerCase() === 'food') {
                    return 'https://alcaratello.com/wp-content/uploads/2021/03/meal-placeholder.jpg'
                }
                else {
                    return 'https://www.mixlabcocktails.com/images/cocktail-image/image-placeholder@3x.png'
                }
            }
            catch (e) {
                return null
            }
        },

        openNavigation() {
            this.show_navigation = true
        },
        checkForLastOrder() {
            let last_order = window.localStorage.getItem('last_order') && JSON.parse(window.localStorage.getItem('last_order')).id;
            if (last_order) {
                // see if order is completed;
                return this.$api.get(`/orders/pending-sales/` + last_order).then(resp => {
                    if (resp.data.data.status === 'completed') {
                        window.localStorage.removeItem('last_order')
                    }
                    else {

                    }
                })

            }
        },
        triggerAddComment() {
            this.order.to_add_comment = true;
        },
        getLoyaltyProgram() {
            this.$api.get(`/loyalty-programs?business_id=${this.business.id}`).then(resp => {
                this.loyalty_program = resp.data.data && resp.data.data[0];
            })
        },
        getPreference(pref) {
            return this.prefs.find(p => p.business_setting.setting_alias === pref)
        },
        getPreferences() {
            const setting_aliases = [
                "consumption_tax",
                "vat"
            ]

            this.$api.get(`/prefs?business_id=${this.business.id}&setting_aliases=${setting_aliases.join(',')}`).then(resp => {
                this.prefs = resp.data.data
            })
        },

        getSale() {

        },

        getReceipt() {
            this.$api.get('/receipts/' + this.$route.query.receipt_generated).then(resp => {
                this.show_receipt_modal = true
                this.receipt_details = resp.data.data
            })
        },
        isInCart(product) {
            return this.cart.find(item => item.id === product.id);
        },
        getPendingSale() {
            this.$api.get(`/orders/pending-sales/${this.created_order.id}`).then(resp => {
                if (resp.data.data.status === 'accepted') {
                    this.cart_step = 4;
                    clearInterval(this.get_order_interval);
                    //this.isSignedIn();
                    // this.cart = [];
                    window.localStorage.removeItem('cart');
                }
            })
        },
        completeOrder() {
            this.flag_creating_order = true;
            const orders = [];
            this.cart.forEach(item => {
                const obj = {
                    product_id: item.id,
                    points_earned: this.loyalty_program && item.points_to_earn || 0,
                    points_used: this.loyalty_program && this.products_using_points.includes(item.id) ? (item.quantity * item.points_to_deduct) : 0,
                    currency: item.currency,
                    quantity: item.quantity,
                    total_amount: this.products_using_points.includes(item.id) ? 0 : (item.quantity * item.unitprice),
                    customer_comment: item.customer_comment

                }

                orders.push(obj)
                this.points_earned += obj.points_earned
            })
            const slug = this.$route.params.slug;

            const r_uid = window.localStorage.getItem('last_order') && JSON.parse(window.localStorage.getItem('last_order')).r_uid || Date.now();
            const space_id = this.$route.query.space_id;
            const space_type = this.$route.query.space_type;

            //alert(`orders:${this.$route.params.slug}:${r_uid}`)
            if (!window.localStorage.getItem('last_order')) {
                this.socketClient.emit('created_order', {
                    token: this.$cookies.get('loyal-token'),
                    r_uid,
                    business_slug: slug, business_id: this.business.id, items: orders,
                    vat: parseFloat(this.vat || 0),
                    consumption_tax: parseFloat(this.consumptionTax || 0),
                    space_id,
                    space_type,
                    pending_sale_id: window.localStorage.getItem('last_order') && JSON.parse(window.localStorage.getItem('last_order')).id
                })

            }
            else {
                this.socketClient.emit('add_to_order', {
                    token: this.$cookies.get('loyal-token'),
                    r_uid,
                    business_slug: slug, business_id: this.business.id, items: orders,
                    vat: parseFloat(this.vat || 0),
                    consumption_tax: parseFloat(this.consumptionTax || 0),
                    space_id,
                    space_type,
                    pending_sale_id: window.localStorage.getItem('last_order') && JSON.parse(window.localStorage.getItem('last_order')).id
                })
            }
            this.socketClient.on('received_order_' + r_uid, (data) => {
                this.cart_step = 3
                this.flag_creating_order = false;
                this.socketClient.emit('join_room', { room: `orders:${r_uid}` })
                this.socketClient.on('order-accepted', (data) => {
                    this.cart_step = 4;
                    //alert(data)
                    this.paymentDetails = data;
                })

                this.socketClient.on('order-completed', (data) => {
                    window.localStorage.removeItem('last_order')
                })

                this.socketClient.on(`processing-order`, (data) => {
                    this.cart_step = 6

                    window.localStorage.removeItem('cart');
                    this.cart = []
                    window.localStorage.setItem('last_order', JSON.stringify({ id: data.id, r_uid: data.r_uid, created: Date.now() }))

                })

            });











            /*
            this.$api.post('/orders', { business_id: this.business.id, items: orders }).then(resp => {
    
                this.cart_step = 3;
                this.created_order = resp.data.data;
    
                this.get_order_interval = setInterval(() => {
                    this.getPendingSale();
                }, 10000)
            }).finally(() => {
                this.flag_creating_order = false;
            })*/

        },
        makePayment() {
            FlutterwaveCheckout({
                public_key: process.env.FLW_PUBLIC_KEY || "FLWPUBK_TEST-ad1d316f90548fca239af66bd32bd954-X",
                tx_ref: `pointsbudtx_${Date.now()}`,
                amount: this.paymentDetails.total_amount,
                currency: this.paymentDetails.currency,
                payment_options: "card, banktransfer, ussd",
                //redirect_url: "https://ae83-102-89-45-99.ngrok.io/api/v1/transactions/verify-flw",
                meta: {
                    //customer_id: this.userDetails.business ? this.userDetails.business.id : this.userDetails.id,
                    //is_business: this.userDetails.business ? 1 : 0
                },
                narration: "Wallet Funding",
                customer: {
                    email: this.customer && this.customer.email || 'anon@gmail.com',
                    // phone_number: this.userDetails.contact_phone_number,
                    name: this.customer && this.customer.name || 'Anon-Customer',
                },
                customizations: {
                    title: "PointsBud",
                    logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
                },
                callback: (data) => {
                    //this.$store.commit('dashboard/setActionFundWallet', false);
                    this.cart_step = 5;
                    let payload = { type: 'order-paid', pending_sale_id: this.paymentDetails.id, ...data, business_id: this.business.id }
                    this.$api.post('/transactions/verify-flw', payload).then(resp => {
                        this.socketClient.emit('order-paid', { ...payload, ...resp.data.data })
                        this.$router.push(`/menu/${this.$route.params.slug}?receipt_generated=${resp.data.data.receipt_id}`)
                    })
                }
            });
        },

        calculatePriceWithPoints(product) {
            if (this.products_using_points.includes(product.id)) {
                return {
                    value: (product.quantity * product.points_to_deduct),
                    type: 'points'
                }
            }
            else {
                return {
                    value: product.quantity * product.unitprice,
                    type: 'money'
                }
            }
        },
        canUsePoints(product) {
            // if points_in_use and item points and < available points er
            if (this.business_customer && this.loyalty_program) {

                if (parseInt(this.points_in_use + (product.points_to_deduct * product.quantity)) <= this.business_customer.points) {
                    return true
                }
                return false;
            }
            return false;
        },
        usePoints($event, product, points) {
            if ($event.target.checked) {

                this.points_in_use += points;
                this.products_using_points.push(product.id)
            }
            else {
                this.points_in_use -= points;
                const index = this.products_using_points.indexOf(product.id);
                this.products_using_points.splice(index, 1)
            }
        },
        viewCart() {
            this.view_cart = true;
            setTimeout(() => {
                this.initializeGoogleSignin();
            }, 1000)
        },
        initializeGoogleSignin() {
            google.accounts.id.renderButton(
                document.getElementById('googleButton'),
                {
                    type: 'standard',
                    size: 'large',
                    text: 'signin_with',
                    shape: 'rectangular',
                    theme: 'dark',
                    logo_alignment: 'center',
                    width: 250
                }
            )
        },
        googleSignIn(response) {
            console.log(JSON.stringify(response))
            this.$api.post('/auth/google/signin', {
                credential: response.credential,
                business_id: this.business.id
            }).then(resp => {
                this.$cookies.set("loyal-token", resp.data.data.token);
                this.cart_step = 2;
                this.customer = resp.data.data.customer;
                this.business_customer = resp.data.data.business_customer;

            }).catch(err => {

            })
        },
        isSignedIn() {
            this.$api.get('/auth/loggedin?business_id=' + this.business.id).then(resp => {
                this.signed_in = true;
                this.cart_step = 2;
                this.customer = resp.data.data.customer;
                this.business_customer = resp.data.data.business_customer


            }).catch(err => {
                this.signed_in = false;
            })
        },


        computeCartFromLocalStorage() {
            const cart = window.localStorage.getItem('cart');
            if (cart !== "null" && cart) {

                this.cart = JSON.parse(cart)
                return
            }
            this.cart = []

        },
        increaseQuantity() {
            try {
                if (this.isInCart(this.focused_product)) {
                    this.cart.find(i => i.id === this.focused_product.id).quantity++;
                    return
                }
                this.order.quantity++;
            } catch (e) {
                alert(e)
            }
            // this.focused_product.quantity++;
        },
        decreaseQuantity() {


            if (this.isInCart(this.focused_product) && this.cart.find(i => i.id === this.focused_product.id).quantity > 1) {
                this.cart.find(i => i.id === this.focused_product.id).quantity--;
                return
            }
            if (this.order.quantity > 1) {

                this.order.quantity--;
            }
        },
        showOrderModal(product) {
            this.show_order_modal = true;
            this.focused_product = product;
        },
        selectCategory(category) {
            this.chosenCategory = category.name;
            document.getElementById('menu-content').scrollIntoView({
                behavior: 'smooth'
            })
        },
        showSearchedProducts() {
            document.getElementById('menu-content').scrollIntoView({
                behavior: 'smooth'
            })
        },
        getCategories() {
            if (this.business) {

                this.$api.get(`/categories?business_id=${this.business.id}`).then(resp => {
                    this.categories = resp.data.data;
                    this.chosenCategory = this.categories[0]?.name;




                }).catch(err => {
                    alert(JSON.stringify(err.message))
                })
            }
        },
        getProducts() {
            this.loading_data = true;
            this.$api.get(`/products?business_id=${this.business.id}`).then(resp => {
                this.products = resp.data.data;
            }).finally(() => {
                this.loading_data = false;
            });
        },
        addToCart() {
            let cart = window.localStorage.getItem('cart');
            const item = {
                ...this.focused_product,
                quantity: this.order.quantity,
                customer_comment: this.order.customer_comment,
            }
            this.order.customer_comment = ''
            if (cart !== 'null' && cart) {
                cart = JSON.parse(cart)
                cart.push(item);
                window.localStorage.setItem('cart', JSON.stringify(cart));
                this.cart.push(item)
            }
            else {
                cart = [item]
                this.cart = cart;
                window.localStorage.setItem("cart", JSON.stringify(cart))
            }
            this.order.quantity = 1;
            this.show_order_modal = false;

        },
        removeCartItem(item) {
            let cart = window.localStorage.getItem('cart');
            if (cart !== 'null' && cart) {
                cart = JSON.parse(cart);
                cart = cart.filter(c => c.id !== item.id);
                window.localStorage.setItem('cart', JSON.stringify(cart));
                this.cart = cart;

            }

            if (this.view_cart) {
                this.view_cart = false;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
$gradient-background: linear-gradient(to bottom right, #2c2e3e, #2e2d3c, #2d2c37);

* {
    //font-family: 'Red Hat Display' !important;
    touch-action: manipulation;
    font-family: 'Open Sans', sans-serif;

}

.category-header {
    font-size: 20px;
    //background-color: rgba(255, 217, 0, 0.283);
    border-radius: 50px;

    // width: 90%;
    width: fit-content;
    margin: auto;
    text-align: center;
    font-weight: 600;
    padding: 20px 16px;
    margin-bottom: 30px;
    //border: 1px solid grey;
    font-size: 18px;
    background: $dashboard-background-color;

}

.category-header-container {
    border-bottom: 3px dashed lightgrey;
    height: 36px;
    margin-bottom: 50px;
    //padding-bottom: 100px;
}


.navigation {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100000000000000000000000000000000000000;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    width: 100%;
    min-height: 100%;


    &__wrapper {
        width: 70%;
        background: rgb(247, 247, 247);
        min-height: 100vh;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;



    }


    &__container {
        //  background-color: pink;
    }

    &__header {
        padding: 32px 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #4b4e5f;
        color: white;
        font-size: 14px;
        font-weight: 600;
        //letter-spacing: 0.7px;
        flex-direction: column;
        border-bottom: 1px solid rgba(86, 86, 86, 0.296);

        p {
            text-align: center;

            &:last-of-type {
                color: lightgrey;
            }
        }

        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin: auto;
            margin-bottom: 8px;
        }
    }

    &__item {
        padding: 16px;
        display: flex;
        //justify-content: center;



        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &:hover {
            background: whitesmoke;
        }

        svg {
            margin-right: 8px;
            ;
        }
    }
}

.bottom-sticky {
    position: fixed;
    right: 0;
    bottom: 0;
    height: fit-content;
    width: fit-content;

    &__container {

        //background-color: black;
        display: flex;
        flex-direction: column;
        padding: 5px;
    }

    button {
        width: 70px;
        background-color: gold;
        height: 70px;
        border-radius: 50%;
        position: relative;
        margin-bottom: 10px;

        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

        &:hover {
            transform: scale(1.1);
            box-shadow: rgba(100, 100, 111, 0.656) 0px 7px 29px 0px;

        }

        &:first-of-type {
            background: $primary;

            svg {
                path {
                    stroke: white !important;
                    stroke-width: 0.5 !important;

                }
            }
        }

        svg {
            position: absolute;
            top: 0;
            left: 0;

            margin-left: 30%;
            margin-top: 35%;

            path {
                stroke: black;
                stroke-width: 2;
            }
        }

        span {
            position: absolute;
            left: 0;
            top: 0;
            margin-left: 20%;
            margin-top: 15%;
            background: red;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            text-align: center;
            align-items: center;
            justify-content: center;
            color: white;

        }

    }
}

.receipt {
    min-width: 350px;

    &__logo {
        width: 50%;
        margin: auto;

        img {
            border-radius: 50%;
            margin-top: 14px;
            width: 50px;
            height: 50px;
            margin: auto;
            margin-top: 10px;

        }

    }

    &__container {
        padding: 16px;
    }

    &__footer {
        color: $faint;
        font-size: 12px;
        text-align: center;
        margin-top: 16px;
    }
}


.checkout-cart {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    background: white;
    height: 60px;
    border-top: 0.2px solid rgb(168, 168, 168);


    button {
        @include smallbutton;
        border-radius: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        //margin-right: 5px;
        background: gold;
        color: black;
        align-items: center;
        font-size: 18px;

        position: relative svg {
            margin-left: 5px;
        }

        span {

            margin-left: 5px;

            color: black;
            border-radius: 50%;
            //position: absolute;
            //right: 0;
        }


    }

}

.cart-sticky {
    min-height: 50px;
    width: 100%;
    background: white;
    border-top: 0.5px solid dashed;
    z-index: 50000000000000000000000;
    bottom: 0;
    left: 0;
    position: fixed;

    &__header {
        border: 2px solid whitesmoke;
        padding: 8px;
    }

    &__container {
        padding: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;


        p {
            font-weight: 600;
        }

        button {
            @include smallbutton;
            background: gold;
            color: black;
        }
    }

    &__ctas {
        display: flex;
        width: 100%;
        //flex-direction: column;
        @include card;

        button {
            border-radius: 1px;
            margin-bottom: 8px;
            width: 50%;
            word-break: break-all;
            padding: 10px;

            &:first-of-type {
                background: linear-gradient(to bottom right, #2c2e3e, #2e2d3c, #2d2c37);
                color: white;
            }
        }
    }
}

.loading {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    color: $charcoal;
    margin-top: 10vh;
    font-size: 14px;
    font-weight: 400;
}

.selected {
    //olor: red;
    background: gold !important;
    color: black !important;
    font-weight: 600 !important; //border-radius: 20px;

}

.offer {
    @include card;
    background: teal;
    color: white;
    //padding: 16px 8px;
    padding: 32px;
    min-height: 100px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 220px;
    height: 220px;
    margin: auto;
    border: 5px solid $primary;


    &:hover {
        filter: brightness(0.9);
    }

    &__name {
        font-size: 16px !important;
        font-weight: 500 !important;
        color: white !important;

    }

    &__desc {
        text-align: center;
        font-size: 13px;
    }

    img {
        //border: 1px solid white;
        //width: 60px;
        //height: 60px;
        //width: 100%;
    }

    button {
        background: transparent;
        //border: 1px solid whitesmoke;
        padding: 2px 16px;
        border-radius: 8px;
        margin-top: 8px;
        background: $primary;
        color: white;

        &:hover {}
    }
}

.cart-button {
    width: 50%;
    display: flex;
    justify-content: center;
    margin: auto;
    margin-top: 16px;

    &__container {
        @include smallbutton;
        position: relative;
        display: flex;


        svg {
            stroke: white !important;
            margin-right: 8px;
        }
    }


}

.cart-modal {
    min-width: fit-content;
    box-sizing: border-box;
    //letter-spacing: 0.6px;
    padding: 20px;

    &__container {
        padding: 8px;
    }


    &__redeem {
        padding: 16px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &__header {
            font-size: 20px;
            text-align: center;
            color: black;
            font-weight: 500;
            max-width: 400px;
            margin: auto;
            box-sizing: border-box;

            @include media("<=t") {
                max-width: 300px;
                font-size: 13px;
            }
        }

        &__auth {
            display: flex;
            margin-top: 16px;
            justify-content: center;
        }

        .or {
            margin: 16px 0;
        }


        &__skipbtn {}

        button {
            webkit-border-radius: 4px;
            border-radius: 4px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            -webkit-transition: background-color .218s, border-color .218s;
            transition: background-color .218s, border-color .218s;
            -webkit-user-select: none;
            -webkit-appearance: none;
            background-color: #fff;
            background-image: none;
            border: 1px solid #dadce0;
            color: #3c4043;
            cursor: pointer;
            font-family: "Google Sans", arial, sans-serif;
            font-size: 14px;
            height: 40px;
            //letter-spacing: 0.25px;
            outline: none;
            overflow: hidden;
            padding: 0 12px;
            position: relative;
            text-align: center;
            vertical-align: middle;
            white-space: nowrap;
            margin: auto;
            width: 248px;
            font-weight: 500;


        }
    }

    &__orderloading {
        margin-top: 24px;
        font-size: 18px;
        text-align: center;
        font-weight: 500;
        padding: 16px;
    }

    &__orderaccepted {
        display: flex;
        flex-direction: column;
        width: 50% !important;
        align-items: center;

        p {
            font-size: 18px;
            font-weight: 400;
            color: $charcoal;
            max-width: 400px;
        }

        &__offers {
            //background: whitesmoke;
            border: 5px dashed whitesmoke;
            padding: 16px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;


        }

        button {
            @include smallbutton;
            background: gold;
            color: black;
        }
    }

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
            color: black;
        }
    }


    &__item {
        border-bottom: 1px solid whitesmoke;
        display: flex;
        // grid-template-columns: 85% 10%;
        justify-content: space-between;

        padding: 16px 0;
        align-items: center;

        &:last-of-type {
            border-bottom: 0px !important;
        }


        &__thumbnail {
            //width: 100%;
            max-width: 100px;
            height: 80px;
            margin-right: 16px;




            img {
                object-fit: cover;
                height: 100%;
                width: 100%;
                border-radius: 5px;

            }
        }

        &__quantity {
            color: $faint;
        }

        &__name {
            font-size: 15px;
            font-weight: 500;
            margin-right: 16px;

            width button {
                border: 0.1px solid $charcoal;
                border-radius: 5px;
                padding: 2px 8px;

                &:hover {
                    background: grey;
                    color: white;
                }
            }

            .points {
                margin-top: 8px;

                input {
                    margin-right: 8px;

                }
            }
        }

        &__total {
            display: flex;
            justify-content: flex-end;
            font-weight: 500;
            //padding: 20px;
            white-space: nowrap;
        }
    }

    &__total {
        padding: 20px;
        display: flex;
        justify-content: space-between;
        padding: 8px 0;


        div {
            margin-right: 8px;
            max-width: 200px;

            &:last-of-type {
                font-weight: 600;
                margin-right: 0;
                white-space: nowrap;
                max-width: fit-content;
            }
        }
    }
}

/*
.product {
    padding: 24px;
    background: white;
    @include card;
    border-radius: 20px;
    height: max-content;
    cursor: pointer;

    transition: transform 0.2s ease-in-out, box-shadow 0.15s ease-in-out;


    margin-bottom: 50px;

    &:hover {
        transform: scale(1.05);
    }

    &__description {
        color: $charcoal;
        text-align: center;

    }

    &__cart {
        // background: gold;
        padding: 2px 10px;
        border-radius: 20px;
        display: block;
        margin: auto;
        width: fit-content;
        width: 50%;
        margin-top: 10px;
        font-size: 12px;
        border: 1px solid grey;
        text-align: center;
        background: $primary;
        color: white;
    }

    button {
        @include smallbutton;
        margin: auto;
        width: 100%;
        color: white;
        background-color: $primary;
    }


    &__image {
        height: 60px;
        width: 60px;
        //border-radius: 50%;
        margin: auto;
        margin-top: -50px;
        border-radius: 15px;




        img {
            width: 100%;
            height: 100%;
            border-radius: 15px;
            object-fit: cover;
            border: 3px solid gold;

        }

    }

    &__name {
        text-align: center;
        font-weight: 600;
        font-size: 15px;
        margin-top: 8px;
        text-transform: capitalize !important;
        //letter-spacing: 1.7px;
    }

    &__price {
        text-align: center;
        font-weight: 400;
        font-size: 15px;
        color: black;
        margin-top: 8px;
        //margin-top: 8px;
        font-weight: 600;
        margin-bottom: 8px;
    }

    &__points-earn {
        cursor: pointer;
        margin: auto;
        display: flex;
        align-items: center;
        margin: 8px auto;
        justify-content: center;
        color: lightseagreen;
        font-weight: 600;

        img {
            margin-right: 8px;
            height: 20px;
            width: 20px;
        }
    }

    &__points-deduct {
        cursor: pointer;
        margin: auto;
        display: flex;
        align-items: center;
        margin: 8px auto;
        justify-content: center;
        color: red;
        font-weight: 600;

        img {
            margin-right: 8px;
            height: 20px;
            width: 20px;
        }
    }

    &__cta {
        button {
            font-size: 15px;
            //text-transform: uppercase;
            //letter-spacing: 0.8px;
        }
    }
}*/


.product {
    cursor: pointer;
    margin: auto;
    background: white;
    margin-top: 20px;
    // border-radius: 10px;
    ///@include card;
    // background: white;
    height: max-content;
    //max-height: 250px;
    box-sizing: border-box;
    padding: 16px;
    width: 90%;



    &__container {
        //display: flex;
        display: grid;
        grid-template-columns: 100%;




    }

    &__image {
        width: 100%;
        //height: 100%;
        //padding: 2px 0;
        display: flex;
        //margin-right: 16px;
        //border-top-left-radius: 10px;
        //border-bottom-left-radius: 10px;


        img {
            width: 100%;
            height: 200px;
            margin: auto;
            object-fit: contain;
            // border-radius: 10px;
            //border-top-left-radius: 10px;
            // border-bottom-left-radius: 10px;

        }
    }

    &__content {
        width: 100%;
        padding: 8px 8px;
    }

    &__name {
        font-size: 16px;
        margin-bottom: 8px;
        font-weight: 600;
        text-align: center;
    }

    &__description {
        font-size: 14px;
        color: black;
        line-height: 1.5;
        margin-bottom: 16px;
        width: 100%;
        text-overflow: ellipsis;
        text-align: center;

    }

    &__price {
        background-color: rgba(255, 217, 0, 0.396);
        color: white;
        width: fit-content;
        padding: 3px 16px;
        border-radius: 20px;
        color: black;
        font-weight: 400;
        font-size: 15px;
        margin: auto;


    }


}

.menu {

    &__top {
        position: fixed;
        top: 0;
        left: 0;
        background: linear-gradient(to bottom right, #2c2e3e, #2e2d3c, #2d2c37);
        //min-height: 75px;
        min-width: 100%;
        box-sizing: border-box;
        z-index: 10000;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

        &__finish {
            line-height: 1;
        }

        &__header {
            // border: 1px solid white;
            display: flex;
            align-items: center;
        }

        &__container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            // align-items: center;
            padding: 16px;
            width: 100vw;
        }

        &__navigation {
            // border: 1px solid gold;
            cursor: pointer
        }

        &__search {
            // width: 100%;
            @include form-input;

            min-height: 40px !important;
            //border: 1px solid lightgrey;
            margin-bottom: 0px !important;
            margin: 16px auto;
            width: 90%;
            padding: 10px;
            display: flex;
            align-items: center;



            input {
                height: 40px;
                color: white;
                padding: 8px;
                display: flex;
                align-items: center;
                justify-content: center;




                &:focus {
                    outline: 0;
                    border-radius: 5px;

                }

            }


        }

        &__categories {
            display: flex;
            color: white;
            justify-content: flex-start;
            margin-top: 8px;
            cursor: pointer;
            height: 40px;
            flex-wrap: nowrap;
            overflow-x: scroll;

            width: 100%;
            min-width: auto;
            -ms-overflow-style: none;
            //margin-bottom: 36px;

            position: relativexw;

            &::-webkit-scrollbar {
                display: none;
            }

            .scroll-left {
                position: fixed;
                left: 0
            }

            .scroll-right {
                position: absolute;
                right: 0;
                //top: 10px;
                //margin-top: 8px;
                height: 40px;
                width: 40px;
                border-radius: 50%;

                background-color: gold;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            }

            //transform: translateX(-10px);

            &__category {
                //height: 50px;
                margin-top: 2px;
                font-weight: 300;
                cursor: pointer !important;
                margin-right: 10px;
                //border-bottom: 0;
                background: rgba(245, 245, 245, 0.111);
                border-radius: 5px;
                color: white;
                text-align: center;
                line-height: 1.5;
                //border: 1px solid white;
                box-sizing: border-box;
                white-space: nowrap;
                padding: 10px 16px;
                display: flex;
                justify-content: center;
                align-items: center;


                d &:first-of-type {
                    //border-bottom: 0;
                }
            }

        }

        &__logo {
            display: flex;
            height: 50px;
            // width: 50vw;
            margin-bottom: 8px;
            //width: 50%;
            margin: auto;


            img {
                height: 100%;
                //width: 100%;
                border-radius: 50%;
            }
        }

        button {
            background: gold;
            color: $charcoal;
            padding: 10px;
            font-size: 13.5px;
            font-weight: 600;
            border-radius: 5px;
            padding: 4px 8px;
            height: 50px;
            ;
            width: 100%;
            box-sizing: border-box;

        }
    }

    &__container {
        //padding: 24px 0px !imp;
    }

    &__header {
        //background-color: lightgrey;
    }

    &__content {
        padding-bottom: 300px;
        padding-top: 100px;
        margin-top: 100px;

        &__item {
            padding: 36px 0;
            // background: rgba(255, 217, 0, 0.333);
        }

    }

    /* &__content {
        //display: grid;
        //grid-template-columns: 23% 23% 23% 23%;
        //justify-content: space-between;
        margin: auto;
        display: flex;
        flex-direction: column;
        margin-top: 100px;
        width: 90%;
        padding-bottom: 300px;
        padding-top: 150px;

        @include media("<=t") {
            //  grid-template-columns: 100%;
        }

    }*/

    .logo {
        width: 50%;
        margin: auto;
        display: flex;
        justify-content: center;
        margin-bottom: 16px;

        img {
            border: 5px solid white;

        }
    }


}

.categories {
    width: 90%;
    margin: auto;
    background: white;
    border-radius: 10px;
    @include card;
    padding: 16px;
    margin: 32px auto;
    border: 1px solid rgb(252, 250, 250);

    //  transform: translateX(-200);



    @include media("<=t") {
        width: 90%;
    }

    h2 {
        font-size: 16px;
        font-weight: 600;
        text-align: center;
        margin-bottom: 16px;
    }

    ul {
        display: flex !important;
        flex-wrap: wrap;
        justify-content: center;
        cursor: pointer !important;



    }

    li {
        // margin-right: 16px;
        cursor: pointer !important;
        padding: 2px 16px;
        background: whitesmoke;
        margin-right: 16px;
        margin-bottom: 16px;
        text-align: center;
        font-size: 400;
        border-radius: 20px;

        &:hover {
            //text-decoration: underline;
            cursor: pointer;
            background: whitesmoke;
            color: $charcoal;
        }
    }
}

.order-modal {
    //width: fit-content;
    display: flex;
    flex-direction: column;
    width: 100%;

    &__top {
        display: flex;
        justify-content: space-between;
        padding: 16px;
        align-items: center;
        z-index: 100000000000000000000;

        &__points {
            background: gold;
            color: black;
            padding: 8px;
            font-size: 14px;
            font-weight: 500;
            border-radius: 10px;
        }
    }

    &__content {
        padding: 16px;

        &__comment {
            text-align: center;
            //border: 1px solid grey;
            color: goldenrod;
            margin: 8px 0;
            cursor: pointer;

            textarea {
                border: 1px solid lightgrey;
                resize: none;
                color: black;
                width: 50%;
                border-radius: 5px;
                padding: 8px;
                font-size: 12px;

                margin: auto;

                &:focus {
                    outline: 0;
                }
            }
        }

        &__image {
            width: 100%;
            margin: auto;
            display: flex;
            justify-content: center;
            max-width: 100px;
            max-height: 100px;

            img {
                width: 100%;
                height: auto;
                border-radius: 15px;
            }
        }

        &__name {
            font-weight: 600;
            text-align: center;
            margin: 16px auto;
            max-width: 300px;

        }

        &__description {
            color: $faint;
            max-width: 400px;
            margin: auto;
            text-align: center;

        }

        &__quantity {
            margin-top: 32px;

            &__header {
                font-size: 16px;
                text-align: center;
                font-weight: 500;
                margin-bottom: 8px;
            }


            &__container {
                width: 50%;
                display: flex;
                justify-content: center;
                margin: auto;
            }


            input {
                @include plain-form-input;
                border: 1px solid lightgray;
                max-width: fit-content;
                padding: 8px;
                text-align: center;
                border-radius: 50px;
                margin: 0 8px;

                &:focus {
                    outline: none;
                }
            }

            button {
                border-radius: 50px;
                font-size: 14px;
                font-weight: 700;
                border: 1px solid lightgray;
                width: 100px;
                padding: 8px 16px;

            }
        }

        &__ctas {
            margin: 32px auto;
            display: flex;
            justify-content: center;

            button {
                @include smallbutton;
                //background: gold;
                //color: black;
                background: $gradient-background !important;
                color: white;
            }
        }
    }


    &__header {
        display: flex;
        align-items: center;

        &__name {
            font-size: 18px;
            margin-right: 16px;
        }

        &__price {
            font-size: 16px;
        }
    }

    &__description {
        padding: 16px;
        color: $charcoal;
    }



    &__footer {
        width: 100%;

        &__form {
            display: flex;
            justify-content: space-between;

            &__quantity {
                display: flex;

                button {
                    height: 40px;
                    width: 40px;
                    padding: 0;
                }

                input {
                    border-radius: 5px;
                    border: 1px solid whitesmoke;
                    width: 40px;
                    text-align: center;
                    margin: 0 8px;
                    appearance: none;



                    &:hover {
                        outline: 1px solid whitesmoke;
                    }
                }
            }
        }

        &__cta {
            margin-top: 32px;
            display: flex;
            justify-content: space-between;

            button {

                background-color: gold;
                color: black;
            }

            #go-back {
                background: white;
                margin-right: 16px;
                border: 1px solid $faint;
                color: $faint;
            }
        }
    }
}
</style>
