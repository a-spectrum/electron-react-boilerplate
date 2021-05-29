import {combineReducers} from 'redux';
import applicationReducer from './application/reducer';
import searchBarReducer from './searchBar/reducer';
import setListReducer from './setList/reducer';

const rootReducer = combineReducers({
    application: applicationReducer,
    searchBar: searchBarReducer,
    setList: setListReducer,
})

export default rootReducer;
