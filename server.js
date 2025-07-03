const express = require("express");
const path = require("path")
const app = express();
const Location = require('./src/location.model.js')

const { findOneUser, findAllLocations, addLocation, findOneLocation } = require('./src/db/mongoCRUDs.js'); // Make sure this is required

// Middleware
app.use(express.json()); // json parsing
app.use(express.static(path.join(__dirname, 'public')));

// Endpoints



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public','index.html'));
});

app.post('/login', async (req, res) => {
    console.log("Login req.body:", req.body);
    const { username, password } = req.body;
    try {
        const user = await findOneUser(username, password);
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        res.status(200).json(user);
        console.log("User logged in successfully: " + user.username);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error("Error during login: " + error.message);
    }
});

// adds a new location
app.post("/loc", async (req, res) => {
    try {
        const location = await addLocation(req.body);
        res.status(201)
            .set('Location', `/loc/${location._id}`)
            .json(location);
        console.log("Location created with id: " + location._id);
    } catch (error) {
        res.status(500).json({message: error.message});        
    }
});

// gets all locations
app.get("/loc", async (req, res) => {
    try {
        const locations = await findAllLocations();
        console.log("Fetched locations:", locations);
        res.status(200)
           .set('Content-Type', 'application/json')
           .json(locations);
        console.log("Locations retrieved successfully");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// get single location by id
app.get("/loc/:id", async (req, res) => {
    try {
        const location = await findOneLocation(_id);
        if (!location) {
            return res.status(404).json({ message: "Location not found" });
        }
        res.status(200)
           .set('Content-Type', 'application/json')
           .json(location);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// updates a location by id
/*
app.put("/loc/:id", async (req, res) => {
    try {
        console.log("PUT /loc/:id called with id:", req.params.id);
        console.log("Request body:", req.body);
        const id = req.params.id;
        const result = await updateLocation(id, req.body);
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Location not found" });
        }
        res.status(204).send();
        console.log("Location updated successfully");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// deletes a location by id
app.delete("/loc/:id", async (req, res) => {
    try {
        const id = req.params.id
        const result = await deleteLocation(id);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Location not found" });
        }
        res.status(204).send();
        console.log("Location deleted successfully");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
*/
app.put("/loc/:id", async (req, res) => {
    try {
        console.log("PUT /loc/:id called with id:", req.params.id);
        console.log("Request body:", req.body);
        const id = req.params.id;
        const result = await updateLocation(id, req.body);
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Location not found" });
        }
        res.status(200).json({ message: "Location updated successfully" });
        console.log("Location updated successfully");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete("/loc/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteLocation(id);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Location not found" });
        }
        res.status(200).json({ message: "Location deleted successfully" });
        console.log("Location deleted successfully");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
let server = app.listen(3000, () => {
    console.log("Running at port " + 3000) });
