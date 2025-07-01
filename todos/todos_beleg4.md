[ ] MongoDB muss benutzt werden
[X] MongoDB auf https://ocean.f4.htw-berlin.de
[X] Datenbank besteht aus zwei Collections
    1. "Users" mit den Feldern:
    [X] username
    [X] password
    [X] name
    [X] role
    2. "Locations":
    [ ] mit den Feldern aus dem Detail/Update-Screen
    - Die drei Standorte müssen jetzt in die entsprechende DB-Collection übernommen werden und dürfen nicht mehr im JavaScript hart kodiert sein.

## Express/Node.js-Backend erstellen
[ ] Backend mit Node & Express Framework programmieren. Ihr Server muss nur lokal auf einem beliebigen Port laufen.
[ ] Backend-Server ist mit der Datenbank verbunden und nutzt diese für die Validierung der Logins und die CRUD-Operationen für Standorte
[ ] Wenn die PO-Person die URL, http://localhost:PORT/index.html im Browser öffnet, wird der Login-Screen angezeigt
[ ] Node-js-Backend stellt zwei Endpoints zur Verfügung:
    [ ] /login: der Endpoint für den Login: akzeptiert und validiert die username/password-Kombination. Bei
    ungültiger username /password-Kombo, wird der HTTP-Statuscode 401 („Unauthorized“)
    zurückgeschickt. Bei gültiger username /password-Kombination, wird der HTTP-Statuscode 200 und entsprechendes User-POJO ohne Passwort als JSON in der Payload zurückgeschickt.
    [ ] /loc: der REST-Endpoint fürs CRUD von Standorten - Dieser Endpoint handhabt alle 4 HTTP-Methoden, siehe Tabellen in WAD-Beleg4.pdf
    