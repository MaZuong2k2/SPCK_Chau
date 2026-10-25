
const currentUser = localStorage.getItem("currentUser");
if (!currentUser) {
  alert("Vui lòng đăng nhập để xem thông tin cây.");
  window.location.href = "./login.html";
}

const trees = [
  {id:"trầu bà", name:"Trầu bà", scientific:"Epipremnum aureum", care:"Ánh sáng gián tiếp, đất thoát nước tốt; tưới khi mặt đất se khô.", issues:"Vàng lá thường do tưới quá nhiều hoặc thoát nước kém.", image:"./image/cay-trau-ba.jpg"},
  {id:"mai chỉ thiên", name:"Mai chỉ thiên", scientific:"Wrightia antidysenterica", care:"Ưa sáng, có thể nhận nắng nhẹ; tưới khi đất bắt đầu khô và cắt tỉa định kỳ.", issues:"Lá xoăn hoặc có đốm cần kiểm tra sâu chích hút và độ thông thoáng.", image:"./image/mai-chi-thien-4.png"},
  {id:"nguyệt quế", name:"Nguyệt quế", scientific:"Murraya paniculata", care:"Ưa sáng, đất thoát nước; tưới đều nhưng tránh để rễ ngâm nước.", issues:"Lá vàng có thể liên quan đến úng nước, thiếu sáng hoặc thiếu dinh dưỡng.", image:"./image/nguyet-que-1-1.png"},
  {id:"lưỡi hổ", name:"Lưỡi hổ", scientific:"Dracaena trifasciata", care:"Chịu được ánh sáng vừa; để đất khô gần hết giữa các lần tưới.", issues:"Lá mềm hoặc gốc nhũn thường là dấu hiệu tưới quá nhiều.", image:"./image/cay-luoi-ho.jpg"},
  {id:"sen đá", name:"Sen đá", scientific:"Echeveria", care:"Cần nhiều ánh sáng và giá thể thoát nước nhanh; tưới đẫm rồi để khô.", issues:"Thân vươn dài thường do thiếu sáng; lá nhũn có thể do dư nước.", image:"./image/sen-da.jpg"},
  {id:"kim tiền", name:"Kim tiền", scientific:"Zamioculcas zamiifolia", care:"Ánh sáng gián tiếp, chịu hạn; chỉ tưới khi đất khô đáng kể.", issues:"Lá vàng hoặc thân mềm thường cần kiểm tra lịch tưới và thoát nước.", image:"./image/4-cay-kim-tien.jpg"},
  {id:"cọ nhật", name:"Cọ nhật", scientific:"Licuala grandis", care:"Ánh sáng gián tiếp từ vừa đến mạnh; tưới khi lớp đất mặt khô khoảng 2-3 cm; duy trì độ ẩm không khí tốt.", issues:"Đầu lá bị khô nâu do thiếu độ ẩm hoặc nguồn nước chứa nhiều clo; vàng lá do thiếu sáng.", image:"./image/cay-co-nhat.jpg"},
  {id:"tùng bồng lai", name:"Tùng bồng lai", scientific:"Podocarpus macrophyllus", care:"Ưa ánh sáng bán râm hoặc nắng nhẹ; tưới nước vừa phải, tránh ngập úng; cần đất tơi xốp và thông thoáng.", issues:"Lá bị khô héo, rụng lá thường do úng nước gây thối rễ hoặc đặt ở nơi quá tối, bí khí.", image:"./image/tung-bong-lai.jpg"},
  {id:"bàng singapore", name:"Bàng singapore", scientific:"Ficus lyrata", care:"Ánh sáng gián tiếp tỏa sáng, tránh nắng gắt trực tiếp; tưới khi đất khô khoảng 1/3 chậu; lau lá thường xuyên.", issues:"Rụng lá hoặc xuất hiện đốm nâu lớn trên lá do tưới quá nhiều gây úng rễ hoặc thay đổi môi trường đột ngột.", image:"./image/cay-bang-singapore.jpg"},
  {id:"phát tài", name:"Phát tài", scientific:"Dracaena fragrans", care:"Chịu bóng bán phần, rất thích hợp trong nhà; tưới lượng nước vừa phải, chỉ tưới khi đất mặt đã khô hẳn.", issues:"Lá bị cháy mép hoặc vàng lá do thừa ánh sáng mặt trời trực tiếp hoặc do tưới nước quá thường xuyên.", image:"./image/cay-phat-tai.jpg"}
];

function loadTrees() {
  const listDiv = document.getElementById("product-list");
  if (!listDiv) return;
  const keyword = (localStorage.getItem("searchKeyword") || "").trim().toLocaleLowerCase("vi");
  localStorage.removeItem("searchKeyword");
  const filtered = trees.filter(t => !keyword || `${t.name} ${t.scientific} ${t.care} ${t.issues}`.toLocaleLowerCase("vi").includes(keyword));
  renderTreeList(filtered);
}
function renderTreeList(items) {
  const listDiv = document.getElementById("product-list");
  listDiv.innerHTML = "";
  if (!items.length) {
    listDiv.innerHTML = "<p style='text-align:center'>Chưa có cây mẫu khớp từ khóa. Thử tìm tên cây hoặc triệu chứng khác nhé.</p>";
    return;
  }
  items.forEach(tree => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `<img src="${tree.image}" alt="${tree.name}"><div class="tree-info"><h3>${tree.name}</h3><p><strong>Tên khoa học:</strong> ${tree.scientific}</p><button type="button">Xem cách chăm sóc</button></div>`;
    card.querySelector("button").addEventListener("click", () => showTreeDetail(tree.id));
    listDiv.appendChild(card);
  });
  if (!document.getElementById("product-detail").dataset.selected) showTreeDetail(items[0].id);
}
function showTreeDetail(id) {
  const tree = trees.find(t => t.id === id);
  const detail = document.getElementById("product-detail");
  if (!tree || !detail) return;
  detail.dataset.selected = id;
  detail.innerHTML = `<div class="tree-detail"><img src="${tree.image}" alt="${tree.name}"><div><h3>${tree.name}</h3><p><strong>Tên khoa học:</strong> ${tree.scientific}</p><p><strong>Cách chăm sóc:</strong> ${tree.care}</p><p><strong>Vấn đề thường gặp:</strong> ${tree.issues}</p><p><em>Lưu ý: đây là gợi ý tham khảo; hãy kiểm tra điều kiện thực tế của cây trước khi xử lý bệnh.</em></p></div></div>`;
}
document.addEventListener("DOMContentLoaded", loadTrees);
