<script setup lang="ts">
import { ref, watch } from 'vue'
import { fetchWeather } from '@/utils/meteo.ts'
import type {
  TCheckPoint,
  TGpxDirectionsResult, TMeteoEntry,
  TMeteoResult,
} from '@/types.ts'
import uniqby from 'lodash.uniqby'


const props = defineProps<{
  steps:TGpxDirectionsResult["gpx"]["rte"]['rtept']
}>();

const checkPoints = ref<TCheckPoint[]>([]);

const entries = ref<TMeteoEntry[]>([]);

watch(()=>props.steps,(newVal)=>{
  // const totalDuration = newVal?.reduce((acc,item)=>acc + +item.extensions.duration,0);
  // const totalDistance = newVal?.reduce((acc,item)=>acc + +item.extensions.distance,0);

  const now = new Date();

  const [days,hours,minutes] = [now.getDate(),now.getHours(),now.getMinutes()];


  let $minutes = 0;
  let $hours = hours;
  let $days = days;

  if(minutes === 0){
    $minutes = 0;
  }else if(minutes <= 30) {
    $minutes = 30;
  }else{
    $minutes = 0;
    if(hours < 23){
      $hours +=1;
    }else{
      $hours=0;
      $days +=1;
    }

  }


  const firstCheckPointDate = new Date(now);
  firstCheckPointDate.setDate($days)
  firstCheckPointDate.setHours($hours,$minutes,0)

  const gap = (firstCheckPointDate.getTime() - now.getTime())/1000;


  let duration = 0;
  let placeName = "";

  const HALF_HOUR = 30*60;

  const $checkPoints:TCheckPoint[] = [];

  for(let i=0;i<newVal.length;i++){
    const step = newVal[i];
    duration+= +newVal[i].extensions.duration;

    // placeName = step.name || placeName;
    placeName = step.name || "No name";

    if(Math.round(duration) >= gap && !$checkPoints.length){

      duration = duration - gap;
      $checkPoints.push({
        name: placeName,
        lon: step.lon,
        lat: step.lat,
        date : firstCheckPointDate
      });
    }

    else {
      if (Math.round(duration) >= HALF_HOUR) {

        duration = duration - HALF_HOUR;

        const lastDate = $checkPoints[$checkPoints.length - 1].date;

        $checkPoints.push({
          name: placeName,
          lon: step.lon,
          lat: step.lat,
          date : new Date(lastDate.setSeconds(lastDate.getSeconds() + HALF_HOUR))
        })
      }
    }
  }

  checkPoints.value = uniqby($checkPoints,item=>item.date.getTime());
})

watch(()=>checkPoints.value,async()=>{


  const results:TMeteoResult[] = (await Promise.all(checkPoints.value.map((point)=>fetchWeather(point.lon,point.lat,point.date)))) as unknown as TMeteoResult[]

  entries.value = results.map((result,i)=>{
    const index = result.minutely15.time[0].getMinutes() % 2 === 0 ? 0 : 1;
    return {
      time: result.minutely15.time[index],
      temperature2m: Math.round(result.minutely15.temperature2m[index]),
      weatherCode: result.minutely15.weatherCode[index],
      name:checkPoints.value[i].name
    }
  })

})

</script>

<template>
<fieldset class="wrapper">
  <legend>Meteo:</legend>
  <table border="1" v-if="entries.length">
    <tr v-for="(entry,index) in entries" :key="`entry${index}`">
      <td>
        <img src="/marker/pin.png" style="width:40px;"/>
      </td>
      <td style="font-weight: bold;padding:2px 0">
        {{entry.name}}
      </td>
      <td>
        <img src="/watch.png" style="width:40px;"/>
      </td>
      <td>
        {{`${entry.time.getHours()}`.padStart(2,"0")}} : {{`${entry.time.getMinutes()}`.padStart(2,"0")}}
      </td>
      <td>
        <img :src="`https://worldweather.wmo.int/images/${entry.weatherCode}.png`" style="width:40px;" />
      </td>
      <td>
        {{entry.temperature2m}}°C
      </td>
    </tr>
  </table>
</fieldset>
</template>

<style scoped>
fieldset {
  border: 2px solid #333;
  border-radius: 4px;
  margin: 0;
  legend{
    font-weight: bold;
    padding:2px 8px;
    margin:0;
  }
}
</style>
