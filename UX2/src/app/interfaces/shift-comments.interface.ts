export interface ShiftComments {
  id: string;
  comment: string;
  dateOfComment: Date;
  authoredBy: {
    id: string;
    firstName: string;
    lastName: string;
  };
  shift: {
    id: string;
    onDuty: {
      firstName: string;
      lastName: string;
    };
  };
  recipient: {
    firstName: string;
    lastName: string;
  };
}
