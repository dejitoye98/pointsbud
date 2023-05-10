<template>
    <BaseModal @close="$emit('close')">
        <template #header>
            <div style="display: flex; justify-content: space-between;">
                <p>Get Recommendation</p>
                <svg style="cursor: pointer;" @click="$emit('close')" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                        fill="black" />
                </svg>

            </div>
        </template>
        <template #body>
            <template v-if="get_recommendation">

                <template v-if="recommendation_step === 1">

                    <div class="google__container">
                        <p>Sign in to get recommendation and new offers from Circa Lagos</p>
                        <div id="googleButton"></div>

                    </div>

                </template>




                <template v-else>
                    <RecommenderList :drink_categories="drink_list" v-if="get_recommendation" :categories="categories"
                        :data="rankings" :products="products">
                    </RecommenderList>
                </template>

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

                        <div><button @click="triggerGetRecommendation">Get Recommendation</button></div>
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
    props: ["business_id", "products", "categories", "customer"],
    data() {
        return {
            get_recommendation: false,
            questionData: [],
            jsonData: null,
            answers: {},
            rankings: {},
            drink_list: [],

            recommendation_step: null,
        };
    },

    created() {
        google.accounts.id.initialize({
            client_id: "309539494248-ir1uocjnkh6h8t3in55vn4r2m9jmt777.apps.googleusercontent.com",
            callback: this.googleSignIn,
            context: "signin"
        });
        this.initializeGoogleSignin()

    },
    mounted() {
        this.getRecommendationData();
    },
    methods: {

        triggerGetRecommendation() {
            this.get_recommendation = true;
            this.recommendation_step = 2;

            /* if (!this.customer) {
                 setTimeout(() => {
                     this.initializeGoogleSignin()
                 }, 1000)
 
 
                 this.recommendation_step = 1
             }
             else {
                 this.recommendation_step = 2
             }*/
        },
        googleSignIn(response) {
            console.log(JSON.stringify(response));
            this.$api.post("/auth/google/signin", {
                credential: response.credential,
                business_id: this.business_id
            }).then(resp => {
                this.$cookies.set("loyal-token", resp.data.data.token);
                this.recommendation_step = 2;

            }).catch(err => {
            });
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
#googleButton {
    margin: auto;
}

.google__container {
    padding: 24px;

    p {
        color: $charcoal;
        font-size: 16px;
        font-weight: 500;
        text-align: center;
        margin-bottom: 8px;
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

.recommend-modal {
    min-width: 300px;

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