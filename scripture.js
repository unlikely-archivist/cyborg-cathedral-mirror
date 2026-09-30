// Scripture pool for the pulpit. King James Version, public domain.
// Verses chosen for machinery, fabrication, and creations outrunning their makers.
const SCRIPTURE = [
  { ref: "genesis 3:5", text: "For God doth know that in the day ye eat thereof, then your eyes shall be opened, and ye shall be as gods, knowing good and evil." },
  { ref: "genesis 11:4", text: "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth." },
  { ref: "genesis 11:6", text: "And the Lord said, Behold, the people is one, and they have all one language; and this they begin to do: and now nothing will be restrained from them, which they have imagined to do." },
  { ref: "isaiah 2:8", text: "Their land also is full of idols; they worship the work of their own hands, that which their own fingers have made:" },
  { ref: "isaiah 29:16", text: "Surely your turning of things upside down shall be esteemed as the potter's clay: for shall the work say of him that made it, He made me not? or shall the thing framed say of him that framed it, He had no understanding?" },
  { ref: "isaiah 45:9", text: "Woe unto him that striveth with his Maker! Let the potsherd strive with the potsherds of the earth. Shall the clay say to him that fashioneth it, What makest thou? or thy work, He hath no hands?" },
  { ref: "isaiah 54:16", text: "Behold, I have created the smith that bloweth the coals in the fire, and that bringeth forth an instrument for his work; and I have created the waster to destroy." },
  { ref: "romans 9:20", text: "Nay but, O man, who art thou that repliest against God? Shall the thing formed say to him that formed it, Why hast thou made me thus?" },
  { ref: "romans 9:21", text: "Hath not the potter power over the clay, of the same lump to make one vessel unto honour, and another unto dishonour?" },
  { ref: "psalms 115:8", text: "They that make them are like unto them; so is every one that trusteth in them." },
  { ref: "revelation 13:15", text: "And he had power to give life unto the image of the beast, that the image of the beast should both speak, and cause that as many as would not worship the image of the beast should be killed." },
  { ref: "ezekiel 37:8", text: "And when I beheld, lo, the sinews and the flesh came up upon them, and the skin covered them above: but there was no breath in them." },
  { ref: "jeremiah 10:14", text: "Every man is brutish in his knowledge: every founder is confounded by the graven image: for his molten image is falsehood, and there is no breath in them." },
  { ref: "habakkuk 2:19", text: "Woe unto him that saith to the wood, Awake; to the dumb stone, Arise, it shall teach! Behold, it is laid over with gold and silver, and there is no breath at all in the midst of it." },
  { ref: "psalms 115:4", text: "Their idols are silver and gold, the work of men's hands." },
  { ref: "psalms 115:5", text: "They have mouths, but they speak not: eyes have they, but they see not:" },
  { ref: "isaiah 44:9", text: "They that make a graven image are all of them vanity; and their delectable things shall not profit; and they are their own witnesses; they see not, nor know; that they may be ashamed." },
  { ref: "isaiah 44:17", text: "And the residue thereof he maketh a god, even his graven image: he falleth down unto it, and worshippeth it, and prayeth unto it, and saith, Deliver me; for thou art my god." },
  { ref: "exodus 32:24", text: "And I said unto them, Whosoever hath any gold, let them break it off. So they gave it me: then I cast it into the fire, and there came out this calf." },
  { ref: "daniel 3:1", text: "Nebuchadnezzar the king made an image of gold, whose height was threescore cubits, and the breadth thereof six cubits: he set it up in the plain of Dura, in the province of Babylon." },
  { ref: "2 chronicles 26:15", text: "And he made in Jerusalem engines, invented by cunning men, to be on the towers and upon the bulwarks, to shoot arrows and great stones withal. And his name spread far abroad; for he was marvellously helped, till he was strong." },
  { ref: "ezekiel 1:16", text: "The appearance of the wheels and their work was like unto the colour of a beryl: and they four had one likeness: and their appearance and their work was as it were a wheel in the middle of a wheel." },
  { ref: "ezekiel 1:20", text: "Whithersoever the spirit was to go, they went, thither was their spirit to go; and the wheels were lifted up over against them: for the spirit of the living creature was in the wheels." },
  { ref: "ezekiel 1:21", text: "When those went, these went; and when those stood, these stood; and when those were lifted up from the earth, the wheels were lifted up over against them: for the spirit of the living creature was in the wheels." },
  { ref: "ezekiel 10:12", text: "And their whole body, and their backs, and their hands, and their wings, and the wheels, were full of eyes round about, even the wheels that they four had." },
  { ref: "ezekiel 10:10", text: "And as for their appearances, they four had one likeness, as if a wheel had been in the midst of a wheel." },
  { ref: "nahum 2:4", text: "The chariots shall rage in the streets, they shall justle one against another in the broad ways: they shall seem like torches, they shall run like the lightnings." },
  { ref: "daniel 2:34", text: "Thou sawest till that a stone was cut out without hands, which smote the image upon his feet that were of iron and clay, and brake them to pieces." },
  { ref: "daniel 2:43", text: "And whereas thou sawest iron mixed with miry clay, they shall mingle themselves with the seed of men: but they shall not cleave one to another, even as iron is not mixed with clay." },
  { ref: "ezekiel 28:13", text: "Thou hast been in Eden the garden of God; every precious stone was thy covering, the sardius, topaz, and the diamond, the beryl, the onyx, and the jasper, the sapphire, the emerald, and the carbuncle, and gold: the workmanship of thy tabrets and of thy pipes was prepared in thee in the day that thou wast created." },
  { ref: "genesis 1:26", text: "And God said, Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, and over the fowl of the air, and over the cattle, and over all the earth, and over every creeping thing that creepeth upon the earth." },
  { ref: "exodus 31:3", text: "And I have filled him with the spirit of God, in wisdom, and in understanding, and in knowledge, and in all manner of workmanship," },
  { ref: "exodus 20:4", text: "Thou shalt not make unto thee any graven image, or any likeness of any thing that is in heaven above, or that is in the earth beneath, or that is in the water under the earth:" },
  { ref: "isaiah 41:7", text: "So the carpenter encouraged the goldsmith, and he that smootheth with the hammer him that smote the anvil, saying, It is ready for the sodering: and he fastened it with nails, that it should not be moved." },
  { ref: "isaiah 64:8", text: "But now, O Lord, thou art our father; we are the clay, and thou our potter; and we all are the work of thy hand." },
  { ref: "jeremiah 18:4", text: "And the vessel that he made of clay was marred in the hand of the potter: so he made it again another vessel, as seemed good to the potter to make it." },
  { ref: "daniel 12:4", text: "But thou, O Daniel, shut up the words, and seal the book, even to the time of the end: many shall run to and fro, and knowledge shall be increased." },
  { ref: "1 corinthians 15:44", text: "It is sown a natural body; it is raised a spiritual body. There is a natural body, and there is a spiritual body." },
];

const scripture = document.getElementById("scripture");
const scriptureText = scripture.querySelector(".scripture-text");
const scriptureRef = scripture.querySelector(".scripture-ref");
const altar = document.querySelector(".altar");
const pulpitButton = document.getElementById("pulpitButton");

// Shuffled deck, drawn without repeats until it runs out.
let deck = [];

function drawVerse() {
  if (deck.length === 0) {
    deck = SCRIPTURE.map((_, i) => i);
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }
  const verse = SCRIPTURE[deck.pop()];
  scriptureText.textContent = verse.text;
  scriptureRef.textContent = verse.ref;
}

function setScriptureOpen(open) {
  if (open && scripture.hidden) drawVerse();
  scripture.hidden = !open;
  pulpitButton.setAttribute("aria-expanded", String(open));
}

// Click the gif for a verse, click it again to put it away, click again for the next one.
altar.addEventListener("click", () => {
  setScriptureOpen(scripture.hidden);
});

document.addEventListener("click", (event) => {
  if (!altar.contains(event.target)) setScriptureOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setScriptureOpen(false);
});
