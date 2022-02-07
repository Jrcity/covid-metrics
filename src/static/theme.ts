/** @format */

import { blue, blueGrey, common, grey, pink } from '@mui/material/colors';

interface colorScheme {
	accent: string;
	background: string;
	card: string;
	link: string;
	primary: string;
	secondary: string;
	shadows: string;
}

export const DarkMode: colorScheme = {
	accent: common.white,
	background: blueGrey[900],
	card: grey.A700,
	link: blue.A700,
	primary: blueGrey[100],
	secondary: grey[700],
	shadows: grey.A200,
};

export const LightMode: colorScheme = {
	accent: common.black,
	background: blue[50],
	card: grey.A700,
	link: pink.A700,
	primary: grey[700],
	secondary: blueGrey[200],
	shadows: blueGrey.A200,
};
