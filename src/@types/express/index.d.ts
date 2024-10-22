import { User as UserType } from "../../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}
