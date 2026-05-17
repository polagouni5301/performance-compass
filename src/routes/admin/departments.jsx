import { DepartmentsView } from "@/components/shared/departments-view";

export default function AdminDepartments() {
  return (
    <DepartmentsView
      eyebrow="Admin · Configuration"
      description="All departments registered in the system, grouped by channel — Voice, Messaging and CDT."
    />
  );
}
