import { prop } from '@typegoose/typegoose';
import { randomUUID } from 'crypto';

export interface Country {
  name: string;
  code: string;
}

export class Constructor {
  @prop({ type: String, default: () => randomUUID(), unique: true })
  public _id?: string;

  @prop({ type: String, required: true })
  public name!: string;

  @prop({ type: String, required: true })
  public fullName!: string;

  @prop({ type: Object, required: true })
  public country!: Country;

  @prop({ type: String, required: true })
  public colour!: string;

  // TODO: Make this requird
  @prop({ type: String })
  public logoUrl?: string;
}
