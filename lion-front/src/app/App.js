import '../styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from "../pages/landing";
import Login from "../pages/login";
import SignUp from "../pages/signup";

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 1024px;
//   height: 100vh;
//   border: 3px solid black;
//   padding: 10px;
// `;



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;