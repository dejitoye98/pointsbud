<template>
    <div class="list">
        <div class="list__container">

            <div v-if="reOrderedDataProjucts && reOrderedDataProjucts.length > 0" v-for="(product, index) in finalProducts"
                :key="index" class="product-container">


                <div class="product__image" v-if="product.thumbnail">
                    <img :src="getProductCategoryImage(product.id)" alt="">

                </div>

                <div class="product__content">
                    <p class="product__name">{{ product.name }}</p>
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

        </div>

    </div>
</template>

<script>
export default {
    props: ['products', 'categories', 'data', 'drink_categories'],
    data() {
        return {
            list: []
        }
    },
    created() {
        this.initializeGoogleSignin()
    },
    watch: {
        data(value) {
            //this.reOrderData()
        }
    },

    methods: {
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
        }




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
            return list
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
            return list
        }



    }

}
</script>

<style  lang="scss" scoped>
.list {
    &__container {
        display: flex;
        flex-direction: column;
        padding: 18px;
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
    background: whitesmoke;
    color: black;
    padding: 2px 8px;
    border-radius: 20px;
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

    }

    &__name {
        font-size: 16px;
        margin-bottom: 8px;
        font-weight: 600;
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