
import styled from "styled-components";
import ChatBanner from "./messages/ChatBanner";
import Features from "./features/Features";

const Wrapper = styled.div`
    /* border: 3px solid red; */
    width: 1200px;
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
