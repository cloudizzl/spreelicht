const LOGIN_SCREEN = document.getElementById("login-screen")
const MAIN_SCREEN = document.getElementById("main-screen")
const ADD_SCREEN = document.getElementById("add-screen")
const UPDATE_SCREEN = document.getElementById("update-screen")
const LOGIN_FORM = document.getElementById("login-form")
const ADD_FORM = document.getElementById("add-form")
const UPDATE_FORM = document.getElementById("update-form");
const LOCATIONS_LIST = document.querySelector(".locations-list");

/*
LOGIN_SCREEN.style.display = "block";
MAIN_SCREEN.style.display = "none";
ADD_SCREEN.style.display = "none";
UPDATE_SCREEN.style.display = "none";
*/

/******************************************************************************
 *                             DATABASE                                *
 ******************************************************************************/

const ADMIN = {
    username: "admina",
    password: "password",
    role: "admin",
    name: "Mina"
};
const NORMAL = {
    username: "normalo",
    password: "password",
    role: "non-admin",
    name: "Norman"
};

let users = [
    ADMIN,
    NORMAL
];

let loggedInUser = null;
let currentLocationIndex = -1;
let locationId = 4;

let locations = [
    {
        id: 1,
        locationName: "S-Bahn Verspätung",
        title: "S-Bahn Verspätung",
        description: "Häufige Verspätungen der S-Bahn",
        address: "Koppenstraße 3",
        zipCode: "10243",
        city: "Berlin",
        category: "ÖPNV",
        image: "../ressources/images/Verspätung.jpeg",
        lat: 52.5200,
        lon: 13.4050
    },
    {
        id: 2,
        locationName: "S-Bahnverkehr unterbrochen",
        title: "S-Bahnverkehr in S Schöneweide unterbrochen",
        description: "Komplette Unterbrechung des S-Bahnverkehrs",
        address: "Michael-Brückner-Straße 42",
        zipCode: "12439",
        city: "Berlin",
        category: "ÖPNV",
        image: null,
        lat: 52.4579,
        lon: 13.5264
    },
    {
        id: 3,
        locationName: "Leihfahrzeuge blockieren",
        title: "Leihfahrzeuge blockieren Straßen",
        description: "E-Scooter und Leihfahrräder blockieren Gehwege",
        address: "Manteuffelstraße 77",
        zipCode: "10999",
        city: "Berlin",
        category: "Transportmittel-Sharing",
        image: "../ressources/images/Manteuffelstraße.JPG",
        lat: 52.4988,
        lon: 13.4187
    }
];


/******************************************************************************
 *                           GENERAL FUNCTIONS                                *
 ******************************************************************************/

function initApp() {
    showScreen("login");
    setupEventListeners();
}

function showScreen(screenName) {
    // hide all screens
    [LOGIN_SCREEN, MAIN_SCREEN, ADD_SCREEN, UPDATE_SCREEN].forEach(screen => {
        screen.style.display = "none";
    });

    // all screens listed
    const screens = {
        "login": LOGIN_SCREEN,
        "main": MAIN_SCREEN,
        "add": ADD_SCREEN,
        "update": UPDATE_SCREEN
    };

    // display specific screen
    if (screens[screenName]) {
        screens[screenName].style.display = "block";
    }

}

function setupEventListeners() {
    // logging in
    LOGIN_FORM.addEventListener("submit", login);

    // logging out
    document.getElementById("logoutButton").addEventListener("click", logout);
    
    // pressing add button
    document.getElementById("addButton").addEventListener("click",() => showScreen("add"));

    // submitting the new location
    ADD_FORM.addEventListener("submit", submitLocation);

    // updating a location
    UPDATE_FORM.addEventListener("submit", updateLocation);

    const formCancelBtn = document.getElementById("formCancelLocation");
    const formUpdateBtn = document.getElementById("formUpdateLocation");
    const formDeleteBtn = document.getElementById("formDeleteLocation");

    if (formCancelBtn) formCancelBtn.addEventListener("click", cancelForm);
    if (formUpdateBtn) formUpdateBtn.addEventListener("click", updateLocation);
    if (formDeleteBtn) formDeleteBtn.addEventListener("click", deleteLocation);
}

function updateWelcomeMessage() {
    const welcomeHeading = document.getElementById("welcome-heading");
    if (welcomeHeading && loggedInUser) {
        welcomeHeading.textContent = `Welcome to Spreelicht, ${loggedInUser.name}!`
    }
}

function updateUIForUser() {
    const buttons = [
        addButton = document.getElementById("addButton"),
        updateButton = document.getElementById("updateButton"),
        deleteButton = document.getElementById("deleteButton")
    ]
    
    if(buttons) {
        buttons.forEach(button => {
            if (button) {
                button.style.display = loggedInUser.role === "admin" ? "block" : "none";
            }
        });
    }
}
/******************************************************************************
 *                             LOGIN    /   LOGOUT                            *
 ******************************************************************************/

function login(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const user = users.find(u =>
        u.username === username && u.password === password);

    if (user) {
        loggedInUser = user;
        updateWelcomeMessage();
        updateUIForUser();
        showScreen("main");
        // LOGIN_FORM.reset();
    } else {
        alert("Invalid username or password!")
    }
}

function logout() {
    loggedInUser = null;
    const welcomeHeading = document.getElementById("welcome-heading");
    if (welcomeHeading) {
        welcomeHeading.textContent = "Welcome to Spreelicht!";
    }
    // LOGIN_FORM.reset();
    showScreen("login");
}

