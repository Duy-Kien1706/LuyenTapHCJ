// Bước 1: Tìm đến cái thẻ <tbody> trên giao diện HTML thông qua ID của nó
const tableData = document.getElementById( "tableData" );
const thongKe = document.getElementById( "thongKe" );
let khoaHoc = 0;
let vanHoc = 0;
let congNghe = 0;
let lichSu  = 0;
let khac = 0;

// Bước 2: Dùng lệnh fetch để đi tìm và đọc nội dung file data.json
fetch( "data.json" )
    .then( function ( response ) {
        // Hàm này nhận về kết quả thô từ file JSON.
        // Chúng ta cần chuyển đổi nó sang dạng dữ liệu mà JavaScript hiểu được.
        return response.json();
    } )
    .then( function ( data ) {
        // Lúc này, biến 'data' chính là mảng chứa danh sách các cuốn sách.

        // Bước 3: Chạy vòng lặp qua từng cuốn sách trong mảng 'data'
        for ( let i = 0; i < data.length; i = i + 1 ) {


            tableData.innerHTML += `
                <tr>
                    <td>${ data[ i ].MaSach }</td>
                    <td>${ data[ i ].TenSach }</td>
                    <td>${ data[ i ].TacGia }</td>
                    <td>${ data[ i ].TheLoai }</td>
                    <td>${ data[ i ].Nam }</td>
                    <td>${ data[ i ].SoLuong }</td>
                    <td>${ data[ i ].NguoiThem }</td>
                    <td>${ data[ i ].NgayThem }</td>
                    <td>
                        <button class="btn btn-primary" style="margin-bottom: 5px;">Sửa</button>
                        <br>
                        <button class="btn btn-danger">Xóa</button>
                    </td>
                </tr>
            `;

            if(data[i].TheLoai === "Khoa học"){
                khoaHoc+=1;
            }
            else if (data[i].TheLoai === "Văn học"){
                vanHoc +=1;
            }
            else if (data[i].TheLoai === "Lịch sử"){
                lichSu +=1;
            }
            else if (data[i].TheLoai === "Công nghệ"){
                congNghe +=1;
            }
            else if (data[i].TheLoai === "Khác"){
                khac+=1;
            }
        }

        
            thongKe.innerHTML += `
                <p>Tổng số sách: ${data.length} </p>
                <p>Khoa học:${khoaHoc} </p>
                <p>Văn học:${vanHoc} </p>
                <p>Lịch Sử: ${lichSu}</p>
                <p>Công Nghệ: ${congNghe}</p>
                <p>Khác:${khac}</p>
            `
        }
);





// ==================== ĐOẠN CODE XỬ LÝ FORM THÊM SÁCH ====================

// 1. Tìm các phần tử HTML cần thiết
const btnMoForm = document.getElementById("btnMoForm");
const btnHuyForm = document.getElementById("btnHuyForm");
const khuVucForm = document.getElementById("khuVucForm");
const formThemSach = document.getElementById("formThemSach");
const thongBaoValidation = document.getElementById("thongBaoValidation");

// 2. Lắng nghe sự kiện khi nhấn nút "Thêm sách" -> Hiện form ra
btnMoForm.addEventListener("click", function () {
    khuVucForm.style.display = "block"; // Đổi từ ẩn (none) thành hiện (block)
});

// 3. Lắng nghe sự kiện khi nhấn nút "Hủy" -> Ẩn form đi
btnHuyForm.addEventListener("click", function () {
    khuVucForm.style.display = "none";  // Ẩn form đi
    formThemSach.reset();               // Xóa sạch chữ đã nhập trong form
    thongBaoValidation.innerHTML = "";  // Xóa thông báo cũ
});

