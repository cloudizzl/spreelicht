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
        title: "S-Bahn Verspätung",
        description: "Häufige Verspätungen der S-Bahn",
        address: "Koppenstraße 3",
        zipCode: "10243",
        city: "Berlin",
        category: "ÖPNV",
        image: "../ressources/images/Verspätung.jpeg",
        lat: 52.50975365892219,
        lon: 13.435748486045767
    },
    {
        id: 2,
        title: "S-Bahnverkehr in S Schöneweide unterbrochen",
        description: "Komplette Unterbrechung des S-Bahnverkehrs",
        address: "Michael-Brückner-Straße 42",
        zipCode: "12439",
        city: "Berlin",
        category: "ÖPNV",
        image: null,
        lat: 52.45493933211213,
        lon: 13.50934934001513
    },
    {
        id: 3,
        title: "Leihfahrzeuge blockieren Straßen",
        description: "E-Scooter und Leihfahrräder blockieren Gehwege",
        address: "Manteuffelstraße 77",
        zipCode: "10999",
        city: "Berlin",
        category: "Transportmittel-Sharing",
        image: "../ressources/images/Manteuffelstraße.JPG",
        lat: 52.49780397315911,
        lon: 13.42520448234554
    }
];


/******************************************************************************
 *                           GENERAL FUNCTIONS                                *
 ******************************************************************************/

function initApp() {
    showScreen("login");
    setupEventListeners();
    renderLocationsList();
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
    document.getElementById("addButton").addEventListener("click", () => showScreen("add"));

    // submitting the new location
    //ADD_FORM.addEventListener("submit", submitLocation);

    // updating a location
    UPDATE_FORM.addEventListener("submit", updateLocation);

    const cancelBtnAdd = document.getElementById("formCancelLocationAdd");
    const cancelBtnUpdate = document.getElementById("formCancelLocationUpdate")
    //const updateBtn = document.getElementById("formUpdateLocation");
    const formBtn = document.getElementById("formDeleteLocation");

    if (cancelBtnAdd) {
        cancelBtnAdd.addEventListener("click", cancelForm);
    }

    if (cancelBtnUpdate) {
        cancelBtnUpdate.addEventListener("click", cancelForm);
    }

    /*if (updateBtn) {
        updateBtn.addEventListener("click", updateLocation);
    }*/

    if (formBtn) {
        formBtn.addEventListener("click", deleteLocation);
    }
}

function updateWelcomeMessage() {
    const welcomeHeading = document.getElementById("welcome-heading");
    if (welcomeHeading && loggedInUser) {
        welcomeHeading.textContent = `Welcome to Spreelicht, ${loggedInUser.name}!`
    }
}

function disableButtons() {
    const buttons = [
        addButton = document.getElementById("addButton"),
        formUpdateLocationButton = document.getElementById("formUpdateLocation"),
        formDeleteLocationButton = document.getElementById("formDeleteLocation")
    ]

    if (buttons) {
        buttons.forEach(button => {
            if (button) {
                button.style.display = loggedInUser.role === "admin" ? "inline-block" : "none";
            }
        });
    }
}