/******************************************************************************
 *                             ADD SCREEN                                    *
 ******************************************************************************/


async function submitLocation(e) {
    e.preventDefault();
    const formData = {
        locationName: document.getElementById('locationName').value.trim(),
        title: document.getElementById('title').value.trim(),
        description: document.getElementById('description').value.trim(),
        address: document.getElementById('address').value.trim(),
        zipCode: document.getElementById('zip').value.trim(),
        city: document.getElementById('city').value.trim(),
        category: document.getElementById('categories').value
    };

    try {
        const coords = await getCoordinates(formData.address, formData.zipCode, formData.city);

        if (coords) {
            const newLocation = {
                id: locationId++,
                locationName: formData.locationName,
                title: formData.title,
                description: formData.description,
                address: formData.address,
                zipCode: formData.zipCode,
                city: formData.city,
                category: formData.category,
                image: null,
                lat: coords.lat,
                lon: coords.lon
            }

            // add the new location to the locations array
            locations.push(newLocation)
            renderLocationsList();
            showScreen("main");
            clearAddForm();
            alert("Location added successfully!");
        } else {
            alert("Could not find coordinates for this address.");
        }
    } catch (error) {
        console.error("Error adding location:", error);
        alert("Error adding location.")
    }
}

async function getCoordinates(address, zipCode, city) {
    /* url = "https://nominatim.openstreetmap.org/search?street="+address
        +"&city="+city+"&country=Germany&postalcode="+zipCode+"&format=json" */

    const url = "https://nominatim.openstreetmap.org/search?street=Koppenstraße%203&city=Berlin&country=Germany&postalcode=10243&format=json&limit=1";

    try {
        const response = await fetch(url);
        const data = await response.json();

        // return coords
        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon)
            };
        }
        return null;
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        return null;
    }
}

function cancelForm() {
    showScreen("main");
    currentLocationIndex = -1;
    clearAddForm();
}

function clearAddForm() {
    if(ADD_FORM) {
        ADD_FORM.reset();
        const cityInput = document.getElementById('city');
        if (cityInput) cityInput.value = 'Berlin';
    }
}

/******************************************************************************
 *                             Update SCREEN                                  *
 ******************************************************************************/
function showUpdateScreen(locationIndex) {
    currentLocationIndex = locationIndex;
    const location = locations[locationIndex];

    if (location) {
        document.getElementById("update-locationName").value = location.locationName;
        document.getElementById("update-title").value = location.title;
        document.getElementById("update-description").value = location.description;
        document.getElementById("update-address").value = location.address;
        document.getElementById("update-zip").value = location.zipCode;
        document.getElementById("update-city").value = location.city;
        document.getElementById("update-categories").value = location.category;

        showScreen("update");
    }
}

async function updateLocation(){
    const location = locations[currentLocationIndex];
    
    // fill form with existing data
    const formData = {
        locationName: document.getElementById('locationName').value.trim(),
        title: document.getElementById('title').value.trim(),
        description: document.getElementById('description').value.trim(),
        address: document.getElementById('address').value.trim(),
        zipCode: document.getElementById('zip').value.trim(),
        city: document.getElementById('city').value.trim(),
        category: document.querySelector("#update-screen select[name='categories']").value
    };

    // save address change
    const addressChanged = formData.address !== location.address ||
        formData.zipCode !== location.zipCode ||
        formData.city !== location.city;
    
    // request new coords if address changed
    try  {
        let coordinates = {lat: location.lat, lon: location.lon};
        
        if (addressChanged) {
            coordinates = await getCoordinates(formData.address, formData.zipCode, formData.city);
            if (!coordinates) {
                alert("Could not find coordinates for this address.");
                return;
            }
        }
        // Update the location object
        locations[currentLocationIndex] = {
            ...location,
            locationName: formData.locationName,
            title: formData.title,
            description: formData.description,
            address: formData.address,
            zipCode: formData.zipCode,
            city: formData.city,
            category: formData.category,
            lat: coordinates.lat,
            lon: coordinates.lon
        };
        
        // renderLocationsList();
        showScreen("main");
        alert("Location updated successfully!");
    }catch (error) {
        console.error("Error updating location:", error);
        alert("Error updating location. Please try again.");
    }
}

function deleteLocation() {
    if (confirm("Are you sure you want to delete this location?")) {
        locations.splice(currentLocationIndex, 1);
        renderLocationsList();
        showScreen("main");
        alert("Location deleted successfully!");
        currentLocationIndex = -1; // Reset the index
    }
}

/******************************************************************************
 *                       LOCATION FUNCTION                                    *
 ******************************************************************************/

function renderLocationsList() {
    if (!LOCATIONS_LIST) return;

    LOCATIONS_LIST.innerHTML = "";

    locations.forEach((location, index) => {
        const locationCard = document.createElement("article");
        locationCard.className = "location-card";
        locationCard.setAttribute("role", "listitem");
        locationCard.style.cursor = "pointer";
        
        locationCard.innerHTML = `
            <h3>${location.title}</h3>
            <address>
                <p>${location.address}</p>
                <p>${location.zipCode} ${location.city}</p>
            </address>
            <p>Kategorie: <span class="category">${location.category}</span></p>
            ${location.image ? `
                <figure>
                    <img src="${location.image}" 
                         alt="${location.title}" 
                         loading="lazy">
                </figure>
            ` : ''}
        `;

        // Add click event listener
        locationCard.addEventListener("click", () => showLocationDetails(index));
        
        LOCATIONS_LIST.appendChild(locationCard);
    });
}

document.addEventListener("DOMContentLoaded", initApp);