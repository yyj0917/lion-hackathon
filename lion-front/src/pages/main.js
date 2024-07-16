// login이 되었을 때 page
import styled from "styled-components";
import '../styles/App.css';
import Section from "../components/Section";
import MainHeader from "../components/MainHeader";

const HeaderWrapper = styled.div`

  width: 100%;
  height: 100px;
  border-bottom: 1px solid gray;
  display: flex;
  justify-content: center;
  /* padding: 10px; */
`;
const SectionWrapper = styled.div`
  display: flex;
  height: calc(100vh - 100px);
  padding: 40px 0;
`;



function Main() {


  return (
    <>
      <HeaderWrapper>
        <MainHeader/>
      </HeaderWrapper>
      <SectionWrapper>
        <Section/>
      </SectionWrapper>
        {/* <Footer/> */}
    </>
  );
}

export default Main;