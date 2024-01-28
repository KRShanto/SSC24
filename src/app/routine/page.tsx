import React from "react";
import Navbar from "../../components/Navbar";
import { SUBJECTS } from "@/lib/const";
import { cn } from "@/lib/cn";
import moment from "moment";
import { getSubjects } from "@/lib/getSubjects";
import { auth } from "@/lib/auth";
import Intro from "../home/Intro";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Routine",
  description: "Routine of the exam",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RoutienPage() {
  const session = await auth();

  if (!session) return <Intro />;

  const dbSubject = await getSubjects(session.user?.email!);
  const subjects = dbSubject.subjects;
  const subjectsWithDate = subjects.map((subject) => {
    const date = SUBJECTS.find((s) => s.name === subject.name)?.date;
    return {
      ...subject,
      date: new Date(date!),
    };
  });

  // Sort subjects by date
  const sortedSubjects = [...subjectsWithDate].sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  );

  // Get the start and end dates
  const startDate = sortedSubjects[0].date;
  const endDate = sortedSubjects[sortedSubjects.length - 1].date;

  // Generate all dates between start and end dates
  const dates = [];
  for (
    let dt = new Date(startDate);
    dt <= endDate;
    dt.setDate(dt.getDate() + 1)
  ) {
    dates.push(new Date(dt));
  }

  return (
    <div>
      <Navbar />

      <table className="mx-auto mb-10 mt-5 w-[1000px] text-xl text-slate-300 max-[1100px]:w-[90vw] max-[600px]:text-lg">
        <thead>
          <tr>
            <th className="border border-slate-800 px-4 py-2 text-2xl max-[600px]:px-2 max-[600px]:py-1 max-[600px]:text-xl">
              Date
            </th>
            <th className="border border-slate-800 px-4 py-2 text-2xl max-[600px]:px-2 max-[600px]:py-1 max-[600px]:text-xl">
              Day
            </th>
            <th className="border border-slate-800 px-4 py-2 text-2xl max-[600px]:px-2 max-[600px]:py-1 max-[600px]:text-xl">
              Subject
            </th>
          </tr>
        </thead>
        <tbody>
          {dates.map((date, index) => {
            const subject = sortedSubjects.find(
              (subject) => subject.date.toDateString() === date.toDateString(),
            );
            return (
              <tr key={index} className={cn(subject ? "bg-slate-900" : "")}>
                <td className="border border-slate-800 px-5 py-3 max-[600px]:px-3 max-[600px]:py-2">
                  {moment(date).format("Do MMMM")}
                </td>
                <td className="border border-slate-800 px-5 py-3 max-[600px]:px-3 max-[600px]:py-2">
                  {date.toLocaleString("default", { weekday: "long" })}
                </td>
                <td className="border border-slate-800 px-5 py-3 max-[600px]:px-3 max-[600px]:py-2">
                  {subject ? subject.name : " "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
