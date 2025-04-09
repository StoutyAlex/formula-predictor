import { prop } from '@typegoose/typegoose';
import { randomUUID } from 'crypto';

export interface UserProfile {
  isAdmin?: boolean;
}

export class User {
  @prop({ type: String, default: () => randomUUID() })
  public _id!: string;

  @prop({ type: String, required: true, unique: true })
  public email!: string;

  @prop({ type: String, required: true, unique: true })
  public username!: string;

  @prop({ type: String, required: true })
  public password!: string;

  @prop({ type: Object, default: () => ({}) })
  public profile?: UserProfile;

  @prop({ type: Array })
  public groups?: string[];
}
