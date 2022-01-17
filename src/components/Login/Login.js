import React, { useState , useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const emailCheck = (state,action) => {
  if(action.type === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.includes('@')};
  }
  if(action.type === 'USER_BLUR'){
    return {value:state.value,isValid: state.value.includes('@') };
  }
return {value:'',isValid:false};
}

const passwordCheck = (state,action) => {
  if(action.type === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.trim().length > 6};
  }
  if(action.type === 'USER_BLUR'){
    return {value: state.value, isValid: state.value.trim().length > 6};
  }
  return {value: "", isValid: false};
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [emailValid, dispatchEmail] = useReducer(emailCheck,{value:"",isValid:null});
  const [passwordValid, dispatchPassword] = useReducer(passwordCheck, {value:"",isValid:null});
  const [formIsValid, setFormIsValid] = useState(false);

  const ctx = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(()=>{
    console.log("first func ran");
    return (()=>{
      console.log("first cleanup ran");
    });
  },[]);

  useEffect(() => {
    console.log("second func ran");
    const handleTimer = setTimeout(()=>{
      setFormIsValid(
        emailValid.isValid && passwordValid.isValid
      );
    },500);
    return () => {
      console.log("second cleanup ran");
      clearTimeout(handleTimer);
    };
    
  }, [emailValid.isValid,passwordValid.isValid])


  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type:"USER_INPUT",val:event.target.value});
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type: "USER_INPUT", val: event.target.value});
    // setFormIsValid(emailValid.isValid && passwordValid.isValid);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailValid.isValid);
    dispatchEmail({type:"USER_BLUR"});
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type: "USER_BLUR"});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid)
    ctx.onLogin(emailValid.value, passwordValid.value);
    else if(!emailValid.isValid){
      emailRef.current.focus();
    }
    else{
      passwordRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input ref={emailRef} id="email" type="email" label="E-Mail" isValid={emailValid.isValid} onChangeHandler={emailChangeHandler} onValidation ={validateEmailHandler} value={emailValid.value}/>
        <Input ref={passwordRef} id="password" type="password" label="Password" isValid={passwordValid.isValid} onChangeHandler={passwordChangeHandler} onValidation ={validatePasswordHandler} value={passwordValid.value}/>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
