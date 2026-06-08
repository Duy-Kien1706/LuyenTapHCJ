// Bước 1: Tìm đến cái thẻ <tbody> trên giao diện HTML thông qua ID của nó
const tableData = document.getElementById("tableData");

// Bước 2: Dùng lệnh fetch để đi tìm và đọc nội dung file data.json
fetch("data.json")
    .then(function (response) {
        // Hàm này nhận về kết quả thô từ file JSON.
        // Chúng ta cần chuyển đổi nó sang dạng dữ liệu mà JavaScript hiểu được.
        return response.json();
    })
    .then(function (data) {
        // Lúc này, biến 'data' chính là mảng chứa danh sách các cuốn sách.
        
        // Tạo một biến chuỗi rỗng để chuẩn bị cộng dồn các hàng (row) của bảng
        let htmlChuoi = ""; 

        // Bước 3: Chạy vòng lặp qua từng cuốn sách trong mảng 'data'
        for (let i = 0; i < data.length; i = i + 1) {
            
            // Lấy ra cuốn sách hiện tại ở vị trí thứ i để xử lý cho đỡ rối mắt
            let cuonSachHienTai = data[i];

            // Cộng dồn chuỗi HTML của từng hàng <tr> vào biến htmlChuoi
            // Dấu ` (backtick) giúp ta truyền giá trị của biến vào bằng cú pháp ${}
            htmlChuoi = htmlChuoi + `
                <tr>
                    <td>${cuonSachHienTai.MaSach}</td>
                    <td>${cuonSachHienTai.TenSach}</td>
                    <td>${cuonSachHienTai.TacGia}</td>
                    <td>${cuonSachHienTai.TheLoai}</td>
                    <td>${cuonSachHienTai.Nam}</td>
                    <td>${cuonSachHienTai.SoLuong}</td>
                    <td>${cuonSachHienTai.NguoiThem}</td>
                    <td>${cuonSachHienTai.NgayThem}</td>
                    <td>
                        <button class="btn btn-primary" style="margin-bottom: 5px;">Sửa</button>
                        <br>
                        <button class="btn btn-danger">Xóa</button>
                    </td>
                </tr>
            `;
        }

        // Bước 4: Sau khi vòng lặp kết thúc, ta đã có một chuỗi HTML dài chứa toàn bộ các hàng.
        // Bây giờ, ném chuỗi này vào bên trong thẻ table trên giao diện web để trình duyệt vẽ ra bảng.
        tableData.innerHTML = htmlChuoi;
    });