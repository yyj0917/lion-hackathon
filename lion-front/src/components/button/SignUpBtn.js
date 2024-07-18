import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Btn = styled.button`
    width: 120px;
    height: 60px;
    border-radius: 10px;
    border: white;
    background-color: white;
    cursor: pointer;
    &:hover {
        background-color: rgb(255,0,0, 0.3);
    }
    text-align: center;
    font-size: 17px;
`;

export default function SignUpBtn() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/signup');
    }
    return (
        <Btn onClick={handleClick}>회원가입</Btn>
    );
}
