import React, { useState, useEffect } from 'react';
import { sendEmails, getSentEmails } from './emailFunctions'; 
import './index.css';
import Image1 from './images/mail.png'
function App() {
  const [validEmails, setValidEmails] = useState([]);
  const [invalidEmails, setInvalidEmails] = useState([]);
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [manualEmail, setManualEmail] = useState(''); 
  const [sentEmails, setSentEmails] = useState([]);

  useEffect(() => {
    // Fetch past sent email details 
    fetchSentEmails();
  }, []);

  const fetchSentEmails = async () => {
    const emails = await getSentEmails();
    setSentEmails(emails);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(event) {
        const csv = event.target.result;
        const lines = csv.split('\n');
        const validEmailsArr = [];
        const invalidEmailsArr = [];
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        for (let i = 0; i < lines.length; i++) {
            const email = lines[i].trim();
            if (email !== '') { 
                if (emailRegex.test(email)) {
                    validEmailsArr.push(email);
                } else {
                    invalidEmailsArr.push(email);
                }
            }
        }
        setValidEmails(validEmailsArr);
        setInvalidEmails(invalidEmailsArr);
    };
};


  const handleManualEmailAddition = () => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    if (emailRegex.test(manualEmail)) {
      setValidEmails([...validEmails, manualEmail]);
      setManualEmail(''); 
    } else {
      setInvalidEmails([...invalidEmails, manualEmail]);
      setManualEmail(''); 
    }
  };

  const sendEmailsHandler = () => {
    sendEmails(senderEmail, validEmails, message);
    alert('Emails sent to valid email addresses.');
    setSenderEmail('');
    setSubject('');
    setMessage('');
    setManualEmail('');
    setValidEmails([]);
    setInvalidEmails([]);
    // Fetch updated list of sent emails
    fetchSentEmails();
  };

  const renderSentEmails = () => {
    return (
      <div id="sentEmails" className="fadeIn">
        <h2>Past Sent Emails</h2>
        <ul className='flex'>
          {sentEmails.map((email) => (
            <li key={email.id}>
              <strong>From:</strong> {email.senderEmail}, <strong>To:</strong>{' '}
              {email.recipientEmail}, <strong>Message:</strong> {email.message},{' '}
              <strong>Sent At:</strong> {email.sentAt}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="App">
      <div id="intro">
      <img id='img' src={Image1} alt="mail"/>
      <h1>Mass Mail Dispatcher</h1>
      <a href='/'>Logout</a>
        <a href="#heading">Send Bulk Mails</a>
      </div>
      <div id="heading">
        <h1>Fill Below Credentials</h1>
      </div>
      <section id="full">
        <div className="container">
          <div id="frm">
            <form method="post">
              <label htmlFor="senderEmail">From:</label>
              <br />
              <input
                type="email"
                id="senderEmail"
                name="senderMail"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                required
              />
              <br />
              <br />
              <br />
              <label htmlFor="subject">Subject:</label>
              <br />
              <input
                type="text"
                id="subject"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
              <br />
              <br />
              <br />
              <label htmlFor="csvFile">CSV File:</label>
              <br />
              <input
                type="file"
                name="csvFile"
                id="csvFile"
                accept=".csv"
                onChange={handleFileChange}
              />
              <br />
              <br />
              <label htmlFor="message">Message:</label>
              <br />
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="10"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
              <br />
              <br />
              {/* Add input field for manual email entry */}
              <label htmlFor="manualEmail">Enter Email:</label>
              <br />
              <input
                type="email"
                id="manualEmail"
                value={manualEmail}
                onChange={(e) => setManualEmail(e.target.value)}
                required
              />
              <br />
              <br />
              {/* Button to manually add email */}
              <input
                type="button"
                value="Add Email"
                onClick={handleManualEmailAddition}
              />
              <br />
              <br />
              <input
                type="button"
                value="Send Emails"
                onClick={sendEmailsHandler}
              />
              <br />
              <br />
              <a href='#sentEmails'
                onClick={fetchSentEmails}
              >Fetch Past Sent Emails</a>
              <br />
            </form>
          </div>

          <div className="validation">
            <div>
              <div className="count" style={{ color: '#393E41' }}>
                Valid Emails: <span id="validEmailCount">{validEmails.length}</span>
              </div>
              {/* Wrap each valid email in a div with a background color */}
              <div
                id="validEmails"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#f9f9f9',
                  padding: '5px',
                  borderRadius: '5px',
                }}
              >
                {validEmails.map((email, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: '#e6ffe6',
                      padding: '5px',
                      marginBottom: '5px',
                      borderRadius: '3px',
                    }}
                  >
                    {email}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="count" style={{ color: '#393E41' }}>
                Invalid Emails: <span id="invalidEmailCount">{invalidEmails.length}</span>
              </div>
              {/* Wrap each invalid email in a div with a background color */}
              <div
                id="invalidEmails"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#f9f9f9',
                  padding: '5px',
                  borderRadius: '5px',
                }}
              >
                {invalidEmails.map((email, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: '#ffe6e6',
                      padding: '5px',
                      marginBottom: '5px',
                      borderRadius: '3px',
                    }}
                  >
                    {email}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className='flex'>{renderSentEmails()}</div>
    </div>
  );
}

export default App;
