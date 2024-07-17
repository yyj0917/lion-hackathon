
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
const Btn = styled.button`
    width: 120px;
    height: 60px;
    border-radius: 10px;
    border: white;
    background-color: white;
    cursor: pointer;
    &:hover {
        background-color: rgb(255,0,0, 0.5);
    }
    text-align: center;
    margin: 5px;
    font-size: 17px;
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
