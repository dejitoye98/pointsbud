<template>
    <div class="landing">
        <div class="landing__container">
            <div class="header">
                <div class="header__container">
                    <div class="logo">
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="25" cy="25" r="25" fill="#B79B08" />
                            <ellipse cx="24.1329" cy="25.3012" rx="23.5156" ry="24.0964" fill="#FFD700" />
                            <path
                                d="M42.6508 25.3012C42.6508 35.5285 34.36 43.8193 24.1329 43.8193C13.9057 43.8193 5.61493 35.5285 5.61493 25.3012C5.61493 15.074 13.9057 6.78314 24.1329 6.78314C34.36 6.78314 42.6508 15.074 42.6508 25.3012Z"
                                fill="#FFEA78" stroke="#D8B708" stroke-width="2" />
                            <path opacity="0.5"
                                d="M33.0552 22.86C33.0552 25.08 32.3252 26.74 30.8652 27.84C29.4252 28.92 27.7452 29.46 25.8252 29.46H22.8252V32.58H25.8252V36H16.7052V32.58H18.8052V19.92H16.7052V16.5H25.6452C28.0652 16.5 29.9052 17.07 31.1652 18.21C32.4252 19.35 33.0552 20.9 33.0552 22.86ZM28.7352 22.92C28.7352 21.96 28.4652 21.22 27.9252 20.7C27.4052 20.18 26.4752 19.92 25.1352 19.92H22.8252V26.07H25.0752C26.4552 26.07 27.4052 25.78 27.9252 25.2C28.4652 24.62 28.7352 23.86 28.7352 22.92Z"
                                fill="#413703" />
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
                            <span style="border-bottom: 3px solid #FFEA78;;">Gift</span> and <span
                                style="border-bottom: 3px solid rgb(1, 155, 155) ;">Earn</span> Points for
                            Discounted Purchases
                        </div>
                        <p class="hero__caption">We enable ventures in the business of hospitality to reward and <span
                                style="color: #FFEA78">retain</span>
                            their customers...
                        </p>
                        <div class="hero__cta" style="justify-content: center">

                            <button>Find Deals</button>
                            <button>Set up a loyalty program</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="trusted">
                <div class="trusted__container">

                    <p class="trusted__header">Trusted by</p>
                    <div class="trusted__logos">

                        <img src="https://theboroughlagos.com/wp-content/uploads/2018/10/Artboard-1-copy.png">

                        <img id="flutterwave-logo" data-v-796721dc=""
                            src="https://www.afflee.com/_nuxt/img/flutterwave-logo.311915c.svg" alt="">
                    </div>
                </div>
            </div>

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


<style lang="scss" scoped>
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
    background-image: url('../static/bckg2.png');
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
        margin-bottom: 34px;
        font-family: 'Squada One', cursive;
        letter-spacing: 1.5px;

    }

    &__caption {
        text-align: center;
        font-size: 20px;
        font-family: 'Red Hat Display', cursive;
        margin-bottom: 34px;
        max-width: 502px;
        margin: auto;
        margin-bottom: 68px;
        letter-spacing: 1.5px;
        font-weight: 300;
    }

    button {
        font-family: 'Squada One', cursive;
        padding: 16px 32px;
        margin: auto;
        letter-spacing: 1px;

        border-radius: 50px;
        font-size: 18px;
        font-weight: 600;
        color: $charcoal;
        margin-bottom: 20px;

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
            margin-right: 16px;

            @include media("<=t") {
                margin-right: 18px;
            }

        }

        &:last-child {
            background: rgb(1, 155, 155);
            color: white;

            @include media("<=t") {
                margin-bottom: 60px;
            }


        }
    }

    &__cta {
        margin: auto;
        display: flex;
        width: 50%;

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