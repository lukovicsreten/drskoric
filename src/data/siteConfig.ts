// ============================================================================
//  Svi podaci sajta na jednom mestu.
//  Izmenite tekst ovde – komponente automatski preuzimaju nove vrednosti.
// ============================================================================
import type { ImageMetadata } from 'astro';
import type { IconName } from '../components/Icon.astro';

import izbeljivanje from '../assets/images/izbeljivanje.jpg';
import estetikaOsmeh from '../assets/images/estetika-osmeh.jpg';
import folije from '../assets/images/folije.jpg';
import estetskaMedicina from '../assets/images/estetska-medicina.jpg';
import kamenac from '../assets/images/kamenac-pre-posle.jpg';
import most from '../assets/images/most-pre-posle.jpg';
import krunice from '../assets/images/krunice-pre-posle.jpg';
import protetikaKolaz from '../assets/images/protetika-kolaz.jpg';
import ceramage from '../assets/images/ceramage.jpg';

// ---------------------------------------------------------------------------
//  Osnovni podaci
// ---------------------------------------------------------------------------
export const siteConfig = {
  name: 'Stomatološka ordinacija Škorić',
  shortName: 'Škorić',
  doctor: 'dr Marina Škorić',
  doctorInitials: 'MŠ',
  since: 2011,
  registrationNumber: '62713275', // matični broj

  address: {
    street: 'Repiška 52',
    postalCode: '11030',
    city: 'Beograd',
    area: 'Čukarica, Žarkovo',
    country: 'RS',
  },

  phone: {
    display: '063 890 4391',
    international: '+381 63 890 4391',
    href: 'tel:+381638904391',
  },
  viberHref: 'viber://chat?number=%2B381638904391',
  facebookUrl: 'https://www.facebook.com/ordinacijaskoric',

  mapEmbedUrl: 'https://www.google.com/maps?q=Repi%C5%A1ka+52,+11030+Beograd&output=embed',
  mapLinkUrl: 'https://www.google.com/maps/search/?api=1&query=Repi%C5%A1ka+52%2C+11030+Beograd',

  // TODO: proveriti i upisati tačno radno vreme ordinacije.
  // Dok je hoursConfirmed = false, radno vreme se NE upisuje u Google strukturirane podatke (JSON-LD).
  hoursConfirmed: false,
  hours: [
    { days: 'Ponedeljak – petak', time: '09 – 20h', schema: 'Mo-Fr 09:00-20:00' },
    { days: 'Subota', time: '09 – 14h', schema: 'Sa 09:00-14:00' },
    { days: 'Nedelja', time: 'zatvoreno', schema: '' },
  ],

  transport: {
    stop: 'Žarkovo',
    distance: 'oko 200 m',
    lines: ['37', '50', '51', '52', '56', '89', '531'],
  },

  // Formspree endpoint, npr. 'https://formspree.io/f/abcdwxyz'.
  // Dok je prazan, forma se ne prikazuje – umesto nje stoje dugmad „Pozovite“ i „Viber“.
  formEndpoint: '',
};

// ---------------------------------------------------------------------------
//  Navigacija
// ---------------------------------------------------------------------------
export const navigation = [
  { label: 'Početna', href: '#pocetna' },
  { label: 'O nama', href: '#o-nama' },
  { label: 'Usluge', href: '#usluge' },
  { label: 'Radovi', href: '#radovi' },
  { label: 'Kontakt', href: '#kontakt' },
];

// ---------------------------------------------------------------------------
//  Usluge (sekcija „Usluge“ i padajući meni u formi)
// ---------------------------------------------------------------------------
export interface Service {
  title: string;
  description: string;
  icon: IconName;
}

