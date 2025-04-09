import { getModelForClass, prop } from '@typegoose/typegoose';
import { randomUUID } from 'crypto';

export class Season {
  @prop({ type: String, default: () => randomUUID() })
  public _id!: string;

  @prop({ type: String, required: true, unique: true })
  public year!: string;
}

