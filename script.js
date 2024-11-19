let list = document.querySelectorAll('.list .item');

list.forEach(item => {
    item.addEventListener('click', function(event){
        if(event.target.classList.contains('add')){ 
            let itemNew = item.cloneNode(true); // Sao chép sản phẩm được nhấp
            let checkIsset = false; // Cờ kiểm tra xem sản phẩm đã có trong giỏ hàng chưa

            let listCart = document.querySelectorAll('.cart .item');
            let quantityInput = item.querySelector('.count');
            let quantity = parseInt(quantityInput.value); // Lấy số lượng từ ô nhập

            listCart.forEach(cart => {
                if(cart.getAttribute('data-key') == itemNew.getAttribute('data-key')){
                    checkIsset = true;
                    let existingQuantity = cart.querySelector('.count');
                    existingQuantity.value = parseInt(existingQuantity.value) + quantity; // Tăng số lượng của sản phẩm trong giỏ hàng
                    cart.classList.add('danger'); // Thêm lớp để hiển thị phản hồi trực quan
                    setTimeout(function(){
                        cart.classList.remove('danger');
                    },1000)
                }
            });

            if(checkIsset == false){
                itemNew.querySelector('.count').value = quantity; // Đặt số lượng cho sản phẩm mới
                document.querySelector('.listCart').appendChild(itemNew); // Thêm sản phẩm vào giỏ hàng
            }
        }
    })
});

// Hàm để xóa sản phẩm khỏi giỏ hàng
function Remove($key){
    let listCart = document.querySelectorAll('.cart .item');
    listCart.forEach(item => {
        if(item.getAttribute('data-key') == $key){
            item.remove();
            return;
        }
    })
}

document.getElementById('searchInput').addEventListener('input', function() {
    var input = this.value.toLowerCase().trim(); // Chuyển đổi input thành chữ thường và bỏ khoảng trắng đầu/cuối
    var products = document.querySelectorAll('.item');

    // Kiểm tra nếu ô tìm kiếm trống thì hiển thị lại tất cả sản phẩm
    if (input === "") {
        products.forEach(function(product) {
            product.style.display = 'block'; // Hiển thị tất cả sản phẩm
        });
    } else {
        // Tìm kiếm và ẩn những sản phẩm không phù hợp
        products.forEach(function(product) {
            var title = product.querySelector('.title').textContent.toLowerCase().trim();
            // Kiểm tra nếu tên sản phẩm chứa từ khóa tìm kiếm mà không cần phải khớp chính xác từng ký tự
            if (title.indexOf(input) !== -1) {
                product.style.display = 'block'; // Hiển thị sản phẩm tìm được
            } else {
                product.style.display = 'none'; // Ẩn sản phẩm không khớp
            }
        });
    }
});
