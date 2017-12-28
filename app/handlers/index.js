import github from './github';

import { receiveResults } from '../actions/receiving';

const onUploadFile = (dispatch, action) => {
  var formData  = new FormData();

  formData.append('package', action.file);

  fetch(
    `${API_URL}/scan/upload`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    })
    .then(response => response.json())
    .then(result => dispatch(receiveResults(result)));
};

export default function registerListeners(listenMiddleware) {
  listenMiddleware.addListener('UPLOAD_FILE', onUploadFile);

  github(listenMiddleware);
}
