import { fetchWeatherApi } from 'openmeteo'

export const fetchWeather = async (lon: string, lat: string, date: Date = new Date()) => {
  const startDate = date
  const endDate = new Date(date)
  endDate.setHours(endDate.getHours() + 1)

  const params = {
    latitude: lat || 52.52,
    longitude: lon || 13.41,
    minutely_15: ['temperature_2m', 'weather_code'],
    timezone: 'auto',
    // "past_minutely_15": 7,

    // "current": "temperature_2m",
    start_minutely_15: startDate.toISOString().split(':').slice(0, -1).join(':'),
    end_minutely_15: endDate.toISOString().split(':').slice(0, -1).join(':'),
    // "forecast_minutely_15": 2,
  }
  const url = 'https://api.open-meteo.com/v1/forecast'
  const responses = await fetchWeatherApi(url, params)

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0]

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds()
  // const timezone = response.timezone();
  // const timezoneAbbreviation = response.timezoneAbbreviation();
  // const latitude = response.latitude();
  // const longitude = response.longitude();

  const minutely15 = response.minutely15()!

  // Note: The order of weather variables in the URL query and the indices below need to match!
  return {
    minutely15: {
      time: [
        ...Array(
          (Number(minutely15.timeEnd()) - Number(minutely15.time())) / minutely15.interval(),
        ),
      ].map(
        (_, i) =>
          new Date(
            (Number(minutely15.time()) + i * minutely15.interval() + utcOffsetSeconds) * 1000,
          ),
      ),
      temperature2m: minutely15.variables(0)!.valuesArray()!,
      weatherCode: minutely15.variables(1)!.valuesArray()!,
    },
  }
}
