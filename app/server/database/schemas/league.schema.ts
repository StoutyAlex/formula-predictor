import { prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { v4 as uuid } from 'uuid';

export interface LeagueOptions {
  allowInvite: boolean;
}

export enum LeaguePrivacy {
  Public = 'Public',
  Private = 'Private',
}

export class League extends TimeStamps {
  @prop({ type: String, default: () => uuid(), unique: true })
  public _id!: string;

  @prop({ type: String, required: true })
  public name!: string;

  @prop({ type: String, required: true, unique: true })
  public slug!: string;

  @prop({ type: String, required: true })
  public description!: string;

  @prop({ type: String, required: true })
  public year!: string;

  @prop({ type: String, required: true, unique: true })
  public code!: string;

  @prop({ type: String, required: true })
  public owner!: string;

  @prop({ type: String, enum: LeaguePrivacy, required: true })
  public privacy!: LeaguePrivacy;

  @prop({ type: Array<String>, required: true })
  public members!: string[];

  @prop({ type: Object, required: true })
  public options!: LeagueOptions;
}
