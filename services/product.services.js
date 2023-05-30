const ProductModel = require('../models/product.model');

class ProductService {
  static async createProduct(productData) {
    try {
      const product = await ProductModel.create(productData);
      return product;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getProductById(productId) {
    try {
      const product = await ProductModel.findById(productId);
      console.log(product.id);
      return product;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async updateProduct(productId, productData) {
    try {
      const product = await ProductModel.findByIdAndUpdate(productId, productData, {
        new: true,
      });
      return product;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async deleteProduct(productId) {
    try {
      const deletedProduct = await ProductModel.findByIdAndDelete(productId);
      return deletedProduct;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getProducts(queryObj) {
    try {
      //const products = await ProductModel.find({});
      //1B) Advanced filtering
      let queryString = JSON.stringify(queryObj);
      queryString = queryString.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );
      let products = ProductModel.find(JSON.parse(queryString));
      return products;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getHotSaleProducts() {
    try {
      const hotSaleProducts = await ProductModel.find({ isHotSale: true });
      return hotSaleProducts;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getProductsByCategory(category) {
    try {
      const products = await ProductModel.find({ category: category });
      return products;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = ProductService;