import express from "express"; // TODO Änderung 
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer'; // ← Neu hinzufügen
import { findOneUser, findAllLocations, addLocation, findOneLocation, updateLocation, deleteLocation } from './src/db/mongoCRUDs.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Multer Configuration für File Upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/ressources/images/') // Ordner wo Bilder gespeichert werden
  },
  filename: function (req, file, cb) {
    // Eindeutiger Dateiname: timestamp + original extension
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Nur Bilder erlauben
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Nur Bilder sind erlaubt!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});


// Middleware
app.use(express.json()); // json parsing
app.use(express.static(path.join(__dirname, 'public')));
app.use('/ressources', express.static(path.join(__dirname, 'ressources')));

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
/*
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
*/

app.post("/loc", upload.single('image'), async (req, res) => {
    try {
        const locationData = req.body;
        
        // Wenn ein Bild hochgeladen wurde, speichere den Pfad
        if (req.file) {
            locationData.image = `/ressources/images/${req.file.filename}`;
        }
        
        const location = await addLocation(locationData);
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
        const location = await findOneLocation(req.params.id);
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

/*
app.put("/loc/:id", async (req, res) => {
    try {
        console.log("PUT /loc/:id called with id:", req.params.id);
        console.log("Request body:", req.body);
        
        const result = await updateLocation(req.params.id, req.body);
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Location not found" });
        }
        res.status(204).send();
        console.log("Location updated successfully");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
*/
app.put("/loc/:id", upload.single('image'), async (req, res) => {
    try {
        console.log("PUT /loc/:id called with id:", req.params.id);
        
        const updateData = req.body;
        
        // Wenn ein neues Bild hochgeladen wurde
        if (req.file) {
            updateData.image = `/ressources/images/${req.file.filename}`;
        }
        
        const result = await updateLocation(req.params.id, updateData);
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Location not found" });
        }
        res.status(204).send();
        console.log("Location updated successfully");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.delete("/loc/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteLocation(req.params.id);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Location not found" });
        }
        res.status(204).send();
        console.log("Location deleted successfully");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
let server = app.listen(3000, () => {
    console.log("Running at port " + 3000) });
