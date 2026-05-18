const input = document.querySelector("#baseUrl");
const cards = document.querySelectorAll(".qr-card");

function normalizeBaseUrl(value) {
  return value.endsWith("/") ? value : `${value}/`;
}

function updateQrCodes() {
  const baseUrl = normalizeBaseUrl(input.value.trim());

  cards.forEach((card) => {
    const path = card.dataset.path;
    const target = new URL(path, baseUrl).toString();
    const image = card.querySelector("img");
    const label = card.querySelector("p");

    image.src = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&data=${encodeURIComponent(target)}`;
    label.textContent = target;
  });
}

if (input && cards.length) {
  input.addEventListener("input", updateQrCodes);
  updateQrCodes();
}

const overviewPage = document.querySelector(".overview-page");

function updateOverviewBackground() {
  if (!overviewPage) {
    return;
  }

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  overviewPage.style.setProperty("--overview-bg-y", `${Math.min(Math.max(progress, 0), 1) * 100}%`);
}

if (overviewPage) {
  window.addEventListener("scroll", updateOverviewBackground, { passive: true });
  window.addEventListener("resize", updateOverviewBackground);
  updateOverviewBackground();
}
