export const SET_SEARCH_KEY = 'SET_SEARCH_KEY';

export const setSearchKeyAction = (searchKey) => ({
    type: SET_SEARCH_KEY,
    payload: {searchKey: searchKey}
});
