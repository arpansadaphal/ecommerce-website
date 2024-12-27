import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_LOGOUT,
} from "../constants/userConstants";

// User signup reducer
export const userSignupReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true };
    case USER_SIGNUP_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// User login reducer with localStorage persistence
export const userLoginReducers = (
  state = {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  action
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      // Clear userInfo from both state and localStorage on logout
      localStorage.removeItem("userInfo");
      return { userInfo: null };
    default:
      return state;
  }
};

// export const userLoginReducers = (state = {}, action) => {
//   switch (action.type) {
//     case USER_LOGIN_REQUEST:
//       return { loading: true };
//     case USER_LOGIN_SUCCESS:
//       return { loading: false, userInfo: action.payload };
//     case USER_LOGIN_FAIL:
//       return { loading: false, error: action.payload };
//     case USER_LOGOUT:
//       return {};
//     default:
//       return state;
//   }
// };
