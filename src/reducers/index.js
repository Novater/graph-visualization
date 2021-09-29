import { combineReducers } from 'redux';
import graphReducer from './graphReducers';

const rootReducer = combineReducers({
    graph: graphReducer
});

export default rootReducer;