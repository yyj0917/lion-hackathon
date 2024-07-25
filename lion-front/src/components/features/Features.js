import styled, { keyframes } from "styled-components";
import Tab from "./Tab";
import { AlignJustify, Pen, Search, Undo2 } from "lucide-react";
import { useEffect, useState } from "react";

const slideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrapper = styled.div`

    width: 70%;
    margin-left: 5px;
    /* height: 740px; */
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    height: 100%;
    position: relative;
`;
const Back = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
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
`;
const Modal = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    cursor: pointer;
    width: 40px;
    height: 40px;
    box-shadow: 0 0px 5px rgba(0,0,0,0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f44336;
    &:hover {
        background-color: #f7f7f7;
    }
`;
const FilterAndWrite = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    transition: opacity 0.5s, visibility 0.5s;
    width: 40px;
    height: 90px;
    left: 10px;
    top: 60px;
    box-shadow: 0 0px 5px rgba(0,0,0,0.1);
    border-radius: 20px;

`;
const SearchDiv = styled.div`
    opacity: 0;
    transform: translateY(20px);
    animation: ${({ delay }) => delay}ms ${slideUp} forwards;    

    width: 40px;
    height: 40px;
    box-shadow: 0 0px 5px rgba(0,0,0,0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f44336;
    cursor: pointer;
    &:hover {
        background-color: #f7f7f7;
    }

`;
const WriteDiv = styled.div`
    font-size: 24px;
    opacity: 0;
    transform: translateY(20px);
    animation: ${({ delay }) => delay}ms ${slideUp} forwards;    
    width: 40px;
    height: 40px;
    box-shadow: 0 0px 5px rgba(0,0,0,0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f44336;
    cursor: pointer;
    &:hover {
        background-color: #f7f7f7;
    }
`;
export default function Features() {
    const [ isModal, setIsModal ] = useState(false);
    const [ writePost, setWritePost ] = useState(true);
    useEffect(() => {
    }, [writePost]);
    return (
        <Wrapper>
            <Modal>
                <AlignJustify  onClick={()=>setIsModal(!isModal)} style={{color: "#FF5A5A",}}/>
            </Modal>
            {(isModal) && (
                <FilterAndWrite>
                    <SearchDiv delay={100}>
                        <Search style={{color: "#FF5A5A",}}/>
                    </SearchDiv>
                    <WriteDiv delay={200} onClick={()=>setWritePost(!writePost)}>
                        <Pen style={{color: "#FF5A5A",}}/>
                    </WriteDiv>
                </FilterAndWrite>
            )}
            <Tab writePost={writePost} setWritePost={setWritePost}/>
            <Back>
                <Undo2 style={{color: "#FF5A5A",}}/>
            </Back>

        </Wrapper>
    );
}
