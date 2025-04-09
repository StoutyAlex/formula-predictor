import { getModelForClass } from '@typegoose/typegoose';
import { User } from '../schemas/user.schema';

export class UserCollection {
  static readonly model = getModelForClass(User, {
    schemaOptions: {
      collection: 'users',
    },
  });

  static async findById(id: string) {
    return await this.model.findOne({ _id: id }).exec();
  }

  static async findByUsername(username: string) {
    return await this.model.findOne({ username }).exec();
  }

  static async findByEmail(email: string) {
    return await this.model.findOne({ email }).exec();
  }

  static async exists(query: object) {
    return await this.model.exists(query);
  }
}
