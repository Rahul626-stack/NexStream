import React, { useState } from "react";
import { Logo } from "./Logo";
import { emailValidationMessage, passwordValidationMessage, validateEmail, validatePassword } from "../shared/validators";
import { useLogin } from "../shared/hooks/useLogin";
import { Input } from "../shared/components";

export const Login = ({userClickHandler}) => {
    const { login, isLoading } = useLogin();

    const [formState, setFormState] = useState({
        email : {
            value : "",
            isValid : false,
            showError : false,
        },
        password : {
            value : "",
            isValid : false,
            showError : false,
        }
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
        case 'email' :
          isValid = validateEmail(value);
          break;
        case 'password' :
          isValid = validatePassword(value);
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

    const handleLogin = (event) =>{
      event.preventDefault();

      login(formState.email.value, formState.password.value);
    }

    const isButtonDisabled = isLoading || !formState.email.isValid || !formState.password.isValid ;

  return (
    <div className="login-container">
      <Logo text = {"Log in"}/>
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
         field = "password"
         label = "password" 
         value = {formState.password.value} 
         onChangeHandler = {handleInputValueChange} 
         type='password'
         onBlurHandler={handleInputValidationOnBlur}
         showErrorMessage={formState.password.showError}
         validationMessage={passwordValidationMessage}
        />
        <button
          onClick={handleLogin}
          disabled = {isButtonDisabled}
        >Log in</button>
      </form>
      <span onClick={userClickHandler} className="form-switch">Not signed up? Click here</span>
    </div>
  )
};
