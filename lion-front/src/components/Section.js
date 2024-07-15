
import styled from "styled-components";

const Wrapper = styled.div`
    border: 3px solid red;
    width: 100%;
    height: 60%;
    margin-bottom: 30px;
    display: flex;
    padding: 5px;
`;

const Nav = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 5px;
    border: 3px solid red;
    flex-grow: 3;
`;
const Router = styled.button`
    width: 90%;
    height: 15%;
    border: 3px solid red;
    margin: 5px;
    background-color: white;
`;

const Article = styled.div`
    margin: 5px;
    border: 3px solid red;

    flex-grow: 7;
`;

export default function Section() {
    return (
        <Wrapper>
            <Nav>
                <Router></Router>
                <Router></Router>
                <Router></Router>
                <Router></Router>
                <Router></Router>
                <Router></Router>

            </Nav>
            <Article></Article>
        </Wrapper>
    )
}
