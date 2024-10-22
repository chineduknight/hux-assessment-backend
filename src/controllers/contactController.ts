import { Request, Response, NextFunction } from "express";
import { Contact } from "../models/Contact";
import { asyncHandler } from "../utils/asyncHandler";
import { ErrorResponse } from "../utils/ErrorResponse";

// Create a new contact
export const createContact = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, phoneNumber, email, type, address, notes } =
      req.body;
    const contact = await Contact.create({
      user: req.user?.id,
      firstName,
      lastName,
      phoneNumber,
      email,
      type,
      address,
      notes,
    });

    res.status(201).json({ data: contact });
  }
);

// Get all contacts for the logged-in user
export const getContacts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const contacts = await Contact.find({ user: req.user?.id });
    res.status(200).json({ data: contacts });
  }
);

// Get a single contact by ID
export const getContact = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return next(new ErrorResponse("Contact not found", 404));
    }

    res.status(200).json({ data: contact });
  }
);

// Update a contact by ID
export const updateContact = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const contact = await checkOwnership(req, req.params.id);
    contact.set(req.body);
    const updatedContact = await contact.save();

    res.status(200).json({ data: updatedContact });
  }
);

// Delete a contact by ID
export const deleteContact = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const contact = await checkOwnership(req, req.params.id);

    await contact.deleteOne();

    res.status(200).json({ message: "Contact deleted successfully" });
  }
);

const checkOwnership = async (req: Request, contactId: string) => {
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw new ErrorResponse("Contact not found", 404);
  }

  if (contact.user.toString() !== req.user?.id) {
    throw new ErrorResponse("Not authorized to access this contact", 401);
  }

  return contact;
};
