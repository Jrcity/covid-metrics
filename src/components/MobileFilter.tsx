/** @format */

import {
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
} from '@mui/material';
import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { ICountryLists } from '../pages/Home';

const FilterBox = styled(Paper)((props) => ({
	background: props.theme.shadows + '!important',
	position: 'absolute',
	padding: 10,
	flex: 1,
	width: '100vw',
	zIndex: 2,
}));

type TProps = {
	selectionValue: string;
	handleSelection: (event: SelectChangeEvent) => void;
	handleCountrySelection: (event: SelectChangeEvent) => void;
	country: string;
	countries: ICountryLists[];
};

function MobileFilter({
	selectionValue,
	handleSelection,
	country,
	countries,
	handleCountrySelection,
}: TProps) {
	return (
		<FilterBox sx={{ display: { md: 'none' } }}>
			<FormControl>
				<InputLabel>Filter Stats</InputLabel>
				<Select
					value={selectionValue}
					onChange={handleSelection}
					label='Filter Stats'
					sx={{ width: 120 }}>
					<MenuItem value='all'>All Stats</MenuItem>
					<MenuItem value='countries'>Countries</MenuItem>
				</Select>
			</FormControl>
			<FormControl
				sx={{ marginLeft: 2 }}
				disabled={selectionValue !== 'countries' ? true : false}>
				<InputLabel>Select Country</InputLabel>

				<Select
					value={country}
					onChange={handleCountrySelection}
					label='Filter Stats'
					sx={{ width: 120 }}>
					<MenuItem value=''>
						<b>
							<i></i>
						</b>
					</MenuItem>
					{/* country list */}
					{countries?.map(({ Country, ThreeLetterSymbol }) => (
						<MenuItem key={ThreeLetterSymbol} value={Country}>
							{Country}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</FilterBox>
	);
}

export default MobileFilter;
