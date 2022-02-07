/** @format */
const axios = require('axios');

const headers = {
	'x-rapidapi-host':
		'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
	'x-rapidapi-key': 'c337e8dbeamsh49b435102af33bdp1ccc5bjsnd6343c93d5ad',
};
const base_url =
	'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/';

export const All_Stats = async () => {
	try {
		let response = await axios.get(`${base_url}countries`, { headers });
		let { data } = await response;
		// console.log(data);

		return data;
	} catch (err) {
		console.log(err);
	}
};

export const getCountries = async () => {
	try {
		let response = await axios.get(`${base_url}countries-name-ordered`, {
			headers,
		});
		let { data } = await response;
		// console.log(data);
		return data;
	} catch (err) {
		console.log(err);
	}
};