export const services: Service[] = [
  {
    title: 'Pregledi i preventiva',
    description:
      'Redovni pregledi, saveti za održavanje oralne higijene i rano otkrivanje problema, dok su još mali i jednostavni za rešavanje.',
    icon: 'stethoscope',
  },
  {
    title: 'Uklanjanje kamenca i poliranje',
    description:
      'Uklanjanje kamenca i poliranje zuba – za zdrave desni i svežiji osmeh.',
    icon: 'sparkles',
  },
  {
    title: 'Plombe i lečenje zuba',
    description:
      'Bele kompozitne plombe u boji vaših zuba i lečenje kanala korena, kako bismo sačuvali sopstveni zub.',
    icon: 'shield-check',
  },
  {
    title: 'Izbeljivanje zuba',
    description:
      'Izbeljivanje u ordinaciji uz lampu ili kod kuće pomoću individualnih folija, uz prethodni pregled.',
    icon: 'sun',
  },
  {
    title: 'Estetska stomatologija',
    description:
      'Fasete i kompozitne korekcije oblika i boje zuba, planirane tako da osmeh izgleda prirodno.',
    icon: 'smile',
  },
  {
    title: 'Protetika',
    description:
      'Krunice, mostovi i Ceramage sistem – nadoknada oštećenih i izgubljenih zuba za udobno žvakanje i lep osmeh.',
    icon: 'crown',
  },
  {
    title: 'Vađenje zuba i oralna hirurgija',
    description:
      'Vađenje zuba i manji oralnohirurški zahvati u lokalnoj anesteziji, uz jasna uputstva za oporavak.',
    icon: 'cross',
  },
  {
    title: 'Providne folije',
    description:
      'Providne folije za izbeljivanje kod kuće i za zaštitu zuba, izrađene prema otisku vaših zuba.',
    icon: 'layers',
  },
  {
    title: 'Dečja stomatologija',
    description:
      'Strpljiv i nežan pristup najmlađima, da odlazak kod stomatologa postane navika bez straha.',
    icon: 'baby',
  },
  {
    title: 'Estetska medicina',
    description:
      'Botoks i hijaluronski fileri za osvežen izgled lica, uz razgovor o očekivanjima pre tretmana.',
    icon: 'syringe',
  },
];

// ---------------------------------------------------------------------------
//  Izdvojene usluge (naizmenični redovi slika – tekst)
// ---------------------------------------------------------------------------
export interface FeaturedService {
  eyebrow: string;
  title: string;
  text: string;
  points: string[];
  image: ImageMetadata;
  imageAlt: string;
  /** CSS object-position, kada slika mora da se iseče drugačije od centra */
  imagePosition?: string;
}

export const featuredServices: FeaturedService[] = [
  {
    eyebrow: 'Izbeljivanje',
    title: 'Izbeljivanje zuba u ordinaciji',
    text: 'Gel za izbeljivanje aktiviramo posebnom lampom, a desni i usne su sve vreme zaštićeni. Pre izbeljivanja pregledamo zube i uklonimo kamenac, kako bi rezultat bio ujednačen.',
    points: ['Pregled i čišćenje pre tretmana', 'Zaštita desni tokom celog postupka', 'Saveti kako da rezultat duže potraje'],
    image: izbeljivanje,
    imageAlt: 'Pacijentkinja sa zaštitnim naočarima tokom izbeljivanja zuba pod plavom lampom',
  },
  {
    eyebrow: 'Estetika',
    title: 'Estetska stomatologija i fasete',
    text: 'Fasete i kompozitne korekcije mogu da promene oblik, boju i veličinu zuba. Svaki plan pravimo zajedno sa vama – razgovaramo o tome šta želite, šta je izvodljivo i koje su mogućnosti.',
    points: ['Fasete i kompozitne korekcije', 'Promena oblika i razmaka između zuba', 'Izbor nijanse koja odgovara vašem licu'],
    image: estetikaOsmeh,
    imageAlt: 'Osmeh sa ravnim, belim zubima i crvenim karminom',
  },
  {
    eyebrow: 'Folije',
    title: 'Izbeljivanje kod kuće i providne folije',
    text: 'Za postepeno izbeljivanje kod kuće izrađujemo providne folije prema otisku vaših zuba. Gel nanosite sami, u terminima koji vam odgovaraju, a mi pratimo tok i rezultat.',
    points: ['Folije izrađene po vašem otisku', 'Detaljno uputstvo za upotrebu', 'Kontrola tokom izbeljivanja'],
    image: folije,
    imageAlt: 'Providna folija postavljena preko gornjih zuba',
  },
  {
    eyebrow: 'Estetska medicina',
    title: 'Estetska medicina',
    text: 'Pored stomatologije, nudimo i tretmane botoksom i hijaluronskim filerima. Pre svakog tretmana razgovaramo o očekivanjima i objašnjavamo kako tretman izgleda i koliko efekat traje.',
    points: ['Botoks za mimične bore', 'Hijaluronski fileri', 'Konsultacija pre tretmana'],
    image: estetskaMedicina,
    imageAlt: 'Tretman lica – aplikacija preparata tankom iglom u predelu čela',
    imagePosition: '28% 50%',
  },
];

