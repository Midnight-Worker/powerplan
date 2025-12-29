/* global mermaid, markdownit, $ */

(function () {
  // ---------- Tabs ----------
  function showTab(tabId) {
    $(".tab").removeClass("is-visible");
    $("#" + tabId).addClass("is-visible");

    $(".tabbtn").removeClass("is-active");
    $(`.tabbtn[data-tab="${tabId}"]`).addClass("is-active");
  }

  $(document).on("click", ".tabbtn", function () {
    const tabId = $(this).data("tab");
    showTab(tabId);
  });

  // ---------- Markdown ----------
  const md = window.markdownit();

  function renderMarkdown() {
    const src = $("#mdInput").val();
    $("#mdOutput").html(md.render(src));
  }

  $("#btnRenderMarkdown").on("click", renderMarkdown);

  // ---------- Mermaid ----------
  mermaid.initialize({
    startOnLoad: false
  });

  async function renderMermaid() {
    const src = $("#mmInput").val();

    // Mermaid erwartet ein Element mit class="mermaid"
    $("#mmOutput").html(`<div class="mermaid">${src}</div>`);

    // Mermaid v10: run() rendert alle passenden nodes
    try {
      await mermaid.run({ querySelector: "#mmOutput .mermaid" });
    } catch (err) {
      $("#mmOutput").text("Mermaid Fehler:\n" + err);
    }
  }

  $("#btnRenderMermaid").on("click", renderMermaid);

  // ---------- Canvas ----------
  const canvas = document.getElementById("sketch");
  const ctx = canvas.getContext("2d");

  function resizeCanvasToCssSize() {
    // Wichtig: Canvas Pixelgröße an CSS-Größe anpassen (sonst blurry/offset)
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(rect.width));
    canvas.height = Math.max(1, Math.floor(rect.height));
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  let drawing = false;

  function getPos(e) {
    const r = canvas.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    return { x, y };
  }

  function drawDot(x, y) {
    // super simpel: Punkt zeichnen
    ctx.fillRect(x, y, 2, 2);
  }

  canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    const p = getPos(e);
    drawDot(p.x, p.y);
  });

  window.addEventListener("mouseup", () => {
    drawing = false;
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;
    const p = getPos(e);
    drawDot(p.x, p.y);
  });

  $("#btnClearCanvas").on("click", clearCanvas);

  // ---------- Startup ----------
  $(function () {
    showTab("tab-md");
    resizeCanvasToCssSize();
    renderMarkdown();
    renderMermaid();
  });

  window.addEventListener("resize", resizeCanvasToCssSize);
})();
