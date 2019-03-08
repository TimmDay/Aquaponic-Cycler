const defaultState = {
  selectedFilter: 'view all', //default
  cyclingData: [],
  dateExtent: [],
  selectedNode: {}
};

const aquaponicReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_SELECTED_FILTER':
      return {
        ...state,
        selectedFilter: action.wqm
      };

    case 'UPDATE_DB_RETURN':
      //store the min and max date in all of data
      //1. convert date strings to date objects to timestamps to compare them as numbers
      let dateArr = [];

      action.data.forEach(item => {
        const timestamp = new Date(item.date).getTime();
        if (timestamp !== NaN) dateArr.push(timestamp);
      })
      const maxDate = new Date(Math.max(...dateArr)).toString();
      const minDate = new Date(Math.min(...dateArr)).toString();
      
      return {
        ...state,
        cyclingData: action.data,
        dateExtent: [minDate, maxDate]
      };

    case 'ADD_NEW_ENTRY':
      return {
        ...state,
        cyclingData: [...state.cyclingData, action.entry]
      };

      case 'EDIT_NEW_ENTRY':
      return {
        ...state,
        cyclingData: [...state.cyclingData, action.entry]
      };

    case 'UPDATE_SELECTED_NODE_DATA':
      return {
        ...state,
        selectedNode: action.nodeData
      }

    default:
      return state;
  }
};

export default aquaponicReducer;
