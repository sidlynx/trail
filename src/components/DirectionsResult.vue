<script setup lang="ts">


import type { TGeoJsonDirectionsResult } from '@/types.ts'
import { computed } from 'vue'

const props = defineProps<{
  result:TGeoJsonDirectionsResult
}>();

const totalDuration = computed(()=>props.result.routes.map(route=>route.segments).flat().reduce((acc,segment)=>acc + segment.duration,0));
const totalDistance = computed(()=>props.result.routes.map(route=>route.segments).flat().reduce((acc,segment)=>acc + segment.distance,0));
</script>

<template>
<div class="wrapper">
  <fieldset style="margin:0;padding:0">
    <legend>Intinéraire en détails:</legend>
    <div>
      <div>Durée: {{totalDuration}} s</div>
      <div>Distance: {{totalDistance}} m</div>
    </div>
    <ul class="routes">
      <li v-for="(route,routeIndex) in props.result?.routes" :key="`route-${routeIndex}`" class="route">
        <ul class="segments">
          <li v-for="(segment,segmentIndex) in route.segments" :key="`route-${segmentIndex}`" class="segment">
            <ol class="steps">
              <li v-for="(step,stepIndex) in segment.steps" :key="`route-${stepIndex}`" class="step">
                <div class="name">{{step.name}}</div>
                <div  class="details">
                  <div class="instruction">{{step.instruction}}</div>
                  <div class="distance">{{step.distance}} m</div>
                  <div class="duration">{{step.duration}} s</div>
                </div>
              </li>
            </ol>
          </li>
        </ul>
      </li>
    </ul>
  </fieldset>
</div>
</template>

<style scoped>
.wrapper {
  margin:4px;
  fieldset {
    border: 2px solid #333;
    border-radius: 4px;
    padding: 100px;
    margin: 0;
    legend{
      font-weight: bold;
      padding:2px 8px;
      margin:0;
    }
    .routes {
      margin-top: 16px;
      list-style: none;
      padding: 0;
      .route {
        .segments {
          list-style: none;
          margin: 0;
          padding: 0;
          .segment{
            .steps  {
              margin:0;
              padding: 0 6px 0 30px;
              display:flex;
              flex-direction: column;
              gap:18px;
              .step {
                border-bottom: 2px solid green;
                padding-bottom: 4px;
                .name{
                  font-weight: bold;
                  font-size:16px;
                }
                .details {
                  margin-top:4px;
                  display: flex;
                  .instruction {
                    flex-basis: 100%;
                  }
                  .distance {
                    flex-basis: 100px;
                  }
                  .duration {
                    flex-basis: 100px;
                  }
                }
                &:before{
                  color:red;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
