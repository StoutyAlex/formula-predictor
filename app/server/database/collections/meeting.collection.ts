import type { RootFilterQuery } from 'mongoose';
import { Meeting } from '../schemas/meeting.schema';
import { getModelForClass } from '@typegoose/typegoose';
import type { Season } from '../schemas/season.schema';

export class MeetingCollection {
  public readonly MeetingModel: ReturnType<typeof getModelForClass<typeof Meeting>>;

  constructor(season: Season | string) {
    const seasonString = typeof season === 'string' ? season : season.year;

    this.MeetingModel = getModelForClass(Meeting, {
      schemaOptions: {
        collection: `meetings-${seasonString}`,
      },
    });
  }

  static season(season: Season | string) {
    return new MeetingCollection(season);
  }

  async update(id: string, data: Meeting) {
    const result = await this.MeetingModel.updateOne({ _id: id }, { $set: data }).exec();
    if (result.modifiedCount === 0) {
      return false;
    }
    return true;
  }

  async create(data: Meeting) {
    const constructor = new this.MeetingModel(data);
    await constructor.save();
    return constructor;
  }

  async findById(id: string) {
    return await this.MeetingModel.findOne({ _id: id }).exec();
  }

  async exists(query: RootFilterQuery<Meeting>) {
    return await this.MeetingModel.exists(query);
  }
}
