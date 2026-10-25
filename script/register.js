const form = document.getElementById("signupForm");

// Regex email + đuôi cho phép
const emailRegex =
/^[a-zA-Z0-9._%+-]+@(gmail\.com|email\.com|yahoo\.com|outlook\.com|icloud\.com|zoho\.com|edu|edu\.vn|student\.edu|hust\.edu\.vn|vnu\.edu\.vn|fpt\.edu\.vn|proton\.me|protonmail\.com|gov\.vn)$/;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const birthday = document.getElementById("birthday").value;

  if (!email || !password || !confirmPassword || !birthday) {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }

  if (!emailRegex.test(email)) {
    alert("Email không hợp lệ hoặc không được hỗ trợ!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Mật khẩu không khớp");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const isExist = users.some(user => user.email === email);

  if (isExist) {
    alert("Email đã được đăng ký");
    return;
  }

  users.push({
    email,
    password,
    birthday
  });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Đăng ký thành công! Vui lòng đăng nhập");
  location.href = "./login.html";
});
