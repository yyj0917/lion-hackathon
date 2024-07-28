import styled from "styled-components";
import React, { useState } from 'react';
import "../styles/App.css";
import { registerApi } from "../api/auth";
import { useNavigate } from "react-router-dom";

const FormSighUp = styled.form`
    font-family: 'Montserrat', sans-serif;
    background-color: #FFFFFF;
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
        border: 1px solid #FF4B2B;
        background-color: #FF4B2B;
        color: #FFFFFF;
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
    border-color: #FFFFFF;
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
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    // email, password, name, age, position, office, phoneNumber, nickname

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await registerApi(email, password, name, age, position, office, phonenumber, username,);
            console.log(response);
            setMessage('회원가입 성공! 이메일을 확인하여 계정을 활성화하세요.')
            console.log(message)
        } catch (error) {
            console.error('Registration failed', error);
            setMessage('회원가입 실패. 다시 시도하세요.')
            console.log(message)
        }
    };
    
    return (
        <>
            <FormSighUp onSubmit={handleRegister}>
                    <h1>Create Account</h1>
                    <span>use your email for registration</span>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        id="password"
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
                    <button className="btn" type="submit" >SIGN UP</button>
                    </FormSighUp>
        </>
        // <Wrapper>
        //     <FormWrapper>
        //             <Article className="poem-container">
        //                 <div className="poem-header">소방관의 기도</div>
        //                 <div className="poem-content">
        //                     신이시여, <br />
        //                     제가 부름을 받을 때에는 <br />
        //                     아무리 강렬한 화염 속에서도 <br />
        //                     한 생명을 구할 수 있는 힘을 저에게 주소서.<br />
        //                     너무 늦기 전에 <br />
        //                     어린아이를 감싸 안을 수 있게 하시고 <br />
        //                     공포에 떠는 노인을 구하게 하소서.<br />
        //                     <br />
        //                     저에게는 언제나 안전을 기할 수 있게 하시어 <br />
        //                     가냘픈 외침까지도 들을 수 있게 하시고, <br />
        //                     빠르고 효율적으로 화재를 진압하게 하소서.<br />
        //                     <br />
        //                     저의 임무를 충실히 수행케 하시고 <br />
        //                     제가 최선을 다할 수 있게 하시어, <br />
        //                     이웃의 생명과 재산을 보호하게 하소서.<br />
        //                     <br />
        //                     그리고 당신의 뜻에 따라 <br />
        //                     제 목숨이 다하게 되거든, <br />
        //                     부디 은총의 손길로 <br />
        //                     제 아내와 아이들을 돌보아주소서.
        //                 </div>
        //             </Article>
                    
        //     </FormWrapper>
        // </Wrapper>
    )
}