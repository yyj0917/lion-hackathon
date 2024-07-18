import styled from "styled-components";
import Tab from "./Tab";
const Wrapper = styled.div`

    flex-grow: 9;
    margin-left: 5px;
    /* height: 740px; */
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);

`;

export default function Features() {
    return (
        <Wrapper>
            <Tab/>
        </Wrapper>
    );
}
