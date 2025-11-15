const express = require("express");
const router = express.Router();

// Fetch All Patients
router.get("/patient", () => {});
// Fetch One Patient
router.get("/patient/:id", () => {});
// Modify One Patient
router.patch("/patient/:id", () => {});
// Add A Message
router.post("/message", () => {});
// Pull Messages (Uses Query Parameters)
router.get("/message", () => {});
// Ask AI For Summary
router.post("/scribe", () => {});
// if time permits, ai automatic fillout form
router.post("/fill", () => {});

module.exports = router;
