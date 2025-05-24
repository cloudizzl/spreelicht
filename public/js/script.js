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