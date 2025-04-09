import { prop } from '@typegoose/typegoose';
import { v4 as uuid } from 'uuid';

export class Season {
  @prop({ type: String, default: () => uuid() })
  public _id!: string;

  @prop({ type: String, required: true, unique: true })
  public year!: string;
}

