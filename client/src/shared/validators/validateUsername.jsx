export const validateUsername = (username) => {

    const regex = /^\S{3,8}$/; // regular expression pattern
  return regex.test(username);
};

export const usernameValidationMessage = 'Username should have 3 - 8 characters. No spaces allowed.';