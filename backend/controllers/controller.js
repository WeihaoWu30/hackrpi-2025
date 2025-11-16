import { collection, getDocs, doc, getDoc, updateDoc, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.js";
import { SYSTEM_MESSAGE } from "../constants/constants.js";
import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({});
const model = "gemini-2.0-flash";

// follow this format for the rest of the controllers
export const fetchAllPatientData = async(_, res) => {
   try {
      const collectionRef = collection(db, "patients");
      if(!collectionRef) {
         return res.status(500).json({ error: "No Patients Exist" });
      }

      const payload = { patients: [] };
      const querySnapshots = await getDocs(collectionRef);
      querySnapshots.forEach((doc) => payload.patients.push({ ...doc.data(), patient_id: doc.id}));
      
      res.status(200).json(payload);
   } catch(e) {
      console.log(e.message);
      res.status(500).json(e);
   }
}

export const fetchPatientData = async (req, res) => { 
   try {
      const docRef = doc(db, "patients", req.params.id);
      if(!doc) {
         return res.status(400).json({ error: "Patient Does Not Exist" });
      }

      const payload = await getDoc(docRef);
      if(payload.exists()) res.status(200).json({ ...payload.data(), patient_id: payload.id});
      else res.status(500).json({ error: "Could Not Find Patient Information" });
   } catch(error) {
      console.log(error.message);
      res.status(500).json({ error });
   }
}

export const modifyPatientData = async (req, res) => {
   try {
      const data = req.body;
      if(!data) {
         return res.status(400).json({ error: "Missing Updates" });
      }

      const docRef = doc(db, "patients", req.params.id);
      const docSnap = await getDoc(docRef);
      if(!docSnap.exists()) {
         return res.status(400).json({ error: "Patient Does Not Exist" });
      }

      await updateDoc(docRef, data);
      const payload = await getDoc(docRef);
      res.status(200).json(payload.data());
   } catch(error) {
      console.log(error);
      res.status(500).json({ error });
   } 
}

export const insertPatient = async (req, res) => {
   try {
      const data = req.body;
      if(!data) {
         res.status(400).json({ error: "Missing Patient Data" });
      }

      const collectionRef = collection(db, "patients");
      const docRef = await addDoc(collectionRef, data);
      res.status(200).json({ success_id: docRef.id });
   } catch(error) {
      console.log(error);
      res.status(500).json({ error });
   }
}

export const fetchMessages = async (req, res) => {
   try {
      const sender = req.src;
      const recipient = req.dst;
      if(!sender || !recipient) {
         return res.status(400).json({ error: "" });
      }

      const sortedField = [sender, recipient].sort();
      const q = query(collection(db, "messages"), where("chatID", "in", sortedField));

      const querySnapshots = await getDocs(q);
      const payload = { messages: [] };
      querySnapshots.forEach((doc) => payload.messages.push(doc.data()));
      res.status(200).json(payload);
   } catch(error) {
      console.log(error);
      res.status(500).json({ error });
   }
}

export const messageAI = async (req, res) => {
   try {
      const data = req.body;
      if(!data) {
         return res.status(400).json({ error: "Missing Transcript" });
      }
      const chunks = [];
      for(let i = 0;i < data.transcript.length;i += 500) {
         chunks.push({
            text: data.transcript.substr(i, 500),
         });
      }
      const response = await ai.models.generateContent({
         model,
         contents: [{
            role: "user",
            parts: chunks,
         }],
         config: {
            systemInstruction: SYSTEM_MESSAGE.content,
            stream: false
         }
      });

      const collectionRef = collection(db, "logs");
      await addDoc(collectionRef, {
         transcript: chunks,
         modelResponse: response.text,
         timestamp: new Date().toLocaleString(),
         model: "gemini-2.0-flash",
      });
      res.status(200).json({ content: response.text });
   } catch(error) {
      console.log(error.message);
      res.status(400).json(error);
   }
}

export const sendAlert = (req, res) => {
   res.setHeader("Content-Type", "text/event-stream");
   res.setHeader("Cache-Control", "no-cache");
   res.setHeader("Connection", "keep-alive");
   res.flushHeaders();

   const intervalID = setInterval(() => {
      const appointment = new Date().toLocaleTimeString();
      console.log(appointment);
      res.write(`data: A new appointment has been scheduled on ${appointment}\n\n`);
   }, 45000);

   req.on("close", (req, res) => {
      clearInterval(intervalID);
      console.log("Client Disconnected From Server Sent Events");
   });
}

