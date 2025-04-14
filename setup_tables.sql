CREATE TABLE IF NOT EXISTS paintings(
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

CREATE TABLE IF NOT EXISTS features (
    feature_id INT PRIMARY KEY AUTO_INCREMENT,
    feature_name VARCHAR(255)
);


CREATE TABLE IF NOT EXISTS painting_features (
painting_id INT PRIMARY KEY NOT NULL,
feature_id INT NOT NULL,
value BOOLEAN NOT NULL,
FOREIGN KEY(painting_id) REFERENCES paintings(painting_id),
FOREIGN KEY(feature_id) REFERENCES features(feature_id)
);
