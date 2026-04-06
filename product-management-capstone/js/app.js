// define endpoint API
const API_URL = "https://69ca679fba5984c44bf31927.mockapi.io/api/v1/phone"

// liệt kê tất cả các thẻ trên html để tương tác
const el = {
    danhSachSP: document.getElementById("danhSachSP"),
    loading: document.getElementById("loading"),
    searchSP: document.getElementById("searchInput"),
    // popup chi tiết sản phẩm
    popup: document.getElementById("popupChiTiet"),
    btnClosePopup: document.getElementById("btnClose"),
    contentPopup: document.getElementById("popupContent"),
    overlay: document.getElementById("overlay"),

    // giỏ hàng
    popupGioHang: document.getElementById("popupGioHang"),
    overlayGioHang: document.getElementById("overlayGioHang"),

    // header
    btnGioHang: document.getElementById("btnGioHang"),

}

// define các biến: danh sách sản phẩm, giỏ hàng, tổng tiền
let danhSachSP = []
let gioHang = []

// define các hàm: call aPI, filter sản phẩm, thêm vào giỏ hàng,...


// hàm hiển thị danh sách sản phẩm
const renderDanhSachSP = (danhSach) => {
    // xóa nội dung cũ
    el.danhSachSP.innerHTML = ""

    // kiểm tra nếu danh sách rỗng thì hiển thị thông báo
    if (danhSach.length === 0) {
        el.danhSachSP.innerHTML = `
            <p> class="text-gray-500 text-center">Không tìm thấy sản phẩm nào</p>
        `
        return
    }
    // duyệt qua danh sách sản phẩm và tạo thẻ html để hiển thị
    // dùng map để duyệt qua mảng và trả về một mảng mới chứa các thẻ html
    // API: dữ liệu đơn thuần -> map -> list thẻ html -> join("") -> string html -> innerHTML
    const content = danhSach.map((phone) => {

        //         {
        //     "id": "1",
        //     "name": "iphoneX",
        //     "price": 1000,
        //     "screen": "screen 68",
        //     "backCamera": "2 camera 12 MP",
        //     "frontCamera": "7 MP",
        //     "img": "https://cdn.tgdd.vn/Products/Images/42/114115/iphone-x-64gb-hh-600x600.jpg",
        //     "desc": "Thiết kế mang tính đột phá",
        //     "type": "iphone"
        //   }
        return `
         <div class="bg-white rounded-lg shadow hover:shadow-lg p-5">
                    <img src=${phone.img} alt=${phone.name} class="w-full h-48 object-contain mb-3">
                    <h3>${phone.name}</h3>
                    <p>${phone.desc}</p>
                    <p>${phone.price} VND</p>
                    <span>${phone.type}</span>

                    <div class="flex gap-2 mt-auto">
                        <button
                            class="flex-1 bg-gray-200 px-3 py-2 rounded"
                            onclick="showChiTietSP(${phone.id})"
                        >Xem chi tiết</button>
                        <button class="flex-1 bg-blue-500 text-white px-3 py-2 rounded">Thêm vào giỏ</button>
                    </div>
                </div>    
        `
    })
    // gộp tất cả các thẻ html lại thành một chuỗi và hiển thị lên trang
    // join: dùng để gộp tất cả các phần tử trong mảng thành một chuỗi
    // VD: ["a", "b", "c"].join("-") -> "a-b-c"
    // VD: ["a", "b", "c"].join("") -> "abc"
    el.danhSachSP.innerHTML = content.join("")
}

