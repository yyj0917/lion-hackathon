import { useState } from "react";
import styled from "styled-components";
import ChatMessages from "./ChatMessages";
import '../../styles/App.css';
import { UsersRound } from "lucide-react";

const Wrapper = styled.div`
    /* padding: 10px; */
    flex-grow: 1;
    margin-right: 5px;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;

`;
const BannerHeader = styled.div`
    padding-top: 5px;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
`;
const BannerMessages = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex-grow: 1;
    overflow: hidden;
    background-color: #fff;
    border-radius: 5px;
    padding: 10px;
    position: relative;

`;
const allMessages = [
    { message: 'Message 1', timestamp: '10:00 AM' },
    { message: 'Message 2', timestamp: '10:01 AM' },
    { message: 'Message 3', timestamp: '10:02 AM' },
    { message: 'Message 4', timestamp: '10:03 AM' },
];
export default function Banner() {
    const [visibleMessages, setVisibleMessages] = useState(allMessages.slice(0, 4));
    // const [startIndex, setStartIndex] = useState(0);



    return (
        <Wrapper>
            <BannerHeader>응원의 메세지</BannerHeader>
            <BannerMessages>
                {visibleMessages.map((msg, index) => (
                        <div className="chat-wrapper">
                            <UsersRound size={36}/>
                            <ChatMessages key={index} message={msg.message} timestamp={msg.timestamp} />
                        </div>
                    ))}   
            </BannerMessages>
        </Wrapper>
    );
}
