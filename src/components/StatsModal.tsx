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
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Spacer,
	Spinner,
	Table,
	TableContainer,
	Tbody,
	Td,
	Tr,
	Text,
	Popover
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon, InfoIcon } from '@chakra-ui/icons'

import { BIOrbit } from '../../@types/typechain-types'
import { Footprint, MonitoringArea } from '@/models/monitoring-area.model'
import { useAccount } from 'wagmi'
import { Plot } from './Plot'
import { useEffect, useState } from 'react'
import { Weather, WeatherVariableDescription } from '@/models/weather.model'
import weatherData from '../assets/json/weatherData.json'
import weatherVariableDescriptionJson from '../assets/json/weather-variables-description.json'

const weatherVariableDescription: WeatherVariableDescription =
	weatherVariableDescriptionJson

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

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [weather, setWeather] = useState<Weather | null | any>(null)

	let coordinates: Coordinates | null = null

	if (geoJson?.properties.footprint) {
		coordinates = getLastCoordinates(geoJson.properties.footprint)
	}

	const getHistoriacalWeather = () => {
		setIsLoading(true)
		setTimeout(() => {
			console.log(weather)
			setIsLoading(false)
		}, 1000)
	}

	useEffect(() => {
		if (isOpen) {
			setIsLoading(true)
			setTimeout(() => {
				setWeather(weatherData)
				setIsLoading(false)
			}, 1000)
		} else {
			setWeather(null)
		}
	}, [isOpen])

	return (
		<>
			<Modal onClose={onClose} size={'6xl'} isOpen={isOpen}>
				<ModalOverlay />
				<ModalContent>
					{isLoading && weather === null ? (
						<Box
							width={'1152px'}
							height={'625.594px'}
							display='flex'
							alignItems='center'
							justifyContent='center'
						>
							<Spinner
								thickness='4px'
								speed='0.8s'
								emptyColor='gray.200'
								color='blue.600'
								size='xl'
							/>
						</Box>
					) : (
						<>
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
												Real Time Weather
											</Heading>
											<Spacer />
											<Table size='sm'>
												<Tbody>
													{weather?.data?.values &&
														Object.entries(weather.data.values).map(
															([key, value]: [string, any], index: number) => {
																return (
																	<Tr key={index}>
																		<Td
																			fontSize={'xs'}
																			width={'409.141px'}
																			display={'flex'}
																			alignItems={'center'}
																		>
																			<Text
																				_hover={{
																					textDecoration: 'underline',
																					color: 'blue.600',
																					cursor: 'pointer'
																				}}
																				onClick={getHistoriacalWeather}
																			>
																				{formatKey(key)}
																			</Text>
																			<Popover
																				placement='top-start'
																				trigger='hover'
																			>
																				<PopoverTrigger>
																					<InfoIcon
																						w={2}
																						h={2}
																						marginLeft={1}
																						color={'black.700'}
																						cursor={'pointer'}
																						_hover={{ color: 'black.400' }}
																					></InfoIcon>
																				</PopoverTrigger>
																				<PopoverContent>
																					<PopoverHeader fontWeight='semibold'>
																						{formatKey(key)}
																					</PopoverHeader>
																					<PopoverArrow />
																					<PopoverBody>
																						<Text
																							style={{ whiteSpace: 'pre-wrap' }}
																						>
																							{weatherVariableDescription[key]}
																						</Text>
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
											Historical Weather
										</Heading>
										{isLoading ? (
											<Box
												width={'620px'}
												height={'250px'}
												display='flex'
												alignItems='center'
												justifyContent='center'
											>
												<Spinner
													thickness='4px'
													speed='0.8s'
													emptyColor='gray.200'
													color='blue.600'
													size='xl'
												/>
											</Box>
										) : (
											<Plot geoJson={geoJson} />
										)}
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
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
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

function formatKey(key: string): string {
	let words: string[] = key.split(/(?=[A-Z])/) // This splits the string into words at each uppercase letter.
	return words
		.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ')
}
