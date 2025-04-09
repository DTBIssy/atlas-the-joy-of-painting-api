import parser from "csv-parser";
import fs from "fs";
import { createPainting, createColors, createEpisodes } from "./database.js";

async function addToMysql() {
  const rows = await new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream("Ignore/Colors_Used.csv")
      .pipe(parser({}))
      .on("data", (row) => results.push(row))
      .on("end", () => resolve(results));
  });
  try {
    for (const row of rows) {
      if (row !== rows.length) {
        const painting_index = row.painting_index;
        const img_url = row.img_src;
        const title = row.painting_title;
        const season = parseInt(row.season);
        const episode = row.episode;
        const youtube_video = row.youtube_src;
        const colors = row.colors;
        const colorsHex = row.color_hex;

        const paintings = await createPainting(painting_index, title, img_url);

        const episodes = await createEpisodes(
          paintings,
          episode,
          season,
          youtube_video
        );

        await createColors(episodes.insertId, colorsHex, colors);
      } else {
        console.log("done");
      }
    }
  } catch (error) {
    console.log(error);
  }
}

addToMysql();
