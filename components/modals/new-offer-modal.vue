<template>
    <BaseModal @close="$emit('close', true)">
        <template #header @click.stop>Create a new offer</template>

        <template #footer>
            <div class="footer" @click.stop>

                <button v-if="step !== 1" @click="back" class="btn btn--default">Back</button>
                <button v-if="step === 2" class="btn btn--primary" @click="nextStep">Continue</button>
                <button v-if="step === 3" class="btn btn--primary" @click="createOffer">Create Offer</button>
            </div>
        </template>
        <template #body>
            <div class="offer" @click.stop>
                <div class="offer__container">
                    <template v-if="step === 1 && !chosen_type">
                        <div class="types" @click.stop>

                            <div class="type" v-for="(type, index) in offer_types" :key="index"
                                @click="chooseType(type.name)" :style="{ background: type.background || '' }">
                                <img v-if="type.name === 'Freebie'" src="../../static/offers_gift.png">
                                <img v-else-if="type.name === 'Cashback'" src="../../static/offers_cashback.png">
                                <img v-else-if="type.name === 'Coupon'" src="../../static/icons8-coupon-58.png">
                                <p class="type__name">{{ type.name }}</p>
                                <p class="type__desc">{{ type.description }}</p>

                            </div>
                        </div>
                    </template>
                    <template v-else-if="chosen_type && step == 2">
                        <div class="form">
                            <div class="form-input">
                                <label for="">Title of <b>{{ chosen_type }}</b> offer</label>
                                <input v-model="payload.title" type="text">
                            </div>
                            <div class="form-input">
                                <label for="">Description (optional)</label>
                                <textarea v-model="payload.description"></textarea>
                            </div>
                            <div class="form-input">
                                <label for="">Frequency</label>
                                <select v-model="payload.frequency">
                                    <option value="one-off">One-Off</option>
                                    <option value="recurring-weekly">Recurring Weekly</option>
                                    <option value="recurring-monthly">Recurring Monthly</option>
                                </select>
                            </div>
                            <div class="form__half">
                                <div class="form-input">
                                    <label for="">Start Date</label>
                                    <input v-model="payload.start_date" type="date">
                                </div>
                                <div class="form-input" v-if="payload.frequency == 'one-off'">
                                    <label for="">End Date</label>
                                    <input v-model="payload.end_date" type="date">
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="chosen_type && step == 3">
                        <div class="form">
                            <fieldset>
                                <legend>Eligibility</legend>
                                <div class="form-input">
                                    <label for="purchases"> Criterion </label>
                                    <div class="purchases-forminput">

                                        <div class="radio-label">
                                            <input v-model="payload.eligibility.criterion" type="radio"
                                                value="purchase-count" name="purchase-eligibility">
                                            <div class="radio-indicator"></div>
                                            <div class="radio-text">Purchase Count</div>
                                        </div>
                                        <div class="radio-label">
                                            <input v-model="payload.eligibility.criterion" type="radio"
                                                value="purchase-value" name="purchase-eligibility">
                                            <div class="radio-indicator"></div>
                                            <div class="radio-text">Purchase Value</div>
                                        </div>
                                        <div class="radio-label">
                                            <input v-model="payload.eligibility.criterion" type="radio"
                                                value="specific-purchase" name="purchase-eligibility">
                                            <div class="radio-indicator"></div>
                                            <div class="radio-text">Specific Purchase</div>
                                        </div>
                                    </div>



                                </div>
                                <div class="form-input" v-if="payload.eligibility.criterion == 'purchase-count'">
                                    <label for=" purchases"> Purchase Count</label>
                                    <div class="purchases-forminput">

                                        <input v-model="payload.eligibility.value" type="number">
                                    </div>


                                </div>
                                <div class="form-input" v-if="payload.eligibility.criterion === 'purchase-value'">
                                    <label for="purchases"> Purchase Value</label>
                                    <div class="purchases-forminput">
                                        <input type="number" v-model="payload.eligibility.value">
                                        <select v-model="payload.eligibility.type">
                                            <option value="NGN">NGN</option>
                                            <option value="points">Points</option>
                                        </select>
                                    </div>


                                </div>
                            </fieldset>
                            <fieldset>
                                <legend>Offer</legend>
                                <div class="form-input" v-if="chosen_type === 'Coupon'">
                                    <label for="">Discount</label>

                                    <div class="purchases-forminput">

                                        <select name="discount" id="" v-model="payload.discount.type">
                                            <option value="percent" selected> Percent </option>
                                            <option value="percent" selected> Flat </option>
                                        </select>

                                        <input type="number" v-model="payload.discount.value">
                                    </div>
                                </div>
                                <div class="form-input" v-if="chosen_type === 'Cashback'">
                                    <label for="">Cashback</label>

                                    <div class="purchases-forminput">
                                        <select v-model="payload.cashback.type" name="discount" id="">
                                            <option value="percent" selected> Percent </option>
                                            <option value="percent" selected> Flat </option>
                                        </select>
                                        <input v-model="payload.cashback.value" type="number">
                                    </div>
                                </div>
                            </fieldset>

                        </div>
                    </template>
                    <template v-else-if="chosen_type && step == 3">

                    </template>
                </div>
            </div>
        </template>
    </BaseModal>
