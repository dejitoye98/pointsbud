<template>
  <div class="offers">




    <NewOfferModal v-if="show_create_modal" @close="show_create_modal = false"></NewOfferModal>

    <div class="offers__container">
      <div class="section-title">
        <h2>Offers</h2>
        <button @click="show_create_modal = true"> + Create new offer</button>
      </div>
    </div>
    <div class="offers__content">
      <div class="offer" v-for="(offer, index) in offers" :key="index">
        <div class="offer__container">
          <div class="offer__header" :style="computeHeaderStyle(offer)">
            <p> {{ offer.offer }}</p>
          </div>

          <div class="offer__content">
            <p>{{ offer.title }}</p>
          </div>

          <div class="offer__view">
            <button @click="viewDetails(offer.id)"> View Details</button>
          </div>

          <div class="offer__footer" :style="computeFooterStyle(offer)">

          </div>
        </div>
      </div>

      <!-- 
                                                                                                                                                                                                                                                              <div class="offer">
                                                                                                                                                                                                                                                                <div class="offer__container">
                                                                                                                                                                                                                                                                  <div class="offer__header">
                                                                                                                                                                                                                                                                    <div class="offer__header__image">
                                                                                                                                                                                                                                                                      <svg width="75" height="75" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                                                                                                                                                                                        <path
                                                                                                                                                                                                                                                                          d="M3.9889 14.6604L2.46891 13.1404C1.84891 12.5204 1.84891 11.5004 2.46891 10.8804L3.9889 9.36039C4.2489 9.10039 4.4589 8.59038 4.4589 8.23038V6.08036C4.4589 5.20036 5.1789 4.48038 6.0589 4.48038H8.2089C8.5689 4.48038 9.0789 4.27041 9.3389 4.01041L10.8589 2.49039C11.4789 1.87039 12.4989 1.87039 13.1189 2.49039L14.6389 4.01041C14.8989 4.27041 15.4089 4.48038 15.7689 4.48038H17.9189C18.7989 4.48038 19.5189 5.20036 19.5189 6.08036V8.23038C19.5189 8.59038 19.7289 9.10039 19.9889 9.36039L21.5089 10.8804C22.1289 11.5004 22.1289 12.5204 21.5089 13.1404L19.9889 14.6604C19.7289 14.9204 19.5189 15.4304 19.5189 15.7904V17.9403C19.5189 18.8203 18.7989 19.5404 17.9189 19.5404H15.7689C15.4089 19.5404 14.8989 19.7504 14.6389 20.0104L13.1189 21.5304C12.4989 22.1504 11.4789 22.1504 10.8589 21.5304L9.3389 20.0104C9.0789 19.7504 8.5689 19.5404 8.2089 19.5404H6.0589C5.1789 19.5404 4.4589 18.8203 4.4589 17.9403V15.7904C4.4589 15.4204 4.2489 14.9104 3.9889 14.6604Z"
                                                                                                                                                                                                                                                                          stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                                                                                                                                                                        <path d="M9 15L15 9" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                                                                                                                                                                                                                        <path d="M14.4945 14.5H14.5035" stroke="white" stroke-width="2" stroke-linecap="round"
                                                                                                                                                                                                                                                                          stroke-linejoin="round" />
                                                                                                                                                                                                                                                                        <path d="M9.49451 9.5H9.50349" stroke="white" stroke-width="2" stroke-linecap="round"
                                                                                                                                                                                                                                                                          stroke-linejoin="round" />
                                                                                                                                                                                                                                                                      </svg>
                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                    <div class="offer__header__title">
                                                                                                                                                                                                                                                                      <p class="offer__header__title__text">20% off</p>
                                                                                                                                                                                                                                                                      <p class="offer__header__title__caption">Discount</p>
                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                  </div>

                                                                                                                                                                                                                                                                  <div class="offer__description">50% discount on all the latest products</div>
                                                                                                                                                                                                                                                                  <div class="offer__footer">
                                                                                                                                                                                                                                                                    <button>View criteria</button>
                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                              </div> -->

    </div>
  </div>
