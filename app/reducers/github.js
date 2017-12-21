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

const username = (state: string = '', action): string => {
  switch (action.type) {
    case 'GITHUB_MATCHED':
      return action.username;
    case 'GITHUB_ERROR':
      return '';
    default:
      return state;
  }
};

const repository = (state: string = '', action): string => {
  switch (action.type) {
    case 'GITHUB_MATCHED':
      return action.repository;
    case 'GITHUB_ERROR':
      return '';
    default:
      return state;
  }
};

export default combineReducers({
  error,
  username,
  repository,
});
