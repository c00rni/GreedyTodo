import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import LandingPage from "./LandingPage";
import SignInPage from "./SignInPage";

function App() {
  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/a/" element={<LoginPage />}></Route>
        <Route path="/app/mylist" element={<LandingPage/>}></Route>
        <Route path="/a/signup" element={<SignInPage />}></Route>
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
