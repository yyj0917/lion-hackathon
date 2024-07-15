import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const Wrapper = styled.header`
  border: 3px solid red;
  width: 95%;
  height: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 30px;
`;
const Center = styled.h1`
  font-family: "Black Han Sans", sans-serif;
  font-weight: 400;
  font-style: normal;
  color: red;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 50px;
`;
const Right = styled.div`
  margin-left: auto;
  img {
    width: 50px;
  }
`;

export default function MainHeader() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/profile');
    }
    return (
        <Wrapper>
            <Center>ForHero</Center>
            <Right>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeHn-eBXuPZ7uAFLlIEKdL2bSfPcDveLnrha_Q1e1vqh2G1Q_sdwC_GyKB13qf4ZcbBpg&usqp=CAU" onClick={handleClick} alt="firefighter"></img>
            </Right>
        </Wrapper>
    )
}
