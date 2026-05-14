import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

async function seed() {
  await mongoose.connect('mongodb://127.0.0.1:27017/car-zone');

  const userSchema = new mongoose.Schema({}, { strict: false });
  const UserModel = mongoose.model('User', userSchema);

  const carSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    brand: String,
    model: String,
    vin: String,
    purchaseDate: Date,
    plate: String,
  }, { strict: false });
  const CarModel = mongoose.model('UserCar', carSchema);

  let user = await UserModel.findOne({ email: 'dina122@test.com' });
  if (!user) {
    user = await UserModel.create({
      name: 'Dina',
      email: 'dina122@test.com',
      password: await bcrypt.hash('password', 10),
      role: 'Customer',
    });
    console.log('Created User');
  }

  const cars = await CarModel.find({ userId: user._id });
  if (cars.length === 0) {
    await CarModel.create({
      userId: user._id,
      brand: 'Toyota',
      model: 'Corolla 2024',
      vin: 'VIN1234567890',
      purchaseDate: new Date(),
      plate: 'أ ب ت 123',
    });
    console.log('Created Car');
  }

  console.log('Done');
  process.exit(0);
}
seed();
