const csv = require("csv-parser");
const fs = require("fs");
const mysql = require("mysql2/promise");
const results = [];

const filename = "Colors_Used.csv";

async function CSVParser(file) {
  fs.createReadStream(file)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      for (let i = 0; i < results.length; i++) {
        let id = results[i].id;
        let painting_index = results[i].painting_index;
        let img_src = results[i].img_src;
        let painting_title = results[i].painting_title;
        let season = results[i].season;
        let episode = results[i].episode;
        let num_colors = results[i].num_colors;
        let youtube_src = results[i].youtube_src;
        let colors = results[i].colors;
        let color_hex = results[i].color_hex;
        // Stupid colors
        let Black_Gesso = results[i].Black_Gesso;
        let Bright_Red = results[i].Bright_Red;
        let Burnt_Umber = results[i].Burnt_Umber;
        let Cadmium_Yellow = results[i].Cadmium_Yellow;
        let Dark_Sienna = results[i].Dark_Sienna;
        let Indian_Red = results[i].Indian_Red;
        let Indian_Yellow = results[i].Indian_Yellow;
        let Liquid_Black = results[i].Liquid_Black;
        let Liquid_Clear = results[i].Liquid_Clear;
        let Midnight_Black = results[i].Midnight_Black;
        let Phthalo_Blue = results[i].Phthalo_Blue;
        let Phthalo_Green = results[i].Phthalo_Green;
        let Prussian_Blue = results[i].Prussian_Blue;
        let Sap_Green = results[i].Sap_Green;
        let Titanium_White = results[i].Titanium_White;
        let Van_Dyke_Brown = results[i].Van_Dyke_Brown;
        let Yellow_Ochre = results[i].Yellow_Ochre;
        let Alizarin_Crimson = results[i].Alizarin_Crimson;
        return results;
      }
    });
}

async function ColorsUsedSQL(data) {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "Bob_Ross_TV",
    });

    await connection.execute(`
                CREATE TABLE IF EXISTS Joy_Of_Painting (
                    id INT AUTO_INCREMENT,
                    painting_index INT,
                    img_src VARCHAR(255),
                    painting_title VARCHAR(255),
                    season INT,
                    episode INT,
                    num_colors INT,
                    youtube_src VARCHAR(255),
                    colors TEXT,
                    color_hex TEXT,
                    Black_Gesso BOOLEAN,
                    Bright_Red BOOLEAN,
                    Burnt_Umber BOOLEAN,
                    Cadmium_Yellow BOOLEAN,
                    Dark_Sienna BOOLEAN,
                    Indian_Red BOOLEAN,
                    Indian_Yellow BOOLEAN,
                    Liquid_Black BOOLEAN,
                    Liquid_Clear BOOLEAN,
                    Midnight_Black BOOLEAN,
                    Phthalo_Blue BOOLEAN,
                    Phthalo_Green BOOLEAN,
                    Prussian_Blue BOOLEAN,
                    Sap_Green BOOLEAN,
                    Titanium_White BOOLEAN,
                    Van_Dyke_Brown BOOLEAN,
                    Yellow_Ochre BOOLEAN,
                    Alizarin_Crimson BOOLEAN
                    PRIMARY KEY (painting_index)
                );
                `);

    for (const row of data) {
      const query = `
                    INSERT INTO joy_of_painting SET ?`;
      await connection.execute(query, row);
    }
    console.log("Data inserted");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    if (connection) {
      console.log("Succsuful connection");
      await connection.end();
    }
  }
}

async function main() {
  try {
    const parsedData = await CSVParser(filename);
    await ColorsUsedSQL(parsedData);
  } catch (error) {
    console.error("An error occured", error);
  }
}

main();
