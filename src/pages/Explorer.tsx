import Menu from '@/components/Menu'
import Wallet from '@/components/Wallet'
import { MonitoringArea } from '@/models/monitoring-area.model'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'

const MapWithNoSSR = dynamic(() => import('../components/Map'), { ssr: false })

export default function Explorer(): JSX.Element {
	const [showDrawControl, setShowDrawControl] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [page, setPage] = useState<number>(0)
	const [projects, setProjects] = useState<MonitoringArea[]>([])
	const [selectedId, setSelectedId] = useState(null) // lack typo
	const [total, setTotal] = useState<number>(0)

	const pageSize: number = 50 // date hardcored

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(true)
			setTotal(monitoringAreas.length ? monitoringAreas.length : 0) //setTotal(searchResults.length ? searchResults[0].total : 0)
			setProjects(monitoringAreas)
			setSelectedId(null)
			setIsLoading(false)
		}, 3000)
	}, [page])

	return (
		<>
			<Wallet />
			<Menu
				isLoading={isLoading}
				handlePage={setPage}
				handleSelect={setSelectedId}
				page={page}
				pageSize={pageSize}
				projects={projects}
				selectedId={selectedId}
				setShowDrawControl={setShowDrawControl}
				total={total}
			/>
			<MapWithNoSSR showDrawControl={showDrawControl} />
		</>
	)
}

const monitoringAreas: MonitoringArea[] = [
	{
		id: 0,
		name: 'Parque Selva de Florencia',
		extension: 500,
		description:
			'bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla',
		state: 'active',
		registry: 'Opensea',
		country: 'Colombia',
		owner: '0xE8e1543235e6C35C656ef0b28526C61571583f4B',
		url: 'www'
	},
	{
		id: 1,
		name: 'Parque Selva de Florencia',
		extension: 500,
		description:
			'bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla',
		state: 'monitor',
		registry: 'Opensea',
		country: 'Colombia',
		owner: '0xE8e1543235e6C35C656ef0b28526C61571583f4B',
		url: 'www'
	},
	{
		id: 2,
		name: 'Parque Selva de Florencia',
		extension: 500,
		description:
			'bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla',
		state: 'paused',
		registry: 'Opensea',
		country: 'Colombia',
		owner: '0xE8e1543235e6C35C656ef0b28526C61571583f4B',
		url: 'www'
	},
	{
		id: 3,
		name: 'Parque Selva de Florencia',
		extension: 500,
		description:
			'bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla, bla',
		state: 'inactive',
		registry: 'Opensea',
		country: 'Colombia',
		owner: '0xE8e1543235e6C35C656ef0b28526C61571583f4B',
		url: 'www'
	}
]
