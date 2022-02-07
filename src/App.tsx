/** @format */

import { ThemeProvider } from 'styled-components';
import { FC } from 'react';
import { useSelector } from 'react-redux';

//nav
import Root from './route';

const App: FC<{}> = () => {
	const { theme } = useSelector((state: any) => state.theme);
  document.body.style.background = theme.background;
  document.body.style.color = theme.accent;

	return (
		<ThemeProvider theme={theme}>
			<Root />
		</ThemeProvider>
	);
};

export default App;