function changeHTMLForNonAdmin() {
    updateCategories = document.querySelector("#update-screen select[name='categories']");
    
    const formFields = [
        updateTitle = document.querySelector("title-update"),
        updateDescription = document.querySelector("description-update"),
        updateAddress = document.querySelector("address-update"),
        updateZip = document.querySelector("zip-update")
    ];

    if (loggedInUser && loggedInUser.role === "non-admin") {
        document.getElementById("update-heading").innerHTML = "Details:";
        if (formFields) {
            formFields.forEach(field => {
                if (field) {
                    field.readOnly = true;
                }
            });
        }

        if (updateCategories) {
            updateCategories.disabled = true;
        }
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
        disableButtons();
        renderLocationsList();
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
        title: document.getElementById('title-add').value.trim(),
        description: document.getElementById('description-add').value.trim(),
        address: document.getElementById('address-add').value.trim(),
        zipCode: document.getElementById('zip-add').value.trim(),
        city: document.getElementById('city-add').value.trim(),
        category: document.getElementById('categories-add').value
    };

    try {
        const coords = await getCoordinates(formData.address.toString(), formData.zipCode.toString(),
            formData.city.toString());

        if (coords) {
            const newLocation = {
                id: locationId++,
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
    let uri = "https://nominatim.openstreetmap.org/search?street=" + address + "&city=" + city + "&country=Germany&postalcode=" + zipCode + "&format=json&limit=1";
    let encoded = encodeURI(uri);

    try {
        const response = await fetch(encoded);
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
    clearAddForm();
}

function clearAddForm() {
    if (ADD_FORM) {
        ADD_FORM.reset();
        const cityInput = document.getElementById("city");
        const latInput = document.getElementById("lat");
        const lonInput = document.getElementById("lon");

        if (cityInput) cityInput.value = "Berlin";
        if (latInput) latInput.value = "Will be set by your provided address.";
        if (lonInput) lonInput.value = "Will be set by your provided address.";
    }
}

/******************************************************************************
 *                             Update SCREEN                                  *
 ******************************************************************************/
function showUpdateScreen(locationIndex) {
    currentLocationIndex = locationIndex;
    const location = locations[locationIndex];

    if (location) {
        const titleField = document.querySelector("#update-screen input[name='title']");
        const descField = document.querySelector("#update-screen textarea[name='description']");
        const addressField = document.querySelector("#update-screen input[name='address']");
        const zipField = document.querySelector("#update-screen input[name='zip']");
        const cityField = document.querySelector("#update-screen input[name='city']");
        const latField = document.querySelector("#update-screen input[name='lat']");
        const lonField = document.querySelector("#update-screen input[name='lon']");
        const categoryField = document.querySelector("#update-screen select[name='categories']");
        const imageElement = document.getElementById("update-location-img");

        if (titleField) titleField.value = location.title;
        if (descField) descField.value = location.description;
        if (addressField) addressField.value = location.address;
        if (zipField) zipField.value = location.zipCode;
        if (cityField) cityField.value = location.city;
        if (latField) latField.value = location.lat;
        if (lonField) lonField.value = location.lon;
        if (categoryField) categoryField.value = location.category;

        if (imageElement) {
            if (location.image) {
                imageElement.src = location.image;
                imageElement.style.display = "block";
            } else {
                imageElement.style.display = "none";
            }
        }            

        showScreen("update");
        changeHTMLForNonAdmin();

    }
}

async function updateLocation(e) {
    e.preventDefault();
    if (currentLocationIndex === -1 || !locations[currentLocationIndex]) {
        alert("No location selected");
        return;
    }

    const location = locations[currentLocationIndex];

    console.log("Update Location has been called")

    
    // fill form with existing data
    const formData = {
        title: document.getElementById('title-update').value.trim(),
        description: document.getElementById('description-update').value.trim(),
        address: document.getElementById('address-update').value.trim(),
        zipCode: document.getElementById('zip-update').value.trim(),
        city: document.getElementById('city-update').value.trim(),
        category: document.getElementById("categories-update").value
    };

    // save address change
    const addressChanged = formData.address != location.address ||
        formData.zipCode != location.zipCode ||
        formData.city != location.city;

    // request new coords if address changed
    try {
        let coordinates = { lat: location.lat, lon: location.lon };

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
            title: formData.title,
            description: formData.description,
            address: formData.address,
            zipCode: formData.zipCode,
            city: formData.city,
            category: formData.category,
            lat: coordinates.lat,
            lon: coordinates.lon
        };

        renderLocationsList();
        showScreen("main");
        alert("Location updated successfully!");
    } catch (error) {
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
 *                      LOCATION FUNCTIONS                                    *
 ******************************************************************************/

function renderLocationsList() {
    if (!LOCATIONS_LIST) {
        return;
    }

    LOCATIONS_LIST.innerHTML = "";

    locations.forEach((location, index) => {
        const locationCard = document.createElement("article");
        locationCard.className = "location-card";
        locationCard.setAttribute("role", "listitem");

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
        locationCard.addEventListener("click", () => showUpdateScreen(index));

        LOCATIONS_LIST.appendChild(locationCard);
    });
}

document.addEventListener("DOMContentLoaded", initApp);