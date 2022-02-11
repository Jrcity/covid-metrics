/** @format */

import * as React from 'react';
import {
	AppBar,
	Avatar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Divider,
	Container,
	Button,
	Tooltip,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	SwipeableDrawer,
} from '@mui/material/';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {
	FaBars,
	FaCompass,
	FaHome,
	FaInfoCircle,
	FaShieldAlt,
} from 'react-icons/fa';
import logo from '../assets/images/logo.png';
import ThemeSwitcher from './ThemeSwitch';
import { useSelector } from 'react-redux';

const SCNavLink = styled(NavLink)`
	color: ${(props) => props.theme.link};
	text-decoration: none !important;
`;
const SCList = styled(List)`
	padding: 10;
	margin-bottom: 30;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	& img {
		width: 50%;
		margin-left: -20px;
	}
`;

const SCAppBar = styled(AppBar)`
	background-color: ${(props) => props.theme.secondary} !important;
`;

const SCDrawer = styled(SwipeableDrawer)`
	& .MuiDrawer-paperAnchorLeft {
		background: ${(props) => props.theme.background} !important;
		/* display: none; */
		& a,
		svg {
			text-decoration: none;
			color: ${(props) => props.theme.accent};
		}
	}
`;

const drawableItems = [
	{
		to: '/',
		name: 'HOME',
		icon: <FaHome />,
	},
	{
		to: 'news',
		name: 'NEWS',
		icon: <FaCompass />,
	},
	{
		to: 'vaccines',
		name: 'VACCINES',
		icon: <FaShieldAlt />,
	},
	{ to: 'about', name: 'ABOUT', icon: <FaInfoCircle /> },
];

const pages = [
	{
		to: 'news',
		name: 'NEWS',
	},
	{
		to: 'vaccines',
		name: 'VACCINES',
	},
	{ to: 'about', name: 'ABOUT' },
];

function Nav() {
	const { theme } = useSelector((state: any) => state.theme);
	const [drawerToggle, setdrawerToggle] = React.useState(false);

	return (
		<SCAppBar position='sticky'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Typography variant='h6'>
						<SCNavLink
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: ' center',
							}}
							to='/'>
							<Avatar
								sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
								src={logo}
								alt={logo}
							/>

							<Typography
								alignSelf='center'
								variant='subtitle1'
								noWrap
								component='div'
								sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
								COVID-19 METRICS
							</Typography>
						</SCNavLink>
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={() => setdrawerToggle(true)}
							color='inherit'>
							<FaBars color={theme.accent} />
						</IconButton>

						<SCDrawer
							anchor='left'
							open={drawerToggle}
							onOpen={() => setdrawerToggle(true)}
							onClose={() => setdrawerToggle(false)}>
							<Box sx={{ width: 250 }} role='presentation'>
								<SCList>
									<img src={logo} alt={logo} />
									<Typography variant='h5'>COVID METRICS</Typography>
									<Divider />
								</SCList>
								<List>
									{drawableItems.map((item) => {
										return (
											<NavLink to={item.to} key={item.to}>
												<ListItem button key={item.to}>
													<ListItemIcon>{item.icon}</ListItemIcon>
													<ListItemText primary={item.name} />
												</ListItem>
											</NavLink>
										);
									})}
								</List>
							</Box>
						</SCDrawer>
					</Box>
					<Typography
						variant='h6'
						noWrap
						component='div'
						sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<img width={50} src={logo} alt={logo} />
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map(({ name, to }) => (
							<Button
								key={to}
								onClick={() => setdrawerToggle(false)}
								sx={{ my: 2, color: 'white', display: 'block' }}>
								<SCNavLink to={to}>{name}</SCNavLink>
							</Button>
						))}
					</Box>
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title='theme switch'>
							<ThemeSwitcher />
						</Tooltip>
					</Box>
				</Toolbar>
			</Container>
		</SCAppBar>
	);
}

export default Nav;
