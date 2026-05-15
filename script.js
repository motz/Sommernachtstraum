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
