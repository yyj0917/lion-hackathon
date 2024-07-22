import '../styles/App.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from "../pages/login";
import SignUp from "../pages/signup";
import Main from '../pages/main';
import Layout from '../components/layout/Layout';
import RecieveCounselor from '../components/matching/ReceiveCounselor';
import Counselor from '../components/matching/Counselor';



function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Main />}>

            <Route path="counselor" element={<Counselor />} />
            <Route path="recieve-counsel" element={<RecieveCounselor />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
