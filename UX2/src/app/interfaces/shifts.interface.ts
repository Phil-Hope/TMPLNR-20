export class ScheduledShift {
  id: string;
  start: Date;
  end: Date;
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
