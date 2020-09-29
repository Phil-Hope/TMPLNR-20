export class User {
  id?: string;
  email?: string;
  roles?: any;
  password?: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  companyName?: string;
  wagePerHour?: string;
  contactNumber?: number;
   shifts?: {
    start: Date,
    end: Date
  };
}
