import express from "express";

import {
  getPaintings,
  getEpisode,
  getEpisodeById,
  getPaintingById,
  createPainting,
  createEpisodes,
  getColors,
  getColorsById,
  createColors,
} from "./database.js";

const app = express();
app.use(express.json());

const port = 8080;

//GETs
app.get("/paintings", async (req, res) => {
  const paintings = await getPaintings();
  res.send(paintings);
});

app.get("/paintings/:id", async (req, res) => {
  const id = req.params.id;
  const painting = await getPaintingById(id);
  res.send(painting);
});

app.get("/episodes", async (req, res) => {
  const paintings = await getEpisode();
  res.send(paintings);
});

app.get("/episodes/:id", async (req, res) => {
  const id = req.params.id;
  const painting = await getEpisodeById(id);
  res.send(painting);
});

app.get("/colors", async (req, res) => {
  let colors = await getColors();
  res.send(colors);
});
app.get("/colors/:id", async (req, res) => {
  let id = req.params.id;
  let colors = await getColorsById(id);
  res.send(colors);
});

//POSTs
app.post("/painting", async (req, res) => {
  const { painting_index, title, image_url } = req.body;
  const painting = await createPainting(painting_index, title, image_url);
  res.status(201).send(painting);
});

app.post("/episode", async (req, res) => {
  const { painting_id, episode, season, youtube_video } = req.body;
  const new_episode = await createEpisodes(
    painting_id,
    episode,
    season,
    youtube_video
  );
  res.status(201).send(new_episode);
});

app.post("/colors", async (req, res) => {
  const [painting_id, color_hex, color] = req.body;
  let new_color = await createColors(painting_id, color_hex, color);
  res.status(201).send(new_color);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Servr is running on port: ${port}`);
});
