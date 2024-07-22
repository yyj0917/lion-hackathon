import { BarChart4, Laugh, Notebook, Sidebar, Square, SquarePen } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";
import WritePost from "./WritePost";


const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

`;
const Navbar = styled.div`
    width: 20%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 20px;
    margin-right: 5px;
    align-items: center;
    p {
        cursor: pointer;
        box-shadow: 0 0px 5px rgba(0,0,0,0.1);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #f44336;
        &:hover {
            background-color: #f7f7f7;
        }
    }
`;
const Contents = styled.div`
    margin-left: 5px;
    width: 75%;
    height: 90%;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export default function PrivateDiary() {
    const [ featuresIdx, setFeaturesIdx ] = useState(1);
    
    return (
        <Wrapper>
            <Navbar>
                <p onClick={() => setFeaturesIdx(1)}><Notebook/></p>
                <p onClick={() => setFeaturesIdx(2)}><Laugh/></p>
                <p onClick={() => setFeaturesIdx(3)}><BarChart4/></p>
                <p onClick={() => setFeaturesIdx(4)}><SquarePen/></p>
            </Navbar>
            <Contents>
                {featuresIdx === 1 && <h1>1</h1>}
                {featuresIdx === 2 && <h1>감정분석</h1>}
                {featuresIdx === 3 && <h1>감정분석 결과추이</h1>}
                {featuresIdx === 4 && <WritePost/>}
            </Contents>
        </Wrapper>
    )
}