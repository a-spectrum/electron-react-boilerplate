import {SELECT_SET_CODE, SELECT_SET_NAME} from './actions';

const initialState = {
    setsFromApi: [],
    selectedSetCode: '',
    selectedSetName: '',
};

export default function setListReducer(state = initialState, action) {
    switch (action.type) {
        case SELECT_SET_CODE:
            return {
                ...state,
                selectedSetCode: action.payload.selectedSetCode,
            };
        case SELECT_SET_NAME:
            return {
                ...state,
                selectedSetName: action.payload.selectedSetName,
            };
        default:
            return state;
    }
}
