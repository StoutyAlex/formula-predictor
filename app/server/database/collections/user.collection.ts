import { getModelForClass } from '@typegoose/typegoose';
import { User } from '../schemas/user.schema';
import type { RootFilterQuery } from 'mongoose';

export class UserCollection {
  static readonly model = getModelForClass(User, {
    schemaOptions: {
      collection: 'users',
    },
  });

  static async create(data: User) {
    const user = new this.model(data);
    await user.save();
    return user;
  }

  static async update(id: string, data: User) {
    const result = await this.model.updateOne({ _id: id }, { $set: data }).exec();
    return result.modifiedCount === 1;
  }

  static async findById(id: string) {
    return await this.model.findOne({ _id: id }).exec();
  }

  static async findByUsername(username: string) {
    return await this.model.findOne({ username }).exec();
  }

  static async findByEmail(email: string) {
    return await this.model.findOne({ email }).exec();
  }

  static async exists(query: RootFilterQuery<User>) {
    return await this.model.exists(query);
  }
}
