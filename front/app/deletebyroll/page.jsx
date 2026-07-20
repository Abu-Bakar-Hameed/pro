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

  .input-group {
    position: relative;
    width: 100%;
    margin-bottom: 16px;
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
    border-color: #DC2626;
    background: white;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }

  .input-field:disabled {
    background: #F3F4F6;
    cursor: not-allowed;
    opacity: 0.6;
  }

  .info-box {
    background: linear-gradient(135deg, #FEF2F2 0%, #FFF5F5 100%);
    border: 2px solid #FECACA;
    border-radius: 12px;
    padding: 12px;
    margin-bottom: 16px;
    font-size: 0.85rem;
    color: #B91C1C;
    font-weight: 500;
    line-height: 1.5;
  }

  .warning-icon {
    margin-right: 6px;
    font-size: 1rem;
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
    width: 100%;
    outline: none;
  }

  .btn-delete {
    background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
  }

  .btn-delete:active {
    transform: scale(0.98);
  }

  .btn-delete:disabled {
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
  }

  .alert-success .alert-title {
    color: #059669;
  }

  .alert-success .alert-text {
    color: #047857;
  }

  /* Modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 16px;
    animation: fadeIn 0.3s ease-out;
  }

  .modal {
    background: white;
    border-radius: 16px;
    padding: 24px;
    max-width: 400px;
    width: 100%;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.3s ease-out;
  }

  .modal-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
  }

  .modal-icon {
    font-size: 1.8rem;
  }

  .modal-title {
    font-size: 1.2rem;
    font-weight: 800;
    color: #1F2937;
  }

  .modal-body {
    margin-bottom: 24px;
  }

  .modal-text {
    color: #4B5563;
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 12px;
  }

  .modal-warning {
    background: linear-gradient(135deg, #FEF2F2 0%, #FFF5F5 100%);
    border: 2px solid #FECACA;
    border-radius: 10px;
    padding: 10px;
    font-size: 0.85rem;
    color: #B91C1C;
    font-weight: 500;
  }

  .modal-footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .modal-btn {
    padding: 12px 16px;
    border: none;
    border-radius: 10px;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s ease;
    min-height: 44px;
    outline: none;
  }

  .modal-btn-confirm {
    background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
  }

  .modal-btn-confirm:active {
    transform: scale(0.98);
  }

  .modal-btn-cancel {
    background: #F3F4F6;
    color: #1F2937;
    border: 2px solid #E5E7EB;
  }

  .modal-btn-cancel:active {
    transform: scale(0.98);
  }

  .empty-state {
    text-align: center;
    padding: 40px 16px;
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

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
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

    .input-group {
      margin-bottom: 18px;
    }

    .input-field {
      padding: 13px 16px;
      font-size: 1rem;
    }

    .btn {
      padding: 14px 20px;
      font-size: 1rem;
      min-height: 50px;
    }

    .btn-delete:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 25px rgba(220, 38, 38, 0.4);
    }

    .info-box {
      padding: 14px;
      font-size: 0.9rem;
    }

    .modal {
      padding: 28px;
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

    .input-field {
      padding: 14px 18px;
      font-size: 1.05rem;
    }

    .btn {
      padding: 15px 24px;
      min-height: 52px;
      font-size: 1.05rem;
    }

    .modal {
      padding: 32px;
    }

    .modal-title {
      font-size: 1.3rem;
    }

    .modal-text {
      font-size: 1rem;
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
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success", "error"
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleDeleteClick = () => {
    if (!rollNo.trim()) {
      setMessage("Please enter a roll number to delete");
      setMessageType("error");
      return;
    }

    setShowConfirm(true);
  };

  async function deleteStudent() {
    setConfirmLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/students/${rollNo}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.detail || "Failed to delete student");
        setMessageType("error");
        setShowConfirm(false);
        setConfirmLoading(false);
        return;
      }

      setMessage(data.message || "Student deleted successfully!");
      setMessageType("success");
      setShowConfirm(false);
      setLoading(false);

      // Reset form
      setTimeout(() => {
        setRollNo("");
        setMessage("");
      }, 2000);
    } catch (error) {
      console.error("Delete error:", error);
      setMessage("Failed to connect to the server. Please try again.");
      setMessageType("error");
      setShowConfirm(false);
    } finally {
      setConfirmLoading(false);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleDeleteClick();
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="main-container">
        <div className="form-wrapper">
          <div className="header">
            <div className="header-content">
              <span className="header-emoji">🗑️</span>
              <h1>Delete Student</h1>
            </div>
            <p className="header-subtitle">Permanently remove a student record</p>
          </div>

          <div className="form-card">
            {message && (
              <div className={`alert alert-${messageType}`}>
                <div className="alert-header">
                  <span className="alert-emoji">
                    {messageType === "success" && "✅"}
                    {messageType === "error" && "❌"}
                  </span>
                  <span className="alert-title">
                    {messageType === "success" && "Success"}
                    {messageType === "error" && "Error"}
                  </span>
                </div>
                <p className="alert-text">{message}</p>
              </div>
            )}

            <div className="info-box">
              <span className="warning-icon">⚠️</span>
              This action cannot be undone. Please enter the roll number carefully.
            </div>

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
              className="btn btn-delete"
              onClick={handleDeleteClick}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Processing...
                </>
              ) : (
                "🗑️ Delete Student"
              )}
            </button>

            {!message && (
              <div className="empty-state">
                <div className="empty-icon">📋</div>
                <p className="empty-text">
                  Enter a roll number to delete a student record
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <span className="modal-icon">⚠️</span>
              <h2 className="modal-title">Confirm Deletion</h2>
            </div>

            <div className="modal-body">
              <p className="modal-text">
                You are about to delete the student with roll number:
              </p>
              <p style={{
                fontSize: "1.1rem",
                fontWeight: "700",
                color: "#DC2626",
                marginBottom: "12px"
              }}>
                {rollNo}
              </p>
              <div className="modal-warning">
                ⚠️ This action is permanent and cannot be undone. All student data will be deleted.
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="modal-btn modal-btn-cancel"
                onClick={() => setShowConfirm(false)}
                disabled={confirmLoading}
              >
                ❌ Cancel
              </button>
              <button
                className="modal-btn modal-btn-confirm"
                onClick={deleteStudent}
                disabled={confirmLoading}
              >
                {confirmLoading ? (
                  <>
                    <span className="spinner"></span>
                  </>
                ) : (
                  "🗑️ Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}