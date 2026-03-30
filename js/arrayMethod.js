const sinhViens = [
    {name: "Nguyen Van A", age: 20, diem: 8.5},
    {name: "Nguyen Van B", age: 22, diem: 9.0},
    {name: "Nguyen Van Châu", age: 20, diem: 7.0},
    {name: "Nguyen Van Dũng", age: 20, diem: 4.5},
]

// forEach: duyệt qua từng phần tử của mảng
// viết tắt của for...of
// KHI NÀO DÙNG:
// - in ra thông tin của từng phần tử trong mảng
// - tính toán, xử lý dữ liệu của từng phần tử trong mảng
// - render giao diện (tạo thẻ HTML) cho từng phần tử trong mảng

// TH1: in ra tên của từng sinh viên
sinhViens.forEach((sv, index) => {
    console.log(`Tên sinh viên thứ ${index + 1} là: ${sv.name}`)
})

// TH2: tính điểm trung bình của tất cả sinh viên
let dtb = 0
sinhViens.forEach((sv) => {
    dtb += sv.diem
})
dtb = dtb / sinhViens.length

// TH3: render giao diện cho từng sinh viên
// hiển thị danh sách sinh viên
let htmlContent = ""
sinhViens.forEach((sv) => {
    htmlContent += `<li>${sv.name} - ${sv.diem}</li>`
})
// forEach: không trả về mảng mới

// map(): duyệt qua từng phần tử của mảng
// kết quả trả về là 1 mảng mới
// dùng nhiều trong React để render giao diện
const newSinhViens = sinhViens.map((sv) => {
    let xepLoai = ""
    if (sv.diem >= 8) {
        xepLoai = "Giỏi"
    } else if (6.5 <= sv.diem && sv.diem < 8) {
        xepLoai = "Khá"
    } else if (5 <= sv.diem && sv.diem < 6.5) {
        xepLoai = "Trung bình"
    } else {
        xepLoai = "Yếu"
    }

    // {
    //     name, age, diem
    // }

    // spread operator:
    // {
    //     name, age, diem, xepLoai
    // }
    return {
        ...sv, // giữ nguyên các thuộc tính cũ của đối tượng
        xepLoai, // thêm thuộc tính xepLoai vào đối tượng mới
    }
})
console.dir(newSinhViens)

// hiển thị danh sách sinh viên kèm xếp loại

// filter(): duyệt qua từng phần tử của mảng
// để lọc ra những phần tử thỏa yêu cầu nào đó
// function bên trong filter() phải trả về true hoặc false
const filterSinhVienGioi = sinhViens.filter((sv) => sv.diem >= 8)
console.dir(filterSinhVienGioi)

const dsPhim = [
    {name: "Deadpool", genre: "Action", rating: 8.5},
    {name: "Avengers", genre: "Action", rating: 8.0},
    {name: "The Notebook", genre: "Romance", rating: 7.5},
    {name: "Titanic", genre: "Romance", rating: 9.0},
]

// case 1: lọc ra những phim có rating >= 8
const filterPhimRate8 = dsPhim.filter((phim) => phim.rating >= 8)
console.dir(filterPhimRate8)

// case 2: tìm tên phim bất kỳ
const keyword = "a"
const findPhim = dsPhim.filter((phim) => phim.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))
console.dir(findPhim)

// find(), findIndex(), some(), every(), reduce(), sort()...