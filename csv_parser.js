import parser from "csv-parser";
import fs from "fs";
import {
  createPainting,
  createColors,
  createEpisodes,
  getPaintingId,
} from "./database.js";

const cleanFeatureName = (name) => name.replace(/_/g, " ").toLowerCase().trim();
const cleanTitle = (title) => title.toLowerCase().trim();

async function ColorsUsedParser() {
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

async function processFeatures() {
  try {
    // Store feature names and their IDs
    const featureIds = {};

    // Read and process CSV
    let headers = [];

    const rows = await new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(csvFilePath)
        .pipe(parser({}))
        .on("headers", (headerRow) => {
          headers = headerRow.slice(2).map(cleanFeatureName);
        })
        .on("data", (row) => results.push(row))
        .on("end", resolve)
        .on("error", reject);
    });

    console.log("Processing features...");
    for (const row of rows) {
      // Insert all features first
      for (const featureName of headers) {
        let count = 0;
        const featureId = await createFeature(count, featureName);
        featureIds[featureName] = featureId;
        count++;
        console.log(`Processed feature: ${featureName} with ID: ${featureId}`);
      }
    }

    // Rest of your code...
  } catch (error) {
    console.error("Error processing features:", error);
  }
}
processFeatures();
ColorsUsedParser();
