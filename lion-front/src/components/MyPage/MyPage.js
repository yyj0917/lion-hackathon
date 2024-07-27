import { BarChart4, CircleUser, Flame, Laugh, Notebook, SquarePen } from "lucide-react";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import profile from "../../assets/profileimages.png";

const Wrapper = styled.div`

    width: 70%;
    margin-left: 5px;
    /* height: 740px; */
    border-radius: 20px;
    display: flex;
    align-items: center;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    height: 100%;
    position: relative;

`;
const Navbar = styled.div`
    width: 30%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px 0;
    
`;
const Contents = styled.div`
    margin-left: 5px;
    width: 75%;
    height: 100%;
    border-radius: 0 20px 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(220, 220, 220, 0.3); /* 흐린 회색 배경색 */
    position: relative;
`;
const ImgWrapper = styled.div`
    width: 100%;
    height: 30%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    img {
        border-radius: 50%;
        width: 50%;
        height: 50%;
    }
    span {
        position: absolute;
        bottom: 50px;
        right: 10px;
    }
    p {
        width: 100%;
        display: flex;
        justify-content: center;
        font-family: "Dongle", sans-serif;
        font-weight: 400;
        font-style: normal;
        font-size: 25px;
    
    }

`;
const IconWrapper = styled.div`
    height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .profile-text {
        display: flex;
        align-items: center; /* 세로 정렬 */
        margin-left: 10px; /* 아이콘과 텍스트 간의 간격 */
        font-size: 16px;
        line-height: 1.5;

    }
    p {
        cursor: pointer;
        position: relative;
        font-family: "Dongle", sans-serif;
        font-weight: 400;
        font-style: normal;
        font-size: 25px;
        width: 100px;
        height: 10px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: start;
        color: #f44336;
        gap: 5px;
        &:hover {
            background-color: #f7f7f7;
        }

    }
`;
export default function MyPage() {
    const navigate = useNavigate();

    // 여기서 토큰검증 및 유저정보를 가져오는 로직을 한번 해야함 -> 그렇게 받은 유저 정보들을
    // 각 컴포넌트에 넘겨줘서 사용할 수 있게 하는 거 짜야 함. 
    return (
        <Wrapper>
            <Navbar>
                <ImgWrapper>
                    <img src={profile} alt="profile"/>
                    {/* <span><Flame strokeWidth={4} style={{color: "#f44336", display:"flex", marginTop:"10%"}} /></span> */}
                    <div className="profile-text">
                        
                        <p>윤영준(25)/소방가이 <br /> 경기도 구리시 소방청 <br/> 010-6720-2807</p>
                    </div>
                </ImgWrapper>
                <IconWrapper>
                    <p onClick={() => navigate('/mypage/diary')}><Notebook/> Diary</p>
                    <p onClick={() => navigate('/mypage/sentiment')}><Laugh/> Feel</p>
                    <p onClick={() => navigate('/mypage/sentimentResult')}><BarChart4/> Analyze</p>
                    <p onClick={() => navigate('/mypage/writeDiary')}><SquarePen/> Write</p>
                </IconWrapper>
                </Navbar>
            <Contents>
                <Outlet/>
            </Contents>
        </Wrapper>
    )
}