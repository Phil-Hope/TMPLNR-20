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
    start: Date;
    end: Date;
    onDuty?: {
      id: string;
      firstName: string;
      lastName: string;
    };
  };
  recipient?: {
    id: string;
    firstName: string;
    lastName: string;
  };
}
