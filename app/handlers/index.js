import github from './github';

export const receiveMaintainers = maintainers => ({ type: 'RECEIVE_MAINTAINERS', maintainers });

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
    .then(maintainers => dispatch(receiveMaintainers(maintainers)));
};

export default function registerListeners(listenMiddleware) {
  listenMiddleware.addListener('UPLOAD_FILE', onUploadFile);

  github(listenMiddleware);
}
