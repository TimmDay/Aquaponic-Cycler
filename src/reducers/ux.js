//REDUCER
const defaultState = {
  isModalOpenEditCycle: false,
}

const uxReducer = (state = defaultState, action) => {
  switch (action.type) {
      case 'TOGGLE_MODAL_EDIT_CYCLE':
          return {
              ...state,
              isModalOpenEditCycle: !state.isModalOpenEditCycle
          };
      default:
        return state;
    }
};

export default uxReducer;