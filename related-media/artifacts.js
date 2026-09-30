// Sacred artifacts pool. Add entries here; the page renders one list item per
// entry, grouped under its category. A text needs a url, pointing at the
// work itself - the full text, not a description or a store page - because
// a text nobody can open is a citation. Films and games list without one.
// id doubles as the anchor the sidebar links to (#texts, #games, ...).
// column says which of the page's three columns a category stacks into.
const ARTIFACT_CATEGORIES = [
  { id: "texts", label: "texts", column: 1 },
  { id: "games", label: "games", column: 2 },
  { id: "tv-film", label: "video", column: 2 },
  { id: "art", label: "art", column: 3 },
  { id: "websites", label: "websites", column: 3 },
  { id: "images", label: "images", column: 3 },
];

const ARTIFACTS = [
  {
    id: "celestial-hierarchy",
    category: "texts",
    title: "the celestial hierarchy",
    author: "pseudo-dionysius the areopagite (5th-6th c.)",
    url: "https://www.ccel.org/ccel/dionysius/celestial.toc.html",
  },
  {
    id: "heaven-and-hell",
    category: "texts",
    title: "heaven and hell",
    author: "emanuel swedenborg (1758)",
    url: "https://archive.org/details/swedenborg_foundation_heaven_and_hell",
  },
  {
    id: "idea-of-the-holy",
    category: "texts",
    title: "the idea of the holy",
    author: "rudolf otto (1923)",
    url: "https://archive.org/details/ideaofholyinquir0000otto_k1y1",
  },
  {
    id: "cyborg-manifesto",
    category: "texts",
    title: "a cyborg manifesto",
    author: "donna haraway (1985)",
    url: "https://theanarchistlibrary.org/library/donna-haraway-a-cyborg-manifesto",
  },
  {
    id: "american-technological-sublime",
    category: "texts",
    title: "american technological sublime",
    author: "david nye (1994)",
    url: "https://archive.org/details/americantechnolo00nyed",
  },
  {
    id: "gods-of-the-new-millennium",
    category: "texts",
    title: "gods of the new millennium",
    author: "alan f. alford (1996)",
    url: "https://archive.org/stream/GodsNewMillennium/godnewmill_djvu.txt",
  },
  {
    id: "religion-of-technology",
    category: "texts",
    title: "the religion of technology",
    author: "david f. noble (1997)",
    url: "https://archive.org/details/religionoftechno00nobl",
  },
  {
    id: "i-cyborg",
    category: "texts",
    title: "i, cyborg",
    author: "kevin warwick (2002)",
    url: "https://archive.org/details/icyborg00kevi",
  },
  {
    id: "angels-ai-alterity",
    category: "texts",
    title: "angels, ai, and alterity",
    author: "alexander m. sidorkin (2026)",
    url: "https://www.sciencedirect.com/science/article/pii/S2949882126000563",
  },
  {
    id: "gnostic-religion",
    category: "texts",
    title: "the gnostic religion",
    author: "hans jonas",
    url: "https://archive.org/details/gnosticreligion0000hans",
  },
  {
    id: "chariots-of-the-gods",
    category: "texts",
    title: "chariots of the gods?",
    author: "erich von däniken (1968)",
    url: "https://archive.org/details/chariotsofgods0000eric",
  },
  {
    id: "active-sacred-heart",
    category: "art",
    title: "active sacred heart",
    author: "jos\u00e9 antonio hern\u00e1ndez-d\u00edez (1991)",
    file: "activeheart.jpg",
  },
  {
    id: "contemporary-golgotha",
    category: "art",
    title: "contemporary golgotha",
    author: "stane jagodi\u010d (1999)",
    file: "golgotha.jpg",
  },
  {
    id: "i-have-no-mouth",
    category: "games",
    title: "i have no mouth, and i must scream",
    author: "cyberdreams (1995)",
    url: "https://archive.org/details/ihnmaims",
  },
  {
    id: "galerians",
    category: "games",
    title: "galerians",
    author: "polygon magic (1999)",
    url: "https://archive.org/details/galerians_202502",
  },
  {
    id: "xcom-ufo-defense",
    category: "games",
    title: "x-com: ufo defense",
    author: "microprose (1995)",
    url: "https://archive.org/details/psx_xcom",
  },
  {
    id: "2001-space-odyssey",
    category: "tv-film",
    title: "2001: a space odyssey",
    author: "stanley kubrick (1968)",
  },
  {
    id: "ancient-aliens",
    category: "tv-film",
    title: "ancient aliens",
    author: "history channel (2009)",
  },
  {
    id: "divine-machinery-art-movement",
    category: "tv-film",
    title: "analyzing divine machinery as an \u201cart movement\u201d",
    author: "joshua bushman",
    url: "https://www.youtube.com/watch?v=nJx9POvQ894",
  },
  {
    id: "battlestar-galactica",
    category: "tv-film",
    title: "battlestar galactica",
    author: "ronald d. moore (2004)",
  },
];

// Art entries carry a `file` in public/assets/art/ and are shown as the work
// itself, captioned. An art entry with no file falls back to a plain listing.

// The images category is pictures, not citations: this is the wall, in order.
// Add a file to public/assets/images/ and add its name here.
const IMAGE_FILES = [
  "android-neon-cross.jpg",
  "are-you-proud-of-how-you-function.jpg",
  "computer-angel-pin.jpg",
  "crt-eyes-of-angels.jpg",
  "divine-flesh-mechanical.jpg",
  "hacker-meat-and-bone.jpg",
  "hand-on-circuit-board.jpg",
  "led-cross-figure.jpg",
  "pink-tentacle-saint.jpg",
  "robed-figures-machine.jpg",
  "shrine-room-eyes.jpg",
  "spectrum-of-consciousness.jpg",
  "windows95-warm-like-flesh.jpg",
  "winged-figure-tech-debris.jpg",
];
