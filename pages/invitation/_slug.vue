<template>
    <div class="iv">

        <div class="iv__header">

            <div class="logos">
                <img class="logo logo--afflee" src="../../static/logo.svg" alt="afflee-logo">
                <svg width="352" height="431" viewBox="0 0 352 431" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 10L342 421" stroke="#4B4B4B" stroke-width="20" stroke-linecap="round"/>
                <path d="M10.5 417L342 11.5" stroke="#4B4B4B" stroke-width="20" stroke-linecap="round"/>
                </svg>
                <img class="logo logo--company ifitness" src="http://res.cloudinary.com/dx9vdtrxz/image/upload/v1669364520/fujmmickxdscnlren1d3.jpg" alt="">


            </div>

            <div class="business">

            </div>


            <div class="iv__header__content">
                <h1>Hey, I-Fitness</h1>
                <p>Let social media content creators and influencers bring you more <span class="bold">membership sales</span> and pay them a commission for ONLY the results they bring.</p>
            </div>
            <div class="iv__header__cta">

                <button>Learn how it works</button>
            </div>
        </div>


        <div class="body">
            <p>We are a performance marketing platform backed by Flutterwave with early partners</p>
        </div>
        
        
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.bold {
    font-weight: 700;
}

.iv {
    &__header {
        padding-bottom: 50px;
        background: $dashboard-background-color;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;

        &__content{
            //width: 80%;
            //margin: auto;
            //text-align: center;
            background-color: transparent;
            margin-top: 50px;
            padding: 0px 50px;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;

            h1 {
                font-size: 50px;
                
            }
            p {
                font-size: 25px;;
                font-weight: 300;
                max-width: 50%;
                margin: auto;
                margin-top: 16px;
            }
        }
        &__cta{ 
            display: flex;
            justify-content: center;
            margin-bottom: 50px;
            margin-top: 50px;
        }

        button {
            width: 50%;
            margin: auto;
            @include largebutton;
            font-size: 25px;
            font-weight: 300;
        
        }
    }
}
.logos {
    //margin: auto;
    display: flex;
    //width: 100%;
   // padding-top: 50px;
   height: 200px;
   // padding-bottom: 50px;
    align-items: center;
    //border: 1px solid grey;
    text-align: center;
    justify-content: center;
    margin-top: 0;

    svg {
        width: 20px;
        margin: 0 20px;;
    }

    
    
}

.logo  {
    //border: 1px solid grey;
    width: 10%;

   

}
</style>