import '../styles/App.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from "../pages/login";
// import SignUp from "../pages/signup";
import Main from '../pages/main';
import Layout from '../components/layout/Layout';
import RecieveCounselor from '../components/matching/ReceiveCounselor';
import Counselor from '../components/matching/Counselor';
import MyPage from '../components/MyPage/MyPage';
import SentimentResult from '../components/MyPage/SentimentResult';
import Sentiment from '../components/MyPage/Sentiment';
import PrivateDiary from '../components/MyPage/PrivateDiary';
import WritePost from '../components/diary/WritePost';
import Features from '../components/features/Features';
import Profile from '../components/MyPage/Profile';
import Matching from '../components/matching/Matching';
import DiaryModal from '../components/diary/DiaryModal';
import Posts from '../components/diary/Posts';
import SharedDiary from '../components/diary/SharedDiary';



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
              <Route path="/publicDiary/writeDiary" element={<WritePost />} />
              <Route path="/publicDiary/sharedDiary" element={<SharedDiary />} />
              <Route path="/publicDiary/:id" element={<DiaryModal />} />
              <Route path="/matching" element={<Matching />} />
              <Route path="/matching/counselor" element={<Counselor />} />
              <Route path="/matching/recieve-counsel" element={<RecieveCounselor />} />
            </Route>
            {/* 마이 페이지 루트로 라우팅 */}
            <Route path="/mypage" element={<MyPage />}>
              <Route path="" element={<PrivateDiary />} />
              <Route path="diary" element={<PrivateDiary />} />
              <Route path="sentiment" element={<Sentiment />} />
              <Route path="sentimentResult" element={<SentimentResult />} />
              <Route path="writeDiary" element={<WritePost />} />
            </Route>
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