</template>

<script>

export default {
  layout: "admin-dashboard",
  components: {

  },
  created() {
    this.$store.commit('dashboard/setActive', 'Offers')

    this.getOffers()
  },
  data() {
    return {
      offers: [],
      show_create_modal: false,
      conversionChart: {
        chartData: [
          ['Year', 'Sales', 'Expenses', 'Profit'],
          ['2014', 1000, 400, 200],
          ['2015', 1170, 460, 250],
          ['2016', 660, 1120, 300],
          ['2017', 1030, 540, 350]
        ],
        chartOptions: {
          chart: {
            title: 'Company Performance',
            subtitle: 'Sales, Expenses, and Profit: 2014-2017',
          }
        }
      }
    }
  },
  methods: {
    computeHeaderStyle(offer) {
      const obj = {

      }

      if (offer.offer === 'discount') {
        obj.backgroundColor = '#d6843821';
        obj.color = '#d68438';
      }
      else if (offer.offer === 'discount') {
        obj.backgroundColor = '#d9414132';
        obj.color = '#D94241';
      }
      else {
        obj.backgroundColor = 'rgba(0, 128, 128, 0.144)';
        obj.color = 'teal';
      }

      return obj

    },
    computeFooterStyle(offer) {
      const obj = {

      }

      if (offer.offer === 'discount') {
        obj.backgroundColor = '#d68438';
        obj.color = '#d68438';
      }
      else if (offer.offer === 'discount') {
        obj.backgroundColor = '#D94241';
        obj.color = '#D94241';
      }
      else {
        obj.backgroundColor = 'teal';
        obj.color = 'teal';
      }

      return obj

    },
    getOffers() {
      this.$api.get('/offers').then(resp => {
        this.offers = resp.data.data.list;
      }).catch(err => {

      })
    },
    viewDetails(id) {
      this.$router.push('/admin/dashboard/offers/' + id)
    }
  }
};
</script>

<style lang="scss" scoped>
.offers {
  padding: 36px;

  &__container {}

  &__content {
    display: grid;
    grid-template-columns: 24% 24% 24% 24%;
    justify-content: space-between;
  }
}

.section-title {
  color: $charcoal;
  margin-bottom: 18px;
  display: flex;
  justify-content: space-between;

  h2 {
    font-weight: 500;
    font-size: 20px;
    margin-right: 16px;


  }

  button {
    font-size: 16px;
    font-weight: 700;
    color: $primary;
    letter-spacing: 0.5px;
    @include smallbutton;

  }
}

.offer {
  @include card;
  margin-bottom: 18px;
  height: max-content;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.15s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }



  &__header {
    width: 70%;
    justify-content: center;
    display: flex;
    margin: auto;
    border-radius: 10px;
    margin-top: 18px;
    padding: 2px;


  }

  &__content {
    text-align: center;
    width: 90%;
    margin: 24px auto;
    display: flex;
    justify-content: center;

    p {
      font-size: 24px;
      font-weight: 600;
      max-width: 125px;
    }
  }

  &__view {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;

    button {
      @include smallbutton;
      background: transparent;
      color: $charcoal;
      font-size: 14px;

      &:hover {
        background: whitesmoke;
      }
    }
  }

  &__footer {
    background: $charcoal;
    height: 5px;

  }
}



/*
.offer {
  margin-bottom: 16px;
  @include card;
  border-radius: 20px;
  // background: $secondary;

  &__container {
    display: flex;
    flex-direction: column;
    padding: 16px;
  }

  &__header {
    display: flex;

    &__image {}

    &__title {
      &__text {
        color: white;
        font-size: 30px;
      }

      &__caption {
        color: white;
        font-size: 18px;
      }
    }
  }

  &__description {
    margin-left: 75px;
    color: white;
    font-size: 18px;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;

    button {
      background: transparent;
      border: 2px solid white;
      border-radius: 5px;
      color: white;
      padding: 8px;
      font-weight: 400;
      font-size: 18px;
    }
  }
}*/
</style>
