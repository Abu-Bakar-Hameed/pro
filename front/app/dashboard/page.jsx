"use client";
import "./dashborad.css";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
  "#F97316",
];

export default function Dashboard() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [departments, setDepartments] = useState(0);
  const [semesters, setSemesters] = useState(0);
  const [averageAge, setAverageAge] = useState(0);

  const [departmentData, setDepartmentData] = useState([]);
  const [semesterData, setSemesterData] = useState([]);

  useEffect(() => {
  let mounted = true;

  async function loadDashboard() {
    try {
      const response = await fetch(`${API_URL}/students`);
      const data = await response.json();

      if (!mounted) return;

      const students = data.students;

      setTotalStudents(students.length);

      const deptSet = [...new Set(students.map((s) => s.department))];
      setDepartments(deptSet.length);

      const semSet = [...new Set(students.map((s) => s.semester))];
      setSemesters(semSet.length);

      if (students.length > 0) {
        const totalAge = students.reduce((sum, s) => sum + s.age, 0);
        setAverageAge((totalAge / students.length).toFixed(1));
      }

      const deptCount = {};
      students.forEach((student) => {
        deptCount[student.department] =
          (deptCount[student.department] || 0) + 1;
      });

      setDepartmentData(
        Object.entries(deptCount).map(([name, value]) => ({
          name,
          value,
        }))
      );

      const semCount = {};
      students.forEach((student) => {
        semCount[student.semester] =
          (semCount[student.semester] || 0) + 1;
      });

      setSemesterData(
        Object.entries(semCount).map(([semester, students]) => ({
          semester,
          students,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  }

  loadDashboard();

  return () => {
    mounted = false;
  };
}, []);

  return (
  <div className="dashboard-page">
    <div className="header">
      <h1>🎓 Student Management Dashboard</h1>
      <p>Manage and visualize student records efficiently.</p>
    </div>

    <div className="dashboard">
      {/* Cards */}

      <div className="card stat-card">
        <h2>{totalStudents}</h2>
        <p>Total Students</p>
      </div>

      <div className="card stat-card">
        <h2>{departments}</h2>
        <p>Departments</p>
      </div>

      <div className="card stat-card">
        <h2>{semesters}</h2>
        <p>Semesters</p>
      </div>

      <div className="card stat-card">
        <h2>{averageAge}</h2>
        <p>Average Age</p>
      </div>

      <div className="card stat-card">
        <h2>{new Date().toLocaleDateString()}</h2>
        <p>Today's Date</p>
      </div>
    </div>

    <div className="charts">
      <div className="chart-card">
        <h2>Students by Department</h2>

        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={departmentData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {departmentData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h2>Students by Semester</h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={semesterData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="semester" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="students"
              radius={[8, 8, 0, 0]}
              fill="#3B82F6"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);}