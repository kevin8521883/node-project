module.exports = class CheckCustomer {
  checkEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = re.test(email);
    return result;
  }
  checkFileSize(fileSize) {
    const maxSize = 1 * 1024 * 1024;
    if (fileSize > maxSize) {
      return false;
    }
    return true;
  }
  checkFileType(fileType) {
    if (
      fileType !== "image/png" &&
      fileType !== "image/jpg" &&
      fileType !== "image/jpeg"
    ) {
      return false;
    }
    return true;
  }
};
