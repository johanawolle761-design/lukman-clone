# Lukman – IT-Portfolio (GitHub Pages Spiegel)

1:1-Spiegelung von [lukmanhussein.de](https://lukmanhussein.de) für die Ansicht über **GitHub Pages**.

Enthalten: HTML, CSS, JavaScript (inkl. Scroll-Animationen & Dark/Light-Mode), Fonts und Bilder.

## Lokal ansehen

```bash
python3 -m http.server 3847
```

Dann im Browser: [http://127.0.0.1:3847](http://127.0.0.1:3847)

## GitHub Pages aktivieren

1. Repo auf GitHub anlegen / pushen
2. **Settings → Pages**
3. Source: **Deploy from a branch**
4. Branch: `main`, Ordner: `/ (root)`
5. Speichern – die Seite ist danach unter `https://<user>.github.io/<repo>/` erreichbar

## Hinweise

- Seiten-Links und Assets sind relativ, damit die Seite auch in einem Unterpfad (Projekt-Pages) funktioniert.
- Das Kontaktformular nutzt hier `mailto:` (kein Backend `/api/kontakt` und kein Turnstile auf GitHub Pages).
- Impressum, Datenschutz und alle sichtbaren Texte/Bilder/Animationen entsprechen dem Originalstand der Spiegelung.
