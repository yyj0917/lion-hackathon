import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { WritePrivateDiaryApi } from '../../../api/privateDiary';

const Wrapper = styled.div`
  width: 100%;
  height: 90%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;
const FormPosts = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 300px; /* 고정된 높이 설정 */
  height: 100%;
  box-sizing: border-box;
  padding: 20px;

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
    background-color: #ff5a5a;
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
function WritePrivateDiary() {
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await WritePrivateDiaryApi(title, body, date);
      console.log('Diary entry created:', response.data);
      setTitle('');
      setBody('');
      setDate('');
      alert('제출이 완료되었습니다.');
      navigate('/mypage/privateDiary');
    } catch (error) {
      console.error('Error creating diary entry:', error);
    }
  };

  return (
    <Wrapper>
      <FormPosts onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          value={body}
          placeholder="내용을 입력하세요"
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </FormPosts>
    </Wrapper>
  );
}

export default WritePrivateDiary;
