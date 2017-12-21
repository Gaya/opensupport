import github from './github';

export const receiveMaintainers = response => ({ type: 'RECEIVE_MAINTAINERS', response });

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
    .then(response => dispatch(receiveMaintainers(response)));
};

export default function registerListeners(listenMiddleware) {
  listenMiddleware.addListener('UPLOAD_FILE', onUploadFile);

  github(listenMiddleware);
}
