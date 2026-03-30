// B1: DOM tới các thẻ trên HTML: input, button
// dùng object document để hạn chế tạo nhiều biến, đẹp code

const element = {
    form: document.getElementById('formXetTuyen'),
    inputDiemChuan: document.getElementById('diemChuan'),
    inputDiem1: document.getElementById("diemMon1"),
    inputDiem2: document.getElementById("diemMon2"),
    inputDiem3: document.getElementById("diemMon3"),
    khuVuc: document.getElementById("khuVuc"),
    doiTuong: document.getElementById("doiTuong"),
    btnTinhDiem: document.getElementById("btnTinhDiem"),
    errorDiem1: document.getElementById("errorDiemMon1"),
    errorDiem2: document.getElementById("errorDiemMon2"),
    errorDiem3: document.getElementById("errorDiemMon3"),
    errorDiemChuan: document.getElementById("errorDiemChuan")
}

// tạo object để lưu điểm ưu tiên khu vực và đối tượng
const DIEM_UU_TIEN_KHU_VUC = {
    A: 2.5,
    B: 1,
    C: 0.5
}
 
const DIEM_UU_TIEN_DOI_TUONG = {
    1: 2.5,
    2: 1.5,
    3: 1
}

// tạo hàm ẩn lỗi
const hideError = (errElement) => {
    errElement.innerText = ""
    errElement.classList.add("hidden")
}

// tạo hàm show lỗi
const showError = (errElement, message) => {
    errElement.innerText = message
    errElement.classList.remove("hidden")
}

// tách hàm validation ra một hàm riêng để code sạch hơn
const validationInput = (diemChuan, diem1, diem2, diem3) => {
    // B1: tạo biến isValid để kiểm tra. Default là true
    let isValid = true

    // B2: xóa tất cả các lỗi cũ nếu có
    hideError(element.errorDiemChuan)
    hideError(element.errorDiem1)
    hideError(element.errorDiem2)
    hideError(element.errorDiem3)

    // if(isNaN(diemChuan) || isNaN(diem1) || isNaN(diem2) || isNaN(diem3)) {
    //     alert("Vui lòng nhập số vào tất cả các trường điểm")
    //     return
    // }
    // range điểm chuẩn và điểm từng môn phải từ 0 đến 30
    if (diemChuan < 0 || diemChuan > 30 || isNaN(diemChuan)){
        // alert("Điểm chuẩn phải từ 0 đến 30")
        showError(element.errorDiemChuan, "Điểm chuẩn phải từ 0 đến 30")
        isValid = false
    }

    // điểm từng môn phải từ 0 đến 10
    // Môn 1:
    if (diem1 < 0 || diem1 > 10 || isNaN(diem1)){
        showError(element.errorDiem1, "Điểm môn 1 phải từ 0 đến 10")
        isValid = false
    }

    // Môn 2:
    if (diem2 < 0 || diem2 > 10 || isNaN(diem2)){
        // alert("Điểm môn 2 phải từ 0 đến 10")
        showError(element.errorDiem2, "Điểm môn 2 phải từ 0 đến 10")
        isValid = false
    }

    // Môn 3:
    if (diem3 < 0 || diem3 > 10 || isNaN(diem3)){
        // alert("Điểm môn 3 phải từ 0 đến 10")
        showError(element.errorDiem3, "Điểm môn 3 phải từ 0 đến 10")
        isValid = false
    }
    return isValid
}

// B2: Tạo hàm xử lý sự kiện click vào button
element.form.addEventListener('submit', (event) => {
    // event này được lấy khi user click vào button có type là submit
    // B3: Lấy dữ liệu người dùng nhập vào
    // QUAN TRỌNG: khi dùng với thẻ form
    // thì phải dùng event.preventDefault() để ngăn form submit đi đâu cả
    event.preventDefault()
    const diemChuan = Number(element.inputDiemChuan.value)
    const diem1 = Number(element.inputDiem1.value)
    const diem2 = Number(element.inputDiem2.value)
    const diem3 = Number(element.inputDiem3.value)

    const khuVuc = element.khuVuc.value
    const doiTuong = element.doiTuong.value

    // B4: Tính điểm ưu tiên
    const diemUuTienKhuVuc = DIEM_UU_TIEN_KHU_VUC[khuVuc]
    const diemUuTienDoiTuong = DIEM_UU_TIEN_DOI_TUONG[doiTuong]

    console.log(diemChuan)
    console.log(diem1, diem2, diem3)
    console.log(khuVuc, doiTuong)
    console.log(diemUuTienKhuVuc, diemUuTienDoiTuong)

    // B4.1: Validate dữ liệu người dùng nhập vào
    const isValid = validationInput(diemChuan, diem1, diem2, diem3)
    if (!isValid) { // nếu isValid là false thì sẽ không chạy tiếp mà sẽ dừng ở đây
        return
    }
    // LƯU Ý: code chạy được trước => clean code sau
    // if(isNaN(diemChuan) || isNaN(diem1) || isNaN(diem2) || isNaN(diem3)) {
    //     alert("Vui lòng nhập số vào tất cả các trường điểm")
    //     return
    // }
    // // range điểm chuẩn và điểm từng môn phải từ 0 đến 30
    // if (diemChuan < 0 || diemChuan > 30){
    //     alert("Điểm chuẩn phải từ 0 đến 30")
    //     return
    // }

    // // điểm từng môn phải từ 0 đến 10
    // // Môn 1:
    // if (diem1 < 0 || diem1 > 10){
    //     alert("Điểm môn 1 phải từ 0 đến 10")
    //     return
    // }

    // // Môn 2:
    // if (diem2 < 0 || diem2 > 10){
    //     alert("Điểm môn 2 phải từ 0 đến 10")
    //     return
    // }

    // // Môn 3:
    // if (diem3 < 0 || diem3 > 10){
    //     alert("Điểm môn 3 phải từ 0 đến 10")
    //     return
    // }

    // B5: Tính tổng điểm
    const tongDiem = diem1 + diem2 + diem3 + diemUuTienDoiTuong + diemUuTienKhuVuc

    // B6: So sánh tổng điểm với điểm chuẩn và hiển thị kết quả
    if (tongDiem >= diemChuan) {
        alert(`Bạn đã đậu! Tổng điểm của bạn là: ${tongDiem}`)
    } else {
        alert(`Bạn đã rớt! Tổng điểm của bạn là: ${tongDiem}`)
    }

})

