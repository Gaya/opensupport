import { combineReducers } from 'redux';

const processing = (state = false, action) => {
  switch (action.type) {
    case 'UPLOAD_FILE':
      return true;
    default:
      return state;
  }
};

export default combineReducers({
  processing,
});
