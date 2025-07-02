const express = require("express");
const mongoose = require("mongoose");
const path = require("path")
const app = express();
const Location = require('./src/location.model.js')

// Middleware
app.use(express.json()); // json parsing
app.use(express.static(path.join(__dirname, '../public')));

// Endpoints
app.get('/', (req, res) => {
    res.send(index.html);
});

app.post("/locs", async (req, res) => {
    try {
        const location = await Location.create(req.body);
        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({message: error.message});        
    }
});
/*
app.get("/locs" (req, res) => {
    Location.find({}, (err, locations) => {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.status(200).json(locations);
        
    })
});

app.get("/locs" (req, res) => {

}

app.put("/locs" (req, res) => {

});

app.delete("/locs")
*/
let server = app.listen(3000, () => {
    console.log("Running at port " + 3000) });
