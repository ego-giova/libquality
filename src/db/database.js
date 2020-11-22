import mongoose from 'mongoose';
import Constants from '../utils/constants';

const dbHost = Constants.database.host;
const dbName = Constants.database.name;
const dbUser = Constants.database.user;
const dbPassword = Constants.database.password;

mongoose.connect(
  `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
)
  .then(() => console.log('Connection database success'))
  .catch((err) => console.log('Error', err));
