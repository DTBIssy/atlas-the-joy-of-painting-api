import mysql from "mysql2";
import dotenv from "dotenv";
import { resolve } from "path";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

class EpisodeController {
  async getEpisode() {
    const [rows] = await pool.query(
      `
        SELECT *
        FROM episodes`
    );
    return rows;
  }
  async getEpisodeById(id) {
    const [rows] = await pool.query(
      `
        SELECT *
        FROM episodes
        WHERE painting_id = ?`,
      [id]
    );
    return rows[0];
  }
}
const EPControl = new EpisodeController();
export default EPControl;
