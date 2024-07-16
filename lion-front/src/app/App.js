import '../styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "../pages/login";
import SignUp from "../pages/signup";
import Main from '../pages/main';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
