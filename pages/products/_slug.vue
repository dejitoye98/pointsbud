<template>
  <div class="container">
    <PurchaseModal
      @close="triggerPurchase"
      v-if="make_purchase && product"
      :marketer="marketer"
      :form="product.order_forms"
      :totalPrice="totalPrice"
      :product="product"
      :quantity="order.quantity"
    ></PurchaseModal>
    <div class="top">
      <div class="top__container">
        <div class="top__logo">
          <img
            src="data:image/jpeg;base64,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aAyD+fxaVtH9TW0f1NbJ9aXk9v5rnZgpbTKNbUW1vcae6hfN1exdquQ4HeBr21mJObuA20oac74q2j+praP6mucEt5/pD//EACcQAQABAwIFBQEBAQAAAAAAAAERACExQVEQYXGBkTChsdHwIGDB/9oACAEBAAE/If8AAwRfNx4KRC3m/XUu5LOnb1xIAlax3GLAc3/OIbCRISpxvbV+jnSAIyPq4CqB3X/nBKm4ZY5pRZau7PsZefKszJDwmXyh129vUh7JPWLUqst3WjTAGAlpt+zBLuSY60lu1yXkZsZ0mive24i+Bpv04MMwR6Vj8+ogMpPHQERy9PtT17CEaGJic+aPsfGEDdNW3TbgmeBPD1MynfRIoQ4f1jhIaCcNZLfFQwECJqS1CeCwz14KiNT6Y949VpihukP2eHOw904dfz9tJbWAlWrZBuhpt2ete3svsUYnarImUw+OE9wOAY80FrSEMdGnpHtKowFYLx6UghO060ek3loRBGRpui8gw7VfrcTQTWH7Lj0UzUAlXSrVsTL1HvQ+/mJDypS0QALtQS9mjeKgVuop7H9fobqOyHvC3pIyWZTfPnvVnyjz03mo1gflfZ9UgDTtL91KleLtxppoANjdPiiSSV/F/fvUQ6nhVuYoWbyULviyqbOaNot5rK3eoj8w03s/oGRPli6VdfwNczvRCtNYLJafNNc9IFgTKZvVrs1EIwh7xuUqLxk+KBIlUYyUrA2EkYdO9EzgDLwxNBywWQnN2qGjxKAB5XKYJYJl5K9HW93Tsoylu+MOP9SlZOk1P6HxU/ofFDq8r6obNxkJ7rYoYSgIWy+8+0c6AhsEAtAlw3moLiXkFDfnptTAsaIF+HTSrEErRU3PNKcbmZxJvYqfzPip/M+KUXMoX1/kP//aAAwDAQACAAMAAAAQ88888888888888y98888888c01e888887OJ23888888ck4c888888myC00888gEU0YE0888tNsc8Nd8888888888888888888888/8QAIREBAAICAQMFAAAAAAAAAAAAAQARITEgMEBhEFFxkfD/2gAIAQMBAT8Q6wCxfURGnoCDzPzAlUhXfICRjrERbbEu2ICzkNZhCIrr4lCr2gXGjmvbHlCbYOxuHhPh6Ll9v//EABwRAQADAAIDAAAAAAAAAAAAAAEAETEgMBBBUP/aAAgBAgEBPxDus6fRAWDUG+TnjcmuilTMdgo5pcCpTfm//8QAJxABAAICAgEEAgIDAQAAAAAAAREhADFBUWEQMHGBkbEgoWDB0fH/2gAIAQEAAT8Q/wABd62MH5kTPw6AfnNSMSi+RsfZ782wjtXgDlWgN5OTr5CQ3fSvneFaqevRhIS4rsSzJJ1GkNxXf5DmdglhSIyJ7rGFDFHT9wyPhefRb92GBIq1joYkWDIPaK1KCGDgZlBCrCVB0TJIxTydPPow6Y65YfuSPDHHuOmj41L9oxAqtp5eXHDMrCAS+LxUyAThZRktyINURjmxxgNEsBCSyRuMQTXxTzoNQBHyWIguNm+TG/VL6w17YcKKnQi/0OO3BREUSxGEwYqmnb1j868vkwGVsiuxAJHS33GCRhFbEjVCJNIoT6TVsKduB7f9kT4X7xCJSeyH/v36AhYtRBIuxcMJsgQsHZ/R+MTINVCshypt8B6SQr0KOP7f4PuoPHCSBADmCvAHh9JrKePkf6H0iP8A7/8Ajg5kyQtAcuAgNF0RKHkk3yq9e6kkOMgxLZO4WvgTwZDVNtpaBv0Gf/AFIIBKSODABWgFF2cDza98e0sz54ESq8AYsFrx/wC8CnRs3IDwhUMdkaAT/bhthSIyJ3gD/VAoG9tI/eLY3RMzRLzgWFGRdggty1irTLQAtV4MYn0vKqCjT8mRTKWgBlc0j94J670owB5VxBAUaM+raMjZ0YqaOWz8/wA61ihw00AzRBPEYyAeeQ/CMlPlzkaDMK4JiMbLmPrAYnSxybrJUB0mWBhjCsK4mz46sN8EfYR/DlbibmKY+JGrxzqbawJfNJ7RFKDUKHLtEP8AWD02eQQJypJ95D7n6syOoMM+MbE7zbnH4KXTppw6E5VBlpuUMfY2P8oDgmC0BeLcayRZipMA29YGlzs1wQHC0Gg1mgAdEYSiN3DD2Kh1icLBNrKuAcY0CIgEDqqx4w5drhK7OoVgeE6xYFcJQgbNjWCklKFKC2xLGCWAiLULobbytCWBMTJCXWMDRpMBI7ROCCYqPkrlzvADBGJgr2MEJzTuf5awo0UE+cZq+/IcuYkaPjFDebMRYgs0nr5KyYtIWLiiMQAgPyMLCWZuWEEbpLC4KHJAQ9lYBCW0ibcJiwnRvUQRS8pE+VzcMEDLgNrHt3EUYSAgSkDVDfSD36xMiYnKzWPE+2g6/wAF/9k="
            alt
          />
        </div>
        <div class="top__links">
          <a>Website</a>
          <a>Shop</a>
          <a>Reviews</a>
        </div>
        <div class="top__actions">
          <button>Go to Afflee</button>
        </div>
      </div>
    </div>

    <div class="main" v-if="product">
      <div class="main__pictures">
        <div class="main__pictures__image zoomed">
          <img :src="imageInView" />
        </div>

        <div class="main__pictures__more" v-if="product.images">
          <div
            class="main__pictures__more__item"
            @click="showImage(image)"
            v-for="(image, index) in JSON.parse(product.images)"
            :key="index"
          >
            <img :src="image" />
          </div>
        </div>
      </div>
      <div class="main__details">
        <div class="main__details__title">
          <h2>{{product.name}}</h2>
          <p>by {{product.business.name}}</p>
        </div>
        <div class="main__details__review">
          <div class="stars">
            <no-ssr>
              <star-rating
                star-size="20"
                :show-rating="false"
                v-model="product.rating || 0"
                :read-only="true"
              />
            </no-ssr>
          </div>
          <a href>{{product.reviews || 0}} reviews</a>
        </div>

        <div class="main__details__description">
          <TruncatedText :text="product.description" limit="230"></TruncatedText>
        </div>
        <div class="main__details__variations section">
          <h3>Choose Color</h3>

          <div class="variations">
            <label
              class="checkbox"
              :class="[variations.color.selected === 'green' ? 'chosen-fill':'' ]"
            >
              <input type="radio" v-model="variations.color.selected" value="green" />Green
            </label>
            <label
              class="checkbox"
              :class="[variations.color.selected === 'gold' ? 'chosen-fill':'' ]"
            >
              <input type="radio" value="gold" v-model="variations.color.selected" />Gold
            </label>
            <label
              class="checkbox"
              :class="[variations.color.selected === 'red' ? 'chosen-fill':'' ]"
            >
              <input type="radio" value="red" v-model="variations.color.selected" />Red
            </label>
          </div>
        </div>
        <div class="main__details__variations section">
          <h3>Choose Size</h3>
          <div class="variations">
            <label class="checkbox">
              <input type="checkbox" />1.4x
            </label>
            <label class="checkbox">
              <input type="checkbox" />1.8x
            </label>
            <label class="checkbox">
              <input type="checkbox" />1.9x
            </label>
          </div>
        </div>

        <div class="main__details__quantity section">
          <h3>Quantity</h3>
          <button @click="decreaseQuantity">-</button>
          <input
            type="text"
            inputmode="numeric"
            v-model="order.quantity"
            @keypress="isNumber($event)"
          />
          <button @click="increaseQuantity">+</button>
        </div>

        <div class="main__details__pricing">
          <div class="main__details__pricing__price">
            <p>
              <span>NGN</span>
              {{totalPrice | money}}
            </p>
          </div>
          <div class="main__details__pricing__cta" @click="make_purchase = true">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                stroke="white"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                stroke="white"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                stroke="white"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 8H21"
                stroke="white"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <p>Purchase</p>
          </div>
        </div>
        <div class="main__details__offers">
          <p>Free Shipping</p>
        </div>
      </div>
    </div>
  </div>
