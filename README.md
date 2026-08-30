# Tornmarksvejs Beboerforening

En lille statisk hjemmeside klar til GitHub Pages.

## 1. Bestyrelsen og opslagstavlen opdaterer sig selv

Disse to sektioner hentes automatisk fra to Google Docs, hver gang nogen besøger siden:

- **Bestyrelsen**: ret direkte i jeres Google Doc, én person pr. linje, fx:
  `Rasmus formand nr. 85` eller `Jan, kasserer, nr. 101`
- **Opslagstavle**: skriv frit i jeres Google Doc. En tom linje mellem to afsnit bliver til et nyt afsnit på siden.

Begge dokumenter SKAL forblive delt som "Alle med linket kan se" (eller redigere) – ellers kan siden ikke hente indholdet, og den falder tilbage til det statiske indhold i `boardFallback` / `opslagstavleFallback` i `data/site-data.js`.

Dokument-id'erne står i `data/site-data.js` under `bestyrelsenDocId` og `opslagstavleDocId`. Id'et er den lange kode i dokumentets URL, fx:
`https://docs.google.com/document/d/`**`1dw1do7M6v8s9nfygdK-plOuusPNKGcSyKA1hXpsa9EM`**`/edit`

## 2. Dokumenter (referater, regnskaber, vedtægter)

Disse tre kort på siden linker direkte til jeres tre Drive-mapper – I skal ALDRIG rette i selve siden for at tilføje et nyt dokument:

1. Læg den nye fil i den rigtige mappe i Google Drive (Referater / Regnskaber / Vedtægter).
2. Det er det. Mappen viser automatisk alle filer, når nogen klikker "Åbn mappe →".

Skulle en af mappernes delingslink nogensinde ændre sig, opdateres de i `data/site-data.js` under `documentFolders`.

OBS: Læg ikke følsomme/personlige oplysninger offentligt i Drive. Hvis regnskaber eller medlemsdata skal være private, bør der bygges en løsning med login/adgangskontrol i stedet.

## 3. Øvrigt indhold

`data/site-data.js` indeholder desuden:
- `contactEmail` – mailadressen på kontaktknappen
- `news` – de tre "Aktuelt"-kort
- `events` – "Kommende arrangementer"

Disse er ikke koblet til Google Docs og rettes direkte i filen.

## 3. GitHub Pages

1. Opret et nyt GitHub repository, fx `tornmarksvej`.
2. Upload alle filer i denne mappe til repositoryets rod.
3. Gå til **Settings → Pages**.
4. Vælg **Deploy from a branch**.
5. Vælg `main` og `/ (root)`.
6. Gem.

Siden bliver derefter tilgængelig på din GitHub Pages-adresse.

## 4. Eget domæne

Et domæne som `tornmarksvej.dk` kan senere kobles på under GitHub Pages-indstillingerne.

## 5. Hero-billedet

`images/tornmarksvej-hero-watercolor.jpg` er akvarel-udgaven af solsikkemarken. Vil du skifte billede senere, så læg den nye fil i `images/`-mappen og ret filnavnet i `css/style.css` under `.hero { background: ... }`.

## Næste mulige trin

- Automatisk dokumentliste fra Google Drive API
- Kalenderintegration
- Billedgalleri
- Nyhedsarkiv
- Beskyttet bestyrelsesområde
- Eget domæne og favicon
