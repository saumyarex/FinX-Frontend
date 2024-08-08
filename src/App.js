import React from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Home from './Pages/Home/Home';
import SetAvatar from './Pages/Avatar/setAvatar';
import CompoundInterestCalculator from './components/calculator/CompoundInterestCalculator';
import TaxCalculator from './components/calculator/TaxCalculator';
import News from './components/News';
import VerifyEmail from './components/VerifyEmail';
import VerifyPage from "./components/VerifyPage.js";
import Profile from './components/Profile.js';
import Blog from './components/Blog.js';
import BlogPost from './components/BlogPost.js';
import PasswordReset from './components/PasswordReset.js';
import PasswordResetRequest from './components/PasswordResetRequest.js';
const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/setAvatar" element={<SetAvatar />} />
          <Route path="/calculator" element={<CompoundInterestCalculator />} />
          <Route path="/tax-calculator" element={<TaxCalculator />} />
          <Route path="/news" element={<News/>}/>
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/verify-page" element={<VerifyPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/post/:id" element={<BlogPost />} />
          <Route path="/forgot-password" element={<PasswordResetRequest />} />
          <Route path="/reset-password" element={<PasswordReset />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
