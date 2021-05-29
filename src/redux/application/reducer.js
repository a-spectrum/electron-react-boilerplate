import {SET_SHOW_VIEW} from './actions';

const initialState = {
    showView: 'SETLIST'
};

export default function applicationReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SHOW_VIEW:
            return {
                ...state,
                showView: action.payload.showView,
            };
        default:
            return state;
    }
}
