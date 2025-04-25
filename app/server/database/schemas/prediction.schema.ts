import { prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { v4 as uuid } from 'uuid';
import type { Driver } from '~/server/static-data/static.types';

export interface Positions<T = Driver['id'] | Driver> {
  1: T;
  2: T;
  3: T;
  4: T;
  5: T;
  6: T;
  7: T;
  8: T;
  9: T;
  10: T;
}

export interface Predictions {
  fastestLap: Driver['id'];
  positions: Positions<Driver['id']>;
}

export class Prediction extends TimeStamps {
  @prop({ type: String, default: () => uuid(), unique: true })
  public _id!: string;

  @prop({ type: String, required: true })
  public year!: string;

  @prop({ type: String, required: true })
  public meetingId!: string;

  @prop({ type: String, required: true })
  public owner!: string;

  @prop({ type: Object, required: true })
  public predictions!: Predictions;
}
