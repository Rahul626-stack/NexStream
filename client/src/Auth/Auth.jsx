import React, { useState } from 'react';
import { Login } from './Login';
import { Register } from './Register';
import "./Auth.css"

export const Auth = () => {
    const [ isLogin, setIsLogin ] = useState(true);

    const clickHandler = () => {
        setIsLogin((prev) => !prev);
    };

    return (
    <div className='auth-container'>{isLogin ? 
        (<Login userClickHandler = {clickHandler}/>) :
        (<Register userClickHandler = {clickHandler}/>)}</div>
    );
};


