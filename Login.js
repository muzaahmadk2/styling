import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../Store/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};
const passReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredCollege, setEnteredCollege] = useState("");
  const [collegeIsValid, setCollegeIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passState, dispatchPass] = useReducer(passReducer, {
    value: "",
    isValid: null,
  });

  const ctx = useContext(AuthContext);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passIsValid } = passState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("validity");
      setFormIsValid(
        emailIsValid && passIsValid && enteredCollege.trim().length > 3
      );
    }, 500);

    return () => {
      console.log("cleanup");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passIsValid, enteredCollege]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(
    //       event.target.value.includes("@") &&
    //       passState.isValid &&
    //       enteredCollege.trim().length > 3
    //     );
  };

  const passwordChangeHandler = (event) => {
    dispatchPass({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(
    //   emailState.isValid &&
    //   event.target.value.trim().length > 6 &&
    //   enteredCollege.trim().length > 3
    // );
  };

  const collegeChangeHandler = (event) => {
    setEnteredCollege(event.target.value);
    // setFormIsValid(
    //   emailState.isValid &&
    //   passState.isValid &&
    //   event.target.value.trim().length > 3
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPass({ type: "INPUT_BLUR" });
  };

  const validateCollegeHandler = () => {
    setCollegeIsValid(enteredCollege.trim().length > 3);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, passState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-Mail"
          type="email"
          value={emailState.value}
          isValid={emailIsValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          id="college"
          label="College-Name"
          type="text"
          value={enteredCollege}
          isValid={collegeIsValid}
          onChange={collegeChangeHandler}
          onBlur={validateCollegeHandler}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          value={passState.value}
          isValid={passIsValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
