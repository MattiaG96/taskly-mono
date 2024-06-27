import { db } from './lib/dbConnect';
import { ObjectId } from 'mongodb';

const users = [
  {
    username: 'nathan121',
    email: 'nathan@mail.com',
    password: '$2a$10$1htO0kuUT4tcQsKN.BJKf.1uZr1uDR4pbBuzILlrftgjWp8MulUKe',
    avatar: 'https://g.codewithnathan.com/default-user.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    username: 'jane78',
    email: 'jane@mail.com',
    password: '$2a$10$1htO0kuUT4tcQsKN.BJKf.1uZr1uDR4pbBuzILlrftgjWp8MulUKe',
    avatar: 'https://g.codewithnathan.com/default-user.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
const tasks = [
  {
    name: 'Read Atomic Habits',
    description: 'Finish reading Atomic Habits by James Clear',
    priority: 'not urgent',
    due: new Date().toISOString(),
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    owner: new ObjectId(),
  },
  {
    name: 'Learn MERN Stack',
    description:
      'Learn the MERN stack and build a full-stack application with it',
    priority: 'urgent',
    due: new Date().toISOString(),
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    owner: new ObjectId(),
  },
];

export const seed = async () => {
  try {
    let collection = db.collection('users');
    console.log('[seed]', 'Seeding Users...');
    const result = await collection.insertMany(users);
    console.log(result.insertedIds);
    console.log('[seed]', 'Seeding Users Done');

    tasks[0].owner = result.insertedIds[0];
    tasks[1].owner = result.insertedIds[1];

    collection = db.collection('tasks');
    console.log('[seed]', 'Seeding Tasks...');
    await collection.insertMany(tasks);
    console.log('[seed]', 'Seeding Tasks Done');
    console.log('[seed]', 'All Done');
  } catch (error) {
    console.log('[seed]', 'Error:', error);
  }
};
