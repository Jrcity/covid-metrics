/** @format */

import { Dispatch } from 'redux';
import { ICountryLists, ITransformedStats } from '../../pages/Home';
import { DarkMode, LightMode } from '../../static/theme';

export const LightModeAction = () => {
	return (dispatch: Dispatch) => {
		dispatch({
			type: 'LIGHT_MODE',
			payload: LightMode,
		});
	};
};

export const DarkModeAction = () => {
	return (dispatch: Dispatch) => {
		dispatch({
			type: 'DARK_MODE',
			payload: DarkMode,
		});
	};
};

export const AllData = (payload: ITransformedStats) => {
	return (dispatch: Dispatch) => {
		dispatch({
			type: 'ALL_DATA',
			payload,
		});
	};
};

export const CountryData = (payload: ITransformedStats) => {
	return (dispatch: Dispatch) => {
		dispatch({
			type: 'COUNTRY_DATA',
			payload,
		});
	};
};
export const CountryLists = (payload: ICountryLists) => {
	return (dispatch: Dispatch) => {
		dispatch({
			type: 'COUNTRY_LISTS',
			payload,
		});
	};
};
export const SelectedCountry = (payload: string) => {
	return (dispatch: Dispatch) => {
		dispatch({
			type: 'SELECTED_COUNTRY',
			payload,
		});
	};
};
