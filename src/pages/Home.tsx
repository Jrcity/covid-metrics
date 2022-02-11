/** @format */

import styled from 'styled-components';
import { Box, Paper, SelectChangeEvent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Hypnosis } from 'react-cssfx-loading/lib';
import { bindActionCreators } from 'redux';

import AllStatsTable from '../components/Tables/AllStatsTable';
import MobileFilter from '../components/MobileFilter';
import WorldMap from '../components/WorldMap';
import DesktopFilter from '../components/DesktopFilter';

import { All_Stats, getCountries } from '../apis';
import { __ACTIONS__ } from '../redux';

export const SCPaper = styled(Paper)`
	background: ${(props: string | any) => props.theme.background} !important;
	width: 100%;
	/* height: 100% !important; */
	box-shadow: none !important;
	position: relative !important;
	display: flex;
	overflow: hidden !important;
	& h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		color: ${(props) => props.theme.accent};
	}
`;
export interface ICountryLists {
	Country: string;
	ThreeLetterSymbol?: string;
}

export interface ITransformedStats {
	Rank: number;
	Country: string;
	ThreeLetterSymbol: string;
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
	const [allData, setAllData] = useState<ITransformedStats[]>([]);

	const dispatch = useDispatch();
	const AC = bindActionCreators(__ACTIONS__, dispatch);

	const loadResource = () => {
		(async () => {
			let countries = await getCountries();
			let stats = await All_Stats();
			let transformedCountriesData = stats?.map(
				(items: ITransformedStats, idx: number) => ({
					...items,
					ThreeLetterSymbol: items.ThreeLetterSymbol.toUpperCase(),
					Rank: idx + 1,
				})
			);
			let countryLists = countries?.map((item: ICountryLists) => ({
				...item,
				ThreeLetterSymbol: item.ThreeLetterSymbol?.toUpperCase(),
			}));
			AC.AllData(transformedCountriesData);
			AC.CountryLists(countryLists);

			setAllData(transformedCountriesData);
			setCountries(countryLists);
		})();
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(loadResource, []);

	function handleSelection(event: SelectChangeEvent) {
		setSelectionValue(event.target.value);
	}

	function handleCountrySelection(event: SelectChangeEvent) {
		setCountry(event.target.value);
	}

	const Main = (): JSX.Element => {
		return (
			<>
				<MobileFilter
					key='mobile-filter'
					selectionValue={selectionValue}
					country={country}
					countries={countries}
					handleCountrySelection={handleCountrySelection}
					handleSelection={handleSelection}
				/>
				<DesktopFilter
					key='desktop-filter'
					handleSelection={handleSelection}
					handleCountrySelection={handleCountrySelection}
					selectionValue={selectionValue}
					country={country}
					countries={countries}
				/>
				<Box
					sx={{
						flex: { xs: 1, md: 0.8 },
						height: '100vh',
						overflowY: 'scroll',
					}}>
					<WorldMap allCountriesData={allData} />
					<AllStatsTable rows={allData} />
				</Box>
			</>
		);
	};

	return (
		<SCPaper sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
			{theme !== undefined ? (
				<Main />
			) : (
				<Hypnosis
					style={{
						position: 'fixed',
						top: 'calc(90% / 2)',
						left: 'calc(90%/2)',
						zIndex: 99,
					}}
					color={theme.link}
				/>
			)}
		</SCPaper>
	);
}
