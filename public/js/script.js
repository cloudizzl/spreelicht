const LOGIN_SCREEN = document.getElementById("login-screen")
const MAIN_SCREEN = document.getElementById("main-screen")
const ADD_SCREEN = document.getElementById("add-screen")
const UPDATE_SCREEN = document.getElementById("update-screen")
const LOGIN_FORM = document.getElementById("login-form")

LOGIN_SCREEN.style.display = "block";
MAIN_SCREEN.style.display = "none";
ADD_SCREEN.style.display = "none";
UPDATE_SCREEN.style.display = "none";

const ADMIN = {
    username: "12",
    password: "1",
    role: "admin",
    name: "Mina"
};
const NORMAL = {
    username: "normalo",
    password: "password123",
    role: "non-admin",
    name: "Norman"
};

let users = [
    ADMIN,
    NORMAL
];

LOGIN_FORM.addEventListener("submit", login);

function login(e) {
    e.preventDefault();
    let authorised;
    const USERNAME = document.getElementById('username').value;
    const PASSWORD = document.getElementById('password').value;

    const loginIsValid = users.find(user =>
        user.username === USERNAME && user.password === PASSWORD
    );

    if (loginIsValid) {
        LOGIN_SCREEN.style.display = "none";
        MAIN_SCREEN.style.display = "block";
    } else {
        alert("Invalid username or password!")
    }
    /*
        const VALID_LOGIN = {
            "admina": "password",
            "normalo": "password"
        };
    */

    /*
        if(users.find(users.username == USERNAME && users.password == PASSWORD)){
            LOGIN_SCREEN.style.display = "none";
            MAIN_SCREEN.style.display = "block";
            alert("WORKED")
        }else {
            authorised = false;
            alert("Invalid username or password!")
        }
    */
    /*
        if (VALID_LOGIN[USERNAME] == PASSWORD) {
            LOGIN_SCREEN.style.display = "none";
            MAIN_SCREEN.style.display = "block";
        } else {
            alert("Invalid username or password!")
        }
    
        if (USERNAME == "admina" && PASSWORD == "password"){
            LOGIN_SCREEN.style.display = "none";
            MAIN_SCREEN.style.display = "block";
        } else if(USERNAME == "normalo" && PASSWORD == "password"){
            LOGIN_SCREEN.style.display = "none";
            MAIN_SCREEN.style.display = "block";
        } else {
            alert("Invalid username or password!")
        }
            */
}