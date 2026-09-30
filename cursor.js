(() => {
  const finePointer = window.matchMedia("(pointer: fine)");
  const scriptBase = new URL(".", document.currentScript.src);
  const cursorImage = new Image();

  cursorImage.src = new URL("assets/shared/cursor-bottom.png", scriptBase).href;

  cursorImage.addEventListener("load", () => {
    if (!finePointer.matches) return;

    const cursor = document.createElement("div");
    cursor.id = "site-cursor";
    cursor.setAttribute("aria-hidden", "true");
    document.body.append(cursor);
    document.documentElement.classList.add("has-custom-cursor");

    const moveCursor = (event) => {
      cursor.style.setProperty("--cursor-x", `${event.clientX}px`);
      cursor.style.setProperty("--cursor-y", `${event.clientY}px`);
      cursor.classList.add("is-visible");
    };

    const animateClick = () => {
      cursor.classList.remove("is-clicking");
      void cursor.offsetWidth;
      cursor.classList.add("is-clicking");
    };

    window.addEventListener("pointermove", moveCursor, { passive: true });
    window.addEventListener("pointerdown", animateClick, { passive: true });
    document.documentElement.addEventListener("mouseleave", () => {
      cursor.classList.remove("is-visible");
    });
    document.documentElement.addEventListener("mouseenter", () => {
      cursor.classList.add("is-visible");
    });
    cursor.addEventListener("animationend", () => {
      cursor.classList.remove("is-clicking");
    });
  });
})();
