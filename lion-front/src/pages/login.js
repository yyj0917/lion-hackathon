import styled from 'styled-components';
import React, { useState } from 'react';
import '../styles/App.css';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi } from '../api/auth';
import SignUp from '../components/SignUpComponent';
import { useDispatch } from 'react-redux';
import { checkAuthStatus, login, setAuth } from '../redux/reducers/authReducer';

const Wrapper = styled.div`
  height: calc(100vh - 100px - 40px);
  /* padding: 20px 0; */
  background-color: #fff;
  border-radius: 10px;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
  &.right-panel-active .sign-in-container {
    transform: translateX(100%);
  }
  &.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
  }
  &.right-panel-active .overlay-container {
    transform: translateX(-100%);
  }
  &.right-panel-active .overlay {
    transform: translateX(50%);
  }
  &.right-panel-active .overlay-left {
    transform: translateX(0);
  }
  &.right-panel-active .overlay-right {
    transform: translateX(20%);
  }
  h1 {
    font-weight: bold;
    margin: 0;
  }
  h2 {
    text-align: center;
  }
  p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
  }
  a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
  }
  span {
    font-size: 12px;
  }
  button {
    border-radius: 20px;
    border: 1px solid #ff4b2b;
    background-color: #ff4b2b;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
  }
  input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
  }

  button:active {
    transform: scale(0.95);
  }

  button:focus {
    outline: none;
  }
  button.ghost {
    background-color: transparent;
    border-color: #ffffff;
  }
`;

const FormContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  &.sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
  }
  &.sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
  }
`;
const FormLogin = styled.form`
  font-family: 'Montserrat', sans-serif;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;
const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
  }

  .overlay {
    background: #ff416c;
    background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
    background: linear-gradient(to right, #ff4b2b, #ff416c);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #ffffff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }
  .overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    /* padding: 0 40px; */
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
    &.overlay-left {
      /* transform: translateX(-20%); */
    }
    &.overlay-right {
      right: 0;
      transform: translateX(0);
    }
  }
`;
const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  /* width: 768px; */
  max-width: 100%;
  min-height: 480px;
  padding: 5px;
`;
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await loginApi(email, password);
      dispatch(login());
      alert('로그인 성공');
      navigate('/', { replace: true });
    } catch (error) {
      alert('로그인 실패');
      console.error('Login failed', error);
    }
  };

  return (
    <Container>
      <Wrapper className={isRightPanelActive ? 'right-panel-active' : ''}>
        <FormContainer className="sign-up-container">
          <SignUp />
        </FormContainer>
        <FormContainer className="sign-in-container">
          <FormLogin onSubmit={handleLogin}>
            <h1>Sign in</h1>
            <span>or use your account</span>
            <input
              id="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              id="password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Link href="#">Forgot your password?</Link>
            <button className="btn" type="submit">
              로그인
            </button>
          </FormLogin>
        </FormContainer>
        <OverlayContainer className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" onClick={handleSignInClick} id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" onClick={handleSignUpClick} id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </OverlayContainer>
      </Wrapper>
    </Container>
  );
}
