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

  .search-wrapper {
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

  .search-card {
    background: white;
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    padding: 20px;
    border: 1px solid #E5E7EB;
    width: 100%;
  }

  .search-form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 12px;
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

  .search-button {
    width: 100%;
    padding: 13px 16px;
    background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 48px;
  }

  .search-button:active {
    transform: scale(0.98);
  }

  .search-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
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

  .loading-text {
    text-align: center;
    color: #6366F1;
    font-weight: 600;
    padding: 24px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 0.95rem;
  }

  /* Error Message */
  .error-message {
    background: linear-gradient(135deg, #FEE2E2 0%, #FEF2F2 100%);
    border: 2px solid #FECACA;
    border-radius: 12px;
    padding: 14px;
    margin-top: 16px;
    animation: slideDown 0.4s ease-out;
  }

  .error-header {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 6px;
  }

  .error-emoji {
    font-size: 1.2rem;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .error-title {
    font-weight: 700;
    color: #DC2626;
    font-size: 0.9rem;
  }

  .error-text {
    color: #B91C1C;
    font-size: 0.85rem;
    font-weight: 500;
    line-height: 1.5;
    margin-left: 28px;
  }

  /* Success Message - Student Card */
  .success-message {
    background: linear-gradient(135deg, #D1FAE5 0%, #F0FDF4 100%);
    border: 2px solid #86EFAC;
    border-radius: 12px;
    padding: 3px;
    margin-top: 16px;
    animation: slideDown 0.4s ease-out;
  }

  .student-card {
    background: white;
    border-radius: 9px;
    padding: 16px;
    position: relative;
  }

  .student-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%);
    border-radius: 9px 9px 0 0;
  }

  .student-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 2px solid #F3F4F6;
  }

  .student-avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    color: white;
    flex-shrink: 0;
  }

  .student-name-section h3 {
    font-size: 1.2rem;
    font-weight: 800;
    color: #1F2937;
    margin-bottom: 3px;
  }

  .student-name-section p {
    color: #6B7280;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .student-details {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .detail-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    background: #F9FAFB;
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  .detail-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  .icon-roll {
    background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
  }

  .icon-age {
    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  }

  .icon-dept {
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  }

  .icon-sem {
    background: linear-gradient(135deg, #EC4899 0%, #DB2777 100%);
  }

  .detail-content {
    flex: 1;
    min-width: 0;
  }

  .detail-label {
    font-size: 0.7rem;
    color: #6B7280;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    margin-bottom: 2px;
  }

  .detail-value {
    font-size: 0.95rem;
    color: #1F2937;
    font-weight: 700;
    word-break: break-word;
  }

  /* Empty State */
  .empty-state {
    text-align: center;
    padding: 32px 16px;
    color: #9CA3AF;
  }

  .empty-icon {
    font-size: 2.4rem;
    margin-bottom: 12px;
  }

  .empty-text {
    font-size: 0.9rem;
    font-weight: 500;
    line-height: 1.5;
    color: #6B7280;
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

    .search-wrapper {
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

    .search-card {
      padding: 32px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .search-form {
      gap: 14px;
    }

    .input-field {
      padding: 13px 16px;
      font-size: 1rem;
    }

    .search-button {
      padding: 14px 20px;
      font-size: 1rem;
      min-height: 50px;
    }

    .student-header {
      gap: 14px;
      margin-bottom: 18px;
      padding-bottom: 14px;
    }

    .student-avatar {
      width: 50px;
      height: 50px;
      font-size: 1.4rem;
    }

    .student-name-section h3 {
      font-size: 1.35rem;
    }

    .student-details {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .detail-row {
      padding: 12px;
    }

    .detail-row:hover {
      background: #F3F4F6;
      transform: translateY(-2px);
    }

    .detail-icon {
      width: 40px;
      height: 40px;
      font-size: 1.2rem;
    }

    .detail-label {
      font-size: 0.75rem;
    }

    .detail-value {
      font-size: 1rem;
    }
  }

  /* Desktop - 1024px and up */
  @media (min-width: 1024px) {
    .search-wrapper {
      max-width: 600px;
    }

    .header h1 {
      font-size: 2.2rem;
    }

    .header-emoji {
      font-size: 2.5rem;
    }

    .search-card {
      padding: 40px;
    }

    .input-field {
      padding: 14px 18px;
      font-size: 1.05rem;
    }

    .search-button {
      padding: 15px 24px;
      font-size: 1.05rem;
      width: 100%;
      min-height: 52px;
    }

    .student-card {
      padding: 20px;
    }

    .student-header {
      gap: 16px;
      margin-bottom: 20px;
      padding-bottom: 16px;
    }

    .student-avatar {
      width: 55px;
      height: 55px;
      font-size: 1.5rem;
    }

    .student-name-section h3 {
      font-size: 1.5rem;
    }

    .student-details {
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .detail-row {
      padding: 14px;
    }

    .detail-icon {
      width: 44px;
      height: 44px;
      font-size: 1.3rem;
    }

    .detail-label {
      font-size: 0.8rem;
    }

    .detail-value {
      font-size: 1.1rem;
    }
  }

  /* Extra Large Desktop */
  @media (min-width: 1440px) {
    .search-wrapper {
      max-width: 650px;
    }

    .search-card {
      padding: 48px;
    }
  }
`;

export default function Home() {
  const [rollNo, setRollNo] = useState("");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function getStudent() {
    if (!rollNo.trim()) {
      setError("Please enter a roll number to search");
      setStudent(null);
      return;
    }

    setLoading(true);
    setError("");
    setStudent(null);

    try {
      const response = await fetch(`${API_URL}/students/${rollNo}`);

      if (!response.ok) {
        if (response.status === 404) {
          setError(`No student found with roll number "${rollNo}". Please check and try again.`);
        } else {
          setError("An error occurred while searching. Please try again later.");
        }
        setStudent(null);
        setSearched(true);
        return;
      }

      const data = await response.json();
      setStudent(data);
      setError("");
      setSearched(true);
    } catch (error) {
      console.error("Search error:", error);
      setError("Failed to connect to the server. Please check your connection and try again.");
      setStudent(null);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getStudent();
    }
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  return (
    <>
      <style>{styles}</style>
      <div className="main-container">
        <div className="search-wrapper">
          <div className="header">
            <div className="header-content">
              <span className="header-emoji">🔍</span>
              <h1>Student Search</h1>
            </div>
            <p className="header-subtitle">Find student details by roll number</p>
          </div>

          <div className="search-card">
            <div className="search-form">
              <div className="input-group">
                <label className="input-label">Roll Number</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g., SE-001"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                  autoComplete="off"
                />
              </div>
              <button 
                className="search-button" 
                onClick={getStudent}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Searching...
                  </>
                ) : (
                  "🔍 Search"
                )}
              </button>
            </div>

            {loading && (
              <div className="loading-text">
                <span className="spinner"></span>
                Searching...
              </div>
            )}

            {error && (
              <div className="error-message">
                <div className="error-header">
                  <span className="error-emoji">❌</span>
                  <span className="error-title">Not Found</span>
                </div>
                <p className="error-text">{error}</p>
              </div>
            )}

            {student && (
              <div className="success-message">
                <div className="student-card">
                  <div className="student-header">
                    <div className="student-avatar">
                      {getInitial(student.name)}
                    </div>
                    <div className="student-name-section">
                      <h3>{student.name}</h3>
                      <p>Roll: {student.roll_no}</p>
                    </div>
                  </div>

                  <div className="student-details">
                    <div className="detail-row">
                      <div className="detail-icon icon-roll">🆔</div>
                      <div className="detail-content">
                        <div className="detail-label">Roll No</div>
                        <div className="detail-value">{student.roll_no}</div>
                      </div>
                    </div>

                    <div className="detail-row">
                      <div className="detail-icon icon-age">🎂</div>
                      <div className="detail-content">
                        <div className="detail-label">Age</div>
                        <div className="detail-value">{student.age}</div>
                      </div>
                    </div>

                    <div className="detail-row">
                      <div className="detail-icon icon-dept">🏢</div>
                      <div className="detail-content">
                        <div className="detail-label">Department</div>
                        <div className="detail-value">{student.department}</div>
                      </div>
                    </div>

                    <div className="detail-row">
                      <div className="detail-icon icon-sem">📚</div>
                      <div className="detail-content">
                        <div className="detail-label">Semester</div>
                        <div className="detail-value">{student.semester}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!student && !error && !loading && searched && (
              <div className="empty-state">
                <div className="empty-icon">😕</div>
                <p className="empty-text">No results found. Try another roll number.</p>
              </div>
            )}

            {!searched && !student && !error && !loading && (
              <div className="empty-state">
                <div className="empty-icon">📖</div>
                <p className="empty-text">Enter a roll number to search for a student</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}