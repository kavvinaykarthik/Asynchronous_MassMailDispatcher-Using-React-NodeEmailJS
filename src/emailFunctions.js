// emailFunctions.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, orderBy, getDocs  } from "firebase/firestore";
import emailjs from 'emailjs-com';
const firebaseConfig = {
  apiKey: "AIzaSyD4HG49pbKKsjQ1W5e7wa55IjuQIMIWVDg",
  authDomain: "massmaildispatcher-950d1.firebaseapp.com",
  projectId: "massmaildispatcher-950d1",
  storageBucket: "massmaildispatcher-950d1.appspot.com",
  messagingSenderId: "112462308690",
  appId: "1:112462308690:web:38d917bdfe4a42f467468b",
  measurementId: "G-ZCJY5XBME8"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const getSentEmails = async () => {
  const emailsCollection = collection(db, "sentEmails");
  const q = query(emailsCollection, orderBy("sentAt", "desc"));
  const querySnapshot = await getDocs(q);
  const sentEmails = [];
  querySnapshot.forEach((doc) => {
    sentEmails.push({ id: doc.id, ...doc.data() });
  });
  return sentEmails;
};
const sendEmails = async (senderEmail, validEmails, message) => {
  // Send email to valid email addresses
  for (let j = 0; j < validEmails.length; j++) {
    const templateParams = {
      from_name: senderEmail,
      email_id: validEmails[j],
      message: message
    };

    // Use Firestore to store sent emails
    try {
      const docRef = await addDoc(collection(db, "sentEmails"), {
        senderEmail: senderEmail,
        recipientEmail: validEmails[j],
        message: message,
        sentAt: new Date().toISOString()
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    // Send email using EmailJS
    emailjs.send('service_j5i1hzo', 'template_fzwmtir', templateParams, "gpuJcM7SYxjXUWQvD")
      .then(function(response) {
        console.log("SUCCESS", response);
      }, function(error) {
        console.log("FAILED", error);
      });
  }
};

export { sendEmails ,getSentEmails};
