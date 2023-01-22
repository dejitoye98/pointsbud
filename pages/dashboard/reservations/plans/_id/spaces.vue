<template>
  <div>
    <!--<ConfirmationModal />-->
    <!--<ReservationItemAvailabilityModal />-->
    <CreateReservationAdminModal 
        v-if="modals.createReservation === true" :space="spaces[0]"
        @onExecute="createReservation"
        @onCancel="toggleCreateReservationModal"
        :total="selectedTotalPrice"
        :checkIn="filter.from"
        :checkOut="filter.to"/>
    <div class="container">
      <div class="filter">
        <div class="filter__container">
          <div class="filter__header">
            <p>Search Availability</p>
          </div>
          <div class="filter__body">
              <div class="form-input">
                  <label for=""> Date</label>
                <DatePicker v-model="filter.date"/>
              </div>
              <div class="form-input">
                  <label for=""> Check-in</label>
                    <timepicker type='from' @onTimeChanged="onTimeChanged"/>
              </div>
              <div class="form-input">
                  <label for=""> Check-out</label>
                    <timepicker type='to' @onTimeChanged="onTimeChanged"/>
              </div>
        
          </div>
          <div class="filter__footer">
              <button :disabled="filter.date && filter.from && filter.to" @click="clearFilter">Clear</button>
              <button :disabled="!filter.date || !filter.from || !filter.to" @click="getReservations">Search</button>
          </div>
        </div>
      </div>
      <div>
        
        <template v-if='loading'>
                <LoadingState/> 


        </template>

        <div class="space-container" v-else v-for="(type, index) in Object.keys(groupedSpaces)" :key="index">
            <p class="space-container__header">{{ type }}</p>

            <div class="spaces">
            <div class="space" v-for="(space, s_index) in groupedSpaces[type]" :key="s_index">
                <div class="space__container">
                <div class="space__image">
                    <img :src="space.image" />
                </div>
                <div class="space__details">
                    <p class="name">{{ space.name }}</p>
                    <p class="price">NGN {{ space.price | money }}</p>
                </div>

                <button class="availability" v-if="bookedItems.includes(space.id) && searchingAvailablity" disabled>Booked</button>
                <button class="availability availability__set"  v-else-if="searchingAvailablity" @click="toggleCreateReservationModal(); setSelectedPrice(space)">Set to Booked</button>
                </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.container {
    display: grid;
    grid-template-columns: 20% 75%;
    justify-content: space-between;
}

.filter {
    @include card;
    height: min-content;
    &__header {
        padding: 16px;
    }
    &__body {
        padding: 16px;
    }
    &__footer {
        display: flex;
        justify-content: flex-end;
        padding: 0 16px 16px 16px;
        
        button {
            @include smallbutton;
            &:first-of-type {
                margin-right: 8px;
                background: white;
                color: $charcoal;

            }
        }
    }

}

.form-input {
    @include plain-form-input;
    display: flex;

    &:deep(.mx-datepicker) {
        width: 100% !important;
    }
    &:deep(.container){
        display: flex !important;
        width: 100% !important;
    }
}
.space-container {
  margin-bottom: 36px;
  &__header {
    color: darkgrey;
    font-size: 20px;
  }
}
.space {
  @include card;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 18px !important;

  &__header {
  }

  &__container {
    padding: 16px;
  }

  &__image {
    width: 100%;
    height: 200px;
    border-radius: 10px;
    img {
      width: 100%;
      border-radius: 10px;

      height: 100%;
      object-fit: cover;
    }
  }
  &__details {
    display: grid;
    grid-template-columns: 50% 50%;
    justify-content: space-between;
    padding: 16px 0;
    p {
      font-size: 16px !important;
      font-weight: 400 !important;
      display: block;
      padding: 8px;
      text-align: center;
      &:first-of-type {
        font-weight: 600;
        border-right: 0.5px solid lightgrey;
      }
    }
  }
}
.availability {
  @include smallbutton;
  width: 100%;
  background: $primary;
  color: white;
  font-weight: normal;
  font-size: 15px;

  &__set {
      background: lightseagreen;
      color: white;
  }
}
.spaces {
  width: 100%;
  display: grid;
  grid-template-columns: 24% 24% 24% 24%;
  justify-content: space-between;
}
</style>



