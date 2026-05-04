// Mock data for the CAP & PIP Consequence Management System
export type PIPStatus = "candidate" | "active" | "extended" | "closed-success" | "closed-failed" | "pending-approval";
export type CAPLevel = "CAP 1" | "CAP 2" | "CAP 3";
export type CAPStatus = "logged" | "accepted" | "disputed" | "exception-pending" | "closed" | "hr-escalation";
export type EmployeeType = "regular" | "apprentice";

export interface Employee {
  ohrId: string;
  name: string;
  email: string;
  type: EmployeeType;
  supervisor: string;
  manager: string;
  team: string;
  avatar?: string;
}

export interface PIPReview {
  number: 1 | 2 | 3 | 4 | 5 | 6;
  date: string;
  status: "pending" | "met" | "not-met" | "scheduled";
  feedback?: string;
  kpiScore?: number;
  targets?: string[];
}

export interface PIPCase {
  id: string;
  employee: Employee;
  status: PIPStatus;
  startDate: string;
  endDate: string;
  duration: number;
  triggerReason: string;
  consecutiveWarnings: number;
  warningsLast8Weeks: number;
  niLastMonth: number;
  niLast6Months: number;
  targets: string[];
  reviews: PIPReview[];
  acknowledgmentEmail?: string;
  acknowledgedAt?: string;
  documentVersion: number;
  extended: boolean;
}

export interface CAPCase {
  id: string;
  employee: Employee;
  level: CAPLevel;
  status: CAPStatus;
  breachType: string;
  breachDescription: string;
  raisedBy: string;
  raisedByTeam: "QA" | "Compliance";
  raisedAt: string;
  validUntil?: string;
  disputeAttempts: number;
  exceptionRequested: boolean;
  exceptionApprover?: string;
  history: { date: string; event: string; actor: string }[];
  acknowledgedAt?: string;
}

export interface PIPCandidate {
  employee: Employee;
  consecutiveWarnings: number;
  warningsLast8Weeks: number;
  niLastMonth: number;
  niLast6Months: number;
  triggerMet: boolean;
  identifiedAt: string;
  supervisorAcknowledged: boolean;
}

const employees: Employee[] = [
  { ohrId: "OHR-204871", name: "Aarav Mehta", email: "aarav.mehta@example.com", type: "regular", supervisor: "Priya Shah", manager: "Rohan Iyer", team: "Claims Ops" },
  { ohrId: "OHR-204912", name: "Sneha Kulkarni", email: "sneha.k@example.com", type: "apprentice", supervisor: "Priya Shah", manager: "Rohan Iyer", team: "Claims Ops" },
  { ohrId: "OHR-205033", name: "Marcus Bennett", email: "m.bennett@example.com", type: "regular", supervisor: "David Cole", manager: "Helena Park", team: "Underwriting" },
  { ohrId: "OHR-205117", name: "Liana Cortez", email: "l.cortez@example.com", type: "regular", supervisor: "David Cole", manager: "Helena Park", team: "Underwriting" },
  { ohrId: "OHR-205221", name: "Devansh Rao", email: "d.rao@example.com", type: "apprentice", supervisor: "Priya Shah", manager: "Rohan Iyer", team: "Claims Ops" },
  { ohrId: "OHR-205398", name: "Olivia Tan", email: "o.tan@example.com", type: "regular", supervisor: "Marcia Lin", manager: "Helena Park", team: "Customer Care" },
  { ohrId: "OHR-205502", name: "Kabir Joshi", email: "k.joshi@example.com", type: "regular", supervisor: "Marcia Lin", manager: "Helena Park", team: "Customer Care" },
];

export const pipCandidates: PIPCandidate[] = [
  { employee: employees[0], consecutiveWarnings: 3, warningsLast8Weeks: 5, niLastMonth: 1, niLast6Months: 2, triggerMet: true, identifiedAt: "2025-04-28", supervisorAcknowledged: false },
  { employee: employees[4], consecutiveWarnings: 2, warningsLast8Weeks: 6, niLastMonth: 0, niLast6Months: 2, triggerMet: true, identifiedAt: "2025-04-29", supervisorAcknowledged: true },
  { employee: employees[5], consecutiveWarnings: 3, warningsLast8Weeks: 4, niLastMonth: 1, niLast6Months: 1, triggerMet: true, identifiedAt: "2025-05-01", supervisorAcknowledged: false },
];