</template>





<script>
import StarRating from 'vue-star-rating';


export default {
	components: {
		StarRating,
    },
    fetchOnServer: true,
    computed:{
        totalPrice() {
            return this.order.quantity * this.product.unitprice;
        },
        imageInView() {
            if (!this.image_in_view) {
                return this.product.thumbnail
            }
            else {
                return this.image_in_view
            }
        }
    },
    watch: {
       
    },
	data() {
		return {
            make_purchase: false,
			variations: {
				color: {
					items: [],
					selected:''
				},
				size: {
					items: [],
					selected:''
				}
			},
            rating: 5,
            order: {
                quantity: 1,
            },
            image_in_view: null,
		}
    },
    async asyncData({route, router, $api}) {
        const slug = route.params.slug;
        const product = await $api
            .get("/products/pub/" + slug)
            .then(async product => {
                return product.data.data;
            
            })
            .catch(err => {
                alert(err)
            });
        let marketer = null;
         if (route.query.m_uid) {
              marketer = await $api.get(`/marketers/uid/${route.query.m_uid}?product_id=${product.id}&campaign_id=${product.campaign_id}`).then(resp=> {
              return resp.data.data;
            })
          }
        if (marketer)  {
          route.query.ref = marketer.redir_links[0].redir_link;
        }

        return {
            product,
            marketer
        }

    },
    mounted() {
    },
	methods: {
        showImage(image){
            this.image_in_view = image;
        },
        increaseQuantity() {
            if (this.order.quantity < this.product.qty) {
                this.order.quantity++
            }
        },
        decreaseQuantity() {
            if (this.order.quantity > 0) {
                this.order.quantity--
            }
        },
		isNumber: function(evt) {
			evt = (evt) ? evt : window.event;
			var charCode = (evt.which) ? evt.which : evt.keyCode;
			if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
				evt.preventDefault();;
			} else {
				return true;
			}
        },
        triggerPurchase() {
            this.make_purchase = !this.make_purchase;
        },
		alertMe(){
			alert("yeee")
		},
		getClass(color) {
			if (this.variations.color.selected === color) {
				return 'chosen-fill'
			}
		}
	}
	
}
</script>
<style lang="scss" scoped>

