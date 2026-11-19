# Gửi em, ngày 20/11

Thiệp điện tử chúc mừng ngày Nhà giáo Việt Nam. Trang tĩnh, chỉ dùng HTML, CSS và
JavaScript thuần, nên đưa lên GitHub Pages là chạy được. Người nhận mở bằng điện
thoại qua 4G/5G, kể cả khi máy tính của bạn đã tắt.

## Các tệp

| Tệp          | Vai trò                                                     |
| ------------ | ----------------------------------------------------------- |
| `index.html` | Khung trang: phong thư, bài kiểm tra, giấy khen, hộp quà     |
| `styles.css` | Màu sắc, bố cục, các hiệu ứng                               |
| `content.js` | **Nội dung cần sửa**: lời chúc, câu hỏi, phiếu quà, ảnh, nhạc |
| `script.js`  | Đổ nội dung vào trang, chuyển màn, hoa rơi, pháo hoa trái tim |

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

## 2. Thiệp có gì

Thiệp gồm 4 màn hình riêng, mỗi lúc chỉ hiện một màn, giống xem story. Sang màn sau
bằng nút ở đáy màn hình hoặc vuốt sang trái; quay lại bằng nút ← hoặc vuốt sang phải
(trên máy tính dùng phím mũi tên). Các chấm ở đáy cho biết đang ở màn mấy. Nút sang
màn sau chỉ hiện khi đã xong màn hiện tại.

1. **Phong thư**: bấm “Mở thư”, nắp mở, lá thư trồi lên kèm ảnh kỷ niệm và hoa rơi.
   Lá thư dài hơn một màn hình nên đọc bằng cách cuộn trong chính màn này.
2. **Bài kiểm tra 15 phút – Môn: Hiểu anh**: hiện từng câu một trên trang giấy tập.
   Chọn đáp án nào cũng đúng; làm xong được đóng dấu **10 điểm** bằng mực đỏ, kèm lời phê.
3. **Giấy khen** kiểu văn bản hành chính “VƯƠNG QUỐC TRÁI TIM ANH”, có con dấu đỏ.
4. **Hộp quà**: chạm vào hộp thì lần lượt hiện bó hoa nở, rồi phiếu quà, rồi câu hỏi
   “Em có thương anh không?”. Mỗi lần bấm “Không”, nút đó nhỏ lại và đổi chữ, còn nút
   “Có” to dần. Bấm “Có” thì có pháo hoa trái tim và lời nhắn cuối.

Xung quanh thiệp có dây đèn lấp lánh, tim và cánh hoa bay, đốm sáng, bướm; chạm vào
đâu cũng nảy ra vài trái tim nhỏ. Nếu điện thoại bật “giảm chuyển động”, các hiệu ứng
tự tắt và mọi thứ hiện ngay.

## 3. Sửa nội dung

Mọi chữ, ảnh, câu hỏi đều nằm trong `content.js`, được chia theo từng màn và có chú
thích tiếng Việt. Vài điểm hay sửa:

- `loiChuc`: lời chúc chính, nằm giữa hai dấu huyền `` ` `` nên viết được nhiều dòng.
  Xuống dòng một lần là ngắt dòng, để một dòng trống là sang đoạn mới.
- `baiKiemTra.cauHoi`: mỗi câu gồm `hoi` (câu hỏi), `traLoi` (các đáp án) và
  `phanHoi` (lời khen sau khi chọn). Thêm hay bớt câu đều được.
- `giayKhen.lyDo`, `hopQua.phieuQua`, `hopQua.khiBamKhong`: là danh sách, mỗi dòng
  một mục, các mục cách nhau bằng dấu phẩy.
- Muốn bỏ một màn: đổi `batDau: true` thành `batDau: false`.
- **Ảnh**: đang dùng `anh/ky-niem.jpg` (bản nén 900 px, khoảng 175 KB). Muốn đổi ảnh
  thì chép ảnh mới vào thư mục `anh` rồi sửa `anhKyNiem`. Tên tệp nên viết không
  dấu, không khoảng trắng, và đường dẫn không bắt đầu bằng `/`. Không cần đưa ảnh
  PNG gốc (1,9 MB) lên GitHub.
- **Nhạc nền** (tùy chọn): chép một tệp `.mp3` vào thư mục `nhac`, rồi ghi
  `nhac: "nhac/ten-bai.mp3"`. Nhạc phát khi bấm “Mở thư”, và có nút bật/tắt ở góc
  trái. Nên dùng bản nhạc bạn có quyền dùng, dung lượng dưới 3 MB để mở nhanh trên 4G.

### Mẫu lời chúc để thay

Chép một mẫu dưới đây vào giữa hai dấu `` ` `` của `loiChuc`.

**Ngắn, ngọt**

```
Chúc cô giáo tương lai của anh một ngày 20/11 thật nhiều hoa, thật nhiều tiếng cười và thật ít bài kiểm tra. Mai này em đứng lớp, học trò của em sẽ may mắn lắm, vì cô giáo của chúng vừa giỏi vừa dịu dàng. Anh tự hào về em và thương em nhiều!
```

**Vui, kiểu “học trò nộp bài”**

```
Thưa cô, hôm nay học trò tên Anh xin nộp bài tập về nhà: một lá thư.

Đề bài là “Kể về người con gái em thương nhất”. Bài làm: người đó soạn giáo án đến khuya, run run mỗi lần tập giảng mà vẫn làm rất tốt, lại còn chịu khó nghe anh kể chuyện linh tinh. Người đó là cô giáo tương lai của anh.

Mong cô chấm nhẹ tay. Chúc cô một ngày 20/11 thật vui!
```

**Khi hai người đang ở xa nhau**

```
Hôm nay anh không thể tự tay tặng hoa cho em, nên anh gửi tạm lá thư này. Dù ở xa, anh vẫn biết em đang cố gắng từng ngày với bài vở, với những buổi tập giảng, để mai này thành một cô giáo thật giỏi.

Anh mong em luôn khoẻ, học thật tốt và giữ mãi tình yêu với nghề mình đã chọn. Đợi anh về, anh sẽ tặng em bó hoa thật, cùng một cái ôm thật lâu.

Anh tự hào về em và thương em nhiều!
```

## 4. Xuất bản lên GitHub Pages

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

## 5. Kiểm tra trước khi gửi

1. Mở URL công khai trong cửa sổ ẩn danh trên máy tính.
2. Trên điện thoại, **tắt Wi‑Fi**, dùng 4G/5G mở URL. Bấm “Mở thư” và đọc hết thư.

## 6. Tạo mã QR

Chỉ tạo QR **sau khi** URL công khai đã kiểm tra xong ở bước 5.

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
