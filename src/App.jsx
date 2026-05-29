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
import AgentHome from "./routes/agent/index";
import AgentPIP from "./routes/agent/pip.index";
import AgentPIPAcknowledge from "./routes/agent/pip.acknowledge";
import AgentCAP from "./routes/agent/cap.index";
import AgentCAPAcknowledge from "./routes/agent/cap.acknowledge";
import QAHome from "./routes/qa/index";
import QARecommendation from "./routes/qa/recommendation";
import QADisputes from "./routes/qa/disputes";
import ManagerHome from "./routes/manager/index";
import ManagerDepartments from "./routes/manager/departments";
import AdminHome from "./routes/admin/index";
import AdminTriggers from "./routes/admin/triggers";
import AdminTemplates from "./routes/admin/templates";
import AdminEmailTemplates from "./routes/admin/email-templates";
import AdminRoles from "./routes/admin/roles";
import AdminDepartments from "./routes/admin/departments";
import AuditDashboard from "./routes/audit";
import PIPDashboard from "./routes/pip/index";
import AllPIPCases from "./routes/pip/cases.index";
import PIPDetail from "./routes/pip/cases.$caseId";
import CAPDashboard from "./routes/cap/index";
import AllCAPCases from "./routes/supervisor/cases.index";
import CAPDetail from "./routes/supervisor/cases.$caseId";
import CAPNew from "./routes/cap/new";
import CAPExceptions from "./routes/cap/exceptions";
import PIPApprovals from "./routes/pip/approvals";
import PIPCandidatesGlobal from "./routes/pip/candidates";

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
          </Route>

          <Route path="manager">
            <Route index element={<ManagerHome />} />
            <Route path="departments" element={<ManagerDepartments />} />
          </Route>

          <Route path="admin">
            <Route index element={<AdminHome />} />
            <Route path="triggers" element={<AdminTriggers />} />
            <Route path="templates" element={<AdminTemplates />} />
            <Route path="email-templates" element={<AdminEmailTemplates />} />
            <Route path="roles" element={<AdminRoles />} />
            <Route path="departments" element={<AdminDepartments />} />
          </Route>

          <Route path="audit" element={<AuditDashboard />} />

          <Route path="pip">
            <Route index element={<PIPDashboard />} />
            <Route path="candidates" element={<PIPCandidatesGlobal />} />
            <Route path="cases" element={<AllPIPCases />} />
            <Route path="cases/:caseId" element={<PIPDetail />} />
            <Route path="approvals" element={<PIPApprovals />} />
          </Route>

          <Route path="cap">
            <Route index element={<CAPDashboard />} />
            <Route path="cases" element={<AllCAPCases />} />
            <Route path="cases/:caseId" element={<CAPDetail />} />
            <Route path="new" element={<CAPNew />} />
            <Route path="exceptions" element={<CAPExceptions />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
