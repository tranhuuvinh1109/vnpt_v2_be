import { User } from 'src/users/schemas/user.schema';

export type UserResponse = Omit<User, 'password'> & { id: string };
