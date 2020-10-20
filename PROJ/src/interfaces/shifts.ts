export interface shifts {
  '@id'?: string;
  start: Date;
  end: Date;
  onDuty: {
    '@id': string;
    firstName: string;
    lastName: string;
  };
  ShiftStatus: string;
  isApproved: boolean;
  readonly comments?: string[];
  id?: string;
}
