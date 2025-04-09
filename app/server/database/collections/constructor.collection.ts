import type { RootFilterQuery } from 'mongoose';
import { Constructor } from '../schemas/constructor.schema';
import { getModelForClass } from '@typegoose/typegoose';
import type { Season } from '../schemas/season.schema';

export class ConstructorCollection {
  public readonly ConstrutorModel: ReturnType<typeof getModelForClass<typeof Constructor>>;

  constructor(season: Season | string) {
    const seasonString = typeof season === 'string' ? season : season.year;

    this.ConstrutorModel = getModelForClass(Constructor, {
      schemaOptions: {
        collection: `constructors-${seasonString}`,
      },
    });
  }

  static season(season: Season | string) {
    return new ConstructorCollection(season);
  }

  async update(id: string, data: Constructor) {
    const result = await this.ConstrutorModel.updateOne({ _id: id }, { $set: data }).exec();
    if (result.modifiedCount === 0) {
      return false;
    }
    return true;
  }

  async create(data: Constructor) {
    const constructor = new this.ConstrutorModel(data);
    await constructor.save();
    return constructor;
  }

  async findById(id: string) {
    return await this.ConstrutorModel.findOne({ _id: id }).exec();
  }

  async exists(query: RootFilterQuery<Constructor>) {
    return await this.ConstrutorModel.exists(query);
  }
}
