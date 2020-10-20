export interface comments {
  '@id'?: string;
  comment?: string;
  dateOfComment?: Date;
  subject: string;
  isPrivate: boolean;
  authoredBy?: {
    '@id': string;
    firstName: string;
    lastName: string;
  };
  shift?:
    {
      '@id'?: string;
      onDuty: {
        firstName: string;
        lastName: string;
      }
    };
  recipient?: {
    '@id'?: string;
    firstName: string;
    lastName: string;
  };
  markedAsRead?: boolean;
  id?: string;
}
