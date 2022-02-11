/** @format */
import { Card } from '@mui/material';
import { ResponsiveChoroplethCanvas } from '@nivo/geo';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { features } from '../static/world_countries.json';

const WorldMapContainer = styled(Card)`
	background: ${(props) => props.theme.background} !important;
`;

type TMapData = {
	ThreeLetterSymbol: string;
	TotalCases: number;
};

function WorldMap(props: any) {
	const { theme } = useSelector((state: any) => state.theme);
	const { allCountriesData } = props;

	const countries: TMapData[] = allCountriesData?.map(
		({ TotalCases, ThreeLetterSymbol }: TMapData) => ({
			id: ThreeLetterSymbol,
			value: TotalCases,
		})
	);
	return (
		<WorldMapContainer
			sx={{
				width: '100%',
				height: { xs: '70vh', md: 500 },
				overflowX: { xs: 'scroll', md: 'hidden' },
			}}>
			<ResponsiveChoroplethCanvas
				data={countries}
				features={features}
				margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
				colors='YlOrBr'
				domain={[0, 1500000]}
				unknownColor='#666666'
				label='properties.name'
				valueFormat='.2s'
				projectionType='equirectangular'
				projectionTranslation={[0.5, 0.5]}
				projectionRotation={[0, 0, 0]}
				projectionScale={100}
				graticuleLineColor={theme.accent}
				borderWidth={0.5}
				borderColor='#152538'
				legends={[
					{
						anchor: 'bottom-right',
						direction: 'column',
						translateX: -40,
						translateY: -10,
						itemsSpacing: 0,
						itemWidth: 80,
						itemHeight: 18,
						itemTextColor: theme.accent,
						itemOpacity: 0.85,
						symbolSize: 18,
						effects: [
							{
								on: 'hover',
								style: {
									itemTextColor: '#000000',
									itemOpacity: 1,
								},
							},
						],
					},
				]}
			/>
		</WorldMapContainer>
	);
}

export default WorldMap;
