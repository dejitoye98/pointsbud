<template>
  <div class="container">
    <div class="top">
      <div class="top__container">
        <div class="top__logo">
          <img
            src="https://cdn.shopify.com/s/files/1/1881/1363/files/MOT_Logo_in_black_32ede416-45b1-4b7c-a179-c37ea6e03572_220x.png?v=1649090337"
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

    <div class="main">
      <div class="main__pictures">
        <div class="main__pictures__image zoomed">
          <img
            data-zoom="https://cdn.shopify.com/s/files/1/1881/1363/products/IMG_3607_540x.jpg?v=1654173626"
            src="https://cdn.shopify.com/s/files/1/1881/1363/products/IMG_3607_540x.jpg?v=1654173626"
          />
        </div>

        <div class="main__pictures__more">
          <div class="main__pictures__more__item">
            <img
              src="//cdn.shopify.com/s/files/1/1881/1363/products/IMG_1544_3000x.jpg?v=1654171294"
            />
          </div>
          <div class="main__pictures__more__item">
            <img
              src="//cdn.shopify.com/s/files/1/1881/1363/products/IMG_3548_3000x.jpg?v=1653998198"
            />
          </div>
          <div class="main__pictures__more__item">
            <img
              src="//cdn.shopify.com/s/files/1/1881/1363/products/IMG_3548_3000x.jpg?v=1653998198"
            />
          </div>
          <div class="main__pictures__more__item">
            <img
              src="//cdn.shopify.com/s/files/1/1881/1363/products/IMG_3548_3000x.jpg?v=1653998198"
            />
          </div>
        </div>
      </div>
      <div class="main__details">
        <div class="main__details__title">
          <h2>Renerworld Inverters</h2>
        </div>
        <div class="main__details__review">
          <div class="stars">
            <no-ssr>
              <star-rating star-size="20" :show-rating="false" v-model="rating" :read-only="true" />
            </no-ssr>
          </div>
          <a href>245 reviews</a>
        </div>

        <div class="main__details__description">
          <TruncatedText
            text="Good copywriting on product pages can be overlooked at times. Think of all the pages you’ve seen where retailers have just plonked the manufacturer’s description on the site, the same one that many other sites use.
				This is a missed opportunity to use copy to stand out from competitors, sell the benefits of products, and to answer any questions customers might have. It can help your page rank above competitors, and persuade more people to purchase."
            limit="230"
          ></TruncatedText>
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
          <button>-</button>
          <input type="text" inputmode="numeric" @keypress="isNumber($event)" />
          <button>+</button>
        </div>

        <div class="main__details__pricing">
          <div class="main__details__pricing__price">
            <p>
              <span>NGN</span>40,000
            </p>
          </div>
          <div class="main__details__pricing__cta">
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
	data() {
		return {
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
			rating: 5
		}
	},
	methods: {
		isNumber: function(evt) {
			evt = (evt) ? evt : window.event;
			var charCode = (evt.which) ? evt.which : evt.keyCode;
			if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
				evt.preventDefault();;
			} else {
				return true;
			}
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

$primary: #074c45;
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
	}

	&__logo {
		font-size: 24px;

		font-weight: 600;
		border: 1px solid bla;
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
	}




}

.main {
	display: grid;
	width: 90%;
	margin: auto;
	grid-template-columns: 49% 49%;
	justify-content: space-between;
	margin-top: 60px;
	&__pictures {
		&__image {
			width: 100%;
			max-height: 70vh;
			img {
				max-height: 60vh;
				width: 100%;
				object-fit: cover;
				border-radius: 4px;
			}
		}

		&__more {
			height: 100px;
			display: grid;
			grid-template-columns: 22% 22% 22% 22%;
			justify-content: space-between;
			margin: 16px 0;

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
			font-size: 30px;
			font-weight: 700;
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
