export interface ScheduledShift {
  id: string;
  start: Date;
  end: Date;
  onDuty: {
    id: string,
    firstName: string,
    lastName: string
  };
  ShiftStatus: [];
  readonly comments: {
    id: string;
    comment: string
  };
}
