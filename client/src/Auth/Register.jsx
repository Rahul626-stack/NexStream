import React, { useState } from "react";
import { Logo } from "./Logo";
import { Input } from "../shared/components";
import { emailValidationMessage, passwordConfValidationMessage, passwordValidationMessage, usernameValidationMessage, validateEmail, validatePassword, validatePasswordConf, validateUsername } from "../shared/validators";
import { useRegister } from "../shared/hooks";

export const Register = ({userClickHandler}) => {
    const { register, isLoading } = useRegister();

    const [formState, setFormState] = useState({
        email : {
            value : "",
            isValid : false,
            showError : false,
        },
        username : {
          value : "",
          isValid : false,
          showError : false,
        },
        password : {
          value : "",
          isValid : false,
          showError : false,
        },
        passwordConf : {
            value : "",
            isValid : false,
            showError : false,
        },
    });

    const handleInputValueChange = (value, field) => {
        setFormState(prevState => ({
            ...prevState,
            [field] : {
                ...prevState[field],
                value : value,
            }
        }));
    }

    const handleInputValidationOnBlur = (value,field) => {
      let isValid = false;

      switch(field) {
        case 'email':
          isValid = validateEmail(value);
          break;
        case 'username':
          isValid = validateUsername(value);
          break;
        case 'password':
          isValid = validatePassword(value);
          break;
        case 'passwordConf':
          isValid = validatePasswordConf(formState.password.value, value);
          break;
        default :
          break;
      }

      setFormState(prevState =>({
        ...prevState,
        [field]: {
          ...prevState[field],
          isValid,
          showError : !isValid,
        }
      }))
    }

    const handleRegister = (event) =>{
      event.preventDefault();

      register(formState.email.value, formState.password.value, formState.username.value);
    }

    const isButtonDisabled = isLoading || !formState.email.isValid || !formState.username.isValid || !formState.password.isValid || formState.password.value !== formState.passwordConf.value;

  return (
    <div className="login-container">
      <Logo text = {"Register"}/>
      <form className="auth-form">
        <Input
         field = "email"
         label = "email" 
         value = {formState.email.value} 
         onChangeHandler = {handleInputValueChange} 
         type = 'text'
         onBlurHandler={handleInputValidationOnBlur}
         showErrorMessage={formState.email.showError}
         validationMessage={emailValidationMessage}
        />
        <Input 
         field = "username"
         label = "username" 
         value = {formState.username.value} 
         onChangeHandler = {handleInputValueChange} 
         type='text'
         onBlurHandler={handleInputValidationOnBlur}
         showErrorMessage={formState.username.showError}
         validationMessage={usernameValidationMessage}
        />
        <Input 
         field = "password"
         label = "password" 
         value = {formState.password.value} 
         onChangeHandler = {handleInputValueChange} 
         type='password'
         onBlurHandler={handleInputValidationOnBlur}
         showErrorMessage={formState.password.showError}
         validationMessage={passwordValidationMessage}
        />
        <Input 
         field = "passwordConf"
         label = "confirm password" 
         value = {formState.passwordConf.value} 
         onChangeHandler = {handleInputValueChange} 
         type='password'
         onBlurHandler={handleInputValidationOnBlur}
         showErrorMessage={formState.passwordConf.showError}
         validationMessage={passwordConfValidationMessage}
        />
        <button
          onClick={handleRegister}
          disabled = {isButtonDisabled}
        >Register</button>
      </form>
      <span onClick={userClickHandler} className="form-switch">Already have an account? Sign in</span>
    </div>
  )
};
