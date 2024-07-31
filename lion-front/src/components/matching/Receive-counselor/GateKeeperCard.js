import { Award, CircleUserRound, MessageSquareText, SquareMousePointer } from "lucide-react";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    gap: 40px;
`;
const CardWrapper = styled.div`
    width: 300px;
    height: 400px;
    background: #fff;
    border-radius: 15px;
    border: 5px solid #fff;
    overflow: hidden;
    color: #616161;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 
              0 6px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: pointer;
    transition: all .2s ease-in-out;
    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2), 
                    0 16px 40px rgba(0, 0, 0, 0.2);
  }
`;
const CardHeader = styled.div`
    height: 200px;
    width: 100%;
    background: red;
    border-radius:100% 0% 100% 0% / 0% 50% 50% 100%;
    display: grid;
    place-items: center;
    background: linear-gradient(to bottom left, #f12711, #f5af19);

`;
const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
    width: 80%;
    margin: 0 auto;
    height: auto;
    h3 {
        text-align: center;
        text-transform: uppercase;
        font-size: 16px;
        margin-top: 15px;
        margin-bottom: 20px;
        font-family: 'Sunflower', sans-serif;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 10px;
    }
    p {
        text-align: center;
        font-size: 12px;
        /* margin-bottom: 20px; */
    }
    button {
        border: none;
        border-radius: 100px;
        padding: 5px 30px;
        color: #fff;
        margin-bottom: 15px;
        text-transform: uppercase;
        background: linear-gradient(to left, #f12711, #f5af19);

    }
`;
const Intro = styled.div`
    display: flex;
    justify-content: center;

`;
const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    p {
        font-family: 'Sunflower', sans-serif;
        font-weight: 700;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 10px;
        font-size: 16px;
        display: flex;
        justify-content: space-between;
    }
`;
const Others = styled.div`
    display: flex;
    gap: 10px;
    button {
        border-radius: 8px;
        font-family: 'Sunflower', sans-serif;
        font-weight: 700;
        
    }

`;
export default function GakeKeeperCard({ gatekeeper }) {
    const [gateKeeper, setGateKeeper] = useState([]);
    useEffect(() => {
        setGateKeeper({
            id: 1,
            name: "홍길동",
            age: 30,
            work_experience: "5년",
            position: "소방교",
            workplace: "서울시청",
            comment: "항상 응원합니다!",
            link: "https://open.kakao.com/o/sdEKmaEg",
            category: "정신건강",
          })
    }, []);
    // 백에서 랜덤매칭된 게이트 키퍼 정보 받아오기

    return (
        <Container>
            <CardWrapper>
                <CardHeader>
                    <CircleUserRound size={100} color="white"/>
                </CardHeader>
                <CardContent>
                    <Intro>
                        <h3>{gateKeeper.name}  ({gateKeeper.age}) <SquareMousePointer strokeWidth="3" color="#FF8200" /></h3>
                    </Intro>
                    <Info>
                        <p><Award/>{gateKeeper.work_experience} / {gateKeeper.position} / {gateKeeper.workplace}</p>
                        <p><MessageSquareText/>{gateKeeper.comment}</p>
                    </Info>
                    <Others>
                        <button>{gateKeeper.category}</button>
                        <button>신체건강</button>
                    </Others>
                </CardContent>
            </CardWrapper>
            
        </Container>
    );
}