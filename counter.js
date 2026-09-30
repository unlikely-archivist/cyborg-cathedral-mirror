// Visit counter. Set ?nocount=1 once in a browser to stop counting yourself there.
const ENDPOINT = "https://unlikelyarchivist--ac445c40b04711f1a2641607ee4eb77e.web.val.run";
const out = document.getElementById("congregationCount");

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

function counted() {
  try {
    if (sessionStorage.getItem("counted") === "1") return true;
    sessionStorage.setItem("counted", "1");
    return false;
  } catch {
    return false;
  }
}

const shouldCount = !excluded() && !counted();

cathedralJsonp(shouldCount ? ENDPOINT + "/visit" : ENDPOINT)
  .then((d) => {
    out.textContent = String(d.count).padStart(6, "0");
  })
  .catch(() => {
    out.textContent = "------";
  });
