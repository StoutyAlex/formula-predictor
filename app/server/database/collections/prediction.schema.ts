import { getModelForClass } from '@typegoose/typegoose';
import { User } from '../schemas/user.schema';
import type { RootFilterQuery } from 'mongoose';
import { Prediction } from '../schemas/prediction.schema';

export class PredictionCollection {
  static readonly model = getModelForClass(Prediction, {
    schemaOptions: {
      timestamps: true,
      collection: 'predictions',
    },
  });

  static async create(data: Omit<Prediction, '_id'>) {
    const league = new this.model(data);
    const result = await league.save();
    return result.toObject();
  }

  static async update(id: string, data: Prediction) {
    const result = await this.model.updateOne({ _id: id }, { $set: data }).exec();
    return result.modifiedCount === 1;
  }

  static async getAllForUser(userId: string) {
    const predictions = await this.model.find({ owner: userId }).exec();

    return predictions.map((prediction) => prediction.toObject());
  }

  static async getAllForUserWithYear(userId: string, year: string) {
    const predictions = await this.model.find({ owner: userId, year }).exec();
    return predictions.map((prediction) => prediction.toObject());
  }

  static async findOne(year: string, meetingId: string, owner: string) {
    const prediction = await this.model.findOne({ year, meetingId, owner }).exec();
    return prediction;
  }

  static async findById(id: string) {
    const prediction = await this.model.findOne({ _id: id }).exec();
    return prediction;
  }

  static async exists(query: RootFilterQuery<User>) {
    return await this.model.exists(query);
  }
}
