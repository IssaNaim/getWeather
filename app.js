import express from "express";
import path from "path";
import fetch from "node-fetch";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.listen(3000, () =>{
    console.log("Server is running on port 3000");
});

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/getWeather", async (req, res) => {
    const { country, unit } = req.query;
    const apiKey = "9466d3ab3063fa6feeccd941951ad66f";
    let fields = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&units=${unit}&appid=${apiKey}`);
    fields = await fields.json();
    res.render("result", { fields });
});