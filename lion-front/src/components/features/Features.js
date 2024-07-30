import styled, { keyframes } from "styled-components";
import Tab from "./Tab";
import {
  AlignJustify,
  House,
  NotebookTabs,
  Pen,
  Search,
  Undo2,
} from "lucide-react";
import { useEffect, useState } from "react";
import Tooltip from "../../utils/Tooltip";
import { useLocation, useNavigate } from "react-router-dom";

const slideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrapper = styled.div`
  width: 70%;
  margin-left: 5px;
  /* height: 740px; */
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  height: 100%;
  position: relative;
`;
const Back = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  box-shadow: 0 0px 5px rgba(0, 0, 0, 0.1);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f44336;
  &:hover {
    background-color: #f7f7f7;
  }
`;
const HomeRedirect = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  box-shadow: 0 0px 5px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f44336;
  &:hover {
    background-color: #f7f7f7;
  }
`;
const FilterAndWrite = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition:
    opacity 0.5s,
    visibility 0.5s;
  width: 40px;
  height: 250px;
  right: 20px;
  bottom: 10px;
  justify-content: center;

  /* box-shadow: 0 0px 5px rgba(0, 0, 0, 0.1); */
  border-radius: 20px;
`;
const ModalBtn = styled.div`
  opacity: 0;
  /* transform: translateY(20px); */
  animation: ${({ delay }) => delay}ms ${slideUp} forwards;

  width: 50px;
  height: 50px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FF5A5A;
  color: white;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.5);
  }
`;
// const WriteDiv = styled.div`
//     font-size: 24px;
//     opacity: 0;
//     transform: translateY(20px);
//     animation: ${({ delay }) => delay}ms ${slideUp} forwards;
//     width: 40px;
//     height: 40px;
//     box-shadow: 0 0px 5px rgba(0,0,0,0.1);
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     color: #f44336;
//     cursor: pointer;
//     &:hover {
//         background-color: #f7f7f7;
//     }
// `;
export default function Features() {
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const [tooltip, setTooltip] = useState(null);
  const location = useLocation();
  const isPath = location.pathname.startsWith('/matching');

  const showTooltip = (text) => setTooltip(text);
  const hideTooltip = () => setTooltip(null);
  return (
    <Wrapper>
      <HomeRedirect>
        <House onClick={() => navigate("/")} style={{ color: "#FF5A5A" }} />
      </HomeRedirect>
      {(!isPath) && (
        <FilterAndWrite>
            <ModalBtn 
                delay={100}
                onMouseEnter={() => showTooltip("검색")}
                onMouseLeave={hideTooltip}
                >
                <Search/>
                {tooltip === "검색" && <Tooltip text="검색" />}
            </ModalBtn>
            <ModalBtn 
                delay={200} 
                onClick={()=>navigate('/publicDiary/writePublicDiary')}
                onMouseEnter={() => showTooltip("일기 작성")}
                onMouseLeave={hideTooltip}
                    >
                <Pen/>
                {tooltip === "일기 작성" && <Tooltip text="일기 작성" />}
            </ModalBtn>
            <ModalBtn 
                delay={300}
                onClick={()=>navigate('/publicDiary/sharedDiary')}
                onMouseEnter={() => showTooltip("내가 쓴 공유 일기")}
                onMouseLeave={hideTooltip}
                >
                <NotebookTabs />
                {tooltip === "내가 쓴 공유 일기" && <Tooltip text="내가 쓴 공유 일기" />}
            </ModalBtn>
        </FilterAndWrite>
            )}
      <Tab />
      <Back onClick={() => navigate(-1)}>
        <Undo2 style={{ color: "#FF5A5A" }} />
      </Back>
    </Wrapper>
  );
}
