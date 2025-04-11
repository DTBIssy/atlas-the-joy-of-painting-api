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

export async function getPaintings() {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM paintings`
  );
  return rows;
}
export async function getPaintingById(id) {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM paintings
    WHERE painting_id = ?`,
    [id]
  );
  return rows[0];
}

export async function createPainting(painting_index, title, image_url) {
  try {
    const [results] = await pool.query(
      `
    INSERT INTO paintings (painting_index, title, image_url)
    VALUES (?, ?, ?)
        `,
      [painting_index, title, image_url]
    );
    return results.insertId;
  } catch (error) {
    console.log(error);
  }
}

export async function getEpisode() {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM episodes`
  );
  return rows;
}
export async function getEpisodeById(id) {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM episodes
    WHERE painting_id = ?`,
    [id]
  );
  return rows[0];
}

export async function createEpisodes(
  painting_id,
  episode,
  season,
  youtube_video
) {
  try {
    const [results] = await pool.query(
      `
        INSERT INTO episodes (painting_id, episode, season, youtube_video)
        VALUES(?, ?, ?, ?)
        `,
      [painting_id, episode, season, youtube_video]
    );
    console.log(results);
    return results;
  } catch (error) {
    console.log(error);
  }
}

export async function getColors() {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM colors
    `
  );
  return rows;
}
export async function getColorsById(id) {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM colors
    WHERE painting_id = ?
    `,
    [id]
  );
  return rows[0];
}

export async function createColors(painting_id, color_hex, color) {
  try {
    const result = pool.query(
      `
        INSERT INTO colors (painting_id, color_hex, color)
        VALUES (?, ?, ?)
        `,
      [painting_id, color_hex, color]
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}
// const data = await createColors(
//   1,
//   "['#4E1500', '#DB0000', '#FFEC00', '#102E3C', '#021E44', '#0A3410', '#FFFFFF', '#221B15']",
//   "['Alizarin Crimson', 'Bright Red', 'Cadmium Yellow', 'Phthalo Green\r\n', 'Prussian Blue', 'Sap Green', 'Titanium White', 'Van Dyke Brown']"
// );
// console.log(data);
