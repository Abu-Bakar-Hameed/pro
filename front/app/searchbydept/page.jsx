"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SearchDepartment() {
  const [department, setDepartment] = useState("");
  const [students, setStudents] = useState([]);
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  async function searchDepartment() {
    if (!department.trim()) {
      setMessage("Enter a department to search.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${API_URL}/students/department/${department}`
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.detail || "Something went wrong. Try again.");
        setStudents([]);
        setCount(0);
        setHasSearched(true);
        setLoading(false);
        return;
      }

      setStudents(data.students);
      setCount(data.count);
      setHasSearched(true);

      if (data.count === 0) {
        setMessage("No students found in this department.");
      } else {
        setMessage("");
      }
    } catch (error) {
      setMessage("Couldn't reach the server. Check your connection and try again.");
      setStudents([]);
      setCount(0);
      setHasSearched(true);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") searchDepartment();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-2xl px-5 py-10 sm:px-8 sm:py-16">
        {/* Header */}
        <div className="mb-10 border-b border-stone-200 pb-6 sm:mb-14 sm:pb-8">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-stone-400">
            Registrar Index
          </p>
          <h1 className="font-serif text-3xl leading-tight text-stone-900 sm:text-4xl">
            Search by Department
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            Look up every student on record for a given department.
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:gap-0">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="e.g. Computer Science"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded-md border border-stone-300 bg-white px-4 py-3 text-base text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 sm:rounded-r-none sm:border-r-0"
            />
          </div>
          <button
            onClick={searchDepartment}
            disabled={loading}
            className="shrink-0 rounded-md bg-stone-900 px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-400 sm:rounded-l-none"
          >
            {loading ? "Searching…" : "Search"}
          </button>
        </div>

        {/* Status / message */}
        {message && (
          <div className="mb-8 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {message}
          </div>
        )}

        {/* Results header */}
        {hasSearched && count > 0 && (
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="font-serif text-xl text-stone-900">Results</h2>
            <span className="font-mono text-xs uppercase tracking-widest text-stone-400">
              {count} {count === 1 ? "student" : "students"}
            </span>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-md border border-stone-100 bg-stone-50"
              />
            ))}
          </div>
        )}

        {/* Student cards */}
        {!loading && students.length > 0 && (
          <div className="space-y-3">
            {students.map((student) => (
              <div
                key={student.roll_no}
                className="group relative overflow-hidden rounded-md border border-stone-200 bg-white px-5 py-4 transition-shadow hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-stone-900 opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-stone-900">
                      {student.name}
                    </h3>
                    <p className="mt-0.5 font-mono text-xs tracking-wide text-stone-400">
                      ROLL {student.roll_no}
                    </p>
                  </div>

                  <div className="flex gap-2 sm:flex-shrink-0">
                    <span className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs text-stone-600">
                      Age {student.age}
                    </span>
                    <span className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs text-stone-600">
                      {student.department}
                    </span>
                    <span className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs text-stone-600">
                      Sem {student.semester}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state before first search */}
        {!hasSearched && !loading && (
          <div className="rounded-md border border-dashed border-stone-200 px-6 py-14 text-center">
            <p className="font-serif text-base text-stone-400">
              Results will appear here once you search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}