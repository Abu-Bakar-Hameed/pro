"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const styles = `

  .main-container {
    background: #FFFFFF;
    height: 100vh;
    height: 100dvh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .top-bar {
    flex-shrink: 0;
    padding: 20px 20px 16px 20px;
    background: #FFFFFF;
    position: relative;
    z-index: 10;
    border-bottom: 1px solid #F3F4F6;
  }

  .scroll-area {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
    padding: 20px;
    scrollbar-gutter: stable;
  }

  .header {
    text-align: center;
    margin-bottom: 20px;
    animation: slideDown 0.6s ease-out;
    width: 100%;
  }

  .header-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 16px;
  }

  .header-emoji {
    font-size: 2rem;
    display: inline-block;
  }

  .header h1 {
    font-size: 1.6rem;
    font-weight: 800;
    color: #1F2937;
    letter-spacing: -0.5px;
  }

  .stats-badge {
    display: inline-block;
    background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
    color: white;
    padding: 12px 24px;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 600;
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
    border: none;
  }

  .stats-badge strong {
    font-weight: 700;
    margin-left: 4px;
  }

  .content-wrapper {
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
  }

  .sort-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 25px;
    justify-content: center;
    animation: slideDown 0.6s ease-out;
  }

  .sort-label {
    font-weight: 600;
    color: #1F2937;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .sort-button {
    padding: 8px 14px;
    border: 2px solid #E5E7EB;
    background: white;
    color: #4B5563;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    white-space: nowrap;
  }

  .sort-button:active {
    transform: scale(0.95);
  }

  .sort-button.active {
    background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
    color: white;
    border-color: #6366F1;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }

  .sort-button:hover {
    border-color: #6366F1;
    color: #6366F1;
  }

  .sort-button.active:hover {
    color: white;
  }

  .alert-custom {
    background: linear-gradient(135deg, #F87171 0%, #EF4444 100%);
    color: white;
    padding: 14px 18px;
    border-radius: 12px;
    margin-bottom: 20px;
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
    border: none;
    font-weight: 500;
    font-size: 0.95rem;
  }

  .no-students {
    text-align: center;
    padding: 60px 20px;
    color: #999;
    font-size: 1.1rem;
    font-weight: 500;
  }

  .students-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    animation: fadeIn 0.6s ease-out;
  }

  .student-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid #E5E7EB;
    position: relative;
  }

  .student-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%);
  }

  .student-card:active {
    transform: scale(0.98);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }

  .card-header {
    padding: 18px 18px 14px 18px;
    border-bottom: 1px solid #F3F4F6;
  }

  .card-title {
    font-size: 1.4rem;
    font-weight: 800;
    color: #1F2937;
    margin: 0;
    letter-spacing: -0.3px;
  }

  .card-body {
    padding: 16px 18px;
  }

  .info-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 14px;
  }

  .info-row:last-child {
    margin-bottom: 0;
  }

  .info-label {
    font-weight: 700;
    color: #6366F1;
    font-size: 0.9rem;
    min-width: 110px;
  }

  .info-value {
    color: #4B5563;
    font-size: 0.95rem;
    font-weight: 500;
    word-break: break-word;
  }

  .badge-roll {
    display: inline-block;
    background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
    color: white;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 700;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.2);
  }

  .badge-age {
    display: inline-block;
    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
    color: white;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 700;
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Tablet - 2 columns */
  @media (min-width: 768px) {
    .top-bar {
      padding: 30px 30px 18px 30px;
    }

    .scroll-area {
      padding: 30px;
    }

    .header h1 {
      font-size: 2rem;
    }

    .header-emoji {
      font-size: 2.5rem;
    }

    .content-wrapper {
      max-width: 900px;
    }

    .sort-container {
      justify-content: center;
      gap: 10px;
    }

    .students-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }

    .card-header {
      padding: 20px 20px 16px 20px;
    }

    .card-body {
      padding: 18px 20px;
    }

    .card-title {
      font-size: 1.5rem;
    }

    .info-label {
      font-size: 0.95rem;
    }

    .student-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    }
  }

  /* Desktop - 3 columns */
  @media (min-width: 1024px) {
    .top-bar {
      padding: 40px 40px 20px 40px;
    }

    .scroll-area {
      padding: 40px;
    }

    .header h1 {
      font-size: 2.5rem;
    }

    .header-emoji {
      font-size: 3rem;
    }

    .content-wrapper {
      max-width: 1200px;
    }

    .sort-container {
      justify-content: center;
      gap: 12px;
    }

    .students-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 25px;
    }

    .card-header {
      padding: 22px 22px 18px 22px;
    }

    .card-body {
      padding: 20px 22px;
    }

    .card-title {
      font-size: 1.6rem;
    }

    .info-label {
      font-size: 1rem;
    }

    .student-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
    }
  }
`;

const sortOptions = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "department", label: "Department" },
  { key: "semester", label: "Semester" },
  { key: "roll_no", label: "Roll No" },
];

export default function Home() {
  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await fetch(`${API_URL}/students`);

        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }

        const data = await response.json();

        setStudents(data.students);
        setTotalStudents(data.total_students);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchStudents();
  }, []);

  const sortedStudents = [...students].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (typeof aValue === "string") {
      return aValue.localeCompare(bValue);
    } else if (typeof aValue === "number") {
      return aValue - bValue;
    }
    return 0;
  });

  return (
    <>
      <style>{styles}</style>
      <div className="main-container">
        <div className="top-bar">
          <div className="content-wrapper">
            <div className="header">
              <div className="header-content">
                <span className="header-emoji">👨‍🎓</span>
                <h1>Student Management</h1>
              </div>
              <div className="stats-badge">
                Total Students: <strong>{totalStudents}</strong>
              </div>
            </div>

            {error && (
              <div className="alert-custom">
                ❌ {error}
              </div>
            )}

            {students.length > 0 && !error && (
              <div className="sort-container">
                <span className="sort-label">🔤 Sort by:</span>
                {sortOptions.map((option) => (
                  <button
                    key={option.key}
                    className={`sort-button ${sortBy === option.key ? "active" : ""}`}
                    onClick={() => setSortBy(option.key)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="scroll-area">
          <div className="content-wrapper">
            {students.length === 0 && !error ? (
              <div className="no-students">
                📚 No students found. Start adding students to your database!
              </div>
            ) : (
              <div className="students-grid">
                {sortedStudents.map((student) => (
                  <div className="student-card" key={student.roll_no}>
                    <div className="card-header">
                      <h5 className="card-title">{student.name}</h5>
                    </div>
                    <div className="card-body">
                      <div className="info-row">
                        <span className="info-label">Roll No:</span>
                        <span className="badge-roll">{student.roll_no}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Age:</span>
                        <span className="badge-age">{student.age} years</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Department:</span>
                        <span className="info-value">{student.department}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Semester:</span>
                        <span className="info-value">{student.semester}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}