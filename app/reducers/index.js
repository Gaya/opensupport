// @flow

import { combineReducers } from 'redux';

import github from './github';

const processing = (state = false, action) => {
  switch (action.type) {
    case 'RECEIVE_RESULTS':
      return false;
    case 'UPLOAD_FILE':
      return true;
    default:
      return state;
  }
};

const maintainers = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_RESULTS':
      return action.response.maintainers;
    default:
      return state;
  }
};

const packages = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_RESULTS':
      return action.response.packages;
    default:
      return state;
  }
};

const repository = (state: string = '', action): string | null => {
  switch (action.type) {
    case 'RECEIVE_RESULTS':
      return action.response.name || null;
    default:
      return state;
  }
};

export default combineReducers({
  processing,
  maintainers,
  packages,
  repository,
  github,
});
