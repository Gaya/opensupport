const onUploadFile = (dispatch, action) => {
  var formData  = new FormData();

  formData.append('package', action.file);

  fetch(
    `${API_URL}/scan`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    })
    .then(response => response.json())
    .then(maintainers => dispatch({ type: 'RECEIVE_MAINTAINERS', maintainers }));
};

export default function registerListeners(listenMiddleware) {
  listenMiddleware.addListener('UPLOAD_FILE', onUploadFile);
}