export interface ShiftComments {
  id: string;
  subject?: string;
  comment: string;
  dateOfComment: Date;
  markedAsRead?: boolean;
  isPrivate?: boolean;
  authoredBy: {
    id: string;
    firstName: string;
    lastName: string;
  };
  shift: {
    id: string;
    onDuty?: {
      firstName: string;
      lastName: string;
    };
  };
  recipient?: {
    firstName: string;
    lastName: string;
  };
}
