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


let loggedInUser = null;

let locations = [];



/******************************************************************************
 *                           GENERAL FUNCTIONS                                *
 ******************************************************************************/

function initApp() {
    showScreen("login");
    setupEventListeners();
    //renderLocationsList();
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
    ADD_FORM.addEventListener("submit", submitLocation);

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
    updateCategories = document.getElementById("categories-update");

    const formFields = [
        updateTitle = document.getElementById("title-update"),
        updateDescription = document.getElementById("description-update"),
        updateAddress = document.getElementById("address-update"),
        updateZip = document.getElementById("zip-update")
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
    } else if (loggedInUser && loggedInUser.role === "admin") {
        document.getElementById("update-heading").innerHTML = "Update a location!";
        if (formFields) {
            formFields.forEach(field => {
                if (field) {
                    field.readOnly = false;
                }
            });
        }

        if (updateCategories) {
            updateCategories.disabled = false;
        }
    }

}
/******************************************************************************
 *                             LOGIN    /   LOGOUT                            *
 ******************************************************************************/

async function login(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        if (!response.ok) {
            alert("Login failed. Please check your username and password.");
            return;
        }

        const user = await response.json();
        loggedInUser = user;
        updateWelcomeMessage();
        disableButtons();
        renderLocationsList();
        showScreen("main");
        LOGIN_FORM.reset();
    } catch (error) {
        alert("An error occurred while logging in. Please try again later.");
        console.error("Login error:", error);
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

// TODO - add image upload functionality
/*
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
    const imageInput = document.getElementById('image-upload-add');
    if (imageInput && imageInput.files[0]) {
        formData.append('image', imageInput.files[0]);
    }

    try {
        const coords = await getCoordinates(
            formData.address.toString(), 
            formData.zipCode.toString(),
            formData.city.toString()
        );
        if (!coords) {
            alert("Could not find coordinates for this address. Please check the address.");
            return;
        }
        
        const newLocation = {
            ...formData,
            lat: coords.lat,
            lon: coords.lon
        }

        // add the new location to the locations array
        const response = await fetch("/loc", {
            method: "POST",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify(newLocation)
        });

        if (!response.ok) throw new Error("Failed to add location");
        await renderLocationsList();
        showScreen("main");
        alert("Location added successfully!");
        clearAddForm();
    } catch (error) {
        console.error("Error adding location:", error);
        alert("Error adding location.")
    }
}*/

// saves the pictures to the image folder of the project
async function submitLocation(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', document.getElementById('title-add').value.trim());
    formData.append('description', document.getElementById('description-add').value.trim());
    formData.append('address', document.getElementById('address-add').value.trim());
    formData.append('zipCode', document.getElementById('zip-add').value.trim());
    formData.append('city', document.getElementById('city-add').value.trim());
    formData.append('category', document.getElementById('categories-add').value);

    // Append the image file
    const imageInput = document.getElementById('image-upload-add');
    if (imageInput && imageInput.files[0]) {
        formData.append('image', imageInput.files[0]);
    }

    // Get coordinates
    const coords = await getCoordinates(
        formData.get('address'),
        formData.get('zipCode'),
        formData.get('city')
    );
    if (!coords) {
        alert("Could not find coordinates for this address. Please check the address.");
        return;
    }
    formData.append('lat', coords.lat);
    formData.append('lon', coords.lon);

    try {
        const response = await fetch("/loc", {
            method: "POST",
            body: formData // Do NOT set Content-Type header!
        });

        if (!response.ok) throw new Error("Failed to add location");
        await renderLocationsList();
        showScreen("main");
        alert("Location added successfully!");
        clearAddForm();
    } catch (error) {
        console.error("Error adding location:", error);
        alert("Error adding location.");
    }
}


async function getCoordinates(address, zipCode, city) {
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
async function showUpdateScreen(locationIndex) {
    currentLocationIndex = locationIndex;
    const locationId = locations[locationIndex]?._id;
    if(!locationId){
        alert("Location not found.")
        return;
    }
    let location;
    try{
        const response = await fetch(`/loc/${locationId}`);
        if (!response.ok) throw new Error("Failed to fetch location data");
        location = await response.json();
    } catch (error) {
        alert("Could not load location details.");
        console.error(error);
        return;
    }
    if (location) {
        const titleField = document.getElementById("title-update");
        const descField = document.getElementById("description-update");
        const addressField = document.getElementById("address-update");
        const zipField = document.getElementById("zip-update");
        const cityField = document.getElementById("city-update");
        const latField = document.getElementById("lat-update");
        const lonField = document.getElementById("lon-update");
        const categoryField = document.getElementById("categories-update");
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
/*
async function updateLocation(e) {
    console.log("updateLocation function called")
    e.preventDefault();
    if (currentLocationIndex === -1 || !locations[currentLocationIndex]) {
        alert("No location selected");
        return;
    }

    const location = locations[currentLocationIndex];
    // fill form with existing data
    const formData = {
        title: document.getElementById('title-update').value.trim(),
        description: document.getElementById('description-update').value.trim(),
        address: document.getElementById('address-update').value.trim(),
        zipCode: document.getElementById('zip-update').value.trim(),
        city: document.getElementById('city-update').value.trim(),
        category: document.getElementById("categories-update").value,
        image: document.getElementById("image-upload-update").value
    };

    
    // save address change
    const addressChanged = formData.address != location.address ||
        formData.zipCode != location.zipCode ||
        formData.city != location.city;

     if (addressChanged) {
        const coords = await getCoordinates(formData.address, formData.zipCode, formData.city);
        if (!coords) {
            alert("Could not find coordinates for this address.");
            return;
        }
        formData.lat = coords.lat;
        formData.lon = coords.lon;
    }

    try {
        console.log("Updating location with id:", location._id, "and data:", formData);
        const response = await fetch(`/loc/${location._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        if (!response.ok) throw new Error("Failed to update location");
        await renderLocationsList();
        showScreen("main");
        alert("Location updated successfully!");
    } catch (error) {
        console.error("Error updating location:", error);
        alert("Error updating location. Please try again.");
    }
}*/
async function updateLocation(e) {
    console.log("updateLocation function called")
    e.preventDefault();
    if (currentLocationIndex === -1 || !locations[currentLocationIndex]) {
        alert("No location selected");
        return;
    }

    const location = locations[currentLocationIndex];

    const formData = new FormData();
    formData.append('title', document.getElementById('title-update').value.trim());
    formData.append('description', document.getElementById('description-update').value.trim());
    formData.append('address', document.getElementById('address-update').value.trim());
    formData.append('zipCode', document.getElementById('zip-update').value.trim());
    formData.append('city', document.getElementById('city-update').value.trim());
    formData.append('category', document.getElementById("categories-update").value);

    // Handle image update
    const imageInput = document.getElementById("image-upload-update");
    if (imageInput && imageInput.files[0]) {
        formData.append('image', imageInput.files[0]);
    } else if (location.image) {
        // If no new image, send the current image path so backend can keep it
        formData.append('existingImage', location.image);
    }

    // Handle coordinates if address changed
    const addressChanged = 
        formData.get('address') != location.address ||
        formData.get('zipCode') != location.zipCode ||
        formData.get('city') != location.city;

    if (addressChanged) {
        const coords = await getCoordinates(
            formData.get('address'),
            formData.get('zipCode'),
            formData.get('city')
        );
        if (!coords) {
            alert("Could not find coordinates for this address.");
            return;
        }
        formData.append('lat', coords.lat);
        formData.append('lon', coords.lon);
    } else {
        formData.append('lat', location.lat);
        formData.append('lon', location.lon);
    }

    try {
        const response = await fetch(`/loc/${location._id}`, {
            method: "PUT",
            body: formData // No Content-Type header!
        });

        if (!response.ok) throw new Error("Failed to update location");
        await renderLocationsList();
        showScreen("main");
        alert("Location updated successfully!");
    } catch (error) {
        console.error("Error updating location:", error);
        alert("Error updating location. Please try again.");
    }
}

async function deleteLocation() {
    if(!confirm("Are you sure you want to delete this location?")) return;

    const location = locations[currentLocationIndex];

    try {
        const response = await fetch(`/loc/${location._id}`, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error("Failed to delete location");

        await renderLocationsList();
        showScreen("main");
        alert("Location deleted successfully!");
    } catch (error) {
        console.error("Error deleting location:", error);
        alert("Error deleting location. Please try again.");
    }
}

/******************************************************************************
 *                      LOCATION FUNCTIONS                                    *
 ******************************************************************************/

async function renderLocationsList() {
    if (!LOCATIONS_LIST) {
        return;
    }

    LOCATIONS_LIST.innerHTML = "";

    try {
        const response = await fetch("/loc");
        if (!response.ok) throw new Error("Failed to fetch locations");
        locations = await response.json();
        if (!Array.isArray(locations) || locations.length === 0) {
            LOCATIONS_LIST.innerHTML = "<p>No locations found.</p>";
            return;
        }
    } catch (error) {
        console.error("Error fetching locations:", error);
        alert("Error fetching locations. Please try again later.");
        return;
    }
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