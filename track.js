// Counts what people do on the live site: the gate on the front page, which
// menu item they went to, the atrocity card, click-to-be-saved, the confession
// booth, the New Mercy badge, the playlist banner, the fly and the music - and
// at the cathedral, whether they said yes or no.
// Nothing about who did it is stored - no ids, no cookies, just a name and a time.
//
// Three gates keep your own clicks out. Here: the page must be served from
// neocities, and `?nocount=1` must never have been set in this browser - the
// same localStorage flag the visit counters use. At the val: the request must
// carry the live site as its referer, so a local preview cannot write at all,
// and the network it came from must not be one stats.html has switched off.
(function () {
  const ENDPOINT = "https://unlikelyarchivist--ac445c40b04711f1a2641607ee4eb77e.web.val.run";

  function excluded() {
    try {
      if (new URLSearchParams(location.search).get("nocount") === "1") {
        localStorage.setItem("skip-count", "1");
      }
      return localStorage.getItem("skip-count") === "1";
    } catch {
      return false;
    }
  }

  const counting = /\.neocities\.org$/.test(location.hostname) && !excluded();

  window.cathedralTrack = function (event) {
    if (!counting) return;
    cathedralJsonp(ENDPOINT + "/track", { event: event }).catch(function () {});
  };

  // The badge and the banner live in the generated sidebar, so they are caught
  // here by class rather than by editing markup the next sidebar sync would
  // overwrite. mousedown, not click: the playlist leaves for Spotify, and a
  // <script> beacon dies if navigation starts first.
  // Which menu item, by where it goes. The sidebar is generated, so nothing
  // here may depend on markup a sync would rewrite - the href is the one stable
  // thing about a menu link.
  const MENU = {
    "home.html": "home",
    "blog.html": "blog",
    "guestbook.html": "guestbook",
    "texts.html": "texts",
    "games.html": "games",
    "video.html": "video",
    "art.html": "art",
    "websites.html": "websites",
    "images.html": "images",
  };

  document.addEventListener("mousedown", function (e) {
    const el = e.target instanceof Element
      ? e.target.closest(
        ".new-mercy-badge, .playlist-banner, .panel-menu a, .saved-box, " +
          "#atrocityLink, #boothOpen, #pulpitButton, .priest-figure, " +
          "#photosLink, #cornerPortrait, .take-copy, .adopt-copy",
      )
      : null;
    if (!el) return;

    if (el.classList.contains("playlist-banner")) return window.cathedralTrack("playlist");
    if (el.classList.contains("new-mercy-badge")) return window.cathedralTrack("new-mercy");
    if (el.classList.contains("saved-box")) return window.cathedralTrack("saved");
    if (el.classList.contains("priest-figure")) return window.cathedralTrack("priest");
    if (el.classList.contains("take-copy")) return window.cathedralTrack("button-copied");
    if (el.classList.contains("adopt-copy")) return window.cathedralTrack("gargoyle-copied");
    if (el.id === "atrocityLink") return window.cathedralTrack("atrocity");
    if (el.id === "boothOpen") return window.cathedralTrack("confess-open");
    if (el.id === "pulpitButton") return window.cathedralTrack("scripture");
    if (el.id === "photosLink") return window.cathedralTrack("photos");
    if (el.id === "cornerPortrait") return window.cathedralTrack("prototype");

    const page = (el.getAttribute("href") || "").split("/").pop();
    if (MENU[page]) window.cathedralTrack("menu-" + MENU[page]);
  });
})();
