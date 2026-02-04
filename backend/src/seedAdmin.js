import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'; 
import { UserModel } from './models/user.model.js';

dotenv.config();

console.log('MONGO_URI:', process.env.MONGO_URI);

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const createAdminUsers = async () => {
  return [
    {
      name: 'admin1',
      email: 'admin1@gmail.com',
      password: await hashPassword('12345'), 
      address: 'Tanta',
      isAdmin: true,
    },
  ];
};

mongoose
  .connect('mongodb://localhost:27017/foodmine-db1', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('✅ Connected to MongoDB');

    const adminUsers = await createAdminUsers(); 

    await UserModel.deleteOne({ email: adminUsers[0].email });
    await UserModel.insertMany(adminUsers);

    console.log('✅ Admin users seeded successfully');
    process.exit();
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
