# Beleg 3
- [X] GIT_REPO/public/index.html
- [X] nur Login-Screen mit Header, der den Namen der WebApp enthält und mit Footer, der Impressum und Link zur Datenschutzerklärung enthält, angezeigt werden

## Zwei User:innen einloggen
- [X] username: admina | password: password | role: admin | name: Mina
- [X] username: normalo | password: password | role: non-admin | name: Norman

## Admina kann...
- [ ] neue Standorte anlegen
- [ ] existierende Standorte löschen
- [ ] existierende Standorte bearbeiten
- [ ] darf sich alle Standorte angucken
- [ ] darf diese weder bearbeiten noch löschen

## Normalo
- [X] darf keine Standorte anlegen

## Screens
- [X] Header mit dem Name der Webapp wird IMMER angezeigt
- [X] Footer mit Impressum und Datenschutzerklärung IMMER angezeigt
- [X] Main-Screen zeigt nach erfolgreichem Login eine persönliche Willkommensnachricht an
- [X] Main-Screen zeigt eine Liste von mind. drei real-existierenden, nicht-nachhaltigen Stanforten mit Titel, Straße, PLZ, Kategorie und Foto an
- [ ] Standorte in der Liste sind anklickbar
- [ ] Bei Klick auf Standort öffnet sich der Detail-Screen für diesen Standort
- [ ] Inputfelder des Detail-Screen sind mit den Daten des Standorts belegt

## Admina-Story
- [X] Login-Kombo admina/password
- [X] Nach Klicken des Login-Buttons kommt Main-Screen mit Willkommensnachricht, die den Namen der Nutzer:in enthält ("Hallo Mina!" oder Ähnliches)
- [X] Liste mit den Standorten
- [X] "Add"-Button
- [X] "Logout"-Button
- [X] Klicken auf "Add"-Button öffnet "Add New Location"-Screen
- [ ] Klicken auf einen Standort in der Standortliste öffnet "Detail"-Screen für diesen Standort
- [ ] Admina bekommt "Update/Delete/Cancel"-Buttons angezeigt
- [X] Klicken auf Logout-Button, loggt admina aus und zeigt wieder den Login-Screen an

## Normalo-Story
- [X] Login-Kombo normalo /password
- [X]Nach Klicken des Login-Buttons kommt Main-Screen mit Willkommensnachricht, die den Namen der Nutzer:in enthält (“Hallo Norman!“ oder Ähnliches)
- [X] Liste mit den Standorten
- [X] „Logout“-Button
- [X] KEIN “Add”-Button
- [ ] Klicken auf einen Standort in der Standortliste öffnet „Detail“-Screen für diesen Standort,
- [ ] aber ohne „Update“ & „Delete“-Buttons. 
- [ ] Wir brauchen einen „Close“ oder „Cancel“- Button, um den Screen wieder schließen zu können
- [X] Klicken auf den Logout-Button, loggt normalo aus und zeigt wieder den Login-Screen an

## Incorrect Login
- [X] Alert-Box oder so
- [X] Login-Screen darf nicht verschwinden

## Admina Standort anlegen
- [ ] Klicken des „Add“-Buttons -> „Add New Location“-Screen erscheint
- [ ] User befüllt die „required“ Inputfelder des Formulars
- [ ] User klickt „Save/Add/Speicher“-Button
- [ ] Eingegebene Adresse muss in Geokoordinaten konvertiert werden -> Anfrage an einen Geo-Webservice stellen
- [ ] Erfolgreiche Anfrage, d.h., der Geo-Webservice schickt Geokoordinaten für die Adresse zurück:
    - [ ] Lat/lon–Properties des Standortes mit erhaltenen Geokoordinaten belegen
    - [ ] Add-Screen schließen und Main-Screen anzeigen
    - [ ] Neuer Standort befindet sich in der Liste
- [ ] Anfrage war nicht erfolgreich, der Geo-Webservice liefert keine Geokoordinaten für die Adresse: 
    - [ ] Eine Usermessage wird angezeigt, der „Add“-Screen verschwindet nicht
    - [ ] Nutzer:in muss Adresse anpassen oder „cancel"-Button drücken

## Admina Standort bearbeiten
- [ ] admina klickt in der Standortliste im Main-Screen auf einen Standort -> der Details-Screen öffnet sich
- [ ] alle Eigenschaften eines Standortes werden angezeigt. 
- [ ] Ändert ‚admina‘ die Eigenschaften des Standortes, gibt, z.B., eine neue Adresse ein, dann müssen diese Änderung vorgenommen werden: 
    - [ ] der Standort erhält neue lat/lon-Koordinaten. 
- [ ] Löscht ‚admina‘ einen Standort, dann verschwindet der Standort in der Standortliste im Main-Screen

Wichtig:
Aktualisierungen der Standort-Daten oder das Löschen von Standorten müssen nicht extern gespeichert werden. D.h., wenn Sie Ihre index.html neu laden, sind die drei ursprünglichen Locations wieder da.