// ---------------------------------------------------------------------------
//  Galerija radova (pre i posle)
//  position: 'full' = oznaka u gornjem levom uglu cele slike,
//            'top' / 'bottom' = oznaka na gornjoj / donjoj polovini kolaža
// ---------------------------------------------------------------------------
export interface GalleryLabel {
  text: string;
  position: 'full' | 'top' | 'bottom';
  tone: 'before' | 'after' | 'neutral';
}

export interface GalleryItem {
  image: ImageMetadata;
  alt: string;
  title: string;
  labels: GalleryLabel[];
}

export const gallery: GalleryItem[] = [
  {
    image: kamenac,
    title: 'Uklanjanje kamenca',
    alt: 'Donji prednji zubi: gore čisti zubi posle uklanjanja kamenca, dole zubi sa naslagama kamenca pre tretmana',
    labels: [
      { text: 'Posle', position: 'top', tone: 'after' },
      { text: 'Pre', position: 'bottom', tone: 'before' },
    ],
  },
  {
    image: most,
    title: 'Protetika – most',
    alt: 'Osmeh pacijentkinje: gore sa nedostajućim gornjim zubima, dole sa novim mostom',
    labels: [
      { text: 'Pre', position: 'top', tone: 'before' },
      { text: 'Posle', position: 'bottom', tone: 'after' },
    ],
  },
  {
    image: krunice,
    title: 'Krunice',
    alt: 'Gore osmeh sa novim krunicama, dole brušeni zubi pripremljeni za krunice',
    labels: [
      { text: 'Posle', position: 'top', tone: 'after' },
      { text: 'Pre', position: 'bottom', tone: 'before' },
    ],
  },
  {
    image: protetikaKolaz,
    title: 'Protetski radovi',
    alt: 'Kolaž od pet fotografija osmeha pacijenata sa završenim protetskim radovima',
    labels: [{ text: 'Naši radovi', position: 'full', tone: 'neutral' }],
  },
  {
    image: ceramage,
    title: 'Ceramage sistem',
    alt: 'Početno stanje pre nadoknade Ceramage sistemom: oštećeni i nedostajući gornji prednji zubi',
    labels: [{ text: 'Početno stanje: Ceramage sistem', position: 'full', tone: 'neutral' }],
  },
];

// ---------------------------------------------------------------------------
//  Zašto mi
// ---------------------------------------------------------------------------
export const reasons: { title: string; text: string; icon: IconName }[] = [
  {
    title: 'Iskustvo od 2011.',
    text: 'Od 2011. godine radimo u Žarkovu i brinemo o zubima komšija i njihovih porodica.',
    icon: 'award',
  },
  {
    title: 'Porodična atmosfera',
    text: 'Mirna ordinacija u kojoj se znamo po imenu i u kojoj nema žurbe.',
    icon: 'users',
  },
  {
    title: 'Savremena oprema',
    text: 'Radimo sa savremenim materijalima i opremom, uz poštovanje svih higijenskih standarda.',
    icon: 'microscope',
  },
  {
    title: 'Plan terapije dogovaramo zajedno',
    text: 'Objasnimo svaku mogućnost unapred, a odluku donosimo zajedno sa vama.',
    icon: 'clipboard-list',
  },
];
