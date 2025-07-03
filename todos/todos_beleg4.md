- [X] MongoDB muss genutzt werden.
- [X] Ein MongoDB-Server steht Ihnen dafür auf https://ocean.f4.htw-berlin.de/overview (nur über vpn erreichbar) zur Verfügung. 
- [X] Dort sollen Sie sich eine MongoDB-Datenbank und einen Nutzer für diese Datenbank anlegen.

- [X] Ihre Datenbank besteht aus zwei Collections:
1. Collection für „Users“ mit mindestens vier Feldern:
- [X] username, password, name, role und diesen Dokumenten (Einträgen):

{
    "username": "admina",
    "password": "password",
    "name": "Mina",
    "role": "admin"
},

{
    "username": "normalo",
    "password": "password",
    "name": "Norman",
    "role": "non-admin"
}

- [X] Die zwei User aus Beleg 3 müssen jetzt in die Users-Collection übernommen werden und dürfen nicht mehr im JavaScript hart kodiert sein.

- [X] Collection für „Locations“ mit den entsprechenden Feldern (alle Felder aus dem Detail/Update-Screen für eine Location).
Die drei Standorte aus Beleg 3 müssen jetzt in die entsprechende DB-Collection übernommen werden und dürfen nicht mehr im JavaScript hart kodiert sein.

## Express/Node.js-Backend erstellen
- [X] Das Backend soll mit Node & Express Framework programmiert werden. 
- [X] Ihr Server muss nur lokal, auf einem beliebigen Port laufen. 
- [X] Ich werde Ihnen dafür in der Woche vom 16.6. ein Code-Template zur Verfügung stellen, welches wir am 18.6. in der Vorlesung besprechen werden.
- [X] Ihr Backend-Server ist mit der Datenbank verbunden und nutzt diese für die Validierung der Logins 
- [X] und die CRUD-Operationen für Standorte.

- [X] Wenn die PO-Person die URL, http://localhost:PORT/index.html im Browser öffnet, wird der Login-Screen angezeigt.
- [X] Ihr Node.js-Backend stellt zwei Endpoints zur Verfügung:
- [X] /login: der Endpoint für den Login: akzeptiert und validiert die username/password-Kombination.
- [X] Bei ungültiger username /password-Kombo, wird der HTTP-Statuscode 401 („Unauthorized“) zurückgeschickt. 
- [X] Bei gültiger username /password-Kombination, wird der HTTP-Statuscode 200 
    - [X] und entsprechendes User-POJO 
    - [X] ohne Passwort 
    - [X] als JSON in der Payload zurückgeschickt.
- [X] /loc: der REST-Endpoint fürs CRUD von Standorten - Dieser Endpoint handhabt alle 4 HTTP-Methoden:

## HTTP-Methoden
- [X] `POST /loc` mit neuem Standort in der Payload, Standort hat noch keine ID (WICHTIG!)
    - [X] *Create* resource:
    - [X] Legt neuen Standort an, schickt Id des neuen Standortes an den Client zurück
    - [X] Status code: 201 & 
    - [X] HTTP-Header: 
    - [X] Location: /loc/newId
- [X] `GET /loc`
    - [X] *Read* resources: Schickt alle Standorte zurück
    - [X] Status code: 200 &
    - [X] HTTP-Header:
    - [X] Content-Type: application/json
    - [X] mit Payload = {Array von Standorten}
- [X] `GET /loc/<id>`
    - [X] *Read* resource: Schickt den Standort mit Id `<id>` zurück
    - [X] Status code: 200 &
    - [X] HTTP-Header:
    - [X] Content-Type: application/json 
    - [X] mit Payload {Standort mit Id `<id>`}
- [X] `PUT /loc/id` mit aktualisiertem Standort in der Payload
    - [X] *Update* resource: Aktualisiert Standort
    - [X] Status code: 204
    - [X] keine Payload
- [X] `DELETE /loc/id`
    - [X] *Delete* resource: Löscht den Standort
    - [X] Status code: 204
    - [X] keine Payload