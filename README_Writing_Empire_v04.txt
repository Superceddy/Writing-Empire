WRITING EMPIRE v0.4 – GITHUB PAGES
==================================

DATEIEN
- index.html: Das Spiel. Diese Datei muss im Hauptverzeichnis deines GitHub-Repositories liegen.
- supabase_setup.sql: SQL zum Einrichten der Cloud-Spielstände.
- README_Writing_Empire_v04.txt: Diese Anleitung.

1) DATEI AUF GITHUB HOCHLADEN
1. Öffne dein GitHub-Repository.
2. Öffne die bisherige index.html.
3. Ersetze ihren vollständigen Inhalt durch die neue index.html oder lade die Datei über Add file > Upload files hoch.
4. Die Datei muss exakt index.html heißen und im Hauptverzeichnis liegen.
5. Klicke auf Commit changes.
6. GitHub Pages veröffentlicht die neue Version nach kurzer Zeit automatisch.

2) SUPABASE EINRICHTEN (FÜR REGISTRIERUNG UND CLOUD-SPIELSTÄNDE)
1. Erstelle ein Projekt bei https://supabase.com/.
2. Öffne im Supabase-Projekt den SQL Editor.
3. Öffne supabase_setup.sql aus diesem Paket, kopiere den gesamten Inhalt in den SQL Editor und führe ihn aus.
4. Öffne Project Settings > API (bzw. API Keys).
5. Kopiere die Project URL und den öffentlichen anon/public/publishable Key.
6. Öffne index.html in deinem GitHub-Repository zum Bearbeiten.
7. Suche nahe dem Anfang des Script-Bereichs nach diesen beiden Zeilen:
   const SUPABASE_URL = "HIER_SUPABASE_PROJECT_URL_EINTRAGEN";
   const SUPABASE_ANON_KEY = "HIER_SUPABASE_ANON_PUBLIC_KEY_EINTRAGEN";
8. Ersetze nur die Platzhalter in den Anführungszeichen mit deiner Project URL und deinem öffentlichen anon/public Key.
9. Speichere mit Commit changes.

SICHERHEIT:
- Verwende ausschließlich den öffentlichen anon/publishable Key im Browser.
- NIEMALS den service_role Key in index.html eintragen oder veröffentlichen.
- Die SQL-Datei aktiviert Row Level Security und beschränkt jeden Spielstand auf seinen Besitzer.
- Spielerpasswörter werden von Supabase Auth verwaltet, nicht von Writing Empire gespeichert.

3) E-MAIL-BESTÄTIGUNG UND GITHUB-PAGES-ADRESSE
In Supabase unter Authentication > URL Configuration:
- Site URL auf deine GitHub-Pages-Adresse setzen, zum Beispiel https://DEINNAME.github.io/DEIN-REPOSITORY/
- Falls du die Bestätigungs-E-Mail nutzt, muss diese Adresse auch als erlaubte Redirect URL eingetragen sein.
Die genaue Adresse findest du in deinem Repository unter Settings > Pages.

4) SPIELEN
- Ohne eingerichtetes Supabase läuft das Spiel mit lokalem Spielstand auf dem jeweiligen Gerät.
- Nach der Supabase-Einrichtung können Spieler sich registrieren und anmelden.
- Nach Anmeldung wird der Spielstand in der Cloud gespeichert und kann auf einem anderen Gerät geladen werden.
- Der alte v0.3-Spielstand wird auf dem Gerät beim ersten Start übernommen. Melde dich danach an, damit er in die Cloud gespeichert wird.

HINWEIS
GitHub Pages hostet die Website. Supabase stellt die Benutzerkonten und die Cloud-Datenbank bereit. Beide Dienste werden benötigt, wenn Spieler geräteübergreifend denselben Spielstand nutzen sollen.
