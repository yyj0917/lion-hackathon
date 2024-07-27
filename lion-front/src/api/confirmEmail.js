import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from './axiosConfig';
import { useNavigate } from 'react-router-dom';

const ConfirmEmail = () => {
    const {key} = useParams;
    const navigate = useNavigate();

    useEffect(() => {
        const confirmEmail = async () => {
            try {
                await axiosInstance.get(`/user/account-confirm-email/${key}/`);
                alert('이메일 인증 성공!');
                navigate('/login');
            } catch (error) {
                alert('이메일 인증 실패');
            }
        };
        confirmEmail();
    }, [key, navigate]);

    return <div>이메일 인증 중...</div>
};

export default ConfirmEmail;