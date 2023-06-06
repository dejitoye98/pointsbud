<template>
    <div class="landing">
        <BaseModal v-if="show_modal">
            <template #body>
                <div class="submodal">
                    <template v-if="!subscribed">
                        <div class="submodal__container">
                            <p>Sign up for a demo</p>
                            <p>We'll contact you in less than 6 hours</p>
                            <div class="form-input">
                                <label for="">Your email or phone number</label>
                                <input type="text" v-model="model.contact">
                            </div>
                            <div class="cta">
                                <button :disabled="subscribing" @click="subscribe" style="width:100%">Contact me</button>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="submodal__container">
                            <p>Thanks for reaching out. We'll get in touch with you in 6 hours</p>
                        </div>
                    </template>
                </div>
            </template>
        </BaseModal>
        <div class="landing__container">
            <div class="header">
                <div class="header__container">
                    <div class="logo">
                        <svg width="68" height="71" viewBox="0 0 68 71" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M0 39.5C0 40.1731 0.03477 40.8401 0.103036 41.5C0.03477 42.1599 0 42.8269 0 43.5C0 43.8349 0.00860703 44.1683 0.0256642 44.5C0.00860703 44.8317 0 45.1651 0 45.5C0 59.5833 15.2223 71 34 71C52.7777 71 68 59.5833 68 45.5C68 45.1651 67.9914 44.8318 67.9743 44.5C67.9914 44.1683 68 43.8349 68 43.5C68 42.8269 67.9652 42.1599 67.897 41.5C67.9652 40.8401 68 40.1731 68 39.5C68 38.8269 67.9652 38.1599 67.897 37.5C67.9652 36.8401 68 36.1731 68 35.5C68 34.8269 67.9652 34.1599 67.897 33.5C67.9652 32.8401 68 32.1731 68 31.5C68 17.4167 52.7777 6 34 6C15.2223 6 0 17.4167 0 31.5C0 32.1731 0.03477 32.8401 0.103036 33.5C0.03477 34.1599 0 34.8269 0 35.5C0 36.1731 0.03477 36.8401 0.103036 37.5C0.03477 38.1599 0 38.8269 0 39.5ZM5.65236 38.5C7.05326 35.6187 9.32024 32.9474 12.3584 30.6688C17.7547 26.6215 25.393 24 34 24C42.607 24 50.2453 26.6215 55.6416 30.6688C58.6798 32.9474 60.9467 35.6187 62.3476 38.5C60.9467 41.3813 58.6798 44.0526 55.6416 46.3312C50.2453 50.3785 42.607 53 34 53C25.393 53 17.7547 50.3785 12.3584 46.3312C9.32024 44.0526 7.05326 41.3813 5.65236 38.5Z"
                                fill="url(#paint0_linear_1_91)" />
                            <ellipse cx="33.75" cy="25.5" rx="33.75" ry="25.5" fill="url(#paint1_linear_1_91)" />
                            <defs>
                                <linearGradient id="paint0_linear_1_91" x1="1.47329e-07" y1="53.7206" x2="29.2658"
                                    y2="53.7206" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#ECCB1D" />
                                    <stop offset="1" stop-color="#FFD807" />
                                </linearGradient>
                                <linearGradient id="paint1_linear_1_91" x1="33.75" y1="0" x2="33.75" y2="51"
                                    gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#FFD804" />
                                    <stop offset="1" stop-color="#FFD807" />
                                </linearGradient>
                            </defs>
                        </svg>




                        PointsBud

                    </div>

                    <!--<div class="links">
                        <a href="">About</a>
                    </div>-->

                </div>
                <div class="hero">
                    <div class="hero__container">
                        <div class="hero__title">
                            Engage with the people who enjoy your food.
                        </div>
                        <p class="hero__caption">We provide restaurants and food vendors with their own digital menu and
                            tools for engaging with customers and selling more than they'd do on Jumia, Glovo and Chowdeck.
                        </p>
                        <div class="hero__cta" style="justify-content: center">

                            <button @click="getStarted">Get Started for free</button>
                        </div>

                        <div class="companies">
                            <div class="companies__header">Trusted by</div>
                            <div class="companies__container">
                                <img src="https://theboroughlagos.com/wp-content/uploads/2018/10/Artboard-1-copy.png">

                                <img style="filter: brightness(0) invert(1);
                                                                                                                                                                                                                                                                            "
                                    id="flutterwave-logo" data-v-796721dc=""
                                    src="https://www.afflee.com/_nuxt/img/flutterwave-logo.311915c.svg" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 
            <div class="trusted">
                <div class="trusted__container">

                    <p class="trusted__header">Trusted by</p>
                    <div class="trusted__logos">

                        <img src="https://theboroughlagos.com/wp-content/uploads/2018/10/Artboard-1-copy.png">

                        <img id="flutterwave-logo" data-v-796721dc=""
                            src="https://www.afflee.com/_nuxt/img/flutterwave-logo.311915c.svg" alt="">
                    </div>
                </div>
            </div> -->

            <div class="footer">
                <div class="footer__container">
                    <div class="links">
                        <a style="text-decoration: underline;" href="/privacy-policy">Privacy Policy</a>
                    </div>
                    <p class="footer__copyright">Copyright 2023, PointsBud Inc</p>
                    <p>An affiliate of <a style="border-bottom: 1px solid white" href="https://www.afflee.com">Afflee </a>
                    </p>
                </div>
            </div>

        </div>
    </div>
