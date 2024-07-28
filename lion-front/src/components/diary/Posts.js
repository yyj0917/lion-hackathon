
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReadPostsApi } from "../../api/diary";
import DiaryModal from "./DiaryModal";
import { HandMetal, HeartHandshake, PartyPopper, ThumbsUp } from "lucide-react";


// export default Diary;
const PostWrapper = styled.div`
    flex: 1;
    height: 100%;
    width: 100%;
    /* margin-right: 5px; */
    border-radius: 10px;
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 처음에 4개의 요소가 꽉 차게 */
    grid-auto-rows: minmax(150px, auto); /* 각 행의 높이 */
    gap: 20px;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 20px;
    @media (max-width: 600px) {
    grid-template-columns: 1fr; /* 화면이 좁아지면 1열 */
    }

`;
const Post = styled.div`
    &:hover {
        background-color: #f9f9f9;
    }
    width: 100%;
    padding: 20px;
    margin-bottom: -1px;
    box-sizing: border-box;
    border-radius: 20px;

    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.1);

    background-color: #fff;
    border-width: 1px 0;
    a {
        color: #666;
        text-decoration: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
`;
const Desc = styled.div`
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    h2 {
        line-height: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
    }
    p {
        margin-bottom: 4px;
        max-height: 100px;
        line-height: 20px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-word;
        white-space: normal;
        font-size: 14px;
        color: #444444;
    }
    .info {
        display: inline-flex;
        line-height: 18px;
        font-size: 12px;
        justify-content: space-between;
        gap: 10px;
        
    }
`;
const IconSpan = styled.div`
    display: inline-flex;
    line-height: 18px;
    font-size: 12px;
    /* justify-content: space-between; */
    gap: 10px;
    span {  
        font-size: 16px;
        display: flex;
        gap: 5px;
        align-items: center;
    }
`;
const DateSpan = styled.div`
    text-align: center;
    border-bottom: 1px solid #dcdcdc;
`;
const PostFooter = styled.div`
    
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    padding: 10px 0;
    /* background-color: aliceblue; */
    /* background: #ffffff; */
    label {
        margin: 0 5px;
        color: black;
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
        cursor: pointer;
        border-radius: 20px;
        width: 20px;
        text-align: center;
        height: auto;

    }
    .active {
        background-color: #FF5A5A;
        color: #fff;
    }
    label input {
        display: none;

        &:checked + span {
            font-weight: bold;
            text-decoration: underline;
        }
    }
    label span {
        padding: 5px;
    }
`;

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [selectedDiary, setSelectedDiary] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 4;
    const navigate = useNavigate();
    // Post list 전부 가져오기
    const handleDiaryClick = (diary) => {
        setSelectedDiary(diary);
      };
    
    const closeModal = () => {
        setSelectedDiary(null);
    };
    const fetchPosts = async () => {
        try {
            const response = await ReadPostsApi();
            setPosts(response);
          } catch (error) {
            console.error('Error creating diary entry:', error);
          }
        }
    useEffect(() => {
        fetchPosts();
    }, []);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = Array.isArray(posts) ? posts.slice(indexOfFirstPost, indexOfLastPost) : [];

    // 페이지네이션 페이지 수 계산
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
    }

    return (
        <>
            <PostWrapper>
                {currentPosts.map(post => (
                    <Post key={post.id}  className="diary-card">
                        <Link to={`/publicDiary/${post.id}`}>
                            <Desc>
                                <div>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <h2>{post.title}</h2>
                                        <h2>닉네임</h2>
                                    </div>
                                    <p>{post.body}</p>
                                </div>
                                <div className="info">
                                    <IconSpan>
                                        <span><ThumbsUp size={16} style={{color: '#0064FF'}}/> 0</span>
                                        <span><PartyPopper size={16} style={{color: '#008C8C'}}/> 2</span>
                                        <span><HandMetal size={16} style={{color: '#FF8200'}}/> 0</span>
                                        <span><HeartHandshake size={16} style={{color: '#FF5A5A'}}/> 0</span>
                                    </IconSpan>
                                    <DateSpan>
                                        <span>{post.date}</span>
                                    </DateSpan>
                                </div>
                            </Desc>
                        </Link>
                    </Post>
                ))}   
            </PostWrapper>
            {/* {selectedDiary && <DiaryModal diary={selectedDiary} onClose={closeModal} />} */}
            <PostFooter>
                {pageNumbers.map(number => (
                            <label key={number} className={`${currentPage === number ? 'active' : ''}`}>
                                <input
                                type="checkbox"
                                checked={currentPage === number}
                                onChange={() => setCurrentPage(number)}
                                />
                                {number}
                            </label>
                    ))}
            </PostFooter>
        </>

    );
}