<!-- @format -->

1.

## 2. Section2

    - Khởi tạo 1 server
    - Add 3 library: compression, express, morgan, helmet

## 3. Section 3.

    3.1:  Nhược điểm của cách Connect cũ
        -Ko nên sử dụng

    3.2:  Cách mới để connect mongodb thay cho cũ... (xem file init.mongodb.js)
        - Code theo design pattern phổ biến
        - Code đẹp hơn, dễ grow up và config

    3.3: Cách để kiểm tra có bao nhiêu connect trong hệ thống code
        - xem countConnect() ở file helpers/check.connect.js

    3.4: Cách để phát hiện sự quá tải của connect
        - xem checkOverLoad() ở file helpers/check.connect.js

    3.5: Có nên đóng connect Mongodb liên tục hay không
        - Không cần thiết...

    3.5: PoolSize là gì? Và ưu điểm
        - PoolSize: Giúp tăng hiệu suất kết nối database
        - PoolSize mặc định là 100 - tức là mặc định là cho 100 kết nối xuống database
        - Khi Có quá nhiều connect xuống database và vượt quá poolsize. Khi đó database sẽ cho
            xếp hàng connect , và xử lý lần lượt
        - Dựa vào CPU và memory mà đặt maxPoolSize cho hợp lý

## 4. Env và config
    1. Env
        - Vì sao phải sử dụng file .env : Giúp làm việc local mà ko ảnh hưởng đến dever khác
        - File env lưu trữ những thông tin nhẩy cảm, password, các biến môi trường, API....
        - File env sẽ ko được push lên github
    2. Config
        - File config để lưu trữ các cài đặt và tùy chọn cho cấu hình 
        - Kiểm soát các cài đặt ở file