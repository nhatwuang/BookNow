/* ============================================================
📌 CHỨC NĂNG XỬ LÝ ĐĂNG KÝ - ĐĂNG NHẬP - CHUYỂN TAB - THÔNG BÁO
File này chịu trách nhiệm:
1️⃣ Xử lý đăng ký người dùng mới và lưu vào localStorage
2️⃣ Xử lý đăng nhập người dùng và chuyển trang theo vai trò
3️⃣ Hiển thị thông báo (toast)
4️⃣ Chuyển qua lại giữa tab “Đăng nhập” và “Đăng ký”
============================================================ */

// ===============================
// 📌 XỬ LÝ ĐĂNG KÝ NGƯỜI DÙNG
// ===============================
document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Ngăn reload khi submit form

    // Lấy thông tin từ form đăng ký
    let name = document.getElementById("regName").value;
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;
    let rePassword = document.getElementById("regRePassword").value;
    let role = document.getElementById("regRole").value; // Vai trò: customer, business, admin

    // Kiểm tra xác nhận mật khẩu
    if (password !== rePassword) {
      showToast("Mật khẩu nhập lại không khớp!", "error");
      return;
    }

    // Tạo đối tượng user mới
    let user = { name, email, password, role };

    // Lấy danh sách user hiện có trong localStorage (nếu chưa có thì mảng rỗng)
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Kiểm tra email trùng
    if (users.some((u) => u.email === email)) {
      showToast("Email đã tồn tại!", "error");
      return;
    }

    // Thêm user mới vào danh sách và lưu lại
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    // Thông báo đăng ký thành công
    showToast("Đăng ký thành công!", "success");

    // Reset form và chuyển về tab "Đăng nhập"
    document.getElementById("registerForm").reset();
    document.getElementById("register-tab").classList.remove("active");
    document.getElementById("login-tab").classList.add("active");
    document.getElementById("register-content").classList.remove("active");
    document.getElementById("login-content").classList.add("active");
  });

// ===============================
// 📌 XỬ LÝ ĐĂNG NHẬP NGƯỜI DÙNG
// ===============================
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Ngăn reload trang

  // Lấy dữ liệu đăng nhập
  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;

  // Lấy danh sách user từ localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Kiểm tra thông tin đăng nhập
  let user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    showToast("Sai email hoặc mật khẩu!", "error");
    return;
  }

  // Lưu thông tin user hiện tại
  localStorage.setItem("currentUser", JSON.stringify(user));

  // Thông báo và điều hướng theo vai trò
  showToast("Đăng nhập thành công!", "success");
  setTimeout(() => {
    if (user.role === "customer") {
      window.location.href = "trangchu.html";
    } else if (user.role === "business") {
      window.location.href = "trangchu-doanhnghiep.html";
    } else if (user.role === "admin") {
      window.location.href = "admin.html";
    }
  }, 1000);
});

// ===============================
// 📌 HÀM HIỂN THỊ THÔNG BÁO (TOAST)
// ===============================
function showToast(message, type) {
  let notification = document.getElementById("notification");
  let toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerText = message;
  notification.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ===============================
// 📌 CHUYỂN GIỮA TAB ĐĂNG NHẬP / ĐĂNG KÝ
// ===============================
document.getElementById("login-tab").addEventListener("click", function () {
  document.getElementById("login-tab").classList.add("active");
  document.getElementById("register-tab").classList.remove("active");
  document.getElementById("login-content").classList.add("active");
  document.getElementById("register-content").classList.remove("active");
});

document.getElementById("register-tab").addEventListener("click", function () {
  document.getElementById("register-tab").classList.add("active");
  document.getElementById("login-tab").classList.remove("active");
  document.getElementById("register-content").classList.add("active");
  document.getElementById("login-content").classList.remove("active");
});
