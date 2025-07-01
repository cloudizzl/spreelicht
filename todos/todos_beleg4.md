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

- [ ] Die zwei User aus Beleg 3 müssen jetzt in die Users-Collection übernommen werden und dürfen nicht mehr im JavaScript hart kodiert sein.

- [X] Collection für „Locations“ mit den entsprechenden Feldern (alle Felder aus dem Detail/Update-Screen für eine Location).
Die drei Standorte aus Beleg 3 müssen jetzt in die entsprechende DB-Collection übernommen werden und dürfen nicht mehr im JavaScript hart kodiert sein.

## Express/Node.js-Backend erstellen
- [ ] Das Backend soll mit Node & Express Framework programmiert werden. 
- [ ] Ihr Server muss nur lokal, auf einem beliebigen Port laufen. 
- [ ] Ich werde Ihnen dafür in der Woche vom 16.6. ein Code-Template zur Verfügung stellen, welches wir am 18.6. in der Vorlesung besprechen werden.
- [ ] Ihr Backend-Server ist mit der Datenbank verbunden und nutzt diese für die Validierung der Logins 
- [ ] und die CRUD-Operationen für Standorte.

- [ ] Wenn die PO-Person die URL, http://localhost:PORT/index.html im Browser öffnet, wird der Login-Screen angezeigt.
- [ ] Ihr Node.js-Backend stellt zwei Endpoints zur Verfügung:
- [ ] /login: der Endpoint für den Login: akzeptiert und validiert die username/password-Kombination.
- [ ] Bei ungültiger username /password-Kombo, wird der HTTP-Statuscode 401 („Unauthorized“) zurückgeschickt. 
- [ ] Bei gültiger username /password-Kombination, wird der HTTP-Statuscode 200 
    - [ ] und entsprechendes User-POJO 
    - [ ] ohne Passwort 
    - [ ] als JSON in der Payload zurückgeschickt.
- [ ] /loc: der REST-Endpoint fürs CRUD von Standorten - Dieser Endpoint handhabt alle 4 HTTP-Methoden:

## HTTP-Methoden
- [ ] `POST /loc` mit neuem Standort in der Payload, Standort hat noch keine ID (WICHTIG!)
    - [ ] *Create* resource:
    - [ ] Legt neuen Standort an, schickt Id des neuen Standortes an den Client zurück
    - [ ] Status code: 201 & 
    - [ ] HTTP-Header: 
    - [ ] Location: /loc/newId
- [ ] `GET /loc`
    - [ ] *Read* resources: Schickt alle Standorte zurück
    - [ ] Status code: 200 &
    - [ ] HTTP-Header:
    - [ ] Content-Type: application/json
    - [ ] mit Payload = {Array von Standorten}
- [ ] `GET /loc/<id>`
    - [ ] *Read* resource: Schickt den Standort mit Id `<id>` zurück
    - [ ] Status code: 200 &
    - [ ] HTTP-Header:
    - [ ] Content-Type: application/json 
    - [ ] mit Payload {Standort mit Id `<id>`}
- [ ] `PUT /loc/id` mit aktualisiertem Standort in der Payload
    - [ ] *Update* resource: Aktualisiert Standort
    - [ ] Status code: 204
    - [ ] keine Payload
- [ ] `DELETE /loc/id`
    - [ ] *Delete* resource: Löscht den Standort
    - [ ] Status code: 204
    - [ ] keine Payload