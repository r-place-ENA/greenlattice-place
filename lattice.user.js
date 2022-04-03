// ==UserScript==
// @name         Ena-GL Overlay
// @namespace    https://reddit.com/r/ena
// @version      0.2
// @description  overlay for r/place
// @author       FOR OSU: oralekin, exdeejay | FOR GL: artillect#8709, jcb#1032, jumpinglizard#4404 | FOR ENA: AZMPlay#9283, PizzaRalsei#9465
// @match        https://hot-potato.reddit.com/embed*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// @updateURL    https://github.com/r-place-ENA/greenlattice-place/raw/ena-fork/lattice.user.js
// @downloadURL  https://github.com/r-place-ENA/greenlattice-place/raw/ena-fork/lattice.user.js
// ==/UserScript==

if (window.top !== window.self) {
  window.addEventListener(
    "load",
    () => {
      document
        .getElementsByTagName("mona-lisa-embed")[0]
        .shadowRoot.children[0].getElementsByTagName("mona-lisa-canvas")[0]
        .shadowRoot.children[0].appendChild(
          (function () {
            const i = document.createElement("img");
            i.src = "https://raw.githubusercontent.com/r-place-ENA/greenlattice-place/ena-fork/lattice_overlay.png";
            i.style = "position:absolute;left:0;top:0;image-rendering:pixelated;width:2000px;height:1000px;";
            i.setAttribute("data-display", "1");

            // toggle on key press
            document.addEventListener("keypress", (e) => {
              if (e.code.toLowerCase() == "space") {
                i.style.display = i.getAttribute("data-display") == "1" ? "none" : "block";
                i.setAttribute("data-display", 1 - parseInt(i.getAttribute("data-display")));
              }
            });

            // intercept URL changes
            window.history.oldReplaceState = window.history.replaceState;
            window.history.replaceState = function (a, b, c, d) {
              let coordsEl = document.getElementsByTagName("mona-lisa-embed")[0].shadowRoot.children[0].getElementsByTagName("mona-lisa-coordinates")[0].shadowRoot.children[0];
              let zoomLevel = coordsEl.textContent.replace(/^ \(\d+,\d+\) (\d\.\d)x $/, "$1");

              // disable when you're zoomed out
              if (zoomLevel == "0.1" || zoomLevel == "0.2") {
                i.style.display = "none";
              } else {
                if (i.getAttribute("data-display") == "1") i.style.display = "block";
              }

              window.history.oldReplaceState(a, b, c, d);
            };

            return i;
          })()
        );
    },
    false
  );
}
