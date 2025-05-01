## Anforderungen ”Main Screen”:
- [X] Einen Header mit dem Namen Ihrer Webapplikation 
- [X] und einer Willkommen-Nachricht an die User-Person
- [ ] Eine Liste mit drei hart-kodierten, real existierenden Standorten: 
- [ ] Titel, Straße + ggfs. Hausnummer, PLZ, Kategorie und ein optionales Foto des Standortes müssen in der Listenzeile angezeigt werden. 

- [ ] Mindestens ein Standort mit Bild
- [ ] mindestens ein Standort ohne Bild
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
- [ ] Breitengrad (darf von User-Person nicht geändert werden)
- [ ] Längengrad (darf von User-Person nicht geändert werden)
- [ ] Drop-Down für Standort-Kategorie (required) oder drop-down für Ausprägungsgrad (required), falls Ihre App nur eine Kategorie von Standorten dokumentiert (z.B. nur Radwege). Kategorien sollten mind. 5 aus {“Radweg”, “Fußweg”, “Öffis”, “Park & Ride-Parkplätze”, “Verschmutzungen von öffentlichen Plätzen und Straßen”, “Luftverschmutzung”, “Baustellen”, “Transportmittel-Sharing”} sein
- [X] “Add”-Button
- [X] “Cancel”-Button

## Anforderungen ”Details Screen”/”Update Screen”:

- [ ] Das gleiche Formular wie “Add”-Screen nur das die Inputfelder mit den Eigenschaften eines Standortes aus Ihrer Liste im Main-Screen befüllt sind
- [X] “Update”-Button
- [X] “Delete”-Button
- [X] “Cancel”-Button