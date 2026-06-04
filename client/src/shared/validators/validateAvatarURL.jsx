
export const validateAvatarURL = (url) => {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
  };
  
export const avatarURLValidationMessage = "Please enter valid URL";
  