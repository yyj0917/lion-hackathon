import { BarChart4, CircleUser, Laugh, Notebook, SquarePen } from "lucide-react";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";


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
    width: 20%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 20px;
    margin-right: 5px;
    align-items: center;
    p {
        cursor: pointer;
        box-shadow: 0 0px 5px rgba(0,0,0,0.1);
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
    }
`;
const Contents = styled.div`
    margin-left: 5px;
    width: 75%;
    height: 90%;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export default function MyPage() {
    const navigate = useNavigate();
    return (
        <Wrapper>
            <Navbar>
                <p onClick={() => navigate('/mypage')}><CircleUser/></p>
                <p onClick={() => navigate('/mypage/diary')}><Notebook/></p>
                <p onClick={() => navigate('/mypage/sentiment')}><Laugh/></p>
                <p onClick={() => navigate('/mypage/sentimentResult')}><BarChart4/></p>
                <p onClick={() => navigate('/mypage/writeDiary')}><SquarePen/></p>
            </Navbar>
            <Contents>
                <Outlet/>
            </Contents>
        </Wrapper>
    )
}