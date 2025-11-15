import { collection, getDocs, doc, getDoc, updateDoc, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.js";
import { SYSTEM_MESSAGE } from "../constants/constants.js";

const ollamaAPI = "http://localhost:11434/api";
const ollamaModel = "gpt-oss:120b-cloud";

// follow this format for the rest of the controllers
export const fetchAllPatientData = async(_, res) => {
   try {
      const collectionRef = collection(db, "patients");
      if(!collectionRef) {
         return res.status(500).json({ error: "No Patients Exist" });
      }

      const payload = { patients: [] };
      const querySnapshots = await getDocs(collectionRef);
      querySnapshots.forEach((doc) => {
         payload.push_back(doc.data());
      });
      
      res.status(200).json(payload);
   } catch(e) {
      console.log(e.message);
      res.status(500).json(e);
   }
}

export const fetchPatientData = async (req, res) => { 
   try {
      const docRef = doc(db, "patients", req.id);
      if(!doc) {
         return res.status(400).json({ error: "Patient Does Not Exist" });
      }

      const payload = await getDoc(docRef);
      if(payload.exists()) res.status(200).json(payload.data());
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

      const docRef = doc(db, "patients", req.id);
      if(!doc) {
         return res.status(400).json({ error: "Patient Does Not Exist" });
      }

      const payload = await updateDoc(docRef, data);
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

export const messageAI = async (req, res) => {
   try {
      const data = req.body;
      if(!data) {
         return res.status(400).json({ error: "Missing Transcript" });
      }
      const response = await fetch(ollamaAPI + "/chat", {
         method: "POST",
         body: JSON.stringifiy({
            model: ollamaModel,
            messages: [
               SYSTEM_MESSAGE,
               {
                  role: "user",
                  content: data.trancsript,
               },
            ],
            stream: false,
         }),
      }).then(async (end) => await end.json());

      if(response.status === 200) {
         res.status(200).json({ content: response.message.content });
      } else {
         res.status(500).json(response);
      }
   } catch(e) {
      res.status(400).json(e);
   }
}

/* export const autoFill = (req, res) => {
   
} */