$primary: #540a18;
body {
    background: url('https://www.toptal.com/designers/subtlepatterns/uploads/groovepaper.png');
}
.image-details {
	height: 100px;
	height: 200ps;
	border: 1px solid grey;
}
.chosen-fill {
	background: $primary;
	border: 1.8px solid $primary;
	color: white;
}
h3 {
	font-size: 15px !important;
	color: $charcoal;
	margin: 8px 0;

}

.section {
	margin: 24px 0;
}

.variations{
	display: grid;
	grid-template-columns: 20% 20% 20% 20%;
	justify-content: space-between;
}

.checkbox{
	position: relative;
	width:75px;
	height: 40px;
	border: 1.8px solid $charcoal;
	border-radius: 5px;
	padding: 8px;
	display: flex;
	align-items: center;
	text-align: center;
	justify-content: center;
	cursor: pointer;
	font-size: 16px;
	font-weight: 600;

	&:hover {
		background: $primary;
		border: 2px solid $primary;
		color: white;

		
	}
	
	
	input {
		position: absolute;
		width: 100%;
		height: 100%;
		top:0;
		left: 0;
		visibility: hidden;
	}
}
.container {
	width: 90%;
	margin: auto;
}

.top {
	width: 100%;

	//padding: 16px 24px;

	&__container {
		width: 90%;
		margin: auto;
		display: grid;
		grid-template-columns: 18% 60% 18%;
		justify-content: space-between;
		padding: 16px;
		align-items: center;
    @include media("<=t") {
      grid-template-columns: 100%;
    }
	}

	&__logo {
		font-size: 24px;

		font-weight: 600;
    @include media("<=t") {
      display: flex;
      justify-content: center;
    }
	}

	&__links {
		text-align: center;

		a {
			cursor: pointer;
			margin-right: 16px;
			font-size: 18px;
		}
	}
	&__actions{ 
		display: flex;
		justify-content: flex-end;
		button {
			@include smallbutton;
		}
    @include media("<=t") {
      display: none;
    }
	}




}

