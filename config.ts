import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql", // Change database type to MySQL
  host: "localhost",
  port: 3306, // Default MySQL port
  username: "root",
  password: "root",
  database: "task",
  synchronize: true,
  entities: ["src/entities/*.ts"],
});
