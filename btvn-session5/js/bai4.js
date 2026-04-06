const elementBai4 = {
    form: document.getElementById("formHoaDon"),
    maKH: document.getElementById("maKH"),
    loaiKH: document.getElementById("loaiKH"),
    wrapKetNoi: document.getElementById("wrapKetNoi"),
    soKetNoi: document.getElementById("soKetNoi"),
    soKenh: document.getElementById("soKenhCaoCap"),
    ketQua: document.getElementById("resultHoaDon"),

    // error element
    errorMaKH: document.getElementById("errorMaKH"),
    errorLoaiKH: document.getElementById("errorLoaiKH"),
    errorSoketNoi: document.getElementById("errorSoKetNoi"),
    errorSoKenh: document.getElementById("errorSoKenh")
}

// OBJECT LƯU GIÁ TRỊ
const BANG_GIA = {
    nhaDan: {
        phiXuLy: 4.5,
        phiDichVu: 20.5,
        phiKenhCaoCap: 7.5
    },
    doanhNghiep: {
        phiXuLy: 15,
        phiDichVu10Dau: 75, // 10 kết nối đầu tiên
        phiKetNoiThem: 5, // 5$/ kết nối thêm
        phiKenhCaoCap: 50
    }
}

// handle hidden/show input soKetNoi
elementBai4.loaiKH.addEventListener("change", () => {
    const loai = elementBai4.loaiKH.value
    console.log("loai", loai)

    if(loai === "nhaDan") {
        elementBai4.wrapKetNoi.classList.add("hidden")
    } else {
        elementBai4.wrapKetNoi.classList.remove("hidden")
    }
})

// tạo hàm ẩn lỗi
const hideErrorBai4 = (errElement) => {
    errElement.innerText = ""
    errElement.classList.add("hidden")
}

// tạo hàm show lỗi
const showErrorBai4 = (errElement, message) => {
    errElement.innerText = message
    errElement.classList.remove("hidden")
}

const validationInputBai4 = (maKH, loaiKH, soKetNoi, soKenh) => {
    let isValid = true

    // reset lỗi
    // hideErrorBai4(elementBai4.errorMaKH)
    // hideErrorBai4(elementBai4.errorLoaiKH)
    // hideErrorBai4(elementBai4.errorSoketNoi)
    // hideErrorBai4(elementBai4.errorSoKenh)

    // BTVN
}

const tinhHoaDonNhaDan = (soKenh) => {
    const gia = BANG_GIA.nhaDan

    const tongTien = gia.phiXuLy + gia.phiDichVu + (soKenh * gia.phiKenhCaoCap)
    return tongTien
}

const tinhHoaDonDoanhNghiep = (soKetNoi, soKenh) => {
    const gia = BANG_GIA.doanhNghiep

    let phiDichVu = gia.phiDichVu10Dau // default = 75$ (cho 10 kết nối đầu)
    // 1-10 kết nối đầu -> 75$
    // soKetNoi = 15
    if (soKetNoi > 10) {
        const soKetNoiThem = soKetNoi - 10
        phiDichVu = gia.phiDichVu10Dau + (soKetNoiThem * gia.phiKetNoiThem)
        // phiDichVu = 75 + (5 * 5) = 100
    }

    const tongTien = gia.phiXuLy + phiDichVu + (soKenh * gia.phiKenhCaoCap)
    return tongTien
}

elementBai4.form.addEventListener("submit", (event) => {
    event.preventDefault()

    console.log("submit form")

    const maKH = elementBai4.maKH.value
    const loaiKH = elementBai4.loaiKH.value
    const soKetNoi = Number(elementBai4.soKetNoi.value)
    const soKenh = Number(elementBai4.soKenh.value)

    // const isValid = validationInputBai4(maKH, loaiKH, soKetNoi, soKenh)
    // if (!isValid) {
    //     return
    // }

    // tính hóa đơn - hiển thị kết quả -> BTVN
    let tongTien = 0
    if (loaiKH === "nhaDan") {
        tongTien = tinhHoaDonNhaDan(soKenh)
    } else {
        tongTien = tinhHoaDonDoanhNghiep(soKetNoi, soKenh)
    }

    console.log("tongTien", tongTien)
    elementBai4.ketQua.innerText = `Mã khách hàng: ${maKH} - Tổng tiền: $${tongTien}`
})
