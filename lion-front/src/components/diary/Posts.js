import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReadPostsApi } from "../../api/diary";
import { HandMetal, HeartHandshake, PartyPopper, ThumbsUp } from "lucide-react";
import { isAuthenticated } from "../../utils/auth";
import { useSearch } from "../../contexts/SearchContext";

// export default Diary;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const PostWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: wrap;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 1px;
`;
const Post = styled.div`
  &:hover {
    background-color: #f9f9f9;
  }
  width: 100%;
  height: 25%;
  padding: 5px;
  margin-bottom: -1px;
  box-sizing: border-box;
  border: 1px solid #ddd;


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
    margin: 0;
    margin-bottom: 4px;
    max-height: 100px;
    line-height: 20px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
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
  border: 1px solid #ddd;
  padding: 3px;
    border-radius: 10px;
`;
const PostFooter = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  padding: 10px 0;
  label {
    margin: 0 5px;
    color: black;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    border-radius: 20px;
    width: 20px;
    text-align: center;
    height: auto;
  }
  .active {
    background-color: #ff5a5a;
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
  const postsPerPage = 4;
  const navigate = useNavigate();
  const { searchTerm } = useSearch();

  // Post list 전부 가져오기
  const handlePostVerify = () => {
    if (!isAuthenticated()) {
      alert("로그인 후 이용해주세요.");
      navigate("/login", {replace: 'true'}); // 로그인 페이지로 리디렉트
    }
  };
  const fetchPosts = async () => {
    try {
      const response = await ReadPostsApi();
      setPosts(response);
    } catch (error) {
      console.error("Error creating diary entry:", error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  // 검색어에 따른 필터링
  const filteredPosts = posts.filter(
    post =>
      post.title.includes(searchTerm) ||
      post.body.includes(searchTerm)
  );

  // 1페이지당 4개의 일기 -> 현재 페이지에 보여줄 일기 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Array.isArray(filteredPosts)
    ? filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
    : [];

  // 페이지네이션 페이지 수 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredPosts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Wrapper>
      <PostWrapper>
        {currentPosts.map((post) => (
          <Post key={post.id} className="diary-card"
                onClick={handlePostVerify}>
            <Link to={`/publicDiary/${post.id}`}>
              <Desc>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h2>{post.title}</h2>
                    <h2>{post.user.username}</h2>
                  </div>
                  <p>{post.body}</p>
                </div>
                <div className="info">
                  <IconSpan>
                    <span>
                      <ThumbsUp size={16} style={{ color: "#0064FF" }} /> 0
                    </span>
                    <span>
                      <PartyPopper size={16} style={{ color: "#008C8C" }} /> 2
                    </span>
                    <span>
                      <HandMetal size={16} style={{ color: "#FF8200" }} /> 0
                    </span>
                    <span>
                      <HeartHandshake size={16} style={{ color: "#FF5A5A" }} />{" "}
                      0
                    </span>
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
      <PostFooter>
        {pageNumbers.map((number) => (
          <label
            key={number}
            className={`${currentPage === number ? "active" : ""}`}
          >
            <input
              type="checkbox"
              checked={currentPage === number}
              onChange={() => setCurrentPage(number)}
            />
            {number}
          </label>
        ))}
      </PostFooter>
    </Wrapper>
  );
}
