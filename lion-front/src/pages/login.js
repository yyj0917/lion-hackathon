import styled from "styled-components";
import React, { useState } from 'react';
import "../styles/App.css";
import { loginApi } from "../api/auth";
// import { useAuth } from "../contexts/AuthContext";
import { Form, Link, useNavigate } from "react-router-dom";
import SignUp from "../components/SignUpComponent";


const Wrapper = styled.div`
    height: calc(100vh - 100px - 40px);
    /* padding: 20px 0; */
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
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
    &.right-panel-active .overlay-container{
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
    background-color: #FFFFFF;
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
        background: #FF416C;
        background: -webkit-linear-gradient(to right, #FF4B2B, #FF416C);
        background: linear-gradient(to right, #FF4B2B, #FF416C);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 0 0;
        color: #FFFFFF;
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
    width: 768px;
    max-width: 100%;
    min-height: 480px;

`;
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
            localStorage.setItem('accessToken', response.token.access);
            localStorage.setItem('refreshToken', response.token.refresh);
            console.log(response);
            alert('로그인 성공');
            navigate('/');
        } catch (error) {
            console.error('Login failed', error);
            console.log('로그인 실패')
        }
    };
    
    return (
        <Container>

            <Wrapper className={isRightPanelActive ? 'right-panel-active' : ''}>
                <FormContainer className="sign-up-container">
                    <SignUp/>
                </FormContainer>
                <FormContainer className="sign-in-container">
                    <FormLogin onSubmit={handleLogin}>
                        <h1>Sign in</h1>
                        <span>or use your account</span>
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
                        <Link href="#">Forgot your password?</Link>
                        <button className="btn" type="submit">로그인</button>
                    </FormLogin> 
                </FormContainer>
                <OverlayContainer className="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button class="ghost" onClick={handleSignInClick} id="signIn">Sign In</button>
                        </div>
                        <div class="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button class="ghost" onClick={handleSignUpClick} id="signUp">Sign Up</button>
                        </div>
                    </div>
                </OverlayContainer>
            </Wrapper>
        </Container>
    )
}
{/* <Article className="poem-container">
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
<form className="loginForm" onSubmit={handleLogin}>
    <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
        />
    </div>
    <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
        />
    </div>
    <div className="btn-group">
        <button className="btn" type="submit">로그인</button>
        <button onClick={()=>{navigate('/signup')}} className="btn" >회원가입</button>
    </div>
</form> */}