const dataTable = document.getElementById( "data" );

fetch( "./data.json" ).then( function ( repon ) {

    return repon.json();
} ).then( function ( data ) {

    let html = "";
    for ( let i = 0; i < data.length; i++ ) {
        html += `<tr>
                    <td>
                        <button class = "btn btn-danger">Xem</button>
                        <button class = "btn btn-danger">Sửa</button>
                        <button class = "btn btn-danger">Xóa</button>
                    </td>
                    <td>${data[i].STT}</td>
                    <td>${data[i].Manager}</td>
                    <td>${data[i].Address}</td>
                    <td>${data[i].LastUpdate}</td>
                </tr>`
    }
    dataTable.innerHTML = html;
} )



