module.exports = function() {
  return hook => {
    const files = hook.params.files;
    if(files) {
      const paths = files.map((photo) => {
        return photo.path;
      });
      hook.data.photos = paths;
    }
    return hook;
  };
};
