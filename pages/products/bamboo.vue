<template>
    <div class="page">
        <div class="header">
            <div class="header__container">
                <div class="logo">
                   <Logo/>
                </div>
                <div class="logo">


                </div>
            </div>
        </div>

        <div class="product">
            <div class="product__header">
                <div class="product__images">
                    <div class="product__images__thumbnail">
                        <img src="https://www.dignited.com/wp-content/uploads/2020/12/bamboo-app.jpg" alt="">
                    </div>

                    <div class="product__images__items">
                        <div class="product__images__items__item" v-for="(image, index) in images" :key="index" >
                            <img :src="image" alt="">
                        </div>
                    </div>
                </div>

                <div class="product__details">
                    <div class="product__details__name">
                        
                        <p>Lock in $500 for a chance to win $1000</p>
                        <p>by <span>Bamboo Investment</span> <span>verified</span></p>

                        

                    </div>

                    <div class="product__details__description">
                        <p> CIRCA offers a contemporary dining experience in a multi level space with a view of the ocean. The restaurant’s overall atmosphere is relaxing and adorned with state-of-the-art furniture.</p>
                    </div>

                    <div class="product__details__options">
                        <select name="" id="">
                            <option value="">1 person</option>
                            <option value="">2 people</option>
                            <option value="">3 people</option>
                            <option value="">4 people</option>
                            <option value="">5 people</option>
                            <option value="">6 people</option>
                            <option value="">7 people</option>
                            <option value="">8 people</option>
                            <option value="">9 people</option>
                            
                        </select>
                        <select name="" id="">
                            <option value="">Today</option>
                            <option value="">Tomorrow</option>
                        </select>
                        <select name="" id="">
                            <option value="">9:00AM</option>
                            <option value="">10:00AM</option>
                            <option value="">11:00AM</option>
                            <option value="">12:00PM</option>
                            <option value="">1:00PM</option>
                            <option value="">2:00PM</option>
                            <option value="">2:00PM</option>
                            <option value="">3:00PM</option>
                            <option value="">4:00PM</option>
                            <option value="">5:00PM</option>
                            <option value="">6:00PM</option>
                            <option value="">7:00PM</option>
                            <option value="">8:00PM</option>
                        </select>
                    </div>
                <div class="product__ctas">
                    <div class="product__price">

                        <p>
                            NGN 10,000
                        </p>
                    </div>

                    <div class="product__btn" >

                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 8H21" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        <p>Make Reservation</p>

                    </div>
                </div>
                </div>

            </div>
        </div>

        <div class="tabbed-content">
            <div class="tabbed-content__container">
                <div class="tabbed-content__tab">
                    <div class="tab" @click="activeTab = tab" :class="[activeTab === tab ? 'selected' : '']" v-for="(tab, index) in tabs" :key="index">
                        <p>{{tab}}</p>
                    </div>
                   
                </div>

                <div class="tabbed-content__body" v-if="activeTab === 'Description'">
                    <div class="">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                         Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                         It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                         It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </div>
                </div>
                <div class="tabbed-content__body" v-if="activeTab === 'Features'">
                    <div class="">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                         Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                         It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                         It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </div>
                </div>
                <div class="tabbed-content__body" v-if="activeTab === 'Delivery Details'">
                    <div class="">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                         Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                         It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                         It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
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
            activeTab: 'Description',
            tabs: ['Description', 'Features', 'Delivery Details', 'Variations'],
            images: [
                "https://media-cdn.tripadvisor.com/media/photo-w/15/db/e4/ae/photo0jpg.jpg",
                "https://media-cdn.tripadvisor.com/media/photo-o/19/e8/66/c9/img-20191030-wa0014-largejpg.jpg",
                "https://media-cdn.tripadvisor.com/media/photo-o/1b/12/2e/03/chicken.jpg",
                "https://media-cdn.tripadvisor.com/media/photo-w/1b/1e/8b/89/photo0jpg.jpg",
                "https://media-cdn.tripadvisor.com/media/photo-o/1b/12/2e/1d/complimentary-nuts.jpg",
            ]
        }
    }
    
}
</script>

<style lang="scss" scoped>
.selected {
    p {

        color: $primary !important;
    }
    border-bottom: 2px solid $primary;
}
.tabbed-content {
    ///width: 70%;


    &__container {
        width: 70%;
        margin: auto;
    }
    &__tab {
        width: 100%;
        margin:auto;
        display: grid;
        grid-template-columns: 24% 24% 24% 24% ;
        justify-content: center;
        border-bottom: 2px solid rgba(211, 211, 211, 0.263);

    }

    .tab {
        cursor: pointer;
        padding: 24px 0;
        p {
            text-align:center;
            color: $faint;
            font-size: 14px;
        }
        //border-bottom: 1px solid $darkshade;
    }

    &__body {
        padding: 36px;
        color: $faint;
        font-size: 15px;
        font-weight: 300;
        line-height: 30px;
        text-align: justify;

    }
}
.header {
    //width: 80%;
    //margin: auto;
    padding: 16px 0;
    
    background: #07775d1f;
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
        background: #07775d1f;
    padding:  0 72px;
    //border-bottom: 1px solid grey;


    justify-content: space-between;

    &__btn {
        @include largebutton;
        position: relative;
        display:block;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 250px;
        &:hover {
        }

        svg {
            margin-right: 16px;
        }
    }

    &__price {
        color: $charcoal;
        font-weight: 500;
        font-size: 20px;
    }

    &__ctas {
      
        //justify-content: space-between;
        margin-top: 50px;
        display: flex;
        align-items: center;
        button {
            @include largebutton;
            border-radius: 50px;
            width: 300px;
            margin-top: -30px;
        }
    }
    &__price {
        margin-right: 64px;
    }

   &__header {
       min-height: 500px;
        //border: 1px solid grey;
        width: 100%;
        //border: 1px solid grey;
        padding-top: 100px;
        display: grid;
        padding-bottom: 100px;
        grid-template-columns: 45% 45%;
        justify-content: space-between;


        //margin: auto;

   } 

   &__images {
       &__thumbnail {
          // border: 1px solid grey;
           width: 100%;
           height: 450px;
           margin-bottom: 30px;
           display: flex;
           justify-content: flex-start;

           img {
               object-fit: cover;
               width: 100%;
               height: 100%;
               border-radius: 5px;
                
           }
       }

        &__items {
            //border: 1px solid grey;
            display: grid;
            grid-template-columns: 15% 15% 15% 15% 15%;
            //justify-content: space-between;
            justify-content: flex-start;
            //border: 1px solid grey;
            //@debugheight: 150px;
            &__item {
                margin-bottom: 20px;
                height: 100px;
                img {
                    height: 100%;
                    object-fit: cover;
                    border-radius: 5px;
                }
            }
        }
       
   }

   &__details {

       &__name {
           p {
               font-size: 30px;
               font-weight: 500;
               color: $charcoal;

               &:last-of-type{ 
                   font-size: 15px;
                   
               }
           }

           span {
               color: $primary;
           }
        
       }

       &__description {
           font-size: 15px;
           font-weight: 300;
            margin-top: 30px;
            margin-bottom: 30px;
            color: $charcoal;
       }

       &__options {
            display: grid;
            grid-template-columns: 30% 30% 30%;
            justify-content: space-between;
           select {
               border: 1px solid  rgba(211, 211, 211, 0.333);
               padding: 16px;
               color: $faint;
               font-size: 14px;
               border-radius: 5px;
               font-weight: 300;
           }
       }
   }
}

</style>