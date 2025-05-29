const LOGIN_SCREEN = document.getElementById("login-screen")
const MAIN_SCREEN = document.getElementById("main-screen")
const ADD_SCREEN = document.getElementById("add-screen")
const UPDATE_SCREEN = document.getElementById("update-screen")
const LOGIN_FORM = document.getElementById("login-form")
const ADD_FORM = document.getElementById("add-form")

LOGIN_SCREEN.style.display = "block";
MAIN_SCREEN.style.display = "none";
ADD_SCREEN.style.display = "none";
UPDATE_SCREEN.style.display = "none";

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

LOGIN_FORM.addEventListener("submit", login);

let loginStatue = false;

function login(e) {
    e.preventDefault();

    const USERNAME = document.getElementById("username").value;
    const PASSWORD = document.getElementById("password").value;

    loginIsValid = users.some(user =>
        user.username === USERNAME && user.password === PASSWORD
    );

    loggedInUser = users.find(user => {
        return user.username === USERNAME && user.password === PASSWORD
    });


    if (loginIsValid) {
        document.getElementById("welcome-heading").textContent = "Welcome to Spreelicht, " + loggedInUser.name + "!";

        LOGIN_SCREEN.style.display = "none";
        MAIN_SCREEN.style.display = "block";

        if (loggedInUser.role === "non-admin") {
            document.getElementById("addButton").style.display = "none";
        }
        
    } else {
        alert("Invalid username or password!")
    }
}

document.getElementById("logoutButton").addEventListener("click", logout)
//MAIN_SCREEN.addEventListener("logoutButton", logout)

function logout(e) {
    e.preventDefault();

    LOGIN_SCREEN.style.display = "block";
    MAIN_SCREEN.style.display = "none";
    ADD_SCREEN.style.display = "none";
    UPDATE_SCREEN.style.display = "none";

    document.getElementById("welcome-heading").textContent = "Welcome to Spreelicht!";

}

document.getElementById("addButton").addEventListener("click", showAddScreen);
function showAddScreen(e) {
    e.preventDefault();

    if (loggedInUser.role === "admin") {
        MAIN_SCREEN.style.display = "none";
        ADD_SCREEN.style.display = "block";
    } else {
        alert("You are not an admin!")
    }
}

// document.getElementById("formSubmitLocation").addEventListener("submit", sumbitLocation);
ADD_FORM.addEventListener("submit", getCoordinates);
function sumbitLocation(e) {
    e.preventDefault();
    const locationName = document.getElementById("locationName").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const address = document.getElementById("address").value;
    const zipCode = document.getElementById("zip").value;
    const city = document.getElementById("city").value;
    //const lat = document.getElementById("lat").value;
    //const lon = document.getElementById("lon").value;

    let apiRequest = getCoordinates(address, zipCode, city);

    document.getElementById("lat").display.style = apiRequest.lat;
    document.getElementById("lon").display.style = apiRequest.lon;

    return location ={
        locationName: locationName,
        title: title,
        description: description,
        address: apiRequest.name,
        zipCode: zipCode,
        city: city,
        lat: apiRequest.lat,
        lon: apiRequest.lon
    }
}

function getCoordinates(address, zipCode, city) {
    url = "https://nominatim.openstreetmap.org/search?street="+address
        +"&city="+city+"&country=Germany&postalcode="+zipCode+"&format=json"

    response = fetch(url)

    console.log(response)

}


document.getElementById("formCancelLocation").addEventListener("click", cancelForm);
function cancelForm(e){
    e.preventDefault();

    MAIN_SCREEN.display.style = "block";
    ADD_SCREEN.style.display = "none";
    UPDATE_SCREEN.style.display = "none";
}