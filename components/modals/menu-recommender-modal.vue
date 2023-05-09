<template>
    <BaseModal @close="$emit('close')">
        <template #header>
            <p>Recommendation</p>
        </template>
        <template #body>
            <template v-if="get_recommendation">

                <RecommenderList :drink_categories="drink_list" v-if="get_recommendation" :categories="categories"
                    :data="rankings" :products="products">
                </RecommenderList>
            </template>





            <template v-else>
                <div class="recommend-modal">
                    <div class="recommend-modal__container" v-if="questions && Object.keys(questions).length > 0">

                        <div class="recommend-modal__question" v-for="(alias, index) in Object.keys(questions)"
                            :key="index">
                            <p>{{ questions[alias].question }}</p>

                            <div class="recommend-modal__question__options">

                                <div class="radio-label" v-for="(option, index) in JSON.parse(questions[alias].options)">
                                    <input name="alias" @change="updateQuestionOption(alias, option)" type="checkbox"
                                        value="option">
                                    <div class="radio-indicator"></div>
                                    <div class="radio-text">{{ option }}</div>
                                </div>







                            </div>
                        </div>

                        <div class="recommend-modal__question">
                            <p>Preferred Drink</p>

                            <div class="recommend-modal__question__options">

                                <div class="radio-label"
                                    v-for="(category, index) in categories.filter(cat => cat.type === 'drink')">
                                    <input name="alias" @change="updateDrinksList(category)" type="checkbox" value="option">
                                    <div class="radio-indicator"></div>
                                    <div class="radio-text">{{ category.name }}</div>
                                </div>







                            </div>
                        </div>

                        <div><button @click="get_recommendation = true">Get Recommendation</button></div>
                    </div>

                </div>
            </template>
        </template>

    </BaseModal>
</template>



<script>
import socket from "socket.io-client";
import MenuRecommenderModal from "../../components/modals/menu-recommender-modal.vue";
import RecommenderList from "../lists/recommender-list.vue";


export default {
    props: ["business_id", "products", "categories"],
    data() {
        return {
            get_recommendation: false,
            questionData: [],
            jsonData: null,
            answers: {},
            rankings: {},
            drink_list: [],
        };
    },
    mounted() {
        this.getRecommendationData();
    },
    methods: {
        updateDrinksList(category) {
            if (this.drink_list.find(c => c.id == category.id)) {
                const index = this.drink_list.find(c => c.id == category.id);
                this.drink_list.splice(index, 1);
                return
            }
            this.drink_list.push(category)
        },
        updateQuestionOption(alias, option) {
            if (this.answers && this.answers[alias] && this.answers[alias].indexOf(option) > -1) {
                const index = this.answers[alias].indexOf(option);
                this.answers[alias].splice(index, 1);
                this.getRankings();
                return;
            }
            //this.$set(this.answers, alias, this.answers[alias].push(option))
            this.getRankings();
            this.$nextTick(() => {
                this.answers[alias].push(option);
            });
        },
        getRecommendationData() {
            this.$api.get("/recommender/menu?business_id=" + this.business_id).then(resp => {
                this.questionData = resp.data.data.questions;
                this.jsonData = resp.data.data.qualities && resp.data.data.qualities.json;
            });
        },
        getRankings() {
            if (this.recommendationData && Object.keys(this.recommendationData).length > 0) {
                const products = Object.keys(this.recommendationData);
                // alert(JSON.stringify(products))
                const obj = {};
                products.forEach(product => {
                    const question_alias = Object.keys(this.recommendationData[product]);
                    //alert(question_alias)
                    question_alias.forEach(alias => {
                        //  alert(alias)
                        //alert(Object.keys(this.answers))
                        try {
                            if (this.answers[alias]) {
                                this.answers[alias].forEach(option => {
                                    //alert(option)
                                    //alert(option)
                                    if (option) {
                                        //alert(this.recommendationData[product][alias][option])
                                        if (this.recommendationData[product][alias][option] && typeof (this.recommendationData[product][alias][option]) === "number")
                                            //this.recommendationData[product][alias][option])
                                            if (typeof (this.recommendationData[product][alias][option]) === "number") {
                                                console.log("number");
                                                console.log(this.recommendationData[product][alias][option]);
                                                if (!obj[product])
                                                    obj[product] = 0;
                                                obj[product] += parseInt(this.recommendationData[product][alias][option]);
                                            }
                                    }
                                });
                            }
                        }
                        catch (e) {
                        }
                    });
                });
                this.rankings = obj;
            }
        }
    },
    computed: {
        questions() {
            const q = {};
            if (this.questionData.length > 0) {
                this.questionData.forEach(question => {
                    q[question.alias] = { question: question.question, options: question.options };
                    this.answers[question.alias] = [];
                });
                return q;
            }
        },
        recommendationData() {
            if (this.jsonData) {
                const data = this.jsonData;
                return JSON.parse(data);
            }
        },
    },
    components: { RecommenderList }
}
</script>

<style lang="scss" scoped>
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

.recommend-modal {
    &__container {
        display: flex;
        flex-direction: column;
        padding: 24px;
    }

    &__question {
        padding: 16px 0;

        p {
            font-weight: 600;
            margin-bottom: 10px;
            font-size: 16px;
        }

        &__options {

            label {
                display: flex;
                border: 1px solid whitesmoke;
                padding: 8px 16px;
                align-items: center;
                justify-content: flex-start;

                input {
                    border: 1px solid pink;
                    //width: 100%;
                    height: 100%;
                }
            }
        }
    }
}

button {
    @include smallbutton;
    width: 100%;
    margin-top: 16px;
}
</style>