export const pipCases: PIPCase[] = [
  {
    id: "PIP-2025-0142",
    employee: employees[2],
    status: "active",
    startDate: "2025-03-18",
    endDate: "2025-05-17",
    duration: 60,
    triggerReason: "3 consecutive warnings + 2 NI ratings (last 6 months)",
    consecutiveWarnings: 3,
    warningsLast8Weeks: 6,
    niLastMonth: 1,
    niLast6Months: 2,
    targets: ["Maintain QA score ≥ 92%", "Average handle time ≤ 6:30", "Zero compliance breaches", "Attendance 100%"],
    reviews: [
      { number: 1, date: "2025-04-02", status: "met", kpiScore: 93, feedback: "Improved on QA. Continue focus on AHT.", targets: ["QA ≥ 92%"] },
      { number: 2, date: "2025-04-17", status: "not-met", kpiScore: 88, feedback: "QA dropped. Discussed root causes.", targets: ["QA ≥ 92%"] },
      { number: 3, date: "2025-05-02", status: "met", kpiScore: 94, feedback: "Strong recovery." },
      { number: 4, date: "2025-05-17", status: "scheduled" },
    ],
    acknowledgmentEmail: "RE_PIP_Acknowledgement_OHR-205033.eml",
    acknowledgedAt: "2025-03-19",
    documentVersion: 3,
    extended: false,
  },
  {
    id: "PIP-2025-0138",
    employee: employees[3],
    status: "extended",
    startDate: "2025-02-20",
    endDate: "2025-05-21",
    duration: 90,
    triggerReason: "6 warnings (last 8 weeks) + 1 NI rating (last month)",
    consecutiveWarnings: 2,
    warningsLast8Weeks: 6,
    niLastMonth: 1,
    niLast6Months: 1,
    targets: ["QA ≥ 90%", "AHT ≤ 7:00", "CSAT ≥ 4.4"],
    reviews: [
      { number: 1, date: "2025-03-07", status: "not-met", kpiScore: 85 },
      { number: 2, date: "2025-03-22", status: "met", kpiScore: 91 },
      { number: 3, date: "2025-04-06", status: "not-met", kpiScore: 86 },
      { number: 4, date: "2025-04-21", status: "not-met", kpiScore: 87 },
      { number: 5, date: "2025-05-06", status: "met", kpiScore: 92 },
      { number: 6, date: "2025-05-21", status: "scheduled" },
    ],
    documentVersion: 6,
    extended: true,
    acknowledgedAt: "2025-02-21",
    acknowledgmentEmail: "RE_PIP_Acknowledgement_OHR-205117.eml",
  },
  {
    id: "PIP-2025-0150",
    employee: employees[1],
    status: "pending-approval",
    startDate: "2025-04-01",
    endDate: "2025-05-31",
    duration: 60,
    triggerReason: "3 consecutive warnings + 1 NI rating (last month)",
    consecutiveWarnings: 3,
    warningsLast8Weeks: 4,
    niLastMonth: 1,
    niLast6Months: 1,
    targets: ["QA ≥ 88%", "AHT ≤ 7:30"],
    reviews: [
      { number: 1, date: "2025-04-16", status: "not-met", kpiScore: 82 },
      { number: 2, date: "2025-05-01", status: "not-met", kpiScore: 85 },
      { number: 3, date: "2025-05-16", status: "not-met", kpiScore: 84 },
      { number: 4, date: "2025-05-31", status: "not-met", kpiScore: 86 },
    ],
    documentVersion: 4,
    extended: false,
    acknowledgedAt: "2025-04-02",
    acknowledgmentEmail: "RE_PIP_Acknowledgement_OHR-204912.eml",
  },
  {
    id: "PIP-2025-0121",
    employee: employees[6],
    status: "closed-success",
    startDate: "2025-01-10",
    endDate: "2025-03-11",
    duration: 60,
    triggerReason: "6 warnings (last 8 weeks) + 2 NI ratings (last 6 months)",
    consecutiveWarnings: 2,
    warningsLast8Weeks: 6,
    niLastMonth: 0,
    niLast6Months: 2,
    targets: ["QA ≥ 90%"],
    reviews: [
      { number: 1, date: "2025-01-25", status: "met", kpiScore: 92 },
      { number: 2, date: "2025-02-09", status: "met", kpiScore: 93 },
      { number: 3, date: "2025-02-24", status: "not-met", kpiScore: 88 },
      { number: 4, date: "2025-03-11", status: "met", kpiScore: 94 },
    ],
    documentVersion: 4,
    extended: false,
    acknowledgedAt: "2025-01-11",
    acknowledgmentEmail: "RE_PIP_Acknowledgement_OHR-205502.eml",
  },
];

