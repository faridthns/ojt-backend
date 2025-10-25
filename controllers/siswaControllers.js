const pool = require('../config/db');

module.exports = {
    //get /api/siswa
    getAll: async (req, res, next) => {
        try {
            const [rows] = await pool.execute('select * from siswa');
            res.json(rows);
        } catch (error) {
            next(error);
        }
    },

    //get /api/siswa/:id
    getById: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const [rows] = await pool.execute('select * from siswa where kode_siswa = ?', [id]);
            if (rows.length === 0) return res.status(404).json({ message: 'Siswa not found' });
            res.json(rows[0]);
        } catch (error) {
            next(error);
        }
    },

    // protected butuh jwt
    create: async (req, res, next) => {
        try {
            const { nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa } = req.body;
            // const userId = req.user ? req.user.id : null;

            const [result] = await pool.execute(
                'insert into siswa (nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa) values(?,?,?,?)',
                [nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa]
            );
            res.status(201).send("Data Berhasil disimpan");
        } catch (error) {
            next(error);
        }
    },

    //protected butuh jwt
    update: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const { nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa } = req.body;

            const fields = [];
            const values = [];

            if (nama_siswa !== undefined) {
                fields.push('nama_siswa = ?');
                values.push(nama_siswa)
            };

            if (alamat_siswa !== undefined) {
                fields.push('alamat_siswa = ?');
                values.push(alamat_siswa)
            }

            if (tgl_siswa !== undefined) {
                fields.push('tgl_siswa = ?');
                values.push(tgl_siswa)
            }

            if (jurusan_siswa !== undefined) {
                fields.push('jurusan_siswa = ?');
                values.push(jurusan_siswa)
            }

            if (fields.length === 0) return res.status(400).json({ message: 'Nothing to update' });

            values.push(id);
            const sql = `update siswa set ${fields.join(',')} where kode_siswa = ?`;
            const [result] = await pool.execute(sql, values);

            if (result.affectedRows === 0) return res.status(404).json({ message: 'Siswa ga ditemuin' });
            res.json({ message: 'Siswa berhasil diperbaruiii' });
        } catch (error) {
            next(error);
        }
    },

    //protected butuh jwt
    remove: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id, 10);
            const [result] = await pool.execute('delete from siswa where kode_siswa = ?', [id]);

            if (result.affectedRows === 0) return res.status(404).json({ message: 'Siswa ga ditemuin' });
            res.json({ message: 'Siswa berhasil dihapus' });
        } catch (error) {
            next(error);
        }
    }
}