const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getSubcategories, addSubcategory, editSubcategory, deleteSubcategory, getSubcategoryById } = require('../controllers/subcategoryController');
const authMiddleware = require('../middlewares/authMiddleware');

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

router.get('/', authMiddleware, getSubcategories);
router.get('/:id', authMiddleware, getSubcategoryById);
router.post('/', authMiddleware, upload.single('image'), addSubcategory);
router.put('/:id', authMiddleware, upload.single('image'), editSubcategory);
router.delete('/:id', authMiddleware, deleteSubcategory);

module.exports = router;
