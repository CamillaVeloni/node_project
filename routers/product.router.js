const router = require('express').Router();
const { requiresToken } = require('../middleware/auth.middleware');
const ProductController = require('../controller/product.controller');

// Rotas relacionadas aos produtos
router.post('/products', ProductController.createProduct);
router.get('/products', requiresToken, ProductController.getAllProducts);
router.get('/products/:productId', ProductController.getProductById);
router.put('/products/:productId', ProductController.updateProduct);
router.delete('/products/:productId', ProductController.deleteProduct);

module.exports = router;