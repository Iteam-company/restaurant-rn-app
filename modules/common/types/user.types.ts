export type UserType = {
  firstName: '';
  lastName: '';
  email: '';
  phoneNumber: '';
  password: '';
  role: UserROLES;
};

export enum UserROLES {
  OWNER = 'owner',
  WAITER = 'waiter',
  ADMIN = 'admin',
}
