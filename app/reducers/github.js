// @flow

import { combineReducers } from 'redux';

const error = (state: string = '', action): string => {
  switch (action.type) {
    case 'GITHUB_MATCHED':
      return '';
    case 'GITHUB_ERROR':
      return action.error;
    default:
      return state;
  }
};

export default combineReducers({
  error,
});
