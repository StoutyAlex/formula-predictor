import type { RootFilterQuery } from 'mongoose';
import { Season } from '../schemas/season.schema';
import { getModelForClass } from '@typegoose/typegoose';

export class SeasonCollection {
  static model = getModelForClass(Season, {
    schemaOptions: {
      collection: 'seasons',
    },
  });

  static async create(data: Season) {
    const season = new this.model(data);
    await season.save();
    return season;
  }

  static async update(id: string, data: Season) {
    const result = await this.model.updateOne({ _id: id }, { $set: data }).exec();
    return result.modifiedCount === 1;
  }

  static async findById(id: string) {
    return await this.model.findOne({ _id: id }).exec();
  }

  static async findByYear(year: string) {
    return await this.model.findOne({ year }).exec();
  }

  static async exists(query: RootFilterQuery<Season>) {
    return await this.model.exists(query);
  }
}
