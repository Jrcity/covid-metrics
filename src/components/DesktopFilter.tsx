/** @format */

import { Button, List, ListItem, SelectChangeEvent } from '@mui/material';
import styled from 'styled-components';
import { ICountryLists } from '../pages/Home';

const SCFilterDx = styled(List)((props) => ({
	background: props.theme.secondary + '79 !important',
	flex: 0.2,
	height: '100vh',
	position: 'sticky',
	overflowY: 'scroll',
	borderRadius: 0 + '!important',
	zIndex: 2,

	alignItems: 'start !important',
}));

const ListButton = styled(Button)`
	color: ${(props) => props.theme.accent} !important;
	& MuiButton-root {
		justify-content: left !important;
		align-items: flex-start;
		width: 100% !important;
		color: ${(props) => props.theme.accent} !important;
	}
`;

type TProps = {
	selectionValue: string | undefined;
	handleSelection: (event: SelectChangeEvent) => void;
	handleCountrySelection: (event: SelectChangeEvent) => void;
	country: string | undefined;
	countries: ICountryLists[] | undefined;
};

export default function DesktopFilter({
	country,
	countries,
	selectionValue,
	handleSelection,
	handleCountrySelection,
}: TProps) {
	return (
		<SCFilterDx sx={{ display: { xs: 'none', md: 'block' } }}>
			<ListItem>
				<ListButton onClick={() => handleSelection}>All Countries</ListButton>
			</ListItem>
			{countries?.map(({ Country }: ICountryLists) => (
				<ListItem sx={{ flex: 1 }} key={Country}>
					<ListButton>{Country}</ListButton>
				</ListItem>
			))}
		</SCFilterDx>
	);
}
