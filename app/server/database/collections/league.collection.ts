import { getModelForClass } from '@typegoose/typegoose';
import { User } from '../schemas/user.schema';
import type { RootFilterQuery } from 'mongoose';
import { League } from '../schemas/league.schema';

export class LeagueCollection {
  static readonly model = getModelForClass(League, {
    schemaOptions: {
      timestamps: true,
      collection: 'leagues',
    },
  });

  static async getAllForUser(userId: string) {
    const leagues = await this.model
      .find({ members: userId })
      .populate('members', 'username profile')
      .populate('owner', 'username profile')
      .exec();

    return leagues.map((league) => league.toObject());
  }

  static async create(data: Omit<League, '_id'>) {
    const league = new this.model(data);
    const result = await league.save();
    return result.toObject();
  }

  static async update(id: string, data: League) {
    const result = await this.model.updateOne({ _id: id }, { $set: data }).exec();
    return result.modifiedCount === 1;
  }

  static async findById(id: string) {
    return await this.model.findOne({ _id: id }).exec();
  }

  static async findByCode(code: string) {
    return await this.model.findOne({ code }).exec();
  }

  static async exists(query: RootFilterQuery<User>) {
    return await this.model.exists(query);
  }
}
