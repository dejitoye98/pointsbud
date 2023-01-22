<template>
  <BaseModal customClass="ninety" @close="$emit('close', true)">
    <template #body>
      <div class="body" @click.stop>
        <div class="header" v-if="edit_mode">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79002C6.00002 22 5.91002 20.78 5.80002 19.21L5.15002 9.14001"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.33 16.5H13.66"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.5 12.5H14.5"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <p>Remove from inventory</p>
        </div>
        <div class="images" v-if="product">
          <div class="images__thumbnail">
            <img :src="product.thumbnail" alt />
          </div>
          <div class="images__more">
            <div class="images__more__item">
              <img :src="product.thumbnail" alt />
            </div>
            <div class="images__more__item">
              <img :src="product.thumbnail" alt />
            </div>
            <div class="images__more__item">
              <img :src="product.thumbnail" alt />
            </div>
            <div class="images__more__item">
              <img :src="product.thumbnail" alt />
            </div>
          </div>
          <div class="details">
            <div class="details__header">
              <h3>{{product.name}}</h3>
              <p>{{product.description}}</p>
            </div>
            <button @click="view(product)">View product</button>
          </div>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
export default {
	props: ['close', 'product', 'marketer', 'edit_mode'],
	data() {
		return {
			loading: true,


		}
	},
	mounted(){
    },
	methods: {
        view(product) {
            this.$router.push(`/products/${product.slug}?m_uid=${this.marketer.uid}`)
        }
		
	}
}
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;
    color: $charcoal;
    cursor: pointer;
}
.details {
    display: flex;
    padding: 16px 0;
    justify-content: space-between;
    border: 1px solid rgba(211, 211, 211, 0.719);
    margin-top: 8px;
    border-left: 0;
    border-right: 0;
   
    &__header {
        p {
            color: $charcoal;
        }
    }
    h3 {
        font-size: 30px;
        font-weight: 500;
    }
    button {
        @include smallbutton;
        max-height: 40px;
    }
}
.images {
    display: grid;
    grid-template-columns: 100%;
    justify-content: space-between;
    width: 95%;
    margin: auto;

    padding: 16px 0;
    &__thumbnail {
        width: 100%;
        border-right: 1px solid whitesmoke;
        margin-bottom: 8px;
        height: 400px;

        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }
    &__more {
        width: 100%;
        display: grid;
        grid-template-columns: 24% 24% 24% 24%;
        justify-content: space-between;
        flex-direction: column;
    }
}
.loading {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	color: $faint;
	margin-top: 16px;
}
.single-choice {
	display: grid;
	grid-template-columns: 20% 20% 20% 20%;
}
.chosen-fill {
	background: $primary;
	border: 1.8px solid $primary;
	color: white;
}
.checkbox{
	position: relative;
	width:75px;
	height: 40px;
	border: 1.8px solid $charcoal;
	border-radius: 5px;
	padding: 8px 16px;
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
.filter {
		width: 100%;
		padding: 16px;
		//margin: auto !important;

		border: 1px solid whitesmoke;

		&__container {
				display: grid;
				grid-template-columns: 49% 49%;
				justify-content: space-between;

		}

		&__button {
				display: flex;
				justify-content: flex-end;
		}



		button {
				@include smallbutton;
				width: 20%;
				margin: auto !important;

		}

		input, select {
				margin-bottom: 8px;
				border: 1.5px solid lightgrey;
				transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
				border-radius: 5px;
				padding: 8px;
				font-size: 14px;
				color: $charcoal;
				font-weight: 400;
				appearance: none;
				widtH: 100%;

				&:active {
					 
				}


		}
}

.body {
	min-height: 200px;
	display: flex;
	flex-direction: column;
	margin-top: 10vh;
	width: 100%;
	&__text {
	text-align: center;
	font-size: 15px;
	}
	&__implication {
	font-size: 14px;
	text-align: center;
	}

	&__header {
	font-size: 18px;
	font-weight: 400;
	border-bottom: 0.5px solid rgba(211, 211, 211, 0.27);

	&__container {
		width: 90%;
		margin: auto;
		padding: 16px 0;

	}

	&__caption {
		font-size: 15px;
		
	}
	}
}
.footer {
	&__container {
	display: flex;
	justify-content: flex-end;
	padding: 16px;

	button {
		@include smallbutton;
		&:first-of-type {
		background: white;
		margin-right: 8px;
		color: rgb(27, 31, 35);
		}
	}
	}
}

.items {
		padding-bottom: 16px;
		.item {
			&__header {
					background: $dashboard-background-color;
					padding: 16px;
					font-size: 14px;
					font-weight: 500;
			}

			&__body {
					display: grid;
					grid-template-columns: 33.3% 33.3% 33.3%;
					justify-content: space-between;
					padding: 0 8px;

					&__item {
							border: 1px solid whitesmoke;
							cursor: pointer;

					}
			}
		}
}

</style>    
