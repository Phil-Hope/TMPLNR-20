export interface user {
  '@id'?: string;
  email?: string;
  roles?: any;
  password: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  wagePerHour?: string;
  contactNumber: string;
  readonly shifts?: {
     '@id': string;
     start: Date;
     end: Date;
  };
  readonly comments?: string[];
  id?: string;
}
