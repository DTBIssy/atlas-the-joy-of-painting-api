import mysql from "mysql2";
import parser from "csv-parser";
import fs from "fs";
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

export async function createPainting(painting_index, title, image_url) {
  const [results] = await pool.query(
    `
    INSERT INTO paintings (painting_index, title, image_url)
    VALUES (?, ?, ?)
        `,
    [painting_index, title, image_url]
  );
  return results.insertId;
}

export async function createEpisodes(
  painting_id,
  episode,
  season,
  youtube_video
) {
  const [results] = await pool.query(
    `
        INSERT INTO episodes (painting_id, episode, season, youtube_video)
        VALUES(?, ?, ?, ?)
        `,
    [painting_id, episode, season, youtube_video]
  );
  return results;
}

export async function createColors(painting_id, color_hex, color) {
  const results = pool.query(
    `
        INSERT INTO colors (painting_id, color_hex, color)
        VALUES (?, ?, ?)
        `,
    [painting_id, color_hex, color]
  );
  return results;
}

console.log(createEpisodes(1, 2, 3, "hullabaloo").then(resolve));
