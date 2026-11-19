/*
  NỘI DUNG THIỆP — muốn đổi chữ, tên, ảnh, câu hỏi… thì chỉ cần sửa tệp này.

  Lưu ý khi sửa:
  - Giữ nguyên dấu ngoặc kép "..." hoặc dấu huyền `...` bao quanh mỗi nội dung.
  - Mỗi mục kết thúc bằng dấu phẩy. Danh sách nằm trong [ ... ], các phần tử cách nhau bằng dấu phẩy.
  - Trong lời chúc: xuống dòng một lần = ngắt dòng; để một dòng trống = sang đoạn mới.
  - Muốn bỏ hẳn một màn (bài kiểm tra, giấy khen, hộp quà) thì đổi batDau: true thành false.
*/
window.NOI_DUNG_THIEP = {
  /* ===== Màn 1: Bìa và lá thư ===== */
  ngay: "20 tháng 11",                // dòng nhỏ trên bìa
  tenNguoiNhan: "em",                 // tiêu đề bìa sẽ là “Gửi em”
  ngayTrongThu: "Ngày 20 tháng 11",

  loiMoDau: "Gửi cô giáo tương lai của anh,",

  loiChuc: `Hôm nay là ngày của những người đứng trên bục giảng. Em chưa chính thức đứng lớp, nhưng trong mắt anh, em đã là một cô giáo rồi: chăm chỉ soạn từng giáo án, hồi hộp trước mỗi buổi tập giảng, và lúc nào cũng nghĩ xem làm sao để giảng cho học trò dễ hiểu nhất.

Anh biết có những hôm em mệt vì bài vở, vì thi cử, vì lo không biết mình có làm tốt không. Anh không học thay em được, nhưng anh luôn muốn là người nghe em kể chuyện trường, chuyện lớp mỗi tối, và là người tin em nhất.

Chúc cô giáo tương lai của anh một ngày 20/11 thật vui, học thật giỏi và giữ mãi tình yêu với nghề mình đã chọn. Anh tự hào về em và thương em nhiều!`,

  loiKet: "Thương em,",
  chuKy: "Anh",

  // Ảnh kỷ niệm (tùy chọn). Để trống "" thì khung ảnh tự ẩn.
  anhKyNiem: "anh/ky-niem.jpg",
  moTaAnh: "Ảnh kỷ niệm của hai đứa",

  nutSauThu: "Còn bất ngờ nữa đó",

  /* ===== Màn 2: Bài kiểm tra vui ===== */
  baiKiemTra: {
    batDau: true,
    tieuDe: "Bài kiểm tra 15 phút",
    mon: "Môn: Hiểu anh",
    hoTen: "Cô giáo tương lai của anh",
    huongDan: "Chọn một đáp án cho mỗi câu. Cô giáo không được nhìn bài bạn bên cạnh nha.",
    cauHoi: [
      {
        hoi: "Hôm nay là ngày gì?",
        traLoi: ["Ngày Nhà giáo Việt Nam", "Ngày anh nhớ em hơn mọi ngày", "Cả hai"],
        phanHoi: "Đúng! Câu nào cũng đúng hết."
      },
      {
        hoi: "Ai tự hào về em nhất?",
        traLoi: ["Thầy cô của em", "Bố mẹ em", "Anh"],
        phanHoi: "Chính xác! Nhưng anh xin giành hạng nhất nhé."
      },
      {
        hoi: "Anh thương em bao nhiêu?",
        traLoi: ["Một chút", "Rất nhiều", "Nhiều hơn số trang giáo án em đã soạn"],
        phanHoi: "Đúng luôn. Mà chắc còn nhiều hơn thế nữa."
      }
    ],
    diem: "10",
    loiPhe: "Bài làm xuất sắc! Thông minh, dễ thương, được anh thương nhất.",
    nutTiep: "Nhận giấy khen"
  },

  /* ===== Màn 3: Giấy khen ===== */
  giayKhen: {
    batDau: true,
    quocHieu: "VƯƠNG QUỐC TRÁI TIM ANH",
    tieuNgu: "Thương em · Nhớ em · Chiều em",
    tieuDe: "Giấy khen",
    traoTang: "Cô giáo tương lai của anh",
    danhHieu: "Cô giáo tương lai dễ thương nhất",
    lyDo: [
      "Chăm chỉ soạn giáo án đến khuya",
      "Hồi hộp mỗi lần tập giảng mà vẫn làm rất tốt",
      "Cười lên một cái là anh hết mệt"
    ],
    nguoiTrao: "Người trao",
    chuDau: "ĐÃ DUYỆT",
    nutTiep: "Mở quà nào"
  },

  /* ===== Màn 4: Hộp quà bất ngờ ===== */
  hopQua: {
    batDau: true,
    tieuDe: "Một món quà nhỏ",
    goiY: "Chạm vào hộp quà để mở",
    loiNhanHoa: "Tặng em một bó hoa không bao giờ héo.",
    nutXemPhieu: "Còn quà nữa nè",
    tieuDePhieu: "Phiếu quà dành riêng cho em",
    phieuQua: [
      "Một buổi hẹn hò, em chọn chỗ",
      "Một cái ôm thật lâu, không giới hạn thời gian",
      "Một tối anh nghe em kể chuyện trường lớp, không ngắt lời"
    ],
    hanDung: "Hạn dùng: mãi mãi",
    nutCauHoi: "Anh còn một câu muốn hỏi",

    cauHoiCuoi: "Em có thương anh không?",
    nutCo: "Có chứ",
    nutKhong: "Không",
    // Mỗi lần bấm “Không”, nút đổi chữ theo danh sách này, nhỏ dần, còn nút “Có” to dần.
    khiBamKhong: ["Em chắc chưa?", "Nghĩ lại đi mà", "Anh buồn đó nha", "Bấm nhầm rồi đúng không?", "Thôi bấm “Có” đi"],
    loiCuoi: "Anh biết mà! Anh cũng thương em nhiều lắm. Chúc cô giáo tương lai của anh một ngày 20/11 thật hạnh phúc!",
    nutXemLai: "Xem lại từ đầu"
  },

  /* ===== Nhạc nền (tùy chọn) =====
     Chép một tệp .mp3 vào thư mục nhac rồi ghi đường dẫn, ví dụ "nhac/bai-hat.mp3".
     Nhạc chỉ phát sau khi bấm “Mở thư” và có nút bật/tắt ở góc trên. Để trống "" thì không có nhạc. */
  nhac: ""
};
