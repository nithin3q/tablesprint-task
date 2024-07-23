const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getCategories, addCategory, editCategory, deleteCategory ,getCategoryById} = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');

// Set up multer storage with custom file naming
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    cb(null, `${basename}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

router.get('/', authMiddleware, getCategories);
router.get('/:id', authMiddleware, getCategoryById);
router.post('/', authMiddleware, upload.single('image'), addCategory);
router.put('/:id', authMiddleware, upload.single('image'), editCategory);
router.delete('/:id', authMiddleware, deleteCategory);

module.exports = router;
