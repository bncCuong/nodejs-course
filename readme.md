<!-- @format -->

1. Các thư viện
   - Express -
   - Morgan - Thư viện in ra các log khi có ng dùng chạy 1 reques theo 1 tiêu chuẩn
   - Helmet - Là 1 phần mêm trung gian - để bảo vệ các header của dự án. Ngăn ko cho hacker biết những thông tin riêng tư của dự án
   - Compression - Thư viện dùng để nén nhỏ dữ liệu gửi đi (tới backend hoặc database). Giúp cho tốc độ vận chuyển dữ liệu tăng cao

## Lưu ý

    1. Sự khác nhau của file utils và helper
        - utils : LÀ file viết về các function dùng chung nhiều nơi và sử dụng nhiều
        - helper: Là file giúp làm các việc ủy quyền nhiều hơn