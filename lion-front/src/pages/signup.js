import styled from "styled-components";
import React, { useState } from 'react';
import "../styles/App.css";
import { registerApi } from "../api/auth";
// import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";


const Wrapper = styled.div`
    display: flex;
    height: calc(100vh - 100px - 40px);
    padding: 20px 0;
`;

const FormWrapper = styled.div`
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
`;
const Article = styled.div`
    position: relative; 
    padding: 20px;
    margin: 5px;
    flex-grow: 15;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    border-radius: 8px;
    background-color: rgba(249, 249, 249, 0.2); /* 배경색 투명도 설정 */
    overflow: hidden;
`;
export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState(0); // integer
    const [position, setPosition] = useState('');
    const [office, setOffice] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');

    const navigate = useNavigate();
    // email, password, name, age, position, office, phoneNumber, nickname

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await registerApi(email, password, name, age, position, office, phonenumber, username,);
            console.log(response);
            navigate('/login')
        } catch (error) {
            console.error('Registration failed', error);
        }
    };
    
    return (
        <Wrapper>
            <FormWrapper>
                    <Article className="poem-container">
                        <div className="poem-header">소방관의 기도</div>
                        <div className="poem-content">
                            신이시여, <br />
                            제가 부름을 받을 때에는 <br />
                            아무리 강렬한 화염 속에서도 <br />
                            한 생명을 구할 수 있는 힘을 저에게 주소서.<br />
                            너무 늦기 전에 <br />
                            어린아이를 감싸 안을 수 있게 하시고 <br />
                            공포에 떠는 노인을 구하게 하소서.<br />
                            <br />
                            저에게는 언제나 안전을 기할 수 있게 하시어 <br />
                            가냘픈 외침까지도 들을 수 있게 하시고, <br />
                            빠르고 효율적으로 화재를 진압하게 하소서.<br />
                            <br />
                            저의 임무를 충실히 수행케 하시고 <br />
                            제가 최선을 다할 수 있게 하시어, <br />
                            이웃의 생명과 재산을 보호하게 하소서.<br />
                            <br />
                            그리고 당신의 뜻에 따라 <br />
                            제 목숨이 다하게 되거든, <br />
                            부디 은총의 손길로 <br />
                            제 아내와 아이들을 돌보아주소서.
                        </div>
                    </Article>
                    <form className="registerForm" onSubmit={handleRegister}>
                        <div className="regiform-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="regiform-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="regiform-group">
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="regiform-group">
                            <label htmlFor="age">Age</label>
                            <input
                                id="age"
                                type="integer"
                                onChange={(e) => setAge(parseInt(e.target.value))}
                                required
                            />
                        </div>
                        <div className="regiform-group">
                            <label htmlFor="position">Position</label>
                            <input
                                id="position"
                                type="text"
                                onChange={(e) => setPosition(e.target.value)}
                                required
                            />
                        </div>
                        <div className="regiform-group">
                            <label htmlFor="office">Office</label>
                            <input
                                id="office"
                                type="text"
                                onChange={(e) => setOffice(e.target.value)}
                                required
                            />
                        </div>
                        <div className="regiform-group">
                            <label htmlFor="phonenumber">PhoneNumber</label>
                            <input
                                id="phonenumber"
                                type="integer"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="regiform-group">
                            <label htmlFor="username">Nickname</label>
                            <input
                                id="username"
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="btn-group">
                            <button className="btn" type="submit">로그인</button>
                            <button className="btn" type="submit" >회원가입</button>
                        </div>
                    </form>
            </FormWrapper>
        </Wrapper>
    )
}