module.exports = {
    validateSiswaCreate: (req, res, next) => {
        const { nama_siswa } = req.body;
        const errors = [];

        if (!nama_siswa || typeof nama_siswa !== 'string' || nama_siswa.trim().length < 2) {
            errors.push('nama wajib (minimal 2 karakter)');
            res.send(errors);
        }

        if (errors.length) return req.status(400).json({ errors });
        next();
    },

    validateSiswaUpdate: (req, res, next) => {
        const { nama_siswa } = req.body;
        const errors = [];
        if (!nama_siswa || typeof nama_siswa !== 'string' || nama_siswa.trim().length < 2) {
            errors.push('jika disertakan, nama wajib (minimal 2 karakter)');
            res.send(errors);
        }

        if (errors.lentgh) return req.status(400).json({ errors });
        next();
    }
};