export const capCases: CAPCase[] = [
  {
    id: "CAP-2025-0481",
    employee: employees[0],
    level: "CAP 1",
    status: "accepted",
    breachType: "Data Handling",
    breachDescription: "Shared customer PII over unsecured channel during peak shift.",
    raisedBy: "Nikhil Anand",
    raisedByTeam: "QA",
    raisedAt: "2025-04-22",
    validUntil: "2025-07-21",
    disputeAttempts: 0,
    exceptionRequested: false,
    history: [
      { date: "2025-04-22", event: "CAP logged by QA", actor: "Nikhil Anand" },
      { date: "2025-04-23", event: "Supervisor accepted", actor: "Priya Shah" },
      { date: "2025-04-24", event: "Discussion meeting scheduled", actor: "System" },
    ],
    acknowledgedAt: "2025-04-25",
  },
  {
    id: "CAP-2025-0492",
    employee: employees[3],
    level: "CAP 2",
    status: "disputed",
    breachType: "Compliance — Process Deviation",
    breachDescription: "Bypassed mandatory verification step on 4 cases.",
    raisedBy: "Sara Iqbal",
    raisedByTeam: "Compliance",
    raisedAt: "2025-04-27",
    validUntil: "2025-07-26",
    disputeAttempts: 1,
    exceptionRequested: false,
    history: [
      { date: "2025-04-27", event: "CAP logged by Compliance", actor: "Sara Iqbal" },
      { date: "2025-04-28", event: "Supervisor disputed", actor: "David Cole" },
      { date: "2025-04-29", event: "Offline discussion logged", actor: "Sara Iqbal" },
    ],
  },
  {
    id: "CAP-2025-0467",
    employee: employees[5],
    level: "CAP 3",
    status: "hr-escalation",
    breachType: "Repeat Misconduct",
    breachDescription: "Third occurrence of unauthorized system access.",
    raisedBy: "Sara Iqbal",
    raisedByTeam: "Compliance",
    raisedAt: "2025-04-15",
    disputeAttempts: 0,
    exceptionRequested: false,
    history: [
      { date: "2025-04-15", event: "CAP logged by Compliance", actor: "Sara Iqbal" },
      { date: "2025-04-16", event: "Supervisor accepted", actor: "Marcia Lin" },
      { date: "2025-04-18", event: "Escalated to HR", actor: "System" },
    ],
    acknowledgedAt: "2025-04-17",
  },
  {
    id: "CAP-2025-0501",
    employee: employees[6],
    level: "CAP 1",
    status: "exception-pending",
    breachType: "Quality — Documentation",
    breachDescription: "Incomplete case notes flagged across audit sample.",
    raisedBy: "Nikhil Anand",
    raisedByTeam: "QA",
    raisedAt: "2025-05-01",
    validUntil: "2025-07-30",
    disputeAttempts: 0,
    exceptionRequested: true,
    exceptionApprover: "Helena Park (SDL)",
    history: [
      { date: "2025-05-01", event: "CAP logged by QA", actor: "Nikhil Anand" },
      { date: "2025-05-02", event: "Supervisor raised exception", actor: "Marcia Lin" },
      { date: "2025-05-02", event: "Supporting docs uploaded (2)", actor: "Marcia Lin" },
    ],
  },
  {
    id: "CAP-2025-0455",
    employee: employees[2],
    level: "CAP 2",
    status: "closed",
    breachType: "Compliance — Disclosure",
    breachDescription: "Failed to disclose conflict of interest within SLA.",
    raisedBy: "Sara Iqbal",
    raisedByTeam: "Compliance",
    raisedAt: "2025-03-08",
    validUntil: "2025-06-06",
    disputeAttempts: 2,
    exceptionRequested: false,
    history: [
      { date: "2025-03-08", event: "CAP logged", actor: "Sara Iqbal" },
      { date: "2025-03-10", event: "Disputed (1/2)", actor: "David Cole" },
      { date: "2025-03-12", event: "Disputed (2/2)", actor: "David Cole" },
      { date: "2025-03-14", event: "Final acceptance", actor: "David Cole" },
      { date: "2025-03-16", event: "Acknowledged by agent", actor: "Marcus Bennett" },
      { date: "2025-03-18", event: "Closed", actor: "System" },
    ],
    acknowledgedAt: "2025-03-16",
  },
];

