<template>
    <div class="loyalty">
        <BaseModal @close="show_create_modal = false" v-if="show_create_modal" :show_header="true" :show_footer="true">
            <template #header>
                <p>Start a loyalty program</p>
            </template>
            <template #body>
                <div class="create-modal">
                    <div class="form-input">
                        <label>Name of program</label>
                        <input type="text" v-model="new_program_payload.name">
                    </div>
                    <div class="form-input">
                        <label>Description</label>
                        <input type="text" v-model="new_program_payload.description">
                    </div>
                    <div class="form-input">
                        <label for="">Percentage of product price to offer as points earned</label>
                        <input type="text" v-model="new_program_payload.percentage">
                        <span>Example: 0.5% will earn a customer 0.25 points for purchasing a product that costs $50.
                        </span>
                    </div>
                    <div class="form-input">
                        <label for="">Customer reward for entering their data</label>
                        <select v-model="new_program_payload.customer_reward_for_data_type">
                            <option value="default">Default (nothing)</option>
                            <option value="freebie">Freebie Product</option>
                            <option value="points">Points</option>
                            <option value="other">Other</option>
                        </select>

                    </div>

                    <div class="form-input" v-if="new_program_payload.customer_reward_for_data_type === 'freebie'">
                        <label for="">Freebie product</label>
                        <select v-model="new_program_payload.customer_reward_for_data_value">
                            <option v-for="(product, index) in products" :key="index">{{ product.name }}</option>
                        </select>
                    </div>



                    <div class="form-input" v-if="new_program_payload.customer_reward_for_data_type === 'points'">
                        <label for="">Value of reward points</label>
                        <input v-model="new_program_payload.customer_reward_for_data_value" type="text" inputmode="decimal">
                    </div>
                    <div class="form-input" v-if="new_program_payload.customer_reward_for_data_type === 'other'">
                        <label for="">Reward Text</label>
                        <textarea v-model="new_program_payload.customer_reward_for_data_value"
                            placeholder="eg: Stand a chance to win a trip to Dubai"></textarea>
                    </div>
                    <!-- 
                    <div class="form-input">
                        <label for="">Exceptions</label>
                        <div class="form-input">
                            <select>

                            </select>
                            <input />
                        </div>
                        <button>Create an exception</button>

                    </div> -->
                </div>

            </template>

            <template #footer>
                <div class="create-modal__ctas">
                    <button :disabled="creating_new_program" v-if="!edit_mode" @click="createProgram">Create</button>
                    <button :disabled="editing_program" v-else @click="editProgram">Edit</button>

                </div>
            </template>
        </BaseModal>


        <div class="loyalty__container">
            <template v-if="!programs || programs && programs.length === 0">
                <div class="loyalty-setup">
                    <h2>Set up a loyalty program</h2>
                    <p>There can be only one active loyalty program at a time.</p>
                    <button @click="show_create_modal = true">Create</button>
                </div>


            </template>

            <template v-else>
                <div class="programs">
                    <div class="programs__container">

                        <div class="programs__item" v-for="(program, index) in programs" :key="index">
                            <div class="programs__item__edit" style="display: flex; justify-content: flex-end;">
                                <a @click="triggerEdit(program)">
                                    Edit
                                </a>
                            </div>
                            <div class="programs__item__box">
                                <p class="programs__item__box__label">Name</p>
                                <p>{{ program.name }}</p>
                            </div>
                            <div class="programs__item__box">
                                <p class="programs__item__box__label">Percentage</p>
                                <p>{{ program.percentage }}</p>
                            </div>
                            <div class="programs__item__box">
                                <p class="programs__item__box__label">Customer reward for data</p>
                                <p>{{ program.customer_reward_for_data_type }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>


<script>


export default {
    layout: 'admin-dashboard',
    data() {
        return {
            programs: [],
            show_create_modal: false,
            loading_data: true,
            new_program_payload: {
                name: '',
                description: '',
                percentage: '',
                customer_reward_for_data_type: "",
                customer_reward_for_data_value: ""


            },
            edit_mode: false,
            creating_new_program: false,
            editing_program: false,

            products: [],



        }
    },
    fetch() {
        this.getPrograms()
        this.getProducts()
    },
    methods: {
        changeCustomerRewardMeta(name) {
            this.new_program_payload.customer_reward_for_data_value = name;
        },
        getProducts() {
            this.$api.get('/products').then(resp => {
                this.products = resp.data.data
            })
        },
        triggerEdit(program) {
            this.show_create_modal = true;
            this.edit_mode = true;
            this.new_program_payload = { ...program }


        },
        editProgram() {
            this.editing_program = true;
            /*
            const obj = {
                id: this.new_program_payload.id,
                name: this.new_program_payload.name,
                description: this.new_program_payload.description,
                percentage: this.new_program_payload.percentage
            }*/
            const obj = this.new_program_payload;
            this.$api.put("/loyalty-programs/" + obj.id, obj).then(resp => {
                this.getPrograms()
                this.show_create_modal = false;
                this.edit_mode = false

            }).finally(() => {
                this.editing_program = false
            })
        },
        getPrograms() {
            this.loading_data = true
            this.$api.get("/loyalty-programs").then(resp => {
                this.programs = resp.data.data
            }).finally(() => {
                this.loading_data = false;
            })
        },
        createProgram() {
            this.creating_new_program = true
            alert(JSON.stringify(this.new_program_payload))
            this.$api.post("/loyalty-programs", this.new_program_payload).then(resp => {
                this.getPrograms()
                this.show_create_modal = false;
            }).catch((e) => {
                this.$toast.error(e)

            }).finally(() => {
                this.creating_new_program = false;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.loyalty {}

.radio-label {
    @include radio-label;
}

.form-input {
    @include plain-form-input;
    margin-bottom: 32px;

    label {
        font-weight: 500;
        font-size: 14px;
    }

    span {
        color: $faint;
        font-size: 12px;
        max-width: 500px;
        ;
    }
}

.create-modal {
    padding: 16px;
}

.loyalty-setup {
    width: 50%;
    margin: auto;
    border: 1px dashed grey;
    text-align: center;
    padding: 16px;

    h2 {
        color: $primary;
        font-size: 20px;

    }

    button {
        margin: 8px 0;
        @include smallbutton
    }
}

.programs {


    &__container {
        display: grid;
        grid-template-columns: 24% 24% 24% 24%;
        justify-content: space-between;

        button {
            @include smallbutton;
        }
    }


    &__item {
        @include card;
        padding: 16px;

        &__edit {
            font-size: 14px;
            color: $primary;
            text-decoration: underline;
        }

        &__box {
            p {
                color: black;
                font-weight: 500;
            }

            &__label {
                font-size: 12px;
                color: lightgrey;
            }




        }

    }
}
</style>