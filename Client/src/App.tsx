import React from "react";
import ProfilePage from "./pages/UserProfile/userprofile";
import Login from "./pages/LogingPage/LoginPage";
import SignUp from "./pages/SignUp/SignUp";

const App: React.FC = () => {
  return (
    <div className="App">
      <Login />
      <SignUp />
      <ProfilePage />
    </div>
  );
};

export default App;
