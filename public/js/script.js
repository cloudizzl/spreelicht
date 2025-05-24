const LOGIN_SCREEN = document.getElementById("login-screen")
const MAIN_SCREEN = document.getElementById("main-screen")
const ADD_SCREEN = document.getElementById("add-screen")
const UPDATE_SCREEN = document.getElementById("update-screen")

LOGIN_SCREEN.style.display ="block";
MAIN_SCREEN.style.display ="none";
ADD_SCREEN.style.display ="none";
UPDATE_SCREEN.style.display ="none";

function login(e) {
    e.preventDefault();
    const USERNAME = document.getElementById("username").value;
    const PASSWORD = document.getElementById("password").value;

    const VALID_LOGIN = {
        "admina": "password",
        "normalo": "password"
    };

    if (VALID_LOGIN[USERNAME] === PASSWORD) {
        LOGIN_SCREEN.style.display = "none";
        MAIN_SCREEN.style.display = "block";
    } else {
        alert("Invalid username or password!")
    }
}