// Counselor.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { WriteCounselorApi } from '../../api/matching';
const Wrapper = styled.div`
    width: 100%;
    height: 80%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;
const FormPosts = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 300px;  /* 고정된 높이 설정 */
    height: 100%;
    padding: 20px;
    box-sizing: border-box;

    input, textarea {
        margin-bottom: 10px;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ddd;
        border-radius: 5px;
        box-sizing: border-box;
        transition: all 0.3s ease;

        &:focus {
        border-color: #4285f4;
        box-shadow: 0 0 5px rgba(66, 133, 244, 0.5);
        }
    }
    textarea {
        height: 100%;
    }

    button {
        padding: 10px;
        font-size: 16px;
        background-color: #4285f4;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.3s ease;
        &:hover {
        background-color: #357ae8;
        }
        box-sizing: border-box;
    }
`;

const Btn = styled.button`
    width: 40%;
    height: 20%;
    padding: 20px;
    background-color: #FFE6E6;
    border: 1px solid #f5f5f5;
    border-radius: 20px;
    font-size: 15px;
    margin-top: 10px;
    font-weight: bold;
    color: #000;
    cursor: pointer;
    &:hover {
        background-color: #FF5A5A;
    }
`;
const AlertBox = styled.div`
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    border-radius: 20px;
    padding: 20px;
    width: 80%;
    height: 80%;
    h2 {
        font-size: 20px;
        color: #ff6b6b;
        margin-top: 0;
        margin-bottom: 10px;

    }
    p {
        font-size: 16px;
        color: #555;
        line-height: 1.6;
        margin: 0;
        padding: 0;
        margin-bottom: 5px;
    }
`;

function Counselor() {
    const [formWrite, setFormWrite] = useState(false);
    const [name, setName] = useState('');
    const [age, setAge] = useState(null);
    const [workIn, setWorkIn] = useState('');
    const [purpose, setPurpose] = useState('');
    const [openlink, setOpenlink] = useState('');
    const [giveTalk, setGiveTalk] = useState('');



    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await WriteCounselorApi(name, age, workIn, purpose, openlink, giveTalk);
            console.log('Diary entry created:', response.data);
            setName('');
            setAge();
            setWorkIn('');
            setPurpose('');
            setOpenlink('');
            setGiveTalk('');
            alert('제출이 완료되었습니다.');
          } catch (error) {
            console.error('Error creating diary entry:', error);
          }
    };
    return (
        <>
            {!formWrite ? (
                <>
                    <AlertBox>
                        <h2>오픈채팅방 만드는 법</h2>
                        <p>1. 카카오톡 앱을 열고 로그인합니다.</p>
                        <p>2. 하단의 "친구" 탭을 선택합니다.</p>
                        <p>3. 우측 상단의 "+" 버튼을 클릭합니다.</p>
                        <p>4. "오픈채팅"을 선택합니다.</p>
                        <p>5. "오픈채팅방 만들기"를 선택하고 원하는 설정을 합니다.</p>
                        <h2>신청하는 법</h2>
                        <p>1. 오픈채팅방을 생성한 후, 생성된 링크를 복사합니다.</p>
                        <p>2. 우리 서비스의 신청 페이지로 이동합니다.</p>
                        <p>3. 복사한 오픈채팅방 링크를 신청 폼에 붙여넣고 제출합니다.</p>
                    </AlertBox>
                    <Btn onClick={() => setFormWrite(true)}>상담사 신청</Btn>
                </>
            ) : (
                <Wrapper>
                    <FormPosts onSubmit={handleSubmit}>
                        
                        <input
                            type='text'
                            placeholder='이름'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required/>
                        <input
                            type='integer'
                            placeholder='나이'
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required/>
                        <input
                            type='text'
                            placeholder='근무하고 있는 곳'
                            value={workIn}
                            onChange={(e) => setWorkIn(e.target.value)}
                            required/>
                        <input
                            type='text'
                            placeholder='상담사 지원 목적'
                            value={purpose}
                            onChange={(e) => setPurpose(e.target.value)}
                            required/>
                        <input
                            type='text'
                            placeholder='오픈채팅방 링크'
                            value={openlink}
                            onChange={(e) => setOpenlink(e.target.value)}
                            required/>
                        <input
                            type='text'
                            placeholder='하고 싶은 말'
                            value={giveTalk}
                            onChange={(e) => setGiveTalk(e.target.value)}
                            required/>
                        <button type="submit">Submit</button>
                    </FormPosts>
                </Wrapper>
            )}
        </>
    )
}

export default Counselor;