</template>






<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';


export default {
    components: {
        DatePicker
    },
    data() {
        return {
            creating_offer: false,
            payload: {
                title: '',
                frequency: 'one-off',
                start_time: '',
                end_time: '',
                description: '',
                eligibility: {
                    criterion: '',
                    value: '',
                    type: "",
                },
                discount: {
                    type: {

                    },
                    value: {

                    }
                },

                cashback: {
                    value: {

                    },
                    type: {

                    },
                },
                freebies: []

            },
            step: 1,
            chosen_type: '',
            offer_types: [{
                name: "Coupon",
                description: 'Give discount to customers that meet certain criteria',
                background: '#d68438',
                icon: 'promo-code.png'
            }, {
                name: "Cashback",
                description: "Return cash to customer after a purchase.",
                background: "#D94241",
                icon: 'refund.png'

            }, {
                name: "Freebie",
                description: 'Give customers a gift.',
                background: 'teal',
                icon: 'gift-box.png'
            }]
        }
    },
    methods: {
        createOffer() {
            this.creating_offer = true;
            this.$api.post('/offers', this.payload).then(resp => {
                this.$emit('close')
            }).finally(() => {
                this.creating_offer = false;
            })
        },
        nextStep() {
            this.step++;
        },
        chooseType(name) {
            this.step = 2;
            this.chosen_type = name;
        },
        back() {
            if (this.step === 2) {
                this.step = 1;
                this.chosen_type = '';
            }
            else {
                this.step--;
            }
        }
    }
}

</script>




<style lang="scss" scoped>
.offer {
    width: 800px;
}

.purchases-forminput {
    display: grid !important;
    grid-template-columns: 30% 30% 30%;
    // justify-content: space-between;

    input {
        margin-right: 8px !important;
    }

    select {
        margin-right: 8px !important;
    }
}

.form {
    padding: 24px;

    &__half {
        display: flex;
        justify-content: space-between;

        .form-input {
            width: 48% !important;
        }
    }

    .form-input {
        width: 100%;

        label {
            color: $charcoal;
            //font-weight: 500;
        }
    }

    fieldset {
        border: 2px solid whitesmoke;
        padding: 16px;
        margin-bottom: 32px;

        legend {
            padding: 16px;
        }
    }

    .radio-label {
        @include radio-label;
        border-radius: 15px;
        margin-bottom: 8px;

        ;
        /*
        border-radius: 20px;
        padding: 8px 8px;
        transition: all 100ms ease-in-out;
        height: 50px;

        position: relative;*/


    }

}

.types {
    display: grid;
    grid-template-columns: 30% 30% 30%;
    justify-content: space-between;
    padding: 32px 24px;
    // width: 90%;
    margin: auto;


    .type {
        background: $primary;
        color: white;
        padding: 8px;
        min-height: 200px;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        &:hover {
            filter: brightness(0.9);
        }

        &__name {
            font-size: 20px;
            font-weight: 700;
        }

        &__desc {
            text-align: center;
            font-size: 13px;
        }

        img {
            //border: 1px solid white;
            //width: 60px;
            //height: 60px;
        }
    }

    .footer {}


}

.btn {
    &--default {
        margin-right: 8px;
        background: white !important;
        border: 1px solid lightgrey;
        color: $charcoal !important;
    }
}

.form-input {
    @include plain-form-input;

    select {
        //min-width: 150px;
        //text-align: center;
    }
}
</style>




