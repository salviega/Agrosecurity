import logo from '@/assets/images/brand.svg'
import { SearchIcon } from '@chakra-ui/icons'
import {
	ErrorMessage,
	Field,
	FieldArray,
	Form,
	Formik,
	FieldArrayRenderProps,
	FormikHelpers,
	FormikProps,
	useFormikContext
} from 'formik'
import countriesJson from '../assets/json/countries.json'

import Image from 'next/image'
import {
	Box,
	Button,
	Center,
	Flex,
	FormControl,
	FormLabel,
	FormErrorMessage,
	InputGroup,
	InputRightElement,
	HStack,
	Radio,
	RadioGroup,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Textarea,
	Select,
	Spinner,
	Input,
	Table,
	Tbody,
	Tr,
	Td,
	TableContainer,
	Text
} from '@chakra-ui/react'
import { useAccount, useNetwork } from 'wagmi'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import * as L from 'leaflet'
import { Results } from './Results'
import { Monitoring, MonitoringArea } from '@/models/monitoring-area.model'
import { ResultsPagination } from './ResultsPagination'
import { useContractWrite } from 'wagmi'
import BIOrbitContractJson from '@/assets/contracts/BIOrbit.json'
import { ethers } from 'ethers'
import { BIOrbit } from '../../@types/typechain-types'
import { getRandomValues } from 'crypto'

type CoordinatesFieldArrayProps = {
	coordinates: number[][]
	push: FieldArrayRenderProps['push']
	form: FormikProps<any>
}

type Props = {
	biorbitContract: BIOrbit | null
	coordinates: number[][]
	filtedProjects: MonitoringArea[]
	isLoading: boolean
	handlePage: React.Dispatch<React.SetStateAction<number>>
	handleSelect: React.Dispatch<React.SetStateAction<number | null>>
	page: number
	pageSize: number
	polygonRef: React.MutableRefObject<L.FeatureGroup | null>
	projects: MonitoringArea[]
	projectsNotOwned: MonitoringArea[]
	selectedId: number | null
	setCoordinates: React.Dispatch<React.SetStateAction<number[][]>>
	setFiltedProjects: React.Dispatch<React.SetStateAction<MonitoringArea[]>>
	setIsHidden: React.Dispatch<React.SetStateAction<boolean>>
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
	setProjects: React.Dispatch<React.SetStateAction<MonitoringArea[]>>
	setShowDrawControl: React.Dispatch<React.SetStateAction<boolean>>
	setSincronized: React.Dispatch<React.SetStateAction<boolean>>
	setTotal: React.Dispatch<React.SetStateAction<number>>
	total: number
}

