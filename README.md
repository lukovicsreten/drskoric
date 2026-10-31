# Stomatološka ordinacija Škorić – sajt

Zvanični sajt porodične stomatološke ordinacije **dr Marine Škorić** iz Žarkova (Čukarica, Beograd).
Jednostranični, potpuno statički sajt sa sekcijama: početna, o nama, usluge, izdvojene usluge, radovi (pre i posle),
zašto mi, kontakt sa mapom i formom za zakazivanje.

Adrese sajta:

- Vercel: **https://drskoric.vercel.app**
- GitHub Pages: **https://lukovicsreten.github.io/drskoric/**

## Tehnologije

- [Astro](https://astro.build) – statički sajt, bez servera
- [Tailwind CSS](https://tailwindcss.com) v4 – stilovi i paleta boja iz logotipa
- TypeScript
- Astro `<Image>` – automatska optimizacija slika u WebP, lazy loading, zadate dimenzije
- Fontovi **Fraunces** (naslovi) i **Inter** (tekst), hostovani lokalno (latin + latin-ext za Š, Ć, Č, Ž, Đ)
- Ikonice iz [Lucide](https://lucide.dev) seta kao inline SVG
- `@astrojs/sitemap` – automatski sitemap
- [Formspree](https://formspree.io) – slanje forme za zakazivanje (opciono)

## Lokalno pokretanje

Potreban je [Node.js](https://nodejs.org) verzije 22.12 ili novije.

```bash
git clone https://github.com/lukovicsreten/drskoric.git
cd drskoric
npm install
npm run dev
```

Sajt je zatim dostupan na adresi `http://localhost:4321/drskoric/`.

## Build

```bash
npm run build
```

Gotov sajt se nalazi u folderu `dist/`. Pregled build-a lokalno: `npm run preview`.

## Struktura foldera

```
├── .github/workflows/deploy.yml   # automatska objava na GitHub Pages
├── public/                        # favicon, apple-touch-icon, OG slika, manifest
├── scripts/generate-favicons.mjs  # pravi favicone iz monogram logoa
├── src/
│   ├── assets/images/             # sve slike sajta (optimizuju se pri build-u)
│   ├── components/                # svaka sekcija je posebna komponenta
│   ├── data/siteConfig.ts         # SVI podaci i tekstovi koji se menjaju
│   ├── layouts/BaseLayout.astro   # <head>, SEO, Open Graph, JSON-LD
│   ├── pages/index.astro          # stranica – redosled sekcija
│   ├── pages/robots.txt.ts        # robots.txt (generiše se pri build-u)
│   ├── styles/global.css          # Tailwind tema, fontovi, animacije
│   └── utils/url.ts               # pomoćne funkcije za putanje i slike
├── astro.config.mjs               # site i base adresa sajta
└── package.json
```

## Kako da izmenim sadržaj

### Tekstovi i podaci – `src/data/siteConfig.ts`

Gotovo sve što se menja nalazi se u jednom fajlu:

- naziv ordinacije, ime doktorke, godina osnivanja, matični broj
- adresa, telefon, Viber i Facebook linkovi, link za Google mapu
- **radno vreme** (`hours`) – kada upišete tačno radno vreme, postavite `hoursConfirmed: true`,
  pa će se radno vreme pojaviti i u podacima za Google
- linije javnog prevoza
- `formEndpoint` – adresa Formspree forme (vidi ispod)
- lista usluga sa opisima i ikonicama
- izdvojene usluge sa slikama
- galerija radova sa oznakama „Pre“ / „Posle“
- kartice „Zašto mi“

Posle izmene sačuvajte fajl i uradite commit i push – sajt se automatski ponovo objavljuje.

### Slike – `src/assets/images`

- Da zamenite sliku, sačuvajte novu pod **istim imenom** (npr. `pregled.jpg`).
- Da dodate novu sliku u galeriju: ubacite je u `src/assets/images`, importujte je na vrhu
  `siteConfig.ts` (kao ostale slike) i dodajte novi unos u listu `gallery`.
- Slike ne morate ručno smanjivati – Astro ih pri build-u pretvara u WebP u više veličina.

### Fotografija doktorke

U sekciji „O nama“ trenutno je krug sa inicijalima „MŠ“. Kada fotografija bude spremna, ubacite je u
`src/assets/images` (npr. `dr-marina-skoric.jpg`) i u `src/components/About.astro` zamenite placeholder
komponentom `<Image src={...} alt="dr Marina Škorić" />`.

### Favicon

Favicon fajlovi u `public/` napravljeni su iz `logo-monogram.png`. Ako se logo promeni, pokrenite:

```bash
npm run favicons
```

## Forma za zakazivanje (Formspree)

Dok je `formEndpoint` prazan, umesto forme se prikazuju dugmad „Pozovite“ i „Viber“.

1. Napravite besplatan nalog na [formspree.io](https://formspree.io) (sa imejlom ordinacije).
2. Kliknite **New Form**, dajte joj ime (npr. „Zakazivanje“) i izaberite imejl na koji stižu poruke.
3. Kopirajte adresu forme, npr. `https://formspree.io/f/abcdwxyz`.
4. U `src/data/siteConfig.ts` upišite je u polje `formEndpoint`:
   ```ts
   formEndpoint: 'https://formspree.io/f/abcdwxyz',
   ```
5. Commit i push. Prvu poruku poslatu sa sajta Formspree traži da potvrdite preko imejla.

Endpoint nije tajni podatak – javno se vidi u kodu stranice, pa ga je bezbedno čuvati u repou.

## Objava na GitHub Pages

Sajt se automatski objavljuje na svaki push na granu `main` (workflow `.github/workflows/deploy.yml`).

**Jednokratno podešavanje:** u repou na GitHub-u otvorite **Settings → Pages** i pod **Build and deployment →
Source** izaberite **GitHub Actions**. Tok objave pratite u kartici **Actions**.

## Objava na Vercel-u

Projekat je povezan sa Vercel nalogom (projekat `drskoric`). Nova verzija se objavljuje iz foldera projekta:

```bash
vercel deploy --prod
```

Na Vercel-u se sajt automatski gradi sa `base: '/'` (Vercel pri build-u postavlja promenljivu `VERCEL`),
dok na GitHub Pages ostaje `base: '/drskoric'` – podešavanje je u `astro.config.mjs`.
Da bi se sajt na Vercel-u objavljivao automatski na svaki push, u Vercel podešavanjima projekta
(**Settings → Git**) povežite GitHub repo `lukovicsreten/drskoric`.

## Sopstveni domen

Kada ordinacija dobije domen (npr. `www.ordinacijaskoric.rs`):

1. U `astro.config.mjs` promenite:
   ```js
   site: 'https://www.ordinacijaskoric.rs',
   base: '/',
   ```
2. Napravite fajl `public/CNAME` koji sadrži samo naziv domena:
   ```
   www.ordinacijaskoric.rs
   ```
3. Kod registra domena podesite DNS: za `www` dodajte **CNAME** zapis koji pokazuje na
   `lukovicsreten.github.io`. Za domen bez `www` dodajte **A** zapise ka GitHub Pages adresama
   (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`).
4. U **Settings → Pages** upišite domen pod **Custom domain** i uključite **Enforce HTTPS**.
5. Commit i push.

Sve putanje na sajtu (slike, favicon, linkovi, sitemap, robots.txt) automatski prate `base`, pa ništa drugo
ne treba menjati.
