const onUploadFile = (dispatch, action) => {
  console.log(action.file);
};

export default function registerListeners(listenMiddleware) {
  listenMiddleware.addListener('UPLOAD_FILE', onUploadFile);
}
