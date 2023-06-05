import style from '../styles/Map.module.css'
import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON, useMapEvents } from 'react-leaflet'
import { Footprint, MonitoringArea } from '@/models/monitoring-area.model'
import { DrawControl } from './DrawControl'

import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet-measure'
import 'leaflet-measure/dist/leaflet-measure.js'
import 'leaflet-measure/dist/leaflet-measure.css'
import LayerOptions from './LayerOptions'
import { Feature, GeoJsonProperties, Geometry } from 'geojson'
import { useAccount } from 'wagmi'

type Props = {
	handleSelect: React.Dispatch<React.SetStateAction<number | null>>
	polygonRef: React.MutableRefObject<L.FeatureGroup | null>
	projects: MonitoringArea[]
	projectsNotOwned: MonitoringArea[]
	selectedId: number | null
	setSelectedId: React.Dispatch<React.SetStateAction<number | null>>
	setCoordinates: React.Dispatch<React.SetStateAction<number[][]>>
	showDrawControl: boolean
}

export default function Map(props: Props) {
	const {
		handleSelect,
		polygonRef,
		projects,
		projectsNotOwned,
		selectedId,
		setCoordinates,
		setSelectedId,
		showDrawControl
	} = props

	const mapRef = useRef<L.Map | null>(null)

	const [geoJsonData, setGeoJsonData] = useState<
		GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>[]
	>([])

	const [geoJsonDataNotOwned, setGeoJsonDataNotOwned] = useState<
		GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>[]
	>([])

	const [geoJsonProject, setGeoJsonProject] = useState<Feature<
		Geometry,
		GeoJsonProperties
	> | null>(null)

	const [isHidden, setIsHidden] = useState<boolean>(true)
	const [layerName, setLayerName] = useState<string>('NDVI')

	const { address } = useAccount()

	// Define layer name options
	let layerNames = [
		{ label: 'Transparent', name: 'Transparent' },
		{ label: 'RGB', name: 'RGB' },
		{ label: 'NDVI', name: 'NDVI' }
	]

	const centerMap = (geoLayer: L.GeoJSON<any, Geometry>) => {
		if (mapRef.current) {
			const bounds = geoLayer.getBounds()
			mapRef.current.fitBounds(bounds, {
				paddingTopLeft: [600, 0],
				maxZoom: 8
			})
		}
	}

	const onEachFeature = (feature: any, layer: L.Layer): void => {
		if (feature.geometry.type === 'Polygon') {
			layer.on('click', (): void => {
				const geoJsonLayer = layer as L.GeoJSON
				const geoJsonObject = geoJsonLayer.toGeoJSON()

				if (geoJsonObject.type === 'Feature') {
					setSelectedId(geoJsonObject.properties.id)
					if (geoJsonObject.properties.owner === address) {
						geoJsonLayer.bindPopup(
							`coordinates: <p>${JSON.stringify(geoJsonObject)}<p>`
						)
					} else {
						geoJsonLayer.bindPopup(`<p>Locked 🔒️<p>`)
					}
				}
			})
		}
	}

	useEffect(() => {
		let newGeoJsonData: GeoJSON.Feature<
			GeoJSON.Geometry,
			GeoJSON.GeoJsonProperties
		>[] = []

		let newGeoJsonDataNotOwned: GeoJSON.Feature<
			GeoJSON.Geometry,
			GeoJSON.GeoJsonProperties
		>[] = []

		for (let project of projects) {
			const geoJSON: GeoJSON.Feature<
				GeoJSON.Geometry,
				GeoJSON.GeoJsonProperties
			> = {
				type: 'Feature',
				geometry: {
					type: 'Polygon',
					coordinates: [
						project.footprint.map((footprint: Footprint) => [
							parseFloat(footprint.longitude),
							parseFloat(footprint.latitude)
						])
					]
				},
				properties: {
					id: project.id,
					owner: project.owner,
					ndvi: 'https://i5.walmartimages.com/asr/39eada0c-3501-44f0-b177-7c2ebabdda6d.b74931aade8174b928e6c8aa4129317c.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff',
					rgb: 'https://cdn-icons-png.flaticon.com/512/110/110686.png'
				}
			}

			newGeoJsonData.push(geoJSON)
		}

		for (let projectNotOwned of projectsNotOwned) {
			const geoJSON: GeoJSON.Feature<
				GeoJSON.Geometry,
				GeoJSON.GeoJsonProperties
			> = {
				type: 'Feature',
				geometry: {
					type: 'Polygon',
					coordinates: [
						projectNotOwned.footprint.map((footprint: Footprint) => [
							parseFloat(footprint.longitude),
							parseFloat(footprint.latitude)
						])
					]
				},
				properties: {
					id: projectNotOwned.id,
					owner: projectNotOwned.owner
				}
			}

			newGeoJsonDataNotOwned.push(geoJSON)
		}

		setGeoJsonData(newGeoJsonData)
		setGeoJsonDataNotOwned(newGeoJsonDataNotOwned)
	}, [address, projects])

	useEffect(() => {
		if (selectedId) {
			geoJsonData.forEach(
				(geoJson: Feature<Geometry, GeoJsonProperties>): void => {
					if (geoJson.properties && geoJson.properties.id === selectedId) {
						const geoLayer = L.geoJSON(geoJson)
						if (geoLayer) {
							centerMap(geoLayer)
							setIsHidden(false)
							setGeoJsonProject(geoJson)
						}
					}
				}
			)
			geoJsonDataNotOwned.forEach(
				(geoJson: Feature<Geometry, GeoJsonProperties>): void => {
					if (geoJson.properties && geoJson.properties.id === selectedId) {
						const geoLayer = L.geoJSON(geoJson)
						if (geoLayer) {
							centerMap(geoLayer)
							setIsHidden(true)
						}
					}
				}
			)
		}
	}, [selectedId])

	return (
		<MapContainer
			ref={mapRef}
			className={style.map}
			center={[4.72366, -74.06286]}
			zoom={6}
			scrollWheelZoom={true}
		>
			<TileLayer
				attribution='&copy; "<a href="http:/google.com/maps">Google</a>"'
				url='https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}&s=Ga'
			/>
			<DrawControl
				polygonRef={polygonRef}
				setCoordinates={setCoordinates}
				showDrawControl={showDrawControl}
			/>
			{geoJsonData.map((data, index) => (
				<GeoJSON
					key={index}
					onEachFeature={onEachFeature}
					data={data}
					style={{
						fillOpacity: 0.01,
						weight: 2,
						color: 'yellow'
					}}
				/>
			))}
			{geoJsonDataNotOwned.map((data, index) => (
				<GeoJSON
					key={index}
					onEachFeature={onEachFeature}
					data={data}
					style={{
						fillOpacity: 0.01,
						weight: 2,
						color: 'red'
					}}
				/>
			))}
			{!isHidden && (
				<LayerOptions
					activeOption={layerName}
					geoJsonProject={geoJsonProject}
					mapRef={mapRef}
					options={layerNames}
					setOption={setLayerName}
					themeColor={'blue.500'}
				/>
			)}
		</MapContainer>
	)
}
