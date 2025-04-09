import type { RootFilterQuery } from 'mongoose';
import { Driver } from '../schemas/driver.schema';
import { getModelForClass } from '@typegoose/typegoose';
import type { Season } from '../schemas/season.schema';

export class DriverCollection {
  public readonly DriverModel: ReturnType<typeof getModelForClass<typeof Driver>>;

  constructor(season: Season | string) {
    const seasonString = typeof season === 'string' ? season : season.year;

    this.DriverModel = getModelForClass(Driver, {
      schemaOptions: {
        collection: `drivers-${seasonString}`,
      },
    });
  }

  static season(season: Season | string) {
    return new DriverCollection(season);
  }

  async create(data: Driver) {
    const driver = new this.DriverModel(data);
    await driver.save();
    return driver;
  }

  async findById(id: string) {
    return await this.DriverModel.findOne({ _id: id }).exec();
  }

  async findByNumber(number: number) {
    return await this.DriverModel.findOne({ number }).exec();
  }

  async exists(query: RootFilterQuery<Driver>) {
    return await this.DriverModel.exists(query);
  }
}
