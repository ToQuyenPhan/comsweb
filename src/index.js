import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import LoginPage from './pages/UserLoginPage';
import PartnerCodePage from './pages/PartnerCodePage';
import HomePage from './pages/HomePage';
import CreateTemplate from './pages/CreateTemplatePage';
import TemplateList from './pages/TemplateListPage';
import CreateContract from './pages/CreateContractPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import SaleManagerDashboardPage from './pages/SaleManagerDashboardPage';
import AuditReportPage from './pages/AuditReportPage';
import CategoryListPage from './pages/CategoryListPage';
import ServiceListPage from './pages/ServiceListPage';

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
      <Route exact path="/create-contract" element={<CreateContract/>}/>
      <Route exact path="/admin-dashboard" element={<AdminDashboardPage/>}/>
      <Route exact path="/sale-manager-dashboard" element={<SaleManagerDashboardPage/>}/>
      <Route exact path="/audit-report" element={<AuditReportPage/>}/>
      <Route exact path="/category-list" element={<CategoryListPage/>}/>
      <Route exact path="/service-list" element={<ServiceListPage/>}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
