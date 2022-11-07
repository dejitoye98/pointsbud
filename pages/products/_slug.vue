<template>
    <div class="page">
        <div class="header">
            <div class="header__container">
                <div class="logo">
                   <Logo/>
                </div>
            </div>
        </div>

        <div class="product">
            <div class="product__header">
                <div class="product__images">
                    <div class="product__images__thumbnail">
                        <img src="https://media-cdn.tripadvisor.com/media/photo-w/17/d4/2d/4e/chicken-wings-fries.jpg" alt="">
                    </div>

                    <div class="product__images__items">
                        <div class="product__images__items__item" v-for="(image, index) in images" :key="index" >
                            <img :src="image" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template> 

<script>
import Logo from '../../components/Logo'
export default {
    components: {
        Logo
    },

    data() {
        return {
            images: [
                "https://media-cdn.tripadvisor.com/media/photo-w/15/db/e4/ae/photo0jpg.jpg",
                "https://media-cdn.tripadvisor.com/media/photo-o/19/e8/66/c9/img-20191030-wa0014-largejpg.jpg",
                "https://media-cdn.tripadvisor.com/media/photo-o/1b/12/2e/03/chicken.jpg"
            ]
        }
    }
    
}
</script>

<style lang="scss" scoped>
.header {
    //width: 80%;
    //margin: auto;
    padding: 16px 0;
    background: #9ab2b611;
    //border-bottom: 0.5px solid rgba(211, 211, 211, 0.442);

    &__container {
        @include container;
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
}
 .logo{
    //margin-bottom: 40px;
    cursor: pointer;
    padding: 0 36px;

    img {
        object-fit: contain;
        height: auto;
        margin: auto;
        margin-bottom: 50px;
            width: 120px !important;
        margin: 0;
    }
}

.product {
    background: #9ab2b611;
    padding:  0 72px;

   &__header {
       min-height: 500px;
        //border: 1px solid grey;
        width: 50%;
        //border: 1px solid grey;
        padding-top: 50px;
        //margin: auto;

   } 

   &__images {
       &__thumbnail {
           //border: 1px solid grey;
           width: 100%;
           height: 400px;
           margin-bottom: 30px;

           img {
               object-fit: contain;
               width: 100%;
               height: 100%;
                
           }
       }

        &__items {
            //border: 1px solid grey;
            display: grid;
            grid-template-columns: 30% 30% 30%;
            justify-content: space-between;
            &__item {
                height: 100%;
                img {
                    height: 100%;
                    object-fit: cover;
                    border-radius: 10px;
                }
            }
        }
       
   }
}
</style>