export default function Menu(props: Props): JSX.Element {
	const {
		biorbitContract,
		coordinates,
		filtedProjects,
		handlePage,
		handleSelect,
		isLoading,
		page,
		pageSize,
		polygonRef,
		projects,
		projectsNotOwned,
		selectedId,
		setCoordinates,
		setFiltedProjects,
		setShowDrawControl,
		setIsHidden,
		setIsLoading,
		setProjects,
		setSincronized,
		setTotal,
		total
	} = props

	const protectedAreasTabRef = useRef<HTMLButtonElement | null>(null)

	const [enableSearcher, setEnableSearcher] = useState<boolean>(true)
	const [extensionAreaOption, setExtensionAreaOption] =
		useState<string>('Polygon')
	const [extension, setExtension] = useState<string>('')
	const [value, setValue] = useState('')

	const { address } = useAccount()
	const { chain } = useNetwork()

	const onMonitorTab = (): void => {
		if (extensionAreaOption === 'Polygon') {
			setShowDrawControl(true)
		}
		setEnableSearcher(false)
	}

	const onProtectedAreasTab = (): void => {
		setShowDrawControl(false)
		setEnableSearcher(true)
	}

	const searchProject = (event: ChangeEvent<HTMLInputElement>): void => {
		const inputValue: string = event.target.value
		const filtered: MonitoringArea[] = projects.filter(
			(project: MonitoringArea) =>
				project.name.toLowerCase().includes(inputValue.toLowerCase())
		)

		if (filtered.length === 0) {
			setFiltedProjects([])
			setTotal(filtered.length)
			return
		}
		setFiltedProjects(filtered)
		setTotal(filtered.length)
	}

	function CoordinatesFieldArrayWrapper({
		coordinates
	}: {
		coordinates: number[][]
	}): JSX.Element {
		const formik = useFormikContext()

		return (
			<FieldArray name='coordinates'>
				{({ push }) => (
					<CoordinatesFieldArray
						coordinates={coordinates}
						push={push}
						form={formik}
					/>
				)}
			</FieldArray>
		)
	}

	const ErrorText: React.FunctionComponent<{ children?: React.ReactNode }> = ({
		children
	}): JSX.Element => (
		<Text className='error' marginBottom={4}>
			{children}
		</Text>
	)

	function CoordinatesFieldArray({
		coordinates,
		push,
		form
	}: CoordinatesFieldArrayProps): JSX.Element {
		useEffect(() => {
			if (coordinates.length !== 0) {
				let extension: string = calculateEarthPolygonArea(coordinates)
				extension = Math.floor(parseFloat(extension)).toLocaleString()
				setExtension(extension)
				form.setFieldValue('coordinates', coordinates)
			}
		}, [coordinates])

		return (
			<>
				{coordinates.length === 0 && (
					<>
						{form.setFieldError('coordinates', 'Coordinates are required')}

						<ErrorMessage name='coordinates'>
							{msg => (
								<ErrorText>
									<Box
										marginTop={'8px'}
										marginBottom={'16px'}
										height={'17px'}
										fontSize={'14px'}
										color={'#E53E3E'}
									>
										{msg}
									</Box>
								</ErrorText>
							)}
						</ErrorMessage>
					</>
				)}
			</>
		)
	}

	useEffect(() => {
		if (extensionAreaOption === 'Polygon') {
			setShowDrawControl(true)
		} else {
			setShowDrawControl(false)
			setCoordinates([])
			setShowDrawControl(false)
			if (polygonRef.current) {
				polygonRef.current.clearLayers()
			}
		}
	}, [extensionAreaOption])

	useEffect(() => {
		if (!address && protectedAreasTabRef.current) {
			protectedAreasTabRef.current.click()
		}

		if (extensionAreaOption === 'Polygon') {
			setShowDrawControl(false)
		}
	}, [address])

	return (
		<Flex
			width={'510px'}
			height={'94vh'}
			position='absolute'
			top={'3vh'}
			left={'60px'}
			zIndex={1000}
			backgroundColor={'white'}
			boxShadow='dark-lg'
			rounded={'sm'}
			borderStyle={'solid'}
			borderWidth={'1px'}
			borderColor={'gray.800'}
			direction={'column'}
			overflow={'hidden'}
		>
			<Center
				borderBottomColor={'gray.600'}
				borderBottomWidth={'1px'}
				borderBottomStyle={'solid'}
				p={2}
			>
				<Image src={logo} alt='logo' width={250} priority={true} />
			</Center>
			{isLoading ? (
				<Spinner
					margin={'auto'}
					thickness='4px'
					speed='0.8s'
					emptyColor='gray.200'
					color='blue.600'
					size='xl'
				/>
			) : (
				<Tabs>
					<Box
						display={'flex'}
						alignItems={'center'}
						justifyContent={'space-between'}
					>
						<TabList>
							<Tab ref={protectedAreasTabRef} onClick={onProtectedAreasTab}>
								Protected areas
							</Tab>
							{address && chain?.id === 80001 && (
								<Tab onClick={onMonitorTab}>{address && 'Monitor'}</Tab>
							)}
						</TabList>

						<Box>
							<InputGroup>
								<Input
									width={180}
									height={7}
									marginY={'8px'}
									marginX={'16px'}
									placeholder='Search'
									onChange={enableSearcher ? searchProject : () => {}}
								/>
								<InputRightElement paddingTop={1} paddingRight={5}>
									<SearchIcon
										w={4}
										h={4}
										color='black.600'
										cursor={'pointer'}
									/>
								</InputRightElement>
							</InputGroup>
						</Box>
					</Box>
					<TabPanels overflowY='auto' maxH='77.9vh'>
						<TabPanel padding={0}>
							<>
								{filtedProjects && (
									<Results
										biorbitContract={biorbitContract}
										handleSelect={handleSelect}
										isLoading={isLoading}
										projects={filtedProjects}
										projectsNotOwned={projectsNotOwned}
										selectedId={selectedId}
										setIsHidden={setIsHidden}
										setIsLoading={setIsLoading}
										setSincronized={setSincronized}
									/>
								)}
								{projects && projects.length > 0 && (
									<ResultsPagination
										page={page}
										pageSize={pageSize}
										total={total}
										projects={filtedProjects}
										handlePage={handlePage}
										isLoading={false}
										selectedId={selectedId}
									/>
								)}
							</>
						</TabPanel>
						<TabPanel>
							{address && (
								<Formik
									initialValues={{
										name: '',
										description: '',
										coordinates: [],
										country: '',
										isRent: ''
									}}
									onSubmit={(
										values: {
											name: string
											description: string
											coordinates: never[]
											country: string
											isRent: string
										},
										actions: FormikHelpers<{
											name: string
											description: string
											coordinates: never[]
											country: string
											isRent: string
										}>
									) => {
										if (coordinates.length !== 0) {
											setTimeout(async () => {
												setIsLoading(true)
												const extensionString: string =
													calculateEarthPolygonArea(coordinates)

												const footprint: string[][] =
													convertArrayToString(coordinates)

												if (biorbitContract) {
													try {
														const maticUSD: ethers.BigNumber =
															await biorbitContract.getLatestData()
														const rentCost: ethers.BigNumber =
															maticUSD.mul(extension)

														const mintTx: ethers.ContractTransaction =
															await biorbitContract.mintProject(
																ethers.utils.formatBytes32String(values.name),
																ethers.utils.formatBytes32String(
																	values.description
																),
																ethers.utils.formatBytes32String(
																	extensionString
																),
																footprint,
																ethers.utils.formatBytes32String(
																	values.country
																),
																values.isRent === 'Yes' ? true : false,
																{ gasLimit: 6000000, value: rentCost }
															)
														await mintTx.wait(1)
														setTimeout(() => {
															setSincronized(false)
														}, 1500)
													} catch (error) {
														console.error(error)
														setIsLoading(false)
													}
												}

												actions.setSubmitting(false)
												actions.resetForm()
												setShowDrawControl(false)
												if (polygonRef.current) {
													polygonRef.current.clearLayers()
												}
												setCoordinates([])
											}, 1000)
										} else {
											actions.setSubmitting(false)
										}
									}}
								>
									{props => (
										<Form>
											<Field name='name' validate={validateName}>
												{({ field, form }: any) => (
													<FormControl
														isInvalid={form.errors.name && form.touched.name}
													>
														<FormLabel fontSize={14}>Name</FormLabel>
														<Input
															{...field}
															fontSize={12}
															marginBottom={!form.errors.name && 4}
															placeholder='Yellowstone National Park'
														/>
														<FormErrorMessage
															marginBottom={form.errors.name && 4}
														>
															{form.errors.name}
														</FormErrorMessage>
													</FormControl>
												)}
											</Field>
											<Field name='description' validate={validateDescription}>
												{({ field, form }: any) => (
													<FormControl
														isInvalid={
															form.errors.description &&
															form.touched.description
														}
													>
														<FormLabel fontSize={14}>Description</FormLabel>
														<Textarea
															{...field}
															fontSize={12}
															marginBottom={!form.errors.description && 4}
															placeholder='Yellowstone National Park is a national park located...'
														/>
														<FormErrorMessage
															marginBottom={form.errors.description && 4}
														>
															{form.errors.description}
														</FormErrorMessage>
													</FormControl>
												)}
											</Field>
											<FormControl as='fieldset'>
												<FormLabel as='legend' fontSize={14}>
													Area extension
												</FormLabel>
												<RadioGroup
													marginBottom={4}
													onChange={setExtensionAreaOption}
													value={extensionAreaOption}
												>
													<HStack spacing='24px'>
														<Radio value='Polygon'>
															<Text fontSize={14}>Polygon</Text>
														</Radio>

														<Radio value='Coordinates'>
															<Text fontSize={14}>Coordinates</Text>
														</Radio>
													</HStack>
												</RadioGroup>
												{coordinates?.length !== 0 &&
													coordinates[0]?.length !== 0 && (
														<TableContainer mt={4} overflow='hidden'>
															<Table size='sm' marginBottom={4}>
																<Tbody>
																	{coordinates &&
																		coordinates.length !== 0 &&
																		coordinates.map(
																			(
																				coordinate: number[],
																				index: number
																			): JSX.Element => (
																				<Tr key={index}>
																					<Td
																						fontWeight={'bold'}
																						fontSize={'xs'}
																					>
																						{`${index + 1}. `}
																					</Td>
																					<Td display={'flex'} gap={3}>
																						<Text>{`Lat: ${coordinate[0]}`}</Text>
																						<Text>{`Lon: ${coordinate[1]}`}</Text>
																					</Td>
																				</Tr>
																			)
																		)}

																	<Tr>
																		<Td fontWeight={'bold'} fontSize={'xs'}>
																			Hectareas
																		</Td>
																		<Td fontSize={'xs'}>{extension}</Td>
																	</Tr>
																</Tbody>
															</Table>
														</TableContainer>
													)}
												<CoordinatesFieldArrayWrapper
													coordinates={coordinates}
												/>
											</FormControl>
											<Field name='isRent' validate={validateIsRent}>
												{({ field, form }: any) => (
													<FormControl
														as='fieldset'
														isInvalid={
															form.errors.isRent && form.touched.isRent
														}
													>
														<FormLabel as='legend' fontSize={14}>
															Rent
														</FormLabel>
														<RadioGroup
															{...field}
															marginBottom={!form.errors.isRent && 4}
															onChange={value =>
																form.setFieldValue('isRent', value)
															}
														>
															<HStack spacing='24px'>
																<Radio value='Yes'>
																	<Text fontSize={14}>Yes</Text>
																</Radio>
																<Radio value='No'>
																	<Text fontSize={14}>No</Text>
																</Radio>
															</HStack>
														</RadioGroup>
														<FormErrorMessage
															marginBottom={form.errors.isRent && 4}
														>
															{form.errors.isRent}
														</FormErrorMessage>
													</FormControl>
												)}
											</Field>

											<Field name='country' validate={validateCountry}>
												{({ field, form }: any) => (
													<FormControl
														isInvalid={
															form.errors.country && form.touched.country
														}
													>
														<FormLabel fontSize={14}>Country</FormLabel>
														<Select
															{...field}
															placeholder='Select country'
															fontSize={12}
															marginBottom={!form.errors.country && 4}
														>
															{countriesJson.countries.map(country => (
																<option key={country.name}>
																	{country.name}
																</option>
															))}
														</Select>
														<FormErrorMessage
															marginBottom={form.errors.country && 4}
														>
															{form.errors.country}
														</FormErrorMessage>
													</FormControl>
												)}
											</Field>

											<Button
												colorScheme='blue'
												isLoading={props.isSubmitting}
												type='submit'
											>
												Submit
											</Button>
										</Form>
									)}
								</Formik>
							)}
						</TabPanel>
					</TabPanels>
				</Tabs>
			)}
		</Flex>
	)
}

