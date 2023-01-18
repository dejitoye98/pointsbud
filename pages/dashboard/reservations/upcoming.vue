<template>
    <div class="reservations">
        <div class="reservations__container">
            <div class="reservation__header">
                <ReservationsTabs/>
            </div>
            <div class="loading" v-if="loading">
              <LoadingState/>
            </div>

            <div class="reservations__content" v-else>
                <div class="table">
                    <tr class="labels">
                        <th data-th="image"> Image</th>
                        <th  data-th="Reservation Item"> Reservation Item</th>
                        <th  data-th="Date">Date</th>
                        <th  data-th="Check In">Check In</th>
                        <th  data-th="Check Out">Check Out</th>
                        <th  data-th="Amount Paid">Amount Paid</th>
                        <th  data-th="Customer Name">Customer Name</th>
                        <th  data-th="Receipt">Receipt No</th>
                        <th  data-th="Status">Status</th>
                    </tr>

                    <tr v-for="(re, index) in reservations" :key="index">
                      <td>
                        <img :src="re['reservation_space.image']"/>
                      </td>
                      <td>{{re['reservation_space.name']}}</td>
                      <td>{{formatDate(re.day)}}</td>
                      <td>{{re.from_time}}</td>
                      <td>{{re.to_time}}</td>
                      <td>NGN {{formatMoney(re['reservation_space.price'])}}</td>
                      <td>{{re['reservation_space.price']}}</td>
                      <td>{{re['reservation_space.price']}}</td>
                      <td>{{re['reservation_space.price']}}</td>
                    </tr>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    layout: 'dashboard',
    created() {
        this.$store.commit('dashboard/setActive', 'Reservations')
        this.$store.commit('dashboard/setDashboardTitle', 'Reservations');  
        this.getReservations();  
        
    },
    data() {
        return {
            reservations: [],
            loading: true,
        }
    },
    methods: {
        formatDate(date) {
            return moment(date).format("DD MMM, yyyy");
        },
        formatMoney(momey) {
            if (momey) {
                return Intl.NumberFormat('en-US').format(momey)
            }
            return momey
        },
        getReservations() {
            this.loading = true;
            this.$api.get(`/reservations/self?upcoming=true`).then(resp=> {
                this.reservations = resp.data.data.list;
                console.log(this.reservations)
            }).catch(err=> {
                
            }).finally(() => {
                this.loading = false;
            })
        }
    }
}
</script>

<style lang="scss" scoped>

$breakpoint-alpha: 480px; // adjust to your needs

.table {
  margin: 1em 0;
  min-width: 100%; // adjust to your needs
  //color: lightgrey;
  box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
  background: white;

  tr {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }

  th {
    min-height: 55px !important;
    display: none; // for accessibility, use a visually hidden method here instead! Thanks, reddit!
  }

  td {
    display: block;


    img {
      height:60px;
      width: 100%;
      object-fit: cover;
      border-radius: 10px;
    }
    &:first-child {
      padding-top: 0.5em;
    }
    &:last-child {
      padding-bottom: 0.5em;
    }

    &:before {
      content: attr(data-th) " "; // who knew you could do this? The internet, that's who.
      //font-weight: bold;

      // optional stuff to make it look nicer
      width: 6.5em; // magic number :( adjust according to your own content
      display: inline-block;
      // end options

      @media (min-width: $breakpoint-alpha) {
        display: none;
      }
    }
  }

  th,
  td {
    text-align: left;

    @media (min-width: $breakpoint-alpha) {
      display: table-cell;
      padding: 0.25em 0.5em;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        padding-right: 0;
      }
    }
  }
}

// presentational styling

@import "https://fonts.googleapis.com/css?family=Montserrat:300,400,700";

body {
  padding: 0 2em;
  font-family: Montserrat, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  color: #444;
  background: #eee;
}

h1 {
  font-weight: normal;
  letter-spacing: -1px;
  color: #34495e;
}

.table {
  background: white;
  color: black;
  border-radius: 0.4em;
  overflow: hidden;
  font-size: 15px !important;
  //border: 0.5px solid rgba(211, 211, 211, 0.368);

  tr {
    border-color: rgba(211, 211, 211, 0.368);
    border-top: 0;
    cursor: pointer;
    vertical-align: middle;
  }
  th,
  td {
    border-bottom: 1px solid whitesmoke;
    margin: 0.5em 1em;
    font-size: 16px;
    @media (min-width: $breakpoint-alpha) {
      padding: 1em !important;
    }
  }
  th,
  td:before {
    //color: grey;
    color: black;
    font-weight: 400;
  }
}

.labels {
  min-height: 70px;
  background: #fafafa;
}

</style>