export function uploadFile(file) {
  return {
    type: 'UPLOAD_FILE',
    file,
  };
}
