import React, { useState } from 'react';
import styled from 'styled-components';
import { UpdateUserInfoApi } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  max-width: 80%;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const SaveButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 10px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
`;

const ProfileModal = ({ user, onClose, onSave }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      name: user?.name,
      age: user?.age,
      position: user?.position,
      office: user?.office,
      phonenumber: user?.phonenumber,
      username: user?.username,
    });
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await UpdateUserInfoApi(
            formData?.name,
            formData?.age,
            formData?.position,
            formData?.office,
            formData?.phonenumber,
            formData?.username
        );
        alert('프로필이 수정되었습니다.');
        onSave(response);
        navigate('/mypage', {replace: true});
      } catch (error) {
        console.error(error);
        alert('프로필 수정에 실패했습니다.');
      }
    };
  
    return (
      <ModalBackground onClick={onClose}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={()=>navigate('/mypage')}>
            <span>&times;</span>
          </CloseButton>
          <h2>프로필 수정하기</h2>
          <Form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData?.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
            <input
              type="number"
              name="age"
              value={formData?.age}
              onChange={handleChange}
              placeholder="Age"
              required
            />
            <input
              type="text"
              name="position"
              value={formData?.position}
              onChange={handleChange}
              placeholder="Position"
              required
            />
            <input
              type="text"
              name="office"
              value={formData?.office}
              onChange={handleChange}
              placeholder="Office"
              required
            />
            <input
              type="text"
              name="phonenumber"
              value={formData?.phonenumber}
              onChange={handleChange}
              placeholder="Phone Number"
              required
            />
            <input
              type="text"
              name="username"
              value={formData?.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
            <SaveButton type="submit">저장하기</SaveButton>
          </Form>
        </ModalContainer>
      </ModalBackground>
    );
  };
  
export default ProfileModal;