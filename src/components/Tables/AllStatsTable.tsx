/** @format */

import {
	Box,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
	useTheme,
} from '@mui/material';
import React from 'react';
import {
	FaArrowLeft,
	FaArrowRight,
	FaBackward,
	FaForward,
} from 'react-icons/fa';
import styled from 'styled-components';

const TablePaper = styled(Paper)`
	background: ${(props) => props.theme.background} !important;
`;
const SCTableHead = styled(TableHead)`
	background: ${(props) => props.theme.background} !important;
	color: ${(props) => props.theme.link} !important;
	& * {
		color: inherit !important;
	}
`;
const SCTableFooter = styled(TableFooter)`
	color: ${(props) => props.theme.link} !important;
	& * {
		color: inherit !important;
	}
`;
const RowItem = styled.th`
	color: ${(props) => props.theme.accent} !important;
	& > * {
		color: inherit !important;
	}
`;
interface ITablePagination {
	count: number;
	page: number;
	rowsPerPage: number;
	onPageChange: (
		event: React.MouseEvent<HTMLButtonElement>,
		nextPage: number
	) => void;
}
function TablePaginationActions(props: ITablePagination) {
	const theme = useTheme();
	const { count, page, rowsPerPage, onPageChange } = props;

	const handleFirstPageButtonClick = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label='first page'>
				{theme.direction === 'rtl' ? <FaForward /> : <FaBackward />}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label='previous page'>
				{theme.direction === 'rtl' ? <FaArrowRight /> : <FaArrowLeft />}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label='next page'>
				{theme.direction === 'rtl' ? <FaArrowLeft /> : <FaArrowRight />}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label='last page'>
				{theme.direction === 'rtl' ? <FaBackward /> : <FaForward />}
			</IconButton>
		</Box>
	);
}

export default function AllStatsTable({ rows }: any): JSX.Element {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0;

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	let newRows: any =
		rowsPerPage > 0
			? rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
			: rows;

	return (
		<TableContainer
			sx={{ position: 'sticky', paddingTop: 10, mt: 12 }}
			component={TablePaper}>
			<Table
				stickyHeader={true}
				sx={{ minWidth: 500 }}
				aria-label='custom pagination table'>
				<TableHead component={SCTableHead}>
					<TableRow>
						<TableCell>Ranks</TableCell>
						<TableCell>Country</TableCell>
						<TableCell>Total Cases</TableCell>
						<TableCell>Total Recoveries</TableCell>
						<TableCell>Total Deaths</TableCell>
						<TableCell>Active Cases</TableCell>
						<TableCell>New Cases</TableCell>
						<TableCell>New Recoveries</TableCell>
						<TableCell>New Deaths</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{newRows?.map((row: any) => (
						<TableRow component={RowItem} hover key={row.Rank}>
							<TableCell scope='row'>{row.Rank}</TableCell>
							<TableCell component='th' scope='row'>
								{row.Country}
							</TableCell>
							<TableCell align='left'>
								{row.TotalCases.toLocaleString('en-US')}
							</TableCell>
							<TableCell align='left'>
								{row.TotalRecovered.toLocaleString('en-US')}
							</TableCell>
							<TableCell align='left'>
								{row.TotalDeaths.toLocaleString('en-US')}
							</TableCell>
							<TableCell component='th' scope='row'>
								{row.ActiveCases.toLocaleString('en-US')}
							</TableCell>
							<TableCell align='left'>
								{row.NewCases.toLocaleString('en-US')}
							</TableCell>
							<TableCell align='left'>
								{row.NewRecovered.toLocaleString('en-US')}
							</TableCell>
							<TableCell align='left'>
								{row.NewDeaths.toLocaleString('en-US')}
							</TableCell>
						</TableRow>
					))}
					{emptyRows > 0 && (
						<TableRow style={{ height: 53 * emptyRows }}>
							<TableCell colSpan={6} />
						</TableRow>
					)}
				</TableBody>
				<TableFooter component={SCTableFooter}>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
							colSpan={6}
							count={rows?.length}
							rowsPerPage={rowsPerPage}
							page={page}
							SelectProps={{
								inputProps: {
									'aria-label': 'rows per page',
								},
								native: true,
							}}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
							ActionsComponent={TablePaginationActions}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	);
}
