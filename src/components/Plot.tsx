import { ImageTimeSeries, MonitoringArea } from '@/models/monitoring-area.model'
import * as ss from 'simple-statistics'
import React from 'react'
import {
	Area,
	Bar,
	ComposedChart,
	CartesianGrid,
	Legend,
	Line,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts'
import { HistoricalWeatherData } from '@/models/weather.model'
import { formatKey } from '@/functions/functions'

interface PlotData {
	date?: string
	cover?: number
	forest?: number
	extension?: number
}

type GeoJsonData = GeoJSON.Feature<
	GeoJSON.Geometry,
	GeoJSON.GeoJsonProperties
> & {
	properties: {
		ndvi: string
		rgb: string
	} & MonitoringArea
}

type Props = {
	changeIsPlot: string
	geoJson: GeoJsonData | null
	historicalWeather: HistoricalWeatherData | null | any
}

export function Plot(props: Props) {
	const { changeIsPlot, geoJson, historicalWeather } = props
	let data

	if (geoJson?.properties.imageTimeSeries && changeIsPlot === 'extension') {
		data = reformatData(
			geoJson.properties.imageTimeSeries,
			geoJson.properties.extension
		)
	} else {
		data = getWeatherValueByField(historicalWeather, changeIsPlot)
	}

	return (
		<>
			<ComposedChart width={620} height={250} data={data}>
				<CartesianGrid stroke='#f5f5f5' />
				<XAxis
					dataKey='date'
					angle={-20}
					fontSize={8}
					tickMargin={14}
					scale='band'
				/>
				<YAxis
					fontSize={8}
					label={{
						value: formatKey(changeIsPlot),
						angle: -90,
						position: 'insideLeft',
						offset: 0
					}}
				/>
				<Tooltip />
				<Legend verticalAlign='top' height={36} />
				{/* <Area type='monotone' dataKey='amt' fill='#8884d8' stroke='#8884d8' /> */}
				<Bar dataKey='cover' barSize={20} fill='#413ea0' />
				<Line type='monotone' dataKey='forest' stroke='#FFBB28' />
				<Line type='monotone' dataKey='extension' stroke='#82ca9d' />
			</ComposedChart>
		</>
	)
}

function reformatData(
	imageTimeSeries: ImageTimeSeries,
	extension: string
): PlotData[] {
	const { detectionDate, forestCoverExtension } = imageTimeSeries

	return detectionDate.map((date: string, index: number) => ({
		date: date.replace(/-LC0\d/g, ''),
		cover: parseFloat(forestCoverExtension[index]),
		forest: parseFloat(forestCoverExtension[index]),
		extension: parseFloat(extension)
	}))
}

function getWeatherValueByField(
	data: HistoricalWeatherData,
	field: string
): PlotData[] {
	const weatherData = data.data.timelines[0].intervals
	const startTimeList: string[] = []
	const valuesList: number[] = []

	for (const interval of weatherData) {
		const startTime: string = interval.startTime
		const value: number | undefined =
			interval.values[field as keyof typeof interval.values]

		if (typeof value === 'number') {
			const date: Date = new Date(startTime)
			const formattedDate: string = `${date.getFullYear()}-${
				date.getMonth() + 1
			}-${date.getDate()}`

			startTimeList.push(formattedDate)
			valuesList.push(value)
		}
	}
	return startTimeList.map((time, index) => ({
		date: time,
		cover: valuesList[index],
		forest: valuesList[index]
	}))
}
