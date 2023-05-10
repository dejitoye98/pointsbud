<template>
    <div class="list">
        <div class="list__container">

            <div class="list__header">
                <div class="tabs">
                    <div class="tab" @click="activateTab('food')" :class="[activeTab === 'food' ? 'active-tab' : '']">
                        Food
                    </div>

                    <div class="tab" @click="activateTab('drink')" :class="[activeTab === 'drink' ? 'active-tab' : '']">
                        Drinks
                    </div>
                </div>

            </div>

            <template v-if="list && list.length > 0">

                <template v-if="activeTab === 'food'">

                    <div v-for="(product, index) in list" :key="index" class="product-container">


                        <div class="product__image" v-if="product.thumbnail">
                            <img :src="getProductCategoryImage(product.id)" alt="">

                        </div>

                        <div class="product__content">
                            <div class="product__content__header">

                                <p class="product__name">{{ product.name }}


                                </p>

                                <button @click="getNextItemInCategory(product, index)">Find similar item</button>
                            </div>
                            <div class="labels">
                                <label>{{ getCategory(product) }}</label>
                            </div>

                            <p class="product__description">
                                <!--<TruncatedText :text="product.description" limit="100"></TruncatedText>-->
                                {{ product.description }}
                            </p>

                            <div class="product__price">
                                {{ product.currency }} {{ product.unitprice | money }}
                            </div>
                        </div>
                    </div>
                </template>

                <template v-else>

                    <div v-for="(product, index) in drink_list" :key="index" class="product-container">


                        <div class="product__image" v-if="product.thumbnail">
                            <img :src="getProductCategoryImage(product.id)" alt="">

                        </div>

                        <div class="product__content">
                            <div class="product__content__header">

                                <p class="product__name">{{ product.name }}


                                </p>

                                <!-- <button @click="getNextItemInCategory(product, index)">Find similar item</button>-->
                            </div>
                            <div class="labels">
                                <label>{{ getCategory(product) }}</label>
                            </div>

                            <p class="product__description">
                                <!--<TruncatedText :text="product.description" limit="100"></TruncatedText>-->
                                {{ product.description }}
                            </p>

                            <div class="product__price">
                                {{ product.currency }} {{ product.unitprice | money }}
                            </div>
                        </div>
                    </div>
                </template>

            </template>


        </div>

    </div>
</template>

