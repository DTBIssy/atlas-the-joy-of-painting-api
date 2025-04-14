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

export async function createFeature(feature_id, feature_name) {
  try {
    const [result] = await pool.query(
      `INSERT INTO features (feature_id, feature_name) VALUES (?, ?)`,
      [feature_id, feature_name]
    );
    return result.insertId;
  } catch (error) {
    console.log(error);
  }
}

export async function getPaintingId(title) {
  const [rows] = await pool.query(
    `SELECT painting_id FROM paintings WHERE LOWER(title) = ?`,
    [title.toLowerCase()]
  );
  return rows.length ? rows[0].painting_id : null;
}

export async function linkPaintingFeature(paintingId, featureId, value) {
  await pool.query(
    `INSERT INTO painting_features (painting_id, feature_id, value) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)`,
    [paintingId, featureId, value]
  );
}

export async function getBySeason() {
  const rows = await pool.query(
    `
    SELECT episodes.season ,episodes.episode, paintings.title, paintings.image_url, colors.color
    FROM episodes
    LEFT JOIN paintings
    ON episodes.painting_id = paintings.painting_id
    LEFT JOIN colors
    ON episodes.painting_id = colors.painting_id
    `
  );
  return rows;
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

export async function episodeBySeason(id) {}
// const data = await createColors(
//   1,
//   "['#4E1500', '#DB0000', '#FFEC00', '#102E3C', '#021E44', '#0A3410', '#FFFFFF', '#221B15']",
//   "['Alizarin Crimson', 'Bright Red', 'Cadmium Yellow', 'Phthalo Green\r\n', 'Prussian Blue', 'Sap Green', 'Titanium White', 'Van Dyke Brown']"
// );
// console.log(data);
