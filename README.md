# Plan01

Website học trọn playlist [Rust for beginners (2025)](https://www.youtube.com/playlist?list=PLAscMa3kKhHjBYOTrT20kpYMNQX95KU6i) của Rustfully (85 video, khoảng 9 giờ) trong **7 ngày**, mỗi ngày khoảng 2,5 giờ gồm xem video, làm Rustlings và một bài mini.

## Tính năng

- Lịch 7 ngày: video, bài thực hành và tài liệu (Rust Book, Rustlings) cho từng ngày.
- Xem video ngay trong trang. Xem hết một video thì tự đánh dấu đã xem và chuyển sang bài tiếp theo.
- Chỉnh tốc độ phát từ 1× đến 2×.
- Chọn ngày bắt đầu để web tự mở đúng ngày học của hôm nay.
- Tick bài tập, ghi chú theo ngày, xem tiến độ cả khoá.
- Tiến độ lưu trong `localStorage` của trình duyệt. Có Export/Import file JSON để chuyển sang máy khác.

## Chạy trên máy

Cần Node.js 20 trở lên.

```bash
npm install
npm run dev
```

Mở http://localhost:3000.

## Deploy lên Vercel

1. Vào [vercel.com/new](https://vercel.com/new) và import repo này.
2. Framework Preset: **Next.js** (Vercel tự nhận). Giữ nguyên các thiết lập build mặc định.
3. Bấm **Deploy**. Sau đó, mỗi lần push lên `main` Vercel sẽ tự deploy lại.

## Sửa lịch học

Toàn bộ nội dung (chia video theo ngày, bài tập, link tài liệu) nằm trong `src/data/course.ts`.

| Thư mục | Nội dung |
|---|---|
| `src/app` | Layout, trang chính, CSS, icon |
| `src/components` | Giao diện: tổng quan, tab ngày, nội dung ngày, player YouTube, export/import |
| `src/lib` | Lưu tiến độ, xử lý ngày tháng, tính thống kê |
| `src/data/course.ts` | Dữ liệu khoá học |
