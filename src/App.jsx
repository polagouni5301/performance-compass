import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Root from "./routes/__root";
import Index from "./routes/index";
import Landing from "./routes/landing";
import Hub from "./routes/hub";
import SupervisorHome from "./routes/supervisor/index";
import PIPCandidates from "./routes/supervisor/pip.candidates";
import PIPInitiate from "./routes/supervisor/pip.initiate";
import PIPReview from "./routes/supervisor/pip.review";
import CandidateDataView from "./routes/supervisor/pip.candidate-data";
import SupervisorPIPCases from "./routes/supervisor/pip.cases.index";
import SupervisorPIPDetail from "./routes/supervisor/pip.cases.$caseId";
import AgentHome from "./routes/agent/index";
import AgentPIP from "./routes/agent/pip.index";
import AgentPIPAcknowledge from "./routes/agent/pip.acknowledge";
import AgentCAP from "./routes/agent/cap.index";
import AgentCAPAcknowledge from "./routes/agent/cap.acknowledge";
import QAHome from "./routes/qa/index";
import QARecommendation from "./routes/qa/recommendation";
import QADisputes from "./routes/qa/disputes";
import QACAPCases from "./routes/qa/cases.index";
import QACAPDetail from "./routes/qa/cases.$caseId";
import QANew from "./routes/qa/new";
import ManagerHome from "./routes/manager/index";
import ManagerDepartments from "./routes/manager/departments";
import ManagerPIPApprovals from "./routes/manager/pip.approvals";
import ManagerCAPExceptions from "./routes/manager/cap.exceptions";
import ManagerPIPCases from "./routes/manager/pip.cases.index";
import ManagerPIPDetail from "./routes/manager/pip.cases.$caseId";
import ManagerCAPCases from "./routes/manager/cap.cases.index";
import ManagerCAPDetail from "./routes/manager/cap.cases.$caseId";
import AdminHome from "./routes/admin/index";
import AdminTriggers from "./routes/admin/triggers";
import AdminTemplates from "./routes/admin/templates";
import AdminEmailTemplates from "./routes/admin/email-templates";
import AdminRoles from "./routes/admin/roles";
import AdminDepartments from "./routes/admin/departments";
import AdminPIPCases from "./routes/admin/pip.cases.index";
import AdminPIPDetail from "./routes/admin/pip.cases.$caseId";
import AdminCAPCases from "./routes/admin/cap.cases.index";
import AdminCAPDetail from "./routes/admin/cap.cases.$caseId";
import AuditDashboard from "./routes/audit";
import SupervisorAllCAPCases from "./routes/supervisor/cases.index";
import SupervisorCAPDetail from "./routes/supervisor/cases.$caseId";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Index />} />
          <Route path="landing" element={<Landing />} />
          <Route path="hub" element={<Hub />} />

          <Route path="supervisor">
            <Route index element={<SupervisorHome />} />
            <Route path="pip/candidates" element={<PIPCandidates />} />
            <Route path="pip/candidate-data/:ohrId" element={<CandidateDataView />} />
            <Route path="pip/initiate" element={<PIPInitiate />} />
            <Route path="pip/review" element={<PIPReview />} />
            <Route path="pip/cases" element={<SupervisorPIPCases />} />
            <Route path="pip/cases/:caseId" element={<SupervisorPIPDetail />} />
            <Route path="cap/cases" element={<SupervisorAllCAPCases />} />
            <Route path="cap/cases/:caseId" element={<SupervisorCAPDetail />} />
          </Route>

          <Route path="agent">
            <Route index element={<AgentHome />} />
            <Route path="pip" element={<AgentPIP />} />
            <Route path="pip/acknowledge" element={<AgentPIPAcknowledge />} />
            <Route path="cap" element={<AgentCAP />} />
            <Route path="cap/acknowledge" element={<AgentCAPAcknowledge />} />
          </Route>

          <Route path="qa">
            <Route index element={<QAHome />} />
            <Route path="recommendation" element={<QARecommendation />} />
            <Route path="disputes" element={<QADisputes />} />
          <Route path="cases" element={<QACAPCases />} />
          <Route path="cases/:caseId" element={<QACAPDetail />} />
          <Route path="new" element={<QANew />} />
          </Route>

          <Route path="manager">
            <Route index element={<ManagerHome />} />
            <Route path="departments" element={<ManagerDepartments />} />
          <Route path="pip/approvals" element={<ManagerPIPApprovals />} />
          <Route path="cap/exceptions" element={<ManagerCAPExceptions />} />
          <Route path="pip/cases" element={<ManagerPIPCases />} />
          <Route path="pip/cases/:caseId" element={<ManagerPIPDetail />} />
          <Route path="cap/cases" element={<ManagerCAPCases />} />
          <Route path="cap/cases/:caseId" element={<ManagerCAPDetail />} />
          </Route>

          <Route path="admin">
            <Route index element={<AdminHome />} />
            <Route path="triggers" element={<AdminTriggers />} />
            <Route path="templates" element={<AdminTemplates />} />
            <Route path="email-templates" element={<AdminEmailTemplates />} />
            <Route path="roles" element={<AdminRoles />} />
            <Route path="departments" element={<AdminDepartments />} />
          <Route path="pip/cases" element={<AdminPIPCases />} />
          <Route path="pip/cases/:caseId" element={<AdminPIPDetail />} />
          <Route path="cap/cases" element={<AdminCAPCases />} />
          <Route path="cap/cases/:caseId" element={<AdminCAPDetail />} />
          </Route>

          <Route path="audit" element={<AuditDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
