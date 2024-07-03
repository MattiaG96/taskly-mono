import { config } from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';

config();

const { MONGODB_URI, MONGODB_DATABASE } = process.env;

const client = new MongoClient(MONGODB_URI || '', {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connect = async () => {
  try {
    await client.connect();
    await client.db().command({ ping: 1 });
  } catch (error) {
    console.error(error);
  }
};

connect();

export const db = client.db(MONGODB_DATABASE);
