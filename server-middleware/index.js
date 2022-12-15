import bodyParser from "body-parser";
const app = require("express")();

app.use(bodyParser.json());
app.get("/getJSON", (req, res) => {
    res.json({ data: "data" });
});

export default app;
