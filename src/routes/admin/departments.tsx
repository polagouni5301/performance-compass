import { createFileRoute } from "@tanstack/react-router";
import { DepartmentsView } from "@/components/shared/departments-view";

export const Route = createFileRoute("/admin/departments")({
  head: () => ({
    meta: [
      { title: "Admin — Departments" },
      { name: "description", content: "Manage departments and channel configuration across the organisation." },
    ],
  }),
  component: () => (
    <DepartmentsView
      eyebrow="Admin · Configuration"
      description="All departments registered in the system, grouped by channel — Voice, Messaging and CDT."
    />
  ),
});
