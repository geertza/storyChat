
import {
    combineReducers,
    createStore,
  } from 'redux';
  export const SetUser = user => ({
    type: 'SET_USER',
    payload : user,
  });

  // reducers.js
export const userReducer = (state = {}, action) => {
    console.log(state, action)
    switch (action.type) {
      case 'SET_USER':
        return {
            ...state,
            user: action.payload
        };
      default:
        return state;
    }
  };

  export const reducers = combineReducers({
    userReducer,
  });


  
  export default createStore(reducers, {});