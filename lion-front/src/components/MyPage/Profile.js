import React from "react";
import styled from "styled-components";
import { SquareUser } from "lucide-react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px; /* 원하는 간격으로 설정하세요 */
  height: 90%; /* 전체 화면 높이 */
  width: 90%;
  padding: 20px;
`;
const ProfileInfo = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid black;
  width: 100%;
  height: 50%;
  .profile-icon {
    display: flex;
    width: 30%;
    height: 80%;
    justify-content: center;
    align-items: center;
    color: #f44336;
    .user {
      width: 100%;
      height: 100%;
    }
  }
  .profile-card-text {
    width: 60%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
  p {
    font-family: "Dongle", sans-serif;
    font-weight: 400;
    font-style: normal;
    margin: 5px 0;
    font-size: 20px;
    line-height: 1.5;
  }
`;
const ProfileEtc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  width: 100%;
  height: 50%;

  p {
    margin: 5px 0;
    font-size: 18px;
    line-height: 1.5;
  }
`;
const Profile = () => {
  return (
    <Wrapper>
      <ProfileInfo>
        <div className="profile-icon">
          <SquareUser className="user" strokeWidth={1} />
        </div>
        <div className="profile-card-text">
          <p>닉네임: 소방가이</p>
          <p>이름: 윤영준</p>
          <p>나이: 25</p>
          <p>근무하는 곳: 경기도 소방청</p>
          <p>휴대폰번호: 010-6720-2807</p>
        </div>
      </ProfileInfo>
      <ProfileEtc>Additional Information</ProfileEtc>
    </Wrapper>
  );
};

export default Profile;
