export interface ScheduledShift {
  id?: string;
  start: Date;
  end: Date;
   onDuty: {
    id: string,
    firstName: string,
    lastName: string
  };
  ShiftStatus: string;
  readonly comments: {
    id: string;
    comment: string
  };
}
