import { useEffect, useState } from "react";
import styled from "styled-components";
import ChatMessages from "./ChatMessages";
import '../../styles/App.css';
import fetchMessages from "../../api/message";

const Wrapper = styled.div`
    /* padding: 10px; */
    width: 30%;
    margin-right: 5px;
    position: relative;
    border-radius: 50px;
    overflow: hidden;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    border: 5px solid black;
    display: flex;
    flex-direction: column;

`;
const BannerHeader = styled.div`
    padding-top: 5px;
    font-size: 18px;
    font-weight: 700;
    height: 50px;
    background-color: #0078ff;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 36px;
    border-top-right-radius: 36px;
`;
const BannerMessages = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* flex-grow: 1; */
    overflow: hidden;
    border-radius: 5px;
    padding: 10px;
    position: relative;
    flex: 1;
    background: #dfe9f3;
    overflow-y: auto;
    height: 100%;
`;
const BannerFooter = styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    border-bottom-left-radius: 36px;
    border-bottom-right-radius: 36px;
    input {
        width: 80%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 20px;
        outline: none;
    }
`;
const allMessages = [
    { message: 'Message 1', writer: '익명' },
    { message: 'Message 2', writer: '익명' },
    { message: 'Message 3', writer: '서울시 동작구 준혁맘' },
    { message: 'Message 4', writer: '영주시 초등학생' },
];
export default function Banner() {
    const [visibleMessages, setVisibleMessages] = useState(allMessages.slice(0, 4));
    // const [startIndex, setStartIndex] = useState(0);
    // const fetchMsg = async () => {
    //     try {
    //         const response = await fetchMessages();
    //         console.log('Diary entry Read:', response);
    //         setVisibleMessages(response);
    //       } catch (error) {
    //         console.error('Error creating diary entry:', error);
    //       }
    //     }
    // useEffect(() => {
    //     fetchMsg();
    // }, []);
    
    // 어떤 식으로 많은 메세지들을 보여줄지 생각. 

    return (
        <Wrapper>
            <BannerHeader>응원의 메세지</BannerHeader>
            <BannerMessages>
                {visibleMessages.map((msg, index) => (
                        <div className="chat-wrapper">
                            <ChatMessages key={index} message={msg.message} writer={msg.writer} />
                        </div>
                    ))}   
            </BannerMessages>
            <BannerFooter>
                <input type="text" placeholder="메시지를 입력하세요..."></input>
            </BannerFooter>
        </Wrapper>
    );
}
