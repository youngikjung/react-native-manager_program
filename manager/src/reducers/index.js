/* eslint-disable prettier/prettier */

import { combineReducers } from 'redux';

import AppConfigReducer from '~/reducers/AppConfigReducer';
import UserConfigReducer from '~/reducers/UserConfigReducer';
import StoreConfigReducer from '~/reducers/StoreConfigReducer';

const rootReducer = combineReducers({
   AppConfigReducer,
   UserConfigReducer,
   StoreConfigReducer
});

export default rootReducer;