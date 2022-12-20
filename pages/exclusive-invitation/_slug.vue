<template>
    <div class="exclusive">
        <div class="exclusive__header">
            <div class="exclusive__header__logo">
                <img class="logo" src="../../static/logo.svg" alt="afflee-logo">
            </div>
            
            
        </div>
        <div class="exclusive__body">
            <div class="exclusive__body__container">
                <div class="exclusive__body__header">
                    <h1>Sophia Momodu's early access to join Afflee </h1>
                </div>

                    <div class="exclusive__body__content__caption">
                        <p>Fill in the form to get early access to the highest-paying marketing campaigns immediately Afflee launches.</p>
                        <p>We are backed by <a class="link">Flutterwave </a> and some of our early partner brands include include <a class="link">Circa Lagos </a>, <a class="link"> HealthTracka </a> and <a class="link"> Bamboo Investment </a>, etc. </p>


                        <p>14 days until launch</p>
                    </div>
                <div class="exclusive__body__content">
                   


                    <div class="exclusive__body__form">
                        <div class="form-input">
                            <label for="">Name</label>
                            <input type="text"/>
                        </div>
                        <div class="form-input">
                            <label for="">Email Address</label>
                            <input type="text"/>
                        </div>
                        <div class="form-input">
                            <label for="">Instagram Handle</label>
                            <input type="text"/>
                        </div>
                        <div class="form-input">
                            <label for="">TikTok Handle</label>
                            <input type="text"/>
                        </div>
                        <div class="form-input">
                            <label for=""> Twitter Handle</label>
                            <input type="text"/>
                        </div>
                        <div class="form-input">
                            <label for=""> Youtube Handle</label>
                            <input type="text"/>
                        </div>
                    </div>

                    <button> Set Up Account </button>
                </div>
                 <div class="exclusive__body__content__header">
                        <p>Afflee is an data-driven influencer marketing platform that helps influencers to discover and join marketing campaigns of the biggest brands in Africa.</p>
                        <p>We are backed by <a class="link">Flutterwave </a> and some of our early partner brands include include <a class="link">Circa Lagos </a>, <a class="link"> HealthTracka </a> and <a class="link"> Bamboo Investment </a>, etc. </p>
                    </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
p {
    text-align: justify;
}
a {
    color: $primary;
    font-weight: 500;
}
.exclusive {
    background: $dashboard-background-color;
    display: flex;
    flex-direction: column;
    padding: 50px 0;
    height: 100vh;
    &__header {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
        
        &__logo {
            width: 200px;

            img {
                width: 100%;
            }
        }
    }

    &__body {
        width: 60%;
        margin: auto;

        &__form {
           // margin-top: 50px;
            display: flex;
            flex-direction: column;

            .form-input {
                @include form-input;
            }
        }

        &__container {

        }
        &__header {
            font-size: 30px; 
            font-weight: 500;
            text-align: center;
            width: 500px;
            margin: auto;
            line-height: 40px;
            margin-bottom: 50px;
        }

        &__content {

            &__header {
                width: 100%;
                margin: auto;
                text-align:center;

                p {
                    margin-bottom: 20px;
                }
            }

            &__caption {
                margin: auto;

                p {
                    color: $charcoal;
                    margin-bottom: 20px;
                    &:last-of-type {
                        color: black;
                        font-weight: 500;
                        font-size: 20px;
                        text-align: center;
                        margin-bottom: 0;
                    }
                }
                
            }
        }
    }
}

</style>