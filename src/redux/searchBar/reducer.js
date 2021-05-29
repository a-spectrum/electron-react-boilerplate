import {SET_SEARCH_KEY} from './actions';

const initialState = {
    searchKey: '',
};

export default function searchBarReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SEARCH_KEY:
            return {
                ...state,
                searchKey: action.payload.searchKey,
            };
        default:
            return state;
    }
}
