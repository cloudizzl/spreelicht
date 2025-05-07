## Anforderungen allgemein:
- [X] URI file:///PATH_TO_GIT-REPO/public/index.html
- [X] 4 Screens auf einer Seite, untereinander

## Anforderungen "Login Screen":
- [X] Name der Webapplikation
- [X] Eingabefeld für Username (required)
- [X] Eingabefeld für Password (required)
- [X] Button "Login"

## Anforderungen ”Main Screen”:
- [X] Einen Header mit dem Namen Ihrer Webapplikation 
- [X] und einer Willkommen-Nachricht an die User-Person
- [X] Eine Liste mit drei hart-kodierten, real existierenden Standorten: 

- [X] Titel, Straße + ggfs. Hausnummer, PLZ, Kategorie und ein optionales Foto des Standortes müssen in der Listenzeile angezeigt werden. 

- [X] Mindestens ein Standort mit Bild
- [X] mindestens ein Standort ohne Bild
- [X] “Add”-Button
- [X] “Logout“-Button
- [X] Fußzeile mit Links zu Impressum und Datenschutzerklärung
- [X] Header und Footer können aber auch am Anfang bzw. am Ende der HTML-Datei angezeigt werden

## Anforderungen ”Add Screen”:
- [X] Ein Formular (<form> ....</form>) mit diesen Eingabefeldern:
    - [X] Titel (required)
    - [X] Beschreibung
    - [X] Straße und ggfs Hausnummer (required)
    - [X] PLZ (required)
    - [X] Stadt: Berlin (darf von User-Person nicht geändert werden)
    - [X] Breitengrad (darf von User-Person nicht geändert werden)
    - [X] Längengrad (darf von User-Person nicht geändert werden)
- [X] Drop-Down für Standort-Kategorie (required) oder drop-down für Ausprägungsgrad (required), falls Ihre App nur eine Kategorie von Standorten dokumentiert (z.B. nur Radwege). Kategorien sollten mind. 5 aus {“Radweg”, “Fußweg”, “Öffis”, “Park & Ride-Parkplätze”, “Verschmutzungen von öffentlichen Plätzen und Straßen”, “Luftverschmutzung”, “Baustellen”, “Transportmittel-Sharing”} sein
- [X] “Add”-Button
- [X] “Cancel”-Button

## Anforderungen ”Details Screen”/”Update Screen”:

- [X] Das gleiche Formular wie “Add”-Screen nur das die Inputfelder mit den Eigenschaften eines Standortes aus Ihrer Liste im Main-Screen befüllt sind
    - [X] Titel: "Radweg" endet abrupt
    - [X] Beschreibung: Ostendstr
    - [X] Straße und ggfs Hausnummer: ...
    - [X] PLZ: 12459 
    - [X] Stadt: Berlin
    - [X] Breitengrad: ...
    - [X] Längengrad: ...
    - [X] Kategorie: Radweg
- [X] Bild von diesem Standort wird angezeigt
- [X] “Update”-Button
- [X] “Delete”-Button
- [X] “Cancel”-Button

## NEUE TODOS
- WAS IST EINE LISTE?????
- Tabelle machen?
- Header und Footer
