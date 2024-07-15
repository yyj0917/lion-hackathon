import styled from "styled-components";
import '../styles/App.css';
import Header from "../components/Header";
import Section from "../components/Section";
import Footer from "../components/Footer";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1024px;
  height: 100vh;
  border: 3px solid black;
  padding: 10px;
`;



function Randing() {


  return (
    <Wrapper>
      <Header/>
      <Section/>
      <Footer/>
    </Wrapper>
  );
}

export default Randing;
