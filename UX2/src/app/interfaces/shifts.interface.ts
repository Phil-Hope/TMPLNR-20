export class ScheduledShift {
  id: string;
  start: string;
  end: string;
   onDuty: {
     id: string;
     firstName: string;
     lastName: string;
     profilePicture: string;
   };
  ShiftStatus: string;
  isApproved: boolean;
   comments: {
    id: string;
    comment: string;
  };
}
