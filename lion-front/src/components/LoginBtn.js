import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
const Btn = styled.button`
    width: 120px;
    height: 60px;
    border-radius: 40%;
    border: white;
    background-color: white;
    text-align: center;
    margin: 5px;
    font-family: "Black Han Sans", sans-serif;
    font-size: 18px;

`;

export default function LoginBtn() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    }
    return (
        <Btn onClick={handleClick}>로그인</Btn>
    );
}