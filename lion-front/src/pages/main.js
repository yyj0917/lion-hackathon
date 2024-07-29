import styled from "styled-components";
import "../styles/App.css";
import Section from "../components/Section";

const SectionWrapper = styled.div`
  display: flex;
  height: calc(100vh - 100px - 40px);
  padding: 20px 0;
`;

function Main() {
  return (
    <>
      <SectionWrapper>
        <Section />
      </SectionWrapper>
    </>
  );
}

export default Main;
