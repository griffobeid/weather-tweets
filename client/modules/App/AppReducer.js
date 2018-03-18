
// Initial State
const initialState = { token: '' };

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const getMapboxToken = state => state.token;

// Export Reducer
export default AppReducer;
