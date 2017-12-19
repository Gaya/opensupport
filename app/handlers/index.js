const onUploadFile = (dispatch, action) => {
  var formData  = new FormData();

  formData.append('package', action.file);

  fetch(
    `${API_URL}/scan`,
    {
      method: 'POST',
      body: formData,
      mode: 'no-cors',
    })
    .then(response => response.json())
    .then(console.log);
};

export default function registerListeners(listenMiddleware) {
  listenMiddleware.addListener('UPLOAD_FILE', onUploadFile);
}