<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  layout: "dashboard",
  components: {DatePicker},
  data() {
    return {
        filter: {
            date: '',
            from:'',
            to: ''
        },
        modals: {
            createReservation: false,
        },
        selectedTotalPrice: 0,
        searchingAvailablity: false,
        loading: false,
        reservations: null,
        bookedItems: [],
        times: [
            "12:00 AM",
            "1:00 AM",
            "2:00 AM",
            "3:00 AM",
            "4:00 AM",
            "5:00 AM",
            "6:00 AM",
            "7:00 AM",
            "8:00 AM",
            "09:00 AM",
            "10:00 AM",
            "11:00 AM",
            "12:00 PM",
            "1:00 PM",
            "2:00 PM",
            "3:00 PM",
            "4:00 PM",
            "5:00 PM",
            "6:00 PM",
            "7:00 PM",
            "8:00 PM",
            "9:00 PM",
            "10:00 PM",
            "11:00 PM"
        ]
    };
  },
  created() {
      //this.getReservations()
      //alert(s)
  },
  watch: {
        checkin() {
            if (this.searchingAvailablity) {
                this.establishAvailablity()
            }
        }, 
        checkout() {
            if (this.searchingAvailablity) {
                this.establishAvailablity()
            }
        }
  },

  methods: {
      createReservation() {

      },
      setSelectedPrice(space) {
          const checkin_index = this.times.indexOf(this.filter.from);
          const checkout_index = this.times.indexOf(this.filter.to);

          const hours = checkout_index - checkin_index;
          this.selectedTotalPrice =  space.price * hours;
        
      },
      toggleCreateReservationModal() {
          this.modals.createReservation = !this.modals.createReservation;
      },
      clearFilter() {
          this.bookedItems = [];
          this.searchingAvailablity = false;
      },
      spaceIsAvailable(checkin, checkout, rCheckIn, rCheckoutOut) {
          const checkin_index = this.times.indexOf(checkin);
          const checkout_index = this.times.indexOf(checkout);
        
          const reservation_checkin_index = this.times.indexOf(rCheckIn);
          const reservation_checkout_index = this.times.indexOf(rCheckoutOut);
          console.log(checkin_index)
          console.log(checkout_index)
          console.log(reservation_checkin_index)
          console.log(reservation_checkout_index)
            
          if (checkin_index === reservation_checkin_index) {
              return false;
          }
          else if ( checkin_index  > reservation_checkin_index && checkin_index <  reservation_checkout_index){
              return false
          }
          else if (checkout_index > reservation_checkin_index  && checkout_index < reservation_checkout_index) {
              return false
          }
          return true
      },
      establishAvailablity() {
          const {from, date, to} = this.filter;
          const reservations = this.reservations;
          this.bookedItems = [];

          // lloop through each reservation and see if a space has been reserved;
          this.reservations.forEach(reservation => {
              this.spaces.forEach((space,index)=> {
                  if (reservation.reservation_space_id === space.id && reservation.status === 'reserved') {
                      
                      if (!this.spaceIsAvailable(from, to, reservation.from_time, reservation.to_time)) {
                          this.bookedItems.push(space.id)
                      }
                  }
              })
          })
        this.searchingAvailablity = true;

      },
      getReservations() {
            this.loading = true;
			this.$api.get(`/reservations/mine?plan_id=${this.$route.params.id}&day=${this.filterDate}`).then(resp=>{
                this.reservations = resp.data.data;
                this.establishAvailablity()
			}).finally(err=> {
				this.loading = false;
			})
		},
      onTimeChanged(meta) {
          this.filter[meta.type] = meta.time;
      },
      
  },
  computed: {
    ...mapGetters("reservations", ["spaces"]),
    filterDate(){
        if (this.filter.date)
            return moment(this.filter.date).format('YYYY-MM-DD')
    },
    checkin() {
        return this.filter.from
    },
    checkout() {
        return this.filter.to
    },
    groupedSpaces() {
      if (this.spaces) {
        const types = {};
        this.spaces.forEach(space => {
          if (!types[space.name]) {
            types[space.name] = [space];
          } else {
            types[space.name].push(space);
          }
        });

        return types;
      }
      return {};
    }
  }
};
</script>
