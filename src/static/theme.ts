/** @format */

import { blue, blueGrey, grey, pink } from '@mui/material/colors';

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
	accent: 'aqua',
	background: '#1d1d2a',
	card: grey.A700,
	link: pink.A100,
	primary: blueGrey[100],
	secondary: '#212529',
	shadows: blueGrey.A700,
};

export const LightMode: colorScheme = {
	accent: '#133154',
	background: '#dddddd',
	card: grey.A700,
	link: blue.A700,
	primary: grey[700],
	secondary: '#f7fafb',
	shadows: grey.A700,
};
