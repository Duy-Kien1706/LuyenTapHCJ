
const tableData = document.getElementById( "tableData" );
const thongKe = document.getElementById( "thongKe" );
let khoaHoc = 0;
let vanHoc = 0;
let congNghe = 0;
let lichSu  = 0;
let khac = 0;


fetch( "data.json" )
    .then( function ( response ) {

        return response.json();
    } )
    .then( function ( data ) {



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








const btnMoForm = document.getElementById("btnMoForm");
const btnHuyForm = document.getElementById("btnHuyForm");
const khuVucForm = document.getElementById("khuVucForm");
const formThemSach = document.getElementById("formThemSach");
const thongBaoValidation = document.getElementById("thongBaoValidation");


btnMoForm.addEventListener("click", function () {
    khuVucForm.style.display = "block"; 
});


btnHuyForm.addEventListener("click", function () {
    khuVucForm.style.display = "none";  
    formThemSach.reset();               
    thongBaoValidation.innerHTML = "";  
});


formThemSach.addEventListener("submit", function (event) {

    event.preventDefault(); 


    let maSachSắpThem = document.getElementById("txtMaSach").value;
    let tenSachSắpThem = document.getElementById("txtTenSach").value;
    let soLuongSắpThem = document.getElementById("txtSoLuong").value;


    if (maSachSắpThem === "" || tenSachSắpThem === "" || soLuongSắpThem === "") {

        thongBaoValidation.style.color = "red";
        thongBaoValidation.innerHTML = "Vui lòng nhập đầy đủ tất cả các trường dữ liệu!";
    } 

    else if (soLuongSắpThem <= 0) {
        thongBaoValidation.style.color = "red";
        thongBaoValidation.innerHTML = "Số lượng sách phải lớn hơn 0!";
    } 

    else {

        thongBaoValidation.style.color = "green";
        thongBaoValidation.innerHTML = "Hợp lệ! Hệ thống đang xử lý...";
        

    }
});


$("#formThemSach").validate({
    

    rules: {
        maSach: {
            required: true
        },
        tenSach: {
            required: true 
        },
        soLuong: {
            required: true, 
            min: 1          
        },
        tacGia: {
            required: true, 
        },
        theLoai: {
            required: true, 
        },
        nam: {
            required: true, 
        },
        nguoiThem: {
            required: true, 
        },
        ngayThem: {
            required: true, 
        }
    },

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


    submitHandler: function (form) {

        let thongBao = document.getElementById("thongBaoValidation");
        thongBao.style.color = "green";
        thongBao.innerHTML = "Hợp lệ! Hệ thống đang xử lý...";


    }
});



$("#btnMoForm").click(function () {
    $("#khuVucForm").show(); 
});

$("#btnHuyForm").click(function () {
    $("#khuVucForm").hide(); 
    $("#formThemSach")[0].reset(); 
    document.getElementById("thongBaoValidation").innerHTML = "";
    

    $("#formThemSach").validate().resetForm(); 
});


