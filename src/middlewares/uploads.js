const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype.startsWith('video/') ||
            file.mimetype.startsWith('audio/')
        ) {
            cb(null, true);
        } else {
            cb(new Error('Arquivo inválido'), false);
        }
    }
});

module.exports = upload;