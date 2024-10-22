import express from "express";
import {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
} from "../controllers/contactController";
import { protect } from "../middleware/authMiddleware";
import {
  validateContactFields,
  validateContactId,
  validationHandler,
  validateUpdateContactFields,
} from "../middleware/validators/contactValidator";

const router = express.Router();

router.use(protect); // Protect all routes

// Create and get all contacts
router
  .route("/")
  .post(validateContactFields, validationHandler, createContact)
  .get(getContacts);

// Get, update, and delete a contact by ID
router
  .route("/:id")
  .get(validateContactId, validationHandler, getContact)
  .put(
    validateContactId,
    validationHandler,
    validateUpdateContactFields,
    validationHandler,
    updateContact
  )
  .delete(validateContactId, validationHandler, deleteContact);

export default router;
