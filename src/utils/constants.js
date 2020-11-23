import * as dotenv from 'dotenv';

dotenv.config();

export default class Constants {
  static port = process.env.PORT;

  static env = process.env.NODE_ENV;

  static database = {
    host: process.env.DATABASE_HOST,
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  };

  static timezone = process.env.TIMEZONE;

  static language = process.env.LANGUAGE;

  static github = {
    host: process.env.GITHUB_HOST,
  }
}
