import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/common/header/Header";
import MainPage from "./components/common/mainpage/MainPage";
import Login from "./components/member/login/Login";
import FindId from "./components/member/find/FindId";
import FindPw from "./components/member/find/FindPw";
import SignUp from "./components/member/signup/SignUp";

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/find-id" element={<FindId />} />
                    <Route path="/find-pw" element={<FindPw />} />
                    <Route path="/sign-up" element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
