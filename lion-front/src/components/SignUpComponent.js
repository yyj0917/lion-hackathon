import styled from 'styled-components';
import React, { useState } from 'react';
import '../styles/App.css';
import { registerApi } from '../api/auth';

const FormSighUp = styled.form`
  font-family: 'Montserrat', sans-serif;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
  h1 {
    font-weight: bold;
    margin: 0;
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
export default function SignUpComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState(0); // integer
  const [position, setPosition] = useState('');
  const [office, setOffice] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await registerApi(
        email,
        password,
        name,
        age,
        position,
        office,
        phonenumber,
        username
      );
      console.log(response);
      alert('회원가입 성공! 이메일을 확인하여 계정을 활성화하세요.');
    } catch (error) {
      console.error('Registration failed', error);
      alert('회원가입 실패. 다시 시도하세요.');
    }
  };

  return (
    <FormSighUp onSubmit={handleRegister}>
      <h1>Create Account</h1>
      <span>use your email for registration</span>
      <input
        id="signup-email"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        id="signup-password"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        id="name"
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        id="age"
        type="integer"
        placeholder="Age"
        onChange={(e) => setAge(parseInt(e.target.value))}
        required
      />
      <input
        id="position"
        type="text"
        placeholder="Position"
        onChange={(e) => setPosition(e.target.value)}
        required
      />
      <input
        id="office"
        type="text"
        placeholder="Office"
        onChange={(e) => setOffice(e.target.value)}
        required
      />
      <input
        id="phonenumber"
        type="text"
        placeholder="PhoneNumber"
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
      />
      <input
        id="username"
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <button className="btn" type="submit">
        SIGN UP
      </button>
    </FormSighUp>
  );
}
