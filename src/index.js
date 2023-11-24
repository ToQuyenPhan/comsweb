import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import LoginPage from './pages/UserLoginPage';
import PartnerCodePage from './pages/PartnerCodePage';
import HomePage from './pages/HomePage';
import CreateTemplate from './pages/CreateTemplatePage';
import TemplateList from './pages/TemplateListPage';
import ChooseService from './pages/ChooseServicePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<LoginPage/>}/>
      <Route exact path="/login" element={<LoginPage/>}/>
      <Route exact path="/partner-code" element={<PartnerCodePage/>}/>
      <Route exact path="/home" element={<HomePage/>}/>
      <Route exact path="/template" element={<TemplateList />}/>
      <Route exact path="/create-template" element={<CreateTemplate/>}/>
      <Route exact path="/choose-service" element={<ChooseService/>}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
