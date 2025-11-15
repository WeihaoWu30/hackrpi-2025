import express from "express";
import { fetchAllPatientData, fetchPatientData, modifyPatientData, insertPatient, messageAI } from "../controllers/controller.js";

const router = express.Router();

// Fetch All Patients
router.get("/patient", fetchAllPatientData);
// Fetch One Patient
router.get("/patient/:id", fetchPatientData);
// Modify One Patient
router.patch("/patient/:id", modifyPatientData);
// Add A Patient
router.post("/patient", insertPatient);
// AI
router.post("/scribe", messageAI);
// if time permits, ai automatic fillout form
// router.post("/fill", () => {});

export default router;
