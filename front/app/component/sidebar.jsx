"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  Home,
  PlusCircle,
  ClipboardList,
  Search,
  Pencil,
  Trash2,
  Building2,
  CalendarRange,
  XCircle,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/add_student", label: "Add Student", icon: PlusCircle },
  { href: "/all", label: "All Students", icon: ClipboardList },
  { href: "/student_by_rollnumber", label: "Search By Roll Number", icon: Search },
  { href: "/update", label: "Update Student", icon: Pencil },
  { href: "/deletebyroll", label: "Delete By Roll", icon: Trash2 },
  { href: "/searchbydept", label: "Search By Department", icon: Building2 },
  { href: "/searchbysemester", label: "Search By Semester", icon: CalendarRange },
  { href: "/deleteall", label: "Delete All Students", icon: XCircle },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile top bar with menu toggle */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-100 bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
            <GraduationCap className="h-4.5 w-4.5 text-white" size={18} />
          </div>
          <span className="text-sm font-extrabold tracking-tight text-slate-800">
            Student API
          </span>
        </div>

        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar — fixed on desktop, slide-in drawer on mobile */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-[260px] flex-col border-r border-slate-100 bg-white transition-transform duration-300 ease-out lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-sm shadow-indigo-200">
              <GraduationCap className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-base font-extrabold leading-tight tracking-tight text-slate-800">
                Student API
              </h2>
              <p className="text-[11px] text-slate-400">Management Portal</p>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600 lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav — scrolls independently if it ever overflows, sidebar itself stays put */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm shadow-indigo-200"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={active ? "text-white" : "text-slate-400"}
                    />
                    <span className="truncate">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t border-slate-100 px-5 py-4">
          <p className="text-[11px] text-slate-400">
            Student Records System
          </p>
        </div>
      </aside>

      {/* Spacer so page content isn't hidden under the fixed sidebar on desktop */}
      <div className="hidden w-[260px] shrink-0 lg:block" />
    </>
  );
}