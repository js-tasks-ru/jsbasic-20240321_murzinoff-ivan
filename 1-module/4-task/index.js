function checkSpam(str) {
  // ваш код...

  if (str.toLowerCase().indexOf('xxx') != -1 || str.toLowerCase().indexOf('1xbet') != -1) {
    return true;
    } else {
      return false;
  }
}
