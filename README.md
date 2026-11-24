# Todo List Management API

RESTful API untuk mengelola daftar tugas, kategori, dan aktivitas pengguna. Dibangun menggunakan Node.js, Express.js, dan MongoDB dengan fitur autentikasi JWT, otorisasi berbasis peran, pencatatan aktivitas, serta dokumentasi API interaktif.

## Gambaran Umum

Todo List Management API merupakan aplikasi backend yang dirancang untuk membantu pengguna mengatur dan mengelola tugas sehari-hari secara efisien.

API ini menyediakan fitur autentikasi pengguna, pengelolaan tugas dan kategori, pencatatan aktivitas, serta penyajian ringkasan statistik. Selain itu, API mendukung pagination, filtering, sorting, dan pencarian agar pengelolaan tugas menjadi lebih fleksibel.

## Fitur Utama

- **Autentikasi Pengguna:** Registrasi dan login menggunakan JWT.
- **Keamanan Password:** Melindungi password pengguna menggunakan bcryptjs.
- **Pengelolaan Todo:** Membuat, melihat, memperbarui, dan menghapus tugas.
- **Pengelolaan Kategori:** Mengelompokkan tugas berdasarkan kategori milik pengguna.
- **Otorisasi Berbasis Peran:** Membatasi akses berdasarkan peran pengguna (user dan admin).
- **Activity Log:** Mencatat aktivitas pembuatan, pembaruan, dan penghapusan Todo.
- **Statistik dan Ringkasan:** Menyediakan informasi statistik aplikasi melalui autentikasi API Key.
- **Pagination:** Membagi daftar Todo ke dalam beberapa halaman.
- **Filtering:** Menyaring Todo berdasarkan status dan kategori.
- **Sorting:** Mengurutkan Todo berdasarkan tanggal pembuatan, judul, dan prioritas.
- **Search:** Mencari Todo berdasarkan judul dan deskripsi.
- **Validasi Input:** Memvalidasi data yang diterima menggunakan express-validator.
- **Penanganan Error:** Mengelola kesalahan secara terpusat dengan HTTP Status Code yang sesuai.
- **Dokumentasi API:** Menyediakan dokumentasi interaktif menggunakan Swagger UI.
- **Pengujian Otomatis:** Mendukung pengujian unit dan integrasi menggunakan Jest dan Supertest.

## Teknologi yang Digunakan

| Teknologi | Kegunaan |
|---|---|
| Node.js | Lingkungan untuk menjalankan JavaScript di sisi server |
| Express.js | Framework untuk membangun RESTful API |
| MongoDB | Database NoSQL untuk menyimpan data |
| Mongoose | ODM untuk mengelola interaksi dengan MongoDB |
| bcryptjs | Melakukan hashing password |
| JSON Web Token | Autentikasi pengguna |
| express-validator | Validasi data masukan |
| Helmet | Menambahkan HTTP security headers |
| CORS | Mengatur Cross-Origin Resource Sharing |
| express-rate-limit | Membatasi jumlah request |
| Morgan | Mencatat aktivitas HTTP request |
| Jest | Menjalankan pengujian otomatis |
| Supertest | Menguji endpoint HTTP |
| Swagger JSDoc | Membuat spesifikasi dokumentasi API |
| Swagger UI Express | Menampilkan dokumentasi API interaktif |

## Struktur Project

```text
API-Todos-List-Management/
│
├── .postman/
├── postman/
│   ├── collections/
│   ├── environments/
│   └── globals/
│
├── src/
│   ├── config/
│   │   ├── apiKey.js
│   │   ├── db.js
│   │   └── swagger.js
│   │
│   ├── controllers/
│   │   ├── activityLog.controller.js
│   │   ├── auth.controller.js
│   │   ├── category.controller.js
│   │   ├── stats.controller.js
│   │   └── todo.controller.js
│   │
│   ├── middlewares/
│   │   ├── apiKey.middleware.js
│   │   ├── auth.middleware.js
│   │   ├── globalErrorHandler.middleware.js
│   │   ├── logger.middleware.js
│   │   ├── notFound.middleware.js
│   │   ├── restrictTo.middleware.js
│   │   └── validate.middleware.js
│   │
│   ├── models/
│   │   ├── activityLog.model.js
│   │   ├── category.model.js
│   │   ├── todo.model.js
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   ├── activityLog.routes.js
│   │   ├── auth.routes.js
│   │   ├── category.routes.js
│   │   ├── role.routes.js
│   │   ├── stats.routes.js
│   │   └── todo.routes.js
│   │
│   ├── services/
│   │   ├── activityLog.service.js
│   │   ├── auth.service.js
│   │   ├── category.service.js
│   │   ├── stats.service.js
│   │   └── todo.service.js
│   │
│   ├── utils/
│   │   ├── AppError.js
│   │   ├── catchAsync.js
│   │   └── generateToken.js
│   │
│   ├── validators/
│   │   ├── auth.validator.js
│   │   ├── category.validator.js
│   │   └── todo.validator.js
│   │
│   ├── app.js
│   └── server.js
│
├── tests/
│   ├── activityLog.test.js
│   ├── auth.test.js
│   ├── category.test.js
│   ├── role.test.js
│   ├── setup.js
│   ├── stats.test.js
│   ├── todo.test.js
│   └── userModel.test.js
│
├── .env.example
├── .gitignore
├── jest.config.js
├── package-lock.json
├── package.json
└── README.md
```

