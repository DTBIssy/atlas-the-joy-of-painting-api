# Atlas The Joy of Painting

This is my Joy of Painting API. It uses MySQL and Express.Js for API Routing

## Database Setup

To clone the repo go to your terminal and paste:

```
git clone https://github.com/DTBIssy/atlas-the-joy-of-painting-api.git
```

Check the Folders CSV and Ignore to make sure the CSV files are populated. After setup the the MySQL Schema with:

```
setup_tables.sql
```

This is what the SQL file should resemble.

```sql CREATE TABLE IF NOT EXISTS paintings(
    painting_id INT PRIMARY KEY AUTO_INCREMENT,
    painting_index INT,
    title VARCHAR(255),
    image_url TEXT

);

CREATE TABLE If NOT EXISTS colors (
    color_id INT PRIMARY KEY AUTO_INCREMENT,
    painting_id INT,
    color_hex TEXT,
    color TEXT,
    FOREIGN KEY(painting_id) REFERENCES paintings(painting_id)
);

CREATE TABLE IF NOT EXISTS episodes (
episode_id SERIAL PRIMARY KEY,
painting_id INT,
episode INT NOT NULL,
season INT NOT NULL,
youtube_video TEXT,
release_date TEXT,
FOREIGN KEY(painting_id) REFERENCES paintings(painting_id)
);
```

Now run the `csv_parser.js` file using

```js
nodd csv.parser.js
```

## API

With the database setup you'll now be able to run the API by entering

```js
npm run dev
```

or whatever you set your start too.

Now open Postman or your API testing client of choice

## Request types

you can test the following:

```js
'/episodes' or
'/episodes/:id/'
```

episodes returns the whole episode table while episode id returns a single object

```json
{
  "episode_id": 87,
  "painting_id": 87,
  "episode": 9,
  "season": 7,
  "youtube_video": "https://www.youtube.com/embed/yAiYirlcq7o",
  "release_date": null
}
```

```js
'/paintings' or
'/paintings/:id/'
```

`/paintings/` returns the entire paintings table while `/paintings/:id` returns a single object

```json
{
  "painting_id": 87,
  "painting_index": 212,
  "title": "Lake by Mountain",
  "image_url": "https://www.twoinchbrush.com/images/painting212.png"
}
```

```js
'/colors' or
'/colors/:id/'
```

`/colors/` returns the entire colors table while `/colors/:id` returns a single object

```json
{
  "color_id": 87,
  "painting_id": 87,
  "color_hex": "['#4E1500', '#DB0000', '#FFEC00', '#FFB800', '#0C0040', '#102E3C', '#021E44', '#0A3410', '#FFFFFF', '#221B15', '#C79B00']",
  "color": "['Alizarin Crimson', 'Bright Red', 'Cadmium Yellow', 'Indian Yellow', 'Phthalo Blue', 'Phthalo Green\\r\\n', 'Prussian Blue', 'Sap Green', 'Titanium White', 'Van Dyke Brown', 'Yellow Ochre']"
}
```

And if you want to join the information together with relevant data you can try the

```js
'/seasons/' or
'/seasons/:id'
```

`/seasons/` returns the entire database with the tables joined at different fields.

```sql
 SELECT episodes.season, episodes.episode, paintings.title, paintings.image_url, colors.color
    FROM episodes
    LEFT JOIN paintings ON episodes.painting_id = paintings.painting_id
    LEFT JOIN colors ON episodes.painting_id = colors.painting_id
    WHERE episodes.season = [id]
```

`/seasons/:id` returns the databae with the tables joined at different fields eith the matching season number

```json
{
      "season": 1,
      "episode": 1,
      "title": "A Walk in the Woods",
      "image_url": "https://www.twoinchbrush.com/images/painting282.png",
      "color": "['Alizarin Crimson', 'Bright Red', 'Cadmium Yellow', 'Phthalo Green\\r\\n', 'Prussian Blue', 'Sap Green', 'Titanium White', 'Van Dyke Brown']"
    },
    {
      "season": 1,
      "episode": 2,
      "title": "Mt. McKinley",
      "image_url": "https://www.twoinchbrush.com/images/painting283.png",
      "color": "['Alizarin Crimson', 'Bright Red', 'Cadmium Yellow', 'Phthalo Green\\r\\n', 'Prussian Blue', 'Sap Green', 'Titanium White', 'Van Dyke Brown']"
    },
    {
      "season": 1,
      "episode": 3,
      "title": "Ebony Sunset",
      "image_url": "https://www.twoinchbrush.com/images/painting284.png"......
```
