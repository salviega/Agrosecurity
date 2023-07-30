export interface HistoricalWeatherData {
	data: {
		timelines: {
			timestep: string
			endTime: string
			startTime: string
			intervals: {
				startTime: string
				values: {
					cloudCover?: number
					dewPoint?: number
					humidity?: number
					pressureSurfaceLevel?: number
					temperature?: number
					windDirection?: number
					windGust?: number
					windSpeed?: number
				}
			}[]
		}[]
	}
}

export interface WeatherData {
	time: string
	values: {
		cloudBase?: number
		cloudCeiling?: number
		cloudCover?: number
		dewPoint?: number
		freezingRainIntensity?: number
		humidity?: number
		precipitationProbability?: number
		pressureSurfaceLevel?: number
		rainIntensity?: number
		sleetIntensity?: number
		snowIntensity?: number
		temperature?: number
		temperatureApparent?: number
		uvHealthConcern?: number
		uvIndex?: number
		visibility?: number
		weatherCode?: number
		windDirection?: number
		windGust?: number
		windSpeed?: number
	}
}

export interface Location {
	lat: number
	lon: number
}

export interface Weather {
	data: WeatherData
	location: Location
}

export interface WeatherVariableDescription {
	[key: string]: string
}
