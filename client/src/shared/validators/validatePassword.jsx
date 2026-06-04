export const validatePassword = (password) => {
    const regex = /^\S{6,12}$/; // regular expression pattern
    return regex.test(password);
};

export const passwordValidationMessage = 'Password should have 6 to 12 characters. No spaces allowed.';