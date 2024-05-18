import React, { useState, useEffect } from 'react';
import { Editor, EditorState, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

function Dashboard() {
  const [emails, setEmails] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchEmails();
  }, [currentPage]);

  const fetchEmails = async () => {
    try {
      const response = await fetch(`http://68.183.74.14:4005/api/emails?page=${currentPage}`, {
        headers: {
          'Authorization': 'Basic ' + btoa('your_username:your_password')
        }
      });
      const data = await response.json();
      setEmails(data.results);
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const rawContent = JSON.stringify(convertToRaw(contentState));

    if (!recipient || !subject || !rawContent) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    const emailData = {
      recipient,
      subject,
      message: rawContent,
    };

    try {
      const response = await fetch('http://68.183.74.14:4005/api/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('your_username:your_password'), // Replace with actual auth
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        setSuccessMessage('Email sent successfully!');
        setErrorMessage('');
        setRecipient('');
        setSubject('');
        setEditorState(EditorState.createEmpty());
        fetchEmails(); // Refresh email list after sending
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Failed to send email');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error: ' + error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>

      {/* Email Form */}
      <div>
        <h3>Send Email</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Recipient:</label>
            <input
              type="email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Subject:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Message:</label>
            <Editor editorState={editorState} onChange={handleEditorChange} />
          </div>
          <button type="submit">Send Email</button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </form>
      </div>

      {/* Email List */}
      <div>
        <h3>Emails</h3>
        {emails.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Recipient</th>
                <th>Subject</th>
              </tr>
            </thead>
            <tbody>
              {emails.map((email) => (
                <tr key={email.id}>
                  <td>{email.id}</td>
                  <td>{email.recipient}</td>
                  <td>{email.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No emails to display.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div>
        <button onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
