import type { RootFilterQuery } from 'mongoose';
import { Season } from '../schemas/season.schema';
import { getModelForClass } from '@typegoose/typegoose';

export class SeasonCollection {
  static model = getModelForClass(Season, {
    schemaOptions: {
      collection: 'seasons',
    },
  });

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
