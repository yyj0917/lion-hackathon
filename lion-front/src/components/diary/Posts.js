
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReadPostsApi } from "../../api/diary";
import DiaryModal from "./DiaryModal";

// const Diary = () => {
//     const [diaryEntries, setDiaryEntries] = useState([]);

//     const handleEntrySubmit = (event) => {
//         event.preventDefault();
//         // Get the value of the input field or textarea
//         const entry = event.target.elements.entry.value;
//         // Update the diary entries state with the new entry
//         setDiaryEntries([...diaryEntries, entry]);
//         // Clear the input field or textarea
//         event.target.elements.entry.value = '';
//     };

//     return (
//         <div>
//             <h1>Diary Board</h1>
//             <ul>
//                 {diaryEntries.map((entry, index) => (
//                     <li key={index}>{entry}</li>
//                 ))}
//             </ul>
//             <form onSubmit={handleEntrySubmit}>
//                 <textarea name="entry" rows="4" cols="50" placeholder="Write your diary entry"></textarea>
//                 <br />
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// };

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
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-word;
        margin-bottom: 4px;
        max-height: 100px;
        line-height: 20px;
        white-space: normal;
        font-size: 14px;
        color: #444444;
    }
    .info {
        display: inline-flex;
        line-height: 18px;
        font-size: 12px;
        gap: 10px;
    }
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
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedDiary, setSelectedDiary] = useState(null);
    const postsPerPage = 4;
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
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // 페이지네이션 페이지 수 계산
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
    }

    return (
        <>
            <PostWrapper>
                {currentPosts.map(post => (
                    <Post key={post.id}  className="diary-card" onClick={
                        () => handleDiaryClick(post)}>
                        <Link>
                            <Desc>
                                <div>
                                    <h2>{post.title}</h2>
                                    <p>{post.body}</p>
                                </div>
                                <div className="info">
                                    <span>❤️ {post.likes}</span>
                                    <span>💬 {post.comments}</span>
                                    <span>{post.date}</span>
                                </div>
                            </Desc>
                        </Link>
                    </Post>
                ))}   
            </PostWrapper>
            {selectedDiary && <DiaryModal diary={selectedDiary} onClose={closeModal} />}
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