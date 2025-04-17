export type TItinerary = {
  startingPoint : {
    lat: number;
    lng: number;
  };
  destinationPoint : {
    lat: number;
    lng: number;
  }
}

export type TGeoJsonDirectionsResult = {
  routes : {
    segments : {
      distance : number;
      duration : number;
      steps : {
        distance : number;
        duration : number;
        instruction : string;
        name:string;
      }[]
    }[];
  }[];
}

export type TGpxDirectionsResult = {
  gpx : {
    rte: {
      rtept: {
        name: string;
        desc: string;
        lat: string;
        lon: string;
        extensions: {
          distance: number;
          duration: number;
        }
      }[];
    }
  }
}

export type TWeatherCheckPoint = {
  name : string;
  lon: string;
  lat:string;
}

export type TCheckPoint = {
  name: string,
  lon: string,
  lat: string,
  date : Date
}

export type TMeteoResult = {
  minutely15 : {
    temperature2m : number[];
    time : Date[];
    weatherCode : number[];
  }
}

export type TMeteoEntry = {
  time : Date;
  temperature2m : number;
  weatherCode : number;
  name:string;
}
