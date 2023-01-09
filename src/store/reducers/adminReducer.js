import actionTypes from '../actions/actionTypes';
const initialState = {
  allDataShortToy: [],
  toyType: [],
  toyById: [],
  allToy: [],
};
const adminReducer = (state = initialState, action) => {
  let copyState = {};
  switch (action.type) {
    //toy data short
    case actionTypes.FETCH_TOY_SUCCESS:
      copyState = { ...state };
      copyState.allDataShortToy = action.data;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_TOY_FAILED:
      state.allDataShortToy = [''];
      return {
        ...state,
      };

    //allcode toytype
    case actionTypes.FETCH_ALLCODES_BY_TYPE_SUCCESS:
      copyState = { ...state };
      copyState.toyType = action.data;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_ALLCODES_BY_TYPE_FAILED:
      copyState = { ...state };
      copyState.toyType = [];
      return {
        ...copyState,
      };

    //get-toy-by-id
    case actionTypes.FETCH_TOY_BY_ID_SUCCESS:
      copyState = { ...state };
      copyState.toyById = action.data;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_TOY_BY_ID_FAILED:
      copyState = { ...state };
      copyState.toyById = [];
      return {
        ...copyState,
      };

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

export default adminReducer;
