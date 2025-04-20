import { prop } from '@typegoose/typegoose';
import { v4 as uuid } from 'uuid';

export interface UserProfile {
  isAdmin?: boolean;
}

export class User {
  @prop({ type: String, default: () => uuid() })
  public _id!: string;

  @prop({ type: String, required: true, unique: true })
  public email!: string;

  @prop({ type: String, required: true, unique: true })
  public username!: string;

  @prop({ type: String, required: true })
  public password!: string;

  @prop({ type: Object, default: () => ({}) })
  public profile?: UserProfile;
}
