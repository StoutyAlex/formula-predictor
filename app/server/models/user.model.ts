import { getModelForClass, mongoose, prop, type DocumentType, type ReturnModelType } from '@typegoose/typegoose';
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

  static async findById(this: ReturnModelType<typeof User>, id: string): Promise<User | null> {
    return await this.findOne({ _id: id }).exec();
  }

  static async findByUsername(this: ReturnModelType<typeof User>, username: string): Promise<User | null> {
    return await this.findOne({ username }).exec();
  }

  static async findByEmail(this: ReturnModelType<typeof User>, email: string): Promise<User | null> {
    return await this.findOne({ email }).exec();
  }
}

export const UserModel = getModelForClass(User);
