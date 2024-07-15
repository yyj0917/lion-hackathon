// login이 되었을 때 page
import styled from "styled-components";
import './styles/App.css';
import Section from "./components/Section";
import Footer from "./components/Footer";
import MainHeader from "../components/MainHeader";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1024px;
  height: 100vh;
  border: 3px solid black;
  padding: 10px;
`;



function Main() {


  return (
    <Wrapper>
      <MainHeader/>
      <Section/>
      <Footer/>
    </Wrapper>
  );
}

export default Main;