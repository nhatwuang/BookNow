// ===============================
// 📌 XỬ LÝ ĐĂNG KÝ NGƯỜI DÙNG
// ===============================
document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // ❌ Ngăn trang web load lại khi bấm nút "Đăng ký"

    // 🔹 Lấy dữ liệu từ các ô nhập
    let name = document.getElementById("regName").value;
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;
    let rePassword = document.getElementById("regRePassword").value;
    let role = document.getElementById("regRole").value; // Vai trò: customer, business, admin

    // 🔹 Kiểm tra xác nhận mật khẩu
    if (password !== rePassword) {
      showToast("Mật khẩu nhập lại không khớp!", "error");
      return; // Dừng lại, không lưu dữ liệu
    }

    // 🔹 Tạo đối tượng user mới
    let user = { name, email, password, role };

    // 🔹 Lấy danh sách user cũ trong localStorage (nếu chưa có thì tạo mảng rỗng)
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // 🔹 Kiểm tra xem email đã tồn tại chưa
    if (users.some((u) => u.email === email)) {
      showToast("Email đã tồn tại!", "error");
      return;
    }

    // 🔹 Thêm user mới vào danh sách
    users.push(user);

    // 🔹 Lưu danh sách user mới vào localStorage (dạng JSON)
    localStorage.setItem("users", JSON.stringify(users));

    // ✅ Thông báo thành công
    showToast("Đăng ký thành công!", "success");

    // 🔹 Xóa nội dung form sau khi đăng ký
    document.getElementById("registerForm").reset();

    // 🔹 Tự động chuyển sang tab "Đăng nhập"
    document.getElementById("register-tab").classList.remove("active");
    document.getElementById("login-tab").classList.add("active");

    document.getElementById("register-content").classList.remove("active");
    document.getElementById("login-content").classList.add("active");
  });

// ===============================
// 📌 XỬ LÝ ĐĂNG NHẬP NGƯỜI DÙNG
// ===============================
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); // ❌ Ngăn reload trang khi bấm nút "Đăng nhập"

  // 🔹 Lấy dữ liệu từ form đăng nhập
  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;

  // 🔹 Lấy danh sách user từ localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // 🔹 Tìm người dùng có email & password trùng khớp
  let user = users.find((u) => u.email === email && u.password === password);

  // 🔹 Nếu không tìm thấy user hợp lệ
  if (!user) {
    showToast("Sai email hoặc mật khẩu!", "error");
    return;
  }

  // ✅ Nếu đúng → lưu thông tin người dùng hiện tại vào localStorage
  localStorage.setItem("currentUser", JSON.stringify(user));

  // ✅ Hiển thị thông báo đăng nhập thành công
  showToast("Đăng nhập thành công!", "success");

  // 🔹 Chuyển hướng sang trang phù hợp với vai trò
  setTimeout(() => {
    if (user.role === "customer") {
      window.location.href = "trangchu-khachhang.html"; // Khách hàng → Trang chủ
    } else if (user.role === "business") {
      window.location.href = "trangchu-doanhnghiep.html"; // Doanh nghiệp
    } else if (user.role === "admin") {
      window.location.href = "admin.html"; // Quản trị viên
    }
  }, 1000); // ⏱ Đợi 1 giây rồi chuyển trang
});

// ===============================
// 📌 HÀM HIỂN THỊ THÔNG BÁO (TOAST)
// ===============================
function showToast(message, type) {
  // 🔹 Lấy phần tử cha chứa thông báo
  let notification = document.getElementById("notification");

  // 🔹 Tạo thẻ div mới để hiển thị thông báo
  let toast = document.createElement("div");

  // 🔹 Gán class theo loại (success hoặc error)
  toast.className = `toast ${type}`;

  // 🔹 Ghi nội dung thông báo
  toast.innerText = message;

  // 🔹 Thêm thông báo vào trang
  notification.appendChild(toast);

  // 🔹 Sau 3 giây thì xóa thông báo
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ===============================
// 📌 CHUYỂN GIỮA TAB ĐĂNG NHẬP / ĐĂNG KÝ
// ===============================
document.getElementById("login-tab").addEventListener("click", function () {
  // Khi bấm "Đăng nhập" → bật tab đăng nhập, tắt tab đăng ký
  document.getElementById("login-tab").classList.add("active");
  document.getElementById("register-tab").classList.remove("active");

  document.getElementById("login-content").classList.add("active");
  document.getElementById("register-content").classList.remove("active");
});

document.getElementById("register-tab").addEventListener("click", function () {
  // Khi bấm "Đăng ký" → bật tab đăng ký, tắt tab đăng nhập
  document.getElementById("register-tab").classList.add("active");
  document.getElementById("login-tab").classList.remove("active");

  document.getElementById("register-content").classList.add("active");
  document.getElementById("login-content").classList.remove("active");
});
