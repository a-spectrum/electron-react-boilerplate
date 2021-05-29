export const SELECT_SET_CODE = 'SELECT_SET_CODE';
export const SELECT_SET_NAME = 'SELECT_SET_NAME';

export const setSelectedSetByCodeAction = (selectedSetCode) => ({
    type: SELECT_SET_CODE,
    payload: {selectedSetCode: selectedSetCode}
});


export const setSelectedSetByNameAction = (selectedSetName) => ({
    type: SELECT_SET_NAME,
    payload: {selectedSetName: selectedSetName}
});
