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
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const validLogin = {
        "admina": "password",
        "normalo": "password"
    };

    if (validLogin[username] === password) {
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("main-screen").style.display = "block";
    } else {
        alert("Invalid username or password!")
    }
}