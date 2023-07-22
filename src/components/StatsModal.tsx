import {
	Box,
	Button,
	Heading,
	Link,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spacer,
	Table,
	TableContainer,
	Tbody,
	Td,
	Tr,
	Text,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverArrow,
	PopoverCloseButton,
	PopoverBody
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon, InfoIcon } from '@chakra-ui/icons'

import Blockies from 'react-blockies'
import { BIOrbit } from '../../@types/typechain-types'
import {
	Footprint,
	MonitoringArea,
	RentInfo
} from '@/models/monitoring-area.model'
import { useAccount } from 'wagmi'
import { Plot } from './Plot'
import { useEffect, useState } from 'react'
import weatherData from '../assets/json/data.json'
import { Weather } from '@/models/weather.model'

interface Coordinates {
	latitude: string
	longitude: string
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
	biorbitContract: BIOrbit | null
	isOpen: boolean
	geoJson: GeoJsonData | null
	onOpen: () => void
	onClose: () => void
}

export function StatsModal(props: Props) {
	const { biorbitContract, isOpen, geoJson, onOpen, onClose } = props

	const { address } = useAccount()

	const [weather, setWeather] = useState<Weather | null | any>(null)

	let coordinates: Coordinates | null = null

	if (geoJson?.properties.footprint) {
		coordinates = getLastCoordinates(geoJson.properties.footprint)
	}

	const getWeather = () => {
		console.log(weather)
	}

	useEffect(() => {
		setWeather(weatherData)
	}, [])

	return (
		<>
			<Modal onClose={onClose} size={'6xl'} isOpen={isOpen}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						{geoJson?.properties?.name}{' '}
						{geoJson?.properties?.owner === address && (
							<EditIcon
								color={'blue.700'}
								cursor={'pointer'}
								_hover={{ color: 'blue.400' }}
							/>
						)}
					</ModalHeader>
					<Text
						position={'absolute'}
						right={0}
						marginTop={4}
						marginRight={'60px'}
						fontSize={'xs'}
					>
						<Link
							marginRight={1}
							size='sm'
							href={geoJson?.properties?.uri}
							isExternal
						>
							Official Website
						</Link>
						{geoJson?.properties?.owner === address && (
							<EditIcon
								color={'blue.700'}
								cursor={'pointer'}
								_hover={{ color: 'blue.400' }}
							/>
						)}
					</Text>
					<ModalCloseButton />
					<ModalBody>
						<Text marginBottom={'32px'} fontSize={'xs'}>
							{geoJson?.properties?.description}{' '}
							{geoJson?.properties?.owner === address && (
								<EditIcon
									color={'blue.700'}
									cursor={'pointer'}
									_hover={{ color: 'blue.400' }}
								/>
							)}
						</Text>
						<Spacer />
						<Box
							marginBottom={'48px'}
							display={'flex'}
							alignItems={'center'}
							justifyContent={'space-around'}
						>
							<Text fontSize='xs'>
								<strong>extension</strong> {geoJson?.properties?.extension}{' '}
								hectareas
							</Text>
							<Text fontSize='xs'>
								<strong>Coordinates</strong>{' '}
								{coordinates &&
									`${coordinates.latitude} ${coordinates.longitude}`}
							</Text>
							<Text fontSize='xs'>
								<strong>Country</strong> {geoJson?.properties?.country}{' '}
								{geoJson?.properties?.owner === address && (
									<EditIcon
										color={'blue.700'}
										cursor={'pointer'}
										_hover={{ color: 'blue.400' }}
									/>
								)}
							</Text>
							<Text fontSize='xs'>
								<strong>Owner</strong> {geoJson?.properties?.owner}{' '}
							</Text>
						</Box>

						<Box
							padding={1}
							minW={'max-content'}
							display={'flex'}
							justifyContent={'space-around'}
							gap={1}
						>
							<Box>
								<TableContainer
									mt={2}
									overflow='hidden'
									height={270} // Adjust this value according to the height of a single row multiplied by 6
									overflowY='auto'
								>
									<Heading fontSize='lg' color='gray.700'>
										Weather data
									</Heading>
									<Spacer />
									<Table size='sm'>
										<Tbody>
											{weatherData?.data?.values &&
												Object.entries(weatherData.data.values).map(
													([key, value], index) => {
														return (
															<Tr key={index} width={'421.141px'}>
																<Td fontSize={'xs'} width={'421.141px'}>
																	{key}{' '}
																	<Popover placement='top-start'>
																		<PopoverTrigger>
																			<InfoIcon
																				w={2}
																				h={2}
																				color={'black.700'}
																				cursor={'pointer'}
																				_hover={{ color: 'black.400' }}
																			></InfoIcon>
																		</PopoverTrigger>
																		<PopoverContent w={400}>
																			<PopoverHeader fontWeight='semibold'>
																				{key}
																			</PopoverHeader>
																			<PopoverArrow />
																			<PopoverBody>
																				Lorem ipsum dolor sit amet, consectetur
																				adipisicing elit, sed do eiusmod tempor
																				incididunt ut labore et dolore.
																			</PopoverBody>
																		</PopoverContent>
																	</Popover>
																</Td>
																<Td fontSize={'xs'} textAlign={'right'}>
																	{value.toString()}
																</Td>
															</Tr>
														)
													}
												)}
										</Tbody>
									</Table>
								</TableContainer>
							</Box>
							<Box
								mt={2}
								display={'flex'}
								flexDir={'column'}
								justifyContent={'center'}
							>
								<Heading fontSize='lg' color='gray.700'>
									Cover Forest
								</Heading>
								<Plot geoJson={geoJson} />
							</Box>
						</Box>
						{geoJson?.properties?.owner === address && (
							<Box
								marginTop={'24px'}
								display={'flex'}
								flexDir={'column'}
								justifyItems={'left'}
								gap={3}
							>
								<Text position={'relative'} left={0} fontSize='xs'>
									<strong>Rent NFT:</strong> active{' '}
									<EditIcon
										color={'blue.700'}
										cursor={'pointer'}
										_hover={{ color: 'blue.400' }}
									/>
								</Text>
								<Text position={'relative'} left={0} fontSize='xs'>
									<strong>Burn NFT</strong>{' '}
									<DeleteIcon
										color={'red.700'}
										cursor={'pointer'}
										_hover={{ color: 'red.400' }}
									/>
								</Text>
							</Box>
						)}
					</ModalBody>
					<ModalFooter>
						<Button colorScheme='blue' onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

function getRow(index: number): JSX.Element[] {
	const returns: number = 5 - index
	const elements: JSX.Element[] = []

	if (returns === 5) {
		for (let i = 0; i < returns; i++) {
			elements.push(
				<>
					<Tr>
						<Td height={'48.5px'} fontSize={'xs'}></Td>
						<Td width={'389.141px'} fontSize={'xs'}>
							{''}
						</Td>
					</Tr>
				</>
			)
		}
	} else {
		for (let i = 0; i < returns; i++) {
			elements.push(
				<>
					<Tr>
						<Td height={'48.5px'} fontSize={'xs'}></Td>
						<Td fontSize={'xs'}>{''}</Td>
					</Tr>
				</>
			)
		}
	}

	return elements
}

function getLastCoordinates(footprint: Footprint[]): Coordinates {
	if (footprint.length === 0) {
		return { latitude: '0', longitude: '0' }
	}

	const lastFootprint = footprint[footprint.length - 1]
	return {
		latitude: lastFootprint.latitude,
		longitude: lastFootprint.longitude
	}
}
