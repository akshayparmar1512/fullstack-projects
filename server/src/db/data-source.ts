
import { DataSource } from "typeorm";
import { Student } from "../entities/Student.entity.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL as string,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [Student],
  synchronize: false,
});

