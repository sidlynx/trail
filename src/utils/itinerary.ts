import Openrouteservice from 'openrouteservice-js'
import type {
  TGeoJsonDirectionsResult,
  TGpxDirectionsResult,
  TItinerary
} from '@/types.ts'

import xml2json from '@hendt/xml2json';

import { ORS } from "@routingjs/ors"

export class Itinireray {
  readonly #apiKey : string;

  readonly #ors : ORS;

  readonly #orsDirections : Openrouteservice.Directions;

  constructor(apiKey:string){
    this.#apiKey = apiKey

    this.#orsDirections = new Openrouteservice.Directions({
      api_key: this.#apiKey
    })

    this.#ors = new ORS({apiKey : this.#apiKey})
  }

  get orsDirections(){
    return this.#orsDirections;
  }



  async loadGeoJsonDirections(itinerary:TItinerary,maxSpeed : number = 80):Promise<TGeoJsonDirectionsResult> {
    try {
      const json = await this.orsDirections.calculate({
        coordinates: [[itinerary.startingPoint.lng, itinerary.startingPoint.lat], [itinerary.destinationPoint.lng, itinerary.destinationPoint.lat]],
        profile: 'driving-car',
        // profile: 'foot-walking',
        extra_info: ['waytype', 'steepness'],
        // format: 'geojson',
        api_version: 'v2',
        geometry: true,
        maximum_speed: maxSpeed,
        language:"fr"
      })

      return json as TGeoJsonDirectionsResult;
      // const response = prettifyJson(json)
      // node.innerHTML = '<h3>Response</h3><p>' + response + '</p>'
    } catch (err) {
      console.error(err)
      throw(err)
    }
  }

  async loadGpxDirections(itinerary:TItinerary,maxSpeed : number = 80):Promise<TGpxDirectionsResult> {
    try {
      const xml = await this.orsDirections.calculate({
        coordinates: [[itinerary.startingPoint.lng, itinerary.startingPoint.lat], [itinerary.destinationPoint.lng, itinerary.destinationPoint.lat]],
        profile: 'driving-car',
        // profile: 'foot-walking',
        extra_info: ['waytype', 'steepness'],
        format:"gpx",
        api_version: 'v2',
        geometry: true,
        maximum_speed: maxSpeed,
        language:"fr"
      })


      return xml2json(xml) as TGpxDirectionsResult;
    } catch (err) {
      console.error(err)
      throw(err)
      // const response = prettifyJson(err)
      // node.innerHTML = '<h3>Error</h3><p>' + response + '</p>'
    }
  }

}
