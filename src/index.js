import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import LoginPage from './pages/UserLoginPage';
import PartnerCodePage from './pages/PartnerCodePage';
import HomePage from './pages/HomePage';
import CreateTemplate from './pages/CreateTemplatePage';
import TemplateList from './pages/TemplateListPage';
import AuditReportPage from './pages/AuditReportPage';
import CategoryListPage from './pages/CategoryListPage';
import ServiceListPage from './pages/ServiceListPage';
import ChooseTemplate from './pages/ChooseTemplatePage';
import ContractList from './pages/ContractListPage';
import Contract from './pages/CreateContractPage';
import EditTemplate from './pages/EditTemplatePage';
import WaitingContracts from './pages/WaitingContracstsPage';
import ApproveContracts from './pages/ApproveContractsPage';
import RejectedContracts from './pages/RejectedContractsPage';
import PartnerWaitingContracts from './pages/PartnerWaitngContractsPage';
import PartnerApprovedContracts from './pages/PartnerApprovedContractsPage';
import ContractDetails from './pages/ContractDetailsPage';
import ApproveContractDetails from './pages/ApproveContractDetailsPage';
import PartnerApproveContractDetails from './pages/PartnerApproveContractDetailsPage';
import TemplateDetails from './pages/TemplateDetailsPage';
import LiquidationRecordListPage from './pages/LiquidationRecordListPage';
import LiquidationRecordDetailsPage from './pages/LiquidationRecordDetailsPage';

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
      <Route exact path="/edit-template" element={<EditTemplate/>}/>
      <Route exact path="/audit-report" element={<AuditReportPage/>}/>
      <Route exact path="/category-list" element={<CategoryListPage/>}/>
      <Route exact path="/service-list" element={<ServiceListPage/>}/>
      <Route exact path="/choose-template" element={<ChooseTemplate/>}/>
      <Route exact path="/contract" element={<ContractList/>}/>
      <Route exact path="/create-contract" element={<Contract/>}/>
      <Route exact path="/waiting-contract" element={<WaitingContracts/>}/>
      <Route exact path="/approved-contract" element={<ApproveContracts/>}/>
      <Route exact path="/rejected-contract" element={<RejectedContracts/>}/>
      <Route exact path="/partner-waiting-contract" element={<PartnerWaitingContracts/>}/>
      <Route exact path="/partner-approve-contract" element={<PartnerApprovedContracts/>}/>
      <Route exact path="/contract-details" element={<ContractDetails/>}/>
      <Route exact path="/approve-contract-details" element={<ApproveContractDetails/>}/>
      <Route exact path="/partner-approve-contract-details" element={<PartnerApproveContractDetails/>}/>
      <Route exact path="/template-details" element={<TemplateDetails/>}/>
      <Route exact path="/liquidation-record" element={<LiquidationRecordListPage/>}/>
      <Route exact path="/liquidation-record-details" element={<LiquidationRecordDetailsPage/>}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
