import parser from "csv-parser";
import fs from "fs";
import { createPainting, createColors, createEpisodes } from "./database.js";

const rows = await new Promise((resolve, reject) => {
  const results = [];
  fs.createReadStream("Ignore/Colors_Used.csv")
    .pipe(parser({}))
    .on("data", (row) => results.push(row))
    .on("end", () => resolve(results));
});

for (const row of rows) {
  if (row !== rows.length) {
    const painting_index = row.painting_index;
    const img_url = row.img_src;
    const title = row.painting_title;
    const season = parseInt(row.season);
    const episode = row.episode;
    const youtube_video = row.youtube_src;
    const colors = row.colors;
    const colorsHex = row.colors_hex;

    const painting_id = await createPainting(painting_index, title, img_url);

    const insertedId = await createEpisodes(
      painting_id,
      episode,
      season,
      youtube_video
    );
    await createColors(insertedId, colorsHex, colors);
  }
}
