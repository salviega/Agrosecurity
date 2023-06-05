import style from '../styles/Map.module.css'

import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON, useMapEvents } from 'react-leaflet'
import { Footprint, MonitoringArea } from '@/models/monitoring-area.model'
import { DrawControl } from './DrawControl'

interface Country {
	name: string
	flag: string
}

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
import { BIOrbit } from '../../@types/typechain-types'
import countriesJson from '../assets/json/countries.json'

import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure
} from '@chakra-ui/react'
import { StatsModal } from './StatsModal'

type Props = {
	biorbitContract: BIOrbit | null
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
		biorbitContract,
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
	const [layerName, setLayerName] = useState<string>('Transparent')

	const { isOpen, onOpen, onClose } = useDisclosure()

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
						geoJsonLayer.bindPopup(`
            <p>${geoJsonObject.properties.name} ${getCountryFlag(
							geoJsonObject.properties.country
						)} </p>
            <button class="${style['chakra-button']} ${
							style['chakra-button-xs']
						} ${
							style['chakra-button-blue']
						}" onclick="window.dispatchEvent(new CustomEvent('popupButtonClick'))" >View</button>
          `)
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
					...project,
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
							return
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
							return
						}
					}
				}
			)
		}
	}, [selectedId])

	useEffect(() => {
		const handlePopupButtonClick = () => onOpen()

		window.addEventListener('popupButtonClick', handlePopupButtonClick)

		return () => {
			window.removeEventListener('popupButtonClick', handlePopupButtonClick)
		}
	}, [onOpen])

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
			<StatsModal
				biorbitContract={biorbitContract}
				isOpen={isOpen}
				onOpen={onOpen}
				onClose={onClose}
			/>
		</MapContainer>
	)
}

function getCountryFlag(countryName: string): string {
	const countriesData = countriesJson
	const country = countriesData.countries.find(
		country => country.name.toLowerCase() === countryName.toLowerCase()
	)

	return country ? country.flag : 'Country not found'
}
