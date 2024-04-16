import React from 'react';
import ProfilePage from './pages/UserProfile/userprofile';
// import Login from './pages/LogingPages/loging'; 
// import SignUp from './pages/SignUp/signup';


const App: React.FC = () => {
  return (
    <div className="App">
      {/* <Login />
      <SignUp/> */}
      <ProfilePage/>
    </div>
  );
}

export default App;
