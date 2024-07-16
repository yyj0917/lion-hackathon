
import styled from "styled-components";
import ChatBanner from "./ChatBanner";
import Features from "./Features";

const Wrapper = styled.div`
    /* border: 3px solid red; */
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
`;



export default function Section() {
    return (
        <Wrapper>
            <ChatBanner/>
            <Features/>
        </Wrapper>
        
    )
}
