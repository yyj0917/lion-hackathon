import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Btn = styled.button`
    width: 120px;
    height: 60px;
    border-radius: 40%;
    border: white;
    background-color: white;
    font-family: "Black Han Sans", sans-serif;
    text-align: center;
    font-size: 18px;
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