// 4. Lắng nghe sự kiện khi người dùng nhấn nút "Xác nhận thêm" (submit form)
formThemSach.addEventListener("submit", function (event) {
    // Lệnh này cực kỳ quan trọng, giúp trang web không bị tải lại (F5) khi bấm nút
    event.preventDefault(); 

    // Lấy giá trị người dùng nhập vào các ô input
    let maSachSắpThem = document.getElementById("txtMaSach").value;
    let tenSachSắpThem = document.getElementById("txtTenSach").value;
    let soLuongSắpThem = document.getElementById("txtSoLuong").value;

    // Bước Validation (Kiểm tra dữ liệu)
    // Kiểm tra xem có ô nào bị bỏ trống không
    if (maSachSắpThem === "" || tenSachSắpThem === "" || soLuongSắpThem === "") {
        // Nếu có ô trống, hiện chữ màu đỏ báo lỗi
        thongBaoValidation.style.color = "red";
        thongBaoValidation.innerHTML = "Vui lòng nhập đầy đủ tất cả các trường dữ liệu!";
    } 
    // Kiểm tra số lượng nhập vào phải lớn hơn 0
    else if (soLuongSắpThem <= 0) {
        thongBaoValidation.style.color = "red";
        thongBaoValidation.innerHTML = "Số lượng sách phải lớn hơn 0!";
    } 
    // Nếu vượt qua hết tất cả các điều kiện lỗi phía trên -> HỢP LỆ
    else {
        // Hiện chữ màu xanh báo Hợp lệ
        thongBaoValidation.style.color = "green";
        thongBaoValidation.innerHTML = "Hợp lệ! Hệ thống đang xử lý...";
        
        // Bạn có thể bổ sung thêm code để thêm dòng vào bảng tại đây nếu muốn
    }
});

// Dấu $ là ký hiệu thay cho chữ jQuery. 
// Lệnh này nghĩa là rình xem khi nào người dùng bấm nút Submit của #formThemSach
$("#formThemSach").validate({
    
    // 1. NƠI ĐỊNH NGHĨA CÁC LUẬT (RULES) KIỂM TRA DỮ LIỆU
    rules: {
        maSach: {
            required: true // Bắt buộc phải nhập (không được để trống)
        },
        tenSach: {
            required: true // Bắt buộc phải nhập
        },
        soLuong: {
            required: true, // Bắt buộc phải nhập
            min: 1          // Số nhập vào phải lớn hơn hoặc bằng 1
        },
        tacGia: {
            required: true, // Bắt buộc phải nhập
        },
        theLoai: {
            required: true, // Bắt buộc phải nhập
        },
        nam: {
            required: true, // Bắt buộc phải nhập
        },
        nguoiThem: {
            required: true, // Bắt buộc phải nhập
        },
        ngayThem: {
            required: true, // Bắt buộc phải nhập
        }
    },

    // 2. NƠI ĐỊNH NGHĨA CÁC CÂU THÔNG BÁO LỖI TƯƠNG ỨNG (MESSAGES)
    messages: {
        maSach: {
            required: "Vui lòng không bỏ trống Mã Sách!"
        },
        tacGia: {
            required: "Vui lòng không bỏ trống Tác Giả"
        },
        theLoai: {
            required: "Vui lòng không bỏ trống Thể loại!"
        },
        nam: {
            required: "Vui lòng không bỏ trống năm!"
        },
        ngayThem: {
            required: "Vui lòng không bỏ trống ngày thêm!"
        },
        nguoiThem: {
            required: "Vui lòng không bỏ trống người thêm!"
        },
        soLuong: {
            required: "Vui lòng nhập Số Lượng!",
            min: "Số lượng sách phải lớn hơn hoặc bằng 1!"
        },
    },

    // 3. HÀM NÀY SẼ CHẠY KHI TẤT CẢ DỮ LIỆU ĐÃ HỢP LỆ (SUBMIT HANDLER)
    submitHandler: function (form) {
        // jQuery tự động hiểu và chặn F5 trang web cho bạn luôn khi dùng hàm này
        
        // Tìm đến thẻ thông báo và hiện chữ màu xanh
        let thongBao = document.getElementById("thongBaoValidation");
        thongBao.style.color = "green";
        thongBao.innerHTML = "Hợp lệ! Hệ thống đang xử lý...";

        // Bạn có thể viết thêm code xử lý thêm sách vào bảng ở đây
    }
});


// --- Code hai nút bấm Ẩn/Hiện Form viết theo kiểu jQuery cho bạn quen cú pháp ---
$("#btnMoForm").click(function () {
    $("#khuVucForm").show(); // .show() thay cho style.display = "block"
});

$("#btnHuyForm").click(function () {
    $("#khuVucForm").hide(); // .hide() thay cho style.display = "none"
    $("#formThemSach")[0].reset(); 
    document.getElementById("thongBaoValidation").innerHTML = "";
    
    // Xóa các thông báo lỗi đỏ cũ của jQuery nếu có
    $("#formThemSach").validate().resetForm(); 
});


