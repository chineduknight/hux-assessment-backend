import mongoose from "mongoose";

interface IContact extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  type: "personal" | "professional";
  address?: string;
  notes?: string;
}

const contactSchema = new mongoose.Schema<IContact>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    type: {
      type: String,
      enum: ["personal", "professional"],
      default: "personal",
    },
    address: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Contact = mongoose.model<IContact>("Contact", contactSchema);
