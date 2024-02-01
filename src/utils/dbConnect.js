import { Pool } from "pg";
export const pool = new Pool({
  user: process.env.USER_NAME,
  host: process.env.HOST_NAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.POST_NUMBER,
});

export default async function dbCoonnect() {
  await pool.connect((err, client, release) => {
    if (err) {
      return console.log("Error in Connection", err.stack);
    }
    client.query("SELECT NOW()", (err, result) => {
      release();
      if (err) {
        return console.error("Error in query Excecution", err.stack);
      }
      console.log("Connected to Database", result.rows);
    });
  });
}
