# Gửi em, ngày 20/11

Thiệp điện tử chúc mừng ngày Nhà giáo Việt Nam. Trang tĩnh, chỉ dùng HTML, CSS và
JavaScript thuần, nên đưa lên GitHub Pages là chạy được. Người nhận mở bằng điện
thoại qua 4G/5G, kể cả khi máy tính của bạn đã tắt.

## Các tệp

| Tệp          | Vai trò                                                     |
| ------------ | ----------------------------------------------------------- |
| `index.html` | Khung trang: bìa thiệp, phong thư, lá thư, nút “Mở thư”     |
| `styles.css` | Màu sắc, bố cục, hiệu ứng mở nắp phong bì (~400 ms)          |
| `content.js` | **Nội dung cần sửa**: lời chúc, tên, chữ ký, ảnh kỷ niệm     |
| `script.js`  | Đổ nội dung vào trang và xử lý nút “Mở thư”                 |

## 1. Chạy thử tại máy

Cách A, dùng VS Code: cài tiện ích **Live Server**, mở thư mục này, bấm chuột phải
vào `index.html` rồi chọn **Open with Live Server**.

Cách B, dùng dòng lệnh trong thư mục này (chọn một lệnh):

```bash
python -m http.server 8000
# hoặc
npx serve .
```

Sau đó mở `http://localhost:8000` (với `npx serve` thì dùng địa chỉ mà lệnh in ra).

Nên kiểm tra:

- Bật chế độ thiết bị di động trong DevTools (F12), chọn chiều rộng **320 px**.
  Trang không được cuộn ngang và chữ không bị che.
- Dùng bàn phím: bấm **Tab** để tới nút “Mở thư” (có viền đậm), rồi bấm
  **Enter** hoặc **Space**. Thư mở ra và tiêu điểm chuyển vào lá thư.
- Bật “giảm chuyển động” (Windows: Cài đặt → Trợ năng → Hiệu ứng hình ảnh → tắt
  Hiệu ứng động; iPhone: Trợ năng → Chuyển động → Giảm chuyển động). Lúc này thư
  hiện ngay, không có hiệu ứng.

## 2. Sửa lời chúc, tên, chữ ký, ảnh

Chỉ cần mở `content.js`:

```js
window.NOI_DUNG_THIEP = {
  ngay: "20 tháng 11",            // dòng nhỏ trên bìa
  tenNguoiNhan: "em",             // tiêu đề bìa sẽ là “Gửi em”
  ngayTrongThu: "Ngày 20 tháng 11",
  loiChuc: `Chúc em một ngày 20/11 thật vui. ...`,
  loiKet: "Thương em,",
  chuKy: "Anh",
  anhKyNiem: "anh/ky-niem.jpg",   // để trống "" thì khung ảnh tự ẩn
  moTaAnh: "Ảnh kỷ niệm của hai đứa"
};
```

- Lời chúc nằm giữa hai dấu huyền `` ` `` nên có thể viết nhiều dòng. Xuống dòng
  một lần là ngắt dòng, để một dòng trống là sang đoạn mới.
- Ảnh kỷ niệm hiện dùng `anh/ky-niem.jpg` (bản nén 900 px, khoảng 175 KB, làm
  từ ảnh gốc PNG trong cùng thư mục). Muốn đổi ảnh: chép ảnh mới vào thư mục
  `anh`, rồi sửa `anhKyNiem`. Dùng đường dẫn tương đối, **không** bắt đầu bằng
  `/`. Tên tệp nên viết không dấu, không khoảng trắng, đúng chữ hoa/thường
  (GitHub Pages phân biệt `Anh.JPG` với `anh.jpg`). Nên thu nhỏ ảnh còn khoảng
  900–1200 px chiều ngang để mở nhanh trên 4G. Không cần đưa ảnh PNG gốc
  (1,9 MB) lên GitHub.
- Lưu lại rồi tải lại trang để xem.

## 3. Xuất bản lên GitHub Pages

1. Đăng nhập <https://github.com>, bấm **New repository**. Đặt tên, ví dụ
   `thiep-20-11`, chọn **Public** (GitHub Pages miễn phí cần kho công khai), rồi
   bấm **Create repository**.
2. Đưa mã lên, chọn một cách:
   - **Trên web**: trong kho mới, bấm **uploading an existing file**, kéo thả
     `index.html`, `styles.css`, `content.js`, `script.js`, `README.md` và thư
     mục `anh` (chỉ cần `ky-niem.jpg`), rồi bấm **Commit changes**.
   - **Bằng git** (trong thư mục này):

     ```bash
     git init
     git add index.html styles.css content.js script.js README.md anh/ky-niem.jpg
     git commit -m "Thiệp 20/11"
     git branch -M main
     git remote add origin https://github.com/<ten-tai-khoan>/thiep-20-11.git
     git push -u origin main
     ```
3. Vào **Settings → Pages**. Ở mục **Build and deployment**, chọn
   **Source: Deploy from a branch**, **Branch: `main`**, thư mục **`/ (root)`**,
   rồi bấm **Save**.
4. Chờ 1–2 phút, tải lại trang Settings → Pages. GitHub hiện địa chỉ dạng
   `https://<ten-tai-khoan>.github.io/thiep-20-11/`.

Lưu ý: ai có đường dẫn cũng xem được thiệp, và mã nguồn trong kho công khai cũng
xem được. Đừng đưa thông tin riêng tư vào nội dung.

Sau này muốn sửa lời chúc: sửa `content.js` ngay trên GitHub (biểu tượng bút chì)
rồi commit. Trang tự cập nhật sau 1–2 phút, đường dẫn giữ nguyên nên không phải
tạo lại QR.

## 4. Kiểm tra trước khi gửi

1. Mở URL công khai trong cửa sổ ẩn danh trên máy tính.
2. Trên điện thoại, **tắt Wi‑Fi**, dùng 4G/5G mở URL. Bấm “Mở thư” và đọc hết thư.

## 5. Tạo mã QR

Chỉ tạo QR **sau khi** URL công khai đã kiểm tra xong ở bước 4.

Bằng dòng lệnh (Node.js), thay URL bằng địa chỉ thật:

```bash
npx qrcode -o qr-thiep-20-11.png -w 800 "https://<ten-tai-khoan>.github.io/thiep-20-11/"
```

Hoặc bằng Python:

```bash
pip install "qrcode[pil]"
python -c "import qrcode; qrcode.make('https://<ten-tai-khoan>.github.io/thiep-20-11/').save('qr-thiep-20-11.png')"
```

Đây là QR tĩnh (chứa thẳng đường dẫn), nên không hết hạn và không phụ thuộc dịch vụ
bên ngoài. Mở ảnh PNG trên màn hình máy tính, quét thử bằng camera điện thoại để
chắc chắn nó mở đúng thiệp.

Khi gửi thiệp, gửi **cả ảnh QR và đường dẫn bấm được**. Người nhận đang xem tin
nhắn trên chính điện thoại thì không quét QR được, nên cần đường dẫn để bấm.