// hàm hiển thị chi tiết sản phẩm
const showChiTietSP = (phoneId) => {
    // tìm sản phẩm trong danh sách sản phẩm dựa trên id
    const phone = danhSachSP.find((sp) => sp.id == phoneId)

    // nếu không tìm thấy sản phẩm thì hiển thị thông báo lỗi
    if (!phone) {
        alert("Không tìm thấy sản phẩm")
        return
    }

    // hiển thị popup chi tiết sản phẩm
    el.contentPopup.innerHTML = `
        <img
            src=${phone.img}
            alt=${phone.name}
            class="w-full h-64 object-contain mb-5"
        >
        <h2 class="text-2xl font-bold mb-2">${phone.name}</h2>
        <p class="text-blue-600 font-bold text-2xl mb-4">${phone.price.toLocaleString()} VND</p>
        <div class="bg-gray-50 rounded-xl p-4 mb-6">
            <table class="w-full text-sm">
                <tbody class="divide-y divide-gray-200">
                    <tr>
                        <td class="py-3 text-gray-500 font-medium w-1/3">Loại</td>
                        <td class="py-3 text-gray-800 font-semibold text-right">${phone.type}</td>
                    </tr>
                    <tr>
                        <td class="py-3 text-gray-500 font-medium">Màn hình</td>
                        <td class="py-3 text-gray-800 font-semibold text-right">${phone.screen}</td>
                    </tr>
                    <tr>
                        <td class="py-3 text-gray-500 font-medium">Camera trước</td>
                        <td class="py-3 text-gray-800 font-semibold text-right">${phone.frontCamera}</td>
                    </tr>
                    <tr>
                        <td class="py-3 text-gray-500 font-medium">Camera sau</td>
                        <td class="py-3 text-gray-800 font-semibold text-right">${phone.backCamera}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <p class="mb-4">${phone.desc}</p>
        <button class="bg-blue-500 text-white px-4 py-2 rounded">Thêm vào giỏ</button>
    `
    el.popup.classList.remove("hidden")
}

// ------------------------------------------------------------
// LOGIC CODE CLOSE POPUP CHI TIẾT SẢN PHẨM
// cách mới: define function closePopupChiTiet() được gọi ở html, khi click vào nút đóng popup
const closePopupChiTiet = () => {
    el.popup.classList.add("hidden")
}

// cách cũ: addEventListener cho nút đóng popup
// el.btnClosePopup.addEventListener("click", () => {
//     el.popup.classList.add("hidden")
// })

// close popup khi click ra ngoài nội dung popup - overlay
// khi thêm event click cho overlay -> nơi nào có id overlay sẽ có thể đóng popup khi click vào đó
el.overlay.addEventListener("click", closePopupChiTiet)


// LOGIC CODE POPUP GIỎ HÀNG

const closePopupGioHang = () => {
    el.popupGioHang.classList.add("hidden")
}

el.overlayGioHang.addEventListener("click", closePopupGioHang)

// --------------------------------------------------------------


// viết hàm hiển thị giỏ hàng sau khi click vào nút giỏ hàng ở header
el.btnGioHang.addEventListener("click", () => {
    el.popupGioHang.classList.remove("hidden")

    // kiểm tra nếu giỏ hàng rỗng thì hiển thị thông báo
    if(gioHang.length === 0) {
        el.popupGioHang.innerHTML = `
            <h2>Giỏ hàng</h2>
            <p class="text-gray-500 text-center">Giỏ hàng của bạn đang trống</p>
        `
        return
    }

    // continue: hiển thị danh sách sản phẩm trong giỏ hàng
})

// hàm lấy danh sách sản phẩm từ API
const layDanhSachSP = async () => {
    // hiển thị loading
    el.loading.classList.remove("hidden")

    // call API
    try {
        const response = await axios.get(API_URL)
        // lưu dữ liệu vào biến danhSachSP
        danhSachSP = response.data

        // ẩn loading
        el.loading.classList.add("hidden")

        // hiển thị danh sách sản phẩm -> viết hàm renderDanhSachSP
        renderDanhSachSP(danhSachSP)

    } catch (error) {
        // show error message
        el.danhSachSP.innerHTML = `
            <p class="text-red-500 text-center">Lỗi tải dữ liệu</p>
        `
        // ẩn loading
        el.loading.classList.add("hidden")

    }
}

// gọi hàm lấy danh sách sản phẩm khi trang web được tải
// DOMContentLoaded: sự kiện được kích hoạt khi toàn bộ nội dung của trang đã được tải xong,
// bao gồm cả hình ảnh, script, css,

// window: object toàn cục của javascript, đại diện cho cửa sổ trình duyệt
// khi mở trang web trên trình duyệt -> auto tạo object window
// -> có thể truy cập các thuộc tính và phương thức của window mà không cần khai báo
// c1: gọi hàm trực tiếp
layDanhSachSP()

// c2: gọi hàm khi sự kiện DOMContentLoaded được kích hoạt
// window.addEventListener("DOMContentLoaded", layDanhSachSP)