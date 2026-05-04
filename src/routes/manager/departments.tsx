import { createFileRoute } from "@tanstack/react-router";
import { DepartmentsView } from "@/components/shared/departments-view";

export const Route = createFileRoute("/manager/departments")({
  head: () => ({
    meta: [
      { title: "Manager — Departments" },
      { name: "description", content: "Departments under your span — Voice, Messaging and CDT teams." },
    ],
  }),
  component: () => (
    <DepartmentsView
      eyebrow="Manager · Oversight"
      description="Departments under your span — track headcount, active PIPs and open CAPs across Voice, Messaging and CDT."
    />
  ),
});
