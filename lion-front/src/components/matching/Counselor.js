// Counselor.js
import React, { useState } from "react";
import styled from "styled-components";
import { WriteCounselorApi } from "../../api/matching";
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const FormPosts = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  min-height: 300px; /* 고정된 높이 설정 */
  height: 80%;
  padding: 20px;
  box-sizing: border-box;
  /* align-items: center; */
  justify-content: center;

  input,
  textarea {
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
  background-color: #ffe6e6;
  border: 1px solid #f5f5f5;
  border-radius: 20px;
  font-size: 15px;
  margin-top: 10px;
  font-weight: bold;
  color: #000;
  cursor: pointer;
  &:hover {
    background-color: #ff5a5a;
  }
`;
const AlertBox = styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
const CheckBoxGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  label {
    display: block;
    margin-right: 5px;
    cursor: pointer;
    span {
      display: inline-block;
    }
  }
`;

const CheckBoxInput = styled.input.attrs({ type: "checkbox" })`
  margin-right: 10px;

  &:checked + span {
    /* background-color: #007BFF; */
    color: #007bff;
    border-radius: 4px;
    /* padding: 2px 6px; */
  }
`;
const TextCard = styled.div`
    /* background-color: #f9f9f9; 배경색 */
    border: 1px solid #e0e0e0; /* 테두리 */
    display: flex;
    width: 80%;
    height: 20%;
    border-radius: 8px;
    box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
    padding: 20px;
    p {
        font-family: "Sunflower", sans-serif;
        font-size: 16px; /* 글자 크기 */
        color: #333; /* 글자 색상 */
        margin: 0; /* 마진 제거 */
        line-height: 1.5; /* 줄 간격 */
    }
`;

function Counselor() {
  const [formWrite, setFormWrite] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState(null);
  const [workIn, setWorkIn] = useState("");
  const [openlink, setOpenlink] = useState("");
  const [giveTalk, setGiveTalk] = useState("");
  const [categories, setCategories] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await WriteCounselorApi(
        name,
        age,
        workIn,
        openlink,
        giveTalk,
        categories,
      );
      console.log("Diary entry created:", response.data);
      setName("");
      setAge();
      setWorkIn("");
      setOpenlink("");
      setGiveTalk("");
      alert("제출이 완료되었습니다.");
    } catch (error) {
      console.error("Error creating diary entry:", error);
    }
  };
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCategories([...categories, value]);
    } else {
      setCategories(categories.filter((category) => category !== value));
    }
  };
  return (
    <>
      {(false) ? (
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
          <TextCard>
            <p>Form 작성관련 필수 사항</p>
          </TextCard>
          <FormPosts onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="integer"
              placeholder="나이"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="근무하고 있는 곳"
              value={workIn}
              onChange={(e) => setWorkIn(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="오픈채팅방 링크"
              value={openlink}
              onChange={(e) => setOpenlink(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="하고 싶은 말"
              value={giveTalk}
              onChange={(e) => setGiveTalk(e.target.value)}
              required
            />
            <CheckBoxGroup>
              <label>
                <CheckBoxInput
                  type="checkbox"
                  value="정신건강"
                  onChange={handleCategoryChange}
                />
                <span>정신건강</span>
              </label>
              <label>
                <CheckBoxInput
                  type="checkbox"
                  value="직업적 스트레스"
                  onChange={handleCategoryChange}
                />
                <span>직업적 스트레스</span>
              </label>
              <label>
                <CheckBoxInput
                  type="checkbox"
                  value="신체건강"
                  onChange={handleCategoryChange}
                />
                <span>신체건강</span>
              </label>
              <label>
                <CheckBoxInput
                  type="checkbox"
                  value="대인관계"
                  onChange={handleCategoryChange}
                />
                <span>대인관계</span>
              </label>
              <label>
                <CheckBoxInput
                  type="checkbox"
                  value="기타"
                  onChange={handleCategoryChange}
                />
                <span>기타</span>
              </label>
            </CheckBoxGroup>
            <button type="submit">Submit</button>
          </FormPosts>
        </Wrapper>
      )}
    </>
  );
}

export default Counselor;
