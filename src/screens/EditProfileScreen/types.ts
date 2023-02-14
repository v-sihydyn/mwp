import { User } from '../../API';

export type IEditableUserField = 'name' | 'username';
export type IEditableUser = Pick<User, IEditableUserField>;
