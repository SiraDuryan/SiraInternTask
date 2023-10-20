class Validator {
  static isEmailValid = (email) => {
    const regexp = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
    return regexp.test(email);
  };

  static isPhoneValid = (phone) => {
    const regexp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return regexp.test(phone);
  };
}

export default Validator;
