import express from "express";
import { fetchAllPatientData, fetchPatientData, modifyPatientData, insertPatient, fetchMessages, messageAI, sendAlert } from "../controllers/controller.js";

const router = express.Router();

// Fetch All Patients
router.get("/patient", fetchAllPatientData);
// Fetch One Patient
router.get("/patient/:id", fetchPatientData);
// Modify One Patient
router.patch("/patient/:id", modifyPatientData);
// Add A Patient
router.post("/patient", insertPatient);
// Fetch Messages
router.get("/message", fetchMessages);
// AI
router.post("/scribe", messageAI);
// SSE
router.get("/events", sendAlert);
// if time permits, ai automatic fillout form
// router.post("/fill", () => {});

export default router;
