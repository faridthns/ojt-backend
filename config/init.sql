create database if not exists db_siswa_ojt;

use db_siswa_ojt;

create table if not exists siswa (
	kode_siswa INT auto_increment primary key, 
    nama_siswa varchar(255) not null,
    alamat_siswa varchar(255),
    tgl_siswa date,
    jurusan_siswa varchar(255),
    createdAt datetime default current_timestamp,
    updatedAt datetime default current_timestamp on update current_timestamp
);