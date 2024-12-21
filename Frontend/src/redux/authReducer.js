// authReducer.js
const initialState = {
  user: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: "",
      };
    default:
      return state;
  }
};

export default authReducer;