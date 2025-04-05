import path from "path";
import { DataSource } from 'typeorm';
import { Appeals } from './entities/Appeals';
import { database_data } from './constants';

export const typeormConfig = new DataSource({
  type: 'postgres',
  database: database_data.database,
  username: database_data.username,
  password: database_data.passwors,
  logging: true,
  synchronize: true,
  migrations: [path.join(__dirname, "./migrations/*")],
  entities: [Appeals],
  subscribers: []
});
