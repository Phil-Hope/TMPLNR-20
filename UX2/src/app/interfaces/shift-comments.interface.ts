export interface ShiftComments {
  id: string;
  comment: string;
  dateOfComment: Date;
  authoredBy: {
    firstName: string;
    lastName: string;
  };
  shift: { id: string; };
}
