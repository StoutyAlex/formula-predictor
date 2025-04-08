import mongoose, { Mongoose } from 'mongoose';
import { applicationConfig } from '~/lib/config.server';

let db: Mongoose;

declare global {
  var __db: Mongoose;
}

async function connect() {
  if (db) return db;

  if (process.env.NODE_ENV === 'production') {
    db = await mongoose.connect(applicationConfig.database.url);
    console.log('Connected to MongoDB');
  } else {
    // in development, need to store the db connection in a global variable
    // this is because the dev server purges the require cache on every request
    // and will cause multiple connections to be made
    if (!global.__db) {
      global.__db = await mongoose.connect(applicationConfig.database.url);
      console.log('Connected to MongoDB');
    }

    if (global.__db) console.log('Using existing MongoDB connection');
    db = global.__db;
  }
  return db;
}

connect();

export { mongoose, connect };
