// Renders the one category named by <body data-category="...">. Every
// category page is the same file with a different data-category.
(function () {
  const container = document.getElementById("artifactCategories");
  if (!container) return;

  const id = document.body.dataset.category;
  const cat = ARTIFACT_CATEGORIES.find((c) => c.id === id);
  if (!cat) return;

  const items = ARTIFACTS.filter((a) => a.category === cat.id);

  const section = document.createElement("section");
  section.id = cat.id;
  section.className = "panel artifact-category artifact-category--" + cat.id;

  const title = document.createElement("h2");
  title.className = "panel-title";
  title.textContent = cat.label;
  section.appendChild(title);

  const body = document.createElement("div");
  body.className = "panel-body";

  // art is the work itself, captioned with who made it - a citation for a
  // picture is the one thing worse than no entry at all
  if (cat.id === "art" && items.some((a) => a.file)) {
    const wall = document.createElement("div");
    wall.className = "art-wall";
    items.forEach((item) => {
      const fig = document.createElement("figure");
      if (item.file) {
        const img = document.createElement("img");
        img.src = "../assets/art/" + item.file;
        img.alt = item.title;
        img.loading = "lazy";
        fig.appendChild(img);
      }
      const cap = document.createElement("figcaption");
      cap.textContent = item.title;
      if (item.author) {
        const who = document.createElement("span");
        who.className = "artifact-author";
        who.textContent = " \u2014 " + item.author;
        cap.appendChild(who);
      }
      fig.appendChild(cap);
      wall.appendChild(fig);
    });
    body.appendChild(wall);
    section.appendChild(body);
    container.appendChild(section);
    return;
  }

  // images are the things themselves; every other category is a list of works
  // to go and read, watch or play.
  if (cat.id === "images") {
    const wall = document.createElement("div");
    wall.className = "image-wall";
    (typeof IMAGE_FILES === "undefined" ? [] : IMAGE_FILES).forEach((name) => {
      const img = document.createElement("img");
      img.src = "../assets/images/" + name;
      img.alt = "";
      img.loading = "lazy";
      wall.appendChild(img);
    });
    if (!wall.children.length) {
      const empty = document.createElement("p");
      empty.className = "artifact-empty";
      empty.textContent = "more soon.";
      body.appendChild(empty);
    } else {
      body.appendChild(wall);
    }
    section.appendChild(body);
    container.appendChild(section);
    return;
  }

  if (!items.length) {
    const empty = document.createElement("p");
    empty.className = "artifact-empty";
    empty.textContent = "more soon.";
    body.appendChild(empty);
  } else {
    const list = document.createElement("ul");
    list.className = "artifact-list";
    items.forEach((item) => {
      const li = document.createElement("li");

      if (item.url) {
        const link = document.createElement("a");
        link.href = item.url;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = item.title;
        li.appendChild(link);
      } else {
        const name = document.createElement("span");
        name.className = "artifact-title";
        name.textContent = item.title;
        li.appendChild(name);
      }

      if (item.author) {
        const author = document.createElement("span");
        author.className = "artifact-author";
        author.textContent = " \u2014 " + item.author;
        li.appendChild(author);
      }

      list.appendChild(li);
    });
    body.appendChild(list);
  }

  section.appendChild(body);
  container.appendChild(section);
})();