<script>
export default {
    props: ['products', 'categories', 'data', 'drink_categories'],
    data() {
        return {
            list: [],
            activeTab: 'food',
            drink_list: []
        }
    },
    created() {
        this.initializeGoogleSignin()
    },
    watch: {
        data(value) {
            //this.reOrderData()

            // this.reorderData()
        }
    },

    mounted() {
        this.reorderData();
        this.orderDrinks()
    },

    methods: {
        orderDrinks() {
            let products = []
            const categories = this.drink_categories;
            categories.forEach(category => {
                const products = this.products.filter(p => p.category_id === category.id);
                products.sort((a, b) => {
                    return a.unitprice - b.unitprice;
                });

                // alert(products)

                this.drink_list = this.drink_list.concat(products)
            });


            // get the first 3

        },
        activateTab(tab) {
            this.activeTab = tab;
        },
        getNextItemInCategory(product, index_in_list) {

            // get all products in category;
            let products_in_category = this.products.filter(p => p.category_id === product.category_id);
            products_in_category.sort((a, b) => {
                return a.unitprice - b.unitprice;
            });

            //alert(JSON.stringify(products_in_category))

            // choose next
            const range = products_in_category.length - 1;



            for (let i = 0; i < products_in_category.length; i++) {
                const focused_product = products_in_category.find(p => p.id === product.id)




                const index = products_in_category.indexOf(focused_product);
                if (index + 1 < range) {
                    //return next product 
                    //alert(JSON.stringify(products_in_category[index + 1]))
                    this.list[index_in_list] = products_in_category[index + 1];
                    this.$forceUpdate()
                    return
                    break;
                }
                else {
                    this.list[index_in_list] = products_in_category[0];
                    this.$forceUpdate()
                    return;

                }


            }

            return product;
        },
        initializeGoogleSignin() {
            google.accounts.id.renderButton(document.getElementById("googleButton"), {
                type: "standard",
                size: "large",
                text: "signin_with",
                shape: "rectangular",
                theme: "dark",
                logo_alignment: "center",
                width: 250
            });
        },
        getProductItem(product_name) {
            // return product object in this.products
            return this.products.find(p => p.name.toLowerCase().trim() == product_name.toLowerCase().trim())
        },
        getCategory(product) {
            return this.categories.find(c => c.id === product.category_id)?.name;
        },

        getRandomIndex(len) {
            return Math.floor(Math.random() * len);
        },

        reorderData() {
            if (this.data) {
                let list = []
                const l = Object.entries(this.data).sort((a, b) => b[1] - a[1]).map(el => el[0])
                l.forEach(name => {
                    const obj = this.getProductItem(name)
                    console.log(name)
                    console.log(obj)
                    list.push(obj)
                })

                /*for (let i = 0; i < this.list.length; i++) {
                    list.push(this.reOrderedDataProjucts[i])
                    if (i % 2 === 0) {
                        const category_index = this.getRandomIndex(Object.keys(this.organizedDrinks).length)
                        const product_index = this.getRandomIndex(this.organizedDrinks[Object.keys(this.organizedDrinks)[category_index]].length)




                        if (this.organizedDrinks[Object.keys(this.organizedDrinks)[category_index]][product_index]) {

                            list.push(this.organizedDrinks[Object.keys(this.organizedDrinks)[category_index]][product_index])
                        }

                    }



                }*/

                this.list = list
                this.$forceUpdate()


            }
        },




    },
    computed: {
        reOrderedData() {
            if (this.data) {

                return Object.entries(this.data).sort((a, b) => b[1] - a[1]).map(el => el[0])
            }

        },

        reOrderedDataProjucts() {
            const list = []
            if (this.reOrderedData) {
                this.reOrderedData.forEach(name => {
                    const obj = this.getProductItem(name)
                    console.log(name)
                    console.log(obj)
                    list.push(obj)
                })

            }
            this.list = list
        },

        organizedDrinks() {
            const obj = {}
            if (this.drink_categories) {
                const list = this.drink_categories;
                list.forEach(category => {
                    if (!obj[category.name.trim()]) obj[category.name.trim()] = []
                    const category_id = category.id;
                    const products = this.products.filter(p => p.category_id == category_id);

                    products.sort((a, b) => {
                        return a.unitprice - b.unitprice;
                    });

                    obj[category.name.trim()] = products.slice(products.length - 3)

                })


                //return list;
            }

            return obj
        },

        finalProducts() {
            const list = [];
            if (this.reOrderedDataProjucts && this.reOrderedDataProjucts.length === 0) {
                return this.products
            }

            for (let i = 0; i < this.reOrderedDataProjucts.length; i++) {
                list.push(this.reOrderedDataProjucts[i])
                if (i % 2 === 0) {
                    const category_index = this.getRandomIndex(Object.keys(this.organizedDrinks).length)
                    const product_index = this.getRandomIndex(this.organizedDrinks[Object.keys(this.organizedDrinks)[category_index]].length)




                    if (this.organizedDrinks[Object.keys(this.organizedDrinks)[category_index]][product_index]) {

                        list.push(this.organizedDrinks[Object.keys(this.organizedDrinks)[category_index]][product_index])
                    }

                }



            }
            this.list = list
        }



    }

}
</script>

<style  lang="scss" scoped>
.active-tab {
    background-color: gold;
}

.list {
    &__container {
        display: flex;
        flex-direction: column;
        padding: 18px;
    }

    &__header {
        display: flex;
        width: 100%;
    }

    .tabs {
        //border: 1px solid pink;
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .tab {
        width: 50%;
        color: $charcoal;
        max-height: 40px;
        // border: 1px solid grey;
        padding: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: 1px solid whitesmoke;
    }
}

.product-container {
    //margin-bottom: 32px;
    border-bottom: 2px dashed grey;
}

.labels {
    display: flex;
    padding: 8px 0px;
    justify-content: flex-start;
}

label {
    font-size: 13px;
    background: rgb(246, 244, 244);
    color: black;
    padding: 2px 8px;
    border-radius: 20px;
    font-weight: 500;
}

.product {
    cursor: pointer;
    margin: auto;
    background: white;
    //margin-top: 20px;
    // border-radius: 10px;
    ///@include card;
    // background: white;
    height: max-content;
    //max-height: 250px;
    box-sizing: border-box;
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
        //padding: 8px 8px;
        padding: 30px 8px;

        &__header {
            display: flex;
            justify-content: space-between;

            button {
                @include smallbutton;
                background-color: gold;
                padding: 5px 8px;
                font-size: 14px;
                color: black;
                height: fit-content;
                border-radius: 2px;
                font-weight: 500;
                border-radius: 10px;
            }
        }

    }

    &__name {
        font-size: 16px;
        // margin-bottom: 8px;
        font-weight: 600;
        margin-right: 8px;
        text-align: left;
    }

    &__description {
        font-size: 14px;
        color: black;
        line-height: 1.5;
        margin-bottom: 16px;
        width: 100%;
        text-overflow: ellipsis;
        text-align: left;

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
        //margin: auto;


    }


}
</style>