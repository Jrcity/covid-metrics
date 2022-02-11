/** @format */

import { ICountryLists, ITransformedStats } from '../../pages/Home';

interface IStatsReducer {
	allCountriesData: ITransformedStats[] | undefined;
	countryData: ITransformedStats[] | undefined;
	countryLists: ICountryLists[] | undefined;
	selectedCountry: string | undefined;
}

const initialState: IStatsReducer = {
	allCountriesData: undefined,
	countryData: undefined,
	countryLists: undefined,
	selectedCountry: undefined,
};

export default function statsReducer(state = initialState, action: any) {
	// console.log(state);
	switch (action.type) {
		case 'ALL_DATA':
			return (state = { ...state, allCountriesData: action.payload });
		case ' COUNTRY_DATA':
			return (state = { ...state, countryData: action.payload });
		case 'COUNTRY_LISTS':
			return (state = { ...state, countryLists: action.payload });
		case 'SELECTED_COUNTRY':
			return (state = { ...state, selectedCountry: action.payload });

		default:
			return state;
	}
}
