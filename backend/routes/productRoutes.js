const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getProducts, addProduct, editProduct, deleteProduct, getProductById } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const path = require('path');


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

router.get('/', authMiddleware, getProducts);
router.get('/:id', authMiddleware, getProductById);
router.post('/', authMiddleware, upload.single('image'), addProduct);  // Ensure upload.single('image') is used here
router.put('/:id', authMiddleware, upload.single('image'), editProduct); // Ensure upload.single('image') is used here
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;
