import actionTypes from '../actions/actionTypes';
const initialState = {
  allToy: [],
};
const clientReducer = (state = initialState, action) => {
  let copyState = {};
  switch (action.type) {
    //client-get-all-toy
    case actionTypes.FETCH_ALL_TOY_SUCCESS:
      copyState = { ...state };
      copyState.allToy = action.data;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_ALL_TOY_FAILED:
      copyState = { ...state };
      copyState.allToy = [];
      return {
        ...copyState,
      };
    default:
      return state;
  }
};

export default clientReducer;