## Persyaratan Sistem

Sebelum menjalankan project, pastikan perangkat sudah memiliki:

- Node.js (project dikembangkan menggunakan Node.js 24.21.0).
- npm.
- MongoDB Atlas atau server MongoDB yang kompatibel.
- Git.


## Live API

Proyek Todo List Management telah berhasil di-deploy menggunakan Vercel.

- **Live API:** https://api-todos-list-management.vercel.app
- **Swagger Documentation:** https://api-todos-list-management.vercel.app/api-docs/

Dokumentasi Swagger dapat digunakan untuk melihat dan menguji endpoint API secara langsung.


## Instalasi

**1. Clone repository**

```bash
git clone <URL_REPOSITORY_GITHUB>
```

**2. Masuk ke direktori project**

```bash
cd API-Todos-List-Management
```

**3. Instal dependencies**

```bash
npm install
```

**4. Konfigurasi environment variables**

Buat file `.env` pada direktori utama project.

Salin konfigurasi dari `.env.example`, kemudian sesuaikan nilainya dengan konfigurasi lingkungan masing-masing.

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string

MONGODB_TEST_URI=your_test_database_connection_string

JWT_SECRET=your_jwt_secret

API_KEY=your_api_key
```

**Catatan keamanan:** Gunakan database yang berbeda untuk aplikasi utama dan pengujian. Jangan membagikan kredensial database, JWT Secret, atau API Key yang sebenarnya secara publik.

## Konfigurasi Environment Variables

| Variabel | Keterangan |
|---|---|
| `PORT` | Port yang digunakan oleh aplikasi |
| `MONGODB_URI` | URI koneksi MongoDB untuk database utama |
| `MONGODB_TEST_URI` | URI koneksi MongoDB untuk database pengujian |
| `JWT_SECRET` | Secret key untuk membuat dan memverifikasi JWT |
| `API_KEY` | API Key untuk melindungi endpoint statistik |

## Menjalankan Aplikasi

**Mode pengembangan**

```bash
npm run dev
```

**Mode produksi**

```bash
npm start
```

Secara default, aplikasi berjalan pada alamat:

```text
http://localhost:3000
```

## Dokumentasi API

Project ini menggunakan Swagger UI untuk menyediakan dokumentasi API interaktif.

Setelah server berhasil dijalankan, buka alamat berikut melalui browser:

```text
http://localhost:3000/api-docs
```

Melalui Swagger UI, pengembang dapat:

- Melihat seluruh endpoint API yang tersedia.
- Memahami parameter request dan struktur response.
- Mengetahui kebutuhan autentikasi setiap endpoint.
- Mencoba request API secara langsung.
- Menggunakan JWT Bearer Token dan API Key melalui fitur Authorize.

## Daftar Endpoint API

Base URL:

```text
http://localhost:3000/api
```

### 1. Autentikasi

| Metode | Endpoint | Keterangan | Autentikasi |
|---|---|---|---|
| POST | `/auth/register` | Mendaftarkan pengguna baru | Tidak |
| POST | `/auth/login` | Melakukan login pengguna | Tidak |

### 2. Pengelolaan Todo

| Metode | Endpoint | Keterangan | Autentikasi |
|---|---|---|---|
| POST | `/todos` | Membuat Todo baru | JWT |
| GET | `/todos` | Mengambil seluruh Todo milik pengguna | JWT |
| GET | `/todos/:id` | Mengambil Todo berdasarkan ID | JWT |
| PATCH | `/todos/:id` | Memperbarui Todo | JWT |
| DELETE | `/todos/:id` | Menghapus Todo | JWT |

**Parameter query pada daftar Todo:**

| Parameter | Keterangan | Contoh |
|---|---|---|
| `page` | Nomor halaman | `page=1` |
| `limit` | Jumlah data per halaman (maksimal 100) | `limit=10` |
| `status` | Filter berdasarkan status Todo | `status=pending` |
| `category_id` | Filter berdasarkan kategori | `category_id=<category_id>` |
| `sort` | Mengurutkan data Todo | `sort=newest` |
| `search` | Mencari berdasarkan judul atau deskripsi | `search=project` |

Pilihan status Todo:

- `pending`
- `in_progress`
- `completed`

Pilihan sorting:

- `newest`
- `oldest`
- `title`
- `priority`

Contoh penggunaan:

```text
GET /api/todos?page=1&limit=10&status=pending&sort=newest&search=project
```

### 3. Pengelolaan Kategori

| Metode | Endpoint | Keterangan | Autentikasi |
|---|---|---|---|
| POST | `/categories` | Membuat kategori baru | JWT |
| GET | `/categories` | Mengambil seluruh kategori pengguna | JWT |
| GET | `/categories/:id` | Mengambil kategori berdasarkan ID | JWT |
| PATCH | `/categories/:id` | Memperbarui kategori | JWT |
| DELETE | `/categories/:id` | Menghapus kategori | JWT |

### 4. Activity Log

| Metode | Endpoint | Keterangan | Autentikasi |
|---|---|---|---|
| GET | `/activity-logs` | Mengambil riwayat aktivitas Todo pengguna | JWT |

Activity Log mencatat aktivitas berikut:

- `created` — pembuatan Todo.
- `updated` — pembaruan Todo.
- `deleted` — penghapusan Todo.

### 5. Otorisasi Role

| Metode | Endpoint | Keterangan | Autentikasi |
|---|---|---|---|
| GET | `/roles/user` | Mengakses fitur dengan hak pengguna | JWT + User Role |
| GET | `/roles/admin` | Mengakses fitur dengan hak administrator | JWT + Admin Role |

### 6. Statistik

| Metode | Endpoint | Keterangan | Autentikasi |
|---|---|---|---|
| GET | `/stats/summary` | Mengambil ringkasan statistik aplikasi | API Key |

Endpoint statistik menyediakan informasi:

- Total Todo.
- Total Todo berstatus pending.
- Total Todo berstatus in progress.
- Total Todo berstatus completed.
- Total kategori.

Untuk mengakses endpoint ini, sertakan API Key melalui HTTP header berikut:

```http
x-api-key: YOUR_API_KEY
```

## Autentikasi

API menggunakan JSON Web Token (JWT) untuk melakukan autentikasi pengguna.

Setelah berhasil melakukan login, server akan memberikan token autentikasi.

Token tersebut harus disertakan pada header Authorization ketika mengakses endpoint yang membutuhkan autentikasi:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

JWT yang dihasilkan memiliki masa berlaku selama 1 hari.

## Penanganan Error

API menerapkan sistem penanganan error terpusat untuk menghasilkan response JSON dengan HTTP Status Code yang sesuai.

Beberapa HTTP Status Code yang digunakan:

| Status Code | Keterangan |
|---|---|
| 200 | Permintaan berhasil |
| 201 | Data berhasil dibuat |
| 400 | Permintaan atau validasi data tidak valid |
| 401 | Pengguna belum terautentikasi |
| 403 | Akses ditolak |
| 404 | Data tidak ditemukan |
| 409 | Terjadi konflik data |
| 500 | Terjadi kesalahan pada server |

Contoh response ketika validasi input gagal:

```json
{
  "status": "fail",
  "message": "Validasi input gagal",
  "errors": [
    {
      "field": "title",
      "message": "Judul Todo wajib diisi"
    }
  ]
}
```

## Pengujian Otomatis

Project ini menggunakan Jest dan Supertest untuk menjalankan pengujian otomatis.

Pastikan variabel `MONGODB_TEST_URI` sudah dikonfigurasi sebelum menjalankan pengujian.

Jalankan perintah berikut:

```bash
npm test
```

Pengujian mencakup autentikasi, model pengguna, pengelolaan Todo, pengelolaan kategori, otorisasi role, Activity Log, dan statistik.

## Keamanan Aplikasi

Beberapa mekanisme keamanan yang diterapkan pada project ini meliputi:

- Password hashing menggunakan bcryptjs.
- Autentikasi menggunakan JWT.
- Pembatasan akses berdasarkan role pengguna.
- Autentikasi API Key untuk endpoint statistik.
- Validasi input menggunakan express-validator.
- HTTP security headers menggunakan Helmet.
- Pembatasan jumlah request menggunakan express-rate-limit.
- Pengaturan CORS.
- Penanganan error secara terpusat.
- Penyimpanan konfigurasi sensitif menggunakan environment variables.
- Pemisahan konfigurasi database utama dan database pengujian.

## Lisensi

Lisensi untuk project ini belum ditentukan.