export function findEmployee(ohrId: string): Employee | undefined {
  return employees.find((e) => e.ohrId.toLowerCase() === ohrId.toLowerCase());
}

export function getEmployees(): Employee[] {
  return employees;
}

export function getCAPHistoryForEmployee(ohrId: string): CAPCase[] {
  return capCases.filter((c) => c.employee.ohrId === ohrId);
}

export function recommendCAPLevel(ohrId: string, breachType: string): CAPLevel {
  const past = getCAPHistoryForEmployee(ohrId);
  const sameBreach = past.filter((c) => c.breachType === breachType);
  if (sameBreach.length >= 2) return "CAP 3";
  if (sameBreach.length === 1) return "CAP 2";
  if (past.length >= 2) return "CAP 2";
  return "CAP 1";
}

export type DepartmentChannel = "voice" | "messaging" | "cdt";

export interface Department {
  name: string;
  channel: DepartmentChannel;
  headcount: number;
  activePIP: number;
  openCAP: number;
  manager: string;
}

export const departments: Department[] = [
  { name: "C3 Support", channel: "voice", headcount: 142, activePIP: 6, openCAP: 9, manager: "Rohan Iyer" },
  { name: "Website Security Support", channel: "voice", headcount: 88, activePIP: 3, openCAP: 5, manager: "Helena Park" },
  { name: "The Ranch", channel: "voice", headcount: 64, activePIP: 2, openCAP: 4, manager: "Marcia Lin" },
  { name: "Messaging - India General", channel: "messaging", headcount: 120, activePIP: 5, openCAP: 7, manager: "Rohan Iyer" },
  { name: "Messaging - RoW General", channel: "messaging", headcount: 96, activePIP: 4, openCAP: 6, manager: "Rohan Iyer" },
  { name: "Messaging - General", channel: "messaging", headcount: 78, activePIP: 2, openCAP: 3, manager: "Helena Park" },
  { name: "Messaging - Hosting", channel: "messaging", headcount: 54, activePIP: 1, openCAP: 2, manager: "Helena Park" },
  { name: "Messaging - Sales", channel: "messaging", headcount: 70, activePIP: 3, openCAP: 4, manager: "Helena Park" },
  { name: "Messaging - Email Support", channel: "messaging", headcount: 62, activePIP: 2, openCAP: 3, manager: "Marcia Lin" },
  { name: "Messaging - Account Support", channel: "messaging", headcount: 58, activePIP: 1, openCAP: 2, manager: "Marcia Lin" },
  { name: "Customer Development Team", channel: "cdt", headcount: 110, activePIP: 4, openCAP: 5, manager: "Rohan Iyer" },
];

export const channelLabel: Record<DepartmentChannel, string> = {
  voice: "Voice",
  messaging: "Messaging",
  cdt: "CDT",
};
