const express = require("express");
const path = require("path")
const app = express();

// Middleware
app.use(express.json()); // json parsing
app.use(express.static(path.join(__dirname, '../public')));

// Endpoints
app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.post("/locs" (req, res) => {
    
});

app.get("/locs" (req, res) => {

});

app.get("/locs" (req, res) => {

});

app.put("/locs" (req, res) => {

});

app.delete("/locs")

let server = app.listen(3000, () => {
    console.log("Running at port " + 3000) });
