import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";

const app = express();
const port = 3000;

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true }));

dotenv.config();

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/", async (req, res) => {
    try {
        console.log(req.body);
        const ipAddress = req.body.ipAddress;
        const response = await axios.get(
            `http://api.ipstack.com/${ipAddress}?access_key=7548c367de15e221e772564abe32ed20`
        );
        const result = response.data;
        console.log(result);
        res.render("index.ejs", { data: result });
    } catch (error) {
        console.error("Failed to make request", error.message);
        res.render("index.ejs", {
            error: "No activities that match your criteria",
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});