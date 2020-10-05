export interface User {
  id: string;
  email: string;
  roles: string;
  password: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  wagePerHour: string;
  contactNumber: number;
   shifts: {
     id: string;
     start: Date;
     end: Date;
     ShiftStatus: string;
  };
}