function validateName(value: string): string | undefined {
	let error: string | undefined
	if (!value) {
		error = 'Protected name is required'
	}
	return error
}

function validateDescription(value: string): string | undefined {
	let error: string | undefined
	if (!value) {
		error = 'Description is required'
	}
	return error
}

function validateCountry(value: string): string | undefined {
	let error: string | undefined
	if (!value) {
		error = 'Country is required'
	}
	return error
}

function validateIsRent(value: string): string | undefined {
	let error: string | undefined
	if (!value) {
		error = 'Option is required'
	}
	return error
}

function calculateEarthPolygonArea(coordinates: number[][]): string {
	const R: number = 6371 // Radius of the Earth in kilometers
	const degreeToRadian: number = Math.PI / 180 // Conversion factor for degrees to radians

	const points: number[][] = coordinates.map(coord => [
		coord[0] * degreeToRadian,
		coord[1] * degreeToRadian
	])

	let total: number = 0
	const len: number = points.length

	for (let i = 0; i < len; i++) {
		let p1: number[] = points[i]
		let p2: number[] = points[(i + 1) % len]

		total += (p2[1] - p1[1]) * (2 + Math.sin(p1[0]) + Math.sin(p2[0]))
	}

	const areaInSquareKilometers: number = Math.abs((total * R * R) / 2)
	const areaInHectares: number = areaInSquareKilometers * 100 // convert square kilometers to hectares

	return areaInHectares.toString() // round down to the nearest whole number
}

function convertArrayToString(arr: number[][]): string[][] {
	return arr.map(pair => pair.map(num => num.toString()))
}
