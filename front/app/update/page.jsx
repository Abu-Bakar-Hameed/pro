"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const styles = `


  html, body {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }


  .main-container {
    background: #FFFFFF;
    min-height: 100vh;
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .form-wrapper {
    width: 100%;
    max-width: 100%;
    animation: slideDown 0.6s ease-out;
  }

  .header {
    text-align: center;
    margin-bottom: 24px;
    padding: 0 8px;
  }

  .header-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }

  .header-emoji {
    font-size: 1.8rem;
    display: inline-block;
  }

  .header h1 {
    font-size: 1.4rem;
    font-weight: 800;
    color: #1F2937;
    letter-spacing: -0.3px;
  }

  .header-subtitle {
    color: #6B7280;
    font-size: 0.85rem;
    font-weight: 500;
    margin-top: 6px;
    line-height: 1.4;
  }

  .form-card {
    background: white;
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    padding: 20px;
    border: 1px solid #E5E7EB;
    width: 100%;
  }

  .form-section {
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 0.9rem;
    font-weight: 700;
    color: #1F2937;
    margin-bottom: 14px;
    padding-bottom: 8px;
    border-bottom: 2px solid #E5E7EB;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .search-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 2px solid #F3F4F6;
  }

  .input-group {
    position: relative;
    width: 100%;
  }

  .input-label {
    display: block;
    font-size: 0.8rem;
    font-weight: 600;
    color: #6B7280;
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .input-field {
    width: 100%;
    padding: 12px 14px;
    border: 2px solid #E5E7EB;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 500;
    color: #1F2937;
    background: #F9FAFB;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    outline: none;
  }

  .input-field::placeholder {
    color: #9CA3AF;
  }

  .input-field:focus {
    border-color: #6366F1;
    background: white;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  .input-field:disabled {
    background: #F3F4F6;
    cursor: not-allowed;
    opacity: 0.6;
  }

  .input-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .button-group {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    margin-bottom: 12px;
  }

  .btn {
    padding: 13px 16px;
    border: none;
    border-radius: 10px;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 48px;
    outline: none;
  }

  .btn-search {
    background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  .btn-search:active {
    transform: scale(0.98);
  }

  .btn-search:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .btn-update {
    background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }

  .btn-update:active {
    transform: scale(0.98);
  }

  .btn-update:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .btn-reset {
    background: #F3F4F6;
    color: #1F2937;
    border: 2px solid #E5E7EB;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .btn-reset:active {
    transform: scale(0.98);
  }

  .spinner {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .spinner-gray {
    border-color: rgba(31, 41, 55, 0.3);
    border-top-color: #1F2937;
  }

  /* Messages */
  .alert {
    border-radius: 12px;
    padding: 14px;
    margin-bottom: 16px;
    animation: slideDown 0.4s ease-out;
    border-left: 4px solid;
  }

  .alert-header {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 6px;
  }

  .alert-emoji {
    font-size: 1.2rem;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .alert-title {
    font-weight: 700;
    font-size: 0.9rem;
  }

  .alert-text {
    font-size: 0.85rem;
    font-weight: 500;
    line-height: 1.5;
    margin-left: 28px;
  }

  .alert-error {
    background: linear-gradient(135deg, #FEE2E2 0%, #FEF2F2 100%);
    border-color: #DC2626;
    border-left-color: #DC2626;
  }

  .alert-error .alert-title {
    color: #DC2626;
  }

  .alert-error .alert-text {
    color: #B91C1C;
  }

  .alert-success {
    background: linear-gradient(135deg, #D1FAE5 0%, #F0FDF4 100%);
    border-color: #059669;
    border-left-color: #059669;
  }

  .alert-success .alert-title {
    color: #059669;
  }

  .alert-success .alert-text {
    color: #047857;
  }

  .alert-info {
    background: linear-gradient(135deg, #DBEAFE 0%, #F0F9FF 100%);
    border-color: #2563EB;
    border-left-color: #2563EB;
  }

  .alert-info .alert-title {
    color: #2563EB;
  }

  .alert-info .alert-text {
    color: #1D4ED8;
  }

  .student-info {
    background: linear-gradient(135deg, #DBEAFE 0%, #F0F9FF 100%);
    border: 2px solid #93C5FD;
    border-radius: 12px;
    padding: 14px;
    margin-bottom: 16px;
  }

  .student-info-title {
    font-weight: 700;
    color: #1D4ED8;
    font-size: 0.85rem;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }

  .student-info-content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .student-info-item {
    background: white;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid #E0E7FF;
  }

  .student-info-label {
    font-size: 0.7rem;
    color: #6B7280;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    margin-bottom: 2px;
  }

  .student-info-value {
    font-size: 0.9rem;
    color: #1F2937;
    font-weight: 700;
    word-break: break-word;
  }

  .form-fields {
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Tablet - 768px and up */
  @media (min-width: 768px) {
    .main-container {
      padding: 32px 20px;
      justify-content: center;
      min-height: 100vh;
    }

    .form-wrapper {
      max-width: 550px;
    }

    .header {
      margin-bottom: 32px;
      padding: 0;
    }

    .header-emoji {
      font-size: 2.2rem;
    }

    .header h1 {
      font-size: 1.8rem;
    }

    .header-subtitle {
      font-size: 0.95rem;
    }

    .form-card {
      padding: 32px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .search-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      align-items: flex-end;
    }

    .input-group:first-child {
      grid-column: 1 / 2;
    }

    .btn-search {
      grid-column: 2;
      grid-row: 2;
      margin-top: 0;
    }

    .button-group {
      grid-template-columns: 1fr 1fr;
    }

    .form-fields {
      grid-template-columns: repeat(2, 1fr);
    }

    .student-info-content {
      grid-template-columns: repeat(2, 1fr);
    }

    .btn {
      min-height: 50px;
      font-size: 1rem;
    }

    .input-field {
      padding: 13px 16px;
      font-size: 1rem;
    }
  }

  /* Desktop - 1024px and up */
  @media (min-width: 1024px) {
    .form-wrapper {
      max-width: 600px;
    }

    .header h1 {
      font-size: 2.2rem;
    }

    .header-emoji {
      font-size: 2.5rem;
    }

    .form-card {
      padding: 40px;
    }

    .search-section {
      grid-template-columns: 1fr 160px;
      gap: 14px;
    }

    .btn-search {
      grid-row: 2;
      margin-top: 0;
    }

    .form-fields {
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .button-group {
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .student-info-content {
      grid-template-columns: repeat(4, 1fr);
    }

    .input-field {
      padding: 14px 18px;
      font-size: 1.05rem;
    }

    .btn {
      padding: 15px 24px;
      min-height: 52px;
      font-size: 1.05rem;
    }

    .btn-search:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 25px rgba(59, 130, 246, 0.4);
    }

    .btn-update:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 25px rgba(99, 102, 241, 0.4);
    }

    .btn-reset:hover {
      background: #E5E7EB;
      transform: translateY(-2px);
    }
  }

  /* Extra Large Desktop */
  @media (min-width: 1440px) {
    .form-wrapper {
      max-width: 650px;
    }

    .form-card {
      padding: 48px;
    }
  }
`;

export default function Home() {
  const [rollNo, setRollNo] = useState("");
  const [student, setStudent] = useState({
    name: "",
    age: "",
    department: "",
    semester: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success", "error", "info"
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [searched, setSearched] = useState(false);

  // Search Student
  async function searchStudent() {
    if (!rollNo.trim()) {
      setMessage("Please enter a roll number to search");
      setMessageType("error");
      return;
    }

    setLoadingSearch(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/students/${rollNo}`);

      if (!response.ok) {
        if (response.status === 404) {
          setMessage(`No student found with roll number "${rollNo}"`);
        } else {
          setMessage("An error occurred while searching. Please try again.");
        }
        setMessageType("error");
        setStudent({ name: "", age: "", department: "", semester: "" });
        setSearched(false);
        setLoadingSearch(false);
        return;
      }

      const data = await response.json();

      setStudent({
        name: data.name,
        age: data.age,
        department: data.department,
        semester: data.semester,
      });

      setMessage("Student found successfully! You can now update their information.");
      setMessageType("info");
      setSearched(true);
    } catch (error) {
      console.error("Search error:", error);
      setMessage("Failed to connect to the server. Please check your connection.");
      setMessageType("error");
      setStudent({ name: "", age: "", department: "", semester: "" });
      setSearched(false);
    } finally {
      setLoadingSearch(false);
    }
  }

  // Update Student
  async function updateStudent() {
    if (!searched) {
      setMessage("Please search for a student first");
      setMessageType("error");
      return;
    }

    if (!student.name.trim()) {
      setMessage("Please enter student name");
      setMessageType("error");
      return;
    }

    if (!student.age) {
      setMessage("Please enter student age");
      setMessageType("error");
      return;
    }

    if (!student.department.trim()) {
      setMessage("Please enter department");
      setMessageType("error");
      return;
    }

    if (!student.semester) {
      setMessage("Please enter semester");
      setMessageType("error");
      return;
    }

    setLoadingUpdate(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/students/${rollNo}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: student.name,
          age: Number(student.age),
          department: student.department,
          semester: Number(student.semester),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.detail || "Failed to update student");
        setMessageType("error");
        setLoadingUpdate(false);
        return;
      }

      setMessage(data.message || "Student updated successfully!");
      setMessageType("success");
      setLoadingUpdate(false);

      // Reset form
      setTimeout(() => {
        setRollNo("");
        setStudent({ name: "", age: "", department: "", semester: "" });
        setSearched(false);
        setMessage("");
      }, 2000);
    } catch (error) {
      console.error("Update error:", error);
      setMessage("Failed to connect to the server. Please check your connection.");
      setMessageType("error");
      setLoadingUpdate(false);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchStudent();
    }
  };

  const resetForm = () => {
    setRollNo("");
    setStudent({ name: "", age: "", department: "", semester: "" });
    setMessage("");
    setSearched(false);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="main-container">
        <div className="form-wrapper">
          <div className="header">
            <div className="header-content">
              <span className="header-emoji">✏️</span>
              <h1>Update Student</h1>
            </div>
            <p className="header-subtitle">Search and edit student information</p>
          </div>

          <div className="form-card">
            {message && (
              <div className={`alert alert-${messageType}`}>
                <div className="alert-header">
                  <span className="alert-emoji">
                    {messageType === "success" && "✅"}
                    {messageType === "error" && "❌"}
                    {messageType === "info" && "ℹ️"}
                  </span>
                  <span className="alert-title">
                    {messageType === "success" && "Success"}
                    {messageType === "error" && "Error"}
                    {messageType === "info" && "Information"}
                  </span>
                </div>
                <p className="alert-text">{message}</p>
              </div>
            )}

            {/* Search Section */}
            <div className="search-section">
              <div className="input-group">
                <label className="input-label">Roll Number</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g., SE-001"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loadingSearch || loadingUpdate}
                  autoComplete="off"
                />
              </div>
              <button
                className="btn btn-search"
                onClick={searchStudent}
                disabled={loadingSearch || loadingUpdate}
              >
                {loadingSearch ? (
                  <>
                    <span className="spinner"></span>
                    Searching...
                  </>
                ) : (
                  "🔍 Search"
                )}
              </button>
            </div>

            {/* Student Info Display */}
            {searched && (
              <div className="student-info">
                <div className="student-info-title">Current Student Information</div>
                <div className="student-info-content">
                  <div className="student-info-item">
                    <div className="student-info-label">Roll No</div>
                    <div className="student-info-value">{rollNo}</div>
                  </div>
                  <div className="student-info-item">
                    <div className="student-info-label">Name</div>
                    <div className="student-info-value">{student.name}</div>
                  </div>
                  <div className="student-info-item">
                    <div className="student-info-label">Age</div>
                    <div className="student-info-value">{student.age}</div>
                  </div>
                  <div className="student-info-item">
                    <div className="student-info-label">Department</div>
                    <div className="student-info-value">{student.department}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Update Form */}
            {searched && (
              <>
                <div className="section-title">Edit Student Details</div>

                <div className="form-fields">
                  <div className="input-group">
                    <label className="input-label">Full Name</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Enter full name"
                      value={student.name}
                      onChange={(e) =>
                        setStudent({ ...student, name: e.target.value })
                      }
                      disabled={loadingUpdate}
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Age</label>
                    <input
                      type="number"
                      className="input-field"
                      placeholder="Enter age"
                      value={student.age}
                      onChange={(e) =>
                        setStudent({ ...student, age: e.target.value })
                      }
                      disabled={loadingUpdate}
                      min="1"
                      max="100"
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Department</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Enter department"
                      value={student.department}
                      onChange={(e) =>
                        setStudent({ ...student, department: e.target.value })
                      }
                      disabled={loadingUpdate}
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Semester</label>
                    <input
                      type="number"
                      className="input-field"
                      placeholder="Enter semester"
                      value={student.semester}
                      onChange={(e) =>
                        setStudent({ ...student, semester: e.target.value })
                      }
                      disabled={loadingUpdate}
                      min="1"
                      max="8"
                    />
                  </div>
                </div>

                <div className="button-group">
                  <button
                    className="btn btn-update"
                    onClick={updateStudent}
                    disabled={loadingUpdate}
                  >
                    {loadingUpdate ? (
                      <>
                        <span className="spinner"></span>
                        Updating...
                      </>
                    ) : (
                      "💾 Update Student"
                    )}
                  </button>
                  <button
                    className="btn btn-reset"
                    onClick={resetForm}
                    disabled={loadingUpdate}
                  >
                    🔄 Reset Form
                  </button>
                </div>
              </>
            )}

            {!searched && (
              <div style={{
                textAlign: "center",
                padding: "32px 16px",
                color: "#9CA3AF"
              }}>
                <div style={{ fontSize: "2rem", marginBottom: "8px" }}>📖</div>
                <p style={{ fontSize: "0.95rem", fontWeight: "500" }}>
                  Enter a roll number and click search to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}