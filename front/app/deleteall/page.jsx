"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function DeleteAllStudents() {
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info"); // "info" | "error" | "success"
  const [loadingList, setLoadingList] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Fetch all students
  async function getStudents() {
    setLoadingList(true);
    try {
      const response = await fetch(`${API_URL}/students`);
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.detail || "Couldn't load students.");
        setMessageType("error");
        return;
      }

      setStudents(data.students || []);
    } catch (error) {
      console.error(error);
      setMessage("Couldn't reach the server. Check your connection and try again.");
      setMessageType("error");
    } finally {
      setLoadingList(false);
    }
  }

  // Delete all students
  async function deleteAllStudents() {
    setDeleting(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/students`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.detail || "Couldn't delete students. Please try again.");
        setMessageType("error");
        return;
      }

      setMessage(data.message || "All students deleted.");
      setMessageType("success");

      // Clear the list immediately
      setStudents([]);
    } catch (error) {
      console.error(error);
      setMessage("Couldn't reach the server. Check your connection and try again.");
      setMessageType("error");
    } finally {
      setDeleting(false);
      setConfirmOpen(false);
    }
  }

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white [height:100dvh]">
      <div className="mx-auto flex w-full max-w-5xl min-h-0 flex-1 flex-col px-4 py-6 sm:py-10">
        {/* Header with action top-right — stays fixed while page scrolls */}
        <div className="sticky top-0 z-20 mb-4 flex items-start justify-between gap-2 border-b border-slate-100 bg-white/95 py-3 backdrop-blur-sm sm:mb-8 sm:gap-3 sm:py-4">
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-1.5 sm:gap-2">
              <span className="text-xl sm:text-3xl">🗑️</span>
              <h1 className="truncate text-lg font-extrabold tracking-tight text-slate-800 sm:text-3xl">
                Delete All Students
              </h1>
            </div>
            <p className="text-[11px] text-slate-500 sm:text-sm">
              Permanently remove every student record
            </p>
          </div>

          <button
            onClick={() => setConfirmOpen(true)}
            disabled={deleting || loadingList || students.length === 0}
            className="flex shrink-0 items-center gap-1.5 rounded-xl bg-gradient-to-b from-red-500 to-red-600 px-3 py-2 text-xs font-semibold text-white shadow-md shadow-red-200 transition-all hover:from-red-600 hover:to-red-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            {deleting ? (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white sm:h-4 sm:w-4" />
            ) : (
              <span>🗑️</span>
            )}
            <span className="sm:hidden">{deleting ? "…" : "Delete"}</span>
            <span className="hidden sm:inline">
              {deleting ? "Deleting…" : "Delete All"}
            </span>
          </button>
        </div>

        {/* Card */}
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl shadow-slate-200/50">
          <div className="p-4 pb-0 sm:p-8 sm:pb-0">
            {/* Warning banner */}
            <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-red-100 bg-red-50 px-3.5 py-2.5 sm:mb-5 sm:gap-3 sm:px-4 sm:py-3">
              <span className="mt-0.5 text-base sm:text-lg">⚠️</span>
              <p className="text-xs text-red-700 sm:text-sm">
                This action can't be undone. It will permanently delete{" "}
                <span className="font-semibold">
                  {loadingList ? "all" : students.length}
                </span>{" "}
                student record{students.length === 1 ? "" : "s"}.
              </p>
            </div>

            {/* Message */}
            {message && (
              <div
                className={`mb-4 rounded-xl px-3.5 py-2.5 text-xs sm:mb-5 sm:px-4 sm:py-3 sm:text-sm ${
                  messageType === "error"
                    ? "border border-red-100 bg-red-50 text-red-700"
                    : messageType === "success"
                    ? "border border-emerald-100 bg-emerald-50 text-emerald-700"
                    : "border border-slate-100 bg-slate-50 text-slate-600"
                }`}
              >
                {message}
              </div>
            )}

            {/* Students list header — sticks above the scroll area */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 sm:pb-3">
              <h2 className="text-sm font-bold text-slate-800 sm:text-lg">
                Students
              </h2>
              {!loadingList && (
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 sm:px-3 sm:text-xs">
                  {students.length} {students.length === 1 ? "record" : "records"}
                </span>
              )}
            </div>
          </div>

          {/* Scrollable list area */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-3 sm:px-8 sm:py-5 [scrollbar-gutter:stable] [-webkit-overflow-scrolling:touch]">
            {/* Loading skeleton */}
            {loadingList && (
              <div className="space-y-3">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-20 animate-pulse rounded-xl bg-slate-100"
                  />
                ))}
              </div>
            )}

            {/* Empty state */}
            {!loadingList && students.length === 0 && (
              <div className="py-8 text-center">
                <div className="mb-3 text-4xl">📭</div>
                <p className="text-sm text-slate-400">No students found.</p>
              </div>
            )}

            {/* Student list */}
            {!loadingList && students.length > 0 && (
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
                {students.map((student) => (
                  <div
                    key={student.roll_no}
                    className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm shadow-slate-200/60 transition-shadow hover:shadow-md"
                  >
                    <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 to-purple-500" />

                    <div className="p-4 sm:p-5">
                      <h3 className="border-b border-slate-100 pb-2.5 text-lg font-extrabold text-slate-900 sm:pb-3 sm:text-xl">
                        {student.name}
                      </h3>

                      <div className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-indigo-600 sm:text-sm">
                            Roll No:
                          </span>
                          <span className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-2.5 py-1 text-[11px] font-bold text-white sm:px-3 sm:text-xs">
                            {student.roll_no}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-indigo-600 sm:text-sm">
                            Age:
                          </span>
                          <span className="rounded-full bg-emerald-500 px-2.5 py-1 text-[11px] font-bold text-white sm:px-3 sm:text-xs">
                            {student.age} years
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <span className="shrink-0 text-xs font-bold text-indigo-600 sm:text-sm">
                            Department:
                          </span>
                          <span className="text-right text-xs font-medium text-slate-700 sm:text-sm">
                            {student.department}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-indigo-600 sm:text-sm">
                            Semester:
                          </span>
                          <span className="text-xs font-medium text-slate-700 sm:text-sm">
                            {student.semester}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation modal */}
      {confirmOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4"
          onClick={() => !deleting && setConfirmOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 text-center text-4xl">⚠️</div>
            <h3 className="mb-2 text-center text-lg font-bold text-slate-800">
              Delete all students?
            </h3>
            <p className="mb-6 text-center text-sm text-slate-500">
              This will permanently remove all {students.length} student
              record{students.length === 1 ? "" : "s"}. This can't be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setConfirmOpen(false)}
                disabled={deleting}
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={deleteAllStudents}
                disabled={deleting}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Deleting
                  </>
                ) : (
                  "Yes, delete all"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}