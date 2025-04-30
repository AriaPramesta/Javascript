CREATE TABLE mahasiswa (
    nim TEXT PRIMARY KEY,
    nama TEXT NOT NULL,
    alamat TEXT,
    jurusan_id INTEGER,
    FOREIGN KEY (jurusan_id) REFERENCES jurusan(jurusan_id)
);

CREATE TABLE jurusan (
    jurusan_id INTEGER PRIMARY KEY AUTOINCREMENT,
    namajurusan TEXT NOT NULL
);

CREATE TABLE dosen (
    dosen_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL
);

CREATE TABLE matakuliah (
    matakuliah_id integer primary key autoincrement, 
    nama text not null, 
    sks integer not null
);

CREATE TABLE studi (
    studi_id integer primary key autoincrement, 
    dosen_id integer, 
    matakuliah_id integer, 
    foreign key (dosen_id) references dosen(dosen_id), 
    foreign key (matakuliah_id) references matakuliah(matakuliah_id)
);

CREATE TABLE nilai (
  nilai_id INTEGER PRIMARY KEY AUTOINCREMENT,
  nim TEXT NOT NULL,
  matakuliah_id INTEGER NOT NULL,
  nilai INTEGER NOT NULL,
  FOREIGN KEY (nim) REFERENCES mahasiswa(nim),
  FOREIGN KEY (matakuliah_id) REFERENCES matakuliah(matakuliah_id)
);

INSERT INTO mahasiswa (nim, nama, alamat, jurusan_id) VALUES ('2025001', 'Aria Pramesta', 'Sumedang', 1);

INSERT INTO matakuliah (nama, sks) VALUES ('Alogaritma dan Pemrograman', 4), ('Basis Data', 3);

INSERT INTO jurusan (namajurusan) VALUES ('Teknik Informatika'), ('Sistem Informasi');

INSERT INTO dosen (nama) VALUES ('budi'), ('john');

INSERT INTO studi (dosen_id, matakuliah_id) VALUES (1, 1), (2, 1);

INSERT INTO nilai (nilai_id, nim, matakuliah_id, nilai) VALUES ('2025001', 1, 80);



