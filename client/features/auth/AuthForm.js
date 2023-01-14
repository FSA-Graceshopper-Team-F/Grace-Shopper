import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../../app/store";
import { reset } from "../../app/store";

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { isError, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    dispatch(authenticate({ email, password, method: formName }));
  }

  useEffect(() => {
    setTimeout(() => {
      if(isError){
        dispatch(reset())
         navigate('/login')
        }
      }, 2000);
    }, [isError]);


  return (
    <div>
      {isError ? <h3>{message}</h3> :
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
      </form>
      }
    </div>
    )
  };

export default AuthForm;
