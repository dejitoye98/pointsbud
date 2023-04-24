<template>
    <BaseModal @close="$emit('close', true)">
        <template #footer>
            <button @click="createSpace">Create Space</button>
        </template>
        <template #header>
            <p></p>
        </template>

        <template #body>
            <div class="adduser-modal">
                <div class="form-input">
                    <label for="">Name of Space</label>
                    <input v-model="new_space.name" placeholder="e.g Table 1" type="text">
                </div>
                <div class="form-input">
                    <label for="">Description</label>
                    <textarea v-model="new_space.description" placeholder="e.g Table 1" type="text"></textarea>
                </div>

                <div class="form-input">
                    <label> Category</label>
                    <div class="dropdown__input" @click="open_category_dropdown = !open_category_dropdown"> {{
                        chosen_category.name }}</div>

                    <div class="dropdown" v-if="open_category_dropdown">

                        <div class="dropdown__new-category">
                            <input placeholder="New category" v-model="new_category.name">
                            <button @click="saveCategory">Save</button>
                        </div>
                        <div class="dropdown__item" v-for="(category, index) in categories"
                            @click="choseCategory(category)">
                            {{ category.name }}
                        </div>
                    </div>
                </div>
                <div class="form-input">
                    <label for="">Reservable</label>
                    <input v-model="new_space.reservable" @change="new_space.reservable = !new_space.reservable"
                        type="checkbox">
                </div>

                <div class="form-input">
                    <label for="">Currency</label>
                    <select v-model="new_space.currency">
                        <option value="NGN">NGN</option>
                    </select>
                </div>

                <div class="form-input">
                    <label for="">Unit Price</label>
                    <input v-model="new_space.unitprice" placeholder="e.g 10,000" type="text" inputmode="decimal">
                </div>
                <div class="form-input">
                    <label for="">Pricing measurement</label>
                    <select v-model="new_space.pricing_measurement">
                        <option value="per day">Per Day</option>
                        <option value="per hour">Per Hour</option>
                    </select>
                </div>






            </div>
        </template>
    </BaseModal>
</template>


<script>
export default {
    data() {
        return {
            new_space: {

            },

            new_category: {
                name: ''
            },

            chosen_category: {
            },

            open_category_dropdown: false,
        }
    },
    created() {
        this.getCategories();
    },
    methods: {
        choseCategory(category) {
            this.chosen_category = category;
            this.new_space.category_id = this.chosen_category.id;
        },
        getCategories() {
            this.$api.get(`/spaces/categories`).then(resp => {
                this.categories = resp.data.data
            })
        },
        saveCategory() {
            this.$api.post(`/spaces/categories`, this.new_category).then(resp => {
                this.chosen_category = resp.data.data;
                this.getCategories()
            })
        },
        createSpace() {
            this.$api.post('/spaces', this.new_space).then(resp => {
                this.new_space = {

                }
                this.$emit('close', true)
                this.$emit('spaceCreated', true)
            })
        },
    }
}
</script>


<style lang="scss" scoped>
.dropdown {
    display: flex;
    flex-direction: column;
    border: 1px solid whitesmoke;
    padding: 16px;

    &__input {
        height: 40px;
        border: 1px solid whitesmoke;
        padding: 16px;
        width: 100%;
        background: transparent;
        outline: none;
        top: 0px;
        padding-top: 12px;
        padding-left: 10px;
        padding-right: 10px;
        color: rgba(0, 0, 0, 0.726);
        appearance: none;
        font-size: 15px;
    }


    &__item {
        padding: 16px;
        background: white;
        cursor: pointer !important;

        &:hover {
            color: $secondary;
        }
    }

    &__new-category {
        width: 100%;
        justify-content: space-between;
        display: flex;
        margin-top: 16px;

        input {
            width: 100%;
            margin-right: 8px;
            height: 20px !important;
        }

        button {
            @include smallbutton;
        }
    }
}

.adduser-modal {
    width: 400px;
    padding: 16px;

    .form-input {
        @include plain-form-input;
    }
}
</style>