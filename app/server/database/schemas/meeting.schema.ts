import { prop } from '@typegoose/typegoose';
import { v4 as uuid } from 'uuid';

// TODO move this into a shared file
export interface Country {
  name: string;
  code: string;
}

export enum SessionType {
  PRACTICE_1 = 'fp1',
  PRACTICE_2 = 'fp2',
  PRACTICE_3 = 'fp3',
  SPRINT_QUALIFYING = 'sprint_qualifying',
  SPRINT = 'sprint',
  QUALIFYING = 'qualifying',
  RACE = 'race',
}

export interface Session {
  type: SessionType;
  startDate: Date;
  endDate: Date;
}

export class Meeting {
  @prop({ type: String, default: () => uuid(), unique: true })
  public _id?: string;

  @prop({ type: String, required: true })
  public name!: string;

  @prop({ type: String, required: true })
  public longName!: string;

  @prop({ type: Object, required: true })
  public country!: Country;

  @prop({ type: Date, required: true })
  public startDate!: Date;

  @prop({ type: Date, required: true })
  public endDate!: Date;

  // This could be baked into the meeting
  @prop({ type: String, required: true })
  public trackId!: string;

  // TODO: Make this required
  @prop({ type: Array })
  public sessions!: Session[];
}
