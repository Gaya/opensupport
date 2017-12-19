import { combineReducers } from 'redux';

import sampleMaintainers from './maintainers.json';

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

const maintainers = (state = sampleMaintainers, action) => {
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