.main {
	display: grid;
	width: 90%;
	margin: auto;
	grid-template-columns: 49% 49%;
	justify-content: space-between;
	margin-top: 60px;
  @include media("<=t") {
    grid-template-columns: 100%;
    margin-top: 20px;
  }
	&__pictures {
		&__image {
			width: 100%;
			height: 80%;
			img {
				height: auto;
				width: auto;
				object-fit: cover;
				border-radius: 4px;

          @include media("<=t") {
            height: 100%;
          }
			}
		}

		&__more {
			height: 100px;
			display: grid;
			grid-template-columns: 22% 22% 22% 22%;
			justify-content: space-between;
			margin: 8px 0;

      @include media("<=t") {
        margin: 8px 0;
        margin-bottom: 16px;
      }
			&__item {
				height :100px;
				width: 100%;
				cursor: pointer;

				img {
					height: 100%;
					width: 100%;
					object-fit: cover;
					border-radius: 5px;
				}
			}
		}
	}

	&__details {
		max-width: 500px;
		&__title {
            h2 {
                font-size: 30px;
                font-weight: 700;
            }
            p {
                font-size: 18px;
                color: $primary;
            }
        
		}
		&__review  {
			display: flex;;
			margin: 0px 0 8px 0px;
			align-items: center;
			a {
				color: $primary;
				text-decoration: underline;
				text-decoration-color: $primary;
				display: block;
				line-height: 14px;
				
			}

			.stars {
				margin-right: 16px;
			}
		}

		&__description {
			color:$charcoal;
			margin: 8px 0;
			line-height: 1.8;
		}
		&__quantity {
			label {
				margin-top: 8px;
				display: block;
				font-size: 18px;
				color: $charcoal;
				margin-bottom: 8px;
			}
			button {
				width: 40px;
				height: 40px;
				border-radius: 5px;
				background: $primary;
				color: white;
			}
			input {
				height: 40px;
				border: 1px solid $charcoal;
				border-radius: 5px;
				text-align: center;
				color: black;
				max-width: 60px;
				appearance: none !important;
				-webkit-appearance: none !important;
				-moz-appearance: textfield;
			
				&:focus{
					outline: 0;
				}
			}
        }
        
        &__offers {
            color: darkgrey;
        }

		&__variations {
			h3 {
				font-size: 18px;
			}
		}

		&__pricing{
			border-top: 1px solid lightgrey;
			border-bottom: 1px solid lightgrey;
			padding: 16px 0px;
			margin: 24px 0;
			display: flex; 
			justify-content: space-between;
			margin-bottom: 8px;
			align-items: center;
			
			&__price {
				margin-right: 24px;
				display: flex;
				font-size: 20px;
				font-weight: 600;
				align-items: flex-start;
				span {
					font-size: 14px;
				}
			}
			&__cta{
				position: relative ;
				left: 0;
				top: 0;
				background: $primary;
				font-size: 15px;
				color:white;
				@include smallbutton;
				padding: 8px 36px;
				display: flex;
				align-items: center;
				svg {
					margin-right: 8px;
				}
				

			}
		}
	}
}
</style>