</template>


<script>
import mixpanel from 'mixpanel-browser';

export default {
    mounted() {
        mixpanel.init('94aa4934861f03d1be99f929b6ba07b0', { debug: false });
        mixpanel.track("PointsBud: Visited");
    },
    data() {
        return {
            subscribing: false,
            subscribed: false,
            show_modal: false,
            model: {
                contact: ''
            }
        }
    },
    methods: {
        getStarted() {
            mixpanel.track("PointsBud: Click get started");
            this.show_modal = true

        },
        subscribe() {
            mixpanel.track("PointsBud: Clicked subscribe");

            this.subscribing = true;
            this.$api.post('/waitlist', {
                email: this.model.contact
            }).then(resp => {
                this.subscribed = true;

            }).finally(() => {
                this.subscribing = false;
            })
        }
    }
}
</script>


<style lang="scss" scoped>
.submodal {
    &__container {
        padding: 16px;
        box-sizing: border-box;
        ;
    }

    p {
        font-size: 18px;
        font-weight: 500;
        text-align: center;

        &:last-child {
            font-size: 13px;
        }
    }

    .form-input {
        margin-top: 16px;
        @include plain-form-input;
        text-align: center;

        input {
            margin-bottom: 16px;
            text-align: center;
        }
    }

    .cta {
        width: 100%;

        button {
            width: 100%;
            @include largebutton;
            color: white;
        }
    }
}

.landing {
    width: 100%;
}

.container {
    width: 100%;
}

.header {
    background-color: #1e202d;
    width: 100%;
    min-height: 90vh;
    //background-image: url('../static/bckg2.png');
    background-position: center;
    background-repeat: no-repeat;

    &__container {
        width: 80%;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 40px;


    }

    .links {
        a {
            color: white;
        }
    }

    .logo {
        display: flex;
        flex-direction: column;

        color: white;
        font-family: 'Squada One', cursive;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        letter-spacing: 1.5px;
        color: #FFEA78;

    }
}

.hero {
    &__container {
        width: 80%;
        margin: auto;
        color: white;
    }

    &__title {
        text-align: center;
        margin: auto;
        display: block;
        font-size: 50px;
        margin-top: 60px;
        max-width: 946px;
        margin-bottom: 16px;
        font-family: 'Squada One', cursive;
        letter-spacing: 1.5px;

    }

    &__caption {
        text-align: center;
        font-size: 20px;
        font-family: 'Red Hat Display', cursive;
        margin-bottom: 16px;
        max-width: 502px;
        margin: auto;
        margin-bottom: 68px;
        letter-spacing: 1.5px;
        font-weight: 300;
    }

    button {
        //font-family: 'Squada One', cursive;
        padding: 16px 32px;
        margin: auto;
        letter-spacing: 1px;
        color: black;

        border-radius: 50px;
        font-size: 18px;
        font-weight: 600;
        color: $charcoal;
        margin-bottom: 20px;
        width: 300px !important;
        margin: auto;

        @include media("<=t") {
            padding: 14px;
            font-size: 18px;
            width: 100%;
        }

        &:hover {
            box-shadow: rgba(133, 133, 133, 0.25) 0 8px 15px;
            //transform: translateY(-2px);
        }


        &:first-of-type {
            background: #FFEA78 !important;
            //margin-right: 16px;
            color: black;

            @include media("<=t") {
                // margin-right: 18px;
            }

        }

        &:last-child {
            background: rgb(1, 155, 155);
            color: black;

            @include media("<=t") {
                margin-bottom: 60px;
            }


        }
    }

    .companies {
        &__header {
            margin-top: 32px;

            text-align: center;
            font-size: 13px;
        }


        &__container {
            padding-bottom: 30px;
            display: flex;
            justify-content: center;
            width: 50%;
            margin: auto;
            box-sizing: border-box;
            display: grid;
            grid-template-columns: 40% 40%;
            align-items: center;
            justify-content: center;
            //border: 1px solid white;

            @include media("<=t") {
                width: 100%;
            }

            img {
                height: 80px;

            }

        }

    }

    &__cta {
        margin: auto;
        display: flex;
        // width: 50%;


        button {
            width: 80%;
            margin: auto;
        }

        @include media("<=t") {
            width: 80%;
            display: flex;
            flex-direction: column;
        }

    }
}

.trusted {
    background: #FFEA78;

    &__container {
        display: flex;

        flex-direction: column;
        align-items: center;
        padding: 100px 20px;
        padding-bottom: 150px;
    }


    &__header {
        color: grey;
        font-family: 'Squada One', cursive;
        font-weight: 600;
    }


    &__logos {
        display: grid;
        grid-template-columns: 40% 40%;
        align-items: center;
        justify-content: center;
        height: 50px;
    }

    img {
        filter: contrast(.05);
        height: 80px;

    }

    #flutterwave-logo {
        //filter: blur(10px);
        filter: grayscale(1);
    }
}

.footer {
    background: teal;
    min-height: 200px;
    //margin-top: 50px;

    &__container {
        padding: 150px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: white;
        font-family: 'Squada One', cursive;
        font-size: 18px;
        letter-spacing: 1px;

    }
}
</style>