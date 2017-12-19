import { combineReducers } from 'redux';

const processing = (state = false, action) => {
  switch (action.type) {
    case 'RECEIVE_MAINTAINERS':
      return false;
    case 'UPLOAD_FILE':
      return true;
    default:
      return state;
  }
};

const maintainers = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_MAINTAINERS':
      return action.maintainers;
    default:
      return state;
  }
}

export default combineReducers({
  processing,
  maintainers,
});
