// Counselor.js
import React, { useState } from "react";
import styled from "styled-components";
import { WriteCounselorApi } from "../../../api/matching";
import { useNavigate } from "react-router-dom";
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
const WorkInput = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 2px;
  input {
    width: 50%;
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
  const navigate = useNavigate();
  // const [formWrite, setFormWrite] = useState(false);
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
      navigate(-1);
      
    } catch (error) {
      console.error("Error creating diary entry:", error);
    }
  };

  // form 제출 시 카테고리 복수체크 처리
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCategories([...categories, value]);
    } else {
      setCategories(categories.filter((category) => category !== value));
    }
  };
  return (
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
          <WorkInput>
            <input
              type="text"
              placeholder="현재직위"
              value={workIn}
              onChange={(e) => setWorkIn(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="근무위치"
              value={workIn}
              onChange={(e) => setWorkIn(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="근무기간"
              value={workIn}
              onChange={(e) => setWorkIn(e.target.value)}
              required
            />
          </WorkInput>
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
  );
}

export default Counselor;
