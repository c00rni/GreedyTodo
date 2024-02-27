import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import LandingPage from "./LandingPage";
import SignInPage from "./SignInPage";

function App() {
  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/mylist" element={<LandingPage/>}></Route>
        <Route path="/signup" element={<SignInPage />}></Route>
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
