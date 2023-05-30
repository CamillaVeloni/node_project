const ProductService = require('../services/product.services');

class ProductController {
  static async createProduct(req, res) {
    try {
      const product = await ProductService.createProduct(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getAllProducts(req, res) {
    try {
      //BUILD QUERY
      // 1A) Filtering
      const queryObj = { ...req.query };
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach((el) => delete queryObj[el]);

      const products = await ProductService.getProducts(queryObj);
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getProductById(req, res) {
    try {
      const product = await ProductService.getProductById(req.params.productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      const updatedProduct = await ProductService.updateProduct(
        req.params.productId,
        req.body
      );
      res.json(updatedProduct);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const deletedProduct = await ProductService.deleteProduct(
        req.params.productId
      );
      res.json(deletedProduct);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = ProductController;
