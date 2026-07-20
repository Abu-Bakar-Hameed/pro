"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SearchSemester() {
  const [semester, setSemester] = useState("");
  const [students, setStudents] = useState([]);
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info"); // "info" | "error"
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  async function searchSemester() {
    if (!semester.trim()) {
      setMessage("Enter a semester to search.");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${API_URL}/students/semester/${semester}`
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.detail || "Something went wrong. Please try again.");
        setMessageType("error");
        setStudents([]);
        setCount(0);
        setHasSearched(true);
        return;
      }

      setStudents(data.students);
      setCount(data.count);
      setHasSearched(true);

      if (data.count === 0) {
        setMessage("No students found for this semester.");
        setMessageType("info");
      } else {
        setMessage("");
      }
    } catch (error) {
      console.error(error);
      setMessage("Couldn't reach the server. Check your connection and try again.");
      setMessageType("error");
      setStudents([]);
      setCount(0);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") searchSemester();
  }

  return (
    <div className="min-h-screen bg-white px-4 py-10 sm:py-16">
      <div className="mx-auto w-full max-w-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-2 flex items-center justify-center gap-2.5">
            <span className="text-3xl sm:text-4xl">📚</span>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
              Search by Semester
            </h1>
          </div>
          <p className="text-sm text-slate-500 sm:text-base">
            Find every student enrolled in a semester
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xl shadow-slate-200/50 sm:p-8">
          <label
            htmlFor="semester"
            className="mb-2 block text-xs font-bold tracking-wider text-slate-500"
          >
            SEMESTER
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="semester"
              type="number"
              placeholder="e.g., 4"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
            />

            <button
              onClick={searchSemester}
              disabled={loading}
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-blue-500 to-blue-600 px-6 py-3 text-base font-semibold text-white shadow-md shadow-blue-200 transition-all hover:from-blue-600 hover:to-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Searching
                </>
              ) : (
                <>🔍 Search</>
              )}
            </button>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`mt-4 rounded-xl px-4 py-3 text-sm ${
                messageType === "error"
                  ? "border border-red-100 bg-red-50 text-red-700"
                  : "border border-slate-100 bg-slate-50 text-slate-600"
              }`}
            >
              {message}
            </div>
          )}

          <hr className="my-6 border-slate-100" />

          {/* Results count */}
          {hasSearched && count > 0 && (
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">Results</h2>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
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
                  className="h-20 animate-pulse rounded-xl bg-slate-100"
                />
              ))}
            </div>
          )}

          {/* Results list */}
          {!loading && students.length > 0 && (
            <div className="space-y-3">
              {students.map((student) => (
                <div
                  key={student.roll_no}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-4 transition-colors hover:bg-slate-100/70"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800">{student.name}</h4>
                      <p className="text-xs text-slate-500">
                        Roll No: {student.roll_no}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-white px-2.5 py-1 text-xs text-slate-600 shadow-sm">
                        Age {student.age}
                      </span>
                      <span className="rounded-full bg-white px-2.5 py-1 text-xs text-slate-600 shadow-sm">
                        {student.department}
                      </span>
                      <span className="rounded-full bg-white px-2.5 py-1 text-xs text-slate-600 shadow-sm">
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
            <div className="py-8 text-center">
              <div className="mb-3 text-4xl">📖</div>
              <p className="text-sm text-slate-400">
                Enter a semester and click search to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}