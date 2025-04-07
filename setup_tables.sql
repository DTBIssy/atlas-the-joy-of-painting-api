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
    color VARCHAR (255),
    FOREIGN KEY(painting_id) REFERENCES paintings(painting_id)
);

CREATE TABLE IF NOT EXISTS episodes (
episode_id SERIAL PRIMARY KEY,
painting_id INT,
episode INT NOT NULL,
season INT NOT NULL,
youtube_video TEXT,
FOREIGN KEY(painting_id) REFERENCES paintings(painting_id)
);

