"use client";

import Link from "next/link";
import { GraduationCap, PlusCircle, ClipboardList, ArrowRight } from "lucide-react";

const stats = [
  { label: "Students Managed", value: "1,200+" },
  { label: "Departments", value: "12" },
  { label: "Uptime", value: "99.9%" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:py-24">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-purple-100 to-indigo-50 blur-3xl sm:h-96 sm:w-96" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-600 sm:text-sm">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500">
            <GraduationCap className="text-white" size={12} />
          </span>
          Student API · Management Portal
        </div>

        {/* Headline */}
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl sm:leading-tight">
          Manage every student record
          <br className="hidden sm:block" />{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            in one simple place
          </span>
        </h1>

        {/* Subtext */}
        <p className="mx-auto mt-5 max-w-xl text-sm text-slate-500 sm:text-lg">
          Add, search, update, and organize student data by department or
          semester — all from a single, fast, and reliable dashboard.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:justify-center">
          <Link
            href="/add_student"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-indigo-500 to-purple-500 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition-all hover:from-indigo-600 hover:to-purple-600 active:scale-[0.98] sm:text-base"
          >
            <PlusCircle size={18} />
            Add a Student
          </Link>

          <Link
            href="/all"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:text-base"
          >
            <ClipboardList size={18} />
            View All Students
            <ArrowRight size={16} className="text-slate-400" />
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-4 border-t border-slate-100 pt-8 sm:mt-16 sm:gap-6 sm:pt-10">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-xl font-extrabold text-slate-900 sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] text-slate-500 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
