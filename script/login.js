const form = document.getElementById("loginForm");

const emailRegex =
/^[a-zA-Z0-9._%+-]+@(gmail\.com|email\.com|yahoo\.com|outlook\.com|icloud\.com|zoho\.com|edu|edu\.vn|student\.edu|hust\.edu\.vn|vnu\.edu\.vn|fpt\.edu\.vn|proton\.me|protonmail\.com|gov\.vn)$/;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }

  if (!emailRegex.test(email)) {
    alert("Email không hợp lệ hoặc không được hỗ trợ!");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const foundUser = users.find(
    user => user.email === email && user.password === password
  );

  if (foundUser) {
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    alert("Đăng nhập thành công!");
    location.href = "./index.html";
  } else {
    alert("Sai email hoặc mật khẩu");
  }
});
