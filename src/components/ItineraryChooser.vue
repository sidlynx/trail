<script setup lang="ts">
import { ref, onMounted, computed, watch, shallowRef, onUnmounted } from 'vue'
import L from 'leaflet'
import type { TItinerary } from '@/types.ts'
globalThis.L = L;
import 'leaflet-routing-machine'

const props = defineProps<{
  zoom?:number;
  startingPoint? : {
    lat:number;
    long:number;
  }
}>();

const emit = defineEmits<{
  (
    e: 'itineraryChange',
   value : TItinerary
  ): void
}>()

const map = shallowRef<L.Map | null>(null)

const zoom = computed(()=>{
  return typeof props.zoom !== "undefined" && props.zoom < 20 ? props.zoom : 13
});

const startingPoint = computed<L.PointExpression>(()=>{
  return typeof props.startingPoint?.lat !== "undefined" && typeof props.startingPoint?.long !== "undefined" ? [
    props.startingPoint.lat,
    props.startingPoint.long
  ] : [
    48.858093,
    2.294694
  ]
})

const destinationPoint = ref<L.PointExpression | null>(null);

const startingMarker = computed<L.Marker>(()=>{
  return new L.Marker(startingPoint.value, {
    draggable: false,
    autoPan: true,
  })
})


const destinationMarker = ref<L.Marker | null>(null);


const drawMap = () => {
  map.value = L.map('map',{
    zoomAnimation: false
  }).setView(startingPoint.value, zoom.value);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map.value);

  startingMarker.value.addTo(map.value);

  map.value.on('click', (e: L.LeafletMouseEvent) => {
    onMapClickhandler(e);
  });
}




watch(destinationPoint, (newVal) => {

  if(destinationMarker.value){
    map.value?.removeLayer(destinationMarker.value);
  }

  destinationMarker.value = new L.Marker(newVal, {
    draggable: false,
    autoPan: true,
    icon: new L.Icon({
      iconUrl: '/marker/marker-icon-2x-red.png',
      shadowUrl: '/marker/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })
  }).addTo(map.value!);

  emit(
    "itineraryChange",
    {
      startingPoint: {
        lat: startingPoint.value[0] as number,
        lng: startingPoint.value[1] as number
      },
      destinationPoint: {
        lat: newVal[0],
        lng: newVal[1]
      }
    }
  )
})

const route = ref<L.Routing.Control | null>(null);


const drawRoute = ()=> {
  if (map.value) {

    if (route.value) {
      map.value?.removeControl(route.value);
      route.value = null;
    }
    route.value = L.Routing.control({
      waypoints: [
        L.latLng(startingPoint.value[0], startingPoint.value[1]),
        L.latLng(destinationPoint.value[0], destinationPoint.value[1])
      ],
      routeWhileDragging: true
    })

    route.value.addTo(map.value)
  }
}

const onMapClickhandler = (e: L.LeafletMouseEvent) => {
  const lat = e.latlng.lat;
  const long = e.latlng.lng;
  destinationPoint.value = [lat,long]

  drawRoute();

}

const destroyMap = () => {
  if (map.value) {
    map.value.off();
    map.value.remove();
    map.value = null;
  }
}

onMounted(() => {
  drawMap()
})

onUnmounted(()=>{
  destroyMap();
})
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 100vh;
}
</style>
