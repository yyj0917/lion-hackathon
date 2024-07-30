import "../styles/App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Login from "../pages/login";
import Main from "../pages/main";
import Layout from "../components/layout/Layout";
import CounselorList from "../components/matching/Receive-counselor/CounselorList";
import Counselor from "../components/matching/Give-counselor/Counselor";
import RandomMatching from "../components/matching/Receive-counselor/RandomMatching";
import MyPage from "../components/MyPage/MyPage";
import SentimentResult from "../components/MyPage/SentimentResult";
import Sentiment from "../components/MyPage/Sentiment";
import PrivateDiary from "../components/MyPage/PrivateDiary/PrivateDiary";
import Features from "../components/features/Features";
import Matching from "../components/matching/Matching";
import DiaryModal from "../components/diary/DiaryModal";
import Posts from "../components/diary/Posts";
import SharedDiary from "../components/diary/SharedDiary";
import DiaryDetail from "../components/MyPage/PrivateDiary/DiaryDetail";
import WritePublicDiary from "../components/diary/WritePublicDiary";
import WritePrivateDiary from "../components/MyPage/PrivateDiary/WritePrivateDiary";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup" element={<SignUp />} /> */}
          <Route path="/" element={<Main />}>
            {/* 기본 페이지 - 공유일기 / 동료 매칭 - 라우팅으로 움직이기 */}
            <Route path="/" element={<Features />}>
              <Route path="/" element={<Posts />} />
              <Route
                path="/publicDiary/writePublicDiary"
                element={<WritePublicDiary />}
              />
              <Route
                path="/publicDiary/sharedDiary"
                element={<SharedDiary />}
              />
              <Route path="/publicDiary/:id" element={<DiaryModal />} />
              <Route path="/matching" element={<Matching />} />
              <Route path="/matching/counselor" element={<Counselor />} />
              <Route
                path="/matching/counselor-list"
                element={<CounselorList />}
              />
              <Route path="/matching/randomMatching/" element={<RandomMatching />} />
            </Route>
            {/* 마이 페이지 루트로 라우팅 */}
            <Route path="/mypage" element={<MyPage />}>
              <Route path="" element={<PrivateDiary />} />
              <Route path="privateDiary" element={<PrivateDiary />} />
              <Route path="privateDiary/:id" element={<DiaryDetail />} />

              <Route path="sentiment" element={<Sentiment />} />
              <Route path="sentimentResult" element={<SentimentResult />} />
              <Route path="writePrivateDiary" element={<WritePrivateDiary />} />
            </Route>
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
