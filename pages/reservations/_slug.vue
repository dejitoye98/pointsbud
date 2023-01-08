<template>
  <div class="re" @click="clearDropdown">
    <div class="re__header">
      <div class="re__header__logo">
        <Logo />
        <span>Reservations</span>
      </div>
      <div class="re__header__links">
        <a>Products</a>
        <a>Reviews</a>
      </div>
    </div>
    <div class="re__container">
      <div class="date-filter">
        <div class="date-filter__header">
          <p>Choose Date & Time</p>
        </div>
        <div class="date-filter__form">
          <div class="date-filter__form__date">
            <DatePicker v-model="chosen.date" />
          </div>
          <div class="date-filter__form__time">


            <div class="timepicker" @click.stop="showTimeDropdown">{{chosen.time }}
                <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="rgba(0,0,0,.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15.71 15.18L12.61 13.33C12.07 13.01 11.63 12.24 11.63 11.61V7.51001" stroke="rgba(0,0,0,.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

            </div>
            <div class="timepicker__dropdown" v-if="show_time_dropdown">
              <ul>
                <li @click="chooseTime(time)" v-for="(time, index) in times" :key="index">{{time}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <template v-if="loading">
        <div style="display: flex; justify-content:center">
          <LoadingState />
        </div>
      </template>

      <template v-else>
        <div class="re__content">
          
          <div class="spaces">
            <div
              class="spaces__item spaces__item"
              v-for="(space, index) in reservationSpaces"
              :key="index"
              :style="{'border-left': '5px solid ' + priceTags[space.price]}"
            >
              <div class="spaces__item__container">
                <div class="spaces__item__header" >
                  <p>{{space.name}} ({{space.type}})</p>
                </div>
                <div class="spaces__item__tag">
                  <p>Available</p>
                </div>

                <div class="spaces__item__content">
                  <div class="spaces__item__feature" v-if v-for="(feature, f_index) in getSpaceFeatures(space) ">{{feature}}</div>
                  <div class="spaces__item__image">

                    <img :src="space.image"></img>
                  </div>
                </div>

                <div class="spaces__item__footer">
                  <div class="spaces__item__price">NGN {{Intl.NumberFormat('en-US').format(space.price)}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <div class="re__footer">
      <div class="re__footer__container">
        
      </div>
    </div>

    
  </div>
</template>


<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import VueTimepicker from "vue2-timepicker";

// CSS
import "vue2-timepicker/dist/VueTimepicker.css";
import moment from "moment";
export default {
  components: {
    DatePicker
  },
  created() {
    this.getReservationPlan();
  // alert(this.isWithinTimeRange("02:00 PM", "12:00 PM", "03:00 PM"))
  },
  
  watch:{
    chosenTIme() {
      
    },
    chosenDate() {
      this.getReservations()
    }
  },

  computed: {
    reservationSpaces() {
      if(this.chosenTime.length === 0) {
        return this.plan.reservation_spaces;
      }
      else {
        const spaces = this.plan.reservation_spaces

        for (let i =0 ; i < this.reservations.length++; i++) {
          for (let a = 0; a < this.plan.reservation_spaces.length; a++) {
            let reservation  = this.reservations[i];
            let reservation_space = this.plan.reservation_spaces[a];

            if (reservation.reservation_space_id === reservation_space.id && this.isWithinTimeRange(this.chosenTime, reservation.from_time, reservation.to_time)) {
              spaces.splice(a, 0);
              continue;
            }
          }
        }
        return spaces
        //return this.plan.reservation_spaces.filter(r=> !spaceIds.includes(r.id))
      }
    },
    chosenTime() {
      return this.chosen.time || "";
    },
    chosenDate() {
      if (this.chosen.date) {

        return moment(this.chosen.date).format("YYYY-MM-DD");
      }
      return ""
    },
    priceTags(){
      if (this.plan && this.plan.reservation_spaces) {

        const spaces  = this.plan.reservation_spaces;
        const prices = [];
        spaces.forEach(space=>{
          if(!prices.includes(space.price)) {
            prices.push(space.price)
          }
        });
        prices.sort();
        prices.reverse()
  
        let tags= {}
  
        prices.forEach((price, index)=> {
          let obj ={}
          if (index ==0) {
            tags[price] = 'gold'
          }
          if (index === prices.length - 1) {
            tags[price] = 'brown'
          }
        })
  
        return tags
        
      }
      }
  },
  data() {
    return {
      chosen: {
        time: "",
        date: ""
      },
      loading: false,
      plan: {},
      reservations: [],
      show_time_dropdown: false,
      times: [
        "12:00 AM",
        "01:00 AM",
        "02:00 AM",
        "03:00 AM",
        "04:00 AM",
        "05:00 AM",
        "06:00 AM",
        "07:00 AM",
        "08:00 AM",
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "01:00 PM",
        "02:00 PM",
        "03:00 PM",
        "04:00 PM",
        "05:00 PM",
        "06:00 PM",
        "07:00 PM",
        "08:00 PM",
        "09:00 PM",
        "10:00 PM",
        "11:00 PM"
      ]
    };
  },
  methods: {
    chooseTime(time) {
      this.chosen.time = time;
    },
    showTimeDropdown() {
      // alert("werw");
      this.show_time_dropdown = true;
    },
    clearDropdown() {
      this.show_time_dropdown = false;
    },
    getReservationPlan() {
      this.loading = true;
      const slug = this.$route.params.slug;
      this.$api
        .get(`/reservations/plans/${slug}`)
        .then(resp => {
          this.plan = resp.data.data;
        })
        .catch(err => {
          this.$route.redirect("/error");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getSpaceFeatures(space) {
      if (space && space.meta && JSON.parse(space.meta)) {
        return JSON.parse(space.meta).features;
      }
      return [];
    },
    getReservations() {
      this.loading = true
      this.$api.get(`/reservations?plan_id=${this.plan.id}&day=${this.chosenDate}`).then(resp=>{
        this.reservations = resp.data.data;
      }).finally(err=> {
        this.loading = false;
      })
    },
    
    isWithinTimeRange(time, startTime, endTime) {
      const time_index = this.times.indexOf(time);
      const start_time_index = this.times.indexOf(startTime);
      const end_time_index = this.times.indexOf(endTime);
      
      return time_index > start_time_index  &&  time_index < end_time_index
    },
    
  }
};
</script>


<style>
.active {
  background: #e3a09e !important;
}
</style>

<style lang="scss" scoped>
.mx-datepicker-main {
  background: $lightaccent !important;
}
.re {
  &__footer {
    background: white;
  }
  &__header {
    //border: 1px solid grey;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 16px;
    border-bottom: 0.5px solid rgba(211, 211, 211, 0.441);
    box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
    //background: url("https://www.toptal.com/designers/subtlepatterns/uploads/45degreee_fabric.png");
    &__logo {
      display :flex;
      align-items:center;
      font-size: 20px;
      font-weight:500;
    }
    &__links {
      a {
        margin-right: 16px;
        font-size: 18px;
        color: $faint;
      }
    }
  }
  &__content {
    width: 95%;
    //display: flex;
    display:flex;
    justify-content: space-between;

    margin: auto;
    box-sizing: border-box;
  }
  &__container {
    background: #f5f8fe85;
    padding: 60px 0;
    height: 100%;
    min-height: 100vh;
    box-sizing: border-box;
    background: url("https://www.toptal.com/designers/subtlepatterns/uploads/45degreee_fabric.png");
  }
}
.date-filter {
  padding: 16px;
  width: 50%;
  background: white;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  @include media("<=t") {
    width: 90%;
  }
  &__header {
    //margin-bottom: 16px;
    color: darkgrey;
    margin-bottom: 8px;
  }

  &__form {
    width: 100%;
    display: grid;
    grid-template-columns: 48% 48%;
    justify-content: space-between;
    &__date {
      &:deep(.mx-datepicker) {
        height: 50px !important;
        width: 100%;
      }
      &:deep(.mx-input-wrapper) {
        height: 50px !important;
      }
      &:deep(.mx-input) {
        border-radius: 50px;
        text-align:center;
        height: 50px !important;
        border: 0.5px solid lightgrey;

        &:hover {
          border: 0.5px solid $lightaccent;
        }
        &:focus {
          border: 0.5px solid $lightaccent;
        }
        .active {
          background: $lightaccent !important;
        }
      }
      &:deep(.mx-date-row) {
        border: 1px solid black !important;
      }
      &:deep(.cell) {
        font-size: 16px !important;
      }
    }
    &__time {
      position: relative;
    }
  }

  .timepicker {
    border: 0.5px solid lightgrey;
    width: 100%;
    height: 50px;
    cursor: text;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #555;
    font-size: 14px;
    position: relative;
    svg {
      position: absolute;
      right: 5px;

    }

    &:hover {
      border: 0.5px solid $lightaccent;
    }

    &__dropdown {
      position: absolute;
      margin-top: 1px;
      margin-bottom: 1px;
      -webkit-box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
      box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
      z-index: 2001;
      margin-left: 16px;
      background: white;
      max-height: 500px;
      overflow: scroll;
      width: 90%;
      ul {
        width: 100%;
        li {
          //height: 30px;
          color: #73879c;
          font-size: 12px;
          line-height: 2;
          cursor: pointer;
          text-align: center;
          padding: 16px;
          &:hover {
            background: rgba(59, 130, 246, 0.05);
            //color: white;
          }
        }
      }
    }
  }
}

.offers {
  //box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  width: 100%;
  margin-top: 50px;
  background: white;
  //opacity: 0.5;
  max-height: 500px;
  border-radius: 10px;
}
.spaces {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 18% 18% 18% 18% 18%;
  padding: 50px 0;



  justify-content: space-between;
  @include media('<=t') {
    grid-template-columns: 48% 48%;
  }
  &__item {
    cursor: pointer;
    height: auto;
    //width: 300px;
    background: white;
    background: white;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    border: 0.5px solid rgba(211, 211, 211, 0.442);
   // border-left: orange 5px solid;
    margin-bottom: 50px;

    &:hover {
      transform: scale(95%);
      box-shadow: rgba(0, 0, 0, 0.1) 0px 8px 12px;
    }

    &--gold {
      border-left: gold 5px solid !important;
    }
    &--green {
      border-left: lightseagreen 5px solid;
    }
    &--blue {
      border-left: blue 5px solid;
    }
    &--red {
      border-left: red 5px solid;
    }

    &__container {
      display: flex;
      flex-direction: column;
      padding: 16px;
      justify-content: space-between;
      height: 100%;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      font-size: 18px;

      align-items: center;
      p {
        color: $charcoal;
        font-weight: 500;

      }
    }

    &__tag {
      border-radius: 8px;
      color: black !important;
      max-height: 20px;
      background: rgba(32, 178, 171, 0.454);
      font-size: 13px;
      width: 100px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 2px 0;
      p {
        color: white !important;
      }
    }

    &__content {
      display: flex;
      flex-wrap: wrap;
      padding: 16px 0;
    }

    &__feature {
      //max-height: 20px;
      color: $faint;
      font-size: 14px;
      background: lightgrey;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      // padding: 8px;
      margin-right: 2px;
      padding: 0 8px;
      margin-bottom: 10px;
    }

    &__image {
      //height: 100%;
      height: 150px;
      width: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__footer {
      padding: 16px 0;
      display: flex;
      justify-self: flex-end;
      align-items: flex-end;
    }

    &__price {
      font-weight: 500;
      font-size: 20px;
      display: flex;
      width: 100%;
      justify-content: flex-end;
      color: $faint;
    }
  }
}
</style>