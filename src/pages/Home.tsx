/** @format */

import styled from 'styled-components';
import {
	Button,
	List,
	ListItem,
	Paper,
	SelectChangeEvent,
	Card,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { ResponsiveChoropleth } from '@nivo/geo';
import { features } from '../static/world_countries.json';

import { All_Stats, getCountries } from '../apis';
import AllStatsTable from '../components/Tables/AllStatsTable';
import { Box } from '@mui/system';
import MobileFilter from '../components/MobileFilter';

export const SCPaper = styled(Paper)`
	background: ${(props: string | any) => props.theme.background} !important;
	width: 100%;
	position: relative;
	display: flex;
	overflow: hidden !important;
	box-sizing: border-box;
	/* flex: 1; */
	& h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		color: ${(props) => props.theme.accent};
	}
`;

const SCFilterDx = styled(Paper)((props) => ({
	background: props.theme.shadows + '79 !important',
	flex: 0.2,
	height: '100vh',
	position: 'sticky',
	overflowY: 'scroll',
	borderRadius: 0 + '!important',
	zIndex: 2,
}));

export interface ICountryLists {
	Country: string;
	ThreeLetterSymbol: string;
}

interface IStats {
	Country: string;
	TotalCases: number;
	TotalRecovered: number;
	TotalDeaths: number;
	ActiveCases: number;
	NewCases: number;
	NewRecovered: number;
	NewDeaths: number;
}
interface ITransformedStats {
	rank: number;
	Country: string;
	TotalCases: number;
	TotalRecovered: number;
	TotalDeaths: number;
	ActiveCases: number;
	NewCases: number;
	NewRecovered: number;
	NewDeaths: number;
}
export default function Home(props: any) {
	const { theme } = useSelector((state: any) => state.theme);
	const [selectionValue, setSelectionValue] = useState<string>('');
	const [country, setCountry] = useState<string>('');
	const [countries, setCountries] = useState<ICountryLists[]>([]);
	const [stats, setStats] = useState<IStats[]>([]);

	useEffect(() => {
		(async () => {
			let countries = await getCountries();
			let stats = await All_Stats();
			setCountries(countries);
			setStats(stats);
		})();
	}, []);

	function handleSelection(event: SelectChangeEvent) {
		setSelectionValue(event.target.value);
	}

	function handleCountrySelection(event: SelectChangeEvent) {
		setCountry(event.target.value);
	}

	const transformedStats: readonly ITransformedStats[] = stats.map(
		(item: IStats, idx: number) => ({
			rank: idx + 1,
			...item,
		})
	);

	return (
		<SCPaper sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
			<MobileFilter
				selectionValue={selectionValue}
				country={country}
				countries={countries}
				handleCountrySelection={handleCountrySelection}
				handleSelection={handleSelection}
			/>

			<SCFilterDx sx={{ display: { xs: 'none', md: 'block' } }}>
				<List>
					<ListItem>
						<Button onClick={() => setSelectionValue('')}>All Countries</Button>
					</ListItem>
					{countries.map(({ Country, ThreeLetterSymbol }: ICountryLists) => (
						<ListItem sx={{ flex: 1 }} key={ThreeLetterSymbol}>
							<Button sx={{ width: '100%', textAlign: 'left' }}>
								{Country}
							</Button>
						</ListItem>
					))}
				</List>
			</SCFilterDx>
			{selectionValue === 'countries' ? null : (
				<Card
					sx={{
						background: theme.background,
						flex: { xs: 1, md: 0.8 },
						height: { xs: '100vh' },
						overflowY: { xs: 'scroll' },
						width: '100%',
						zIndex: 2,
						position: { xs: 'sticky' },
					}}>
					<Box sx={{ height: { xs: 700, md: '70vh' } }}>
						<World data={stats} color={theme.accent} />
					</Box>

					<AllStatsTable rows={transformedStats} />
				</Card>
			)}
		</SCPaper>
	);
}

type TData = {
	data: any[];
	color: string;
};

function World({ data, color }: TData) {
	let countries = data.map((item: any) => ({
		id: item.ThreeLetterSymbol.toUpperCase(),
		value: item.TotalCases,
	}));

	return (
		<ResponsiveChoropleth
			data={countries}
			features={features}
			margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
			colors='YlOrBr'
			domain={[0, 1500000]}
			unknownColor='#666666'
			label='properties.name'
			valueFormat='.2s'
			projectionType='equirectangular'
			projectionTranslation={[0.5, 0.5]}
			projectionRotation={[0, 0, 0]}
			projectionScale={100}
			graticuleLineColor={color}
			borderWidth={0.5}
			borderColor='#152538'
			legends={[
				{
					anchor: 'bottom-right',
					direction: 'column',
					translateX: -40,
					translateY: -10,
					itemsSpacing: 0,
					itemWidth: 80,
					itemHeight: 18,
					itemTextColor: color,
					itemOpacity: 0.85,
					symbolSize: 18,
					effects: [
						{
							on: 'hover',
							style: {
								itemTextColor: '#000000',
								itemOpacity: 1,
							},
						},
					],
				},
			]}
		/>
	);
}
