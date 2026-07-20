"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const initialStudent = {
  roll_no: "",
  name: "",
  age: "",
  department: "",
  semester: "",
};

export default function AddStudent() {
  const [student, setStudent] = useState(initialStudent);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info"); // "success" | "error"

  function validateField(name, value) {
    switch (name) {
      case "roll_no": {
        const v = value.trim();
        if (!v) return "Roll number is required.";
        if (v.length < 2) return "Roll number looks too short.";
        if (!/^[A-Za-z0-9-]+$/.test(v))
          return "Only letters, numbers, and dashes are allowed.";
        return "";
      }
      case "name": {
        const v = value.trim();
        if (!v) return "Name is required.";
        if (v.length < 2) return "Name looks too short.";
        if (!/^[A-Za-z][A-Za-z\s.'-]*$/.test(v))
          return "Name should only contain letters and spaces.";
        return "";
      }
      case "age": {
        if (value === "") return "Age is required.";
        const n = Number(value);
        if (!Number.isInteger(n)) return "Age must be a whole number.";
        if (n < 15 || n > 100) return "Age should be between 15 and 100.";
        return "";
      }
      case "department": {
        const v = value.trim();
        if (!v) return "Department is required.";
        if (v.length < 2) return "Department looks too short.";
        return "";
      }
      case "semester": {
        if (value === "") return "Semester is required.";
        const n = Number(value);
        if (!Number.isInteger(n)) return "Semester must be a whole number.";
        if (n < 1 || n > 12) return "Semester should be between 1 and 12.";
        return "";
      }
      default:
        return "";
    }
  }

  function validateAll(values) {
    const nextErrors = {};
    Object.keys(values).forEach((key) => {
      const err = validateField(key, values[key]);
      if (err) nextErrors[key] = err;
    });
    return nextErrors;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    const updated = { ...student, [name]: value };
    setStudent(updated);

    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }

  async function addStudent() {
    const nextErrors = validateAll(student);
    setErrors(nextErrors);
    setTouched({
      roll_no: true,
      name: true,
      age: true,
      department: true,
      semester: true,
    });

    if (Object.keys(nextErrors).length > 0) {
      setMessage("Please fix the highlighted fields.");
      setMessageType("error");
      return;
    }

    setSubmitting(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roll_no: student.roll_no.trim(),
          name: student.name.trim(),
          age: Number(student.age),
          department: student.department.trim(),
          semester: Number(student.semester),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.detail || "Couldn't add student. Please try again.");
        setMessageType("error");
        return;
      }

      setMessage(data.message || "Student added successfully.");
      setMessageType("success");
      console.log(data.student);

      setStudent(initialStudent);
      setTouched({});
      setErrors({});
    } catch (error) {
      console.error(error);
      setMessage("Couldn't reach the server. Check your connection and try again.");
      setMessageType("error");
    } finally {
      setSubmitting(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    addStudent();
  }

  const fields = [
    {
      name: "roll_no",
      label: "Roll Number",
      type: "text",
      placeholder: "e.g., CS-002",
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter full name",
    },
    {
      name: "age",
      label: "Age",
      type: "number",
      placeholder: "Enter age",
    },
    {
      name: "department",
      label: "Department",
      type: "text",
      placeholder: "e.g., Computer Science",
    },
    {
      name: "semester",
      label: "Semester",
      type: "number",
      placeholder: "e.g., 4",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-4 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-lg">
        {/* Header */}
        <div className="mb-6 text-center sm:mb-8">
          <div className="mb-2 flex items-center justify-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-sm shadow-indigo-200 sm:h-11 sm:w-11">
              <span className="text-lg sm:text-xl">➕</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-800 sm:text-3xl">
              Add Student
            </h1>
          </div>
          <p className="text-sm text-slate-500">
            Fill in the details to add a new student record
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xl shadow-slate-200/50 sm:p-8"
        >
          <div className="space-y-4">
            {fields.map(({ name, label, type, placeholder }) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="mb-1.5 block text-xs font-bold tracking-wide text-slate-600"
                >
                  {label} <span className="text-red-500">*</span>
                </label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  value={student[name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(touched[name] && errors[name])}
                  aria-describedby={`${name}-error`}
                  className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 ${
                    touched[name] && errors[name]
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                      : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
                  }`}
                />
                {touched[name] && errors[name] && (
                  <p
                    id={`${name}-error`}
                    className="mt-1.5 flex items-center gap-1 text-xs text-red-600"
                  >
                    <span>⚠️</span>
                    {errors[name]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Message */}
          {message && (
            <div
              className={`mt-5 rounded-xl px-4 py-3 text-sm ${
                messageType === "error"
                  ? "border border-red-100 bg-red-50 text-red-700"
                  : "border border-emerald-100 bg-emerald-50 text-emerald-700"
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-indigo-500 to-purple-500 px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-indigo-200 transition-all hover:from-indigo-600 hover:to-purple-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Adding…
              </>
            ) : (
              <>Add Student</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}