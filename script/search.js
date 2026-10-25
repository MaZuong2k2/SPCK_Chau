
function search() {
  const input = document.getElementById("searchInput");
  const keyword = input ? input.value.trim() : "";
  if (!keyword) {
    alert("Vui lòng nhập tên cây hoặc vấn đề cần tìm!");
    return;
  }
  localStorage.setItem("searchKeyword", keyword);
  window.location.href = "./products.html";
}
const searchInput = document.getElementById("searchInput");
if (searchInput) searchInput.addEventListener("keydown", e => { if (e.key === "Enter") search(); });
