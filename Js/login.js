// 1. Khai báo dữ liệu JSON cứng bạn cung cấp (Đóng vai trò là Database gốc)
const defaultUsers = [
  {
    name: "admin",
    email: "admin@gmail.com",
    phone: "0123456789",
    city: "Hồ Chí Minh",
    message: "Tài khoản quản trị viên hệ thống.",
  },
  {
    name: "Admin Sunny",
    email: "admin@sunny.com",
    phone: "0987654321",
    city: "Hồ Chí Minh",
    message: "Tài khoản quản trị viên hệ thống.",
  },
  {
    name: "Nguyễn Văn Cafe",
    email: "vancafe@gmail.com",
    phone: "0901234567",
    city: "Hà Nội",
    message: "Tôi muốn đặt bàn gần cửa sổ!",
  },
];

// const defaultUsers = require("./db/user.js");
// import { defaultUsers } from "../db/users.json";

// 2. Tự động nạp dữ liệu mặc định này vào localStorage khi trang web được tải lần đầu tiên
if (!localStorage.getItem("sunny_coffee_users")) {
  localStorage.setItem("sunny_coffee_users", JSON.stringify(defaultUsers));
}

// 3. Xử lý sự kiện khi người dùng nhấn nút "Đăng Nhập"
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Ngăn trang web tải lại

  // Lấy dữ liệu người dùng vừa gõ vào Form
  //   const inputName = document.getElementById("name").value.trim();
  const inputEmail = document.getElementById("email").value.trim();
  const inputPhone = document.getElementById("phone").value.trim();
  const inputAdd = document.getElementById("city").value.trim();
  const alertBox = document.getElementById("alertMessage");

  // Lấy Database từ localStorage ra để kiểm tra (dạng mảng Object)
  const database = JSON.parse(localStorage.getItem("sunny_coffee_users"));

  /* 4. KIỂM TRA ĐĂNG NHẬP:
       Tìm trong Database xem có tài khoản nào trùng khớp cả EMAIL và SỐ ĐIỆN THOẠI không.
    */
  const matchedUser = database.find(
    (user) =>
      user.email.toLowerCase() === inputEmail.toLowerCase() &&
      user.phone === inputPhone &&
      user.city === inputAdd,
  );

  if (matchedUser) {
    // TRƯỜNG HỢP 1: Đăng nhập đúng thông tin tài khoản có trong JSON
    alertBox.textContent = `Chào mừng ${matchedUser.name} trở lại với Sunny Coffee!`;
    alertBox.className = "alert-message alert-success";
    alertBox.style.display = "block";

    // Lưu trạng thái đã đăng nhập vào Session
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("sessionUser", JSON.stringify(matchedUser));

    // Chuyển hướng sang trang index.html sau 1.5 giây
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  } else {
    // TRƯỜNG HỢP 2: Nhập sai thông tin hoặc tài khoản không tồn tại trong JSON
    alertBox.textContent =
      "Đăng nhập thất bại! Email hoặc Số điện thoại không chính xác.";
    alertBox.className = "alert-message alert-error";
    alertBox.style.display = "block";
  }
});

// Xóa thông báo lỗi/thành công cũ khi bấm nút Nhập Lại (Reset)
document.getElementById("loginForm").addEventListener("reset", function () {
  const alertBox = document.getElementById("alertMessage");
  alertBox.style.display = "none";
  alertBox.className = "alert-message";
});
