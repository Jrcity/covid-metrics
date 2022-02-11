/** @format */

import { combineReducers } from 'redux';
import statsReducer from './statsReducer';
import { themeReducer } from './themeReducer';

const reducers = combineReducers({ theme: themeReducer, stats: statsReducer });
export default reducers;
