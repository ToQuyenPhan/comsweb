import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import LoginPage from './pages/UserLoginPage';
import PartnerCodePage from './pages/PartnerCodePage';
import HomePage from './pages/HomePage';
import CreateTemplate from './pages/CreateTemplatePage';
import TemplateList from './pages/TemplateListPage';
import ContractDetails from './pages/ContractDetailsPage';
import ChooseTemplate from './pages/ChooseTemplatePage';
import ContractList from './pages/ContractListPage';
import Contract from './pages/CreateContractPage';

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
      <Route exact path="/contract-details" element={<ContractDetails/>}/>
      <Route exact path="/choose-template" element={<ChooseTemplate/>}/>
      <Route exact path="/contract" element={<ContractList/>}/>
      <Route exact path="/create-contract" element={<Contract/>}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
