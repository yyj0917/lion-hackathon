import { useEffect, useState } from "react";
import styled from "styled-components";
import ChatMessages from "./ChatMessages";
import '../../styles/App.css';
import fetchMessagesApi from "../../api/message";

const Wrapper = styled.div`
    /* padding: 10px; */
    width: 30%;
    margin-right: 5px;
    position: relative;
    border-radius: 50px;
    overflow: hidden;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    border: 5px solid white;
    display: flex;
    flex-direction: column;

`;
const BannerHeader = styled.div`
    padding-top: 5px;
    font-size: 18px;
    font-weight: 700;
    height: 50px;
    background-color: #FF5A5A;
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
    display: flex;
    justify-content: center;
    padding: 10px 0;
    background-color: white;
    /* background: #ffffff; */
    label {
        margin: 0 5px;
        color: black;
        cursor: pointer;
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
        border-radius: 20px;
        width: 20px;
        text-align: center;
        height: auto;

    }
    .active {
        background-color: #FF5A5A;
        color: #fff;
    }
    label input {
        display: none;
        &:checked + span {
            background-color: aliceblue;
            font-weight: bold;
            text-decoration: underline;
        }
    }
    label span {
        padding: 5px;
    }
    
`;

export default function Banner() {
    const [messages, setMessages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const messagesPerPage = 4;

    const fetchMessages = async () => {
      try {
        const response = await fetchMessagesApi();
        console.log(response);
        setMessages(response);
      } catch (error) {
        console.error('Error fetching diary entries:', error);
      }
    };
    useEffect(() => {
        fetchMessages();
      }, []);
    const indexOfLastPost = currentPage * messagesPerPage;
    const indexOfFirstPost = indexOfLastPost - messagesPerPage;
    const currentMessages = messages.slice(indexOfFirstPost, indexOfLastPost);

    // 페이지네이션 페이지 수 계산
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(messages.length / messagesPerPage); i++) {
    pageNumbers.push(i);
    }
    // 어떤 식으로 많은 메세지들을 보여줄지 생각. 

    return (
        <Wrapper>
            <BannerHeader>응원의 메세지</BannerHeader>
            <BannerMessages>
                {currentMessages.map((msg, index) => (
                        <div className="chat-wrapper">
                            <ChatMessages key={index} content={msg.content} writer={msg.writer} />
                        </div>
                    ))}   
            </BannerMessages>
            <BannerFooter>
                    {pageNumbers.map(number => (
                        <label key={number} className={`${currentPage === number ? 'active' : ''}`}>
                            <input
                            type="checkbox"
                            checked={currentPage === number}
                            onChange={() => setCurrentPage(number)}
                            />
                            {number}
                        </label>
                ))}
            </BannerFooter>
        </Wrapper>
    );
}
