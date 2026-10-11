import { DataSource } from "typeorm";
import { Student } from "../entities/Student.entity.js";

 export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    entities:[Student],
    synchronize:true

})

