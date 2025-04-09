import { prop } from '@typegoose/typegoose';
import { v4 as uuid } from 'uuid';

export interface Country {
  name: string;
  code: string;
}

export class Driver {
  @prop({ type: String, default: () => uuid(), unique: true })
  public _id?: string;

  @prop({ type: String, required: true })
  public firstName!: string;

  @prop({ type: String, required: true })
  public lastName!: string;

  @prop({ type: Object, required: true })
  public country!: Country;

  @prop({ type: String, required: true })
  public abbreviation!: string;

  // TODO: Make this requird
  @prop({ type: String })
  public imageUrl?: string;

  @prop({ type: String, required: true })
  public constructorId!: string;

  @prop({ type: Number, required: true, unique: true })
  public number!: number;
}
