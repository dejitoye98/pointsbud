<template>
  <div class="worldmap">
    <vue-world-map id="worldmap" v-bind:countryData="countries" v-bind:defaultCountryFillColor="map.defaultCountryFillColor" v-bind:highColor='map.highColor' v-bind:countryStrokeColor='map.countryStrokeColor' v-bind:lowColor="map.lowColor"></vue-world-map>
  </div>
</template>

<script>
import VueWorldMap from "vue-world-map";

export default {
  components: {
    VueWorldMap
  },
 
  data() {
    return {
        countries: {
            "NG" :10000000,
            "US": 1
        },
      map: {
        defaultCountryFillColor: 'white',
        highColor: '#D94241',
        lowColor: '#E3A09E',
        countryStrokeColor: 'black'
      }
    };
  }
};
</script>

<style scoped>

#worldmap .vue-world-map {
  
}



</style>
