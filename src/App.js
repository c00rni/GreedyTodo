import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import LandingPage from "./LandingPage";
import SignUpPage from "./SIgnUpPage";

function App() {
  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/mylist" element={<LandingPage/>}></Route>
        <Route path="/signup" element={<SignUpPage/>}></Route>
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
