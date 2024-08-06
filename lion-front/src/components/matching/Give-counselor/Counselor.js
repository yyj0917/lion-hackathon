// Counselor.js
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { WriteCounselorApi } from '../../../api/matching';

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
  height: 70%;
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
    background-color: #FF5A5A;
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

const CheckBoxInput = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 10px;

  &:checked + span {
    color: #007bff;
    border-radius: 4px;
  }
`;
const TextCard = styled.div`
  border: 1px solid #e0e0e0; /* 테두리 */
  display: flex;
  width: 80%;
  height: 30%;
  border-radius: 8px;
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  p {
    font-family: 'Courier', sans-serif;
    font-size: 14px; /* 글자 크기 */
    color: #333; /* 글자 색상 */
    margin: 0; /* 마진 제거 */
    line-height: 1.5; /* 줄 간격 */
    
  }
`;

function Counselor() {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // const [formWrite, setFormWrite] = useState(false);
  const [advisor_name, setAdvisor_name] = useState('');
  const [work_experience, setWork_experience] = useState('');
  const [openlink, setOpenlink] = useState('');
  const [giveTalk, setGiveTalk] = useState('');
  const [categories, setCategories] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await WriteCounselorApi(
        advisor_name,
        work_experience,
        openlink,
        giveTalk,
        categories
      );
      console.log(categories);
      setAdvisor_name('');
      setOpenlink('');
      setGiveTalk('');
      setWork_experience('');
      setCategories([]);
      alert('제출이 완료되었습니다.');
      navigate(-1);
    } catch (error) {
      console.error('Error creating diary entry:', error);
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
        <p>**Gate Keeper 신청 주의사항**
          <br/>
          <br/> 1. Gate Keeper는 익명으로 오픈채팅방을 개설한 뒤 하단의 폼을 작성합니다.
          <br/> 2. 닉네임:자유, 근무기간:숫자, 오픈채팅방:링크, 카테고리는 복수선택이 가능합니다. 
          <br/> 3. Gate Keeper가 되어 어려움을 겪고 있는 동료에게 힘이 되어주세요.
        </p>
      </TextCard>
      <FormPosts onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="원하는 닉네임"
          defaultValue={advisor_name}
          onChange={(e) => setAdvisor_name(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="근무기간"
          defaultValue={work_experience}
          onChange={(e) => setWork_experience(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="오픈채팅방 링크"
          defaultValue={openlink}
          onChange={(e) => setOpenlink(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="하고 싶은 말"
          defaultValue={giveTalk}
          onChange={(e) => setGiveTalk(e.target.value)}
          required
        />
        <CheckBoxGroup>
          <label>
            <CheckBoxInput
              type="checkbox"
              value="mental"
              onChange={handleCategoryChange}
            />
            <span>정신건강</span>
          </label>
          <label>
            <CheckBoxInput
              type="checkbox"
              value="stress"
              onChange={handleCategoryChange}
            />
            <span>직업적 스트레스</span>
          </label>
          <label>
            <CheckBoxInput
              type="checkbox"
              value="physical"
              onChange={handleCategoryChange}
            />
            <span>신체건강</span>
          </label>
          <label>
            <CheckBoxInput
              type="checkbox"
              value="relationship"
              onChange={handleCategoryChange}
            />
            <span>대인관계</span>
          </label>
        </CheckBoxGroup>
        <button type="submit">Submit</button>
      </FormPosts>
    </Wrapper>
  );
}

export default Counselor;
