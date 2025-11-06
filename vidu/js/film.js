// ==============================================
// 🔹 Hiệu ứng khi cuộn xuống phần "Dịch vụ"
// ==============================================

window.addEventListener("scroll", () => {
  const services = document.querySelector(".services");
  const position = services.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  if (position < screenHeight - 100) {
    services.classList.add("visible");
  }
});

// ==============================================
// 🔹 Xử lý đăng nhập / đăng ký / đăng xuất ở header
// ==============================================

document.addEventListener("DOMContentLoaded", () => {
  const authBtns = document.querySelector(".auth-btns");
  const username = localStorage.getItem("username");

  // Nếu ĐÃ đăng nhập
  if (username) {
    authBtns.innerHTML = `
      <span class="welcome">Xin chào, <b>${username}</b></span>
      <button class="logout-btn">Đăng xuất</button>
    `;

    // Sự kiện Đăng xuất
    document.querySelector(".logout-btn").addEventListener("click", () => {
      localStorage.removeItem("username");
      window.location.href = "dangnhap.html";
    });
  }
  // Nếu CHƯA đăng nhập
  else {
    authBtns.innerHTML = `
      <button class="login-btn">Đăng nhập</button>
      <button class="signup-btn">Đăng ký</button>
    `;

    document.querySelector(".login-btn").addEventListener("click", () => {
      window.location.href = "dangnhap.html";
    });

    document.querySelector(".signup-btn").addEventListener("click", () => {
      window.location.href = "dangnhap.html";
    });
  }
});

// ==============================================
// 🔹 Gắn sự kiện cho các nút trong phần dịch vụ
// ==============================================

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".service-item a");

  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const service = btn.parentElement.querySelector("h3").textContent;

      if (service.includes("phim")) window.location.href = "film.html";
      else if (service.includes("phương tiện"))
        window.location.href = "vehicle.html";
      else if (service.includes("khách sạn"))
        window.location.href = "hotel.html";
    });
  });
});

// Hàm trộn mảng (Fisher–Yates shuffle)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
// ==============================================
// ==============================================
// 🔹 Hiển thị dữ liệu dịch vụ từ Doanh nghiệp
// ==============================================
document.addEventListener("DOMContentLoaded", () => {
  const danhSachPhim = JSON.parse(localStorage.getItem("danhSachPhim")) || [];
  const danhSachPhuongTien =
    JSON.parse(localStorage.getItem("danhSachPhuongTien")) || [];
  const danhSachKhachSan =
    JSON.parse(localStorage.getItem("danhSachKhachSan")) || [];

  const filmList = document.querySelector(".film-list");
  const vehicleList = document.querySelector(".vehicle-list");
  const hotelList = document.querySelector(".hotel-list");

  if (filmList && danhSachPhim.length > 0) {
    // Trộn mảng phim và lấy 4 phần tử đầu tiên
    const phimRandom = shuffleArray([...danhSachPhim]).slice(0, 4);

    filmList.innerHTML = phimRandom
      .map(
        (p, i) => `
        <div class="film-card" data-type="phim" data-index="${i}">
          <img src="${p.anh}" alt="${p.ten}" />
          <h3>${p.ten}</h3>
          <p><b>Thể loại:</b> ${p.moTa}</p>
          <p><b>Giá:</b> ${p.gia} VNĐ</p>
          <button class="buy-btn">🎟️ Đặt vé</button>
        </div>`
      )
      .join("");
  }
});
