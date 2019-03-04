const defaultState = {
  selectedFilter: 'view all', //default
  dbReturn: []
};

const aquaponicReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_SELECTED_FILTER':
      return {
        ...state,
        selectedFilter: action.wqm
      };

    case 'UPDATE_DB_RETURN':
      return {
        ...state,
        dbReturn: action.data
      };

    case 'ADD_NEW_ENTRY':
      return {
        ...state,
        dbReturn: [...state.dbReturn, action.entry]
      };

    default:
      return state;
  }
};

export default aquaponicReducer;
