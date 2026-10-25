// Thư viện cây lấy từ PlantSolve (API online).
// Tài liệu API: https://www.plantsolve.com/developers/

const API_URL = "https://www.plantsolve.com/api/v1/plants/";
let apiPlants = [];
let visibleCount = 18;

// Đổi slug thành tên dễ đọc, ví dụ "snake-plant" => "Snake Plant".
function getPlantName(slug) {
  return slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

function getDifficulty(level) {
  const text = (level || "").toLowerCase();
  if (text === "easy" || text === "beginner") return "Dễ chăm sóc";
  if (text === "moderate" || text === "medium" || text === "intermediate") return "Trung bình";
  if (text.includes("advanced") || text === "hard") return "Khó chăm sóc";
  return level || "Chưa cập nhật";
}

// Lấy danh sách từ API online.
async function loadApiPlants() {
  const status = document.getElementById("api-status");
  status.textContent = "Đang lấy dữ liệu cây từ PlantSolve...";

  try {
    const response = await fetch(API_URL + "index.json");
    if (!response.ok) throw new Error("Không tải được danh sách cây.");

    const data = await response.json();
    // API thực tế trả về một mảng; dòng này cũng hỗ trợ dạng { plants: [...] }.
    apiPlants = Array.isArray(data) ? data : data.plants;
    if (!Array.isArray(apiPlants)) throw new Error("Dữ liệu không đúng định dạng.");

    showApiPlants();
  } catch (error) {
    console.error("Lỗi PlantSolve API:", error);
    status.textContent = "Không thể tải PlantSolve API. Kiểm tra Internet và thử tải lại trang.";
  }
}

// Hiển thị danh sách và tìm kiếm cây trong dữ liệu API.
function showApiPlants() {
  const list = document.getElementById("api-plant-list");
  const status = document.getElementById("api-status");
  const keyword = document.getElementById("api-search").value.trim().toLowerCase();
  list.innerHTML = "";

  const matches = apiPlants.filter(plant => {
    const name = getPlantName(plant.slug).toLowerCase();
    const scientific = (plant.scientificName || "").toLowerCase();
    return name.includes(keyword) || scientific.includes(keyword);
  });

  const shown = matches.slice(0, visibleCount);
  shown.forEach(plant => {
    const card = document.createElement("div");
    card.className = "api-card";
    card.innerHTML = `
      <span class="api-leaf" aria-hidden="true">🌿</span>
      <h3></h3>
      <p class="api-scientific"></p>
      <p class="api-difficulty"></p>
      <button type="button">Xem thông tin chăm sóc</button>
    `;
    card.querySelector("h3").textContent = getPlantName(plant.slug);
    card.querySelector(".api-scientific").textContent = plant.scientificName || "Chưa có tên khoa học";
    card.querySelector(".api-difficulty").textContent = "Mức độ: " + getDifficulty(plant.difficulty);
    card.querySelector("button").addEventListener("click", () => showApiDetail(plant));
    list.appendChild(card);
  });

  status.textContent = matches.length
    ? `Đang hiển thị ${shown.length}/${matches.length} loại cây từ PlantSolve.`
    : "Không tìm thấy cây phù hợp. Hãy thử tên tiếng Anh hoặc tên khoa học.";

  document.getElementById("api-more").hidden = shown.length >= matches.length;
}

// Lấy thông tin chi tiết theo slug khi nhấn nút.
async function showApiDetail(plantInfo) {
  const detail = document.getElementById("api-plant-detail");
  const name = getPlantName(plantInfo.slug);
  const pageUrl = "https://www.plantsolve.com/plants/" + encodeURIComponent(plantInfo.slug) + "/";

  detail.innerHTML = "<p>Đang tải thông tin chăm sóc...</p>";
  detail.scrollIntoView({ behavior: "smooth", block: "nearest" });

  // Hàm nhỏ giúp tạo một dòng thông tin bằng DOM (không chèn HTML từ API).
  function addInfo(label, value) {
    if (typeof value !== "string" && typeof value !== "number") return;
    if (!String(value).trim()) return;
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = label + ": ";
    p.appendChild(strong);
    p.appendChild(document.createTextNode(String(value)));
    detail.appendChild(p);
  }

  try {
    const response = await fetch(API_URL + encodeURIComponent(plantInfo.slug) + ".json");
    if (!response.ok) throw new Error("Không tải được chi tiết cây.");

    const data = await response.json();
    const plant = data.plant || data;
    const care = plant.care || {};
    detail.innerHTML = "";

    const title = document.createElement("h3");
    title.textContent = plant.name || plant.commonName || name;
    detail.appendChild(title);

    addInfo("Tên khoa học", plant.scientificName || plantInfo.scientificName);
    addInfo("Mức độ", getDifficulty(care.difficulty || plant.difficulty || plantInfo.difficulty));
    addInfo("Tưới nước", care.water || care.watering || plant.water || plant.watering);
    addInfo("Ánh sáng", care.light || care.sunlight || plant.light || plant.sunlight);
    addInfo("Đất trồng", care.soil || plant.soil);
  } catch (error) {
    console.error("Lỗi chi tiết PlantSolve:", error);
    detail.innerHTML = "<p>Chưa thể tải chi tiết từ API. Bạn vẫn có thể đọc hướng dẫn tại PlantSolve.</p>";
    addInfo("Tên cây", name);
    addInfo("Tên khoa học", plantInfo.scientificName);
    addInfo("Mức độ", getDifficulty(plantInfo.difficulty));
  }

  const source = document.createElement("p");
  const link = document.createElement("a");
  link.href = pageUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Đọc hướng dẫn đầy đủ trên PlantSolve ↗";
  source.appendChild(link);
  detail.appendChild(source);

  const credit = document.createElement("small");
  credit.textContent = "Nguồn: PlantSolve · CC BY 4.0";
  detail.appendChild(credit);
}

// Sự kiện tìm kiếm và nút hiện thêm.
document.getElementById("api-search").addEventListener("input", function () {
  visibleCount = 18;
  showApiPlants();
});

document.getElementById("api-more").addEventListener("click", function () {
  visibleCount += 18;
  showApiPlants();
});

loadApiPlants();
