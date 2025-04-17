<script lang="ts">
import {Itinireray} from '@/utils/itinerary.ts'

const calculator = new Itinireray("5b3ce3597851110001cf6248642c4328c9b843c9a03153451cb61e8c");
</script>
<script setup lang="ts">
import ItineraryChooser from '@/components/ItineraryChooser.vue'
import DirectionsResult from '@/components/DirectionsResult.vue'
import type {
  TGeoJsonDirectionsResult,
  TGpxDirectionsResult,
  TItinerary,
} from '@/types.ts'
import { ref } from 'vue'
import WeatherDisplay from '@/components/WeatherDisplay.vue'
import uniqby from "lodash.uniqby";

const maxSpeed = ref<number>(80);


const geoJsonResult = ref<TGeoJsonDirectionsResult | null>(null);
const gpxResult = ref<TGpxDirectionsResult | null>(null);

const steps = ref<TGpxDirectionsResult["gpx"]["rte"]['rtept']>([]);

const itineraryChangeHandler = async (itinerary : TItinerary)=>{
  geoJsonResult.value = await calculator.loadGeoJsonDirections(itinerary,maxSpeed.value);

  gpxResult.value = await calculator.loadGpxDirections(itinerary)

  steps.value  = uniqby((gpxResult.value?.gpx.rte.rtept || []),(item)=>item.extensions.step);
}
</script>

<template>
  <main>
    <div class="left">
      <ItineraryChooser @itinerary-change="itineraryChangeHandler" maxSpeed />
    </div>
    <div class="right">
      <div>
        Vitesse maximale(km/h):
        <input type="number" min="80" v-model="maxSpeed"/>
      </div>
      <WeatherDisplay :steps="steps"/>
      <DirectionsResult :result="geoJsonResult" v-if="geoJsonResult" style="margin-top:4px;"/>
    </div>
  </main>
</template>

<style scoped>
main {
  max-height: 100vh;
  display: flex;
  .left {
    flex-basis: 50%;
  }
  .right {
    padding-top:4px;
    flex-basis: 50%;
    height: 100%;
    overflow-y: scroll;
  }
}
</style>
