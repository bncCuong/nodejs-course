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

## 5. Create refeshTocken

## 6. Login

    1. User đăng nhập bằng {email, password}
    2. Check email, password. Nếu vượt qua(có account) thì tạo 1 pairToken(refeshToken và accessToken) lưu vào Keys(database).
        - Accesstoken thì có thời hạn, khi hết thời hạn sẽ tự động bị xoá khỏi db. Lúc này refeshToken sẽ làm nhiệm vụ tạo một accessToken và refeshToken mới cho user này mà ko cần thiết phải gọi 1 api khác để tạo accessToken. Đồng thời đưa cặp pairToken đã hết hạn này vào 1 mảng có thể gọi là tokenUsed hoặc blacklist lưu trong db(có thể xoá đi sau 1 thời gian nào đó) - để chống hacker.
        - Khi hệ thống nhận đc request từ 1 account mà có đến 2 cặp pairToken(từ user và hacker) thì lập tức sẽ huỷ bỏ hết data reponse về cả 2 request để bảo vệ user bằng cách logout tài khoản đang đăng nhập đó ra.
        - Sau đó user có tài khoản và password sẽ đc login lại, còn hacker thì chỉ có cặp pairToken cũ hết hạn và vô dụng
    3. Trả về user- gồm các thông tin của user và pairToken cho clinet

## 7. Logout

    1.Viết 1 hàm middaleware(name: authentication()) check điều kiện trước khi logout
        1.1: lấy userId từ client truyền xuống qua req.HEADER.CLIENTID
        1.2: nhận keyStore thông qua userID
        1.3: verify accsesTken bằng thư viện JWT(kiểm tra token trong db). Set req.keyStore = keyStore
        1.4: xoá accsessToken trong db. Khi user muốn logout thì sẽ xoá hết dữ liệu trong Keys - database, không phải trong Shops
        1.5: return next().
    2. Ba tham số bắt buộc trên clinet phải truyền xuống:
        2.1: x-api-key: Là key BE cung cấp cho FE để có thể truy cập vào api-key(gọi dữ liệu từ xuống BE)
        2.2: x-client-id: Là userId của user đang đăng nhập. Được sử dụng để veryfi accessToken của user nào, có đang login hay ko
        2.3: authentication: Là accessToken của user đang login
