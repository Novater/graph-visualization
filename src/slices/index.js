import { combineReducers } from 'redux';
import graphReducer from './graphSlice';

const rootReducer = combineReducers({
    graph: graphReducer
});

export default rootReducer;