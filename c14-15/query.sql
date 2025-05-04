--Table mahasiswa
CREATE TABLE
    mahasiswa (
        nim TEXT PRIMARY KEY,
        nama TEXT NOT NULL,
        alamat TEXT,
        jurusan_id TEXT,
        FOREIGN KEY (jurusan_id) REFERENCES jurusan (jurusan_id)
    );

INSERT INTO
    mahasiswa (nim, nama, alamat, jurusan_id)
VALUES
    ('2025001', 'Aria Pramesta', 'Sumedang', 'j001');

ALTER TABLE mahasiswa
ADD column umur INTEGER;

UPDATE mahasiswa
SET
    umur = 20
WHERE
    nama = 'Aria Pramesta';

INSERT INTO
    mahasiswa (nim, nama, alamat, jurusan_id, umur)
VALUES
    (
        '2025002',
        'Andi Setiawan',
        'Jl. Merdeka No.1',
        'j001',
        19
    ),
    (
        '2025003',
        'Budi Hartono',
        'Jl. Diponegoro No.5',
        'j002',
        21
    ),
    (
        '2025004',
        'Citra Dewi',
        'Jl. Sudirman No.10',
        'j002',
        19
    ),
    (
        '2025005',
        'Dewi Lestari',
        'Jl. Gatot Subroto No.2',
        'j001',
        22
    ),
    (
        '2025006',
        'Eko Prasetyo',
        'Jl. Imam Bonjol No.7',
        'j002',
        19
    );

--Table jurusan
CREATE TABLE
    jurusan (
        jurusan_id TEXT PRIMARY KEY,
        nama_jurusan TEXT NOT NULL
    );

INSERT INTO
    jurusan (jurusan_id, nama_jurusan)
VALUES
    ('j001', 'Teknik Informatika'),
    ('j002', 'Sistem Informasi');

--Table dosen
CREATE TABLE
    dosen (dosen_id TEXT PRIMARY KEY, nama TEXT NOT NULL);

INSERT INTO
    dosen (dosen_id, nama)
VALUES
    ('D001', 'Dr. Suryadi, M.Kom'),
    ('D002', 'Ir. Ratna Wijayanti, M.T'),
    ('D003', 'Drs. Bambang Supriyadi'),
    ('D004', 'Prof. Lina Marlina, Ph.D'),
    ('D005', 'Dr. Arif Setiawan, M.Sc');

--Table matakuliah
CREATE TABLE
    matakuliah (
        matakuliah_id TEXT PRIMARY KEY,
        nama TEXT NOT NULL,
        sks INTEGER NOT NULL
    );

INSERT INTO
    matakuliah (matakuliah_id, nama, sks)
VALUES
    ('m001', 'Alogaritma dan Pemrograman', 4),
    ('m002', 'Basis Data', 3);

INSERT INTO
    matakuliah (matakuliah_id, nama, sks)
VALUES
    ('m003', 'Pemrograman data mining', 5);

--Table studi
CREATE TABLE
    studi (
        studi_id TEXT PRIMARY KEY,
        dosen_id TEXT NOT NULL,
        matakuliah_id TEXT NOT NULL,
        FOREIGN KEY (dosen_id) REFERENCES dosen (dosen_id),
        FOREIGN KEY (matakuliah_id) REFERENCES matakuliah (matakuliah_id)
    );

INSERT INTO
    studi (studi_id, dosen_id, matakuliah_id)
VALUES
    ('s001', 'D001', 'm001'),
    ('s002', 'D002', 'm002'),
    ('s003', 'D003', 'm003'),
    ('s004', 'D004', 'm002'),
    ('s005', 'D005', 'm003');

--Table nilai
CREATE TABLE
    nilai (
        nilai_id TEXT PRIMARY KEY,
        nim TEXT NOT NULL,
        matakuliah_id TEXT NOT NULL,
        nilai TEXT NOT NULL,
        FOREIGN KEY (nim) REFERENCES mahasiswa (nim),
        FOREIGN KEY (matakuliah_id) REFERENCES matakuliah (matakuliah_id)
    );

INSERT INTO
    nilai (nilai_id, nim, matakuliah_id, nilai)
VALUES
    ('n001', '2025001', 'm001', 'A'),
    ('n002', '2025001', 'm002', 'B'),
    ('n003', '2025001', 'm003', 'B');

insert into
    nilai (nilai_id, nim, matakuliah_id, nilai)
values
    ('n004', '2025002', 'm002', 'D'),
    ('n005', '2025003', 'm001', 'E'),
    ('n006', '2025004', 'm003', 'C'),
    ('n007', '2025005', 'm001', 'A'),
    ('n008', '2025006', 'm002', 'B'),
    ('n009', '2025002', 'm003', 'B'),
    ('n010', '2025002', 'm001', 'B');

-- no 1
SELECT
    mahasiswa.*,
    jurusan.nama_jurusan
FROM
    mahasiswa
    JOIN jurusan ON mahasiswa.jurusan_id = jurusan.jurusan_id;

-- no 2
SELECT
    *
FROM
    mahasiswa
WHERE
    umur < 20;

-- no 3
select
    *
from
    nilai
where
    nilai in ('A', 'B');

-- no 4
SELECT
    mahasiswa.nim,
    mahasiswa.nama,
    SUM(matakuliah.sks) AS total_sks
FROM
    nilai
    JOIN mahasiswa ON nilai.nim = mahasiswa.nim
    JOIN matakuliah ON nilai.matakuliah_id = matakuliah.matakuliah_id
GROUP BY
    mahasiswa.nim,
    mahasiswa.nama
HAVING
    total_sks > 10;

-- no 5
SELECT
    mahasiswa.nim,
    mahasiswa.nama
FROM
    nilai
    JOIN mahasiswa ON nilai.nim = mahasiswa.nim
    JOIN matakuliah ON nilai.matakuliah_id = matakuliah.matakuliah_id
WHERE
    matakuliah.nama LIKE '%data mining%';

-- no 6
SELECT
    studi.dosen_id,
    COUNT(DISTINCT nilai.nim) AS jumlah_mahasiswa
FROM
    nilai
    JOIN matakuliah ON nilai.matakuliah_id = matakuliah.matakuliah_id
    JOIN studi ON matakuliah.matakuliah_id = studi.matakuliah_id
GROUP BY
    studi.dosen_id;

-- no 7
SELECT
    *
FROM
    mahasiswa
ORDER BY
    umur;

-- no 8
SELECT
    mahasiswa.nim,
    mahasiswa.nama AS nama_mahasiswa,
    mahasiswa.alamat,
    mahasiswa.umur,
    jurusan.nama_jurusan,
    matakuliah.nama AS nama_matakuliah,
    matakuliah.sks,
    nilai.nilai,
    dosen.nama AS nama_dosen
FROM
    nilai
    JOIN mahasiswa ON nilai.nim = mahasiswa.nim
    JOIN jurusan ON mahasiswa.jurusan_id = jurusan.jurusan_id
    JOIN matakuliah ON nilai.matakuliah_id = matakuliah.matakuliah_id
    JOIN studi ON matakuliah.matakuliah_id = studi.matakuliah_id
    JOIN dosen ON studi.dosen_id = dosen.dosen_id
WHERE
    nilai.nilai IN ('D', 'E');